// Round 53 pin — the R49 P1 that survived four rounds: loadCoev() -> Train
// freezes the page. R49 playtested it (loadCoev leaves `coev` truthy but
// popS/popE undefined; startGenC's `if(!coev)` guard is bypassed; the first
// `coev.popS.length` read throws INSIDE the rAF tick, so the loop is dead —
// reload-only recovery). R49/R50/R51/R52 all shipped without the fix; the
// suite had no pin that TRAINED after loading the artifact, so the lie lived
// in the shipped-artifact lane while the docs lane got repairs.
// This file drives the exact user journey (loadCoev -> Train) through the
// verbatim shipped functions, headlessly, and pins: no throw, populations
// materialized at slider size, the ledger ADVANCES past the artifact's genC.
// FAIL-first: against main 9b27d15 assertion 1 fails with
//   TypeError: Cannot read properties of undefined (reading 'length')
// after the fix the whole file passes.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

global.window = {};
require("../checkpoints/coev.js");
const ARTIFACT = global.window.PONG_QUILT_COEV;
delete global.window;

function extract(fnStart, endMarker) {
  const lines = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8").split("\n");
  const s = lines.findIndex((l) => l.startsWith(fnStart));
  assert.ok(s >= 0, `index.html must define ${fnStart}`);
  let e = s;
  while (e < lines.length && !lines[e].includes(endMarker)) e++;
  assert.ok(e < lines.length, `${fnStart} must contain its end marker`);
  return lines.slice(s, e + 1).join("\n");
}

const SRC = {
  loadCoev: extract("function loadCoev(){", 'receipt("LOAD/COEV",0,1);}'),
  startGenC: extract("function startGenC(){", "enderHits:r.enderHits}"),
  continueGenC: extract("function continueGenC(){", "coev.evalE=null;}}"),
};

function makeDemo() {
  const els = {
    stats: { textContent: "" }, mode: { value: "coev" }, pop: { value: "32" },
    sub: { value: "1" }, sig: { value: "10" }, dec: { value: "4" },
    receipts: { textContent: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const factory = new Function("window", "alert", "PQ", "D", "$", "receipt", "randPQ", "requestAnimationFrame", "renderReceipts", "els",
    "let champNet=null,champGame=null,gameId=0,coev=null,gen=0,games=0,pop=[],evalGen=null,lastSnap=null,champRing=PQ.makeRing(4);" +
    SRC.loadCoev + "\n" + SRC.startGenC + "\n" + SRC.continueGenC + "\n" +
    "return {loadCoev,continueGenC,get coev(){return coev},els};");
  return factory({ PONG_QUILT_COEV: ARTIFACT }, (m) => { throw new Error("alert: " + m); },
    PQ, PQ.DEFAULTS, $, () => {}, PQ.rng(20260928), () => {}, () => {}, els);
}

test("R49 P1 repro pinned: loadCoev() -> Train does not throw", () => {
  const d = makeDemo();
  d.loadCoev();
  assert.doesNotThrow(() => d.continueGenC(),
    "Train after loadCoev() must not throw (pre-fix: TypeError on coev.popS.length kills the rAF loop)");
});

test("populations materialized at slider size right after loadCoev", () => {
  const d = makeDemo();
  d.loadCoev();
  assert.equal(d.coev.popS.length, 32, "popS seeded at slider size");
  assert.equal(d.coev.popE.length, 32, "popE seeded at slider size");
  assert.ok(d.coev.popS.every((n) => n && n.w1 && n.w2 && n.b1 && n.b2), "seeded popS entries are real nets");
  assert.ok(d.coev.popE.every((n) => n && n.w1 && n.w2 && n.b1 && n.b2), "seeded popE entries are real nets");
});

test("training actually continues: genC advances past the artifact", () => {
  const d = makeDemo();
  d.loadCoev();
  d.continueGenC();
  assert.equal(d.coev.genC, ARTIFACT.gens + 1,
    `genC must advance from the artifact's ${ARTIFACT.gens} to ${ARTIFACT.gens + 1}`);
});

test("ledger grows: one new receipted row on top of the re-chained tail", () => {
  const d = makeDemo();
  d.loadCoev();
  const before = d.coev.ledger.items().length;
  d.continueGenC();
  const rows = d.coev.ledger.items();
  assert.equal(rows.length, before + 1, "exactly one h2h row appended");
  assert.equal(rows[rows.length - 1].gen, ARTIFACT.gens + 1, "new row carries the advanced gen");
});
