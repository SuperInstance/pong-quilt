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

test("a game-ending hit frame: speedMul carries the boost, the metric excludes the phantom", () => {
  const g = stageHitFrame();
  const movedAt = 1 + 10 * RAMP;
  assert.equal(PQ.step(g, 0, noSwan), true, "staged frame must be a hit, not a death");
  assert.equal(g.hits, 1);
  // dynamics kept: the trailing boost still lands on speedMul (it feeds
  // sense()/swanP on any subsequent frame — the input law is unchanged)
  assert.ok(Math.abs(g.speedMul - movedAt * BOOST) < 1e-12,
    "speedMul itself must still carry hitBoost");
  // the metric must report only what the ball moved at
  assert.ok(g.maxSeen >= 1, "maxSeen must exist (Round 41 metric)");
  assert.ok(Math.abs(g.maxSeen - movedAt) < 1e-12,
    "maxSeen records the moved-at speed, not the trailing phantom boost");
  assert.ok(g.maxSeen < g.speedMul, "phantom boost excluded from the metric");
});

test("a boost the next frame ACTUALLY moves at is captured", () => {
  const g = stageHitFrame();
  PQ.step(g, 0, noSwan); // hit: speedMul now boosted, ball rising
  const boosted = g.speedMul;
  assert.ok(boosted > g.maxSeen, "staged: boost not yet moved at");
  g.y = 0.5; g.vy = -0.5; g.x = 0.5; // away from both paddle lines
  PQ.step(g, 0, noSwan);
  assert.ok(Math.abs(g.maxSeen - boosted) < 1e-12,
    "the boosted multiplier the next frame moved at is recorded");
});

test("playOne reports a maxSpeed the ball really moved at (seeded smoke)", () => {
  let s = 42;
  const rand = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  const net = PQ.makeNet(rand);
  const r = PQ.playOne(net, rand);
  assert.ok(r.maxSpeed >= 1, "moved at least the initial speed");
  // loose physical ceiling: every moved-at value is a frame-start speedMul,
  // which is at most (1 + frames*ramp) scaled by one hit boost ceiling
  assert.ok(r.maxSpeed <= (1 + r.frames * RAMP) * BOOST + 1e-9,
    "no reported speed exceeds anything the ball could have moved at");
});
