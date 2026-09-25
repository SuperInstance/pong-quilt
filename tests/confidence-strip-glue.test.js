// Round 15 spec item 3 pin — the confidence-vs-pot strip.
// R15 (play-tester) measured the envelope by hand: mean qa-sim confidence
// rises from 0.427 at the shots floor (spb=2) to a 0.496 asymptote, with
// null fraction 1.00 below the floor. The spec wants that shape PLOTTED on
// the tile ("more shots -> more consistent imaging" is the QPAM story's most
// demo-able shape) with the trend PINNED on the cached grid — visual stays a
// browser-only claim, the numbers are test-visible.
// Build: (1) qa.js exposes confidenceEnvelope(seed) — computed ONCE over a
// fixed state grid, cached, returning per-spb {spb, meanConf, nullFrac};
// (2) the page renders a 64x12 strip from the cached grid whenever the qa
// module is active.
// FAIL-first: against the R15 tip the MODULE pin fails (no such export) and
// the GLUE pin fails (no strip canvas in index.html).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const QA = require("../qa.js");

const FLOOR = QA.SIM_POT_FLOOR;

test("MODULE: confidenceEnvelope() returns a cached per-spb grid with honest shape", () => {
  assert.equal(typeof QA.confidenceEnvelope, "function", "qa.js must export confidenceEnvelope(seed)");
  const env = QA.confidenceEnvelope();
  assert.ok(Array.isArray(env) && env.length > FLOOR, "grid must cover spb values across the slider range");
  // grid is indexed by spb, dense from 0
  env.forEach((row, i) => assert.equal(row.spb, i, `row ${i} must be indexed by its spb`));
  // below the floor: the pot is EMPTY — every measurement returns no advice
  for (let spb = 0; spb < FLOOR; spb++) {
    assert.equal(env[spb].nullFrac, 1, `spb=${spb} below the floor must refuse every state`);
  }
  // at/above the floor the channel images: somebody gets advice
  assert.ok(env[FLOOR].nullFrac < 1, `spb=${FLOOR} (the floor) must advise on at least one grid state`);
  // the trend the strip plots: more shots -> more consistent imaging.
  // (mean over advised states; per-state noise makes adjacent wobble honest,
  // so pin the endpoints, not pointwise monotonicity)
  assert.ok(
    env[env.length - 1].meanConf > env[FLOOR].meanConf,
    `mean confidence must rise from the floor (${env[FLOOR].meanConf}) to the top of the pot (${env[env.length - 1].meanConf})`
  );
  // confidence is capped by the sim honesty contract everywhere
  for (const row of env) assert.ok(row.meanConf <= QA.SIM_MAX_CONF + 1e-9, `spb=${row.spb} exceeds the sim cap`);
  // determinism + caching: same reference back, independent of call order
  assert.equal(QA.confidenceEnvelope(), env, "the envelope is computed once and cached");
  assert.deepEqual(QA.confidenceEnvelope(123), env, "a different seed must not silently re-roll the cached grid");
});

test("GLUE: index.html renders the strip from the cached envelope when qa is active", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  assert.ok(html.includes('id="qastrip"'), "the page must carry the 64x12 strip canvas");
  assert.ok(html.includes("confidenceEnvelope"), "the page must plot from QA.confidenceEnvelope (the cached grid the pin tests)");
  // the strip must be wired to qa-mode visibility like the pot slider, not always-on
  assert.ok(
    /qastrip/.test(html.slice(html.indexOf('id="l2"'))) ,
    "qastrip wiring must live in the qa-mode glue region (near the pot slider toggle)"
  );
});
