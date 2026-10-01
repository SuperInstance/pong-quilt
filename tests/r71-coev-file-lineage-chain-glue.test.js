// Round 71 pin — the coev-file LINEAGE CHAIN (R70 spec item 5, [S], first
// carrying, found by R70's own play). R70 made provenance session-local:
// load A, train, save B — B cannot say it descends from A, so across
// save→load hops the provenance story breaks even though both hops are
// individually honest (R70 pinned fileName persistence and the artifact
// boundary). The fix (R71): the writer records origin:coev.fileName when
// set (JSON.stringify drops undefined — a fresh session's file carries no
// origin key at all, never asserting what the lane didn't use); the load
// branch records fileOrigin from q.origin ONLY when it is a non-empty
// string; loadCoev clears fileOrigin (the artifact boundary, R70 T5 class);
// the stats line's file segment prints (descends from "<origin>") when the
// loaded file carried one.
// FAIL-first on the pristine r70 tip: T1/T2 RED (no origin in the written
// JSON; no descent claim on the stats line), T5 RED if only the load branch
// is fixed without the loadCoev clear.
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
    "\nreturn {startGenC,continueGenC,$save:$('save'),$load:$('load'),$mode:$('mode'),$pop:$('pop'),get coev(){return coev},get capture(){return capture},get receipts(){return receipts}};");
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

function coevFile(genC, seed, extra) {
  return Object.assign({ kind: "pong-quilt/coev@v1", genC, sChamp: null, eChamp: null,
    popS: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(seed))), popE: Array.from({ length: 32 }, () => PQ.makeNet(PQ.rng(seed + 1))), last: null, ledger: [] }, extra || {});
}

function loadFile(d, obj, name) {
  d.$load.onchange({ target: { files: [{ name, text: () => Promise.resolve(JSON.stringify(obj)) }] } });
  return new Promise((r) => setImmediate(r));
}

function savedJson(d) {
  if (!d.capture.downloads.length) throw new Error("no download captured");
  return JSON.parse(d.capture.blobs[d.capture.blobs.length - 1].parts[0]);
}

test("WRITE-CHAIN: a session loaded from named file A records origin \"A\" in the saved JSON", async () => {
  const d = makeDemo(20261001);
  d.$mode.value = "coev";
  await loadFile(d, coevFile(5, 1), "pong-quilt-coev-gen5.json");
  breedOneCoevGen(d); // gen 6
  d.$save.onclick(); // SAVE/COEV — the C1 writer
  const json = savedJson(d);
  assert.equal(json.kind, "pong-quilt/coev@v1");
  assert.equal(json.origin, "pong-quilt-coev-gen5.json", "FAIL-first on the pristine tip: the written JSON carries no origin — save→load hops cannot state their descent (R70 spec item 5)");
});

test("DISPLAY: a file carrying origin prints the descent claim on the C1 stats line", async () => {
  const d = makeDemo(777);
  d.$mode.value = "coev";
  await loadFile(d, coevFile(8, 20, { origin: "pong-quilt-coev-gen5.json" }), "pong-quilt-coev-gen8.json");
  breedOneCoevGen(d); // gen 9
  const stats = d.els.stats.textContent;
  assert.match(stats, /COEV gen 9 /, "training advanced past the load");
  assert.ok(stats.includes('file "pong-quilt-coev-gen8.json"'), "the loaded file's own name prints (R70 persistence)");
  assert.ok(stats.includes('(descends from "pong-quilt-coev-gen5.json")'), "FAIL-first on the pristine tip: no descent claim — the loaded file carried its parent provenance but the HUD cannot say it");
});

test("CHAIN-OF-CUSTODY: two hops — load A (no origin), save B (origin A); load B, save C — C names B as its origin, the immediate-parent law", async () => {
  const d = makeDemo(5150);
  d.$mode.value = "coev";
  await loadFile(d, coevFile(5, 1), "file-a.json");
  breedOneCoevGen(d);
  d.$save.onclick(); // B, origin "file-a.json"
  const b = savedJson(d);
  assert.equal(b.origin, "file-a.json");
  // the player re-loads B (browser names it file-b.json) and saves C
  const d2 = makeDemo(5151);
  d2.$mode.value = "coev";
  await loadFile(d2, coevFile(6, 2, { origin: b.origin }), "file-b.json");
  breedOneCoevGen(d2);
  d2.$save.onclick(); // C
  const c = savedJson(d2);
  assert.equal(c.origin, "file-b.json", "FAIL-first on the pristine tip: C cannot name its immediate parent B — the chain breaks at the second hop");
  assert.ok(!("origin" in coevFile(1, 9)), "sanity: the test file builder itself never fabricates an origin key");
});

