// Round 87 — the v1 baseline distribution artifact pin (R87 spec item 1,
// 3rd carrying, first build).
//
// Wound closed: every PLAYLOG round since R76 hand-typed the v1 draw tally
// table into its entry (23 exercises so far) — the exact ledger-over-prose
// drift class R76/R86 closed for counts and comments, still open for the
// table body. tools/v1-dist.js now recomputes research/v1-distribution.json
// from research/v1-draws.jsonl; PLAYLOG entries cite the artifact instead
// of re-typing distributions.
//
// Tests:
//  (1) ARTIFACT-EQUALS-LEDGER — the committed artifact deep-equals a fresh
//      computation from the ledger (a stale artifact after an append fails
//      here, FAIL-first by construction).
//  (2) TALLY-EQUALS-R76-PIN — the tool's tally derivation deep-equals the
//      EXPECTED_TALLIES table TEXTUALLY parsed from the r76 glue — two
//      independent derivations (the r76 pin's TALLY-MATCH and this tool)
//      pinned equal, so a drift between them is RED either way.
//  (3) REGEN-BYTE-STABLE — renderArtifact(computeDistribution(ledger)) is
//      byte-identical to the committed file (regeneration is a no-op when
//      nothing moved — no timestamps, no environment leakage).
//  (4) TAMPER-RED — one byte of one fitness in the ledger changes the
//      computed distribution away from the committed artifact at exactly
//      that value (tampering is noticed, not silently re-derived).

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LEDGER = path.join(ROOT, "research", "v1-draws.jsonl");
const ARTIFACT = path.join(ROOT, "research", "v1-distribution.json");
const R76_GLUE = path.join(ROOT, "tests", "r76-v1-draw-ledger-glue.test.js");
const { loadLedger, computeDistribution, renderArtifact, LEVELS } = require("../tools/v1-dist.js");

test("ARTIFACT-EQUALS-LEDGER: the committed distribution equals a fresh computation", () => {
  const onDisk = JSON.parse(fs.readFileSync(ARTIFACT, "utf8"));
  const fresh = computeDistribution(loadLedger());
  assert.deepEqual(onDisk, fresh,
    "research/v1-distribution.json is stale relative to research/v1-draws.jsonl — regenerate with: node tools/v1-dist.js");
});

test("TALLY-EQUALS-R76-PIN: the tool's tally equals the r76 pin's EXPECTED_TALLIES (textual parse)", () => {
  // Textual, not require(): the table is a const inside a test file and the
  // discipline is that THIS pin reads the same bytes a human edits.
  const src = fs.readFileSync(R76_GLUE, "utf8");
  const m = src.match(/const EXPECTED_TALLIES = (\{[\s\S]*?\n\});/);
  assert.ok(m, "EXPECTED_TALLIES block must exist in the r76 glue");
  const r76Table = eval("(" + m[1] + ")");
  const dist = computeDistribution(loadLedger());
  for (const lv of LEVELS) {
    assert.deepEqual(dist.levels[lv].tally, r76Table[lv],
      `${lv}: tools/v1-dist.js and the r76 TALLY-MATCH pin have drifted apart`);
  }
});

test("REGEN-BYTE-STABLE: regeneration is byte-identical to the committed artifact", () => {
  const committed = fs.readFileSync(ARTIFACT, "utf8");
  const rerendered = renderArtifact(computeDistribution(loadLedger()));
  assert.equal(rerendered, committed,
    "node tools/v1-dist.js must be a no-op on a clean tree (no timestamps, no env leakage)");
});

test("TAMPER-RED: one edited fitness byte moves the computed distribution away from the artifact", () => {
  const rows = loadLedger();
  const tampered = rows.map((r, i) =>
    i === rows.length - 1
      ? { ...r, L1: { ...r.L1, fitness: r.L1.fitness + 25 } }
      : r);
  const tamperedDist = computeDistribution(tampered);
  const onDisk = JSON.parse(fs.readFileSync(ARTIFACT, "utf8"));
  assert.notDeepEqual(tamperedDist, onDisk,
    "a tampered ledger must NOT reproduce the committed artifact — the tool noticed nothing");
  // and the tamper lands exactly where planted: the last draw's L1 value +25
  const lastL1 = rows[rows.length - 1].L1.fitness;
  assert.equal(tamperedDist.levels.L1.tally[lastL1] || 0, onDisk.levels.L1.tally[lastL1] - 1,
    "the tampered value must lose exactly one count at the planted fitness (key absent when its count reaches 0)");
  assert.equal(tamperedDist.levels.L1.tally[lastL1 + 25],
    (onDisk.levels.L1.tally[lastL1 + 25] || 0) + 1,
    "the tampered value must gain exactly one count at fitness+25");
});
