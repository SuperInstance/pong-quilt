// Round 55 pin — the coev HUD prints the decision cadence the coev game
// ACTUALLY uses. Shipped state (R54 finding 3, re-verified this round):
// draw() rendered `sense 1/${PQ.decisionIntervalAt(champGame)}f` in BOTH modes,
// but C1's stepAdv decides every FIXED D.decisionInterval frames (R50: "C1
// (stepAdv) keeps the fixed decisionInterval cadence by contract"). Measured
// on the verbatim physics: at 2002 frames the HUD read 1/16f while decisions
// landed every 4f — the instrument showed a cadence the game does not use,
// and the projection-cells decision-countdown bar inherited the same drift.
// The physics was fine; the INSTRUMENT lied. Fix: draw() picks the cadence
// per mode — coev prints the fixed D.decisionInterval (annotated "(C1 fixed)"),
// classic keeps the drifting L1 law. Drives draw() VERBATIM (extracted from
// index.html) against stub canvases — no reimplementation.
// FAIL-first: on pristine main the mode pins trip (HUD prints the drifting
// 1/16f in coev mode; bar drains over 16f), green only with the R55 fix.
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');
const PQ = require('../core.js');

function extractDraw() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const anchor = 'function draw(){';
  const at = src.indexOf(anchor);
  assert.notStrictEqual(at, -1, 'draw() anchor absent on this tip');
  const tail = src.slice(at);
  // closes at the champion-ring label fillText line (last statement of draw)
  const end = tail.indexOf('ring ${champRing.size}/${champRing.capacity}`,4,10);}}');
  assert.notStrictEqual(end, -1, 'draw() close not found');
  return tail.slice(0, end + 'ring ${champRing.size}/${champRing.capacity}`,4,10);}}'.length);
}

function makeCtx(calls) {
  return {
    set fillStyle(v) { calls.styles.push(v); },
    get fillStyle() { return calls.styles[calls.styles.length - 1]; },
    set strokeStyle(v) { calls.strokeStyles.push(v); },
    get strokeStyle() { return calls.strokeStyles[calls.strokeStyles.length - 1]; },
    lineWidth: 1, font: '10px monospace',
    fillRect: (x, y, w, h) => calls.rects.push({ x, y, w, h, style: calls.styles[calls.styles.length - 1] }),
    fillText: (t, x, y) => calls.texts.push({ t, x, y }),
    beginPath: () => {}, moveTo: () => {}, lineTo: () => {}, stroke: () => {},
    arc: () => {}, fill: () => {},
  };
}

function drive(mode, frames) {
  const calls = { rects: [], texts: [], styles: [], strokeStyles: [] };
  const gameCtx = makeCtx(calls), cellsCtx = makeCtx(calls);
  const els = {
    mode: { value: mode },
    game: { getContext: () => gameCtx },
    cells: { getContext: () => cellsCtx },
    l2: { value: 'llm' },
    qa: { value: '0' },
    curve: { getContext: () => makeCtx({ rects: [], texts: [], styles: [], strokeStyles: [] }) },
  };
  const $ = (id) => els[id];
  const g = PQ.newAdvGame(PQ.rng(7));
  // advance the game truthfully to `frames` with a real net driving, then
  // keep stepping a fresh serve if it dies — only the frame count matters
  // for the cadence claims, and we never hand-edit game state.
  const net = PQ.makeNet(PQ.rng(11));
  const pick = (q) => q[0] > q[2] ? (q[0] > q[1] ? -1 : 0) : (q[2] > q[1] ? 1 : 0);
  const rr = PQ.rng(13);
  while (g.frames < frames) {
    const alive = PQ.stepAdv(g, pick(PQ.forward(net, PQ.sense(g))), 0, rr);
    if (!alive) break;
  }
  if (g.frames < frames) { // died early; top the counter up on a fresh serve so the probe is deterministic
    while (g.frames < frames) PQ.stepAdv(g, 0, 0, rr);
  }
  const champRing = PQ.makeRing(4);
  champRing.write({ gen: 1, fitness: 100 });
  const fn = new Function('$', 'PQ', 'D', 'champGame', 'champRing', 'qaVis', 'receipts',
    extractDraw() + '\nreturn draw;')($, PQ, PQ.DEFAULTS, g, champRing, null, []);
  fn();
  return { calls, g };
}

function hudText(calls) {
  return calls.texts.find(t => t.t.includes('sense 1/')).t;
}

function decisionBar(calls) {
  // the decision countdown bar is the red (#f85149) filled rect in the cells panel
  return calls.rects.find(r => r.style === '#f85149');
}

test('R55: coev HUD cadence honesty (verbatim draw)', () => {
  const r = drive('coev', 2002);
  const hud = hudText(r.calls);
  assert.match(hud, /sense 1\/4f/,
    `coev HUD must print the fixed D.decisionInterval=4 cadence stepAdv actually uses; got: ${hud}`);
  assert.ok(!/sense 1\/16f/.test(hud),
    `coev HUD printed the drifting L1 law (16f at ~2000f) — the instrument lies about the game's cadence`);
  assert.match(hud, /\(C1 fixed\)/,
    'the annotation names the contract so a viewer watching the never-drifting number reads it as designed, not as a missing escalation');
});

test('R55: the decision-countdown bar drains on the coev cadence too', () => {
  const r = drive('coev', 2002);
  const bar = decisionBar(r.calls);
  assert.ok(bar, 'decision bar must render');
  // at frames=2002: fixed 4f cadence => cd=(4-2)/4=0.5 => h=50; drifting 16f => cd=14/16 => h=87.5
  assert.ok(Math.abs(bar.h - 50) < 1.5,
    `bar height ${bar.h} must reflect the fixed 4f cadence (expect ~50 at frames=2002); ~87.5 means the drifting law leaked into the cells panel`);
});

test('R55: classic mode still prints the drifting L1 law (no regression on the honest lane)', () => {
  const r = drive('classic', 2002);
  const hud = hudText(r.calls);
  assert.match(hud, /sense 1\/16f/,
    `classic mode uses decisionIntervalAt (drifting) — the L1 lane must keep printing it; got: ${hud}`);
  assert.ok(!/\(C1 fixed\)/.test(hud), 'classic lane must not carry the C1 annotation');
});
