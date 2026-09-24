// Pins for core.makeEvaluator — the edge-ml out-of-core port (streaming
// fitness eval, bounded elite archive). Inspired by
// SuperInstance/quilt-edge-ml src/out_of_core.py.
const test = require("node:test");
const assert = require("node:assert/strict");
const PQ = require("../core.js");

const fit = (i) => ({ fitness: 100 - i, frames: i, hits: 0, maxSpeed: 1 }); // deterministic mock

test("evaluates every candidate exactly once and reports done", () => {
  const cands = Array.from({ length: 17 }, (_, i) => i);
  let calls = 0;
  const ev = PQ.makeEvaluator(cands, (n) => { calls++; return fit(n); }, { eliteK: 4 });
  let snap;
  while (!ev.done) snap = ev.step(5);
  assert.equal(calls, 17);
  assert.equal(snap.evaluated, 17);
  assert.equal(snap.total, 17);
  assert.equal(snap.done, true);
  assert.equal(ev.evaluated, 17);
});

test("elites equal brute-force top-K (stable order under ties)", () => {
  const fitness = [50, 90, 90, 10, 70, 90, 30, 70]; // ties at 90 (idx 1,2,5) and 70 (4,7)
  const ev = PQ.makeEvaluator(fitness, (f) => ({ fitness: f }), { eliteK: 4 });
  let snap; while (!ev.done) snap = ev.step(3);
  const brute = fitness.map((f, i) => ({ f, i })).sort((a, b) => b.f - a.f || a.i - b.i).slice(0, 4);
  assert.deepEqual(snap.elites.map((e) => [e.fitness, e.index]), brute.map((b) => [b.f, b.i]));
});

test("chunked stepping is equivalent to one-shot (scheduling is not semantics)", () => {
  const fitness = Array.from({ length: 40 }, (_, i) => (i * 37) % 101);
  const run = (chunk) => {
    const ev = PQ.makeEvaluator(fitness, (f) => ({ fitness: f }), { eliteK: 4 });
    let snap; while (!ev.done) snap = ev.step(chunk);
    return snap;
  };
  const oneShot = run(40), singles = run(1), sevens = run(7);
  for (const snap of [oneShot, singles, sevens]) {
    assert.deepEqual(snap.elites.map((e) => e.fitness), oneShot.elites.map((e) => e.fitness));
    assert.equal(snap.best.fitness, oneShot.best.fitness);
    assert.equal(snap.mean, oneShot.mean);
  }
});

test("running stats: best and mean track evaluated prefix", () => {
  const cands = [10, 20, 30, 40];
  const ev = PQ.makeEvaluator(cands, (f) => ({ fitness: f }), { eliteK: 2 });
  const s1 = ev.step(2);
  assert.equal(s1.evaluated, 2);
  assert.equal(s1.best.fitness, 20);
  assert.equal(s1.mean, 15);
  assert.equal(s1.done, false);
  const s2 = ev.step(2);
  assert.equal(s2.best.fitness, 40);
  assert.equal(s2.mean, 25);
  assert.equal(s2.done, true);
});

test("elite archive stays bounded regardless of population size (flat memory)", () => {
  const cands = Array.from({ length: 500 }, (_, i) => i);
  const ev = PQ.makeEvaluator(cands, (i) => ({ fitness: i }), { eliteK: 4 });
  let snap; while (!ev.done) snap = ev.step(13);
  assert.equal(snap.elites.length, 4); // 500 evaluated, 4 retained — the out-of-core point
  assert.equal(snap.elites[0].fitness, 499);
});

test("eliteK larger than population keeps everything, sorted desc", () => {
  const ev = PQ.makeEvaluator([3, 1, 2], (f) => ({ fitness: f }), { eliteK: 10 });
  let snap; while (!ev.done) snap = ev.step();
  assert.deepEqual(snap.elites.map((e) => e.fitness), [3, 2, 1]);
  assert.equal(snap.done, true);
});

test("empty population is done immediately with zero stats", () => {
  const ev = PQ.makeEvaluator([], () => ({ fitness: 1 }), { eliteK: 4 });
  const snap = ev.step(5);
  assert.equal(snap.done, true);
  assert.equal(snap.evaluated, 0);
  assert.equal(snap.mean, 0);
  assert.equal(snap.best, null);
  assert.deepEqual(snap.elites, []);
});

test("determinism pin: same seed -> same playOne fitness (swans are seeded)", () => {
  const run = () => {
    const rand = PQ.rng(PQ.DEFAULTS.seed);
    const nets = Array.from({ length: 8 }, () => PQ.makeNet(rand));
    const ev = PQ.makeEvaluator(nets, (n) => PQ.playOne(n, rand), { eliteK: 4 });
    let snap; while (!ev.done) snap = ev.step(3);
    return snap.best.fitness;
  };
  assert.equal(run(), run()); // would flake under Math.random() swans; must not
});
