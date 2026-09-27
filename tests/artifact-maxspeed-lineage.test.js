// Round 42 pin — the canonical L1/L2 artifacts' embedded maxSpeed field is
// line-pinned. Motivation (R42 playtest finding 2): R41 changed the maxSpeed
// METRIC semantics (final-frame speedMul -> maxSeen, the moved-at speed), and
// tools/prerun.js embeds that metric in checkpoints/level1.js + level2.js.
// R42 re-embedded the artifacts and pinned 3.497 / 3.476 so any FUTURE
// metric-semantics change that re-drifts the artifacts trips this pin and
// forces a declared re-embed — never silent drift.
// R50 (escalation: hitBoost revived in the speed law + accel·frames²) is
// exactly such a change: the re-run drifts maxSpeed to 4.443 / 3.411. This
// pin now anchors the post-R50 line (declared in EXPERIMENTS.md); the
// post-R42 values remain in EXPERIMENTS.md as history.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

function artifact(field) {
  const s = fs.readFileSync(path.join(__dirname, "..", "checkpoints", field + ".js"), "utf8");
  return JSON.parse(s.match(/\{"gen".*\}/)[0]);
}

test("committed L1/L2 artifacts carry the post-R50 line's moved-at maxSpeed values", () => {
  const l1 = artifact("level1"), l2 = artifact("level2");
  assert.equal(l1.maxSpeed, 4.443, "level1.js maxSpeed must be the R50 re-embedded moved-at value; a different value means an undeclared metric-semantics drift");
  assert.equal(l2.maxSpeed, 3.411, "level2.js maxSpeed must be the R50 re-embedded moved-at value; a different value means an undeclared metric-semantics drift");
});

test("EXPERIMENTS.md declares the post-R50 line with its L1/L2 hashes", () => {
  const doc = fs.readFileSync(path.join(__dirname, "..", "EXPERIMENTS.md"), "utf8");
  assert.match(doc, /post-R50/i, "EXPERIMENTS.md must declare the post-R50 artifact line");
  for (const h of ["1125d59c", "50137ceb"]) {
    assert.ok(doc.includes(h), `post-R50 hash ${h}… must be named in EXPERIMENTS.md`);
  }
});
