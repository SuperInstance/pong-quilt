// C1 scaling study v0 pin (queue #2's carried "C1 scaling study — path to
// nonzero learning delta", bounded slice). Convention pins:
//  (1) DETERMINISM — runArm is the page's own training loop (prerun-coev
//      call sequence, parameterized); two invocations with the same
//      (pop, gens, seed) must be deep-equal, or a "scaling difference" could
//      be weather, not scale;
//  (2) SCALING CONTRAST — the probe is only meaningful if population size
//      actually changes the trajectory: pop 8 vs pop 24 at one seed must
//      diverge (different bred populations → different champs);
//  (3) HONESTY — the receipt contract is descriptive, never a learning
//      claim (R66 selection-noise law carried): the module source carries
//      the NO-CLAIM marker and every summary self-labels noLearningClaim.
// FAIL-first: tools/c1-scaling.js does not exist on main.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const TOOL = require("../tools/c1-scaling.js");

test("DETERMINISM: two runArm invocations with the same (pop, gens, seed) are deep-equal", () => {
  const a = TOOL.runArm({ pop: 8, gens: 4, seed: 5 });
  const b = TOOL.runArm({ pop: 8, gens: 4, seed: 5 });
  assert.deepEqual(a, b);
  assert.equal(a.rows.length, 5); // probe gen 0 + 4 gens
});

test("SCALING CONTRAST: pop 8 vs pop 24 at one seed diverge (population size matters to the trajectory)", () => {
  const small = TOOL.runArm({ pop: 8, gens: 4, seed: 5 });
  const large = TOOL.runArm({ pop: 24, gens: 4, seed: 5 });
  assert.notEqual(JSON.stringify(small.rows), JSON.stringify(large.rows));
});

test("HONESTY: the receipt contract is descriptive — NO-CLAIM marker in source, noLearningClaim on every summary", () => {
  const src = fs.readFileSync(path.join(__dirname, "..", "tools", "c1-scaling.js"), "utf8");
  assert.ok(src.includes(TOOL.NO_CLAIM), "tool source must carry the descriptive-contract marker");
  const study = TOOL.runStudy({ pops: [8], seeds: [5], shortGens: 4, longArm: false });
  assert.equal(study.contract, TOOL.NO_CLAIM);
  assert.equal(study.arms.length, 1);
  for (const arm of study.arms) {
    assert.equal(arm.summary.noLearningClaim, true);
    assert.equal(arm.rows.length, 5);
    assert.ok(Number.isFinite(arm.summary.rallyLast5));
    assert.ok(Number.isFinite(arm.summary.sFitLast5));
  }
});
