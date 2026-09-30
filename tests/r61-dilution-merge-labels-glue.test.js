// R61 pin — dilution label + merge-tail naming (R60 spec item 5, shipped this round).
// Harness lineage: verbatim-extraction glue pattern from tests/r59-coev-save-honesty-glue.test.js
// and tests/r60-startgenc-fails-closed-glue.test.js (credit R59/R60).
// FAIL-first: on pristine main, LABELS 1 and 2 RED (the sentences do not exist), RAILS 3 GREEN.
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const PQ = require(path.join(ROOT, "core.js"));
const L = html.split("\n");
function extract(fnStart, endMarker) {
  const s = L.findIndex((l) => l.startsWith(fnStart));
  assert.notEqual(s, -1, "start line present: " + fnStart);
  let e = s;
  while (e < L.length && !L[e].includes(endMarker)) e++;
  assert.ok(e < L.length, "end marker present: " + endMarker);
  return L.slice(s, e + 1).join("\n");
}

function makeDemo(seed) {
  const els = {
    stats: { textContent: "" }, mode: { value: "classic" }, pop: { value: "96" },
    sub: { value: "1" }, sig: { value: "10" }, dec: { value: "4" }, receipts: { textContent: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const receiptLog = [];
  const receipt = (kind, move, conf) => receiptLog.push({ kind, move, conf });
  const renderReceipts = () => {};
  const src = [
    extract("function startGen(){", "eliteK:D.elites})}"),
    extract("function startGenC(){", "enderHits:r.enderHits};},{eliteK:D.elites});}"),
    extract("function continueGenC(){", "coev.evalS=null;coev.evalE=null;}}"),
    extract('$("load").onchange', 'receipt("LOAD",0,1);});};'),
  ].join("\n");
  const factory = new Function("window", "alert", "PQ", "D", "$", "receipt", "renderReceipts", "randPQ",
    "let champNet=null,champGame=null,gameId=0,gen=0,games=0,pop=Array.from({length:96},()=>PQ.makeNet(randPQ)),evalGen=null,lastSnap=null,champRing=PQ.makeRing(4),coev=null;" +
    src +
    "\nreturn {startGenC,continueGenC,$load:$(\"load\"),get coev(){return coev},set coev(v){coev=v},get gen(){return gen},get pop(){return pop}};");
  const d = factory({}, (m) => { throw new Error("alert: " + m); },
    PQ, PQ.DEFAULTS, $, receipt, renderReceipts, PQ.rng(seed));
  return { d, els, receiptLog };
}

test("LABEL 1 (FAIL-first): the coev stats line names the elite-archive breeding bound and the fresh-random refill", () => {
  const { d, els } = makeDemo(20260929);
  d.startGenC();
  for (let i = 0; i < 8 && !(d.coev.evalS === null && d.coev.genC >= 1); i++) d.continueGenC();
  assert.ok(d.coev.genC >= 1, "one full C1 generation ran");
  const stats = els.stats.textContent;
  assert.match(stats, /COEV gen 1 · games \d+ · h2h /, "R55 coev stats prefix contract intact");
  assert.match(stats, /elite-archive only/, "the breeding bound is NAMED on the stats line");
  assert.match(stats, /bred pop \d+/, "the bred population size is disclosed");
  assert.match(stats, /fresh random/, "the refill's random origin is disclosed");
});

test("LABEL 2 (FAIL-first): the file-load path names the merge tail it keeps", async () => {
  const { d, els, receiptLog } = makeDemo(20260929);
  const fileNetA = PQ.makeNet(PQ.rng(777));
  const fileNetB = PQ.makeNet(PQ.rng(778));
  const q = { gen: 42, best: fileNetA, pop: [fileNetA, fileNetB], stats: { games: 1, best: 100 } };
  d.$load.onchange({ target: { files: [{ text: () => Promise.resolve(JSON.stringify(q)) }] } });
  await new Promise((res) => setTimeout(res, 20));
  assert.equal(receiptLog.filter((r) => r.kind === "LOAD").length, 1, "the LOAD receipt still fires");
  assert.equal(d.gen, 42, "gen came from the file");
  assert.equal(d.pop.length, 96, "merge: 2 file nets + 94 pre-existing");
  const stats = els.stats.textContent;
  assert.match(stats, /merge tail kept \d+ pre-existing nets/, "the kept tail is NAMED with its count");
  assert.match(stats, /not from this file/, "the tail's alien origin is disclosed");
});

test("RAILS 3 (green both ways): the R57-era extraction surface and the COEV prefix survive the labels", () => {
  // the R57 pin's byte anchors still resolve (insertion must not move the end marker)
  const slice = extract('$("load").onchange', 'receipt("LOAD",0,1);});};');
  assert.ok(slice.includes("receipt(\"LOAD\",0,1);});};"), "load handler end marker byte-present");
  // classic lane untouched: exactly one classic stats assignment site, still calling PQ.formatStats
  const classicAssigns = L.filter((l) => l.includes('$("stats").textContent=PQ.formatStats('));
  assert.equal(classicAssigns.length, 1, "exactly one classic formatStats assignment site");
});
