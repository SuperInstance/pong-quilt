// Round 69 pin — the d(sChamp)/d(gen) printed lane on the C1 stats line
// (R68 spec item 3, 3rd carrying in the spec, first build). R66 P3 measured
// the fitness trajectory spiky/selection-noise dominated and the player saw
// only the latest gen's numbers; R66/R67/R68 carried "the honest learning
// answer should be visible, not only in test logs" for three rounds.
// The fix (R69): continueGenC prints `sChamp trail a→b→c…` — a VIEW over the
// ledger's own receipted sFit rows (coev.ledger.tail(8)), never a separate
// state array that could drift from the receipts it summarizes. Because the
// loaded ledger re-anchors the file's rows (R67 lane), the trajectory crosses
// load boundaries: a kept quilt's history is visible the moment it loads.
// Printed, never asserted as a learning claim — the trail shows the spikes
// (R66 P3); no fitness-direction assertion rides it.
// FAIL-first on the pristine tip: T1 RED (no `sChamp trail` in the stats
// line), T2 RED (same), T3 RED (a lone dot printed as a "trajectory").
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

test("TRAIL-VIEW: after 4+ C1 gens the stats line carries the sChamp fitness trajectory, view-identical to the ledger's receipted sFit rows", () => {
  const d = makeDemo(20261001);
  d.$mode.value = "coev";
  for (let g = 0; g < 5; g++) breedOneCoevGen(d);
  const stats = d.els.stats.textContent;
  assert.match(stats, /sChamp trail /, "FAIL-first on the pristine tip: no `sChamp trail` lane exists pre-R69");
  const m = stats.match(/sChamp trail ([0-9→]+)/);
  const printed = m[1].split("→").map(Number);
  const ledgerSfits = d.coev.ledger.tail(8).map((r) => r.sFit);
  assert.deepEqual(printed, ledgerSfits, "the printed lane is a VIEW over the ledger rows — byte-identical, no separate state to drift");
  assert.ok(printed.length >= 4, `trajectory carries at least the last-4 gens (got ${printed.length})`);
  // spiky honesty: no ordering assertion — R66 P3 measured selection-noise dominance.
  // The lane prints what happened; it never claims improvement.
});

test("LOAD-CONTINUITY: a loaded quilt's ledger history is in the trail the moment its first new gen completes", async () => {
  const d = makeDemo(777);
  // a file whose ledger carries three receipted sFit values from its past life
  const ledger = [
    { gen: 3, sId: "a", eId: "b", outcome: "ENDER-KILL", frames: 100, sFit: 111, eFit: 200, loserId: null },
    { gen: 4, sId: "c", eId: "d", outcome: "SURVIVOR-CAP", frames: 120, sFit: 505, eFit: 180, loserId: "c" },
    { gen: 5, sId: "e", eId: "f", outcome: "ENDER-KILL", frames: 90, sFit: 124, eFit: 300, loserId: null },
  ];
  const file = { kind: "pong-quilt/coev@v1", genC: 5, sChamp: null, eChamp: null,
    popS: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(1))), popE: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(2))), last: null, ledger };
  await loadFile(d, file, "pong-quilt-coev-gen5.json");
  d.$mode.value = "coev";
  breedOneCoevGen(d); // gen 6 — the trail must now show the file's 111→505→124 history + the new gen
  const stats = d.els.stats.textContent;
  assert.match(stats, /sChamp trail /, "FAIL-first on the pristine tip: no `sChamp trail` lane exists pre-R69");
  assert.ok(stats.includes("111→505→124→"), `the loaded file's receipted history leads the trail (got: ${stats.match(/sChamp trail ([0-9→]+)/)[1]})`);
  const newGenFit = d.coev.ledger.tail(1)[0].sFit;
  const m = stats.match(/sChamp trail ([0-9→]+)/);
  const printed = m[1].split("→").map(Number);
  assert.equal(printed[printed.length - 1], newGenFit, "the newest gen's sFit closes the trail — the trajectory is live, not a museum");
});

test("SINGLE-GEN SHAPE: one gen is a dot, not a trajectory — the lane stays silent until a second point exists", () => {
  const d = makeDemo(4242);
  d.$mode.value = "coev";
  breedOneCoevGen(d); // exactly one gen
  const stats = d.els.stats.textContent;
  assert.ok(!/sChamp trail /.test(stats), "a single printed point would pretend a trajectory where one observation exists — the lane opens at ≥2 points (FAIL-first on the pristine tip in the other direction: a naive always-on lane would print here)");
  assert.match(stats, /COEV gen 1 /, "the rest of the stats line is byte-shaped as before");
});
