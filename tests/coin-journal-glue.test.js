// R23 coin-journal strip glue pins (FAIL-first: the renderCoinJournal anchor is
// absent on main, so extraction itself trips — loud fail, not silent skip).
// Seam: index.html renderCoinJournal(ctx, tiebreaks, gens) — pure renderer
// extracted VERBATIM (top-level function, closes at first line-start '}').
// Why pins: the experiment owns a 182-flip quantum-coin journal (R22 made it
// symmetric) that the page never showed. The strip is the mutation-rate
// signal; a swap-heavy epoch should be visible next to the fitness curve.
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');

function extractRenderer() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const anchor = 'function renderCoinJournal(ctx, tiebreaks, gens) {';
  const at = src.indexOf(anchor);
  assert.notStrictEqual(at, -1, 'renderCoinJournal anchor absent on this tip — strip not shipped');
  const tail = src.slice(at);
  const end = tail.indexOf('\n}');
  assert.notStrictEqual(end, -1, 'function close not found');
  return tail.slice(0, end + 2);
}

function drive(tiebreaks, gens) {
  const calls = { rects: [], texts: [], styles: [] };
  const ctx = {
    set fillStyle(v) { calls.styles.push(v); },
    get fillStyle() { return calls.styles[calls.styles.length - 1]; },
    fillRect: (x, y, w, h) => calls.rects.push({ x, y, w, h, style: calls.styles[calls.styles.length - 1] }),
    fillText: (t, x, y) => calls.texts.push({ t, x, y, style: calls.styles[calls.styles.length - 1] }),
    font: '10px monospace',
  };
  const fn = new Function(extractRenderer() + '\nreturn renderCoinJournal;')();
  fn(ctx, tiebreaks, gens);
  return calls;
}

const CITED = { engine: 'coin-toss-v1', live: false, citation: 'SuperInstance/quilt-quant lab/play.mjs coin-toss-v1' };

test('one marker per flip, swaps brighter than keeps (x = gen axis)', () => {
  const calls = drive([
    { gen: 0, coin: 'H', swap: false, ...CITED },
    { gen: 50, coin: 'T', swap: true, ...CITED },
    { gen: 100, coin: 'H', swap: false, ...CITED },
  ], 100);
  assert.strictEqual(calls.rects.length, 4, 'bg + one tick per flip');
  const ticks = calls.rects.slice(1);
  assert.strictEqual(ticks.length, 3);
  assert.deepStrictEqual(ticks.map(t => t.style), ['#238636', '#f0f6fc', '#238636'],
    'keep = dim green, swap = bright tick — the mutation signal must differ visually');
  assert.ok(ticks[2].x > ticks[1].x && ticks[1].x > ticks[0].x, 'monotone in gen');
  assert.strictEqual(ticks[0].x, 2, 'gen 0 at left edge');
  assert.strictEqual(ticks[2].x, 358, 'gen == gens at right edge');
});

test('label carries the audit sentence: counts, swaps, live:false', () => {
  const calls = drive([
    { gen: 1, coin: 'H', swap: false, ...CITED },
    { gen: 2, coin: 'T', swap: true, ...CITED },
  ], 260);
  const label = calls.texts.map(t => t.t).join(' ');
  assert.match(label, /2 flips/);
  assert.match(label, /1 swaps/);
  assert.match(label, /live:false throughout/, 'mock coin never laundered as live entropy');
  assert.doesNotMatch(label, /LIVE:/);
});

test('label SCREAMS if a live moth flip ever appears (anti-laundering tripwire)', () => {
  const calls = drive([
    { gen: 1, coin: 'H', swap: false, ...CITED, live: true },
  ], 260);
  const label = calls.texts.map(t => t.t).join(' ');
  assert.match(label, /LIVE:1 \(moth engine!\)/, 'a real moth flip must be named, never silent');
});

test('shipped journal plots 182 flips / 89 swaps from the real curve.json', () => {
  const d = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'checkpoints', 'curve.json'), 'utf8'));
  const calls = drive(d.tiebreaks, d.gens);
  assert.strictEqual(calls.rects.length - 1, 182, 'real journal: every flip gets a tick');
  assert.strictEqual(d.tiebreaks.filter(t => t.swap).length, 89);
  const label = calls.texts.map(t => t.t).join(' ');
  assert.match(label, /182 flips · 89 swaps/);
});

// R23 playtest pin (FAIL-first, found by driving the shipped page headless):
// the wiring passes `d.gens || 0`. A curve.json WITHOUT `gens` maps every
// tick off-canvas (Math.max(1,0)=1 → x = 2 + gen*356) while the label still
// counts them — an invisible instrument claiming visibility. The axis must
// be derived from the data, not trusted from the header.
test('axis is derived from data: missing gens header cannot push ticks off-canvas', () => {
  const calls = drive([
    { gen: 10, coin: 'H', swap: false, ...CITED },
    { gen: 200, coin: 'T', swap: true, ...CITED },
  ], 0); // header claims gens=0 / absent
  const ticks = calls.rects.slice(1);
  assert.strictEqual(ticks.length, 2);
  for (const t of ticks) assert.ok(t.x >= 0 && t.x < 360, `tick at x=${t.x} must be on-canvas`);
  assert.ok(ticks[1].x > ticks[0].x, 'monotone in gen even without header gens');
  assert.strictEqual(ticks[1].x, 358, 'max-gen tick derives the right edge from data');
});

// R27 playtest pin (FAIL-first, found by driving the shipped page headless):
// the R23 fix derived the TICK axis from data but left the LABEL reading the
// raw header. gen-200 data under a gens:0 header renders every tick on-canvas
// while the label claims `gens 0-0` — the instrument shows 200 generations
// of mutation signal and reports none. The label must carry the SAME derived
// axis the ticks were plotted against.
test('label carries the derived axis, not the raw header', () => {
  const calls = drive([
    { gen: 10, coin: 'H', swap: false, ...CITED },
    { gen: 200, coin: 'T', swap: true, ...CITED },
  ], 0); // header claims gens=0 / absent
  const label = calls.texts.map(t => t.t).join(' ');
  assert.match(label, /gens 0-200/, `label must name the plotted range, got: ${label}`);
});
