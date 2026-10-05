// Round 96 pin — the receipt-audit --doc mode (R95 spec item 1, 10th
// carrying, first build).
//
// Wound closed: the R87→R95 carried audit-over-README/EXPERIMENTS. The R86
// audit reads PLAYLOG receipts (bullet + in-tree verb), but README.md and
// EXPERIMENTS.md cite artifacts as REFERENCES — "pinned by `tests/…`", "the
// R42 pin (`tests/…`)" — in prose, tables, and numbered lists with no bullet
// and no verb. Nothing checked those citations against the tree: a re-land
// dropping a cited file (the R34/R41 entry-loss class) stays green to every
// existing pin — they match regexes and run the suite, neither reads doc
// citation prose. The R82/R83 invisible-doc-rot class, still unguarded in
// the two files a newcomer reads first. This pin owns the doc mode end to
// end, module AND real CLI (the R65 conflict-scan pattern).
//
// FAIL-first observed: on the pre-R96 tree `node tools/receipt-audit.js
// --doc` treats the flag as a filename — "REFUSED — cannot read --doc:
// ENOENT", exit 2 (run at round start, before the build). The module-side
// options did not exist either; every assertion below is RED there by
// construction.
//
// Tests:
//  (1) DOC-REAL-GREEN — the shipped README + EXPERIMENTS pass the doc audit
//      with floors (README >= 10, EXPERIMENTS >= 3): the tool refuses 0
//      claims itself (exit 2), the floor catches grammar drift earlier
//      (the r86 REAL-GREEN pattern). Zero phantoms on the real docs today —
//      the docs are honest NOW; the pin exists so a future re-land cannot
//      rot them silently.
//  (2) DOC-GRAMMAR-DIFFERS — a prose line (no bullet, no verb) citing a
//      tracked path: the RECEIPT grammar ignores it (0 claims), the DOC
//      grammar claims it (1). This delta IS the reason the mode exists;
//      without it --doc would be a second name for the same silence.
//  (3) DOC-PHANTOM-RED — a synthetic doc citing a phantom artifact on a
//      prose line turns the doc audit RED from the module AND the real CLI
//      (exit 1, PHANTOM named file:line + path). The disease-detection
//      proof, same shape as the r86 PHANTOM-RED.
//  (4) DOC-VACUOUS-REFUSED — a doc with zero backticked tracked paths is
//      REFUSED (module ok=false; CLI exit 2), never a quiet vacuous green —
//      an audit that stopped finding claims would be applause.
//  (5) DOC-FORMAT-SKIP — "path = {format}" is a value DESCRIPTION even in
//      doc mode (the R39 stone-sign carve-out holds — the audit must not
//      become a liar about R39's honesty).
//  (6) DOC-GENERATED — a `site/dist` citation in a doc passes against an
//      empty root: GENERATED honoring (gitignored since R42, sealed by the
//      site-glue pin) is a property of the audit, not of the grammar.
//  (7) CLI-LIVE-DOC — the real `--doc` run exits 0 and the receipt names
//      both files with non-trivial claim counts (regex floors, not exact
//      counts — doc edits legitimately move the counts).
//  (8) RECEIPT-MODE-UNTOUCHED — the r86 module API is backward compatible:
//      one-arg parseClaims/auditText still use the receipt grammar, and the
//      r86 CLI receipt shape is unchanged (regression rail, the R33 pattern).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const AUDIT = require(path.join(ROOT, "tools", "receipt-audit.js"));

test("DOC-REAL-GREEN: the shipped README + EXPERIMENTS citation prose names only in-tree artifacts (non-vacuous)", () => {
  const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
  const experiments = fs.readFileSync(path.join(ROOT, "EXPERIMENTS.md"), "utf8");
  const rr = AUDIT.auditText(readme, ROOT, { doc: true });
  const er = AUDIT.auditText(experiments, ROOT, { doc: true });
  assert.equal(rr.phantoms.length, 0, "README.md phantoms:\n" + rr.phantoms.map(p => `  README.md:${p.line} ${p.path}`).join("\n"));
  assert.equal(er.phantoms.length, 0, "EXPERIMENTS.md phantoms:\n" + er.phantoms.map(p => `  EXPERIMENTS.md:${p.line} ${p.path}`).join("\n"));
  assert.ok(rr.checked >= 10, `README must stay citation-dense: ${rr.checked} claims (floor 10; 0 is refused by the tool, the floor catches drift earlier)`);
  assert.ok(er.checked >= 3, `EXPERIMENTS must keep naming artifacts: ${er.checked} claims (floor 3)`);
});

test("DOC-GRAMMAR-DIFFERS: a prose line (no bullet, no verb) is claimed in doc mode and ignored in receipt mode", () => {
  const prose = "The honesty two-way match is pinned by `tests/honesty.test.js` and friends.\n";
  assert.equal(AUDIT.parseClaims(prose).claims.length, 0, "receipt grammar: no bullet + no verb, no claim");
  const doc = AUDIT.parseClaims(prose, { doc: true });
  assert.equal(doc.claims.length, 1, "doc grammar: a citation is a claim regardless of bullet/verb");
  assert.equal(doc.claims[0].path, "tests/honesty.test.js");
});

