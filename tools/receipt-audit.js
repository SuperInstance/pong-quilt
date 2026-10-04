#!/usr/bin/env node
// Round 86 — receipt-audit: re-land receipt claims must name in-tree artifacts
// (R85 spec item 1, 6th carrying, first build; the R81→R85 carried audit).
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
//   - requireable as a module (auditText) AND runnable as a CLI.

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
// The grammar pin: which lines assert an in-tree artifact.
function parseClaims(text) {
  const claims = [];
  let formatSkipped = 0;
  String(text).split("\n").forEach((line, i) => {
    if (!/^\s*[-*] /.test(line)) return;          // receipt lines are bullets
    if (!VERB_RE.test(line)) return;              // no in-tree verb, no claim
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
function auditText(text, root) {
  const { claims, formatSkipped } = parseClaims(text);
  const generatedHonored = claims.filter(c => GENERATED.has(normalizePath(c.path))).length;
  const phantoms = claims.filter(c => !GENERATED.has(normalizePath(c.path)) && !fs.existsSync(path.join(root, normalizePath(c.path))));
  return { ok: phantoms.length === 0 && claims.length > 0, phantoms, checked: claims.length, formatSkipped, generatedHonored };
}

function usage() {
  console.error("usage: node tools/receipt-audit.js [markdown-file] (default PLAYLOG.md)");
  process.exit(2);
}

function main() {
  const target = process.argv[2] || path.join(__dirname, "..", "PLAYLOG.md");
  let text;
  try {
    text = fs.readFileSync(target, "utf8");
  } catch (e) {
    console.error("receipt-audit: REFUSED — cannot read " + target + ": " + e.message);
    process.exit(2);
  }
  const root = path.resolve(__dirname, "..");
  const { ok, phantoms, checked, formatSkipped, generatedHonored } = auditText(text, root);
  if (checked === 0) {
    console.error("receipt-audit: REFUSED — 0 existence-claims found; the audit degenerated (verb list or path grammar no longer matches the receipt format)");
    process.exit(2);
  }
  if (!ok) {
    for (const p of phantoms) {
      console.error(`receipt-audit: PHANTOM ${target}:${p.line} — claimed artifact not in-tree: ${p.path}`);
    }
    process.exit(1);
  }
  console.log(`receipt-audit: OK (${checked} existence-claims checked, ${formatSkipped} format-descriptions skipped, ${generatedHonored} generated-build-outputs honored)`);
  process.exit(0);
}

if (require.main === module) main();
module.exports = { parseClaims, auditText, VERB_RE, PATH_RE, GENERATED, normalizePath };
