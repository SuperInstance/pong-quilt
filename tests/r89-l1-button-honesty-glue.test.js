// Round 89 pin — the L1 button's missing measured spread (R89 spec item 3,
// [S], 3rd carrying: R87 item 4 → R88 item 3 → this build).
//
// Wound closed: the L2 button has carried the ledger-derived spread since
// R79 ("v1 draws: 589-6225 fitness, 0-11 hits") but the L1 button slid bare
// — "L1 · mid-training", zero numbers — while the L1 terminal-hits axis
// crept 1→23 across the value-tallied draws with no pin noticing (R87 found
// it by hand: draw 22's 21-hit maximum passed the previous 20 with nothing
// red). The L1 label itself is honest (gen-60 training state, README-defined)
// — what is missing is the measured distribution the L2 button already
// carries. This pin recomputes the L1 fitness + hits spread from
// research/v1-draws.jsonl so a future draw that moves the range turns the
// suite RED until the button is updated in the same round — the numbers can
// never drift from the distribution they cite (the r79 pattern, L1 lane).
//
// Tests (render-level, ledger-derived — the R69/R73/R78/r79 pattern):
//  (1) SPREAD-PRESENT — the L1 button copy carries the ledger-derived
//      L1 fitness range and hits range as literal text.
//  (2) LEDGER-DERIVED — the recomputed spread from the ledger's
//      value-tallied rows matches what the button claims (the numbers
//      are the distribution's, not invented).
//  (3) DRIFT-FIRES — a hypothetical new extreme draw extends the
//      ledger's range past the button's claim; the mismatch is caught
//      (a pin that never fires is applause, not measurement).
//  FAIL-first on the pre-R89 tree: SPREAD-PRESENT RED (button carries
//  no numbers).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const HTML = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const LEDGER = path.join(__dirname, "..", "research", "v1-draws.jsonl");

function loadValuedL1(ledgerPath = LEDGER) {
  return fs.readFileSync(ledgerPath, "utf8").split("\n").filter(Boolean)
    .map(JSON.parse)
    .filter(r => r.L1 && r.L1.fitness != null && r.L1.hits != null);
}

function l1Spread(rows) {
  return {
    fitMin: Math.min(...rows.map(r => r.L1.fitness)),
    fitMax: Math.max(...rows.map(r => r.L1.fitness)),
    hitMin: Math.min(...rows.map(r => r.L1.hits)),
    hitMax: Math.max(...rows.map(r => r.L1.hits)),
  };
}

function l1ButtonText() {
  const m = HTML.match(/<button[^>]*loadLevel\('level1'\)[^>]*>([^<]*)<\/button>/);
  assert.ok(m, "the L1 load button must exist in index.html");
  return m[1];
}

test("SPREAD-PRESENT: the L1 button carries the measured fitness and hits spread", () => {
  const btn = l1ButtonText();
  const { fitMin, fitMax, hitMin, hitMax } = l1Spread(loadValuedL1());
  assert.ok(btn.includes(`${fitMin}-${fitMax}`),
    `button must carry the L1 fitness range ${fitMin}-${fitMax} (have: "${btn}")`);
  assert.ok(btn.includes(`${hitMin}-${hitMax}`),
    `button must carry the L1 hits range ${hitMin}-${hitMax} (have: "${btn}")`);
});

test("LEDGER-DERIVED: the button's numbers are the ledger's recomputed spread", () => {
  const btn = l1ButtonText();
  const s = l1Spread(loadValuedL1());
  // the exact range strings must appear — not nearby numbers, the spread itself
  assert.ok(btn.includes(`${s.fitMin}-${s.fitMax}`),
    `button fitness range must equal the ledger recompute ${s.fitMin}-${s.fitMax}`);
  assert.ok(btn.includes(`${s.hitMin}-${s.hitMax}`),
    `button hits range must equal the ledger recompute ${s.hitMin}-${s.hitMax}`);
});

test("DRIFT-FIRES: a new extreme draw extends the range past the button — caught", () => {
  const rows = loadValuedL1();
  const s = l1Spread(rows);
  const btn = l1ButtonText();
  // synthesize a draw beyond the current extremes — the pin must be able
  // to SEE the mismatch (this is the fire proof, not a file write)
  const extended = rows.concat([{ L1: { fitness: s.fitMax + 1000, hits: s.hitMax + 3 } }]);
  const s2 = l1Spread(extended);
  assert.ok(!btn.includes(`${s2.fitMin}-${s2.fitMax}`),
    "a range-extending draw must make the button stale — the pin fires");
  assert.ok(!btn.includes(`${s2.hitMin}-${s2.hitMax}`),
    "a hits-extending draw must make the button stale — the pin fires");
  // and the current button must match the current ledger (not already stale)
  assert.ok(btn.includes(`${s.fitMin}-${s.fitMax}`),
    "the shipped button matches the shipped ledger at rest");
});
