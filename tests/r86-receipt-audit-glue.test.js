// Round 86 pin — the re-land receipt audit (R85 spec item 1, 6th carrying,
// first build).
//
// Wound class closed: R82/R83's invisible doc rot — receipt prose asserting
// artifacts that re-lands dropped or tables that outlived their values. The
// R34/R41 entry-loss and the R81 ghost-build finds were all invisible to
// every existing pin for the same reason: nothing read the PROSE's
// existence claims against the tree. This pin runs the audit
// (tools/receipt-audit.js) as a module AND as the real CLI:
//  (1) REAL-GREEN — the shipped PLAYLOG passes and the audit checked a
//      non-trivial number of existence claims (guards the degenerate-audit
//      hazard: an audit that finds 0 claims is applause, refused by the
//      tool itself at exit 2 — the pin asserts the floor from the module
//      side too).
//  (2) PHANTOM-RED — the spec's VERIFY: a synthetic receipt line claiming a
//      phantom artifact turns the audit RED naming file:line + path. FAIL-
//      first by construction: this is the disease detection proof, the same
//      shape the R83 README pin used for its pre-fix RED.
//  (3) FORMAT-SKIP — "path = {format}" is a value description, not an
//      existence claim: the R39 stone-sign pilot's per-run output receipt
//      (checkpoints/stone-v1.signed.json, a conditional seam that ships
//      CLOSED and legitimately never lands in-tree) must NOT fire the audit.
//      Without this carve-out the audit would be a liar about R39's honesty.
//  (4) NO-VERB-NO-CLAIM — a line that merely MENTIONS a path with no
//      in-tree verb (history, comparisons, wishes) asserts nothing; the
//      audit stays green. Precision is the difference between measurement
//      and noise.
//  (5) CLI-LIVE — the real tool exits 0 on the real PLAYLOG and non-zero
//      NAMED on a synthetic phantom file (the R65 conflict-scan pattern:
//      the module pin owns the grammar, the spawn pin owns the tool).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const AUDIT = require(path.join(ROOT, "tools", "receipt-audit.js"));

test("REAL-GREEN: the shipped PLAYLOG's receipt claims all name in-tree artifacts (and the audit is non-vacuous)", () => {
  const md = fs.readFileSync(path.join(ROOT, "PLAYLOG.md"), "utf8");
  const r = AUDIT.auditText(md, ROOT);
  assert.equal(r.phantoms.length, 0, "phantoms on the real PLAYLOG:\n" + r.phantoms.map(p => `  PLAYLOG.md:${p.line} ${p.path}`).join("\n"));
  assert.ok(r.checked >= 40, `the audit must stay non-trivial: checked ${r.checked} existence-claims (a collapse toward 0 means the grammar rotted — the tool itself refuses at 0, this floor catches drift earlier)`);
});

test("PHANTOM-RED: a synthetic receipt claiming a phantom artifact turns the audit RED, naming file:line + path", () => {
  const synthetic = [
    "## Round T — tester — 2026-01-01 — vs v9",
    "### Shipped this round (the build)",
    "- `tests/ghost-round-99-glue.test.js` (NEW, 4 tests): shipped and pinned this round.",
    "- `research/ghost-draws.jsonl`: draw #99 appended (one JSON line).",
  ].join("\n");
  const r = AUDIT.auditText(synthetic, ROOT);
  assert.equal(r.phantoms.length, 2, "both phantom claims must fire");
  assert.deepEqual(r.phantoms.map(p => p.line).sort(), [3, 4]);
  assert.ok(r.phantoms.every(p => /ghost/.test(p.path)), "the phantom path is named");
});

test("FORMAT-SKIP: a path followed by ' = {format}' is a value description, never an existence claim (the R39 per-run sign receipt)", () => {
  const synthetic = [
    "- [built] `tools/prerun.js` tail: when the named checkout ships `signTip`, output `checkpoints/stone-v1.signed.json` = {tool, round, key, verify, chain}; the seam ships CLOSED otherwise.",
  ].join("\n");
  const r = AUDIT.parseClaims(synthetic);
  assert.equal(r.formatSkipped, 1, "the ' = ' form is skipped exactly once");
  assert.equal(r.claims.filter(c => c.path === "checkpoints/stone-v1.signed.json").length, 0,
    "a conditional per-run output described by shape asserts no in-tree presence");
  assert.ok(r.claims.some(c => c.path === "tools/prerun.js"), "the tool that WAS built is still claimed");
});

test("NO-VERB-NO-CLAIM: mentioning a path with no in-tree verb asserts nothing", () => {
  const synthetic = [
    "- compared against the sibling's `tests/sibling-only.test.js` and the old `research/retired.jsonl` format from the v0 era.",
  ].join("\n");
  const r = AUDIT.parseClaims(synthetic);
  assert.equal(r.claims.length, 0, "history/comparison lines are not receipt claims");
});

test("CLI-LIVE: the real tool exits 0 on the real PLAYLOG and exits 1 NAMED on a phantom file", () => {
  const out = execFileSync(process.execPath, [path.join(ROOT, "tools", "receipt-audit.js")], { encoding: "utf8" });
  assert.match(out, /receipt-audit: OK \(\d+ existence-claims checked/);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "r86-audit-"));
  const phantom = path.join(dir, "phantom-PLAYLOG.md");
  fs.writeFileSync(phantom, "- `tools/never-built.js` was built this round.\n");
  let failed = false, stderr = "";
  try {
    execFileSync(process.execPath, [path.join(ROOT, "tools", "receipt-audit.js"), phantom], { encoding: "utf8", stdio: ["ignore", "ignore", "pipe"] });
  } catch (e) {
    failed = true;
    stderr = String(e.stderr || "");
  }
  assert.ok(failed, "the CLI must exit non-zero on a phantom");
  assert.match(stderr, /PHANTOM .*tools\/never-built\.js/, "the refusal NAMES the phantom path");
});
