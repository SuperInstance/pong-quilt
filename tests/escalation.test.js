// R50 escalation pins — difficulty grows over time so a perfect-reaction
// oracle ALWAYS eventually loses, forcing prediction of the ball's eventual
// position. FAIL-first: this file is RED on the pre-R50 core (no accel /
// growing decision interval / shrinking paddle / swanGrow in DEFAULTS).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const PQ = require("../core.js");

// Deterministic probe game: ball drifting UP (away from the paddle line),
// no swans, scripted zero action. Returns the live game state.
function probeGame(seed) {
  const g = PQ.newGame(PQ.rng(seed));
  g.x = 0.5; g.y = 0.5; g.vx = 0; g.vy = -0.5; // vertical rise: no paddle line, no side drift
  g.px = 0.42; g.hold = 0;
  return g;
}
function withD(patch, fn) { // mutate DEFAULTS for the probe, restore after
  const saved = {};
  for (const k of Object.keys(patch)) { saved[k] = PQ.DEFAULTS[k]; PQ.DEFAULTS[k] = patch[k]; }
  try { return fn(); } finally { for (const k of Object.keys(patch)) PQ.DEFAULTS[k] = saved[k]; }
}

test("OFF-law byte regression: escalation-off reproduces the pre-R50 physics exactly", () => {
  withD({ swanP: 0, accel: 0, hitBoost: 1, shrink: 1, decisionDrift: 0, swanGrow: 1, maxSpeedMul: Infinity }, () => {
    const g = probeGame(11), rand = PQ.rng(99);
    const ramp = PQ.DEFAULTS.ramp;
    // local mirror of the PRE-R50 law (the expectation, not the implementation)
    let expectSpeed = 1;
    for (let f = 1; f <= 400; f++) {
      const stepSpeedPreReset = g.speedMul; // moved-at speed for this frame
      const ok = PQ.step(g, 0, rand);
      assert.equal(ok, true);
      // pre-R50: speedMul = 1 + frames*ramp (reset each frame); hits stay 0 here
      expectSpeed = 1 + (f - 1) * ramp; // law ran with frames = f-1, then frames became f
      assert.equal(g.speedMul, expectSpeed, `frame ${f} speedMul follows the old linear law`);
      assert.equal(g.maxSeen, Math.max(1, stepSpeedPreReset), `frame ${f} moved-at sample`);
      assert.equal(g.frames, f);
    }
  });
});

test("accel is real: speedMul follows min((1+frames*ramp)*hitBoost^hits + accel*frames^2, maxSpeedMul)", () => {
  withD({ swanP: 0, hitBoost: 1, shrink: 1, decisionDrift: 0, swanGrow: 1, accel: 8e-7, maxSpeedMul: 6 }, () => {
    const g = probeGame(7), rand = PQ.rng(5);
    const ramp = PQ.DEFAULTS.ramp;
    for (let f = 1; f <= 3000; f++) {
      PQ.step(g, 0, rand);
      const expected = Math.min(1 + (f - 1) * ramp + 8e-7 * (f - 1) * (f - 1), 6);
      assert.equal(g.speedMul, expected, `frame ${f} quadratic law`);
    }
    assert.equal(g.speedMul, 6, "cap reached by frame 3000 (accel alone gets there)");
  });
});

test("speed grows superlinearly: mid-game delta exceeds early-game delta", () => {
  withD({ swanP: 0, hitBoost: 1, shrink: 1, decisionDrift: 0, swanGrow: 1, accel: 8e-7, maxSpeedMul: 6 }, () => {
    const g = probeGame(3), rand = PQ.rng(5);
    const at = {};
    for (let f = 1; f <= 2000; f++) { PQ.step(g, 0, rand); if (f === 500 || f === 1000 || f === 2000) at[f] = g.speedMul; }
    const early = at[1000] - at[500], late = at[2000] - at[1000];
    // quadratic s(f)=k f^2: late delta is 4x the early delta; a LINEAR law
    // sits at exactly 2x — demand 2.5x so float noise can't squeak past
    assert.ok(late > 2.5 * early, `quadratic growth: late delta ${late} > 2.5× early ${early}`);
  });
});

test("effectivePaddle: width shrinks monotonically, floors at paddleMin+2*margin, px stays the left edge", () => {
  withD({ shrink: 0.999, paddleMin: 0.06 }, () => {
    let prevW = Infinity;
    for (const frames of [0, 100, 500, 1000, 2000, 4000, 8000, 20000]) {
      const eff = PQ.effectivePaddle({ px: 0.5, frames });
      const floor = 0.06 + 2 * PQ.EFFECTIVE_MARGIN;
      assert.ok(eff.w <= prevW + 1e-12, `width nonincreasing at frames=${frames}`);
      assert.ok(eff.w >= floor - 1e-12, `width above floor at frames=${frames}`);
      assert.equal(eff.x, 0.5 - PQ.EFFECTIVE_MARGIN, `px is the drawn paddle's left edge at frames=${frames}`);
      prevW = eff.w;
    }
    assert.equal(PQ.effectivePaddle({ px: 0.3, frames: 0 }).w, PQ.DEFAULTS.paddleW + 2 * PQ.EFFECTIVE_MARGIN,
      "continuity: frame 0 is the old static width");
  });
});

