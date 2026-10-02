// Round 79 pin — the L2 button's undefined "near-human" label, annotated
// with the measured v1 draw spread (R78 spec item 3, [M], first build).
//
// Wound closed: the L2 load button said "near-human" — a quality claim
// DEFINED nowhere in the repo (grep: every hit is a usage, none a
// definition). Every other number on that button row is pinned; the L2
// label was the thinnest lie in the demo. R78 draw #14 made the gap
// sharper: the label sat on a level whose v1 draws span 589 (0 hits) to
// 6125 (6000f cap), a 10x fitness spread with a zero-hit floor — the
// champion's best game can have the paddle never touching the ball.
// The button now carries the measured spread, sourced to the ledger,
// and this pin recomputes the spread from research/v1-draws.jsonl so
// a future draw that moves the range turns the suite RED until the
// button is updated in the same round — the numbers can never drift
// from the distribution they cite.
//
// Tests (render-level, ledger-derived — the R69/R73/R78 pattern):
//  (1) SPREAD-PRESENT — the L2 button copy carries the ledger-derived
//      L2 fitness range and hits range as literal text.
//  (2) BARE-LABEL-ABSENT — "near-human" appears nowhere in the button copy
//      (the undefined quality label is dropped, not softened).
//  (3) LEDGER-DERIVED — the recomputed spread from the ledger's
//      value-tallied rows matches what the button claims (the numbers
//      are the distribution's, not invented).
//  (4) DRIFT-FIRES — a hypothetical new extreme draw extends the
//      ledger's range past the button's claim; the mismatch is caught
//      (a pin that never fires is applause, not measurement).
//  FAIL-first on the pre-R79 tree: SPREAD-PRESENT RED (button carries
//  no numbers), BARE-LABEL-ABSENT RED ("near-human" present).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const HTML = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const LEDGER = path.join(__dirname, "..", "research", "v1-draws.jsonl");

function loadValuedL2(ledgerPath = LEDGER) {
  return fs.readFileSync(ledgerPath, "utf8").split("\n").filter(Boolean)
    .map(JSON.parse)
    .filter(r => r.L2 && r.L2.fitness != null && r.L2.hits != null);
}

function l2Spread(rows) {
  return {
    fitMin: Math.min(...rows.map(r => r.L2.fitness)),
    fitMax: Math.max(...rows.map(r => r.L2.fitness)),
    hitMin: Math.min(...rows.map(r => r.L2.hits)),
    hitMax: Math.max(...rows.map(r => r.L2.hits)),
  };
}

function l2ButtonText() {
  const m = HTML.match(/<button[^>]*loadLevel\('level2'\)[^>]*>([^<]*)<\/button>/);
  assert.ok(m, "the L2 load button must exist in index.html");
  return m[1];
}

test("SPREAD-PRESENT: the L2 button carries the measured fitness and hits spread", () => {
  const btn = l2ButtonText();
  const { fitMin, fitMax, hitMin, hitMax } = l2Spread(loadValuedL2());
  assert.ok(btn.includes(`${fitMin}-${fitMax}`),
    `button must carry the L2 fitness range ${fitMin}-${fitMax} (have: "${btn}")`);
  assert.ok(btn.includes(`${hitMin}-${hitMax}`),
    `button must carry the L2 hits range ${hitMin}-${hitMax} (have: "${btn}")`);
});

test("BARE-LABEL-ABSENT: the undefined 'near-human' label is gone from the button", () => {
  const btn = l2ButtonText();
  assert.ok(!/near-human/i.test(btn),
    `the bare 'near-human' label must be dropped (have: "${btn}")`);
});

test("LEDGER-DERIVED: the button's numbers are the ledger's recomputed spread", () => {
  const btn = l2ButtonText();
  const s = l2Spread(loadValuedL2());
  // the exact range strings must appear — not nearby numbers, the spread itself
  assert.ok(btn.includes(`${s.fitMin}-${s.fitMax}`),
    `button fitness range must equal the ledger recompute ${s.fitMin}-${s.fitMax}`);
  assert.ok(btn.includes(`${s.hitMin}-${s.hitMax}`),
    `button hits range must equal the ledger recompute ${s.hitMin}-${s.hitMax}`);
});

test("DRIFT-FIRES: a new extreme draw extends the range past the button — caught", () => {
  const rows = loadValuedL2();
  const s = l2Spread(rows);
  const btn = l2ButtonText();
  // synthesize a draw beyond the current extremes — the pin must be able
  // to SEE the mismatch (this is the fire proof, not a file write)
  const extended = rows.concat([{ L2: { fitness: s.fitMax + 1000, hits: s.hitMax + 3 } }]);
  const s2 = l2Spread(extended);
  assert.ok(!btn.includes(`${s2.fitMin}-${s2.fitMax}`),
    "a range-extending draw must make the button stale — the pin fires");
  // and the current button must match the current ledger (not already stale)
  assert.ok(btn.includes(`${s.fitMin}-${s.fitMax}`),
    "the shipped button matches the shipped ledger at rest");
});
