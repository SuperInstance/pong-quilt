// Round 73 pin — the franken-save guard + its NAMED refusal receipt
// (R72 spec items 1+5, shipped as the mandated pair: guard WITHOUT the named
// refusal is the R64-class half-fix R72's reflection warned against).
//
// The wound, verbatim-carried from R64 P4 through R72 (8th spec carrying):
// continueGenC writes the SHARED gen/champNet slots (R47 sync), so a C1-trained
// player who flips the dropdown back to classic saves a file claiming
// gen === coev.genC with best === sChamp.net (identity) paired with the
// UNTOUCHED classic pop — three lineages in one receipt, the R56 P3/R59 M1
// class reborn in the classic writer.
//
// The fix is form (b) from the R73 mandate: the classic save refuses whenever
// `coev && coev.genC>0 && gen===coev.genC` regardless of banner, and the
// refusal is a NAMED receipt kind (SAVE/FRANKEN-REFUSED) whose gen column
// records the genC it refused. A guard that silently returns would be the
// half-fix; a bare SAVE refusal would read like an error, not an audit.
//
// FAIL-first (recorded on the pristine r72 tip, one run):
//   T1 FRANKEN-REFUSAL  — RED: download happens, receipt kind SAVE, no refusal
//   T2 CLASSIC-ONLY      — GREEN by design (its FAIL direction is a guard that
//                          fires without a C1 lane — the always-on regression)
//   T3 COEV-BANNER       — GREEN by design (guard must not leak into the coev
//                          branch; its FAIL direction is SAVE/COEV-REFUSED)
//   T4 BOUNDARY ESCAPE   — GREEN by design (its FAIL direction is a guard
//                          widened past the exact collision — e.g. refusing
//                          after classic training has honestly diverged)
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
  const receipt = (kind, move, conf, laneGen) => receiptLog.push({ kind, move, conf, laneGen });
  const renderReceipts = () => {};
  const capture = { downloads: [], blobs: 0 };
  const BlobShim = class { constructor(parts, opts) { capture.blobs++; this.parts = parts; this.type = opts && opts.type; } };
  const URLShim = { createObjectURL: () => "blob:mock" };
  const documentShim = { createElement: () => { const el = { click() { el.blob = demo.__lastBlob; capture.downloads.push(el); } }; return el; } };
  const src = [
    extract("function startGen(){", "eliteK:D.elites});}"),
    extract("function continueGen(){", "evalGen=null;}}"),
    extract("function startGenC(){", "eliteK:D.elites});}"),
    extract("function continueGenC(){", "coev.evalS=null;coev.evalE=null;}}"),
    extract('$(\"save\").onclick', 'receipt(\"SAVE\",0,1);};'),
  ].join("\n");
  const factory = new Function("window", "alert", "PQ", "D", "$", "receipt", "renderReceipts", "randPQ", "Blob", "URL", "document", "capture", "receiptLog", "running", "deathJustNow", "l2Suggest", "blend",
    "let champNet=null,champGame=null,gameId=0,gen=0,games=0,pop=Array.from({length:96},()=>PQ.makeNet(randPQ)),evalGen=null,lastSnap=null,champRing=PQ.makeRing(4),coev=null;" +
    src +
    "\nreturn {startGen,continueGen,startGenC,continueGenC,$save:$('save'),$mode:$('mode'),$pop:$('pop'),get coev(){return coev},get gen(){return gen},get champNet(){return champNet},get pop(){return pop},get receiptLog(){return receiptLog},get capture(){return capture}};");
  const demo = factory({}, (m) => { throw new Error("alert:" + m); }, PQ, PQ.DEFAULTS, $, receipt, renderReceipts, PQ.rng(seed), BlobShim, URLShim, documentShim, capture, receiptLog, true, false,
    () => Promise.resolve(null), (a) => a);
  URLShim.createObjectURL = (blob) => { demo.__lastBlob = blob; return "blob:mock"; };
  return demo;
}

function breedOneCoevGen(d) {
  d.startGenC();
  const pre = d.coev.genC;
  for (let k = 0; k < 24 && d.coev.genC === pre; k++) d.continueGenC();
  if (d.coev.genC === pre) throw new Error("C1 generation did not complete in 24 drives");
}

function breedOneClassicGen(d) {
  d.startGen();
  const pre = d.gen;
  for (let k = 0; k < 64 && d.gen === pre; k++) d.continueGen();
  if (d.gen === pre) throw new Error("classic generation did not complete in 64 drives");
}

