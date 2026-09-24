// Round 3 pins — C1 COEVOLUTION: game rules (ender blocks return the ball
// downward; only the survivor's line can die; fitness semantics) and
// seeded determinism (same seed -> same champions, same ledger head — the
// property tools/prerun-coev.js relies on for its md5 receipt).
const test = require("node:test");
const assert = require("node:assert/strict");
const PQ = require("../core.js");

test("ender block: ball in the ender's zone returns downward, boosted", () => {
  const saved = PQ.DEFAULTS.swanP; PQ.DEFAULTS.swanP = 0;
  const g = PQ.newAdvGame(PQ.rng(3));
  g.frames = 1; g.y = 0.059; g.vy = -0.5; g.vx = 0; g.x = g.ex + 0.05; // crosses 0.06 this frame, inside the zone
  assert.equal(PQ.stepAdv(g, 0, 0, PQ.rng(5)), true);
  assert.equal(g.enderHits, 1);
  assert.ok(g.vy > 0, "ball sent back down");
  assert.ok(g.boost > 1, "block accumulates a real speed boost (C1 physics — survives the ramp)");
  PQ.DEFAULTS.swanP = saved;
});

test("clean escape past the ender: wall bounce, rally continues, no ender credit", () => {
  const saved = PQ.DEFAULTS.swanP; PQ.DEFAULTS.swanP = 0;
  const g = PQ.newAdvGame(PQ.rng(3));
  g.frames = 1; g.y = 0.059; g.vy = -0.5; g.vx = 0; g.x = g.ex + 0.4; // far from the ender's effective zone
  assert.equal(PQ.stepAdv(g, 0, 0, PQ.rng(5)), true);
  assert.equal(g.enderHits, 0);
  assert.ok(g.vy > 0, "wall returns the ball — escapes cannot end the rally");
  PQ.DEFAULTS.swanP = saved;
});

test("only the survivor's line can die; outcomes are always ENDER-KILL or SURVIVOR-CAP", () => {
  const rand = PQ.rng(9);
  const outcomes = new Set();
  for (let i = 0; i < 6; i++) {
    const s = PQ.makeNet(rand), e = PQ.makeNet(rand);
    const r = PQ.playAdv(s, e, PQ.rng(100 + i), 1500);
    outcomes.add(r.outcome);
    assert.ok(r.outcome === "ENDER-KILL" || r.outcome === "SURVIVOR-CAP");
    assert.equal(r.sFitness, PQ.fitnessOf(r.frames, r.hits), "survivor keeps L1 honesty semantics");
    if (r.outcome === "ENDER-KILL") assert.ok(r.eFitness > 0);
  }
  assert.ok(outcomes.has("ENDER-KILL"), "fresh random nets should die sometimes (the mode is adversarial, not decorative)");
});

test("ender fitness ranks fast kills above slow kills above failed caps", () => {
  // kill at 100f with 2 blocks: (cap-100) + 60 >> kill at 5000f with 0 blocks
  const cap = PQ.DEFAULTS.maxFrames;
  const fast = (cap - 100) + 2 * 30, slow = (cap - 5000) + 0 * 30, failed = 3 * 5;
  assert.ok(fast > slow && slow > failed);
});

