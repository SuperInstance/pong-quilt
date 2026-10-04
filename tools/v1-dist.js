// Round 87 — the v1 baseline distribution as a GENERATED artifact
// (R87 spec item 1, 3rd carrying, first build).
//
// Why this exists: PLAYLOG entries hand-typed the v1 draw tally table every
// round — the 23rd exercise of that discipline. The R76 ledger-over-prose
// lesson (counts live in the file, not in words) applies to the TABLE BODY
// too: research/v1-distribution.json is recomputed from
// research/v1-draws.jsonl by THIS tool, and PLAYLOG entries cite the
// artifact instead of re-typing distributions. The banding rule ships as
// data inside the artifact (bandGap) so prose never re-states it.
//
// Usage: node tools/v1-dist.js            # regenerate the artifact in place
//        const { loadLedger, computeDistribution, renderArtifact } = require("./tools/v1-dist.js")
//
// Receipt line (stdout): OK (N draws, M value-tallied — research/v1-distribution.json regenerated)

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LEDGER = path.join(ROOT, "research", "v1-draws.jsonl");
const OUT = path.join(ROOT, "research", "v1-distribution.json");
const LEVELS = ["L0", "L1", "L2"];
// Banding rule (stated in the artifact, never in prose): maximal runs of
// distinct fitness values whose adjacency gap exceeds BAND_GAP.
const BAND_GAP = 1000;

function loadLedger(ledgerPath = LEDGER) {
  return fs.readFileSync(ledgerPath, "utf8").trim().split("\n")
    .filter(Boolean).map(l => JSON.parse(l));
}

function computeDistribution(rows) {
  const valued = rows.filter(r => r.L0 && r.L0.fitness != null);
  const levels = {};
  for (const lv of LEVELS) {
    const tally = {};
    const hitsArr = [];
    for (const r of valued) {
      const f = r[lv].fitness;
      tally[f] = (tally[f] || 0) + 1;
      if (r[lv].hits != null) hitsArr.push(r[lv].hits);
    }
    const values = Object.keys(tally).map(Number).sort((a, b) => a - b)
      .map(f => ({ fitness: f, count: tally[f] }));
    const gaps = values.slice(1).map((v, i) =>
      ({ from: values[i].fitness, to: v.fitness, size: v.fitness - values[i].fitness }));
    const maxGap = gaps.reduce((m, g) => (g.size > (m ? m.size : -1) ? g : m), null);
    const bands = [];
    let cur = [values[0]];
    for (const v of values.slice(1)) {
      if (v.fitness - cur[cur.length - 1].fitness > BAND_GAP) { bands.push(cur); cur = [v]; }
      else cur.push(v);
    }
    if (cur.length) bands.push(cur);
    levels[lv] = {
      tally,
      values,
      bands: bands.map(b => ({ span: [b[0].fitness, b[b.length - 1].fitness], members: b })),
      maxGap,
      spread: {
        fitnessMin: values[0].fitness,
        fitnessMax: values[values.length - 1].fitness,
        hitsMin: Math.min(...hitsArr),
        hitsMax: Math.max(...hitsArr),
      },
    };
  }
  return {
    source: "research/v1-draws.jsonl",
    generatedBy: "tools/v1-dist.js",
    rule: "tally over value-tallied rows (fitness non-null); bands = maximal runs of distinct fitness values with adjacency gap > bandGap; maxGap = largest adjacency gap",
    bandGap: BAND_GAP,
    draws: rows.length,
    valueTallied: valued.length,
    levels,
  };
}

function renderArtifact(dist) {
  return JSON.stringify(dist, null, 2) + "\n";
}

if (require.main === module) {
  const dist = computeDistribution(loadLedger());
  fs.writeFileSync(OUT, renderArtifact(dist));
  console.log(`OK (${dist.draws} draws, ${dist.valueTallied} value-tallied — research/v1-distribution.json regenerated)`);
}

module.exports = { loadLedger, computeDistribution, renderArtifact, LEVELS, BAND_GAP };