test("T1 FRANKEN-REFUSAL: breed C1, flip dropdown to classic, save -> NO download, named SAVE/FRANKEN-REFUSED receipt recording the genC it refused (R73 spec verify)", () => {
  const d = makeDemo(20261002);
  d.$mode.value = "coev";
  breedOneCoevGen(d);
  const genC = d.coev.genC;
  assert.ok(genC > 0 && d.gen === genC, `precondition: shared-slot collision (gen ${d.gen} === genC ${genC})`);
  const prePop = d.pop.map(PQ.netId); // the untouched classic lane
  d.$mode.value = "classic"; // the player flips the banner back
  d.$save.onclick();
  assert.equal(d.capture.downloads.length, 0, "the franken file must never download");
  const ref = d.receiptLog.filter((r) => r.kind === "SAVE/FRANKEN-REFUSED");
  assert.equal(ref.length, 1, `exactly one named refusal, got ${JSON.stringify(d.receiptLog.map((r) => r.kind))}`);
  assert.equal(ref[0].laneGen, genC, "the refusal names the genC collision it refused — provenance, not vibes");
  assert.ok(!d.receiptLog.some((r) => r.kind === "SAVE"), "a bare SAVE receipt would mean the classic writer shipped the franken file anyway");
  assert.deepEqual(d.pop.map(PQ.netId), prePop, "zero state change: the refusal touches neither lane");
  assert.equal(d.coev.genC, genC, "the C1 lane is untouched by the refused save");
  assert.equal(d.gen, genC, "the classic slot is untouched by the refused save");
});

test("T2 CLASSIC-ONLY BYTE-UNCHANGED: no C1 lane ever touched -> classic save downloads, bare SAVE receipt, file shape exactly {gen,best,pop,stats} (R73 spec verify)", () => {
  const d = makeDemo(777);
  assert.equal(d.coev, null, "precondition: no C1 lane exists");
  breedOneClassicGen(d);
  const preGen = d.gen;
  d.$save.onclick();
  assert.equal(d.capture.downloads.length, 1, "classic-only session saves normally");
  const save = d.receiptLog.filter((r) => r.kind === "SAVE");
  assert.equal(save.length, 1, `bare SAVE receipt, got ${JSON.stringify(d.receiptLog.map((r) => r.kind))}`);
  assert.ok(!d.receiptLog.some((r) => r.kind === "SAVE/FRANKEN-REFUSED"), "no refusal without a C1 collision — the always-on guard is the regression this pins");
  const q = JSON.parse(d.capture.downloads[0].blob.parts.join(""));
  assert.deepEqual(Object.keys(q).sort(), ["best", "gen", "pop", "stats"], "file shape byte-stable: the guard added no field, dropped none");
  assert.equal(q.gen, preGen, "file.gen is the classic generation");
  assert.equal(q.pop.length, 8, "classic writer keeps its 8-net slice");
});

test("T3 COEV-BANNER ISOLATION: the guard lives ONLY in the classic branch — a coev-banner save after C1 training still writes SAVE/COEV with its download", () => {
  const d = makeDemo(20261002);
  d.$mode.value = "coev";
  breedOneCoevGen(d);
  const genC = d.coev.genC;
  d.$save.onclick(); // mode still coev — the collision exists but the banner is honest
  assert.equal(d.capture.downloads.length, 1, "coev-banner save downloads");
  assert.ok(d.receiptLog.some((r) => r.kind === "SAVE/COEV"), `SAVE/COEV receipt, got ${JSON.stringify(d.receiptLog.map((r) => r.kind))}`);
  assert.ok(!d.receiptLog.some((r) => r.kind === "SAVE/FRANKEN-REFUSED"), "guard must not leak into the coev branch");
  const q = JSON.parse(d.capture.downloads[0].blob.parts.join(""));
  assert.equal(q.genC, genC, "the kept file names its genC");
  assert.equal(q.kind, "pong-quilt/coev@v1", "one lane per file (R67 shape intact)");
});

test("T4 BOUNDARY ESCAPE: after the refusal, honestly training the classic lane (gen diverges past the collision) saves normally — the guard is the exact collision, no wider", () => {
  const d = makeDemo(20261002);
  d.$mode.value = "coev";
  breedOneCoevGen(d);
  const genC = d.coev.genC;
  d.$mode.value = "classic";
  d.$save.onclick();
  assert.equal(d.capture.downloads.length, 0, "first save refused at the collision");
  breedOneClassicGen(d); // the player trains on — the classic lane now has its own generation
  assert.ok(d.gen > genC, `classic gen (${d.gen}) honestly diverged past genC (${genC})`);
  d.$save.onclick();
  assert.equal(d.capture.downloads.length, 1, "the diverged classic lane saves normally — the guard is collision-exact");
  assert.ok(d.receiptLog.some((r) => r.kind === "SAVE/FRANKEN-REFUSED"), "the earlier refusal stays receipted (audit trail)");
  assert.ok(d.receiptLog.some((r) => r.kind === "SAVE"), "the later honest save receipts SAVE");
  const q = JSON.parse(d.capture.downloads[0].blob.parts.join(""));
  assert.equal(q.gen, d.gen, "file.gen is the diverged classic generation");
  assert.ok(q.best && q.best.w1, "the classic champion's own weights — no sChamp identity pairing");
});
