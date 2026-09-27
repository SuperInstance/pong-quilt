// site/worker.js — pong-quilt website backend.
// Serves the explorable site (static assets) + a small verified API.
// Honesty doctrine (repo-native): every endpoint either returns a verified
// receipt or an honest refusal. No silent degradation, no faked green.
//
// Endpoints:
//   GET  /api/claims      VERIFIED_CLAIMS from the repo's own core.js
//   GET  /api/provenance  build-time demo-file sha256 receipt
//   POST /api/replay      {level, seed} -> deterministic game receipt (runs core.js here)
//   POST /api/judge       {level, seed, claim} -> replay + live JEV verdict, or named abstain
//   GET  /api/moth        live read of the moth job ledger (no credits spent), or named abstain
import PQ from '../core.js';
import provenance from './generated/provenance.json' with { type: 'json' };

const LEVELS = ['level0', 'level1', 'level2'];
const ckptCache = new Map();
globalThis.window = globalThis; // checkpoint files' browser idiom, honored not faked

async function loadCheckpoint(level) {
  if (ckptCache.has(level)) return ckptCache.get(level);
  if (!LEVELS.includes(level)) return null;
  await import(`../checkpoints/${level}.js`);
  const pop = globalThis.PONG_QUILT_CHECKPOINTS?.[level]?.pop;
  if (!pop?.[0]) return null;
  const g = pop[0]; // elites-first, same convention as tools/site-lab.mjs
  const net = PQ.makeNet(PQ.rng(1));
  net.w1 = g.w1; net.b1 = g.b1; net.w2 = g.w2; net.b2 = g.b2;
  ckptCache.set(level, net);
  return net;
}

async function replayGame(level, seed) {
  const net = await loadCheckpoint(level);
  if (!net) return { ok: false, why: `unknown checkpoint '${level}' (want one of ${LEVELS.join(', ')})` };
  if (!Number.isInteger(seed) || seed < 0 || seed > 0x7fffffff)
    return { ok: false, why: 'seed must be an integer in [0, 2147483647]' };
  const g = PQ.playOne(net, PQ.rng(seed >>> 0));
  const receipt = {
    ok: true, level, seed,
    frames: g.frames, hits: g.hits, maxSpeed: +g.maxSpeed.toFixed(6),
    fitness: g.frames + g.hits * PQ.HIT_WEIGHT,
    champion: `${level}.pop[0]`, engine: 'core.js (same file the demo loads)',
    maxFrames: PQ.DEFAULTS.maxFrames, hitWeight: PQ.HIT_WEIGHT,
  };
  receipt.digest = await digest(receipt);
  return receipt;
}

async function digest(obj) {
  const s = JSON.stringify(obj);
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function judgeClaim(env, replay, claim) {
  if (!env.TYPESAFEAI_KEY)
    return { verdict: null, abstain: 'JEV key not bound — abstained (skipped, not condemned)' };
  const body = {
    model: 'jev-latest',
    state: { replay: { frames: replay.frames, hits: replay.hits, maxSpeed: replay.maxSpeed, fitness: replay.fitness } },
    questions: {
      claim_check: {
        type: 'noul',
        instructions: `A visitor to the pong-quilt site claims: "${claim}". ` +
          `The deterministic replay of that exact game produced: frames=${replay.frames}, ` +
          `hits=${replay.hits}, maxSpeed=${replay.maxSpeed}, fitness=${replay.fitness}. ` +
          `Does the claim match what actually happened? Answer in one line: VERDICT: supported|refuted|unclear — why.`,
      },
    },
  };
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 25000);
  try {
    const r = await fetch('https://api.typesafe.ai/v1/systemone', {
      method: 'POST', signal: ac.signal,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.TYPESAFEAI_KEY}` },
      body: JSON.stringify(body),
    });
    if (!r.ok) return { verdict: null, abstain: `JEV HTTP ${r.status} — abstained` };
    const p = await r.json();
    return { verdict: p.answers?.claim_check?.noul ?? null, abstain: null };
  } catch { return { verdict: null, abstain: 'JEV unreachable — abstained' }; }
  finally { clearTimeout(t); }
}

async function mothLedger(env) {
  if (!env.MOTHQUANTUM_KEY || !env.MOTHQUANTUM_BASE)
    return { ok: false, why: 'moth key/base not bound — abstained (named, not faked)' };
  try {
    const r = await fetch(`${env.MOTHQUANTUM_BASE.replace(/\/$/, '')}/jobs`, {
      headers: { Authorization: `Bearer ${env.MOTHQUANTUM_KEY}` },
    });
    if (!r.ok) return { ok: false, why: `moth HTTP ${r.status}` };
    const p = await r.json();
    const jobs = p.jobs ?? [];
    return {
      ok: true, jobs: jobs.length,
      note: 'read-only ledger view — no credits spent; submission is credit-gated and stays a named slot',
      receipt_fields: 'Job = {job_id, engine_id, owner, status, created_at, updated_at}',
      recent: jobs.slice(0, 3).map(j => ({ engine_id: j.engine_id, status: j.status, created_at: j.created_at })),
    };
  } catch { return { ok: false, why: 'moth unreachable — abstained' }; }
}

const json = (x, status = 200) =>
  new Response(JSON.stringify(x, null, 2), { status, headers: { 'content-type': 'application/json' } });

export async function handle(request, env) {
  const url = new URL(request.url);
  if (request.method === 'GET' && url.pathname === '/api/claims')
    return json({ ok: true, count: PQ.VERIFIED_CLAIMS.length, claims: PQ.VERIFIED_CLAIMS });
  if (request.method === 'GET' && url.pathname === '/api/provenance')
    return json(provenance);
  if (request.method === 'GET' && url.pathname === '/api/moth')
    return json(await mothLedger(env));
  if (url.pathname === '/api/replay' && request.method === 'POST') {
    let body; try { body = await request.json(); } catch { return json({ ok: false, why: 'malformed JSON' }, 400); }
    const r = await replayGame(String(body.level ?? ''), Number(body.seed));
    return json(r, r.ok ? 200 : 422);
  }
  if (url.pathname === '/api/judge' && request.method === 'POST') {
    let body; try { body = await request.json(); } catch { return json({ ok: false, why: 'malformed JSON' }, 400); }
    const claim = String(body.claim ?? '').trim();
    if (!claim || claim.length > 280) return json({ ok: false, why: 'claim must be 1..280 chars' }, 422);
    const r = await replayGame(String(body.level ?? ''), Number(body.seed));
    if (!r.ok) return json(r, 422);
    const judged = await judgeClaim(env, r, claim);
    return json({ ok: true, replay: r, judge: judged });
  }
  if (url.pathname.startsWith('/api/')) return json({ ok: false, why: 'unknown endpoint' }, 404);
  return env.ASSETS ? env.ASSETS.fetch(request) : new Response('assets not bound', { status: 404 });
}

export default { fetch: (request, env, ctx) => handle(request, env, ctx) };
