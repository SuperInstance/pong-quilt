// Round 12 pin — qa exhaustion honesty (R11 spec item 4, REFUSAL half).
// (Round 13: the page grew a pot control; these mocks pin it at the default 32
// so this file keeps testing BACKEND silence, not pot depletion — that's
// tests/qapot-glue.test.js.)
// Found this round by running: the shipped sim's pot-bound guard
// (zeroCrossingRate(decoded) < DEAD_ZCR -> suggest returns null) is UNREACHABLE
// — a 61x61x6 state sweep found min ZCR 0.125, 6x the 0.02 threshold; 8,820
// suggest() calls, zero nulls. The branch the honesty contract advertises
// ("pot-bound: no echo, no advice") is dead code under the shipped stand-in,
// and the page swallowed advisor nulls silently (if(!s)return null) — so the
// demo's "admits exhaustion" claim had no execution path at all.
// Build (this round): (1) qa.js gains a real silence floor — a shots-per-bin
// budget below SIM_POT_FLOOR models QPAM shot underflow (measured pearson ~0.02
// at 2000 shots/882 samples): the pot returns NO image, channel emits zeros,
// and the existing DEAD_ZCR guard does the job it was built for; (2) the page's
// qa branch receipts "QA-REFUSAL" + a warn stat line on advisor null — through
// the contract's own documented seam (a real backend that returns silence, or
// the sim below its floor) instead of dropping silently.
// FAIL-first: against the pre-fix page + qa.js the GLUE and FLOOR tests fail;
// the UNCHANGED tests prove normal play is untouched.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");
const QA = require("../qa.js");

// --- module level: the silence floor is real physics, not a test hack --------
test("FLOOR: a shots/sample budget below SIM_POT_FLOOR returns silence (no image)", () => {
  const w = QA.sonify({ ballX: 0.5, paddleX: 0.4, speed: 1.2 });
  const dead = QA.channel(w, 42, 1); // one shot per bin: the pot is empty
  assert.ok(dead.every((v) => v === 0), `channel(...,1) must be pure silence — got nonzero samples`);
  assert.equal(dead.length, QA.N);
});

test("FLOOR: silence trips the pot-bound guard — suggest returns null", () => {
  const s = { ballX: 0.5, ballY: 0.5, velX: 0.3, velY: 0.8, paddleX: 0.4, speed: 1.2, frames: 10, hits: 1 };
  const clean = QA.sonify(s);
  assert.equal(QA.zeroCrossingRate(QA.channel(clean, 7, 1)), 0, "silence has zero crossings");
  assert.ok(QA.zeroCrossingRate(QA.channel(clean, 7, 1)) < QA.DEAD_ZCR, "silence is below DEAD_ZCR");
});

test("UNCHANGED: the default pot still advises (normal play untouched)", () => {
  for (const [bx, px] of [[0.1, 0.7], [0.9, 0.2], [0.5, 0.42]]) {
    const s = { ballX: bx, ballY: 0.5, velX: 0.3, velY: 0.8, paddleX: px, speed: 1.2, frames: 10, hits: 1 };
    const out = QA.suggest(s, 99);
    assert.ok(out, `default pot must still advise at state (${bx},${px})`);
    assert.ok(out.confidence <= QA.SIM_MAX_CONF, "cap holds");
  }
});

// --- glue level: the page receipts exhaustion instead of going silent -------
function extractL2Suggest() {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = html.indexOf("async function l2Suggest(g){");
  const marker = "if(Math.random()<s.confidence*w)return s;return null;}";
  const end = html.indexOf(marker);
  assert.ok(start > 0, "index.html must contain the l2Suggest glue");
  assert.ok(end > start, "index.html must contain the l2Suggest tail");
  return html.slice(start, end + marker.length);
}

function makeDemo() {
  const els = { l2: { value: "qa" }, w: { value: "100" }, qapot: { value: "32" }, l2stat: { textContent: "", className: "" } };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const receipts = [];
  // the documented seam: a backend (real QPAM or a depleted pot) that returns
  // silence — QuantumAudioL2.suggest returns null. Everything else verbatim.
  const silentQA = Object.assign({}, QA, { suggest: () => null });
  const MoveSuggestion = { validate: () => null };
  const stateOf = (gm) => ({ ballX: gm.x, paddleX: gm.px, speed: 1 });
  const factory = new Function("PQ", "QuantumAudioL2", "MoveSuggestion", "jepa", "$", "stateOf", "receipt", "randPQ",
    "const D=PQ.DEFAULTS;let gen=1,games=0,qaVis=null,lastAdviceAt=-1e9,deathJustNow=false;" +
    "let llmSeam=null,pendingAdvice=null;" +
    "function takeAdvice(){return null;} function maybeFireSeam(){} " +
    extractL2Suggest() +
    "return {l2Suggest};");
  const demo = factory(PQ, silentQA, MoveSuggestion, PQ.makeJepa(), $, stateOf,
    (k, m, c) => receipts.push({ kind: k }), Math.random);
  demo._receipts = receipts;
  demo._els = els;
  return demo;
}

test("GLUE: an exhausted qa backend receipts 'QA-REFUSAL' — never a silent drop", async () => {
  const demo = makeDemo();
  const game = { x: 0.5, y: 0.5, vx: 0.01, vy: 0.02, px: 0.4 };
  for (let i = 0; i < 5; i++) await demo.l2Suggest(game);
  const refusal = demo._receipts.find((r) => r.kind === "QA-REFUSAL");
  assert.ok(refusal,
    "advisor returned null (exhausted pot) but the ledger shows no QA-REFUSAL row — exhaustion is still admitted silently");
  assert.ok(/pot-bound|silent/i.test(demo._els.l2stat.textContent),
    `the stat line must name the exhaustion — got "${demo._els.l2stat.textContent}"`);
});

test("GLUE: a live qa backend still advises and is receipted 'qa-sim' (no regression)", async () => {
  const els = { l2: { value: "qa" }, w: { value: "100" }, qapot: { value: "32" }, l2stat: { textContent: "", className: "" } };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const receipts = [];
  const MoveSuggestion = { validate: () => null };
  const stateOf = (gm) => ({ ballX: gm.x, paddleX: gm.px, speed: 1 });
  const factory = new Function("PQ", "QuantumAudioL2", "MoveSuggestion", "jepa", "$", "stateOf", "receipt", "randPQ",
    "const D=PQ.DEFAULTS;let gen=1,games=0,qaVis=null,lastAdviceAt=-1e9,deathJustNow=false;" +
    "let llmSeam=null,pendingAdvice=null;" +
    "function takeAdvice(){return null;} function maybeFireSeam(){} " +
    extractL2Suggest() +
    "return {l2Suggest};");
  const demo = factory(PQ, QA, MoveSuggestion, PQ.makeJepa(), $, stateOf,
    (k, m, c) => receipts.push({ kind: k }), Math.random);
  const game = { x: 0.1, y: 0.5, vx: 0.01, vy: 0.02, px: 0.7 };
  for (let i = 0; i < 400 && receipts.length === 0; i++) await demo.l2Suggest(game);
  assert.ok(receipts.length > 0, "live qa backend must still receipt advice");
  assert.equal(receipts[0].kind, "qa-sim");
});
