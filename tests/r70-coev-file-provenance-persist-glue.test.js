// Round 70 pin — file-provenance PERSISTENCE on the C1 stats line
// (R69 spec item 3, [S], 2nd carrying in the spec, first build). R69 P4
// verbatim-measured the wound at the tip: the R68 load banner names the file
// ONCE, and the very next Train overwrites the stats line with the generation
// template — the loaded-file provenance evaporates from the HUD. A player who
// loads file A, trains 3 gens, loads file B, trains 2, can no longer tell
// which lineage the visible generation belongs to.
// The fix (R70): the coev load branch records coev.fileName=f.name||"unnamed"
// and continueGenC prints ` · file "<name>"` in the stats template until
// another load replaces it. Placed AFTER the `loser` segment so the pinned
// R55 prefix contract (`COEV gen N · games N · h2h ` — r61/r65 pins) is
// byte-untouched. A session that never loaded a file prints no file segment —
// provenance asserts only what the lane actually used (the R68 laneGen/R56 P3
// discipline).
// FAIL-first on the pristine tip: T1/T2 RED (filename GONE after Train),
// T3/T4 GREEN by design (their FAIL-first direction is the naive always-on
// printer and state-changing refusal).
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

function coevFile(genC, seed) {
  return { kind: "pong-quilt/coev@v1", genC, sChamp: null, eChamp: null,
    popS: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(seed))), popE: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(seed + 1))), last: null, ledger: [] };
}

function loadFile(d, obj, name) {
  d.$load.onchange({ target: { files: [{ name, text: () => Promise.resolve(JSON.stringify(obj)) }] } });
  return new Promise((r) => setImmediate(r));
}

test("PERSISTENCE: the loaded file's name survives Train — after 2 gens the stats line still names the lineage's file", async () => {
  const d = makeDemo(20261001);
  await loadFile(d, coevFile(5, 1), "pong-quilt-coev-gen5.json");
  assert.match(d.els.stats.textContent, /loaded C1 file "pong-quilt-coev-gen5\.json"/, "the R68 load banner names the file once");
  d.$mode.value = "coev";
  breedOneCoevGen(d); // gen 6
  breedOneCoevGen(d); // gen 7
  const stats = d.els.stats.textContent;
  assert.match(stats, /COEV gen 7 /, "training advanced two generations past the load");
  assert.ok(stats.includes('file "pong-quilt-coev-gen5.json"'), "FAIL-first on the pristine tip: the filename evaporated the moment Train overwrote the stats line (R69 P4 verbatim measurement)");
});

test("REPLACEMENT: a second load replaces the printed provenance — the stats line names file B, never the stale file A", async () => {
  const d = makeDemo(777);
  d.$mode.value = "coev";
  await loadFile(d, coevFile(3, 10), "pong-quilt-coev-gen3.json");
  breedOneCoevGen(d);
  const afterA = d.els.stats.textContent;
  assert.ok(afterA.includes('file "pong-quilt-coev-gen3.json"'), "FAIL-first on the pristine tip: file A's name is gone after one Train");
  await loadFile(d, coevFile(8, 20), "pong-quilt-coev-gen8.json");
  breedOneCoevGen(d);
  const afterB = d.els.stats.textContent;
  assert.ok(afterB.includes('file "pong-quilt-coev-gen8.json"'), "FAIL-first on the pristine tip: file B's name never persists either");
  assert.ok(!afterB.includes("pong-quilt-coev-gen3.json"), "the stale file A name must not linger beside file B's (replacement, not accumulation)");
});

