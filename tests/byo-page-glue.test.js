// Round 16 spec item 5 — page-side BYO endpoint field wiring (the honest flag
// on PR #22: "page-side endpoint field NOT wired"). qa.js suggestByo() shipped
// with the R16 item-4 seam, but the page had no path to it: the qa branch
// called the labeled sim directly, so a real QPAM backend could never be
// plugged in from the UI, and the degrade/fallback contract was page-dead.
// Build (this round): (1) the pot control row gains a BYO endpoint input
// (empty = labeled sim, zero network — the seam ships closed by default);
// (2) maybeFireQaByo/takeQaByo pace the calls exactly like the LLM seam
// (death OR every ADVICE_EVERY frames, one in flight, gameId-tagged — a dead
// game's reply is dropped, not applied); (3) qaSuggest() consumes the reply:
// a real suggestion is named 'byo-qpam' and is NOT sim-capped; a degraded one
// receipts 'byo-qpam-fallback' and its advice is NAMED for the stand-in
// ('qa-sim') — fallback advice never launders into the byo-qpam ledger kind.
// FAIL-first: against the R16 item-4 tip (no qabyoep, no qaSuggest) every
// test here fails on extraction; the re-anchored qapot/qarefusal/receiptkind
// pins prove the sim path is behavior-identical.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");
const QA = require("../qa.js");

function extractQaSeam() {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = html.indexOf("// === qa BYO seam");
  const marker = "if(Math.random()<s.confidence*w)return s;return null;}";
  const end = html.indexOf(marker);
  assert.ok(start > 0, "index.html must contain the qa BYO seam block (maybeFireQaByo/takeQaByo/qaSuggest)");
  assert.ok(end > start, "index.html must contain the l2Suggest tail");
  const src = html.slice(start, end + marker.length);
  assert.ok(src.includes("async function l2Suggest(g){"), "the slice must include l2Suggest itself");
  assert.ok(src.includes('else if(m==="qa"){const r=qaSuggest(g);'),
    'the shipped l2Suggest qa branch must delegate to qaSuggest() — the pre-wiring page called the sim directly');
  return src;
}

