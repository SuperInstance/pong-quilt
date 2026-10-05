#!/usr/bin/env node
// Round 86 — receipt-audit: re-land receipt claims must name in-tree artifacts
// (R85 spec item 1, 6th carrying, first build; the R81→R85 carried audit).
//
// Round 96 addendum — the --doc mode (R95 spec item 1, 10th carrying, first
// build; the R87→R95 carried audit-over-README/EXPERIMENTS): the R86 grammar
// audits PLAYLOG receipts (bullet + in-tree verb), but README.md and
// EXPERIMENTS.md cite artifacts as REFERENCES — "pinned by `tests/…`",
// "the R42 pin (`tests/…`)" — in prose, tables, and numbered lists, with no
// bullet and no verb. R82/R83's invisible-doc-rot class lives in exactly
// those docs: nothing read their citation prose against the tree, so a
// re-land dropping a cited file stays green to every pin. In doc mode ANY
// line's backticked tracked path is an existence claim (the PATH_RE prefix
// list already excludes hypothetical names like the README's ring_buffer.py
// analogy column). The R39 format-description carve-out and the R42
// GENERATED honoring hold unchanged.
//
// WHY THIS TOOL EXISTS. R82/R83 found the invisible-doc-rot class: a README
// table described games that had not existed for 32 rounds, and four rounds
// of cap-cluster specs carried against a ghost R74 build whose receipt text
// survived while its artifact edit was dropped by a re-land (the R34/R41
// entry-loss class). PLAYLOG.md is the loop's hash-chained memory — its
// "shipped this round" bullets and [built]/[pinned] receipts ASSERT that
// named artifacts exist in-tree, yet nothing checked the assertion: a receipt
// naming `tests/rNN-....test.js` or `research/....jsonl` that a re-land
// dropped stays green to every existing pin (they match regexes and run the
// suite — neither reads the PROSE's existence claims). The R35 lesson, applied
// to receipts: only ground truth (the file tree) sees absence.
//
// CONTRACT (pinned by tests/r86-receipt-audit-glue.test.js):
//   - a receipt line is a bullet line (`- `/`* `) in the audited markdown;
//   - an artifact claim is a backticked repo-relative path on a line that
//     carries an in-tree verb (appended|pinned|shipped|built|ported|
//     re-landed|relanded|landed|added|written|wrote|rebuilt|regenerated|
//     sealed|committed|restored|created|emitted), where the path is NOT
//     immediately followed by ` = ` — "path = {format}" is a value
//     DESCRIPTION (the R39 stone-sign pilot's per-run output receipt), not
//     an existence claim;
//   - every claimed path must exist in the tree at audit time, EXCEPT paths
//     in GENERATED: build outputs that are gitignored BY DESIGN and sealed
//     byte-identical by another pin (the R42/R43 lesson — a fresh checkout
//     has no dist/ until the site-glue self-seal runs, and this pin sorts
//     before site-glue alphabetically, so pre-seal absence is the designed
//     state, not a phantom). The reason ships as data below; the pin
//     asserts it exists (a bare skip would be the R63 quiet class);
//   - exit 0 + "receipt-audit: OK (N existence-claims checked, M format-
//     descriptions skipped, G generated-build-outputs honored)" when clean;
//     exit 1 NAMING every phantom (file:line + path) when dirty;
//     exit 2 + usage on misuse (missing file, unreadable) — REFUSED, never
//     a quiet vacuous green (N=0 claims also REFUSES: an audit that stopped
//     finding claims would be applause, not measurement);
//   - requireable as a module (auditText) AND runnable as a CLI;
//   - DOC MODE (--doc, this round): `node tools/receipt-audit.js --doc`
//     audits README.md + EXPERIMENTS.md (or named files after the flag)
//     under the relaxed grammar — any line, no bullet/verb requirement;
//     per-file exit semantics unchanged (0 clean / 1 phantoms named /
//     2 misuse or 0-claims REFUSED — a vacuous doc audit is applause too).

"use strict";
const fs = require("fs");
const path = require("path");

const VERB_RE = /\b(appended|pinned|shipped|built|ported|re-landed|relanded|landed|added|written|wrote|rebuilt|regenerated|sealed|committed|restored|created|emitted)\b/i;
const PATH_RE = /`((?:tests|tools|research|checkpoints|site|\.github\/workflows)\/[A-Za-z0-9._\/-]+|core\.js|index\.html|qa\.js|README\.md|EXPERIMENTS\.md|PLAYLOG\.md)`/g;

// Generated build outputs: claimed in receipts ("dist resealed", "build
// ok: N demo files sealed") yet gitignored by design — pre-build absence on
// a fresh checkout is honest, and byte-identity after build is the
// site-glue pin's job, not this audit's. Keys are normalized (no trailing
// slash); the pin asserts this reason names gitignore + the sealer.
const GENERATED = new Map([
  ["site/dist",
   "build output — gitignored since R42 (the R42/R43 fresh-checkout finding); " +
   "sealed byte-identical by tools/build-site.mjs + the site-glue pin; " +
   "pre-seal absence on a fresh checkout is the designed state, never a phantom"],
]);

