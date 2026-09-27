'use strict';
// R45 birth seal — prerun-coev.js now ends by sealing the C1 ledger rows it
// just wrote (the birth rows behind checkpoints/coev.js) into a stone-v1
// forward chain. Canonical stone source: SuperInstance/quilt-stone stone.mjs
// + STONE-SPEC.md §4.6 (citation named in-repo; referral edge PENDING per
// weight law). The seal is verified BEFORE write: the repo's own mirror
// first, then quilt-stone's OWN verifyChain when QUILT_STONE_DIR names a
// checkout. Any refusal is loud: `stone: SEAL/REFUSED` + exit 1, no file.
// The receipt is not a new training artifact; it is the birth receipt over
// the C1 ledger rows that make checkpoints/coev.js reproducible.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const PQ = require("../core.js");
const WAL = require("./wal-export.js");

const SEED = 20260924;
const POP = 24;
const GENS = 120;
const OUT = path.join(__dirname, "..", "checkpoints", "coev.js");
const SEAL_OUT = path.join(__dirname, "..", "checkpoints", "coev-stone-v1.json");
const STONE_SOURCE = "tools/prerun-coev.js canonical coev birth seal (Round 45)";

// The ledger rows are the artifact's birth rows: one hash-chained head-to-head
// receipt per generation, exactly as written into checkpoints/coev.js.
function birthRows(ledgerRows) {
  return ledgerRows.map((row) => ({
    op: "LINK",
    cell: "pq/prerun-coev-birth",
    args: {
      gen: row.gen,
      sId: row.sId,
      eId: row.eId,
      outcome: row.outcome,
      frames: row.frames,
      sFit: row.sFit,
      eFit: row.eFit,
      loserId: row.loserId,
      prev: row.prev,
      hash: row.hash,
    },
  }));
}

function buildCoevBirthSeal(ledgerRows) {
  return WAL.toStoneV1(
    { tool: "pong-quilt", source: STONE_SOURCE },
    birthRows(ledgerRows));
}

// verify BEFORE write — mirror first (offline, always), live second (only
// when a checkout is named), never a hand-rolled stand-in presented as stone.
async function writeVerifiedSeal(seal, sealOut) {
  const mirror = WAL.verifyStoneV1(seal);
  if (!mirror.ok) {
    console.error(`stone: SEAL/REFUSED mirror verifyChain ${JSON.stringify(mirror)}`);
    process.exit(1);
  }

  const stone = await WAL.loadStone();
  if (!stone) {
    return "mirror-only receipt, labeled (set QUILT_STONE_DIR to open quilt-stone live seam)";
  }

  const live = stone.verifyChain(seal);
  if (!live.ok) {
    console.error(`stone: SEAL/REFUSED live stone.mjs verifyChain ${JSON.stringify(live)}`);
    process.exit(1);
  }
  return "live stone.mjs verifyChain: ok";
}

async function sealCoevBirth(ledgerRows, sealOut = SEAL_OUT) {
  const seal = buildCoevBirthSeal(ledgerRows);
  const liveNote = await writeVerifiedSeal(seal, sealOut);
  fs.writeFileSync(sealOut, JSON.stringify(seal, null, 1) + "\n");
  console.log(`stone: sealed ${seal.length - 1} coev birth rows -> ${path.relative(process.cwd(), sealOut)}; mirror ok; ${liveNote}`);
  return seal;
}

if (require.main === module) {
  // Drop both stale outputs before the run: a prior birth seal must never be
  // mistaken for this run's receipt if the evolution is interrupted.
  fs.rmSync(OUT, { force: true });
  fs.rmSync(SEAL_OUT, { force: true });

  const rand = PQ.rng(SEED);
  const t0 = Date.now();
  let popS = Array.from({ length: POP }, () => PQ.makeNet(rand));
  let popE = Array.from({ length: POP }, () => PQ.makeNet(rand));
  const ledger = PQ.makeLedger(GENS + 1);
  let sChamp = { net: popS[0] }, eChamp = { net: popE[0] }, last = null;
  const probe = PQ.playAdv(popS[0], popE[0], rand, 1200);
  last = probe.outcome;
  ledger.write({ gen: 0, sId: PQ.netId(popS[0]), eId: PQ.netId(popE[0]), outcome: probe.outcome,
                 frames: probe.frames, sFit: probe.sFitness, eFit: probe.eFitness });
  for (let gen = 1; gen <= GENS; gen++) {
    const scoredS = popS.map((net) => { const r = PQ.playAdv(net, eChamp.net, rand, 1200);
      return { net, sFitness: r.sFitness }; });
    const scoredE = popE.map((net) => { const r = PQ.playAdv(sChamp.net, net, rand, 1200);
      return { net, eFitness: r.eFitness }; });
    const bred = PQ.runCoevGeneration(popS, popE, scoredS, scoredE, rand, PQ.DEFAULTS.sigma, last);
    popS = bred.popS; popE = bred.popE;
    const h2h = PQ.playAdv(bred.sChamp.net, bred.eChamp.net, rand, 1200);
    sChamp = { net: bred.sChamp.net }; eChamp = { net: bred.eChamp.net };
    last = h2h.outcome;
    ledger.write({ gen, sId: PQ.netId(sChamp.net), eId: PQ.netId(eChamp.net), outcome: h2h.outcome,
                   frames: h2h.frames, sFit: h2h.sFitness, eFit: h2h.eFitness, loserId: bred.loserId });
    if (gen % 20 === 0 || gen === GENS) console.log(`coev: gen ${gen}/${GENS}  h2h ${h2h.outcome} ${h2h.frames}f`);
  }
  const js = "window.PONG_QUILT_COEV=" + JSON.stringify({
    seed: SEED, pop: POP, gens: GENS, defaults: PQ.DEFAULTS,
    sChamp: { id: PQ.netId(sChamp.net), fitness: sChamp.fitness, net: sChamp.net },
    eChamp: { id: PQ.netId(eChamp.net), fitness: eChamp.fitness, net: eChamp.net },
    ledger: ledger.items(), last,
  }) + ";\n";
  fs.writeFileSync(OUT, js);
  const md5 = crypto.createHash("md5").update(js).digest("hex");
  console.log(`coev: ${GENS} gens x ${POP}+${POP} nets -> ${path.relative(process.cwd(), OUT)}`);
  console.log(`md5  coev.js  ${md5}  (run again — must be identical)`);
  sealCoevBirth(ledger.items()).catch((err) => {
    console.error("stone: SEAL/REFUSED async seal failure:", (err && err.stack) || err);
    process.exit(1);
  });
}

module.exports = { birthRows, buildCoevBirthSeal, writeVerifiedSeal, sealCoevBirth,
                   OUT, SEAL_OUT, STONE_SOURCE };
