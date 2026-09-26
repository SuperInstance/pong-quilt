// Round 20 pin — coev-mode QA-REFUSAL, permanent (R19 spec item, fresh small).
// R19 hunted the suspicion "the C1 coev ledger path maybe drops advisor
// refusals silently" and closed it BY RUNNING with a one-off Proxy-DOM probe:
// qa module selected, pot 0 (the real sim's silence below SIM_POT_FLOOR), one
// live() tick in coev mode — a QA-REFUSAL row landed in the receipt chain and
// the stat line admitted it. One-off probes rot; the R19 spec booked this
// pin to make the probe permanent. It extracts the page's REAL live() coev
// branch (not a reimplementation — the same qarefusal-glue extraction style)
// and asserts the refusal is receipted + named on the stat line, and that a
// live backend still advises through the same coev path (the pin is not
// vacuous: it must FAIL if the coev branch starts dropping refusals OR if it
// stops advising on a live channel).
// FAIL-first (sensitivity, demonstrated against the page's own shipped code):
// pin 4 strips receipt("QA-REFUSAL",...) from the extracted slice (the
// pre-R12 silent-drop half) and asserts the ledger goes empty — pins 1-2 run
// red against that mutated page code. See PLAYLOG R20.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");
const QA = require("../qa.js");

// Same discipline as tests/qarefusal-glue.test.js: slice the qa BYO seam
// block through the l2Suggest tail so the harness wires the page's real
// qaSuggest() + l2Suggest() — not a copy that can drift from the page.
function extractL2Suggest() {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = html.indexOf("// === qa BYO seam");
  const marker = "if(Math.random()<s.confidence*w)return s;return null;}";
  const end = html.indexOf(marker);
  assert.ok(start > 0, "index.html must contain the qa BYO seam block + l2Suggest glue");
  assert.ok(end > start, "index.html must contain the l2Suggest tail");
  return html.slice(start, end + marker.length);
}

// The coev branch under test lives inside the page's live(); slice it whole
// (from its declaration to the tick() that follows it) so the pin exercises
// the REAL branch: coevMode gate → eChamp forward → l2Suggest(champGame) →
// blend → stepAdv → jepa.learn.
function extractLive() {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = html.indexOf("function live(){");
  const end = html.indexOf("function tick(");
  assert.ok(start > 0, "index.html must contain live()");
  assert.ok(end > start, "live() must be followed by tick()");
  return html.slice(start, end);
}

// opts.mutate is the FAIL-first lever: it rewrites the extracted page source
// so we can prove the pin actually watches the refusal path (pre-R12 shape:
// advisor null silently dropped, no receipt, no stat line).
function makeCoevDemo({ silent = false, mutate = null } = {}) {
  const els = {
    l2: { value: "qa" }, mode: { value: "coev" },
    qapot: { value: silent ? "0" : "32" }, qabyoep: { value: "" }, w: { value: "100" },
    l2stat: { textContent: "", className: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const receipts = [];
  const QuantumAudioL2 = silent ? Object.assign({}, QA, { suggest: () => null }) : QA;
  const MoveSuggestion = { validate: () => null };
  const stateOf = (gm) => ({ ballX: gm.x, paddleX: gm.px, speed: 1 });
  const jepa = PQ.makeJepa();
  let slice = extractL2Suggest() + "\nfunction blend(act,sug){return sug?sug.move:act;}\n" + extractLive();
  if (mutate) slice = mutate(slice);
  const factory = new Function("PQ", "QuantumAudioL2", "MoveSuggestion", "jepa", "$", "stateOf", "receipt", "randPQ",
    "const D=PQ.DEFAULTS;let gen=1,games=0,qaVis=null,lastAdviceAt=-1e9,deathJustNow=false,gameId=1,running=true;" +
    "const ADVICE_EVERY=150;let llmSeam=null,pendingAdvice=null;" +
    "let pop=[],evalGen=null,champNet=null,coev=null,champGame=null,lastSnap=null;" +
    "function takeAdvice(){return null;} function maybeFireSeam(){} " +
    slice +
    "return {live,boot:(cn,cg,cv)=>{champNet=cn;champGame=cg;coev=cv;}};");
  const demo = factory(PQ, QuantumAudioL2, MoveSuggestion, jepa, $, stateOf,
    (k, m, c) => receipts.push({ kind: k }), Math.random);
  demo._receipts = receipts;
  demo._els = els;
  return demo;
}

function bootDemo(opts) {
  const demo = makeCoevDemo(opts);
  demo.boot(PQ.makeNet(Math.random), PQ.newAdvGame(Math.random), { eChamp: { net: PQ.makeNet(Math.random) } });
  return demo;
}

test("GLUE: coev-mode live() with an empty pot receipts 'QA-REFUSAL' — the C1 ledger path never drops a refusal", async () => {
  const demo = bootDemo({ silent: true });
  demo.live();
  await new Promise((r) => setTimeout(r, 20));
  const refusal = demo._receipts.find((r) => r.kind === "QA-REFUSAL");
  assert.ok(refusal,
    "advisor returned null (pot 0, below the sim floor) in COEV mode but the ledger shows no QA-REFUSAL row — the C1 path drops refusals silently");
});

test("GLUE: the coev refusal is NAMED on the stat line (warn class, floor disclosed)", async () => {
  const demo = bootDemo({ silent: true });
  demo.live();
  await new Promise((r) => setTimeout(r, 20));
  assert.match(demo._els.l2stat.textContent, /qa-sim: channel silent \(pot 0\/bin below floor 2\)/,
    `stat line must name the coev-mode refusal — got "${demo._els.l2stat.textContent}"`);
  assert.equal(demo._els.l2stat.className, "warn", "a receipted refusal is a warn, not ok/bad");
});

test("GLUE: a live backend still advises through the coev path (pin is not vacuous)", async () => {
  const demo = bootDemo({ silent: false });
  for (let i = 0; i < 200; i++) {
    demo.live();
    await new Promise((r) => setTimeout(r, 1));
    if (demo._receipts.some((r) => r.kind === "qa-sim")) break;
  }
  assert.ok(demo._receipts.some((r) => r.kind === "qa-sim"),
    "a live qa channel in coev mode must still receipt 'qa-sim' advice through l2Suggest(champGame)");
});

// FAIL-first sensitivity proof: stripping the refusal receipt from the
// extracted page code (the pre-R12 silent-drop half) must leave the ledger
// with no QA-REFUSAL row — i.e. pin 1 watches the real path, not its own
// harness. Run pins 1-2 against this mutated slice and they are red.
test("SELF-CHECK: stripping the refusal receipt empties the ledger (pin watches the real path)", async () => {
  const dropReceipt = (src) => src.split('receipt("QA-REFUSAL",0,0);').join("");
  const demo = bootDemo({ silent: true, mutate: dropReceipt });
  demo.live();
  await new Promise((r) => setTimeout(r, 20));
  assert.ok(!demo._receipts.some((r) => r.kind === "QA-REFUSAL"),
    "self-check setup failed: the mutation did not remove the refusal receipt");
});
