// Round 80 pin — σ recorded per coev ledger row, and the sChamp trail
// annotated when σ changes mid-run (R79 spec item 1, 13th carrying, first
// build).
//
// Wound closed: the σ slider fed runCoevGeneration every Train, but the
// receipted ledger rows (and the R69 trail VIEW over them) were σ-blind —
// a player dragging σ from 12 to 2 mid-session saw the fitness trajectory
// move with no record of which σ bred which generation. Twelve rounds of
// carried spec (R67→R79) asked for exactly this. R78 disclosed the
// lineage-visibility law AT the slider; R80 makes the session's own
// receipts name the σ they were bred at, so a trajectory printed beside
// an undisclosed breeding parameter was the last σ-shaped hole.
//
// The fix: every ledger row carries sig:<slider int> at write time; the
// trail annotates `(σ gN:σa → gM:σb)` ONLY when the tail's rows carry ≥2
// distinct σ values (a constant σ is the sigLine's job — printing it
// twice would be noise, not honesty); rows that predate σ recording
// (pre-R80 saves) are skipped silently — they assert nothing about σ —
// but a defined→undefined→defined gap is NAMED, never smoothed over.
// The canonical artifact lane (tools/prerun-coev.js) is untouched: its
// rows were bred at one fixed σ and its md5s stay frozen (R45/R47).
//
// FAIL-first on the pre-R80 tree: SIG-RECORDED RED (no sig field),
// MID-RUN-CHANGE-PRINTED RED (no annotation), GAP-NAMED RED.
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

function loadFile(d, obj, name) {
  d.$load.onchange({ target: { files: [{ name: name === undefined ? "pong-quilt-coev-gen" + (obj && obj.genC) + ".json" : name, text: () => Promise.resolve(JSON.stringify(obj)) }] } });
  return new Promise((r) => setImmediate(r));
}

test("SIG-RECORDED: every receipted coev ledger row carries the σ that bred it", () => {
  const d = makeDemo(20261003);
  d.$mode.value = "coev";
  d.els.sig.value = "8";
  for (let g = 0; g < 4; g++) breedOneCoevGen(d);
  const rows = d.coev.ledger.items();
  assert.ok(rows.length >= 4, `at least 4 receipted rows (got ${rows.length})`);
  for (const r of rows) assert.equal(r.sig, 8,
    `row gen ${r.gen} records sig 8 — the σ that bred it (FAIL-first on the pre-R80 tree: no sig field, got ${r.sig})`);
});

test("MID-RUN-CHANGE-PRINTED: a σ slider move mid-session annotates the trail with the receipted transition", () => {
  const d = makeDemo(555);
  d.$mode.value = "coev";
  d.els.sig.value = "8";
  for (let g = 0; g < 3; g++) breedOneCoevGen(d);
  d.els.sig.value = "20"; // the player drags σ mid-run
  for (let g = 0; g < 2; g++) breedOneCoevGen(d);
  const stats = d.els.stats.textContent;
  assert.match(stats, /sChamp trail /, "the trail itself prints (R69 lane intact)");
  assert.match(stats, /\(σ g1:σ8 → g4:σ20\)/,
    `the trail names the receipted σ transition (FAIL-first on the pre-R80 tree: no annotation; got: ${stats.match(/sChamp trail [^·]*/)[0]})`);
  // the annotation is a VIEW over the same rows — recompute it independently
  const marks = [];
  let lastSig;
  for (const r of d.coev.ledger.tail(8)) {
    if (r.sig === undefined) continue;
    if (r.sig !== lastSig) { marks.push(`g${r.gen}:σ${r.sig}`); lastSig = r.sig; }
  }
  assert.ok(marks.length >= 2, "the ledger itself holds ≥2 distinct σ values — the print is row-derived, not invented");
  assert.ok(stats.includes(marks.join(" → ")), "the printed transition is byte-identical to the row-derived one");
});

