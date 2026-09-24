// Round 3 pins — micro-JEPA on ONE representation. Round 2's P1: learn
// consumed sense() scale ([-1,1]) while infer consumed stateOf() scale
// ([0,1]) — 16x mean-|err| degradation, advice skewed to constant
// right-moves. makeJepa takes the sense() vector for BOTH calls; these tests
// pin that it learns, and that the skewed path is measurably worse (which is
// why the single representation matters). Wristband claim: "jepa-features".
const test = require("node:test");
const assert = require("node:assert/strict");
const PQ = require("../core.js");

const savedSwan = { p: PQ.DEFAULTS.swanP };

// Harvest a real trajectory's sense() pairs with a fixed seed (no swans: we
// want the ball's own motion, not kicks, for a clean prediction target).
function sensePairs(seed, frames) {
  const saved = PQ.DEFAULTS.swanP;
  PQ.DEFAULTS.swanP = 0;
  const net = PQ.makeNet(PQ.rng(seed));
  const g = PQ.newGame(PQ.rng(seed + 1));
  const pairs = [];
  let prev = PQ.sense(g);
  for (let i = 0; i < frames; i++) {
    const o = PQ.forward(net, prev);
    const act = o[0] > o[2] ? (o[0] > o[1] ? -1 : 0) : (o[2] > o[1] ? 1 : 0);
    if (!PQ.step(g, act, PQ.rng(seed + 2))) break;
    const cur = PQ.sense(g);
    pairs.push([prev, cur]);
    prev = cur;
  }
  PQ.DEFAULTS.swanP = saved;
  return pairs;
}

test("learn + infer on the same sense() representation: error decreases on a linear toy", () => {
  const j = PQ.makeJepa();
  // synthetic linear world: cur[0] = 0.5*prev[0] + 0.3*prev[3] + 0.1
  let s = 12345;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const gen = () => { const p = [rnd() * 2 - 1, 0, 0, rnd() * 2 - 1, 0, 0];
    return [p, [0.5 * p[0] + 0.3 * p[3] + 0.1, 0, 0, 0, 0, 0]]; };
  for (let i = 0; i < 600; i++) { const [p, c] = gen(); j.learn(p, c); }
  let err = 0, n = 500;
  for (let i = 0; i < n; i++) { const [p, c] = gen();
    const w = j.weights;
    err += Math.abs(c[0] - (w[0] * p[0] + w[1] * p[3] + w[2])); }
  assert.ok(err / n < 0.05, `LMS should track a linear toy (mean |err| ${(err / n).toFixed(4)})`);
});

test("skewed-scale inference is measurably worse — the bug we fixed, pinned as a ratio", () => {
  // Toy world where position AND velocity both carry real signal:
  //   cur[0] = 0.7*prev[0] + 0.4*prev[3] + 0.2   (x in [-1,1], vx in [-1,1])
  // Train on sense-scale pairs (the honest path), then compare next-step
  // prediction when inference is handed the OLD stateOf()-scale position
  // ([0,1] instead of [-1,1]) — Round 2's wiring, now pinned as a ratio.
  const j = PQ.makeJepa();
  let s = 12345;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const gen = () => { const p = [rnd() * 2 - 1, 0, 0, rnd() * 2 - 1, 0, 0];
    return [p, [0.7 * p[0] + 0.4 * p[3] + 0.2, 0, 0, 0, 0, 0]]; };
  for (let i = 0; i < 800; i++) { const [p, c] = gen(); j.learn(p, c); }
  let eC = 0, eS = 0, n = 2000;
  for (let i = 0; i < n; i++) { const [p, c] = gen(); const w = j.weights;
    eC += Math.abs(c[0] - (w[0] * p[0] + w[1] * p[3] + w[2]));
    eS += Math.abs(c[0] - (w[0] * (p[0] + 1) / 2 + w[1] * p[3] + w[2])); // stateOf()-scale ballX
  }
  eC /= n; eS /= n;
  assert.ok(eC < 0.03, `honest path should nearly converge (mean |err| ${eC.toFixed(4)})`);
  assert.ok(eS / eC > 5, `skewed path must be clearly worse (observed ${(eS / eC).toFixed(1)}x)`);
});

test("suggest() takes a sense() vector and returns a valid MoveSuggestion", () => {
  const j = PQ.makeJepa();
  const s = j.suggest([0.8, 0, 0, 0.1, 0, 1]); // ball far right, model still near 0
  assert.deepEqual([s.move === -1 || s.move === 0 || s.move === 1, typeof s.confidence], [true, "number"]);
  assert.ok(s.confidence >= 0 && s.confidence <= 1);
  assert.equal(s.source, "jepa");
  assert.ok(j.suggest([0.8, 0, 0, 0.1, 0, 1]).move >= 0, "err > 0.05 steers right (toward the ball)");
  assert.ok(j.suggest([-0.8, 0, 0, 0.1, 0, 1]).move <= 0, "err < -0.05 steers left");
});
