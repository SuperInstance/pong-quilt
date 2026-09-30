// Round 64 pin — the Save button refuses in C1 mode, named, with no download.
// SUPERSEDED in its test-1 arm by the R67 coev-quilt writer (R66 spec item 2):
// with pops present the coev banner now WRITES the one-lane file (kind
// "pong-quilt/coev@v1") — see tests/r67-coev-quilt-writer-glue.test.js. What
// survives of R64, and stays pinned here: (a) the empty-C1 refusal is still
// named with no download (receipt SAVE/COEV-EMPTY — was SAVE/COEV-UNSTABLE);
// (b) the classic writer is shape-unchanged under any banner; (c) the guard
// keys on the mode banner, not the coev object. The classic-banner-after-C1
// franken tail remains OPEN (R66 spec item 1 [M], lane tracking).
// Builder item: R63 mandate item 2 (R59's M1, 5th carrying). The wound
// (verbatim-measured R56/R57/R58/R59/R63, re-confirmed present-tense on main
// 618dc3b by the R64 scientist driver): in coev mode the save onclick writes
// {gen, best:champNet, pop:pop.slice(0,8)} — but continueGenC sets
// gen=coev.genC and champNet=sChamp.net while pop stays the untouched CLASSIC
// population, so the downloaded file carries THREE disagreeing lineages (C1
// generation, C1 champion, classic population). Reloading that file breeds
// classic noise under a C1 banner — lineage fields that assert what the
// weights do not carry (R56 P3; R59 M1; R63 M2: fileGen 1 = coevGenC 1,
// best identity-equal sChamp, 8/8 pop classic, 0 coev fields).
// The fix (R64): reland-and-widen R59's unmerged refusal (playtest-round-59
// authored the SAME receipt name + classic-unchanged contract) — the guard
// keys on the mode BANNER alone (R59 keyed mode==="coev" AND coev.genC>0):
// the banner is the contract the player sees, and a coev-mode save is
// coev-semantics regardless of whether training has run. R67 replaced the
// refusal with the writer wherever work exists; the refusal survives for the
// empty state (SAVE/COEV-EMPTY). Classic-mode save is shape-unchanged. The
// named-but-unfixed adjacent tail (C1-trained, dropdown back to classic, save
// still pairs coev gen/champ with the classic pop — R59 said closing it needs
// lane tracking) is carried to the R68 spec; this [S] item does not attempt it.
// FAIL-first: test 1 is RED on pristine main (kind "SAVE", download captured);
// tests 2+3 are GREEN before and after (classic regression + banner contract).
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

