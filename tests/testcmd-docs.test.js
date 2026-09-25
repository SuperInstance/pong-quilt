// Round 15 pin — canonical test command in EXPERIMENTS.md (R13 spec item 1,
// carried from R12#2/R12-process-P3: three rounds re-derived by hand that
// `node --test tests` (directory form, Node 22) fails opaquely while the glob
// form `node --test tests/*.test.js` is the suite). Against the pre-R15
// EXPERIMENTS.md this test must FAIL (the file names no canonical command).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const doc = fs.readFileSync(path.join(__dirname, "..", "EXPERIMENTS.md"), "utf8");

test("EXPERIMENTS.md names the canonical suite command (glob form)", () => {
  assert.match(doc, /`node --test tests\/\*\.test\.js`/, // must appear as a literal command
    "EXPERIMENTS.md must name `node --test tests/*.test.js` as the canonical suite command");
});

test("EXPERIMENTS.md warns against the opaque directory form", () => {
  assert.match(doc, /node --test tests\b(?!\/\*)/, // the bare directory form is mentioned…
    "EXPERIMENTS.md must mention the bare `node --test tests` form");
  const warn = doc.match(/node --test tests\b(?!\/\*)[^\n]*/g).some((l) =>
    /opaque|fails|EISDIR|do not|don't|not the canonical/i.test(l));
  assert.ok(warn, "…and the mention must flag it as failing/opaque, not recommend it");
});
