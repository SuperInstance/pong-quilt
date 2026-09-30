// Round 67 pin — the coev-quilt writer (R66 spec item 2, 2nd carrying): a C1
// player can finally KEEP their work. Supersedes the R64 SAVE/COEV-UNSTABLE
// bridge (which remains only for the empty-C1 state, receipt SAVE/COEV-EMPTY).
// Wound carried verbatim from R64/R66: in C1 mode SAVE refused named — an
// honest bridge, not an endgame; a trained C1 session was unkeepable, and the
// only file door ($("load")) would silently absorb a coev-shaped file into the
// CLASSIC splice (pop.concat(undefined) → a 97th undefined entry, gen 0,
// champNet=pop[0] — lineage fields asserting nothing the weights carry).
// The fix (R67): (a) the coev banner writes ONE-lane file
// {kind:"pong-quilt/coev@v1", genC, sChamp, eChamp, popS, popE, last, ledger}
// — no classic gen/best/pop field can disagree with the weights (the
// franken-quilt class, R56 P3/R59 M1/R63 M2, is dead by construction);
// (b) the load input routes coev files into the C1 lane VERBATIM (the file's
// populations restore exactly — keeping your work means THIS population, not
// a re-seeding around the champs; that treatment is the artifact lane's,
// loadCoev); the classic splice below the routing is structurally unreachable
// for coev files — the classic loader refuses them NAMED by construction;
// (c) a coev-shaped file missing load-bearing fields is LOAD/COEV-MALFORMED,
// zero state change. (d) the round's own play found the head this file lane
// opens: a champ-less coev file (gen 0 — page-producible by saving mid-first-
// gen, when pops exist but no generation has completed) loaded over a LIVE
// classic session left champGame running with champNet=null, and live()'s
// synchronous PQ.forward(null,...) threw (verbatim repro: TypeError reading
// 'b1') before requestAnimationFrame(tick) — the R49 P1 frozen-page class.
// Fixed in the same branch: no champ means NO SERVED GAME (champGame=null).
// The named-but-unfixed classic-banner-after-C1 franken tail (R66 spec item 1,
// [M] lane tracking) stays OPEN — this [S] item does not attempt it.
// FAIL-first: T1–T3 RED on the pre-R67 tip (writer absent — T1 sees
// SAVE/COEV-UNSTABLE + zero downloads; T2 sees the classic splice absorb the
// file with no LOAD/COEV receipt; T3 sees no malformed guard). T4 RED via its
// champGame-null assertion (pristine: the classic splice keeps the old game
// alive).
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
  const URLShim = { createObjectURL: () => "blob:mock" };
  const documentShim = { createElement: () => { const el = { click() { el.blob = demo.__lastBlob; capture.downloads.push(el); } }; return el; } };
  const src = [
    extract("function startGenC(){", "eliteK:D.elites});}"),
    extract("function continueGenC(){", "coev.evalS=null;coev.evalE=null;}}"),
    extract('$(\"save\").onclick', 'receipt(\"SAVE\",0,1);};'),
    extract('$(\"load\").onchange', 'receipt(\"LOAD\",0,1);});};'),
    extract("function live(){", "PQ.newGame(randPQ);gameId++;}});}"),
  ].join("\n");
  const factory = new Function("window", "alert", "PQ", "D", "$", "receipt", "renderReceipts", "randPQ", "Blob", "URL", "document", "capture", "receiptLog", "running", "deathJustNow", "l2Suggest", "blend",
    "let champNet=null,champGame=null,gameId=0,gen=0,games=0,pop=Array.from({length:96},()=>PQ.makeNet(randPQ)),evalGen=null,lastSnap=null,champRing=PQ.makeRing(4),coev=null;" +
    src +
    "\nreturn {startGenC,continueGenC,$save:$('save'),$load:$('load'),$mode:$('mode'),$pop:$('pop'),live,forceLiveClassic(){champNet=PQ.makeNet(randPQ);champGame=PQ.newAdvGame(randPQ);},get coev(){return coev},get gen(){return gen},get champNet(){return champNet},get champGame(){return champGame},get pop(){return pop},get receiptLog(){return receiptLog},get capture(){return capture}};");
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

const netIds = (nets) => nets.map(PQ.netId);

function loadFile(d, obj) {
  d.$load.onchange({ target: { files: [{ text: () => Promise.resolve(JSON.stringify(obj)) }] } });
  return new Promise((r) => setImmediate(r)); // the handler works inside f.text().then
}

test("WRITE-LANE: a coev-mode save after C1 training writes a one-lane coev quilt — kind/genC/champs/pops/ledger, NO classic fields, SAVE/COEV receipt", () => {
  const d = makeDemo(20261001);
  d.$mode.value = "coev";
  breedOneCoevGen(d);
  const preGenC = d.coev.genC;
  const preS = netIds(d.coev.popS), preE = netIds(d.coev.popE);
  d.$save.onclick();
  assert.equal(d.capture.downloads.length, 1, "coev save produces exactly one download");
  assert.ok(d.receiptLog.some((r) => r.kind === "SAVE/COEV"), `expected SAVE/COEV receipt, got ${JSON.stringify(d.receiptLog.map((r) => r.kind))}`);
  assert.ok(!d.receiptLog.some((r) => r.kind === "SAVE/COEV-UNSTABLE"), "the R64 bridge receipt is superseded when pops exist");
  assert.ok(!d.receiptLog.some((r) => r.kind === "SAVE"), "a bare SAVE receipt would mean the classic writer ran under the coev banner");
  const q = JSON.parse(d.capture.downloads[0].blob.parts.join(""));
  assert.equal(q.kind, "pong-quilt/coev@v1", "file names its lane");
  assert.equal(q.genC, preGenC, "file.genC is the C1 generation");
  assert.equal(PQ.netId(q.sChamp.net), PQ.netId(d.coev.sChamp.net), "file.sChamp is the C1 champion");
  assert.equal(PQ.netId(q.eChamp.net), PQ.netId(d.coev.eChamp.net), "file.eChamp is the C1 ender champion");
  assert.deepEqual(netIds(q.popS), preS, "file.popS is the live population, order-preserved");
  assert.deepEqual(netIds(q.popE), preE, "file.popE is the live population, order-preserved");
  assert.ok(Array.isArray(q.ledger) && q.ledger.length >= 1, "file carries the ledger rows");
  for (const k of ["gen", "best", "pop", "stats"]) assert.ok(!(k in q), `no classic field '${k}' may exist to disagree with the weights (franken class)`);
});