function normalizePath(p) { return p.replace(/\/+$/, ""); }

// Pure: audit markdown text -> {claims: [{line, path}], formatSkipped: n}.
// The grammar pin: which lines assert an in-tree artifact. opts.doc relaxes
// the receipt grammar to the doc grammar (any line may carry a citation).
function parseClaims(text, opts) {
  const doc = !!(opts && opts.doc);
  const claims = [];
  let formatSkipped = 0;
  String(text).split("\n").forEach((line, i) => {
    if (!doc) {
      if (!/^\s*[-*] /.test(line)) return;          // receipt lines are bullets
      if (!VERB_RE.test(line)) return;              // no in-tree verb, no claim
    }
    // doc mode: docs cite artifacts as references in prose/tables/lists —
    // no bullet or verb required (the R96 addendum; the PATH_RE prefix list
    // is what keeps hypothetical names out of the claim set)
    PATH_RE.lastIndex = 0;
    let m;
    while ((m = PATH_RE.exec(line))) {
      const after = line.slice(m.index + m[0].length);
      if (/^\s*=/.test(after)) { formatSkipped++; continue; } // "path = {…}" describes a shape
      claims.push({ line: i + 1, path: m[1] });
    }
  });
  return { claims, formatSkipped };
}

// Audit markdown against a tree root -> {ok, phantoms, checked, formatSkipped, generatedHonored}.
// opts.doc selects the doc grammar (see parseClaims).
function auditText(text, root, opts) {
  const { claims, formatSkipped } = parseClaims(text, opts);
  const generatedHonored = claims.filter(c => GENERATED.has(normalizePath(c.path))).length;
  const phantoms = claims.filter(c => !GENERATED.has(normalizePath(c.path)) && !fs.existsSync(path.join(root, normalizePath(c.path))));
  return { ok: phantoms.length === 0 && claims.length > 0, phantoms, checked: claims.length, formatSkipped, generatedHonored };
}

// Reference docs audited by --doc (the R96 addendum): the two files whose
// citation prose the R87→R95 spec wanted machine-checked. Exported for the
// pin; the CLI defaults to this pair when --doc names no files.
const DOC_FILES = ["README.md", "EXPERIMENTS.md"];

function usage() {
  console.error("usage: node tools/receipt-audit.js [--doc] [markdown-file ...] (default: PLAYLOG.md; --doc default: README.md + EXPERIMENTS.md)");
  process.exit(2);
}

function auditOne(target, docMode, root) {
  let text;
  try {
    text = fs.readFileSync(target, "utf8");
  } catch (e) {
    console.error("receipt-audit: REFUSED — cannot read " + target + ": " + e.message);
    process.exit(2);
  }
  const { ok, phantoms, checked, formatSkipped, generatedHonored } = auditText(text, root, { doc: docMode });
  if (checked === 0) {
    console.error(`receipt-audit: REFUSED — 0 existence-claims found in ${target}; the audit degenerated (` +
      (docMode ? "path grammar no longer matches the docs' citation style" : "verb list or path grammar no longer matches the receipt format") + ")");
    process.exit(2);
  }
  if (!ok) {
    for (const p of phantoms) {
      console.error(`receipt-audit: PHANTOM ${target}:${p.line} — claimed artifact not in-tree: ${p.path}`);
    }
    process.exit(1);
  }
  return { checked, formatSkipped, generatedHonored };
}

function main() {
  const args = process.argv.slice(2);
  const docMode = args.includes("--doc");
  const files = args.filter(a => a !== "--doc");
  const root = path.resolve(__dirname, "..");
  const targets = files.length ? files
    : docMode ? DOC_FILES.map(f => path.join(root, f))
    : [path.join(root, "PLAYLOG.md")];
  const receipts = targets.map(t => ({ target: path.isAbsolute(t) ? path.relative(root, t) : t, ...auditOne(t, docMode, root) }));
  if (receipts.length === 1) {
    // legacy single-file shape (the R86 pin asserts this receipt verbatim)
    const r = receipts[0];
    console.log(`receipt-audit: OK (${r.checked} existence-claims checked, ${r.formatSkipped} format-descriptions skipped, ${r.generatedHonored} generated-build-outputs honored)`);
  } else {
    console.log("receipt-audit: OK (" + receipts.map(r =>
      `${r.target}: ${r.checked} existence-claims checked, ${r.formatSkipped} format-descriptions skipped, ${r.generatedHonored} generated-build-outputs honored`
    ).join("; ") + ")");
  }
  process.exit(0);
}

if (require.main === module) main();
module.exports = { parseClaims, auditText, VERB_RE, PATH_RE, GENERATED, normalizePath, DOC_FILES };