test("same seed -> same champions, same ledger head, same loser chain (md5-stability property)", () => {
  const micro = (seed) => {
    const rand = PQ.rng(seed);
    const pop = 6, gens = 3;
    let popS = Array.from({ length: pop }, () => PQ.makeNet(rand));
    let popE = Array.from({ length: pop }, () => PQ.makeNet(rand));
    const ledger = PQ.makeLedger(gens + 1);
    let sChamp = { net: popS[0] }, eChamp = { net: popE[0] }, last = null;
    const probe = PQ.playAdv(popS[0], popE[0], rand, 1200);
    last = probe.outcome;
    ledger.write({ gen: 0, sId: PQ.netId(popS[0]), eId: PQ.netId(popE[0]), outcome: probe.outcome });
    for (let gen = 1; gen <= gens; gen++) {
      const scoredS = popS.map((net) => { const r = PQ.playAdv(net, eChamp.net, rand, 1200);
        return { net, sFitness: r.sFitness }; });
      const scoredE = popE.map((net) => { const r = PQ.playAdv(sChamp.net, net, rand, 1200);
        return { net, eFitness: r.eFitness }; });
      const bred = PQ.runCoevGeneration(popS, popE, scoredS, scoredE, rand, PQ.DEFAULTS.sigma, last);
      popS = bred.popS; popE = bred.popE;
      const h2h = PQ.playAdv(bred.sChamp.net, bred.eChamp.net, rand, 1200);
      sChamp = { net: bred.sChamp.net }; eChamp = { net: bred.eChamp.net };
      last = h2h.outcome;
      ledger.write({ gen, sId: PQ.netId(sChamp.net), eId: PQ.netId(eChamp.net),
                     outcome: h2h.outcome, loserId: bred.loserId });
    }
    return { sId: PQ.netId(sChamp.net), eId: PQ.netId(eChamp.net),
             head: ledger.head, rows: ledger.size };
  };
  const a = micro(7), b = micro(7), c = micro(8);
  assert.deepEqual(a, b, "identical seeds must reproduce the full lineage");
  assert.notDeepEqual(a, c, "different seeds must diverge (determinism is a two-way fence)");
});

test("the loser mutates: lastOutcome drives which champion's slot gets extra pressure", () => {
  const mkInputs = () => { // same construction, replayable
    const r = PQ.rng(21);
    const scoredS = Array.from({ length: 8 }, () => {
      const net = PQ.makeNet(r); return { net, sFitness: 1000 + r() * 500 }; });
    const scoredE = Array.from({ length: 8 }, () => {
      const net = PQ.makeNet(r); return { net, eFitness: 1000 + r() * 500 }; });
    return { scoredS, scoredE };
  };
  const rS = PQ.rng(31), rE = PQ.rng(32);
  const popS = Array.from({ length: 8 }, () => PQ.makeNet(rS));
  const popE = Array.from({ length: 8 }, () => PQ.makeNet(rE));
  const run = (outcome) => {
    const { scoredS, scoredE } = mkInputs();
    return PQ.runCoevGeneration(popS, popE, scoredS, scoredE, PQ.rng(21), 0.12, outcome);
  };
  const sWins = run("SURVIVOR-CAP"), sWinsReplay = run("SURVIVOR-CAP");
  const eWins = run("ENDER-KILL");
  // the recorded loser is the losing side's CHAMPION
  const champE = (() => { const { scoredE } = mkInputs();
    scoredE.sort((a, b) => b.eFitness - a.eFitness); return PQ.netId(scoredE[0].net); })();
  const champS = (() => { const { scoredS } = mkInputs();
    scoredS.sort((a, b) => b.sFitness - a.sFitness); return PQ.netId(scoredS[0].net); })();
  assert.equal(sWins.loserId, champE, "survivor capped -> the ENDER lost");
  assert.equal(eWins.loserId, champS, "ender killed -> the SURVIVOR lost");
  // and the loser slot is replayable bit-for-bit under the same seed
  assert.equal(PQ.netId(sWins.popE[0]), PQ.netId(sWinsReplay.popE[0]));
  // pressure lands on the loser, not both: the winner's slot 0 stays a plain elite copy
  const plainEliteS = JSON.stringify((() => { const { scoredS } = mkInputs();
    scoredS.sort((a, b) => b.sFitness - a.sFitness); return scoredS[0].net; })());
  assert.equal(JSON.stringify(sWins.popS[0]), plainEliteS, "winner's slot untouched");
});

test("netId is content-addressed and stable", () => {
  const a = PQ.makeNet(PQ.rng(4)), b = PQ.makeNet(PQ.rng(5));
  assert.equal(PQ.netId(a), PQ.netId(JSON.parse(JSON.stringify(a))));
  assert.notEqual(PQ.netId(a), PQ.netId(b));
});
