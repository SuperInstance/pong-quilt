// Round 83 pin — the README "Real starting states" table rot, killed
// structurally (R82 spec item 1, first build; P1 confirmed this round).
//
// Wound found: the table carried pre-×100 values (5,767 / 8,800 / 8,700 —
// hits 12 / 28 / 27, all at the 6,000f cap) while the current ×100 line
// produces 1,890 / 2,010 / 1,753 (hits 2 / 2 / 3, max frames 1,810 — nobody
// reaches the cap). The values had silently rotated under the table: the
// ×100 honesty pass (Round 3) re-evolved the checkpoints and updated the
// md5 hashes in the prose below the table, but the table itself still
// described the ×25 era. A reader reproducing a row would see numbers that
// matched neither the table nor each other.
//
// Fix: the table is now a claim this file verifies against the committed
// checkpoint artifacts (themselves the prerun receipt — gen/bestFitness/
// bestFrames/bestHits/maxSpeed are embedded in each file's header JSON).
// Any future re-evolution that changes the artifacts trips this pin and
// forces a declared table update — never silent drift (the R52 lesson:
// prose guarded by nothing rots silently; prose pinned by a test rots
// loudly).
//
// FAIL-first: on the pre-fix README (5,767 etc.) every value assertion
// below fails; after the fix all pass.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

function artifact(level) {
  const s = fs.readFileSync(
    path.join(__dirname, "..", "checkpoints", level + ".js"), "utf8");
  return JSON.parse(s.match(/\{"gen".*\}/)[0]);
}

function readme() {
  return fs.readFileSync(path.join(__dirname, "..", "README.md"), "utf8");
}

// The canonical prerun outputs (verified by running tools/prerun.js at this
// round: same-seed byte-reproducible, md5-verified). Speeds printed to 2dp.
const EXPECTED = {
  "L0 random":       { gen: 0,   fitness: 1890, frames: 1690, hits: 2, speed: "4.06" },
  "L1 mid-training": { gen: 60,  fitness: 2010, frames: 1810, hits: 2, speed: "4.44" },
  "L2 trained":      { gen: 260, fitness: 1753, frames: 1453, hits: 3, speed: "3.41" },
};

test("README table rows match the committed checkpoint artifacts", () => {
  const doc = readme();
  for (const [label, exp] of Object.entries(EXPECTED)) {
    // e.g. "| L0 random | 0 | 1,890 | 1,690 | 2 | ×4.06 |"
    const row = doc.split("\n").find(l => l.startsWith(`| ${label} `));
    assert.ok(row, `README must carry a table row for ${label}`);
    const cells = row.split("|").map(c => c.trim());
    assert.equal(cells[2], String(exp.gen), `${label} gen`);
    assert.equal(cells[3], exp.fitness.toLocaleString("en-US"), `${label} best fitness`);
    assert.equal(cells[4], exp.frames.toLocaleString("en-US"), `${label} frames`);
    assert.equal(cells[5], String(exp.hits), `${label} hits`);
    assert.equal(cells[6], `×${exp.speed}`, `${label} max speed`);
  }
});

test("table values equal the artifact header receipts", () => {
  const art = { "L0 random": artifact("level0"), "L1 mid-training": artifact("level1"), "L2 trained": artifact("level2") };
  for (const [label, exp] of Object.entries(EXPECTED)) {
    const a = art[label];
    assert.equal(a.gen, exp.gen, `${label} artifact gen`);
    assert.equal(a.bestFitness, exp.fitness, `${label} artifact bestFitness`);
    assert.equal(a.bestFrames, exp.frames, `${label} artifact bestFrames`);
    assert.equal(a.bestHits, exp.hits, `${label} artifact bestHits`);
    assert.equal(a.maxSpeed.toFixed(2), exp.speed, `${label} artifact maxSpeed`);
  }
});

test("the L1>L2 prose names the real mechanism (frames gap, not hits)", () => {
  const doc = readme();
  assert.match(doc, /1,810 frames where the gen-260 one managed 1,453/,
    "the L1>L2 note must explain the gap as a survival difference");
  assert.match(doc, /survival-dominated/,
    "the plateau note must describe the current survival-dominated regime");
});
