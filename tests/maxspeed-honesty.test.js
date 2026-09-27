// Round 41 pin — L1 maxSpeed metric honesty (R40 playtest finding 2).
// The old playOne() returned the final-frame speedMul. A game ending on a hit
// frame therefore reported (1+frames*ramp)×hitBoost — a boosted value the ball
// never moved at (playtest trace: maxReported 1.0652 vs maxActual 1.0648). The
// metric is now g.maxSeen: the max speed multiplier sampled at frame START,
// i.e. the value the frame's ball movement actually used, before the ramp
// reset and before any hitBoost application. Dynamics are untouched: speedMul
// still carries the boost into sense()/swanP for the next frame.
// FAIL-first: on pre-R41 main, `g.maxSeen` does not exist and every maxSeen
// assertion below trips.
const test = require("node:test");
const assert = require("node:assert/strict");
const PQ = require("../core.js");

const noSwan = () => 0.999; // swanP*speedMul ~ 1e-4 — the swan never fires
const RAMP = PQ.DEFAULTS.ramp, BOOST = PQ.DEFAULTS.hitBoost;

function stageHitFrame() {
  const g = PQ.newGame(noSwan);
  g.frames = 10;
  g.speedMul = 1 + 10 * RAMP;   // value at frame start = the moved-at value
  g.maxSeen = g.speedMul;
  g.x = 0.5; g.y = 0.9399; g.vx = 0.01; g.vy = 0.05; // lands on the paddle line
  g.px = 0.42;                                      // paddle spans 0.42..0.58
  return g;
}

test("newGame initializes maxSeen to the real initial speed (1x)", () => {
  const g = PQ.newGame(noSwan);
  assert.equal(g.maxSeen, 1);
});

test("a game-ending hit frame: speedMul carries NO phantom — the boost enters the law via hitBoost^hits (R50)", () => {
  const g = stageHitFrame();
  const movedAt = 1 + 10 * RAMP;                    // value the ball moved at this frame (staged)
  const lawNext = movedAt + PQ.DEFAULTS.accel * 10 * 10; // R50 law at frames=10, hits=0 — boost term still 1.03^0
  assert.equal(PQ.step(g, 0, noSwan), true, "staged frame must be a hit, not a death");
  assert.equal(g.hits, 1);
  // R50: the hit no longer multiplies speedMul on its own frame — the boost
  // enters PERSISTENTLY through the next frame's law as hitBoost^hits
  assert.ok(Math.abs(g.speedMul - lawNext) < 1e-12,
    "no trailing phantom on the hit frame — just the honest accel term");
  // the metric must report only what the ball moved at
  assert.ok(g.maxSeen >= 1, "maxSeen must exist (Round 41 metric)");
  assert.ok(Math.abs(g.maxSeen - movedAt) < 1e-12,
    "maxSeen records the moved-at speed");
  assert.ok(g.maxSeen < g.speedMul, "moved-at metric excludes what the ball never moved at");
  // and the boost is REAL on the very next frame — persistent, compounding
  const next = PQ.step(g, 0, noSwan);
  assert.equal(next, true);
  const expectedNext = Math.min((1 + 11 * RAMP) * BOOST + PQ.DEFAULTS.accel * 11 * 11, PQ.DEFAULTS.maxSpeedMul);
  assert.ok(Math.abs(g.speedMul - expectedNext) < 1e-12,
    "the boost the ball now ACTUALLY moves at (hitBoost^1 in the law)");
});

test("a boost the next frame ACTUALLY moves at is captured", () => {
  const g = stageHitFrame();
  PQ.step(g, 0, noSwan); // hit frame: hits=1, no phantom — ball moved at the staged value
  const lawNext = (1 + 10 * RAMP) + PQ.DEFAULTS.accel * 10 * 10;
  assert.ok(Math.abs(g.speedMul - lawNext) < 1e-12, "staged: hit frame carries only the honest law");
  g.y = 0.5; g.vy = -0.5; g.x = 0.5; // away from both paddle lines
  PQ.step(g, 0, noSwan);            // this frame MOVES at lawNext...
  assert.ok(Math.abs(g.maxSeen - lawNext) < 1e-12, "...and maxSeen records that moved-at value");
  const boosted = Math.min((1 + 11 * RAMP) * BOOST + PQ.DEFAULTS.accel * 11 * 11, PQ.DEFAULTS.maxSpeedMul);
  assert.ok(Math.abs(g.speedMul - boosted) < 1e-12, "the frame's law now carries hitBoost^1 — a real boost");
  assert.ok(boosted > lawNext, "boost is a real speedup, not a phantom");
  g.y = 0.5; g.vy = -0.5; // keep it away from the lines
  PQ.step(g, 0, noSwan);  // this frame MOVES AT the boosted value
  assert.ok(Math.abs(g.maxSeen - boosted) < 1e-12,
    "the boosted multiplier the next frame moved at is recorded");
});

test("playOne reports a maxSpeed the ball really moved at (seeded smoke)", () => {
  let s = 42;
  const rand = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  const net = PQ.makeNet(rand);
  const r = PQ.playOne(net, rand);
  assert.ok(r.maxSpeed >= 1, "moved at least the initial speed");
  // R50 ceiling: every moved-at value is a frame-start speedMul, which under
  // the R50 law is at most min((1+frames*ramp)·hitBoost^hits + accel·frames², maxSpeedMul)
  const ceil = Math.min((1 + r.frames * RAMP) * Math.pow(BOOST, r.hits || 0) +
                        PQ.DEFAULTS.accel * r.frames * r.frames, PQ.DEFAULTS.maxSpeedMul);
  assert.ok(r.maxSpeed <= ceil + 1e-9,
    "no reported speed exceeds anything the ball could have moved at (R50 law)");
});