test("ROUND-TRIP: the load input routes a coev file into the C1 lane VERBATIM — classic slots byte-untouched, fields identity-match, Train continues this exact population", async () => {
  const a = makeDemo(20261001);
  a.$mode.value = "coev";
  breedOneCoevGen(a);
  a.$save.onclick();
  const file = JSON.parse(a.capture.downloads[0].blob.parts.join(""));
  const b = makeDemo(777); // a different player's different session
  const bGenPre = b.gen, bPopPre = netIds(b.pop), bCoevPre = b.coev;
  await loadFile(b, file);
  assert.equal(b.gen, bGenPre, "classic gen untouched by the coev-file load (the classic splice never ran)");
  assert.deepEqual(netIds(b.pop), bPopPre, "classic population untouched — same nets, same order");
  assert.equal(b.coev === bCoevPre, false, "the C1 lane now holds state");
  assert.ok(b.receiptLog.some((r) => r.kind === "LOAD/COEV"), `expected LOAD/COEV receipt, got ${JSON.stringify(b.receiptLog.map((r) => r.kind))}`);
  assert.equal(b.$mode.value, "coev", "the lane banner follows the file — the next Trains breed C1");
  assert.equal(b.coev.genC, file.genC, "genC identity-match");
  assert.deepEqual(netIds(b.coev.popS), netIds(file.popS), "popS restored VERBATIM — this exact population, not a re-seeding");
  assert.deepEqual(netIds(b.coev.popE), netIds(file.popE), "popE restored VERBATIM");
  assert.equal(PQ.netId(b.coev.sChamp.net), PQ.netId(file.sChamp.net), "sChamp identity-match");
  assert.equal(b.coev.ledger.size, file.ledger.length >= 300 ? 300 : file.ledger.length, "ledger rows re-anchored (capacity 300)");
  assert.ok(b.champGame, "a served game exists for the loaded champion (loadCoev precedent)");
  breedOneCoevGen(b); // Train continues — the receipted player journey
  assert.equal(b.coev.genC, file.genC + 1, "one Train advances the loaded genC by exactly 1");
  assert.equal(b.coev.popS.length, 96, "slider-sized population preserved through the generation");
  assert.ok(b.coev.sChamp.net && typeof b.coev.sChamp.fitness === "number", "the continued session has a real evaluated champion");
});

test("MALFORMED + CLASSIC-UNCHANGED: a coev-shaped file missing load-bearing fields is refused named with zero state change; a classic file still loads classic", async () => {
  const d = makeDemo(20261001);
  await loadFile(d, { kind: "pong-quilt/coev@v1", genC: 5 }); // coev-shaped, no pops
  assert.ok(d.receiptLog.some((r) => r.kind === "LOAD/COEV-MALFORMED"), `expected LOAD/COEV-MALFORMED, got ${JSON.stringify(d.receiptLog.map((r) => r.kind))}`);
  assert.equal(d.coev, null, "zero state change in the C1 lane");
  assert.equal(d.gen, 0, "zero state change in the classic lane");
  assert.equal(d.pop.length, 96, "no undefined-entry splice");
  const classic = { gen: 3, pop: [PQ.makeNet(PQ.rng(1)), PQ.makeNet(PQ.rng(2))], best: null };
  classic.best = classic.pop[0];
  await loadFile(d, classic);
  assert.ok(d.receiptLog.some((r) => r.kind === "LOAD"), "classic-shaped file still receipts LOAD");
  assert.equal(d.gen, 3, "classic gen adopted");
  assert.equal(d.pop.length, 96, "classic merge-tail shape unchanged (2 file nets + kept tail)");
  assert.equal(PQ.netId(d.champNet), PQ.netId(classic.best), "classic champion reset to the file's best (R62 shape)");
});

test("GEN-0 NO-CHAMP: a champ-less coev file loaded over a live classic session clears the served game — live() must never forward a null champNet (R49 P1 frozen-page class)", async () => {
  const d = makeDemo(4242);
  d.forceLiveClassic(); // the player journey: a classic rally is alive (Go pressed)
  assert.ok(d.champGame && d.champNet, "precondition: live classic session");
  const gen0 = { kind: "pong-quilt/coev@v1", genC: 0, sChamp: null, eChamp: null,
    popS: Array.from({ length: 96 }, () => PQ.makeNet(PQ.rng(1))), popE: Array.from({ length: 96 }, () => PQ.makeNet(PQ.rng(2))), last: null, ledger: [] };
  await loadFile(d, gen0);
  assert.ok(d.receiptLog.some((r) => r.kind === "LOAD/COEV"), "the gen-0 file is a valid coev quilt (pops present)");
  assert.equal(d.champNet, null, "no champ to serve");
  assert.equal(d.champGame, null, "FIX: no champ means NO SERVED GAME — the loader must clear it");
  assert.doesNotThrow(() => d.live(), "live() with the loaded state must not throw");
});