test("DOC-PHANTOM-RED: a synthetic doc citing a phantom artifact turns the doc audit RED, module AND CLI", () => {
  const synthetic = "Pinned by `tests/ghost-doc-round-96-glue.test.js` (this file does not exist).\n";
  const r = AUDIT.auditText(synthetic, ROOT, { doc: true });
  assert.equal(r.ok, false);
  assert.equal(r.phantoms.length, 1);
  assert.equal(r.phantoms[0].path, "tests/ghost-doc-round-96-glue.test.js");
  assert.equal(r.phantoms[0].line, 1);
  const tmp = path.join(os.tmpdir(), "r96-doc-phantom.md");
  fs.writeFileSync(tmp, synthetic);
  try {
    execFileSync(process.execPath, [path.join(ROOT, "tools", "receipt-audit.js"), "--doc", tmp], { encoding: "utf8", stdio: ["ignore", "ignore", "pipe"] });
    assert.fail("the --doc CLI must exit non-zero on a phantom doc");
  } catch (e) {
    assert.equal(e.status, 1, "exit 1, not a generic crash: " + e.stderr);
    assert.match(e.stderr, /PHANTOM .*tests\/ghost-doc-round-96-glue\.test\.js/);
  }
});

test("DOC-VACUOUS-REFUSED: a doc with zero backticked tracked paths is REFUSED, never a quiet green", () => {
  const empty = "# Notes\n\nNothing cited here at all — pure prose.\n";
  const r = AUDIT.auditText(empty, ROOT, { doc: true });
  assert.equal(r.ok, false, "module: 0 claims is not ok");
  assert.equal(r.checked, 0);
  const tmp = path.join(os.tmpdir(), "r96-doc-vacuous.md");
  fs.writeFileSync(tmp, empty);
  try {
    execFileSync(process.execPath, [path.join(ROOT, "tools", "receipt-audit.js"), "--doc", tmp], { encoding: "utf8", stdio: ["ignore", "ignore", "pipe"] });
    assert.fail("the --doc CLI must REFUSE a vacuous doc");
  } catch (e) {
    assert.equal(e.status, 2, "exit 2 (usage/refusal), never 0: " + e.stderr);
    assert.match(e.stderr, /REFUSED/);
  }
});

test("DOC-FORMAT-SKIP: 'path = {format}' is a value description even in doc mode (the R39 carve-out holds)", () => {
  const desc = "The signed chain lands at `checkpoints/stone-v1.signed.json` = {sealed output receipt} only when the sign lane runs.\n";
  const r = AUDIT.parseClaims(desc, { doc: true });
  assert.equal(r.claims.length, 0, "a value description must not phantom when the file is legitimately absent");
  assert.equal(r.formatSkipped, 1);
});

test("DOC-GENERATED: a site/dist citation in a doc passes against an empty root, reason shipped as data", () => {
  const synthetic = "The built site ships under `site/dist` (gitignored build output).\n";
  const emptyRoot = fs.mkdtempSync(path.join(os.tmpdir(), "r96-doc-gen-"));
  try {
    const r = AUDIT.auditText(synthetic, emptyRoot, { doc: true });
    assert.equal(r.phantoms.length, 0, "pre-build absence of a GENERATED output is the designed state, not a phantom");
    assert.equal(r.generatedHonored, 1);
  } finally {
    fs.rmSync(emptyRoot, { recursive: true, force: true });
  }
  assert.match(AUDIT.GENERATED.get("site/dist"), /gitignore/i);
  assert.match(AUDIT.GENERATED.get("site/dist"), /site-glue|build-site/);
});

test("CLI-LIVE-DOC: the real --doc run exits 0, receipt naming both docs with non-trivial counts", () => {
  const out = execFileSync(process.execPath, [path.join(ROOT, "tools", "receipt-audit.js"), "--doc"], { encoding: "utf8" });
  assert.match(out, /receipt-audit: OK \(/);
  assert.match(out, /README\.md: \d+ existence-claims checked/);
  assert.match(out, /EXPERIMENTS\.md: \d+ existence-claims checked/);
});

test("RECEIPT-MODE-UNTOUCHED: the r86 module API and CLI receipt shape are unchanged by the addendum", () => {
  const prose = "Mentioning `tests/honesty.test.js` in passing asserts nothing under the receipt grammar.\n";
  assert.equal(AUDIT.parseClaims(prose).claims.length, 0, "one-arg parseClaims is still the receipt grammar");
  const out = execFileSync(process.execPath, [path.join(ROOT, "tools", "receipt-audit.js")], { encoding: "utf8" });
  assert.match(out, /receipt-audit: OK \(\d+ existence-claims checked, \d+ format-descriptions skipped, \d+ generated-build-outputs honored\)/,
    "the r86 CLI-LIVE receipt shape is byte-preserved");
});
