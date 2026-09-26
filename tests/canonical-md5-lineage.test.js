// Round 24 pin — canonical-md5 lineage doctrine in EXPERIMENTS.md (R23 spec
// item, carried from R22's P3-process lie: R21 changed the training path but
// left PLAYLOG holding the 20-round-old "frozen five" md5s, so any future
// round copy-pasting hashes across lines would hit a phantom mismatch).
// Doctrine: prerun artifact hashes are line-specific; verify by running at
// the tip, never by copying from an old entry. Against the pre-R24
// EXPERIMENTS.md this file must FAIL (no lineage rule exists).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const doc = fs.readFileSync(path.join(__dirname, "..", "EXPERIMENTS.md"), "utf8");

test("EXPERIMENTS.md declares artifact hashes line-specific", () => {
  assert.match(doc, /line-specific/i,
    "EXPERIMENTS.md must declare that canonical prerun hashes are line-specific");
});

test("EXPERIMENTS.md names the post-R21 canonical set", () => {
  // The exact abbreviated md5s recorded by the merged R22/R23 receipts.
  for (const h of ["63617065", "8a49b0f6", "643bd132", "454511548"]) {
    assert.ok(doc.includes(h), `post-R21 canonical hash ${h}… must be named in EXPERIMENTS.md`);
  }
  assert.match(doc, /post-R21/i, "…and must be labeled as the post-R21 line");
});

test("EXPERIMENTS.md names the pre-R21 line as the contrast set", () => {
  for (const h of ["ba1c919a", "aa4d7c4b", "63b7fdd5"]) {
    assert.ok(doc.includes(h), `pre-R21 hash ${h}… must be named as the contrast set`);
  }
});

test("the doctrine says verify-by-running, not verify-by-copying", () => {
  assert.match(doc, /verify by running/i,
    "the lineage rule must direct verification to a clean prerun run");
  assert.match(doc, /never by\s*\n?\s*copying|never by copying/i,
    "…and must forbid copying hashes across lines");
});
