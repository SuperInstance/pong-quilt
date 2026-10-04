// Round 90 pin — the L0 button's missing measured spread (R89 spec item 5,
// [S], first carrying: the NEW item on the R89 spec, built this round).
//
// Wound closed: after the R89 build the L0 button was the only bare load
// button on the row — "L0 · random", zero numbers — while its measured
// distribution spans 1918–3295 fitness / 1–7 hits across the value-tallied
// draws and the L1/L2 buttons both cite their ledger-derived spreads (R79
// built the L2 pattern, R89 the L1). The R89 spec item 5 offered an
// alternative — a NAMED-EXEMPTION receipt arguing gen-0's random-init
// spread is not player-relevant — but the spread IS the player's answer to
// "what opening state will I get", so the annotation is the honest move
// (the same call R79/R89 made for the trained levels). This pin recomputes
// the L0 fitness + hits spread from research/v1-draws.jsonl so a future
// draw that moves the range turns the suite RED until the button is
// updated in the same round — the numbers can never drift from the
// distribution they cite (the r79/r89 pattern, L0 lane).
//
// Tests (render-level, ledger-derived — the R69/R73/R78/r79/r89 pattern):
//  (1) SPREAD-PRESENT — the L0 button copy carries the ledger-derived
//      L0 fitness range and hits range as literal text.
//  (2) LEDGER-DERIVED — the recomputed spread from the ledger's
//      value-tallied rows matches what the button claims (the numbers
//      are the distribution's, not invented).
//  (3) DRIFT-FIRES — a hypothetical new extreme draw extends the
//      ledger's range past the button's claim; the mismatch is caught
//      (a pin that never fires is applause, not measurement).
//  FAIL-first on the pre-R90 tree: SPREAD-PRESENT RED (button carries
//  no numbers).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const HTML = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const LEDGER = path.join(__dirname, "..", "research", "v1-draws.jsonl");

function loadValuedL0(ledgerPath = LEDGER) {
  return fs.readFileSync(ledgerPath, "utf8").split("\n").filter(Boolean)
    .map(JSON.parse)
    .filter(r => r.L0 && r.L0.fitness != null && r.L0.hits != null);
}

function l0Spread(rows) {
  return {
    fitMin: Math.min(...rows.map(r => r.L0.fitness)),
    fitMax: Math.max(...rows.map(r => r.L0.fitness)),
    hitMin: Math.min(...rows.map(r => r.L0.hits)),
    hitMax: Math.max(...rows.map(r => r.L0.hits)),
  };
}

function l0ButtonText() {
  const m = HTML.match(/<button[^>]*loadLevel\('level0'\)[^>]*>([^<]*)<\/button>/);
  assert.ok(m, "the L0 load button must exist in index.html");
  return m[1];
}

test("SPREAD-PRESENT: the L0 button carries the measured fitness and hits spread", () => {
  const btn = l0ButtonText();
  const { fitMin, fitMax, hitMin, hitMax } = l0Spread(loadValuedL0());
  assert.ok(btn.includes(`${fitMin}-${fitMax}`),
    `button must carry the L0 fitness range ${fitMin}-${fitMax} (have: "${btn}")`);
  assert.ok(btn.includes(`${hitMin}-${hitMax}`),
    `button must carry the L0 hits range ${hitMin}-${hitMax} (have: "${btn}")`);
});

test("LEDGER-DERIVED: the button's numbers are the ledger's recomputed spread", () => {
  const btn = l0ButtonText();
  const s = l0Spread(loadValuedL0());
  // the exact range strings must appear — not nearby numbers, the spread itself
  assert.ok(btn.includes(`${s.fitMin}-${s.fitMax}`),
    `button fitness range must equal the ledger recompute ${s.fitMin}-${s.fitMax}`);
  assert.ok(btn.includes(`${s.hitMin}-${s.hitMax}`),
    `button hits range must equal the ledger recompute ${s.hitMin}-${s.hitMax}`);
});

test("DRIFT-FIRES: a new extreme draw extends the range past the button — caught", () => {
  const rows = loadValuedL0();
  const s = l0Spread(rows);
  const btn = l0ButtonText();
  // synthesize a draw beyond the current extremes — the pin must be able
  // to SEE the mismatch (this is the fire proof, not a file write)
  const extended = rows.concat([{ L0: { fitness: s.fitMax + 1000, hits: s.hitMax + 3 } }]);
  const s2 = l0Spread(extended);
  assert.ok(!btn.includes(`${s2.fitMin}-${s2.fitMax}`),
    "a range-extending draw must make the button stale — the pin fires");
  assert.ok(!btn.includes(`${s2.hitMin}-${s2.hitMax}`),
    "a hits-extending draw must make the button stale — the pin fires");
  // and the current button must match the current ledger (not already stale)
  assert.ok(btn.includes(`${s.fitMin}-${s.fitMax}`),
    "the shipped button matches the shipped ledger at rest");
});
