// R21 quantum-coin tiebreak glue pins (FAIL-first: these pins trip on main,
// where equal-fitness challengers lose silently to index order).
// Seam: core.js makeEvaluator opts.onTie(rec, incumbent) -> true replaces.
// Wired receipted in tools/prerun.js (seeded mock of quilt-quant coin-toss-v1;
// every flip journaled to checkpoints/curve.json tiebreaks, live:false explicit).
// R22 pin (receipt symmetry): the journal must record KEEPS (heads) as well as
// swaps (tails). R21 journaled tails only — an instrumented run of the R21 code
// counted 182 total flips (93 heads + 89 tails) but only 89 receipts, so the
// "89 flips" claim undercounted the stream by half and keeps were unauditable.
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

// Extract the VERBATIM shipped quantumCoinTiebreak and drive it with a
// controlled rand. The function closes at the first line-start '}' after the
// anchor (top-level function declaration).
function extractCoin() {
  const src = require('fs').readFileSync(require('path').join(__dirname, '..', 'tools', 'prerun.js'), 'utf8');
  const anchor = 'function quantumCoinTiebreak(rec, incumbent) {';
  const at = src.indexOf(anchor);
  assert.notStrictEqual(at, -1, 'quantumCoinTiebreak anchor absent — loud fail, not silent skip');
  const tail = src.slice(at);
  const end = tail.indexOf('\n}');
  assert.notStrictEqual(end, -1, 'function close not found');
  return tail.slice(0, end + 2);
}

function driveCoin(randSeq) {
  const tieReceipts = [];
  let curGen = 7;
  const rand = () => randSeq.shift();
  const fn = new Function('rand', 'tieReceipts', 'curGen', extractCoin() + '\nreturn quantumCoinTiebreak;')(rand, tieReceipts, curGen);
  return { fn, tieReceipts };
}

test('RECEIPT SYMMETRY (R22): every flip journaled — heads keeps included, not just tails swaps', () => {
  // H case: rand() < 0.5 => heads => incumbent keeps, AND a receipt must land.
  const h = driveCoin([0.1]);
  const kept = h.fn({ index: 5 }, { index: 2 });
  assert.strictEqual(kept, false, 'heads must keep the incumbent');
  assert.strictEqual(h.tieReceipts.length, 1, 'heads flip must be journaled (R21 silently dropped it)');
  assert.deepStrictEqual(h.tieReceipts[0], { gen: 7, incumbent: 2, challenger: 5, coin: 'H', swap: false,
    engine: 'coin-toss-v1', live: false, citation: 'SuperInstance/quilt-quant lab/play.mjs coin-toss-v1' });
  // T case: rand() >= 0.5 => tails => challenger takes, receipt marks the swap.
  const t = driveCoin([0.9]);
  const took = t.fn({ index: 9 }, { index: 4 });
  assert.strictEqual(took, true, 'tails must give the challenger the crown');
  assert.strictEqual(t.tieReceipts.length, 1);
  assert.deepStrictEqual(t.tieReceipts[0], { gen: 7, incumbent: 4, challenger: 9, coin: 'T', swap: true,
    engine: 'coin-toss-v1', live: false, citation: 'SuperInstance/quilt-quant lab/play.mjs coin-toss-v1' });
  // one burn per flip regardless of outcome — the stream cost is symmetric too.
  assert.strictEqual(h.tieReceipts.length + t.tieReceipts.length, 2);
});
