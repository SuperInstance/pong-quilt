// R21 quantum-coin tiebreak glue pins (FAIL-first: these pins trip on main,
// where equal-fitness challengers lose silently to index order).
// Seam: core.js makeEvaluator opts.onTie(rec, incumbent) -> true replaces.
// Wired receipted in tools/prerun.js (seeded mock of quilt-quant coin-toss-v1;
// every flip journaled to checkpoints/curve.json tiebreaks, live:false explicit).
'use strict';
const test = require('node:test'), assert = require('node:assert');
const PQ = require('../core.js');
const { makeEvaluator } = PQ;

const mk = (i, fitness) => ({ index: i, fitness, frames: 1, hits: 0, maxSpeed: 1 });

function runBoth(fitnesses, opts) {
  let calls = 0;
  const ev = makeEvaluator(fitnesses.map((f, i) => i), () => ({ fitness: fitnesses[calls], frames: 1, hits: 0, maxSpeed: 1 }), opts);
  // evalOne receives (candidate, i); index the fitness by call count via closure
  let n = 0;
  const ev2 = makeEvaluator(fitnesses.map((f, i) => i),
    (_c, i) => ({ fitness: fitnesses[i], frames: 1, hits: 0, maxSpeed: 1 }), opts);
  void ev; void n;
  let snap;
  while (!ev2.done) snap = ev2.step(100);
  return snap;
}

test('default: equal-fitness challenger loses silently (index-order bias, documented)', () => {
  const snap = runBoth([10, 10, 10]);
  assert.strictEqual(snap.best.index, 0); // first record kept, ties invisible
});

test('onTie seam: challenger takes on tails, incumbent keeps on heads', () => {
  const flips = [];
  const coin = (rec, inc) => { const tails = flips.length % 2 === 0; flips.push({ ch: rec.index, inc: inc.index, tails }); return tails; };
  const snap = runBoth([10, 10, 10], { onTie: coin });
  assert.strictEqual(snap.best.index, 1); // first tie tails -> challenger takes; second tie heads -> incumbent keeps
  assert.deepStrictEqual(flips.map(f => f.tails), [true, false]);
  assert.deepStrictEqual(flips[0], { ch: 1, inc: 0, tails: true });
});

test('onTie not consulted when fitness differs (no coin burn on decisive gens)', () => {
  let calls = 0;
  const snap = runBoth([10, 12, 9], { onTie: () => { calls++; return true; } });
  assert.strictEqual(snap.best.index, 1);
  assert.strictEqual(calls, 0);
});

test('prerun wires the seam with receipted seeded coin (citation + live:false)', () => {
  const src = require('fs').readFileSync(require('path').join(__dirname, '..', 'tools', 'prerun.js'), 'utf8');
  assert.match(src, /onTie:\s*quantumCoinTiebreak/);
  assert.match(src, /coin-toss-v1/);       // quilt-quant engine cited
  assert.match(src, /live:\s*false/);       // mock never laundered as live entropy
  assert.match(src, /tiebreaks:\s*tieReceipts/); // every flip journaled to curve.json
});
