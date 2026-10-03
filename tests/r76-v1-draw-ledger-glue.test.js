// Round 76 — the v1 draw ledger pin (R74 spec item 4 / R75 spec item 3,
// first build: the machine-readable draw ledger + count pin).
//
// Wound closed: eleven rounds of hand-tallied v1 draws carried a systematic
// off-by-one (R73 found it by arithmetic skepticism, not by a pin: the
// "nine-draw tally" summed to 8, the "eleven-draw tally" to 10 — the R1
// pre-commit sample is counted in the numbering but its L1 hits/speed were
// never published, so it cannot be value-tallied). Every round re-summed
// the table by hand. This file turns the distribution into data the next
// round APPENDS to, not prose it re-derives — and the pin below recomputes
// the tallies from the file, so a drift between file and PLAYLOG table is
// caught by the suite, not by a human re-adding a column.
//
// Fitness law (verified at the tag, v1 core.js:85):
//   fitness === frames + 25 * hits
// The v1 prerun seeds DEFAULTS.seed (20260924) but the swan path consumed
// raw Math.random() (core.js:55-56, root-caused R69 P2), so same-seed runs
// disagree in L1/L2 — the ledger records the seed AND the drawn values.
//
// Tests:
//  (1) LEDGER-SHAPE — rows exist, draws numbered 1..N contiguous, every row
//      names tag v1 / commit e98cf66 / seed 20260924.
//  (2) FITNESS-LAW — every row with complete fields satisfies
//      fitness === frames + 25*hits. A fabricated fitness is caught here.
//  (3) TALLY-MATCH — value-tallied rows (those with no null fields) produce
//      per-level fitness tallies equal to the R76 PLAYLOG twelve-draw table.
//      The hand-tally is retired; the file is the source of truth.
//  (4) DRAW-1-EARLIER-ERA — draw 1 (the R1 pre-commit sample) carries at
//      least one null field and a note naming its provenance: it is counted
//      in the draw numbering but excluded from value tallies by the nulls,
//      not by special-casing.
//  (5) DRIFT-SENSITIVITY — a copy with one fitness +1 breaks the law. A pin
//      that never fires is applause, not measurement.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const LEDGER_PATH = path.join(__dirname, "..", "research", "v1-draws.jsonl");
const LEVELS = ["L0", "L1", "L2"];

function loadLedger(p = LEDGER_PATH) {
  return fs.readFileSync(p, "utf8").split("\n").filter(Boolean).map(JSON.parse);
}
function tally(rows) {
  const t = { L0: {}, L1: {}, L2: {} };
  for (const r of rows) {
    for (const lv of LEVELS) {
      const f = r[lv] && r[lv].fitness;
      if (f != null) t[lv][f] = (t[lv][f] || 0) + 1;
    }
  }
  return t;
}

// The current PLAYLOG eighteen-draw table (17 value-tallied draws; draw 1
// excluded by its nulls — the earlier-era sample, per the R72 note). R77
// appended draw 13, R78 draw 14, R79 draw 15, R80 draw 16, R81 draw 17
// (L2 6225 — a NEW cap-cluster maximum, 9 terminal hits at the 6000f cap),
// R82 draw 18 (L2 6125×6 — the cap mode strengthens; L1 1242 repeats — the
// kill-early floor value is now a 2-member band); the tally moved exactly
// once per draw, here, not in prose.
const EXPECTED_TALLIES = {
  L0: { 1918: 1, 2225: 3, 2935: 11, 3223: 1, 3295: 1 },
  L1: { 738: 3, 1242: 2, 1691: 1, 3940: 1, 4900: 1, 5156: 1, 5778: 1, 6114: 1, 6150: 1, 6400: 1, 6500: 3, 6575: 1 },
  L2: { 589: 2, 2383: 3, 3242: 1, 4766: 1, 4878: 1, 4919: 1, 6075: 1, 6125: 6, 6225: 1 },
};

test("LEDGER-SHAPE: rows numbered 1..N contiguous, all at v1/e98cf66/seed 20260924", () => {
  const rows = loadLedger();
  assert.ok(rows.length >= 17, `expected >= 17 draws, got ${rows.length}`);
  rows.forEach((r, i) => {
    assert.equal(r.draw, i + 1, `row ${i} draw number contiguous`);
    assert.equal(r.tag, "v1", `draw ${r.draw} tag`);
    assert.equal(r.commit, "e98cf66", `draw ${r.draw} commit`);
    assert.equal(r.seed, 20260924, `draw ${r.draw} seed`);
    for (const lv of LEVELS) {
      assert.ok(r[lv] && typeof r[lv] === "object", `draw ${r.draw} ${lv} present`);
    }
  });
});

test("FITNESS-LAW: every complete row satisfies fitness === frames + 25*hits", () => {
  const rows = loadLedger();
  for (const r of rows) {
    for (const lv of LEVELS) {
      const { fitness, frames, hits } = r[lv];
      if (fitness == null || frames == null || hits == null) continue; // incomplete row
      assert.equal(fitness, frames + 25 * hits,
        `draw ${r.draw} ${lv}: fitness ${fitness} != frames ${frames} + 25*${hits}`);
    }
  }
});

test("TALLY-MATCH: value-tallied rows reproduce the current PLAYLOG eighteen-draw table", () => {
  const t = tally(loadLedger());
  for (const lv of LEVELS) {
    assert.deepEqual(t[lv], EXPECTED_TALLIES[lv],
      `${lv} tally mismatch — the ledger and the PLAYLOG table have drifted apart`);
  }
});

test("DRAW-1-EARLIER-ERA: the R1 pre-commit sample carries nulls + a provenance note", () => {
  const rows = loadLedger();
  const d1 = rows[0];
  assert.equal(d1.draw, 1);
  const nulls = LEVELS.filter(lv => Object.values(d1[lv]).some(v => v == null));
  assert.ok(nulls.length >= 1,
    "draw 1 must carry at least one null field (it is the earlier-era sample)");
  assert.ok(d1.note && /pre-commit/i.test(d1.note),
    "draw 1 must name its pre-commit provenance in the note");
});

test("DRIFT-SENSITIVITY: a one-fitness tampered copy breaks the law", () => {
  const rows = loadLedger();
  const tampered = rows.map(r => JSON.parse(JSON.stringify(r)));
  // find a complete row and perturb its fitness by +1
  const victim = tampered.find(r => r.L0.fitness != null);
  victim.L0.fitness += 1;
  let fired = false;
  for (const r of tampered) {
    const { fitness, frames, hits } = r.L0;
    if (fitness != null && frames != null && hits != null && fitness !== frames + 25 * hits) {
      fired = true;
      break;
    }
  }
  assert.ok(fired, "tampered copy must trip the fitness law");
});
