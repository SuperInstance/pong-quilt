// Round 68 pin — file provenance on the C1 receipts (R67 spec item 4, 3rd
// carrying in the spec, first build): a receipt the demo calls its honesty
// centerpiece must be able to say WHICH session it belongs to.
// Wound found by playing: after the R67 writer a C1 player can keep their
// work — but the kept work is anonymous in both directions. (a) The SAVE/COEV
// receipt kind is the same string for a gen-1 quilt and a gen-300 quilt; the
// receipt row's own gen column records the CLASSIC slot, which the C1 lane
// never sets on the file-load path (verbatim: load a gen-5 coev file at a
// fresh page, classic gen stays 0, save, the row silently asserts gen 0 —
// the R56-P3-adjacent class, a provenance column asserting a generation the
// lane never used). (b) The LOAD/COEV banner prints gen/popS/popE/sChamp/
// ledger but never the file's NAME — the player with three coev quilts
// ("pong-quilt-coev-gen5.json", "...gen12.json", "...gen40.json") cannot tell
// WHICH one they just loaded; nothing on the page binds the receipt story to
// the file story.
// The fix (R68): receipt() takes an optional 4th arg laneGen — the row's gen
// column records the C1 generation when a C1-lane receipt is written, never
// the classic slot; renderReceipts() appends ` g${r.gen}` to /COEV-kind rows
// (non-C1 rows render byte-unchanged); SAVE/COEV, SAVE/COEV-EMPTY, LOAD/COEV,
// LOAD/COEV-MALFORMED all pass their genC (the malformed refusal names the
// genC the file CLAIMED); the LOAD/COEV banner carries f.name.
// Supersedes nothing: kinds, the writer shape, the verbatim-restore lane and
// the R64 empty-state refusal all survive unchanged (tests/r67 pin passes
// untouched — its 3-arg shim simply never sees the new lane; this pin uses
// the REAL shipped receipt() — hoisted verbatim after the handlers — so the
// assertions run the page's own hash-chained writer end to end).
// FAIL-first: T1 RED on the pristine tip via its render assertion (no ` g`
// suffix exists pre-R68); T2/T3 RED via row.gen === 0 (the classic slot) where
// 5 is claimed; T4 RED both ways.
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

// The shipped panel writer + receipt(), VERBATIM (same extraction discipline
// as tests/coev-panel-glue.test.js): renderReceipts anchors the start,
// receipt()'s trailing renderReceipts() call anchors the end.
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
  const capture = { downloads: [], blobs: 0 };
  const BlobShim = class { constructor(parts, opts) { capture.blobs++; this.parts = parts; this.type = opts && opts.type; } };
  const URLShim = { createObjectURL: () => "blob:mock" };
  const documentShim = { createElement: () => { const el = { click() { el.blob = demo.__lastBlob; capture.downloads.push(el); } }; return el; } };
  const src = [
    extract("function startGenC(){", "eliteK:D.elites});}"),
    extract("function continueGenC(){", "coev.evalS=null;coev.evalE=null;}}"),
    extract('$(\"save\").onclick', 'receipt(\"SAVE\",0,1);};'),
    extract('$(\"load\").onchange', 'receipt(\"LOAD\",0,1);});};'),
    extract("function live(){", "PQ.newGame(randPQ);gameId++;}});}"),
  ].join("\n");
  // NOTE: the verbatim receipt() is a function declaration — it hoists above
  // the handler bindings, so every receipt() call below runs the REAL shipped
  // hash-chained writer (rows land in `receipts`, rendered by renderReceipts).
  const factory = new Function("window", "alert", "PQ", "D", "$", "randPQ", "Blob", "URL", "document", "capture", "hash",
    "let champNet=null,champGame=null,gameId=0,gen=0,games=0,pop=Array.from({length:96},()=>PQ.makeNet(randPQ)),evalGen=null,lastSnap=null,champRing=PQ.makeRing(4),coev=null;" +
    "let receipts=[],receiptHead='0'.repeat(64),receiptEvicted=0;" +
    src + "\n" + extractReceiptPanel() +
    "\nreturn {startGenC,continueGenC,$save:$('save'),$load:$('load'),$mode:$('mode'),$pop:$('pop'),live,forceLiveClassic(){champNet=PQ.makeNet(randPQ);champGame=PQ.newAdvGame(randPQ);},get coev(){return coev},get gen(){return gen},get champNet(){return champNet},get champGame(){return champGame},get pop(){return pop},get capture(){return capture},get receipts(){return receipts},renderPanel:renderReceipts,realReceipt:receipt};");
  const demo = factory({}, (m) => { throw new Error("alert:" + m); }, PQ, PQ.DEFAULTS, $, PQ.rng(seed), BlobShim, URLShim, documentShim, capture, PQ.hash8);
  URLShim.createObjectURL = (blob) => { demo.__lastBlob = blob; return "blob:mock"; };
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
  return new Promise((r) => setImmediate(r)); // the handler works inside f.text().then
}