test("CONSTANT-SIG-SILENT: an untouched slider prints no σ annotation — the trail is not σ-noise", () => {
  const d = makeDemo(777);
  d.$mode.value = "coev";
  d.els.sig.value = "12";
  for (let g = 0; g < 4; g++) breedOneCoevGen(d);
  const stats = d.els.stats.textContent;
  assert.match(stats, /sChamp trail /, "the trail prints");
  assert.doesNotMatch(stats, /sChamp trail [0-9→]+ \(σ/, "constant σ prints nothing beside the trail — the R78 sigLine already discloses current σ at the slider; printing it again would be noise, not honesty (FAIL-first in the other direction: an always-on annotation)");
});

test("OLD-SAVE-HONEST: a pre-R80 save's rows assert nothing about σ — silent, no false gap claim", async () => {
  const d = makeDemo(999);
  const ledger = [
    { gen: 3, sId: "a", eId: "b", outcome: "ENDER-KILL", frames: 100, sFit: 111, eFit: 200, loserId: null },
    { gen: 4, sId: "c", eId: "d", outcome: "SURVIVOR-CAP", frames: 120, sFit: 505, eFit: 180, loserId: "c" },
    { gen: 5, sId: "e", eId: "f", outcome: "ENDER-KILL", frames: 90, sFit: 124, eFit: 300, loserId: null },
  ]; // pre-R80 rows: no sig field — the file predates σ recording
  const file = { kind: "pong-quilt/coev@v1", genC: 5, sChamp: null, eChamp: null,
    popS: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(1))), popE: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(2))), last: null, ledger };
  await loadFile(d, file, "pong-quilt-coev-gen5.json");
  d.$mode.value = "coev";
  d.els.sig.value = "10";
  breedOneCoevGen(d); // gen 6 — the first row this session receipts
  const stats = d.els.stats.textContent;
  assert.match(stats, /sChamp trail /, "the trail prints across the load boundary (R69/R67 lane)");
  assert.doesNotMatch(stats, /\(σ/, "no σ annotation: one defined row (the new gen) is a dot-level fact, not a mid-run change, and the old rows must not be silently credited with a σ they never recorded (FAIL-first in the other direction: a fabricated σ for history)");
  assert.doesNotMatch(stats, /σ-gap/, "a gap claim requires a defined row BEFORE the undefined ones — history-first is not a gap");
  const newRow = d.coev.ledger.tail(1)[0];
  assert.equal(newRow.sig, 10, "the session's own row records the σ that bred it — recording starts at build time, never backfilled onto history");
});

test("GAP-NAMED: a defined→undefined→defined σ sequence in the tail is NAMED, never smoothed over", async () => {
  const d = makeDemo(31337);
  // a crafted save whose ledger carries a mid-history hole: g1 has σ8, g2
  // predates recording, g3 has σ20 — the defined→undefined→defined shape
  const ledger = [
    { gen: 1, sId: "a", eId: "b", outcome: "SURVIVOR-CAP", frames: 200, sFit: 300, eFit: 100, loserId: null, sig: 8 },
    { gen: 2, sId: "c", eId: "d", outcome: "ENDER-KILL", frames: 80, sFit: 90, eFit: 400, loserId: null },
    { gen: 3, sId: "e", eId: "f", outcome: "SURVIVOR-CAP", frames: 220, sFit: 310, eFit: 90, loserId: null, sig: 20 },
  ];
  const file = { kind: "pong-quilt/coev@v1", genC: 3, sChamp: null, eChamp: null,
    popS: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(3))), popE: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(4))), last: null, ledger };
  await loadFile(d, file, "crafted-gap.json");
  d.$mode.value = "coev";
  d.els.sig.value = "20";
  breedOneCoevGen(d);
  const stats = d.els.stats.textContent;
  assert.match(stats, /σ-gap/, "the gap between defined σ rows is NAMED (FAIL-first on the pre-R80 tree: no gap vocabulary exists)");
  assert.match(stats, /g1:σ8 → g3:σ20/, "the defined transitions still print around the gap");
});
