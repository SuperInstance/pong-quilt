// Pre-run the quilt: evolve real checkpoints (L0 random, L1 mid, L2 near-human)
// with the SAME core the browser runs. Output = checkpoint JS files the demo
// loads, so "pick up from a real starting state" is literally true.
//
// Edge-ML round (branch edge-ml-crush, inspired by SuperInstance/quilt-edge-ml):
//  - evaluation streams through PQ.makeEvaluator (their out-of-core pattern);
//    only the bounded elite archive + stats survive each generation.
//  - champion fitness accrues in a PQ.makeRing (their ring_buffer pattern) and
//    is emitted as checkpoints/curve.json — the fitness curve as a real artifact.
//  - black swans draw from the seeded rng, so this script is byte-reproducible:
//    same DEFAULTS.seed -> identical checkpoint bytes. Verified by running
//    twice and diffing (see PLAYLOG Round 2).
// Round 3 (branch round-3-builder): fitness = frames + hits*100 (HIT_WEIGHT),
// so a 0-hit luck champion can never top a hitter (honesty pass). Checkpoints
// regenerated under the new weights; md5 of every emitted file is printed so
// provenance is a checksum, not a promise.
// Round 21 (branch r21-quantum-coin-tiebreak): equal-fitness champion ties are
//  broken by a RECEIPTED QUANTUM COIN, citing SuperInstance/quilt-quant's
//  coin-toss-v1 (live moth-quantum API, lab/play.mjs — job-id journaled, mock
//  flag explicit). CI has no network: the coin is the SEEDED MOCK stand-in,
//  drawn from the same `rand` stream that makes this script byte-reproducible,
//  and every flip lands in checkpoints/curve.json as {gen, incumbent, challenger,
//  coin, engine: 'coin-toss-v1', live: false}. Honesty: mock is labeled, never
//  laundered as live quantum entropy. Weight law: a merged PR here citing
//  quilt-quant's coin = candidate VERIFIED referral edge qt-quant -> pong-quilt.
const PQ = require("../core.js");
const fs = require("fs"), path = require("path");
const crypto = require("crypto");
const D = PQ.DEFAULTS;
const rand = PQ.rng(D.seed);
const TOTAL_GENS = 260, CURVE_SAMPLES = 20;
let pop = Array.from({ length: D.popSize }, () => PQ.makeNet(rand));
const champRing = PQ.makeRing(TOTAL_GENS + 1); // one slot per generation, bounded
const tieReceipts = []; // every coin flip (keeps AND swaps), curve.json-bound
let curGen = 0;
// The quantum-coin tiebreak (seeded mock of quilt-quant coin-toss-v1):
// on equal fitness, incumbent keeps on heads, challenger takes on tails.
// R22 honesty fix: EVERY flip is journaled — a heads burn that keeps the
// incumbent leaves a receipt just like a tails swap. The R21 journal was
// asymmetric (tails-only): 51% of coin events (93 of 182 flips in the
// seeded run) were unrecorded, so "89 flips" undercounted the real stream
// and the receipt could not be audited for keeps. Repro: instrumented run
// of the R21 code counts 182 flips vs 89 receipts.
function quantumCoinTiebreak(rec, incumbent) {
  const heads = rand() < 0.5; // one burn of the shared seeded stream either way
  tieReceipts.push({ gen: curGen, incumbent: incumbent.index, challenger: rec.index,
                     coin: heads ? 'H' : 'T', swap: !heads,
                     engine: 'coin-toss-v1', live: false,
                     citation: 'SuperInstance/quilt-quant lab/play.mjs coin-toss-v1' });
  return !heads; // H: incumbent keeps (false); T: challenger takes (true)
}
let scored = null;
function evaluate() { // stream the population; retain elites only (flat memory)
  const ev = PQ.makeEvaluator(pop, (net) => PQ.playOne(net, rand),
                              { eliteK: D.elites, onTie: quantumCoinTiebreak });
  let snap; // each step() returns a snapshot; the last one is the generation result
  while (!ev.done) snap = ev.step(8); // batch size is a scheduling detail, not semantics
  return snap;
}
function recordChamp(gen) {
  champRing.write({ gen, fitness: scored.best.fitness, frames: scored.best.frames,
                    hits: scored.best.hits, maxSpeed: +scored.best.maxSpeed.toFixed(3) });
}
function emit(level, gen) {
  const best = scored.best;
  const js = "window.PONG_QUILT_CHECKPOINTS=window.PONG_QUILT_CHECKPOINTS||{};\n" +
    `window.PONG_QUILT_CHECKPOINTS["${level}"]=` + JSON.stringify({
      gen, bestFitness: best.fitness, bestFrames: best.frames, bestHits: best.hits,
      maxSpeed: +best.maxSpeed.toFixed(3), pop }) + ";";
  fs.writeFileSync(path.join(__dirname, "..", "checkpoints", `${level}.js`), js);
  console.log(`${level}: gen ${gen} best fitness ${best.fitness | 0} ` +
    `(frames ${best.frames}, hits ${best.hits}, speed x${best.maxSpeed.toFixed(2)})`);
}
function emitCurve() {
  const items = champRing.items();
  const step = Math.max(1, Math.floor(items.length / CURVE_SAMPLES));
  const samples = items.filter((_, i) => i % step === 0 || i === items.length - 1)
    .map(({ gen, fitness }) => ({ gen, fitness }));
  fs.writeFileSync(path.join(__dirname, "..", "checkpoints", "curve.json"),
    JSON.stringify({ seed: D.seed, gens: TOTAL_GENS, ringWrites: champRing.writes,
                     tiebreaks: tieReceipts, samples }, null, 1));
  const swaps = tieReceipts.filter(t => t.swap).length;
  console.log(`curve: ${champRing.writes} generations sampled to ${samples.length} points -> checkpoints/curve.json` +
    (tieReceipts.length ? `; ${tieReceipts.length} quantum-coin flip(s), ${swaps} swap(s)` : "; no champion ties"));
}
fs.mkdirSync(path.join(__dirname, "..", "checkpoints"), { recursive: true });
scored = evaluate();
recordChamp(0);
emit("level0", 0);
for (let g = 1; g <= 60; g++) {
  curGen = g;
  pop = PQ.runGeneration(pop, scored.elites, rand, D.sigma);
  scored = evaluate();
  recordChamp(g);
}
emit("level1", 60);
for (let g = 61; g <= TOTAL_GENS; g++) {
  curGen = g;
  pop = PQ.runGeneration(pop, scored.elites, rand, D.sigma);
  scored = evaluate();
  recordChamp(g);
}
emit("level2", TOTAL_GENS);
emitCurve();

