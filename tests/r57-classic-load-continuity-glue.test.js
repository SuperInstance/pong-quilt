// Round 57 pin — a mid-generation Train + loadLevel must NOT breed the
// pre-load population under the loaded checkpoint's banner.
// R56 measured the stale-evaluator overwrite (P2): loadLevel replaces `pop`
// but the in-flight streaming evaluator still holds the PRE-LOAD candidates;
// its elites breed the next population while gen ticks on from the loaded
// value, so the receipted history LOOKS continuous. Measured by running on
// pristine post-#75 main (verbatim page functions, pop slider 96 so chunk=24
// leaves the generation genuinely mid-stream):
//   Train#1 (24/96 scored) -> loadLevel('level1') (banner: "training from
//   here is real") -> Train-to-completion:
//   champion min L2 to the loaded checkpoint pop = 4.561 (a healthy descendant
//   is < 2.0) — the champion descends from the stale pre-load RANDOM nets.
//   R56's independent stream measured the same shape: L2 4.59, best 1584 < 2010.
// The fix (R57): loadLevel AND the file-load handler reset evalGen (and
// coev.evalS/evalE for symmetry) before training can resume. After the fix
// the same flow breeds true descendants: champion L2 0.691, pop min 0.485.
// Drives the VERBATIM page functions (same extraction pattern as the R53/R54
// glue pins), not a reimplementation.
// FAIL-first: assertions 1+2 are RED on pristine main (L2 4.561, evalGen
// alive); assertion 3 is the R55-style no-regression green (no mid-generation
// in flight -> the load path was already honest).
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

function loadCheckpoints() {
  delete require.cache[require.resolve("../checkpoints/level0.js")];
  delete require.cache[require.resolve("../checkpoints/level1.js")];
  delete require.cache[require.resolve("../checkpoints/level2.js")];
  global.window = {};
  require("../checkpoints/level0.js");
  require("../checkpoints/level1.js");
  require("../checkpoints/level2.js");
  const cps = global.window.PONG_QUILT_CHECKPOINTS;
  delete global.window;
  return cps;
}

function makeDemo(seed) {
  const CP = loadCheckpoints();
  const els = {
    stats: { textContent: "" }, mode: { value: "classic" }, pop: { value: "96" },
    sub: { value: "1" }, sig: { value: "10" }, dec: { value: "4" }, receipts: { textContent: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const src = [
    extract("function startGen(){", "eliteK:D.elites})}"),
    extract("function continueGen(){", "evalGen=null;}}"),
    extract("function loadLevel(l){", 'receipt("LOAD/"+l.toUpperCase(),0,1);}'),
    extract('$("load").onchange', 'receipt("LOAD",0,1);});};'),
  ].join("\n");
  const factory = new Function("window", "alert", "PQ", "D", "$", "receipt", "randPQ",
    "let champNet=null,champGame=null,gameId=0,gen=0,games=0,pop=Array.from({length:96},()=>PQ.makeNet(randPQ)),evalGen=null,lastSnap=null,champRing=PQ.makeRing(4),coev=null;" +
    src +
    "\nreturn {startGen,continueGen,loadLevel,$load:$('load'),get evalGen(){return evalGen},get pop(){return pop},get champNet(){return champNet},get gen(){return gen}};");
  const d = factory({ PONG_QUILT_CHECKPOINTS: CP }, (m) => { throw new Error("alert: " + m); },
    PQ, PQ.DEFAULTS, $, () => {}, PQ.rng(seed));
  return { d, CP, els };
}

function l2(a, b) {
  let s = 0;
  for (let i = 0; i < a.w1.length; i++) { const d = a.w1[i] - b.w1[i]; s += d * d; }
  for (let i = 0; i < a.w2.length; i++) { const d = a.w2[i] - b.w2[i]; s += d * d; }
  return Math.sqrt(s);
}
const minL2 = (net, pop) => Math.min(...pop.map((n) => l2(net, n)));

function trainToCompletion(d, maxCalls = 8) {
  for (let i = 0; i < maxCalls; i++) d.continueGen();
}

test("R57: mid-generation loadLevel resets the streaming evaluator — champion breeds from the loaded checkpoint pop (L2 pinned)", () => {
  const { d, CP } = makeDemo(20260929);
  d.continueGen(); // 24/96 scored, generation genuinely mid-stream
  assert.ok(d.evalGen, "precondition: an in-flight evaluator must exist after the first Train call");
  d.loadLevel("level1");
  assert.equal(d.evalGen, null, "the in-flight PRE-LOAD evaluator must not survive the load");
  trainToCompletion(d);
  const champL2 = minL2(d.champNet, CP.level1.pop);
  assert.ok(champL2 < 2.0,
    `champion must descend from the loaded checkpoint pop (min L2 < 2.0); got ${champL2.toFixed(3)} — the stale pre-load evaluator bred under the loaded banner`);
  const popL2 = Math.min(...d.pop.map((n) => minL2(n, CP.level1.pop)));
  assert.ok(popL2 < 2.0, `the bred population must be loaded-lineage (pop min L2 < 2.0); got ${popL2.toFixed(3)}`);
});

test("R57: mid-generation file-load resets the streaming evaluator — champion breeds from the loaded quilt pop (L2 pinned)", async () => {
  const { d, CP } = makeDemo(20260929);
  d.continueGen(); // mid-stream again
  assert.ok(d.evalGen, "precondition: an in-flight evaluator must exist after the first Train call");
  const quilt = { pop: CP.level1.pop, gen: 77 };
  d.$load.onchange({ target: { files: [{ text: async () => JSON.stringify(quilt) }] } });
  await new Promise((r) => setImmediate(r));
  await new Promise((r) => setImmediate(r));
  assert.equal(d.gen, 77, "the quilt's generation must be adopted");
  assert.equal(d.evalGen, null, "the in-flight PRE-LOAD evaluator must not survive the file-load");
  trainToCompletion(d);
  const champL2 = minL2(d.champNet, quilt.pop);
  assert.ok(champL2 < 2.0,
    `champion must descend from the quilt pop (min L2 < 2.0); got ${champL2.toFixed(3)}`);
});

test("R57 no-regression: loadLevel with no in-flight generation trains true descendants before and after the fix", () => {
  const { d, CP } = makeDemo(777);
  assert.equal(d.evalGen, null, "fresh demo: no in-flight evaluator");
  d.loadLevel("level2");
  trainToCompletion(d);
  const champL2 = minL2(d.champNet, CP.level2.pop);
  assert.ok(champL2 < 2.0,
    `champion must descend from the level2 checkpoint pop (min L2 < 2.0); got ${champL2.toFixed(3)}`);
});