function makeDemo(seed) {
  const els = {
    stats: { textContent: "" }, mode: { value: "classic" }, pop: { value: "96" },
    sub: { value: "1" }, sig: { value: "10" }, dec: { value: "4" }, receipts: { textContent: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const receiptLog = [];
  const receipt = (kind, move, conf) => receiptLog.push({ kind, move, conf });
  const renderReceipts = () => {};
  const capture = { downloads: [], blobs: 0 };
  const BlobShim = class { constructor(parts, opts) { capture.blobs++; this.parts = parts; this.type = opts && opts.type; } };
  const URLShim = { createObjectURL: (blob) => "blob:mock" };
  const documentShim = { createElement: () => { const el = { click() { el.blob = el._blob; capture.downloads.push(el); } }; return el; } };
  const src = [
    extract("function startGenC(){", "eliteK:D.elites});}"),
    extract("function continueGenC(){", "coev.evalS=null;coev.evalE=null;}}"),
    extract('$("save").onclick', 'receipt("SAVE",0,1);};'),
  ].join("\n");
  // the page binds a.href=URL.createObjectURL(blob); we hand the anchor the blob via the URL shim's side effect slot
  const factory = new Function("window", "alert", "PQ", "D", "$", "receipt", "renderReceipts", "randPQ", "Blob", "URL", "document", "capture", "receiptLog",
    "let champNet=null,champGame=null,gameId=0,gen=0,games=0,pop=Array.from({length:96},()=>PQ.makeNet(randPQ)),evalGen=null,lastSnap=null,champRing=PQ.makeRing(4),coev=null;" +
    src +
    "\nreturn {startGenC,continueGenC,$save:$('save'),$mode:$('mode'),get coev(){return coev},get gen(){return gen},get champNet(){return champNet},get pop(){return pop},get receiptLog(){return receiptLog},get capture(){return capture}};");
  const demo = factory({}, (m) => { throw new Error("alert:" + m); }, PQ, PQ.DEFAULTS, $, receipt, renderReceipts, PQ.rng(seed), BlobShim, URLShim, documentShim, capture, receiptLog);
  // wire the URL shim now that it exists: anchors get the last-created blob
  URLShim.createObjectURL = (blob) => { demo.__lastBlob = blob; return "blob:mock"; };
  // patch document shim clicks to use it — simplest: anchor click reads the demo slot
  documentShim.createElement = () => {
    const el = { click() { el.blob = demo.__lastBlob; capture.downloads.push(el); } };
    return el;
  };
  return demo;
}

// Drive one full C1 generation (the stream may need several continueGenC calls).
function breedOneCoevGen(d) {
  d.startGenC();
  const pre = d.coev.genC;
  for (let k = 0; k < 24 && d.coev.genC === pre; k++) d.continueGenC();
  if (d.coev.genC === pre) throw new Error("C1 generation did not complete in 24 drives");
}

test("GLUE: a coev-mode save after C1 training now WRITES the one-lane coev quilt — kind pong-quilt/coev@v1, no classic fields, SAVE/COEV receipt (R67 writer; the R64 refusal survives only for the empty state)", () => {
  const d = makeDemo(20260929);
  d.$mode.value = "coev"; // the player flow: flip the dropdown to C1, then Train, then Save
  breedOneCoevGen(d);
  assert.equal(d.capture.downloads.length, 0, "precondition: nothing saved yet");
  // the franken condition this file originally pinned still holds pre-save —
  // the shared slots are coev-semantics, the classic pop is untouched:
  assert.equal(d.gen, d.coev.genC, "page gen banner is coev.genC");
  assert.equal(PQ.netId(d.champNet), PQ.netId(d.coev.sChamp.net), "page champion IS the C1 champion");
  const classicIds = new Set(d.pop.map(PQ.netId));
  const coevIds = new Set(d.coev.popS.map(PQ.netId));
  assert.equal([...classicIds].filter((id) => coevIds.has(id)).length, 0,
    "classic population shares nothing with coev.popS (the three-lineage split)");
  d.$save.onclick();
  assert.equal(d.capture.downloads.length, 1, "the writer produces exactly one download");
  assert.ok(d.receiptLog.some((r) => r.kind === "SAVE/COEV"),
    `expected a SAVE/COEV receipt, got ${JSON.stringify(d.receiptLog.map((r) => r.kind))}`);
  assert.ok(!d.receiptLog.some((r) => r.kind === "SAVE/COEV-UNSTABLE"),
    "the R64 bridge receipt is superseded wherever pops exist");
  assert.ok(!d.receiptLog.some((r) => r.kind === "SAVE"),
    "a bare SAVE receipt means the franken writer ran under the coev banner");
  const q = JSON.parse(d.capture.downloads[0].blob.parts.join(""));
  assert.equal(q.kind, "pong-quilt/coev@v1");
  assert.equal(q.genC, d.coev.genC);
  assert.ok(q.popS.length === 96 && q.popE.length === 96, "both populations carried whole");
  for (const k of ["gen", "best", "pop", "stats"]) assert.ok(!(k in q),
    `no classic field '${k}' may exist to disagree with the weights (the R56 P3/R59 M1/R63 M2 class)`);
});

test("REGRESSION: classic-mode save is shape-unchanged — download captured, bare SAVE receipt, file carries gen/best/pop/stats", () => {
  const d = makeDemo(20260929);
  d.$save.onclick();
  assert.equal(d.capture.downloads.length, 1, "classic save produces exactly one download");
  assert.ok(d.receiptLog.some((r) => r.kind === "SAVE"), "classic save receipts bare SAVE");
  assert.ok(!d.receiptLog.some((r) => r.kind === "SAVE/COEV-UNSTABLE"), "classic save is not refused");
  const file = JSON.parse(d.capture.downloads[0].blob.parts.join(""));
  assert.equal(typeof file.gen, "number", "file.gen numeric");
  assert.ok("best" in file, "file.best present");
  assert.equal(file.pop.length, 8, "file.pop is the 8-net slice");
  assert.ok("stats" in file, "file.stats present");
});

test("PRECISION: the guard keys on the mode banner, not the coev object — banner coev with coev===null still refuses named, with no download", () => {
  const d = makeDemo(20260930);
  assert.equal(d.coev, null, "precondition: no C1 object exists");
  d.$mode.value = "coev"; // flip only the dropdown, never train
  d.$save.onclick();
  assert.equal(d.capture.downloads.length, 0, "banner coev + null coev: still no download");
  assert.ok(d.receiptLog.some((r) => r.kind === "SAVE/COEV-EMPTY"),
    "the empty-state refusal is named (SAVE/COEV-EMPTY since R67)");
  assert.ok(!d.receiptLog.some((r) => r.kind === "SAVE"));
});
