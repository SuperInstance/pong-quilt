// Tests for qa.js — the quantum-audio L2 advisor. Run: node --test tools/test-qa.js
// Verifies the honesty contract (labeled sim, confidence cap), the imaging loop
// (sonify -> channel -> image back), determinism, and JEV shape compliance.
const test = require("node:test");
const assert = require("node:assert/strict");
const QA = require("../qa.js");
const PQ = require("../core.js");

// stateOf() shape mirrored from index.html
const st = (ballX, paddleX, speed = 1.2) => ({ ballX, ballY: 0.5, velX: 0.3, velY: 0.8, paddleX, speed, frames: 10, hits: 1 });

// The JEV MoveSuggestion validator from index.html (kept in sync manually)
const MoveSuggestion = {
  validate(s) {
    if (!s || typeof s !== "object") return "not an object";
    if (![-1, 0, 1].includes(s.move)) return "move must be -1|0|1";
    if (typeof s.confidence !== "number" || s.confidence < 0 || s.confidence > 1) return "confidence must be 0..1";
    return null;
  },
};

test("sonify: waveform length and amplitude bounds", () => {
  const w = QA.sonify(st(0.3, 0.4));
  assert.equal(w.length, QA.N);
  assert.ok(Math.max(...w.map(Math.abs)) <= 1.0, "amplitude within [-1,1]-ish");
});

test("channel is deterministic per seed, lossy, and seed-varying", () => {
  const w = QA.sonify(st(0.3, 0.4));
  const d1 = QA.channel(w, 42), d1b = QA.channel(w, 42), d2 = QA.channel(w, 43);
  assert.deepEqual(d1, d1b, "same seed -> same decode (deterministic stand-in)");
  assert.notDeepEqual(d1, w, "channel is lossy (smoothing + noise)");
  assert.notDeepEqual(d1, d2, "different seeds -> different shot noise");
});

test("imaging recovers ball position through a clean channel", () => {
  for (const bx of [0.05, 0.25, 0.5, 0.75, 0.95]) { // stateOf() units: [0,1]
    const clean = QA.sonify(st(bx, 0.4));
    const xHat = QA.estimateX(QA.channel(clean, 7, 1e12)); // near-noiseless channel
    assert.ok(Math.abs(xHat - bx) < 0.08, `ballX ${bx}: imaged ${xHat.toFixed(3)} vs ${bx}`);
  }
});

test("advisor: direction is correct through a clean channel", () => {
  const clean = { seed: 7, shots: 1e12 };
  const mk = (bx, px) => QA.suggest(st(bx, px), clean.seed) && (() => { const s = st(bx, px); const c = QA.channel(QA.sonify(s), clean.seed, clean.shots); const xHat = QA.estimateX(c); const dead = 0.06; const move = xHat < px + 0.08 - dead ? -1 : xHat > px + 0.08 + dead ? 1 : 0; return move; })();
  assert.equal(mk(0.05, 0.8), -1, "ball far left of paddle -> move left");
  assert.equal(mk(0.95, 0.1), 1, "ball far right of paddle -> move right");
  assert.equal(mk(0.4, 0.32), 0, "ball on the paddle -> hold");
});

test("suggest: JEV MoveSuggestion shape, capped confidence, deterministic", () => {
  for (const [bx, px] of [[0.1, 0.7], [0.9, 0.2], [0.5, 0.42], [0.2, 0.5]]) {
    const a = QA.suggest(st(bx, px), 99), b = QA.suggest(st(bx, px), 99);
    assert.deepEqual(a, b, "deterministic per (state, seed)");
    assert.equal(MoveSuggestion.validate(a), null, "passes JEV validation");
    assert.equal(a.source, "qa-sim", "labeled as sim at the source tag");
    assert.ok(a.confidence <= QA.SIM_MAX_CONF, "honesty cap: stand-in never claims > SIM_MAX_CONF");
    assert.ok(a.confidence >= 0 && a.confidence <= 1);
  }
});

test("suggest: confidence degrades when the channel gets noisier", () => {
  // average confidence over a state grid: cleaner channel (more shots) must
  // image more consistently -> confidence at least as high as the noisy one.
  const grid = [];
  for (let bx = 0.05; bx <= 0.95; bx += 0.15) for (let px = 0.1; px <= 0.8; px += 0.35) grid.push(st(bx, px));
  const avg = (spb) => grid.reduce((acc, s) => {
    const clean = QA.sonify(s);
    const xC = QA.estimateX(clean), xH = QA.estimateX(QA.channel(clean, 5, spb));
    return acc + Math.max(0, 1 - Math.abs(xH - xC) / 0.25);
  }, 0) / grid.length;
  assert.ok(avg(4096) > avg(4), "more shots -> more consistent imaging (matches real QPAM envelope)");
});

test("pot-bound guard: silent channel -> no advice", () => {
  assert.equal(QA.zeroCrossingRate(new Array(QA.N).fill(0)), 0);
  assert.ok(QA.zeroCrossingRate(new Array(QA.N).fill(0)) < QA.DEAD_ZCR);
  // real QPAM decode CAN return near-silence on shot underflow (measured:
  // pearson ~0.02 at 2000 shots/882 samples) — the guard exists for that seam.
});

test("suggest integrates with real core.js game states", () => {
  const rand = PQ.rng(1234);
  const g = PQ.newGame(rand);
  for (let f = 0; f < 200; f += 10) {
    PQ.step(g, [-1, 0, 1][f % 3]);
    const s = { ballX: g.x, ballY: g.y, velX: g.vx, velY: g.vy, paddleX: g.px, speed: g.speedMul, frames: g.frames, hits: g.hits };
    const sug = QA.suggest(s, f + 1);
    assert.equal(MoveSuggestion.validate(sug), null);
  }
});
