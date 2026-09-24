// Round 6 pin — the LLM-seam BROWSER glue, driven headlessly by extracting the
// exact expressions from the shipped index.html (not a copy — the shipped
// code). Rounds 4+5 receipted P1: the seam stamps the gameId tag at reply
// ARRIVAL, not at ask — a reply meant for a dead game is rebranded with the
// successor's id and applied to a game that never asked (repro: r6-repro-gameid.js,
// confirmed three consecutive rounds). This test drives ensureSeam/maybeFireSeam/
// takeAdvice verbatim and pins the contract: the asking gameId is captured at
// fire time, echoed at arrival, and a stale reply is dropped, never applied.
// Against the Round-5 page it must FAIL (stale advice applied); against the
// Round-6 fix it must PASS.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

// Extract the verbatim seam glue: from the seam state declaration through
// takeAdvice. Line-anchored: if the page is restructured so any anchor
// vanishes, the extraction fails LOUDLY (not silently).
function extractGlue() {
  const lines = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8").split("\n");
  const startIdx = lines.findIndex((l) => l.startsWith("let llmSeam=null"));
  const takeIdx = lines.findIndex((l) => l.startsWith("function takeAdvice()"));
  assert.ok(startIdx >= 0, "index.html must declare the seam state (let llmSeam=null...)");
  assert.ok(takeIdx > startIdx, "index.html must define takeAdvice after the seam glue");
  return lines.slice(startIdx, takeIdx + 4).join("\n"); // takeAdvice is a 4-line function
}

// MoveSuggestion validator, verbatim contract from the page (defined above the
// seam section; the glue references it, the harness provides it).
const MoveSuggestion = {
  type: "{move:-1|0|1, confidence:0..1, source:string}",
  validate(s) {
    if (!s || typeof s !== "object") return "not an object";
    if (![-1, 0, 1].includes(s.move)) return "move must be -1|0|1";
    if (typeof s.confidence !== "number" || s.confidence < 0 || s.confidence > 1) return "confidence must be 0..1";
    return null;
  },
};

function makeDemo() {
  const els = {
    l2: { value: "llm" }, ep: { value: "http://endpoint.local" }, key: { value: "k" },
    l2stat: { textContent: "", className: "" }, l2w: { value: "1" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const receiptLog = [];
  const receipt = (...a) => receiptLog.push(a);
  // fetch stub: captures the resolve/reject so the harness controls delivery
  let gate = null;
  const fetch = () => new Promise((res, rej) => { gate = { res, rej }; });
  const factory = new Function("PQ", "$", "receipt", "receiptLog", "MoveSuggestion", "fetch", "els",
    "let gameId=0;" +
    extractGlue() +
    "return {ensureSeam,maybeFireSeam,takeAdvice," +
    "get gameId(){return gameId}," +
    "die(){deathJustNow=true;gameId++;}," +
    "get pendingAdvice(){return pendingAdvice}," +
    "get askGameSize(){return askGame.size}," +
    "els,receiptLog};");
  const demo = factory(PQ, $, receipt, receiptLog, MoveSuggestion, fetch, els);
  const g = { x: 0.5, y: 0.5, vx: 1, vy: 1, px: 0.5, frames: 0, hits: 0, speedMul: 1 };
  const settle = () => new Promise((r) => setImmediate(() => setImmediate(r))); // let the seam's promise chain land
  return {
    demo, g, els, receiptLog,
    ask: async () => { demo.maybeFireSeam(g); await settle(); }, // flush a tick so the seam's transport actually invokes fetch
    deliver: async (advice) => { gate.res({ json: () => Promise.resolve({ choices: [{ message: { content: JSON.stringify(advice) } }] }) }); await settle(); },
    fail: async (msg) => { gate.rej(new Error(msg)); await settle(); },
  };
}

test("extraction integrity: the shipped page still carries the seam-glue anchors", () => {
  const glue = extractGlue();
  for (const anchor of ["ensureSeam", "maybeFireSeam", "takeAdvice", "PQ.makeSeam", "pendingAdvice"])
    assert.ok(glue.includes(anchor), `seam glue must reference ${anchor}`);
});

test("STALE reply from a dead game is dropped, never applied (Round 6 fix for the R4/R5 P1)", async () => {
  const h = makeDemo();
  await h.ask();                                   // game 0 asks (seq 1)
  assert.equal(h.demo.gameId, 0);
  h.demo.die();                              // game 0 dies -> gameId 1
  assert.equal(h.demo.gameId, 1);
  await h.deliver({ move: 0, confidence: 0.9 }); // game 0's held reply lands now
  const got = h.demo.takeAdvice();           // must be dropped: game 1 never asked
  assert.equal(got, null, "a reply game 1 never asked must not be consumed as game-1 advice");
  assert.equal(h.demo.pendingAdvice, null, "the stale pendingAdvice must be cleared by the drop");
});

test("FRESH reply for the live game is applied (no regression on the happy path)", async () => {
  const h = makeDemo();
  await h.ask();                                   // game 1 asks
  await h.deliver({ move: -1, confidence: 0.8 }); // reply lands while game 1 lives
  const got = h.demo.takeAdvice();
  assert.deepEqual(got, { move: -1, confidence: 0.8 }, "live-game advice flows to the paddle");
  assert.equal(h.demo.pendingAdvice, null, "consumed advice clears the slot");
});

test("the ask-map is cleaned on delivery AND on error (no unbounded growth)", async () => {
  const h = makeDemo();
  await h.ask();
  assert.equal(h.demo.askGameSize, 1, "one in-flight ask is recorded");
  await h.deliver({ move: 1, confidence: 0.5 });
  assert.equal(h.demo.askGameSize, 0, "delivery consumes the ask record");
  const h2 = makeDemo(); // fresh demo: the seam's 2s pacing would refuse a second immediate fire
  await h2.ask();
  assert.equal(h2.demo.askGameSize, 1);
  await h2.fail("endpoint 500");
  assert.equal(h2.demo.askGameSize, 0, "the error path also frees the ask record");
  assert.match(h2.els.l2stat.textContent, /LLM call failed/, "the failure is surfaced, not hidden");
});