test("NO-FILE HONESTY: a session that never loaded a file prints no file segment — provenance asserts only what the lane used", () => {
  const d = makeDemo(4242);
  d.$mode.value = "coev";
  breedOneCoevGen(d); // fresh C1, no load
  const stats = d.els.stats.textContent;
  assert.ok(!/file "/.test(stats), "a fresh session printing `file` would claim provenance it never had — the naive always-on printer is the FAIL-first direction of this test");
  assert.match(stats, /COEV gen 1 · games \d+ · h2h /, "R55 stats prefix contract byte-intact");
});

test("MALFORMED-IMMUNITY: a refused coev-shaped file leaves provenance untouched — no fileName recorded, no file segment printed", async () => {
  const d = makeDemo(999);
  const bad = { kind: "pong-quilt/coev@v1", genC: 4 }; // missing popS/popE — the R67/R68 malformed class
  await loadFile(d, bad, "corrupt-coev.json");
  assert.ok(d.receipts.some((r) => r.kind === "LOAD/COEV-MALFORMED"), "the refusal is receipted NAMED (R68 contract)");
  assert.equal(d.coev, null, "zero state change on the refusal path");
  d.$mode.value = "coev";
  breedOneCoevGen(d);
  const stats = d.els.stats.textContent;
  assert.ok(!/file "/.test(stats), "a refused file must not leak its name into the HUD — the refusal names the genC it CLAIMED (R68), never a provenance it granted");
});

test("ARTIFACT-BOUNDARY: the canonical-artifact lane (loadCoev) clears file provenance — the checkpoint's identity is its receipted banner, never a stale player file", () => {
  const d = makeDemo(31337);
  const W = { PONG_QUILT_COEV: {
    seed: 20260926, gens: 120, pop: 48,
    sChamp: { net: PQ.makeNet(PQ.rng(5)), netId: "artS", fitness: 900 },
    eChamp: { net: PQ.makeNet(PQ.rng(6)), netId: "artE", fitness: 800 },
    ledger: [{ gen: 118, sId: "x", eId: "y", outcome: "ENDER-KILL", frames: 100, sFit: 700, eFit: 650, loserId: null }],
    ledgerHead: "deadbeef",
  } };
  const els2 = { stats: { textContent: "" }, mode: { value: "classic" }, pop: { value: "96" }, sub: { value: "1" }, sig: { value: "10" }, receipts: { textContent: "" } };
  const $2 = (id) => els2[id] || (els2[id] = { textContent: "", value: "" });
  const capture2 = { downloads: [], blobs: [] };
  const BlobShim2 = class { constructor(parts, opts) { this.parts = parts; this.type = opts && opts.type; capture2.blobs.push(this); } };
  const URLShim2 = { createObjectURL: () => "blob:mock" };
  const documentShim2 = { createElement: () => { const el = { click() { capture2.downloads.push(el); } }; return el; } };
  const fs2 = require("fs"), path2 = require("path");
  const lines2 = fs2.readFileSync(path2.join(__dirname, "../index.html"), "utf8").split("\n");
  const lcS = lines2.findIndex((l) => l.startsWith("function loadCoev(){"));
  if (lcS < 0) throw new Error("index.html must define loadCoev()");
  let lcE = lcS;
  while (lcE < lines2.length && !lines2[lcE].includes('receipt("LOAD/COEV",0,1);}')) lcE++;
  const loadCoevSrc = lines2.slice(lcS, lcE + 1).join("\n");
  const html2 = fs2.readFileSync(path2.join(__dirname, "../index.html"), "utf8");
  const ex2 = (start, end) => {
    const L = html2.split("\n");
    const s = L.findIndex((l) => l.startsWith(start));
    let e = s;
    while (e < L.length && !L[e].includes(end)) e++;
    return L.slice(s, e + 1).join("\n");
  };
  const factory2 = new Function("window", "alert", "PQ", "D", "$", "randPQ", "Blob", "URL", "document", "capture", "hash",
    "let champNet=null,champGame=null,gameId=0,gen=0,games=0,pop=Array.from({length:96},()=>PQ.makeNet(randPQ)),evalGen=null,lastSnap=null,champRing=PQ.makeRing(4),coev=null;" +
    "let receipts=[],receiptHead='0'.repeat(64),receiptEvicted=0;" +
    [ex2("function startGenC(){", "eliteK:D.elites});}"), ex2("function continueGenC(){", "coev.evalS=null;coev.evalE=null;}}"), ex2("$(\"load\").onchange", 'receipt("LOAD",0,1);});};'), loadCoevSrc].join("\n") + "\n" +
    (() => { const L = html2.split("\n"); const s = L.findIndex((l) => l.startsWith("function renderReceipts(")); let e = s; while (e < L.length && !L[e].includes("renderReceipts();}")) e++; return L.slice(s, e + 1).join("\n"); })() +
    "\nreturn {startGenC,continueGenC,loadCoev,$load:$('load'),$mode:$('mode'),get coev(){return coev},get receipts(){return receipts}};");
  const d2 = factory2(W, (m) => { throw new Error("alert:" + m); }, PQ, PQ.DEFAULTS, $2, PQ.rng(31337), BlobShim2, URLShim2, documentShim2, capture2, PQ.hash8);
  d2.els = els2;
  (async () => {
    await loadFile(d2, coevFile(5, 1), "pong-quilt-coev-gen5.json");
    d2.$mode.value = "coev";
    breedOneCoevGen(d2);
    d2.loadCoev();
    breedOneCoevGen(d2); // gen 121
    const stats = d2.els.stats.textContent;
    assert.equal(/file "/.test(stats), false, "FAIL-first on the unfixed line: the artifact lane served file A's stale provenance at gen 121 (verbatim: load file A → load artifact → Train printed file \"pong-quilt-coev-gen5.json\") — the checkpoint's identity is its own receipted banner, never a player file");
    assert.match(stats, /COEV gen 121 /, "the artifact lane trained past its loaded generation");
  })();
});
