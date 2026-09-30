// Round 62 pin — a file-load must also reset the VISIBLE champion, not just
// the streaming evaluator.
// R57 reset evalGen on every load path (its pin is green), but the file-load
// handler left champNet/champGame untouched: the demo keeps PLAYING the
// pre-load champion under the loaded quilt's banner. R61 measured the wound
// (M4); R62 measured it again on pristine main d2a85d7 by running (verbatim
// page functions, classic sandbox, seed 20260930):
//   Train-to-completion (champ A bred, champGame alive) -> file-load a quilt
//   {pop: level1.pop[0..7], best: level1.pop[0], gen: 77} ->
//   champNet === pre-load champ A (identity), champGame still alive,
//   L2(champ, loaded quilt pop) = 4.943 — the exact R56-P2 magnitude (4.56),
//   one lane over: the receipted history says LOAD, the played game says stale.
// loadLevel (the checkpoint path) already resets BOTH (`champNet=cp.pop[0];
// champGame=null`); the file path is the asymmetric twin.
// The fix: the file-load handler adopts the quilt's best net (falling back to
// the merged pop[0] for best-less quilts) and clears champGame — one line,
// mirroring the loadLevel precedent.
// Drives the VERBATIM page functions (same extraction pattern as the R53/R54/
// R57 glue pins), not a reimplementation.
// FAIL-first: assertions 1+2 are RED on pristine main (champ identity stale,
// champGame alive); assertion 3 is the R55-style no-regression green
// (loadLevel's champion semantics unchanged by the fix).
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
    sub: { value: "1" }, sig: { value: "10" }, dec: { value: "4" },
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
    "\nreturn {startGen,continueGen,loadLevel,$load:$('load'),get evalGen(){return evalGen},get pop(){return pop},get champNet(){return champNet},get champGame(){return champGame},get gen(){return gen}};");
  const d = factory({ PONG_QUILT_CHECKPOINTS: CP }, (m) => { throw new Error("alert: " + m); },
    PQ, PQ.DEFAULTS, $, () => {}, PQ.rng(seed));
  return { d, CP };
}

function l2(a, b) {
  let s = 0;
  for (let i = 0; i < a.w1.length; i++) { const d = a.w1[i] - b.w1[i]; s += d * d; }
  for (let i = 0; i < a.w2.length; i++) { const d = a.w2[i] - b.w2[i]; s += d * d; }
  return Math.sqrt(s);
}
const tick = () => new Promise((r) => setImmediate(r));
const loadQuilt = async (d, quilt) => {
  d.$load.onchange({ target: { files: [{ text: async () => JSON.stringify(quilt) }] } });
  await tick(); await tick();
};

test("R62: file-load resets the VISIBLE champion to the quilt's best (identity, champGame fresh)", async () => {
  const { d, CP } = makeDemo(20260930);
  for (let i = 0; i < 6; i++) d.continueGen(); // a real bred champion exists
  assert.ok(d.champNet && d.champNet.w1, "precondition: a bred champion must exist");
  assert.ok(d.champGame, "precondition: the champion's game must be alive");
  const preChamp = d.champNet;
  const quilt = { pop: CP.level1.pop.slice(0, 8), best: CP.level1.pop[0], gen: 77 };
  assert.notStrictEqual(preChamp, quilt.best, "precondition: the pre-load champ must differ from the quilt's best");
  await loadQuilt(d, quilt);
  assert.strictEqual(d.gen, 77, "the quilt's generation must be adopted (R57 lane)");
  assert.notStrictEqual(d.champNet, preChamp,
    "the VISIBLE champion must not survive as the pre-load champion — the R57 lane left the stale pre-load champion playing under the loaded banner (measured L2 4.943 to the loaded pop)");
  assert.deepStrictEqual(d.champNet, quilt.best,
    "the VISIBLE champion must BE the quilt's best net by value (the FileReader parse boundary legitimately makes a fresh object, so value-equality is the semantic; identity to the pre-serialization object is not)");
  assert.strictEqual(d.champGame, null,
    "the stale champion's game must not survive the load (loadLevel precedent)");
  assert.ok(l2(d.champNet, quilt.pop[0]) < 1e-9, "the adopted champion is the quilt's best net, verifiable by identity");
});

test("R62: a best-less quilt falls back to the merged pop[0] (old save-shape honesty)", async () => {
  const { d, CP } = makeDemo(20260930);
  for (let i = 0; i < 6; i++) d.continueGen();
  const quilt = { pop: CP.level2.pop.slice(0, 8), gen: 41 }; // no `best` field: pre-R62 saves and hand-made quilts
  await loadQuilt(d, quilt);
  assert.strictEqual(d.champNet, d.pop[0],
    "without a best field the merged pop[0] becomes the visible champion (the loadLevel cp.pop[0] precedent), never the stale pre-load champ");
  assert.strictEqual(d.champGame, null, "champGame cleared on the fallback path too");
  assert.strictEqual(d.pop.length >= 8, true, "the quilt's nets lead the merged population");
});

test("R62 no-regression: loadLevel's champion semantics are unchanged (champ=cp.pop[0], game fresh)", () => {
  const { d, CP } = makeDemo(777);
  d.loadLevel("level1");
  assert.strictEqual(d.champNet, CP.level1.pop[0],
    "loadLevel must keep adopting cp.pop[0] as the champion");
  assert.strictEqual(d.champGame, null, "loadLevel must keep clearing the game");
  for (let i = 0; i < 6; i++) d.continueGen();
  const champL2 = Math.min(...CP.level1.pop.map((n) => l2(d.champNet, n)));
  assert.ok(champL2 < 2.0,
    `training after loadLevel must breed loaded-lineage champions (min L2 < 2.0); got ${champL2.toFixed(3)}`);
});