test("decisionIntervalAt: nondecreasing, floored at 2, capped at decisionCap", () => {
  const iv = (frames) => PQ.decisionIntervalAt({ frames });
  let prev = 0;
  for (let f = 0; f <= 2000; f += 37) {
    const v = iv(f);
    assert.ok(v >= 2, "floor 2");
    assert.ok(v <= PQ.DEFAULTS.decisionCap, "cap respected");
    assert.ok(v >= prev, "nondecreasing");
    prev = v;
  }
  assert.equal(iv(0), PQ.DEFAULTS.decisionInterval, "base interval at frame 0");
  assert.equal(iv(1000), PQ.DEFAULTS.decisionCap, "cap saturated once frames*drift exceeds it");
});

test("swan probability grows quadratically with speedMul (swanGrow=2)", () => {
  const countKicks = (grow, speedMul, seeds) => withD({ swanP: 0.01, ramp: 0, accel: 0, hitBoost: 1, shrink: 1, decisionDrift: 0, swanGrow: grow, maxSpeedMul: Infinity }, () => {
    let kicks = 0;
    for (let s = 0; s < seeds; s++) {
      const g = probeGame(1000 + s), rand = PQ.rng(s);
      for (let f = 0; f < 400; f++) {
        g.speedMul = speedMul; // re-force: the law resets it to 1 with ramp 0
        PQ.step(g, 0, rand);
        if (Math.abs(g.vx) > 1e-12) { kicks++; g.vx = 0; } // count the kick frame, then re-verticalize
      }
    }
    return kicks;
  });
  const g0 = countKicks(0, 3, 20), g2 = countKicks(2, 3, 20);
  // p0 = 0.01*3 = 0.03 ; p2 = 0.01*9 = 0.09 → expect ≈3×, allow margin
  assert.ok(g2 > 2.2 * g0, `swanGrow=2 multiplies kick rate (got ${g2} vs ${g0})`);
  assert.ok(g0 > 50, "control stream has enough events to be meaningful");
});

// --- the user's ask: a perfect oracle ALWAYS eventually fails ----------------
function interceptX(g) { // reflection-aware x at the ball's next arrival at the paddle row
  if (g.vy <= 0) return 0.5; // moving away: drift to center, return early
  const t = (0.94 - g.y) / g.vy;
  const xi = g.x + g.vx * t;
  const p = ((xi % 2) + 2) % 2;
  return p <= 1 ? p : 2 - p;
}
function oraclePlay(seed, patch, cap) {
  return withD(Object.assign({ swanP: 0 }, patch), () => {
    const g = PQ.newGame(PQ.rng(seed)), rand = PQ.rng(seed * 7 + 1);
    const D = PQ.DEFAULTS;
    while (g.frames < cap) {
      const W = Math.max(D.paddleMin, D.paddleW * Math.pow(D.shrink, g.frames));
      const want = interceptX(g), zoneCenter = g.px + W / 2;
      const act = want < zoneCenter - 1e-9 ? -1 : want > zoneCenter + 1e-9 ? 1 : 0;
      if (!PQ.step(g, act, rand)) return { died: true, frames: g.frames, hits: g.hits };
    }
    return { died: false, frames: g.frames, hits: g.hits };
  });
}
const OFF = { accel: 0, hitBoost: 1, shrink: 1, decisionDrift: 0, maxSpeedMul: Infinity };

test("ORACLE: perfect-intercept oracle ALWAYS dies under escalation (seeds 1..20, swans off; K≥20 per R64 spec item 4)", () => {
  const deaths = [];
  for (let seed = 1; seed <= 20; seed++) {
    const r = oraclePlay(seed, {}, 3000);
    assert.ok(r.died, `seed ${seed}: oracle must die before frame 3000 (got ${r.frames} frames, ${r.hits} hits)`);
    deaths.push(r.frames);
  }
  // R64 spec item 4 (shipped R65): the distribution is PRINTED, never baked —
  // a specific min would over-fit one rng lineage (floors observed across
  // sets: 553 / 376 / 553; R64's bit-identical K=24 ran min 553 / median 695 /
  // max 1055). The pin asserts the law (all 20 die before the cap); the
  // PLAYLOG entry carries the numbers of record for cross-round comparison.
  const sorted = [...deaths].sort((a, b) => a - b);
  const q = (p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
  const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length;
  console.log(`oracle-death distribution seeds 1..20 (cap 3000, swans off): 20/20 dead · ` +
    `min ${sorted[0]} / p25 ${q(0.25)} / median ${q(0.5)} / mean ${mean.toFixed(1)} / p75 ${q(0.75)} / max ${sorted[sorted.length - 1]}`);
});
test("ORACLE control: with escalation off the same oracle survives to the cap", () => {
  for (let seed = 1; seed <= 3; seed++) {
    const r = oraclePlay(seed, OFF, PQ.DEFAULTS.maxFrames);
    assert.ok(!r.died, `seed ${seed}: escalation-off oracle survives to the cap (got ${r.frames})`);
  }
});
test("ORACLE with live black swans also dies (escalation compounds swans)", () => {
  const r = oraclePlay(4, { swanP: PQ.DEFAULTS.swanP }, 3000);
  assert.ok(r.died, `seed 4 with swans: oracle dies (got ${r.frames} frames)`);
});
