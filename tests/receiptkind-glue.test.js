// Round 11 pin — receipt-kind attribution (R11 builder item, fresh P2 found
// this round by running). The shipped l2Suggest receipt call reads
//   receipt(s.source||src==="none"?"L2":s.source||src, s.move, s.confidence*w);
// which parses as (s.source || (src === "none")) ? "L2" : (s.source || src) —
// so EVERY advisor that sets .source (jepa "jepa", moth "moth", qa "qa-sim")
// is written into the hash-chained ledger with kind "L2". The stat line above
// the panel says "jepa suggests move=…" while the ledger the demo calls its
// honesty centerpiece records "L2". One provenance column, two stories.
// This test extracts the VERBATIM shipped l2Suggest() and fires each advisor.
// Against the pre-fix page all three kinds are "L2" (FAIL); after the fix the
// ledger names the advisor (PASS).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");
const QA = require("../qa.js");

function extractL2Suggest() {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = html.indexOf("async function l2Suggest(g){");
  const marker = "if(Math.random()<s.confidence*w)return s;return null;}";
  const end = html.indexOf(marker);
  assert.ok(start > 0, "index.html must contain the l2Suggest glue");
  assert.ok(end > start, "index.html must contain the l2Suggest tail");
  return html.slice(start, end + marker.length);
}

function makeDemo(mode) {
  const els = { l2: { value: mode }, w: { value: "100" }, ep: { value: "" }, key: { value: "" }, l2stat: { textContent: "", className: "" } };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const receipts = [];
  const MoveSuggestion = {
    validate(s) {
      if (!s || typeof s.move !== "number" || s.move < -1 || s.move > 1) return "bad move";
      if (typeof s.confidence !== "number" || s.confidence < 0 || s.confidence > 1) return "bad confidence";
      return null;
    },
  };
  const jepa = PQ.makeJepa();
  // train jepa briefly so its suggestion is shape-valid
  let g = PQ.newGame(Math.random);
  for (let i = 0; i < 200; i++) { const prev = PQ.sense(g); PQ.step(g, 0, Math.random); jepa.learn(prev, PQ.sense(g)); }
  const stateOf = (gm) => ({ ballX: gm.x, ballY: gm.y, paddleX: gm.px });
  const factory = new Function("PQ", "QuantumAudioL2", "MoveSuggestion", "jepa", "$", "stateOf", "receipt", "randPQ", "els",
    "const D=PQ.DEFAULTS;let gen=1,games=0,qaVis=null,lastAdviceAt=-1e9,deathJustNow=false;" +
    "let llmSeam=null,pendingAdvice=null;" +
    "function takeAdvice(){return null;} function maybeFireSeam(){} " +
    extractL2Suggest() +
    "return {l2Suggest,els,receipts:()=>receipts};");
  const receipt = (kind, move, conf) => receipts.push({ kind, move, conf });
  const demo = factory(PQ, QA, MoveSuggestion, jepa, $, stateOf, receipt, Math.random, els);
  demo._receipts = receipts;
  return demo;
}

async function fireUntilReceipt(demo, game) {
  for (let i = 0; i < 400 && demo._receipts.length === 0; i++) await demo.l2Suggest(game);
  return demo._receipts[0] || null;
}

test("ATTRIBUTION: a jepa suggestion is receipted as kind 'jepa', not 'L2'", async () => {
  const demo = makeDemo("jepa");
  const row = await fireUntilReceipt(demo, { x: 0.5, y: 0.5, vx: 0.01, vy: 0.02, px: 0.5 });
  assert.ok(row, "jepa must fire at least one receipt in 400 frames at weight 1.0");
  assert.equal(row.kind, "jepa",
    `ledger kind is "${row.kind}" — the stat line says "jepa suggests" but the hash-chained ledger records "${row.kind}"`);
});

test("ATTRIBUTION: a moth suggestion is receipted as kind 'moth', not 'L2'", async () => {
  const demo = makeDemo("moth");
  const row = await fireUntilReceipt(demo, { x: 0.5, y: 0.5, vx: 0.01, vy: 0.02, px: 0.5 });
  assert.ok(row, "moth must fire at least one receipt in 400 frames at weight 1.0 (confidence 0.8)");
  assert.equal(row.kind, "moth",
    `ledger kind is "${row.kind}" — the stat line says "moth suggests" but the hash-chained ledger records "${row.kind}"`);
});

test("ATTRIBUTION: a qa-sim suggestion is receipted as kind 'qa-sim', not 'L2'", async () => {
  const demo = makeDemo("qa");
  const row = await fireUntilReceipt(demo, { x: 0.5, y: 0.5, vx: 0.01, vy: 0.02, px: 0.5 });
  assert.ok(row, "qa-sim must fire at least one receipt in 400 frames at weight 1.0");
  assert.equal(row.kind, "qa-sim",
    `ledger kind is "${row.kind}" — the stat line says "qa-sim suggests" but the hash-chained ledger records "${row.kind}"`);
});

test("FALLBACK: no source anywhere -> kind 'L2' (the documented fallback, still honored)", async () => {
  // a custom module that returns a valid suggestion WITHOUT a source field
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = html.indexOf("async function l2Suggest(g){");
  const marker = "if(Math.random()<s.confidence*w)return s;return null;}";
  const end = html.indexOf(marker);
  const fn = html.slice(start, end + marker.length);
  const l2Mod = { name: "anon", suggest: () => ({ move: 0, confidence: 1 }) }; // no source
  const els = { l2: { value: "custom" }, w: { value: "100" }, l2stat: { textContent: "", className: "" } };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const receipts = [];
  const MoveSuggestion = { validate: () => null };
  const stateOf = (gm) => ({ ballX: gm.x, paddleY: gm.px });
  const factory = new Function("PQ", "QuantumAudioL2", "MoveSuggestion", "l2Mod", "$", "stateOf", "receipt", "randPQ", "jepa",
    "const D=PQ.DEFAULTS;let gen=1,games=0,qaVis=null,lastAdviceAt=-1e9,deathJustNow=false;" +
    "let llmSeam=null,pendingAdvice=null;" +
    "function takeAdvice(){return null;} function maybeFireSeam(){} " +
    fn +
    "return {l2Suggest};");
  const demo = factory(PQ, QA, MoveSuggestion, l2Mod, $, stateOf, (k, m, c) => receipts.push({ kind: k }), Math.random, PQ.makeJepa());
  const game = { x: 0.5, y: 0.5, vx: 0.01, vy: 0.02, px: 0.5 };
  for (let i = 0; i < 10 && receipts.length === 0; i++) await demo.l2Suggest(game);
  assert.ok(receipts.length > 0, "source-less custom suggestion must still receipt");
  assert.equal(receipts[0].kind, "anon", "source-less suggestion falls back to the module name (src), not a bare 'L2'");
});