// ---------------------------------------------------------------------------
// R37 (branch r37-prerun-stone-seal): the canonical checkpoints are sealed
// IN STONE-V1 AT BIRTH. R35's merge-gate lesson was "the stone lens opens on
// the merge gate" — this round moves the lens to birth: every prerun run
// ends by sealing the four artifacts it just wrote (curve.json, level0/1/2)
// into checkpoints/stone-v1.json, a stone-v1 forward chain verified by
// SuperInstance/quilt-stone stone.mjs (STONE-SPEC.md §4.6, the fleet's
// canonical verifier) whose payload rows carry {file, md5} — provenance as
// a chained receipt, not a promise. Sealing reuses tools/wal-export.js's toStoneV1 so there is
// exactly one stone-v1 dialect in the repo.
// HONESTY CONTRACT (same shape as the R36 seam): the chain is verified
// BEFORE it is written — the offline mirror first, and quilt-stone's OWN
// stone.mjs via loadStone() when a checkout is named (QUILT_STONE_DIR);
// absent → the mirror-only receipt is printed labeled, never a hand-rolled
// stand-in presented as stone, and never a silent skip. Any refusal → no
// seal file, exit 1 (FAIL-first: a broken receipt must brick the run loudly).
// The seal is NOT one of the canonical five — it is the receipt OVER them,
// so a stale seal is dropped before the provenance loop to keep that loop's
// output exactly the artifacts this run owns.
// ---------------------------------------------------------------------------
const cpDir = path.join(__dirname, "..", "checkpoints");
fs.rmSync(path.join(cpDir, "stone-v1.json"), { force: true }); // prior run's seal, if any
fs.rmSync(path.join(cpDir, "stone-v1.signed.json"), { force: true }); // R39: prior run's staple, if any
for (const f of fs.readdirSync(cpDir).sort()) {
  const md5 = crypto.createHash("md5").update(fs.readFileSync(path.join(cpDir, f))).digest("hex");
  console.log(`md5  ${f}  ${md5}`);
}
console.log("checkpoints written:", fs.readdirSync(cpDir).join(", "));