test("NO-ORIGIN HONESTY: a file that carries no origin prints no descent claim — provenance asserts only what the file stated", async () => {
  const d = makeDemo(4242);
  d.$mode.value = "coev";
  await loadFile(d, coevFile(4, 30), "no-origin.json");
  breedOneCoevGen(d);
  const stats = d.els.stats.textContent;
  assert.ok(stats.includes('file "no-origin.json"'), "the file's own name still prints");
  assert.ok(!/descends from/.test(stats), "a file that never claimed a parent must not be printed with one — the naive always-on descent printer is the FAIL-first direction of this test");
  // and a fresh C1 session writes a JSON with NO origin key at all
  const d2 = makeDemo(4243);
  d2.$mode.value = "coev";
  breedOneCoevGen(d2);
  d2.$save.onclick();
  const json = savedJson(d2);
  assert.ok(!("origin" in json), "a fresh lane's JSON must carry no origin key — undefined is dropped by JSON.stringify, never written as null or \"\"");
});

test("MALFORMED-ORIGIN IMMUNITY: a non-string origin (number) is ignored, not displayed, not refused — the load-bearing fields still rule the malformed class", async () => {
  const d = makeDemo(999);
  d.$mode.value = "coev";
  await loadFile(d, coevFile(4, 40, { origin: 123 }), "numeric-origin.json");
  assert.ok(d.receipts.some((r) => r.kind === "LOAD/COEV"), "the file loads — a bad OPTIONAL provenance field does not promote to the malformed class (popS/popE/genC rule that, R67/R68)");
  breedOneCoevGen(d);
  const stats = d.els.stats.textContent;
  assert.ok(stats.includes('file "numeric-origin.json"'), "the file's own name prints");
  assert.ok(!/descends from/.test(stats), "a numeric origin must not be echoed into a quoted descent claim — never assert what the file didn't carry (as a string)");
});

test("ARTIFACT-BOUNDARY: loadCoev clears fileOrigin too — the checkpoint lane never inherits a player file's descent claim", async () => {
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
  const html2 = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
  const ex2 = (start, end) => {
    const L = html2.split("\n");
    const s = L.findIndex((l) => l.startsWith(start));
    if (s < 0) throw new Error("missing " + start);
    let e = s;
    while (e < L.length && !L[e].includes(end)) e++;
    if (e >= L.length) throw new Error("no end marker for " + start);
    return L.slice(s, e + 1).join("\n");
  };
  const panelSrc = (() => { const L = html2.split("\n"); const s = L.findIndex((l) => l.startsWith("function renderReceipts(")); let e = s; while (e < L.length && !L[e].includes("renderReceipts();}")) e++; return L.slice(s, e + 1).join("\n"); })();
  const factory2 = new Function("window", "alert", "PQ", "D", "$", "randPQ", "Blob", "URL", "document", "capture", "hash",
    "let champNet=null,champGame=null,gameId=0,gen=0,games=0,pop=Array.from({length:96},()=>PQ.makeNet(randPQ)),evalGen=null,lastSnap=null,champRing=PQ.makeRing(4),coev=null;" +
    "let receipts=[],receiptHead='0'.repeat(64),receiptEvicted=0;" +
    [ex2("function startGenC(){", "eliteK:D.elites});}"), ex2("function continueGenC(){", "coev.evalS=null;coev.evalE=null;}}"), ex2("$(\"load\").onchange", 'receipt("LOAD",0,1);});};'), ex2("function loadCoev(){", 'receipt("LOAD/COEV",0,1);}')].join("\n") + "\n" + panelSrc +
    "\nreturn {startGenC,continueGenC,loadCoev,$load:$('load'),$mode:$('mode'),get coev(){return coev},get receipts(){return receipts}};");
  const d2 = factory2(W, (m) => { throw new Error("alert:" + m); }, PQ, PQ.DEFAULTS, $2, PQ.rng(31337), BlobShim2, URLShim2, documentShim2, capture2, PQ.hash8);
  d2.els = els2;
  await loadFile(d2, coevFile(5, 1, { origin: "older-file.json" }), "pong-quilt-coev-gen5.json");
  d2.$mode.value = "coev";
  breedOneCoevGen(d2);
  d2.loadCoev(); // the artifact lane
  breedOneCoevGen(d2); // gen 121
  const stats = d2.els.stats.textContent;
  assert.equal(/file "/.test(stats), false, "GREEN on the pristine tip by design (fileOrigin does not exist yet); the pinned failure mode is a regression where loadCoev clears fileName (R70) but a future edit stops clearing fileOrigin while the descent printer keys on it — the checkpoint lane must never inherit a player file's provenance in any field");
  assert.equal(/descends from/.test(stats), false, "no descent claim survives the artifact crossing either");
  assert.match(stats, /COEV gen 121 /, "the artifact lane trained past its loaded generation");
});
