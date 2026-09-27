// site/app.js — the pong-quilt explorable, interactive layer (v2, R44).
// Progressive enhancement over the no-JS forms: every section keeps its
// plain-HTML fallback and each widget guards on its mount point — absent
// mounts abstain named, in the page itself. Zero dependencies.
//
// Data sources, and only these:
//   /api/*          the site's verified worker (replays run the repo's core.js)
//   /demo/*         the repo's own committed artifacts, byte-identical
//                   (checkpoints, coev.js, curve.json — the same bytes the demo loads)
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmt = (n) => Number(n).toLocaleString('en-US');
  const dig = (d) => String(d).slice(0, 12);
  async function api(path, opts) {
    try { const r = await fetch(path, opts); return await r.json(); }
    catch (e) { return { ok: false, why: 'fetch failed: ' + e }; }
  }
  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = () => rej(new Error('artifact missing: ' + src));
      document.head.appendChild(s);
    });
  }
  const abstain = (why) => '<p class="abstain">named abstain — ' + esc(why) + '</p>';

  /* ---------- Engine Room: deterministic replay, rendered where you stand ---------- */
  const engineForm = $('engine-form');
  if (engineForm) {
    const out = $('engine-results');
    const params = new URLSearchParams(location.search);
    async function runReplay(level, seed) {
      out.innerHTML = '<p class="dim">replaying ' + esc(level) + ' · seed ' + fmt(seed) + ' in the worker…</p>';
      const r = await api('/api/replay', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ level, seed }),
      });
      if (!r.ok) { out.innerHTML = abstain(r.why || 'replay failed'); return; }
      const link = location.origin + location.pathname + '?level=' + r.level + '&seed=' + r.seed;
      out.innerHTML =
        '<div class="receipt" data-testid="engine-receipt">' +
        '<div class="receipt-head">receipt · ' + esc(r.champion) + ' · engine: ' + esc(r.engine) + '</div>' +
        '<div class="statgrid">' +
        '<div><b>' + fmt(r.frames) + '</b><span>frames</span></div>' +
        '<div><b>' + fmt(r.hits) + '</b><span>hits</span></div>' +
        '<div><b>' + r.maxSpeed + '</b><span>max speed ×</span></div>' +
        '<div><b>' + fmt(r.fitness) + '</b><span>fitness (frames + hits×' + r.hitWeight + ')</span></div>' +
        '</div>' +
        '<code class="digest">digest ' + r.digest + '</code>' +
        '<p class="dim">same seed → same digest, forever. <a href="' + esc(link) + '">receipt link</a> — anyone can re-run this exact game.</p>' +
        '</div>';
      history.replaceState(null, '', '?level=' + r.level + '&seed=' + r.seed);
    }
    engineForm.addEventListener('submit', (e) => {
      e.preventDefault();
      runReplay(engineForm.level.value, Number(engineForm.seed.value));
    });
    $('engine-sweep').addEventListener('click', async () => {
      const level = engineForm.level.value;
      const base = Number(engineForm.seed.value);
      const out2 = $('sweep-results');
      out2.innerHTML = '<p class="dim">sweeping seeds ' + fmt(base) + '…' + fmt(base + 7) + ' — ' + esc(level) + '</p>';
      const rows = [];
      for (let s = base; s < base + 8; s++) {
        const r = await api('/api/replay', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ level, seed: s }),
        });
        rows.push(r.ok ? r : { seed: s, why: r.why });
      }
      const okRows = rows.filter((r) => r.ok);
      const digests = new Set(okRows.map((r) => r.digest));
      const hits = okRows.map((r) => r.hits);
      const mean = hits.reduce((a, b) => a + b, 0) / (hits.length || 1);
      out2.innerHTML =
        '<table class="sweeptable"><thead><tr><th>seed</th><th>frames</th><th>hits</th><th>max speed</th><th>digest</th></tr></thead><tbody>' +
        rows.map((r) => r.ok
          ? '<tr><td>' + fmt(r.seed) + '</td><td>' + fmt(r.frames) + '</td><td>' + r.hits + '</td><td>' + r.maxSpeed + '</td><td><code>' + dig(r.digest) + '</code></td></tr>'
          : '<tr><td>' + fmt(r.seed) + '</td><td colspan="4">' + abstain(r.why) + '</td></tr>').join('') +
        '</tbody></table>' +
        '<p class="dim">' + okRows.length + ' replays · ' + digests.size + ' unique digests · hits min/mean/max: ' +
        Math.min(...hits) + ' / ' + mean.toFixed(1) + ' / ' + Math.max(...hits) +
        '. Determinism is <b>per-seed</b>, not global: one seed is a receipt, eight seeds are a distribution.</p>';
    });
    if (params.get('level') && params.get('seed') !== null) {
      const lv = params.get('level');
      if (['level0', 'level1', 'level2'].includes(lv)) engineForm.level.value = lv;
      engineForm.seed.value = Number(params.get('seed')) || 0;
      runReplay(engineForm.level.value, Number(engineForm.seed.value));
    }
  }

  /* ---------- Champion lineage: the committed checkpoints, in your browser ---------- */
  (async function lineage() {
    const mount = $('lineage');
    if (!mount) return;
    try {
      await Promise.all(['level0', 'level1', 'level2'].map((l) => loadScript('/demo/checkpoints/' + l + '.js')));
      const cps = window.PONG_QUILT_CHECKPOINTS || {};
      const order = ['level0', 'level1', 'level2'];
      if (!order.every((l) => cps[l])) { mount.innerHTML = abstain('checkpoints did not expose window.PONG_QUILT_CHECKPOINTS'); return; }
      const maxFit = Math.max(...order.map((l) => cps[l].bestFitness));
      const maxHits = Math.max(...order.map((l) => cps[l].bestHits));
      mount.innerHTML =
        '<p class="dim">loaded in your browser from the committed checkpoint artifacts — the same bytes the demo loads. ' +
        '<code>window.PONG_QUILT_CHECKPOINTS[level]</code>: elite-first population, <code>pop[0]</code> is the champion the Engine Room replays.</p>' +
        order.map((l) => {
          const c = cps[l];
          return '<div class="lineage-row" data-testid="lineage-' + l + '">' +
            '<div class="lineage-name">' + esc(l) + '<span>gen ' + fmt(c.gen) + '</span></div>' +
            '<div class="lineage-bars">' +
            bar('fitness ' + fmt(c.bestFitness), c.bestFitness / maxFit) +
            bar('hits ' + c.bestHits, c.bestHits / maxHits) +
            bar('frames ' + fmt(c.bestFrames), c.bestFrames / 6000) +
            bar('max speed ×' + c.maxSpeed, c.maxSpeed / 4) +
            '</div></div>';
        }).join('');
      function bar(label, frac) {
        return '<div class="bar"><i style="width:' + Math.round(Math.min(1, frac) * 100) + '%"></i><em>' + esc(label) + '</em></div>';
      }
    } catch (e) { mount.innerHTML = abstain(e.message); }
  })();

  /* ---------- Coevolution strip: the GAN pair's training record ---------- */
  (async function coev() {
    const mount = $('coev-strip');
    if (!mount) return;
    try {
      await loadScript('/demo/coev.js');
      const cv = window.PONG_QUILT_COEV;
      const curve = await fetch('/demo/checkpoints/curve.json').then((r) => r.json());
      if (!cv || !curve) { mount.innerHTML = abstain('coev artifacts missing'); return; }
      const samples = curve.samples || [];
      const w = 560, h = 90, pad = 6;
      const maxFit = Math.max(...samples.map((s) => s.fitness));
      const pts = samples.map((s, i) => {
        const x = pad + (i / Math.max(1, samples.length - 1)) * (w - 2 * pad);
        const y = h - pad - (s.fitness / maxFit) * (h - 2 * pad);
        return x.toFixed(1) + ',' + y.toFixed(1);
      }).join(' ');
      const swaps = curve.tiebreaks.filter((t) => t.swap).length;
      mount.innerHTML =
        '<p class="dim">one survivor paddle, one ender paddle, ' + fmt(cv.gens) + ' generations of adversarial co-training. ' +
        'Below: the survivor champion’s fitness across the committed curve artifact (every ' +
        Math.round(curve.gens / Math.max(1, samples.length - 1)) + ' gens), then the quantum coin journal.</p>' +
        '<svg class="spark" viewBox="0 0 ' + w + ' ' + h + '" data-testid="coev-spark" role="img" aria-label="survivor fitness over generations">' +
        '<line x1="' + pad + '" y1="' + (h - pad) + '" x2="' + (w - pad) + '" y2="' + (h - pad) + '" class="axis"/>' +
        '<polyline points="' + pts + '"/></svg>' +
        '<div class="coev-nums">' +
        '<div><b>' + fmt(samples[0].fitness) + '</b><span>gen ' + samples[0].gen + ' fitness</span></div>' +
        '<div><b>' + fmt(samples[samples.length - 1].fitness) + '</b><span>gen ' + samples[samples.length - 1].gen + ' fitness</span></div>' +
        '<div><b>' + fmt(curve.tiebreaks.length) + '</b><span>coin flips (ties)</span></div>' +
        '<div><b>' + fmt(swaps) + '</b><span>flips that swapped the leader</span></div>' +
        '</div>' +
        '<p class="dim">final champions — survivor <code>' + esc(cv.sChamp.netId) + '</code> fitness ' + fmt(cv.sChamp.fitness) +
        ' · ender <code>' + esc(cv.eChamp.netId) + '</code> fitness ' + fmt(cv.eChamp.fitness) +
        '. Coin journal engine: <code>' + esc(curve.tiebreaks[0].engine) + '</code>, cited to <code>' + esc(curve.tiebreaks[0].citation) + '</code>.</p>';
    } catch (e) { mount.innerHTML = abstain(e.message); }
  })();

  /* ---------- Claim Judge: state a claim, get it scored against the receipt ---------- */
  const judgeForm = $('judge-form');
  if (judgeForm) {
    judgeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const out = $('judge-result');
      const claim = judgeForm.claim.value.trim();
      out.innerHTML = '<p class="dim">replaying the game, then asking JEV…</p>';
      const r = await api('/api/judge', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ level: judgeForm.level.value, seed: Number(judgeForm.seed.value), claim }),
      });
      if (!r.ok) { out.innerHTML = abstain(r.why || 'judge failed'); return; }
      const j = r.judge || {};
      out.innerHTML =
        '<div class="receipt" data-testid="judge-receipt">' +
        '<div class="receipt-head">judged · ' + esc(r.replay.level) + ' · seed ' + fmt(r.replay.seed) + ' · digest <code>' + dig(r.replay.digest) + '</code></div>' +
        (j.verdict !== null && j.verdict !== undefined
          ? '<p class="verdict">JEV verdict: <b>' + esc(j.verdict) + '</b></p>'
          : abstain(j.abstain || 'no verdict returned')) +
        '<p class="dim">receipt: ' + fmt(r.replay.frames) + ' frames, ' + r.replay.hits + ' hits, max speed ×' + r.replay.maxSpeed +
        (r.wall && r.wall.recorded ? ' · recorded on the claim wall (<code>' + esc(r.wall.key) + '</code>)' : '') + '</p>' +
        '</div>';
      wall();
    });
  }

  /* ---------- Claim Wall: verdicts accumulate, receipts stay ---------- */
  async function wall() {
    const mount = $('wall');
    if (!mount) return;
    const r = await api('/api/wall?limit=50');
    if (!r.ok) { mount.innerHTML = abstain(r.why); return; }
    if (!r.count) { mount.innerHTML = '<p class="dim">no verdicts yet — judge a claim and the wall starts.</p>'; return; }
    mount.innerHTML =
      '<table class="sweeptable"><thead><tr><th>when (UTC)</th><th>game</th><th>claim</th><th>verdict</th><th>digest</th></tr></thead><tbody>' +
      r.wall.map((w) => '<tr data-testid="wall-row">' +
        '<td>' + new Date(w.ts).toISOString().slice(0, 19).replace('T', ' ') + '</td>' +
        '<td>' + esc(w.level) + ' · ' + fmt(w.seed) + '</td>' +
        '<td>' + esc(w.claim) + '</td>' +
        '<td>' + (w.verdict !== null && w.verdict !== undefined ? '<b>' + esc(w.verdict) + '</b>' : '<span class="dim">abstain' + (w.abstain ? ': ' + esc(String(w.abstain).slice(0, 40)) : '') + '</span>') + '</td>' +
        '<td><code>' + dig(w.digest) + '</code></td></tr>').join('') +
      '</tbody></table>' +
      '<p class="dim">' + r.count + ' receipts on the wall — each one re-runnable from its game params. No identities stored: claim, verdict, digest, time.</p>';
  }

  /* ---------- moth ledger (read-only) ---------- */
  (async function moth() {
    const mount = $('moth');
    if (!mount) return;
    const r = await api('/api/moth');
    if (!r.ok) { mount.innerHTML = abstain(r.why); return; }
    mount.innerHTML =
      '<div class="coev-nums"><div><b>' + r.jobs + '</b><span>jobs in the ledger</span></div></div>' +
      '<p class="dim">' + esc(r.note) + '</p>' +
      '<ul class="plain">' + (r.recent || []).map((j) =>
        '<li><code>' + esc(j.engine_id) + '</code> — ' + esc(j.status) + ' — ' + esc(j.created_at) + '</li>').join('') + '</ul>';
  })();

  /* ---------- wristband: VERIFIED_CLAIMS live from core.js ---------- */
  (async function wristband() {
    const mount = $('wristband');
    if (!mount) return;
    const r = await api('/api/claims');
    if (!r.ok) { mount.innerHTML = abstain(r.why); return; }
    mount.innerHTML = r.claims.map((c) =>
      '<span class="chip" title="' + esc(c.claim) + ' — proof: ' + esc(c.proofTest) + '">' + esc(c.id) + '</span>').join('') +
      '<p class="dim">' + r.count + ' claims, served from the repo’s own <code>core.js</code> — green = node-pinned proof exists; hover for the claim text and its proof file.</p>';
  })();

  /* ---------- provenance footer ---------- */
  (async function prov() {
    const mount = $('prov');
    if (!mount) return;
    const r = await api('/api/provenance');
    if (!r.ok) { mount.innerHTML = abstain(r.why); return; }
    mount.innerHTML = '<p class="dim">demo byte-identity: ' + r.files + ' files sealed at head <code>' + esc(String(r.head).slice(0, 9)) +
      '</code> — every digest verifiable at <a href="/api/provenance">/api/provenance</a>.</p>';
  })();

  /* ---------- play-here: the actual demo, inline, byte-identical ---------- */
  document.querySelectorAll('[data-play-here]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const holder = document.createElement('div');
      holder.className = 'inline-play';
      holder.innerHTML = '<p class="dim">the repo’s own demo, byte-identical, running here — <a href="' + esc(btn.dataset.playHere) + '" target="_blank" rel="noopener">open full-screen</a>.</p>' +
        '<iframe src="' + esc(btn.dataset.playHere) + '" title="pong-quilt demo (the repo’s own index.html)" loading="lazy"></iframe>';
      btn.replaceWith(holder);
    });
  });

  wall();
})();
