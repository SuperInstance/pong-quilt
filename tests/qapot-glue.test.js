// Round 13 pin — the qa exhaustion seam is PLAYABLE in-page (R12 spec item 1).
// R12 made the sim's pot floor real (qa.js) and receipted advisor-null (page),
// but under the shipped page wiring the seam was still contract-only: the page
// called suggest(s0, qseed) with the default 32 shots/bin — far above
// SIM_POT_FLOOR=2 — so no page action could ever empty the pot. The same lie
// class R12 killed at module level, one level up in the glue (verified this
// round by reading the shipped branch: no pot input existed).
// Build (this round, builder mode): (1) qa.js suggest(s, seed, shotsPerBin)
// threads the pot through to channel (default unchanged); (2) the page gains a
// pot slider (shown for the qa module) and the shipped qa branch reads it —
// depleting below the floor renders the TRUE silent channel in the tile
// (POT EMPTY overlay + flatline, not a healthy default waveform) and receipts
// QA-REFUSAL with the numbers in the stat line; (3) the tile label carries the
// live shots/bin readout so the budget is visible during normal play too.
// FAIL-first: against the R12 tip the MODULE test fails (suggest ignored the
// third arg -> advised on a 1-shot pot) and the GLUE-integrity test fails
// (the shipped branch never read qapot). UNCHANGED suite proves normal play.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");
const QA = require("../qa.js");

// --- module level: the public seam depletes ---------------------------------
test("MODULE: suggest(s, seed, shotsBelowFloor) returns null through the page's own call path", () => {
  const s = { ballX: 0.5, ballY: 0.5, velX: 0.3, velY: 0.8, paddleX: 0.4, speed: 1.2, frames: 10, hits: 1 };
  assert.equal(QA.suggest(s, 7, 1), null, "a 1-shot pot must exhaust through suggest(), not only through channel()");
  assert.equal(QA.suggest(s, 7, 0), null, "a 0 budget is the EMPTY POT — the R12 `|| 32` fallback silently re-armed it");
  assert.ok(QA.suggest(s, 7, 32), "the default pot must still advise");
  assert.ok(QA.suggest(s, 7), "omitting shotsPerBin must keep the default behavior");
});

// --- glue level: the shipped branch reads the pot and shows the truth -------
function extractL2Suggest() {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = html.indexOf("async function l2Suggest(g){");
  const marker = "if(Math.random()<s.confidence*w)return s;return null;}";
  const end = html.indexOf(marker);
  assert.ok(start > 0, "index.html must contain the l2Suggest glue");
  assert.ok(end > start, "index.html must contain the l2Suggest tail");
  const src = html.slice(start, end + marker.length);
  assert.ok(src.includes('+$("qapot").value'),
    "the shipped qa branch must read the pot control — the R12 page had no in-page path to exhaustion");
  assert.ok(src.includes("QuantumAudioL2.suggest(s0,qseed,qapot)"),
    "the pot must reach the advisor call, not just the tile visualization");
  return src;
}

function makeDemo(qapotValue) {
  const els = { l2: { value: "qa" }, w: { value: "100" }, qapot: { value: String(qapotValue) }, l2stat: { textContent: "", className: "" } };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const receipts = [];
  const MoveSuggestion = { validate: () => null };
  const stateOf = (gm) => ({ ballX: gm.x, paddleX: gm.px, speed: 1 });
  const factory = new Function("PQ", "QuantumAudioL2", "MoveSuggestion", "jepa", "$", "stateOf", "receipt", "randPQ",
    "const D=PQ.DEFAULTS;let gen=1,games=0,qaVis=null,lastAdviceAt=-1e9,deathJustNow=false;" +
    "let llmSeam=null,pendingAdvice=null;" +
    "function takeAdvice(){return null;} function maybeFireSeam(){} " +
    extractL2Suggest() +
    "return {l2Suggest, getVis:()=>qaVis};");
  const demo = factory(PQ, QA, MoveSuggestion, PQ.makeJepa(), $, stateOf,
    (k, m, c) => receipts.push({ kind: k }), Math.random);
  demo._receipts = receipts;
  demo._els = els;
  return demo;
}

test("GLUE: an emptied pot in-page receipts QA-REFUSAL and shows the silent channel", async () => {
  const demo = makeDemo(0); // slider at zero: the pot is empty
  const game = { x: 0.5, y: 0.5, vx: 0.01, vy: 0.02, px: 0.4 };
  await demo.l2Suggest(game);
  const refusal = demo._receipts.find((r) => r.kind === "QA-REFUSAL");
  assert.ok(refusal, "pot at 0 shots/bin must receipt QA-REFUSAL on the page path");
  assert.match(demo._els.l2stat.textContent, /pot 0\/bin below floor 2/,
    `the stat line must carry the numbers — got "${demo._els.l2stat.textContent}"`);
  const vis = demo.getVis();
  assert.ok(vis, "qaVis must be set even on refusal (the tile shows the truth, not a stale frame)");
  assert.ok(vis.decoded.every((v) => v === 0), "the tile's decoded waveform must be the actual silence");
  assert.equal(vis.spb, 0, "the tile must know the pot was 0");
});

test("GLUE: a healthy pot still advises and receipts qa-sim (normal play untouched)", async () => {
  const demo = makeDemo(32);
  const game = { x: 0.1, y: 0.5, vx: 0.01, vy: 0.02, px: 0.7 };
  for (let i = 0; i < 400 && demo._receipts.length === 0; i++) await demo.l2Suggest(game);
  assert.ok(demo._receipts.length > 0, "a healthy pot must still advise");
  assert.equal(demo._receipts[0].kind, "qa-sim");
  assert.ok(demo.getVis().decoded.some((v) => v !== 0), "the healthy channel is drawn live, not a flatline");
  assert.equal(demo.getVis().spb, 32, "the tile label carries the live shots/bin readout");
});

test("MARKUP: the pot control ships in the page, toggled with the qa module", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  assert.ok(/<input id="qapot" type="range" min="0" max="64" value="32">/.test(html),
    "the page must ship the pot slider (default 32 = the documented default budget)");
  assert.match(html, /\$\("qapotwrap"\)\.style\.display=\$\("l2"\)\.value==="qa"\?"inline":"none"/,
    "the pot control must surface exactly when the qa module is selected");
});