function makeDemo({ endpoint = "", byoResult = null } = {}) {
  const els = {
    l2: { value: "qa" }, w: { value: "100" }, qapot: { value: "32" },
    qabyoep: { value: endpoint }, l2stat: { textContent: "", className: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const receipts = [];
  let byoCalls = 0;
  const byoQA = Object.assign({}, QA, {
    suggestByo: async (...args) => { byoCalls++; return byoResult; },
  });
  const MoveSuggestion = { validate: () => null };
  const stateOf = (gm) => ({ ballX: gm.x, paddleX: gm.px, speed: 1 });
  const factory = new Function("PQ", "QuantumAudioL2", "MoveSuggestion", "jepa", "$", "stateOf", "receipt", "randPQ",
    "const D=PQ.DEFAULTS;let gen=1,games=0,qaVis=null,lastAdviceAt=-1e9,deathJustNow=false,gameId=1;const ADVICE_EVERY=150;" +
    "let llmSeam=null,pendingAdvice=null;" +
    "function takeAdvice(){return null;} function maybeFireSeam(){} " +
    extractQaSeam() +
    "return {l2Suggest, bump:()=>{gameId++;}};");
  const demo = factory(PQ, byoQA, MoveSuggestion, PQ.makeJepa(), $, stateOf,
    (k, m, c) => receipts.push({ kind: k, conf: c }), Math.random);
  demo._receipts = receipts;
  demo._els = els;
  demo._byoCalls = () => byoCalls;
  return demo;
}

test("MARKUP: the BYO endpoint input ships in the pot row, seam closed by default", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  assert.ok(/<input id="qabyoep"/.test(html),
    "the page must ship a BYO QPAM endpoint input — the pre-wiring page had no UI path to suggestByo");
  assert.ok(/empty = labeled sim/.test(html),
    "the empty default must be documented at the control: the seam ships closed (zero network)");
});

test("GLUE: empty endpoint — suggestByo is NEVER called, sim path untouched", async () => {
  const demo = makeDemo({ endpoint: "" });
  const game = { x: 0.1, y: 0.5, vx: 0.01, vy: 0.02, px: 0.7, frames: 1000 };
  for (let i = 0; i < 5; i++) await demo.l2Suggest(game);
  assert.equal(demo._byoCalls(), 0, "no endpoint configured → the seam must stay closed; the labeled sim stands alone");
  assert.ok(demo._receipts.some((r) => r.kind === "qa-sim"),
    "the sim must still advise and receipt normally with no endpoint");
});

test("GLUE: real backend reply passes through as 'byo-qpam', not sim-capped", async () => {
  const demo = makeDemo({
    endpoint: "https://qpam.example.test/",
    byoResult: { suggestion: { move: 1, confidence: 0.97, source: "byo-qpam" }, kind: "byo-qpam", reason: null, degraded: false },
  });
  const game = { x: 0.1, y: 0.5, vx: 0.01, vy: 0.02, px: 0.7 };
  await demo.l2Suggest({ ...game, frames: 1000 }); // frame 1: fires the BYO call (paced seam)
  await new Promise((r) => setImmediate(r)); // flush the suggestByo microtask chain
  const s = await demo.l2Suggest({ ...game, frames: 1000 }); // frame 2: consumes the pending reply
  assert.ok(demo._byoCalls() >= 1, "a filled endpoint must fire the BYO call on the paced seam");
  assert.ok(demo._receipts.some((r) => r.kind === "byo-qpam"),
    "the real backend's suggestion must be receipted to the ledger (paddle application is the weight-blend's stochastic draw, not the honesty surface)");
  assert.equal(demo._receipts[demo._receipts.length - 1].kind, "byo-qpam",
    "the ledger must name the real backend on the consumption frame, not the stand-in");
  const byoRow = demo._receipts.find((r) => r.kind === "byo-qpam");
  assert.ok(byoRow.conf > QA.SIM_MAX_CONF, `a REAL backend is not sim-capped at ${QA.SIM_MAX_CONF} — only the stand-in is (got conf ${byoRow.conf})`);
});

test("GLUE: degraded reply receipts 'byo-qpam-fallback' and its advice is NAMED 'qa-sim'", async () => {
  const demo = makeDemo({
    endpoint: "https://qpam.example.test/",
    byoResult: { suggestion: { move: -1, confidence: 0.4, source: "qa-sim" }, kind: "byo-qpam-fallback", reason: "fetch-failure", degraded: true },
  });
  const game = { x: 0.1, y: 0.5, vx: 0.01, vy: 0.02, px: 0.7 };
  await demo.l2Suggest({ ...game, frames: 1000 });
  await new Promise((r) => setImmediate(r));
  const s = await demo.l2Suggest({ ...game, frames: 1000 });
  assert.ok(demo._receipts.some((r) => r.kind === "byo-qpam-fallback"),
    "the fallback must be receipted by name — never silent");
  assert.equal(demo._receipts[demo._receipts.length - 1].kind, "qa-sim",
    "fallback advice is the stand-in's — the ledger kind must say 'qa-sim', never laundered as 'byo-qpam'");
  assert.match(demo._els.l2stat.textContent, /degraded to the labeled sim/,
    `the stat line must admit the degrade — got "${demo._els.l2stat.textContent}"`);
});

test("GLUE: a stale reply (dead game) is dropped, never applied to its successor", async () => {
  const demo = makeDemo({
    endpoint: "https://qpam.example.test/",
    byoResult: { suggestion: { move: 1, confidence: 0.9, source: "byo-qpam" }, kind: "byo-qpam", reason: null, degraded: false },
  });
  const game = { x: 0.1, y: 0.5, vx: 0.01, vy: 0.02, px: 0.7 };
  await demo.l2Suggest({ ...game, frames: 1000 }); // game 1 fires the BYO call
  await new Promise((r) => setImmediate(r));
  demo.bump(); // the asking game dies; its successor gets a fresh gameId
  await demo.l2Suggest({ ...game, frames: 1000 });
  assert.ok(demo._byoCalls() >= 1, "the BYO call must have fired for game 1");
  assert.ok(demo._receipts.every((r) => r.kind !== "byo-qpam"),
    "the dead game's reply must be dropped by takeQaByo's gameId check — never applied, never rebranded onto the successor's ledger (paddle silence here is the drop, not the blend's stochastic draw)");
});
