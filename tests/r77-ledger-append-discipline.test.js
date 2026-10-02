// Round 77 — the ledger append-discipline pin (R76 spec item 3, first build).
//
// Wound closed: the R76 ledger + TALLY-MATCH pin made the v1 draw
// distribution data, but NOTHING in the round instructions told future
// rounds to append to it — EXPERIMENTS.md (where the scientist protocol
// lives) never named research/v1-draws.jsonl. The discipline lived only in
// one PLAYLOG entry's prose, the exact class of note that rots: a future
// round re-derives prose tallies, the pin drifts from the table, and the
// off-by-one wound (R73, closed R76) re-opens one round at a time.
// This file is the structural half of the R77 mandate (the note in
// EXPERIMENTS.md is the process half): the suite now fails if the protocol
// ever stops naming the ledger + the append step.
//
// Tests:
//  (1) PROTOCOL-NAMES-LEDGER — EXPERIMENTS.md names research/v1-draws.jsonl.
//  (2) APPEND-STEP — the protocol directs rounds to APPEND their v1 draw
//      (one JSON line) instead of re-deriving prose tallies.
//  (3) LEDGER-EXISTS — the named ledger is on disk (a note naming a file
//      that doesn't exist is a dead link, not a discipline).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const EXP = path.join(ROOT, "EXPERIMENTS.md");
const LEDGER = path.join(ROOT, "research", "v1-draws.jsonl");

test("PROTOCOL-NAMES-LEDGER: EXPERIMENTS.md names the v1 draw ledger", () => {
  const exp = fs.readFileSync(EXP, "utf8");
  assert.ok(/research\/v1-draws\.jsonl/.test(exp),
    "EXPERIMENTS.md must name research/v1-draws.jsonl where the round protocol lives");
});

test("APPEND-STEP: the protocol directs rounds to append their draw, not re-derive prose", () => {
  const exp = fs.readFileSync(EXP, "utf8");
  assert.ok(/append/i.test(exp) && /jsonl/i.test(exp),
    "EXPERIMENTS.md must direct future rounds to APPEND their v1 draw as a JSON line");
  assert.ok(!/re-derive/i.test(exp) || /instead of re-deriving/i.test(exp),
    "the directive must be append-INSTEAD-OF-re-derive, not both at once");
});

test("LEDGER-EXISTS: the ledger the protocol names is on disk", () => {
  assert.ok(fs.existsSync(LEDGER), "research/v1-draws.jsonl must exist on disk");
});
