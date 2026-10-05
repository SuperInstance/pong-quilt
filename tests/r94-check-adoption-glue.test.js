// Round 94 — the --check adoption-gate pin (R93 spec item 5, first build).
//
// Wound closed: R93 built `tools/build-site.mjs --check` (the one-command
// dry-run over the r88 seal) because the stale-dist trap had fired in two
// workspaces running (R92: this checkout's dist sealed at R83's head; R93:
// a third workspace's dist sealed at R90's head) — and both discoveries
// cost a full 104-second suite run each. The tool existed; the PLAYBOOK did
// not name it. A check that nobody runs is a pin that never fires is
// applause, not measurement (the R86 lesson) — so this file is the
// structural half of the adoption gate (the EXPERIMENTS.md step-0 note is
// the process half, the R77 pattern): the suite now fails if the round
// protocol ever stops naming the pre-suite seal check.
//
// FAIL-first: on the pre-R94 tree EXPERIMENTS.md names no --check (grep
// verified empty at round start), so both assertions are RED there.
//
// Tests:
//  (1) PROTOCOL-NAMES-CHECK — EXPERIMENTS.md names the literal command
//      `node tools/build-site.mjs --check` (a note paraphrasing the check
//      without naming the command is a dead letter, not a gate).
//  (2) CHECK-IS-PRE-SUITE — the seal check is named BEFORE the canonical
//      suite command in the protocol: step 0 is the check, the suite is
//      step 1. A mention buried after the suite text is decoration.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const EXP = path.join(ROOT, "EXPERIMENTS.md");

test("PROTOCOL-NAMES-CHECK: EXPERIMENTS.md names the literal --check command", () => {
  const exp = fs.readFileSync(EXP, "utf8");
  assert.ok(/`node tools\/build-site\.mjs --check`/.test(exp),
    "EXPERIMENTS.md must name `node tools/build-site.mjs --check` as a literal command where the round protocol lives");
});

test("CHECK-IS-PRE-SUITE: the seal check is named before the canonical suite command", () => {
  const exp = fs.readFileSync(EXP, "utf8");
  const checkAt = exp.indexOf("tools/build-site.mjs --check");
  const suiteAt = exp.indexOf("`node --test tests/*.test.js`");
  assert.ok(checkAt !== -1, "EXPERIMENTS.md must name the seal check at all");
  assert.ok(suiteAt !== -1, "EXPERIMENTS.md must keep naming the canonical suite command");
  assert.ok(checkAt < suiteAt,
    "the --check step must be named BEFORE the canonical suite command — step 0 is the seal check, the suite is step 1");
});
