// Round 42 pin — the canonical L1/L2 artifacts' embedded maxSpeed field is
// line-pinned. Motivation (R42 playtest finding 2): R41 changed the maxSpeed
// METRIC semantics (final-frame speedMul -> maxSeen, the moved-at speed), and
// tools/prerun.js embeds that metric in checkpoints/level1.js + level2.js
// (prerun.js:69). Result: at the merged R41 tip, `node tools/prerun.js`
// regenerated L1/L2 with DIFFERENT md5s (cf08b000…/c8ba57db…) than the
// committed frozen files (643bd132…/454511548…) while the R41 receipt claimed
// "md5 set byte-frozen, untouched this round" — the R22 verify-by-copying
// class recurred in a receipt. Field-by-field parse (R42) proved the trained
// populations are byte-identical; only the maxSpeed field drifted
// (3.400 -> 3.497 / 3.476). R42 re-embedded the artifacts (declared as the
// post-R42 line in EXPERIMENTS.md) and pins the values here so any FUTURE
// metric-semantics change that re-drifts the artifacts trips this pin and
// forces a declared re-embed — never silent drift.
// FAIL-first by construction: on pre-re-embed main the committed files carry
// 3.400 and EXPERIMENTS.md has no post-R42 line, so every assertion trips.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

function artifact(field) {
  const s = fs.readFileSync(path.join(__dirname, "..", "checkpoints", field + ".js"), "utf8");
  return JSON.parse(s.match(/\{"gen".*\}/)[0]);
}

test("committed L1/L2 artifacts carry the post-R42 line's moved-at maxSpeed values", () => {
  const l1 = artifact("level1"), l2 = artifact("level2");
  assert.equal(l1.maxSpeed, 3.497, "level1.js maxSpeed must be the R41 moved-at value 3.497 (re-embedded R42); a different value means a metric-semantics change drifted the artifact without a declared re-embed");
  assert.equal(l2.maxSpeed, 3.476, "level2.js maxSpeed must be the R41 moved-at value 3.476 (re-embedded R42); a different value means a metric-semantics change drifted the artifact without a declared re-embed");
});

test("EXPERIMENTS.md declares the post-R42 line with its L1/L2 hashes", () => {
  const doc = fs.readFileSync(path.join(__dirname, "..", "EXPERIMENTS.md"), "utf8");
  assert.match(doc, /post-R42/i, "EXPERIMENTS.md must declare the post-R42 artifact line");
  for (const h of ["cf08b000", "c8ba57db"]) {
    assert.ok(doc.includes(h), `post-R42 hash ${h}… must be named in EXPERIMENTS.md`);
  }
});
