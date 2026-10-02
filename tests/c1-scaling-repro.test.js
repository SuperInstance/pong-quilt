// Round 75 durable reproduction pin — the c1-scaling corpus is reproducible
// FROM MAIN, forever (R74 spec item 3, first build; precondition discovered
// this round: PR #92's merge (9718001) imported research/c1-scaling-2026-10-01.json
// WITHOUT its producer — tools/c1-scaling.js existed only on the sibling
// branch 17f9ad7, so the corpus on main was unreproducible-by-construction.
// R75 ports the tool (verbatim, Clerk-authored on the sibling) and pins the
// reproduction. FINDING first, pin second.
//
// How the pin stays cheap: a bounded arm (pop 24 x gens 8) is a deterministic
// PREFIX of the committed 40-gen arms (same seed, same loop — every gen
// depends only on prior state), so 1.4 seconds of CPU pins the corpus instead
// of the full study's ~90s. Measured on main c18d92e: maxRowDrift 0.000000,
// first5 drift 0.000000 at both pinned seeds.
//
// Tests:
//  (1) DURABLE-REPRO — the bounded arm's 9 rows (gen 0..8) match the committed
//      JSON arms[0]/arms[1] rows within 1e-9 (outcome strings exact, integer
//      frames exact, float sFit/eFit within 1e-9). A future core.js training
//      change turns this RED with the field named — the corpus can no longer
//      silently disagree with the code that supposedly produced it.
//  (2) WINDOW-PIN — the first5 windows (rally/sFit, rows [1,6)) of the bounded
//      arm match the committed summary's first5 within 1e-9: the window shape
//      R66/R74 read is itself pinned, not re-derived each reading.
//  (3) DRIFT-SENSITIVITY — the pin is not vacuous: a copy of the committed
//      corpus perturbed by one frame + 1e-6 sFit must EXCEED the 1e-9 band.
//      A tolerance that never fires is applause, not measurement.
//  (4) CORPUS-HONESTY — the committed corpus carries the descriptive contract
//      (NO_CLAIM) and the long arm's singleArmClaim marker (the 160-gen horizon
//      read rests on one seed, flagged, not asserted).
// FAIL-first: on pristine main the tool import throws MODULE_NOT_FOUND (run,
//   recorded in PLAYLOG R75); the tamper-arm of test 3 was RED against a
//   deliberately corrupted expectation during authoring.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const TOOL = require("../tools/c1-scaling.js");

const CORPUS = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "research", "c1-scaling-2026-10-01.json"), "utf8"));
const BOUNDED_GENS = 8;
const TOL = 1e-9;
// The two pinned seeds of the committed pop-24 arms, in corpus order.
const PINS = [
  { seed: 20261001, corpusArm: CORPUS.arms[0] },
  { seed: 20261002, corpusArm: CORPUS.arms[1] },
];

function maxDrift(liveArm, corpusArm) {
  assert.equal(liveArm.rows.length, BOUNDED_GENS + 1, "probe gen 0 + bounded gens");
  assert.ok(corpusArm.rows.length >= liveArm.rows.length, "corpus arm must cover the bounded prefix");
  let drift = 0;
  for (let i = 0; i < liveArm.rows.length; i++) {
    const l = liveArm.rows[i], c = corpusArm.rows[i];
    assert.equal(l.outcome, c.outcome, `outcome drift at gen ${i}`);
    assert.equal(typeof c.frames, "number");
    drift = Math.max(drift, Math.abs(l.frames - c.frames)); // integer frames: exact
    drift = Math.max(drift, Math.abs(l.sFit - c.sFit));
    drift = Math.max(drift, Math.abs(l.eFit - c.eFit));
  }
  return drift;
}

test("DURABLE-REPRO: the bounded pop-24 arm reproduces the committed corpus rows within 1e-9 (both pinned seeds)", () => {
  for (const pin of PINS) {
    const live = TOOL.runArm({ pop: 24, gens: BOUNDED_GENS, seed: pin.seed });
    assert.equal(live.sigma, pin.corpusArm.config.sigma, "sigma parity with the corpus config");
    const drift = maxDrift(live, pin.corpusArm);
    assert.ok(drift <= TOL, `seed ${pin.seed}: row drift ${drift} exceeds ${TOL}`);
  }
});

test("WINDOW-PIN: the bounded arm's first5 windows match the committed summary within 1e-9", () => {
  for (const pin of PINS) {
    const live = TOOL.runArm({ pop: 24, gens: BOUNDED_GENS, seed: pin.seed });
    const s = TOOL.summarize(live);
    assert.ok(Math.abs(s.rallyFirst5 - pin.corpusArm.summary.rallyFirst5) <= TOL,
      `seed ${pin.seed}: rallyFirst5 ${s.rallyFirst5} vs corpus ${pin.corpusArm.summary.rallyFirst5}`);
    assert.ok(Math.abs(s.sFitFirst5 - pin.corpusArm.summary.sFitFirst5) <= TOL,
      `seed ${pin.seed}: sFitFirst5 ${s.sFitFirst5} vs corpus ${pin.corpusArm.summary.sFitFirst5}`);
  }
});

test("DRIFT-SENSITIVITY: a one-frame + 1e-6 sFit perturbed corpus copy exceeds the 1e-9 band (the pin can fire)", () => {
  const live = TOOL.runArm({ pop: 24, gens: BOUNDED_GENS, seed: PINS[0].seed });
  const tampered = JSON.parse(JSON.stringify(PINS[0].corpusArm));
  tampered.rows[3].frames += 1;           // a whole-frame trajectory drift
  tampered.rows[3].sFit += 1e-6;          // sub-visible fitness drift
  const drift = maxDrift(live, tampered);
  assert.ok(drift > TOL, `tampered copy drifted only ${drift} — the band would be vacuous`);
});

test("CORPUS-HONESTY: the committed corpus carries the descriptive contract and the single-arm flag on the long arm", () => {
  assert.equal(CORPUS.contract, TOOL.NO_CLAIM);
  assert.equal(CORPUS.arms.length, 7);
  const longArm = CORPUS.arms[6];
  assert.equal(longArm.summary.noLearningClaim, true);
  assert.equal(longArm.summary.singleArmClaim, true, "the 160-gen horizon read rests on one seed and says so");
  assert.match(String(longArm.summary.singleArmNote), /one seed/);
});
