// tools/site-lab.mjs — live-lab probes for the pong-quilt site, run from node.
// Verifies the two backend contracts the site will call, BEFORE any worker code
// is written (FAIL-first: this file's assertions are the pre-registration).
// Usage: node tools/site-lab.mjs
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

let pass = 0, fail = 0;
const t = (n, ok, d = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}  ${d}`); };

// ---------- 1. classic replay with a checkpoint net, in node ----------
const require = createRequire(import.meta.url);
const PQ = require('../core.js');
global.window = {};
require('../checkpoints/level1.js');
const g = window.PONG_QUILT_CHECKPOINTS.level1.pop[0]; // elites-first
const net = PQ.makeNet(PQ.rng(1));
net.w1 = g.w1; net.b1 = g.b1; net.w2 = g.w2; net.b2 = g.b2;
const rand = PQ.rng(20260928);
const game = PQ.playOne(net, rand);
t('level1 checkpoint replays a full game in-node', game.frames > 0,
  `frames=${game.frames} hits=${game.hits} maxSpeed=${game.maxSpeed}`);
t('replay is seed-deterministic', (() => {
  const a = PQ.playOne(net, PQ.rng(20260928));
  const b = PQ.playOne(net, PQ.rng(20260928));
  return a.frames === b.frames && a.hits === b.hits;
})(), 'same seed → same frames+hits');

// ---------- 2. JEV live judge ----------
const JEV = process.env.TYPESAFEAI_KEY;
if (JEV) {
  try {
    const r = await fetch('https://api.typesafe.ai/v1/systemone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${JEV}` },
      body: JSON.stringify({
        model: 'jev-latest',
        state: { game: { frames: game.frames, hits: game.hits } },
        questions: {
          verify_shape: {
            type: 'noul',
            instructions: 'A pong-quilt site visitor claims they played a game with the level-1 checkpoint. Reply with a one-line verification note naming the frame count and hit count you were given.'
          }
        }
      })
    });
    const payload = await r.json();
    const ans = payload.answers?.verify_shape;
    t('JEV live judge answers a noul', r.ok && !!ans, r.ok ? `type=${ans.type} latency=live` : `HTTP ${r.status}`);
  } catch (e) { t('JEV live judge answers a noul', false, String(e).slice(0, 80)); }
} else t('JEV live judge answers a noul', false, 'TYPESAFEAI_KEY unset');

// ---------- 3. moth job read (no credits spent) ----------
const MB = process.env.MOTHQUANTUM_BASE, MK = process.env.MOTHQUANTUM_KEY;
if (MB && MK) {
  try {
    const r = await fetch(`${MB}/jobs`, { headers: { Authorization: `Bearer ${MK}` } });
    const payload = await r.json();
    t('moth /jobs readable', r.ok && Array.isArray(payload.jobs),
      r.ok ? `${payload.jobs?.length ?? 0} jobs, first engine: ${payload.jobs?.[0]?.engine_id}` : `HTTP ${r.status}`);
  } catch (e) { t('moth /jobs readable', false, String(e).slice(0, 80)); }
} else t('moth /jobs readable', false, 'MOTHQUANTUM_BASE/KEY unset');

console.log(`\n${fail === 0 ? 'ALL GREEN — build the site' : 'RED — fix before building'}: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
