// Round 84 pin — σ on the receipt-panel C1 ledger rows (R83 spec item 1,
// 4th carrying, first build).
//
// Wound closed: R80 recorded sig:<slider int> on every receipted coev
// ledger row and annotated the sChamp trail on a mid-run σ change — but
// the receipt PANEL's C1 ledger rows (the lines a player actually reads
// top to bottom) still rendered σ-blind: `COEV gN sX vs eY -> OUTCOME Ff
// loser=… hash←prev`. A player dragging σ from 12 to 2 mid-session saw
// the panel rows change fitness trajectory with no record of which σ
// bred which generation — the trail (a stats-line VIEW) disclosed the
// transition, the receipted rows themselves did not. Four rounds of
// carried spec (R80→R83) asked for exactly this.
//
// The fix: the C1-lane row render appends `σ=<int>` from the row's OWN
// sig field when defined; rows that predate σ recording (pre-R80 saves)
// print nothing — never a fabricated default; the MOTH receipt lines
// (non-C1) are byte-unchanged (the r68 named-gen contract lane).
//
// FAIL-first on the pre-R84 tree: SIG-ON-ROW RED (no σ on rows),
// NEW-ROW-RECORDS RED (the session's own bred row prints no σ);
// NON-C1-BYTE-UNCHANGED is the regression lock in the other direction.
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

function extract(fnStart, endMarker) {
  const lines = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8").split("\n");
  const s = lines.findIndex((l) => l.startsWith(fnStart));
  if (s < 0) throw new Error("missing " + fnStart);
  let e = s;
  while (e < lines.length && !lines[e].includes(endMarker)) e++;
  if (e >= lines.length) throw new Error("no end marker for " + fnStart);
  return lines.slice(s, e + 1).join("\n");
}
function extractReceiptPanel() {
  const lines = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8").split("\n");
  const s = lines.findIndex((l) => l.startsWith("function renderReceipts("));
  if (s < 0) throw new Error("index.html must define renderReceipts()");
  let e = s;
  while (e < lines.length && !lines[e].includes("renderReceipts();}")) e++;
  if (e >= lines.length) throw new Error("receipt() must immediately follow renderReceipts()");
  return lines.slice(s, e + 1).join("\n");
}

