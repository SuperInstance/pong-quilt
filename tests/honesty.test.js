// Round 3 pins — the honesty pass: fitness weights, the 0-hit badge, the
// effective-paddle (drawn == registered), seeded-swan determinism, and the
// wristband two-way match (VERIFIED_CLAIMS <-> files in tests/).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

// --- fitness weights: hits must matter --------------------------------------
test("fitnessOf: a capped 0-hit survivor scores maxFrames and loses to any hitter past maxFrames-100", () => {
  const cap = PQ.DEFAULTS.maxFrames;
  assert.equal(PQ.fitnessOf(cap, 0), cap);
  assert.ok(PQ.fitnessOf(cap - 99, 1) > PQ.fitnessOf(cap, 0),
    "one hit + 5,901 frames tops a 0-hit capped survivor");
  assert.ok(PQ.fitnessOf(cap, 0) < PQ.fitnessOf(cap - 200, 3));
  assert.equal(PQ.HIT_WEIGHT, 100);
});

test("playOne reports the weighted fitness", () => {
  const rand = PQ.rng(11);
  const net = PQ.makeNet(rand);
  const r = PQ.playOne(net, PQ.rng(99));
  assert.equal(r.fitness, PQ.fitnessOf(r.frames, r.hits));
});

// --- the badge ---------------------------------------------------------------
test("formatStats flags 0-hit luck and shows hits otherwise", () => {
  const lucky = { fitness: 6000, frames: 6000, hits: 0, maxSpeed: 3.4 };
  const s = PQ.formatStats(7, 120, lucky);
  assert.match(s, /0-hit luck/);
  assert.match(s, /0 hits/);
  const skilled = { fitness: 6400, frames: 6000, hits: 4, maxSpeed: 3.4 };
  const s2 = PQ.formatStats(8, 130, skilled);
  assert.doesNotMatch(s2, /0-hit luck/);
  assert.match(s2, /4 hits/);
});

test("formatStats does not flag a 0-hit game that died early (no luck to badge)", () => {
  const earlyDeath = { fitness: 300, frames: 300, hits: 0, maxSpeed: 1.1 };
  assert.doesNotMatch(PQ.formatStats(1, 10, earlyDeath), /0-hit luck/);
});

// --- effective paddle: drawn zone == registered zone -------------------------
test("effectivePaddle geometry: 0.20 wide centered on px", () => {
  for (const px of [0, 0.05, 0.2, 0.55, 0.8]) {
    const eff = PQ.effectivePaddle(px);
    assert.equal(eff.x, px - PQ.EFFECTIVE_MARGIN);
    assert.equal(eff.w, PQ.DEFAULTS.paddleW + 2 * PQ.EFFECTIVE_MARGIN);
  }
});

test("step() registers hits exactly over the effective zone (boundary probe)", () => {
  const savedSwan = PQ.DEFAULTS.swanP;
  PQ.DEFAULTS.swanP = 0; // deterministic micro-probe: no swans
  const mk = (x) => { const g = PQ.newGame(PQ.rng(3)); g.frames = 1; g.x = x; g.vx = 0;
    g.y = 0.9385; g.vy = 0.5; g.px = 0.5; g.hold = 0; return g; }; // y+0.002 crosses 0.94 this frame
  const inside = mk(0.5 - PQ.EFFECTIVE_MARGIN + 0.001);
  assert.equal(PQ.step(inside, 0, PQ.rng(5)), true);
  assert.equal(inside.hits, 1);
  const outside = mk(0.5 - PQ.EFFECTIVE_MARGIN - 0.001);
  assert.equal(PQ.step(outside, 0, PQ.rng(5)), false); // death — just past the drawn edge
  PQ.DEFAULTS.swanP = savedSwan;
});

// --- seeded swan: reproducibility is a fence ---------------------------------
test("step/playOne are bit-reproducible when a rand is threaded (swans included)", () => {
  const savedSwan = PQ.DEFAULTS.swanP;
  PQ.DEFAULTS.swanP = 0.5; // force swans to fire constantly — the P0 path
  const net = PQ.makeNet(PQ.rng(1));
  const run = () => PQ.playOne(net, PQ.rng(777));
  const a = run(), b = run();
  assert.deepEqual(a, b); // identical fitness/frames/hits — the swan drew from the seed
  PQ.DEFAULTS.swanP = savedSwan;
});

test("checkpoints are internally consistent with the CURRENT fitness formula", () => {
  for (const lvl of ["level0", "level1", "level2"]) {
    const text = fs.readFileSync(path.join(__dirname, "..", "checkpoints", `${lvl}.js`), "utf8");
    const cp = JSON.parse(text.split("]=")[1].replace(/;\s*$/, ""));
    assert.equal(cp.bestFitness, PQ.fitnessOf(cp.bestHits ? cp.bestFrames : cp.bestFrames, cp.bestHits),
      `${lvl}: bestFitness must equal frames + hits*100`);
    assert.ok(cp.bestHits > 0, `${lvl}: a 0-hit champion must never be committed (honesty pass)`);
  }
});

// --- wristband two-way match --------------------------------------------------
test("VERIFIED_CLAIMS proofTest files exist and every test file backs a claim", () => {
  const claims = PQ.VERIFIED_CLAIMS.filter((c) => c.proofTest).map((c) => c.proofTest);
  const files = fs.readdirSync(__dirname).filter((f) => f.endsWith(".test.js")).map((f) => `tests/${f}`);
  for (const c of claims) assert.ok(files.includes(c), `missing test file for claim: ${c}`);
  for (const f of files) assert.ok(claims.includes(f), `test file backs no claim (add to VERIFIED_CLAIMS): ${f}`);
  const browserOnly = PQ.VERIFIED_CLAIMS.filter((c) => !c.proofTest);
  assert.ok(browserOnly.length > 0, "the wristband must admit browser-only claims honestly");
});
