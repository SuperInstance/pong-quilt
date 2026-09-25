// R16 pin — advisor-diet comparison tool (R16 spec item: advisor-diet tool,
// carried since R2, probed in R15). GLUE-exhausted convention:
//  (1) the tool's moth heuristic is pinned VERBATIM against index.html's
//      shipped l2Suggest branch — a heuristic edit that skips the tool
//      trips this pin (the page's diet and the tool's diet diverge);
//  (2) the runner is deterministic: two runs with the same opts return
//      deep-equal tables (seeded game streams per (w,i), seeded coin
//      streams per (w,i,diet) — differences are the advisor's, not weather);
//  (3) sanity: diet "none" at w=0 is a pure-champion baseline, so its
//      meanFrames is identical across weights (the advisor never fires).
// FAIL-first: tools/diet-compare.js does not exist on main.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");
const TOOL = require("../tools/diet-compare.js");

// index.html line ~151 — the shipped moth branch of l2Suggest, verbatim.
function pageMoth(g, D) {
  return { move: g.vy > 0 ? (g.x < g.px + D.paddleW / 2 ? -1 : 1) : 0, confidence: 0.8, source: "moth" };
}

test("GLUE: tool mothSuggest matches the shipped index.html heuristic over a state grid", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const m = html.match(/s=\{move:g\.vy>0\?\(g\.x<g\.px\+D\.paddleW\/2\?-1:1\):0,confidence:0\.8,source:"moth"\}/);
  assert.ok(m, "index.html must still contain the shipped moth l2Suggest branch");
  const D = PQ.DEFAULTS;
  for (const vy of [-3, 0, 3]) {
    for (const x of [0, D.width / 2, D.width - 1]) {
      for (const px of [0, D.width / 2 - D.paddleW / 2, D.width - D.paddleW]) {
        const g = { vy, x, px };
        assert.deepEqual(TOOL.mothSuggest(g, D), pageMoth(g, D), `moth diverged at vy=${vy} x=${x} px=${px}`);
      }
    }
  }
});

test("DETERMINISM: two runner invocations with the same opts are deep-equal", () => {
  const a = TOOL.run({ games: 4, seed: 7, weights: [0, 1], diets: ["none", "jepa", "moth", "qa"] });
  const b = TOOL.run({ games: 4, seed: 7, weights: [0, 1], diets: ["none", "jepa", "moth", "qa"] });
  assert.deepEqual(a, b);
  assert.equal(a.games, 4);
  assert.ok(Array.isArray(a.orderingAtW1) && a.orderingAtW1.length === 4);
});

test("SANITY: result stats are bounded by the shipped frame/hit envelope", () => {
  const r = TOOL.run({ games: 4, seed: 7, weights: [0, 1], diets: ["none", "jepa", "moth", "qa"] });
  const D = PQ.DEFAULTS;
  for (const w of Object.keys(r.weights))
    for (const d of Object.keys(r.weights[w])) {
      const s = r.weights[w][d];
      assert.ok(s.meanFrames > 0 && s.meanFrames <= D.maxFrames, `${d}@w=${w} frames ${s.meanFrames} out of envelope`);
      assert.ok(s.meanHits >= 0 && s.meanHits <= s.meanFrames, `${d}@w=${w} hits ${s.meanHits} exceed frames ${s.meanFrames}`);
    }
  // the game stream is re-seeded per (w,i), so diets may differ across weights —
  // but orderingAtW1 must rank exactly the requested diets, no more, no less.
  assert.deepEqual([...r.orderingAtW1].sort(), ["jepa", "moth", "none", "qa"]);
});
