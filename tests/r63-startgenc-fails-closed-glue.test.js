// Round 63 pin — startGenC must fails-CLOSED on a half-built coev state.
// R63 builder item: the R60 fix (tests/r60-startgenc-fails-closed-glue.test.js
// on the unmerged playtest-round-60 branch) RELANDED after R61+R62 merged
// without it — R61's "merge-or-reland" window closed, this is the reland.
// Present-tense evidence measured by running the R63 scientist driver against
// pristine main 9f03372 (verbatim startGenC, seeded rand):
//   coev = {sChamp:null,eChamp:null,genC:0}  →  startGenC()
//     throws TypeError: Cannot read properties of undefined (reading 'length')
// at coev.popS.length — INSIDE the rAF tick, killing the whole page loop, not
// just the C1 lane. loadCoev masks the class today by always seeding pops
// (R53); the guard is load-bearing for any future loader or hand-built file.
// The fix (R60 design, verbatim): materialize the missing populations at
// slider size whenever coev is absent OR either population is missing,
// preserving existing sChamp/eChamp/genC/last/ledger (Object.assign).
// FAIL-first: test 1 is RED on pristine main (the throw propagates);
// tests 2+3 are GREEN before and after (fresh-state shape + loadCoev journey).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

function extractStartGenC() {
  const lines = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8").split("\n");
  const s = lines.findIndex((l) => l.startsWith("function startGenC(){"));
  if (s < 0) throw new Error("startGenC missing from index.html");
  let e = s;
  while (e < lines.length && !lines[e].includes("eliteK:D.elites});}")) e++;
  if (e >= lines.length) throw new Error("no end marker for startGenC");
  return lines.slice(s, e + 1).join("\n");
}

function makeDemo(seed) {
  const els = {
    stats: { textContent: "" }, mode: { value: "classic" }, pop: { value: "96" },
    sub: { value: "1" }, sig: { value: "10" }, dec: { value: "4" }, receipts: { textContent: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const receiptLog = [];
  const src = extractStartGenC();
  const factory = new Function("window", "alert", "PQ", "D", "$", "randPQ", "receiptLog",
    "let coev=null,games=0;" +
    "const receipt=(k,m,c)=>receiptLog.push({kind:k,move:m,conf:c});" +
    src +
    ";return {get coev(){return coev},set coev(v){coev=v},startGenC,$}");
  return factory({}, (m) => { throw new Error("alert:" + m); }, PQ, PQ.DEFAULTS, $, PQ.rng(seed), receiptLog);
}

test("GLUE: a half-built coev state (champs, no pops) fails CLOSED — startGenC materializes both populations at slider size instead of throwing", () => {
  const d = makeDemo(20260929);
  const champ = PQ.makeNet(PQ.rng(1));
  const eChampNet = PQ.makeNet(PQ.rng(2));
  d.coev = { sChamp: { net: champ }, eChamp: { net: eChampNet }, genC: 5 };
  let err = null;
  try { d.startGenC(); } catch (e) { err = e.message; }
  assert.equal(err, null, `startGenC threw on a partial state: ${err}`);
  assert.equal(d.coev.popS.length, 96, "popS materialized at slider size");
  assert.equal(d.coev.popE.length, 96, "popE materialized at slider size");
  assert.equal(d.coev.genC, 5, "existing genC preserved, not reset");
  assert.equal(PQ.netId(d.coev.sChamp.net), PQ.netId(champ), "sChamp preserved");
  assert.equal(PQ.netId(d.coev.eChamp.net), PQ.netId(eChampNet), "eChamp preserved");
  assert.ok(d.coev.evalS && d.coev.evalE, "evaluators built on the materialized state");
});

test("REGRESSION: the fresh !coev path is shape-unchanged — null champs, genC 0, slider-sized pops", () => {
  const d = makeDemo(20260929);
  d.startGenC();
  assert.equal(d.coev.popS.length, 96);
  assert.equal(d.coev.popE.length, 96);
  assert.equal(d.coev.sChamp, null);
  assert.equal(d.coev.eChamp, null);
  assert.equal(d.coev.genC, 0);
  assert.ok(d.coev.ledger && typeof d.coev.ledger.write === "function", "ledger present for continueGenC");
});

test("NO-REGRESSION: the loadCoev-shaped state (pops + champs + ledger) sails through untouched — lengths pinned, champs kept", () => {
  const d = makeDemo(20260929);
  const champ = PQ.makeNet(PQ.rng(3));
  const eChampNet = PQ.makeNet(PQ.rng(4));
  d.coev = {
    popS: Array.from({ length: 96 }, () => PQ.makeNet(PQ.rng(5))),
    popE: Array.from({ length: 96 }, () => PQ.makeNet(PQ.rng(6))),
    sChamp: { net: champ }, eChamp: { net: eChampNet }, genC: 120, last: "ENDER-KILL",
    ledger: PQ.makeLedger(300), evalS: null, evalE: null,
  };
  const sChampBefore = d.coev.sChamp;
  d.startGenC();
  assert.equal(d.coev.popS.length, 96, "popS not regrown when present");
  assert.equal(d.coev.popE.length, 96, "popE not regrown when present");
  assert.equal(d.coev.sChamp, sChampBefore, "champ object identity kept (no reseed)");
  assert.equal(d.coev.genC, 120, "genC untouched");
  assert.ok(d.coev.evalS && d.coev.evalE, "evaluators rebuilt");
});