test("WRITE-PROVENANCE: the SAVE/COEV receipt records the C1 genC (row + rendered line), never the classic slot", () => {
  const d = makeDemo(20261001);
  d.$mode.value = "coev";
  breedOneCoevGen(d);
  const genC = d.coev.genC;
  assert.equal(genC, 1, "precondition: one C1 generation bred");
  d.$save.onclick();
  const row = d.receipts.find((r) => r.kind === "SAVE/COEV");
  assert.ok(row, `expected SAVE/COEV receipt, got ${JSON.stringify(d.receipts.map((r) => r.kind))}`);
  assert.equal(row.gen, genC, "the row's own provenance column names the kept genC (on the pristine tip it records the classic slot, which happens to be 1 here only because R47 syncs it after a page-bred generation — the load path in T2 is the discriminating case)");
  d.renderPanel(); // the verbatim panel writer
  assert.match(d.els.receipts.textContent, new RegExp(`SAVE/COEV g${genC} move=0`), "the rendered receipt LINE names the genC (FAIL-first on the pristine tip: no ` g` suffix exists pre-R68)");
  assert.ok(!/SAVE\/COEV move=/.test(d.els.receipts.textContent), "no anonymous C1 save line may survive beside the named one");
});

test("LOAD-PROVENANCE: the LOAD/COEV banner names the FILE (f.name + genC + sizes), and a save in the loaded session still names the file's genC", async () => {
  const d = makeDemo(777);
  const file = { kind: "pong-quilt/coev@v1", genC: 5, sChamp: null, eChamp: null,
    popS: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(1))), popE: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(2))), last: null, ledger: [] };
  await loadFile(d, file, "pong-quilt-coev-gen5.json");
  const row = d.receipts.find((r) => r.kind === "LOAD/COEV");
  assert.ok(row, `expected LOAD/COEV receipt, got ${JSON.stringify(d.receipts.map((r) => r.kind))}`);
  assert.equal(row.gen, 5, "the receipt row names the file's genC in its own provenance column (FAIL-first on the pristine tip: the row records the classic slot 0)");
  assert.match(d.els.stats.textContent, /loaded C1 file "pong-quilt-coev-gen5\.json": gen 5/, "the banner names the FILE and its genC (FAIL-first: `loaded C1 file: gen 5` — no filename)");
  assert.match(d.els.stats.textContent, /popS 32 · popE 32/, "the banner keeps the population sizes beside the filename");
  // the load path never touches the classic slot — a save in THIS session must still name genC 5, not classic gen 0
  assert.equal(d.gen, 0, "precondition: the file-load path left the classic slot at 0 — the exact state where the old receipt row lied");
  d.$mode.value = "coev";
  d.$save.onclick();
  const saveRow = d.receipts.find((r) => r.kind === "SAVE/COEV");
  assert.ok(saveRow, "a save after the load writes the quilt (pops present)");
  assert.equal(saveRow.gen, 5, "the save names genC 5 while the classic slot is still 0 — the wound scenario is closed (FAIL-first: row.gen === 0)");
});

test("MALFORMED-PROVENANCE: the refusal names the genC the file claimed, zero state change", async () => {
  const d = makeDemo(20261001);
  await loadFile(d, { kind: "pong-quilt/coev@v1", genC: 5 }); // coev-shaped, no pops
  const row = d.receipts.find((r) => r.kind === "LOAD/COEV-MALFORMED");
  assert.ok(row, `expected LOAD/COEV-MALFORMED, got ${JSON.stringify(d.receipts.map((r) => r.kind))}`);
  assert.equal(row.gen, 5, "even a refusal names the claimed genC in the provenance column (FAIL-first on the pristine tip: row.gen === 0)");
  assert.equal(d.coev, null, "zero state change in the C1 lane");
  assert.equal(d.gen, 0, "zero state change in the classic lane");
});

test("EMPTY-STATE + RENDER-SHAPE: the empty refusal names the C1 gen when a half-built lane exists; the verbatim panel renders C1 rows named and non-C1 rows byte-unchanged", async () => {
  const d = makeDemo(4242);
  const file = { kind: "pong-quilt/coev@v1", genC: 5, sChamp: null, eChamp: null,
    popS: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(1))), popE: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(2))), last: null, ledger: [] };
  await loadFile(d, file); // genC 5, classic slot 0 — the discriminating provenance state
  d.$mode.value = "coev";
  d.coev.popS = null; // the R60/R63 fails-closed class: a half-built lane (state before pops)
  d.$save.onclick();
  const row = d.receipts.find((r) => r.kind === "SAVE/COEV-EMPTY");
  assert.ok(row, `expected SAVE/COEV-EMPTY receipt, got ${JSON.stringify(d.receipts.map((r) => r.kind))}`);
  assert.equal(row.gen, 5, "the empty refusal names the half-built lane's genC 5, not the classic slot 0 (FAIL-first on the pristine tip: row.gen === 0)");
  assert.equal(d.capture.downloads.length, 0, "the refusal still downloads nothing");
  // render shape through the REAL receipt(): a C1 row is named, a non-C1 row
  // keeps the pre-R68 byte format — the lane name must not leak into the
  // MOTH vocabulary (a DEATH row has no generation claim to make).
  d.receipts.length = 0;
  d.$mode.value = "classic";
  d.realReceipt("SAVE/COEV", 0, 1, 7); // the shipped writer with the R68 laneGen
  d.realReceipt("DEATH", 0, 0);
  d.renderPanel();
  assert.match(d.els.receipts.textContent, /SAVE\/COEV g7 move=0/, "a C1-lane row renders with its named gen (FAIL-first: no ` g` suffix pre-R68)");
  assert.match(d.els.receipts.textContent, /DEATH move=0/, "a non-C1 row renders with the pre-R68 prefix");
  assert.ok(!/DEATH g\d/.test(d.els.receipts.textContent), "the lane name must NOT leak into non-C1 rows — byte-unchanged is the regression guard");
});
