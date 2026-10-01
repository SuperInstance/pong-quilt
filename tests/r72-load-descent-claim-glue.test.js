// Round 72 pin — the descent claim at LOAD time (R71 spec item 5, [S], first
// carrying, found by R71's own play of the lineage-chain fix). R71 made the
// loaded file's descent visible only AFTER the first Train — the R68
// LOAD/COEV banner named the file but not its parent, even though fileOrigin
// is known the moment the file parses. A player auditing a downloaded quilt's
// history had to train before the HUD told them where it came from. The fix
// (R72): the load banner prints (descends from "<origin>") when the file
// carries a non-empty-string one — the SAME law the load branch records it
// under (typeof q.origin==="string" && q.origin), so the banner can only ever
// echo what the lane already recorded; a file without origin banners
// byte-unchanged.
// FAIL-first on the pristine r71 tip: T1/T4 RED (no descent claim at load),
// T2/T3 GREEN by design (they guard the naive always-on load-time printer
// and the malformed-immunity law).
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

test("LOAD-DISPLAY: a file carrying origin states its descent AT LOAD — the banner names the parent before any Train", async () => {
  const d = makeDemo(20261001);
  d.$mode.value = "coev";
  await loadFile(d, coevFile(5, 1, { origin: "file-a.json" }), "file-b.json");
  const banner = d.els.stats.textContent;
  assert.match(banner, /loaded C1 file "file-b\.json" \(descends from "file-a\.json"\): gen 5 /,
    "FAIL-first on the pristine tip: the banner reads `loaded C1 file \"file-b.json\": gen 5` — the parent provenance is known at parse time but the auditor must TRAIN before the HUD says where the quilt came from (R71 spec item 5)");
});

test("NO-ORIGIN HONESTY: a file without origin banners byte-unchanged — the naive always-on load-time printer is the FAIL-first direction", async () => {
  const d = makeDemo(777);
  d.$mode.value = "coev";
  await loadFile(d, coevFile(4, 20), "no-origin.json");
  const banner = d.els.stats.textContent;
  assert.match(banner, /loaded C1 file "no-origin\.json": gen 4 /, "the no-origin banner keeps the R67/R68 shape exactly");
  assert.ok(!/descends from/.test(banner), "a file that never claimed a parent must not be bannered with one");
});

test("MALFORMED-ORIGIN IMMUNITY: a numeric origin is ignored at the banner too — the file still loads, no descent text", async () => {
  const d = makeDemo(999);
  d.$mode.value = "coev";
  await loadFile(d, coevFile(4, 40, { origin: 123 }), "numeric-origin.json");
  assert.ok(d.receipts.some((r) => r.kind === "LOAD/COEV"), "the file loads — a bad OPTIONAL provenance field does not promote to the malformed class");
  const banner = d.els.stats.textContent;
  assert.match(banner, /loaded C1 file "numeric-origin\.json": gen 4 /, "the file's own name and gen print");
  assert.ok(!/descends from/.test(banner), "a numeric origin must never be echoed into a quoted descent claim at the banner layer either");
  breedOneCoevGen(d);
  assert.ok(!/descends from/.test(d.els.stats.textContent), "and the post-Train stats line agrees — one recorded value, every surface honest (R71 T5's law survives the new surface)");
});

test("TWO-SURFACE AGREEMENT: the load banner and the post-Train stats line carry the SAME descent string — never two stories", async () => {
  const d = makeDemo(5150);
  d.$mode.value = "coev";
  await loadFile(d, coevFile(8, 2, { origin: "older-quilt.json" }), "mid-quilt.json");
  const banner = d.els.stats.textContent;
  breedOneCoevGen(d); // gen 9
  const stats = d.els.stats.textContent;
  const claim = '(descends from "older-quilt.json")';
  assert.ok(stats.includes(claim), "the post-Train stats line carries the claim (pinned R71 T2 — this direction is green on the pristine tip)");
  assert.ok(banner.includes(claim), "FAIL-first on the pristine tip: the banner carried no claim while the stats line did — the two surfaces told one story only after training");
  const bannerClaim = banner.match(/\(descends from "[^"]+"\)/);
  const statsClaim = stats.match(/\(descends from "[^"]+"\)/);
  assert.equal(bannerClaim && bannerClaim[0], statsClaim && statsClaim[0], "byte-identical claim text at both surfaces — a future edit that formats one surface differently trips here, not on a player's trust");
});