(async () => { // R37 stone seal — async tail: loadStone()'s dynamic import is async
  const WALX = require("./wal-export.js");
  const sealFiles = ["curve.json", "level0.js", "level1.js", "level2.js"];
  const rows = sealFiles.map(f => ({ op: "LINK", cell: "pq/prerun-checkpoint",
    args: { file: f, md5: crypto.createHash("md5").update(fs.readFileSync(path.join(cpDir, f))).digest("hex") } }));
  const seal = WALX.toStoneV1(
    { tool: "pong-quilt", source: "tools/prerun.js canonical checkpoint seal (Round 37)" }, rows);
  const mirror = WALX.verifyStoneV1(seal); // verify BEFORE write (R30 lesson: non-ok → no file saved)
  if (!mirror.ok) {
    console.error(`stone: SEAL/REFUSED mirror verify failed ${JSON.stringify(mirror)}`);
    process.exit(1);
  }
  const stone = await WALX.loadStone(); // live cross-check only when a checkout is named
  let liveNote = "live stone.mjs: no checkout named (QUILT_STONE_DIR) — mirror-only receipt, labeled";
  if (stone) {
    const v = stone.verifyChain(seal);
    if (!v.ok) {
      console.error(`stone: SEAL/REFUSED canonical verifier rejects the seal ${JSON.stringify(v)}`);
      process.exit(1);
    }
    liveNote = `live stone.mjs verifyChain: ok (links ${v.links})`;
  }
  fs.writeFileSync(path.join(cpDir, "stone-v1.json"), JSON.stringify(seal, null, 1) + "\n");
  console.log(`stone: sealed ${rows.length} checkpoint rows -> checkpoints/stone-v1.json; mirror ok; ${liveNote}`);

  // R39 (branch r39-stone-sign-pilot): STONE-V2-PILOTS first sign pilot —
  // the producer staples the birth-seal chain's tip with an ed25519
  // signature (SuperInstance/quilt-stone signTip/verifyTipSignature, the
  // stone-v2 sign lane; STONE-SPEC.md §4.6.2). Keys live with the PRODUCER:
  // QUILT_STONE_SIGN_KEY may name a PEM private key file for a stable
  // producer identity; absent, an ephemeral keypair is generated per run
  // and the staple is LABELED ephemeral — never presented as standing
  // identity. The staple ships CLOSED: when the named checkout has no
  // signTip (the sign lane is not merged there yet) nothing is written and
  // the skip is printed labeled, never silent. The signed chain is verified
  // BEFORE write (verifyTipSignature with the producer public key), and a
  // refused staple bricks the run exactly like a refused seal.
  if (!stone || typeof stone.signTip !== "function") {
    console.log("stone: sign lane not in named checkout (quilt-stone signTip absent) — staple skipped, labeled");
    return;
  }
  const keyPath = process.env.QUILT_STONE_SIGN_KEY || null;
  let privateKey, publicKeyPem, ephemeral;
  if (keyPath) {
    privateKey = crypto.createPrivateKey(fs.readFileSync(keyPath));
    publicKeyPem = crypto.createPublicKey(privateKey).export({ type: "spki", format: "pem" });
    ephemeral = false;
  } else {
    const pair = crypto.generateKeyPairSync("ed25519");
    privateKey = pair.privateKey;
    publicKeyPem = pair.publicKey.export({ type: "spki", format: "pem" });
    ephemeral = true;
  }
  const signed = seal.map(r => ({ ...r })); // staple a copy; the unsigned birth seal stays canonical
  stone.signTip(signed, privateKey, { key_id: "pq-prerun-sign-pilot", signer_role: "producer" });
  const sig = stone.verifyTipSignature(signed, publicKeyPem);
  if (!sig.ok) {
    console.error(`stone: SIGN/REFUSED verifyTipSignature rejects the staple ${JSON.stringify(sig)}`);
    process.exit(1);
  }
  fs.writeFileSync(path.join(cpDir, "stone-v1.signed.json"), JSON.stringify({
    tool: "pong-quilt", round: "R39", source: "tools/prerun.js birth-seal tip staple (STONE-V2-PILOTS first sign pilot)",
    key: { ephemeral, public: publicKeyPem },
    verify: { ok: sig.ok, tip: sig.tip, signer: sig.signer },
    chain: signed,
  }, null, 1) + "\n");
  console.log(`stone: stapled birth-seal tip ${sig.tip} -> checkpoints/stone-v1.signed.json; verifyTipSignature ok` +
    (ephemeral ? " (ephemeral producer key, labeled)" : ` (producer key ${keyPath})`));
})().catch(e => { console.error("stone: SEAL/REFUSED", e && e.message ? e.message : e); process.exit(1); });
