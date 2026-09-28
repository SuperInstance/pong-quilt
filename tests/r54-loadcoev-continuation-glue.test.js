// Round 54 pin — the loadCoev continuation is REAL, not just un-frozen.
// R53 fixed the crash (loadCoev seeds popS/popE so Train doesn't die inside the
// rAF tick) but seeded the populations with FRESH RANDOM NETS: the artifact's
// 120-gen lineage was discarded the moment gen 121 bred. Measured by running
// (A/B, same rng stream both arms, K=30 fixed benchmark vs the artifact ender):
//   gen-121 champion mean sFitness:  239.6 (random seed) | 1099.9 (champ-seeded)
//                                   | 1259.1 (the artifact champ itself)
//   gen-121 champion L2 to artifact champ: 11.91 (random) | 0.455 (champ-seeded)
// and the artifact's own last h2h row was sFit 4675 — the shipped lane fell to
// 634/124/180 across gens 121-123. The single-h2h signal is too noisy to pin
// (the artifact's own h2h range: 112..4675), so this pin uses the two
// low-variance witnesses: descendant-distance (L2) and the K=30 benchmark mean.
// Drives the VERBATIM page functions (extracted between the same literal
// markers as the R53 glue pin), not a reimplementation.
// FAIL-first: on pristine main the L2 and benchmark assertions are red (11.91,
// 239.6); after the champ-seeded loadCoev they hold with wide margin.
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

function loadArtifact() {
  delete require.cache[require.resolve("../checkpoints/coev.js")];
  global.window = {};
  require("../checkpoints/coev.js");
  const a = global.window.PONG_QUILT_COEV;
  delete global.window;
  return a;
}

function makeDemo(sliderPop) {
  const ARTIFACT = loadArtifact();
  const els = {
    stats: { textContent: "" }, mode: { value: "coev" }, pop: { value: String(sliderPop) },
    sub: { value: "1" }, sig: { value: "10" }, dec: { value: "4" }, receipts: { textContent: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const src = [
    extract("function loadCoev(){", 'receipt("LOAD/COEV",0,1);}'),
    extract("function startGenC(){", "enderHits:r.enderHits}"),
    extract("function continueGenC(){", "coev.evalE=null;}}"),
  ].join("\n");
  const factory = new Function("window", "alert", "PQ", "D", "$", "receipt", "randPQ", "requestAnimationFrame", "renderReceipts",
    "let champNet=null,champGame=null,gameId=0,coev=null,gen=0,games=0,pop=[],evalGen=null,lastSnap=null,champRing=PQ.makeRing(4);" +
    src + "\nreturn {loadCoev,continueGenC,startGenC,get coev(){return coev},get champNet(){return champNet}};");
  const d = factory({ PONG_QUILT_COEV: ARTIFACT }, (m) => { throw new Error("alert: " + m); },
    PQ, PQ.DEFAULTS, $, () => {}, PQ.rng(20260928), () => {}, () => {});
  return { d, ARTIFACT, els };
}

function l2(a, b) {
  let s = 0;
  for (let i = 0; i < a.w1.length; i++) { const d = a.w1[i] - b.w1[i]; s += d * d; }
  for (let i = 0; i < a.w2.length; i++) { const d = a.w2[i] - b.w2[i]; s += d * d; }
  return Math.sqrt(s);
}

function bench(net, K) {
  // mean sFitness over K games vs the artifact ender champ, fixed stream —
  // the artifact champ itself benches ~1259 on this exact stream (R54 A/B).
  const rand = PQ.rng(424242);
  let sum = 0;
  for (let i = 0; i < K; i++) sum += PQ.playAdv(net, loadArtifact().eChamp.net, rand).sFitness;
  return sum / K;
}

test("R54: after loadCoev + 1 Train gen, the bred champion is a close descendant of the artifact champ (L2 pinned)", () => {
  const { d, ARTIFACT } = makeDemo(32);
  d.loadCoev();
  d.continueGenC(); // one coev generation via the verbatim page functions
  const rows = d.coev.ledger.items();
  const row121 = rows[rows.length - 1];
  assert.equal(row121.gen, ARTIFACT.gens + 1, "gen counter advanced exactly one past the artifact");
  const dist = l2(d.champNet, ARTIFACT.sChamp.net);
  assert.ok(dist < 2.0,
    `gen-121 champion must descend from the artifact champ (L2 ${dist.toFixed(3)} < 2.0; the random-seed arm measures 11.91 — a fresh noise net)`);
});

test("R54: gen-121 champion benches near the artifact regime, not the noise floor (K=30 vs artifact ender)", () => {
  const { d } = makeDemo(32);
  d.loadCoev();
  d.continueGenC();
  const mean = bench(d.champNet, 30);
  assert.ok(mean > 800,
    `gen-121 champion mean sFitness vs artifact ender = ${mean.toFixed(1)} (> 800; random-seed arm 239.6, artifact champ 1259.1)`);
});

test("R54: the loadCoev stats line admits the seeding semantics (no silent continuation)", () => {
  const { d, els } = makeDemo(32);
  d.loadCoev();
  assert.match(els.stats.textContent, /seeded around the loaded champs/,
    "the artifact-lane banner must tell the player the populations continue from the champs, not from noise");
  assert.match(els.stats.textContent, /breeds descendants, not noise/);
});