function makeDemo(seed) {
  const els = {
    stats: { textContent: "" }, mode: { value: "classic" }, pop: { value: "96" },
    sub: { value: "1" }, sig: { value: "10" }, dec: { value: "4" }, receipts: { textContent: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const capture = { downloads: [], blobs: [] };
  const BlobShim = class { constructor(parts, opts) { this.parts = parts; this.type = opts && opts.type; capture.blobs.push(this); } };
  const URLShim = { createObjectURL: () => "blob:mock" };
  const documentShim = { createElement: () => { const el = { click() { capture.downloads.push(el); } }; return el; } };
  const src = [
    extract("function startGenC(){", "eliteK:D.elites});}"),
    extract("function continueGenC(){", "coev.evalS=null;coev.evalE=null;}}"),
    extract('$(\"save\").onclick', 'receipt(\"SAVE\",0,1);};'),
    extract('$(\"load\").onchange', 'receipt(\"LOAD\",0,1);});};'),
  ].join("\n");
  const factory = new Function("window", "alert", "PQ", "D", "$", "randPQ", "Blob", "URL", "document", "capture", "hash",
    "let champNet=null,champGame=null,gameId=0,gen=0,games=0,pop=Array.from({length:96},()=>PQ.makeNet(randPQ)),evalGen=null,lastSnap=null,champRing=PQ.makeRing(4),coev=null;" +
    "let receipts=[],receiptHead='0'.repeat(64),receiptEvicted=0;" +
    src + "\n" + extractReceiptPanel() +
    "\nreturn {startGenC,continueGenC,$save:$('save'),$load:$('load'),$mode:$('mode'),$pop:$('pop'),get coev(){return coev},get gen(){return gen},get champNet(){return champNet},get pop(){return pop},get capture(){return capture},get receipts(){return receipts},renderPanel:renderReceipts};");
  const demo = factory({}, (m) => { throw new Error("alert:" + m); }, PQ, PQ.DEFAULTS, $, PQ.rng(seed), BlobShim, URLShim, documentShim, capture, PQ.hash8);
  demo.els = els;
  return demo;
}

function breedOneCoevGen(d) {
  d.startGenC();
  const pre = d.coev.genC;
  for (let k = 0; k < 24 && d.coev.genC === pre; k++) d.continueGenC();
  if (d.coev.genC === pre) throw new Error("C1 generation did not complete in 24 drives");
}

function c1Lines(panel) {
  // C1 ledger rows live in the section AFTER the "— C1 ledger —" marker —
  // MOTH receipt lines can also start with "COEV g" (the per-generation
  // C1-lane receipt) and must not be swept into this assertion (r68 lane)
  const section = panel.split("— C1 ledger —")[1] || "";
  return section.split("\n").filter((l) => l.startsWith("COEV g"));
}

test("SIG-ON-ROW: every receipted C1 ledger row on the panel names the σ that bred it", () => {
  const d = makeDemo(20261004);
  d.$mode.value = "coev";
  d.els.sig.value = "8";
  for (let g = 0; g < 4; g++) breedOneCoevGen(d);
  d.renderPanel();
  const lines = c1Lines(d.els.receipts.textContent);
  assert.ok(lines.length >= 4, `at least 4 C1 rows rendered (got ${lines.length})`);
  for (const l of lines) {
    assert.match(l, /σ=8\b/, `row names σ=8 — the σ that bred it (FAIL-first on the pre-R84 tree: no σ on rows; got: ${l})`);
  }
  // the print is row-derived, not invented: each rendered row's σ matches its ledger row's own sig field
  const rows = d.coev.ledger.tail(8);
  for (const r of rows) assert.equal(r.sig, 8, `ledger row gen ${r.gen} records sig 8`);
  assert.equal(lines.filter((l) => /σ=8\b/.test(l)).length, rows.length,
    "every rendered tail row carries its σ — none invented, none dropped");
});

test("NON-C1-BYTE-UNCHANGED: MOTH receipt lines and the non-coev panel path carry no σ — the r68 lane is untouched", () => {
  const d = makeDemo(777);
  d.$mode.value = "coev";
  d.els.sig.value = "8";
  for (let g = 0; g < 2; g++) breedOneCoevGen(d);
  d.renderPanel();
  const panel = d.els.receipts.textContent;
  const mothSection = panel.split("— C1 ledger —")[0];
  assert.doesNotMatch(mothSection, /σ/,
    "the MOTH receipts section is byte-shaped as before — σ lives only on C1 ledger rows");
  // non-coev mode: the panel is the MOTH view alone, σ-free
  const d2 = makeDemo(778);
  d2.$mode.value = "classic";
  d2.renderPanel();
  assert.doesNotMatch(d2.els.receipts.textContent, /σ/,
    "the classic-mode panel path renders no σ anywhere (regression lock in the other direction)");
});

test("OLD-ROWS-SILENT: pre-R80 rows assert nothing about σ — the session's own row records, history is never backfilled", async () => {
  const d = makeDemo(999);
  const ledger = [
    { gen: 3, sId: "a", eId: "b", outcome: "ENDER-KILL", frames: 100, sFit: 111, eFit: 200, loserId: null },
    { gen: 4, sId: "c", eId: "d", outcome: "SURVIVOR-CAP", frames: 120, sFit: 505, eFit: 180, loserId: "c" },
    { gen: 5, sId: "e", eId: "f", outcome: "ENDER-KILL", frames: 90, sFit: 124, eFit: 300, loserId: null },
  ]; // pre-R80 rows: no sig field — the file predates σ recording
  const file = { kind: "pong-quilt/coev@v1", genC: 5, sChamp: null, eChamp: null,
    popS: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(1))), popE: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(2))), last: null, ledger };
  d.$load.onchange({ target: { files: [{ name: "pong-quilt-coev-gen5.json", text: () => Promise.resolve(JSON.stringify(file)) }] } });
  await new Promise((r) => setImmediate(r));
  d.$mode.value = "coev";
  d.els.sig.value = "10";
  breedOneCoevGen(d); // gen 6 — the first row this session receipts
  d.renderPanel();
  const lines = c1Lines(d.els.receipts.textContent);
  const withSig = lines.filter((l) => /σ=/.test(l));
  const withoutSig = lines.filter((l) => !/σ=/.test(l));
  assert.equal(withSig.length, 1, "exactly one row carries σ — the row this session bred");
  assert.match(withSig[0], /g6/, "the σ-carrying row is the new generation, not a backfilled old one");
  assert.match(withSig[0], /σ=10\b/, "the session's own row names the σ that bred it (FAIL-first on the pre-R84 tree: no σ anywhere)");
  assert.equal(withoutSig.length, 3, "the three pre-R80 rows print no σ — history is never backfilled with a value it never recorded");
  for (const l of withoutSig) assert.match(l, /g[345]\b/, `old row stays σ-silent: ${l}`);
});
