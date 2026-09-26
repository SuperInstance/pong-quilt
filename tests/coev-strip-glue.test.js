// R25 C1 coev-ledger strip glue pins (FAIL-first: the renderCoevStrip anchor
// is absent on main, so extraction itself trips — loud fail, not silent skip).
// Seam: index.html renderCoevStrip(ctx, rows, gens) — pure renderer extracted
// VERBATIM (top-level function, closes at first line-start '}').
// Why pins: R23 made the classic chain's coin journal visible; R14's second
// chain (the C1 coev ledger in checkpoints/coev.js) had no analogous plot.
// Both chains must be equally visible — a hidden ledger is an unaudited one.
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');

function extractRenderer() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const anchor = 'function renderCoevStrip(ctx, rows, gens) {';
  const at = src.indexOf(anchor);
  assert.notStrictEqual(at, -1, 'renderCoevStrip anchor absent on this tip — coev strip not shipped');
  const tail = src.slice(at);
  const end = tail.indexOf('\n}');
  assert.notStrictEqual(end, -1, 'function close not found');
  return tail.slice(0, end + 2);
}

function drive(rows, gens) {
  const calls = { rects: [], texts: [], styles: [] };
  const ctx = {
    set fillStyle(v) { calls.styles.push(v); },
    get fillStyle() { return calls.styles[calls.styles.length - 1]; },
    fillRect: (x, y, w, h) => calls.rects.push({ x, y, w, h, style: calls.styles[calls.styles.length - 1] }),
    fillText: (t, x, y) => calls.texts.push({ t, x, y, style: calls.styles[calls.styles.length - 1] }),
    font: '10px monospace',
  };
  const fn = new Function(extractRenderer() + '\nreturn renderCoevStrip;')();
  fn(ctx, rows, gens);
  return calls;
}

test('one marker per ledger row, ender-kills brighter than survivor-caps (x = gen axis)', () => {
  const calls = drive([
    { gen: 0, outcome: 'ENDER-KILL' },
    { gen: 60, outcome: 'SURVIVOR-CAP' },
    { gen: 120, outcome: 'ENDER-KILL' },
  ], 120);
  assert.strictEqual(calls.rects.length, 4, 'bg + one tick per ledger row');
  const ticks = calls.rects.slice(1);
  assert.strictEqual(ticks.length, 3);
  assert.deepStrictEqual(ticks.map(t => t.style), ['#f0f6fc', '#238636', '#f0f6fc'],
    'ender-kill = bright tick, survivor-cap = dim green — the pressure signal must differ visually');
  assert.ok(ticks[2].x > ticks[1].x && ticks[1].x > ticks[0].x, 'monotone in gen');
  assert.strictEqual(ticks[0].x, 2, 'gen 0 at left edge');
  assert.strictEqual(ticks[2].x, 358, 'gen == gens at right edge');
});

test('label carries the audit sentence: row count, kill count, cap count, gens', () => {
  const calls = drive([
    { gen: 1, outcome: 'ENDER-KILL' },
    { gen: 2, outcome: 'SURVIVOR-CAP' },
    { gen: 3, outcome: 'SURVIVOR-CAP' },
  ], 120);
  const label = calls.texts.map(t => t.t).join(' ');
  assert.match(label, /3 h2h/);
  assert.match(label, /1 ender-kills/);
  assert.match(label, /2 survivor-caps/);
  assert.match(label, /gens 0-120/);
});

test('unknown outcome class is counted and named, never silently colored (tripwire)', () => {
  const calls = drive([
    { gen: 1, outcome: 'ENDER-KILL' },
    { gen: 2, outcome: 'TIMEOUT' },
  ], 120);
  const ticks = calls.rects.slice(1);
  assert.strictEqual(ticks[1].style, '#d29922', 'an unclassified outcome renders amber — visible, not laundered into a known class');
  const label = calls.texts.map(t => t.t).join(' ');
  assert.match(label, /OTHER:1/, 'the label must name the unclassified rows');
});

test('shipped ledger plots every row from the real checkpoints/coev.js', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'checkpoints', 'coev.js'), 'utf8');
  const marker = 'window.PONG_QUILT_COEV=';
  const json = src.slice(src.lastIndexOf(marker) + marker.length).replace(/;\s*$/, '');
  const cp = JSON.parse(json);
  const calls = drive(cp.ledger, cp.gens);
  assert.strictEqual(cp.ledger.length, cp.gens + 1, 'the artifact carries the full chain, nothing evicted');
  assert.strictEqual(calls.rects.length - 1, cp.ledger.length, 'every ledger row gets a tick');
  const kills = cp.ledger.filter(r => r.outcome === 'ENDER-KILL').length;
  const label = calls.texts.map(t => t.t).join(' ');
  assert.match(label, new RegExp(`${cp.ledger.length} h2h · ${kills} ender-kills`));
});

// the R23 axis lesson, applied at birth: the axis derives from the DATA,
// not the gens header — a missing header must not push every tick
// off-canvas while the label still counts them.
test('axis is derived from data: missing gens header cannot push ticks off-canvas', () => {
  const calls = drive([
    { gen: 10, outcome: 'SURVIVOR-CAP' },
    { gen: 200, outcome: 'ENDER-KILL' },
  ], 0); // header claims gens=0 / absent
  const ticks = calls.rects.slice(1);
  assert.strictEqual(ticks.length, 2);
  for (const t of ticks) assert.ok(t.x >= 0 && t.x < 360, `tick at x=${t.x} must be on-canvas`);
  assert.ok(ticks[1].x > ticks[0].x, 'monotone in gen even without header gens');
  assert.strictEqual(ticks[1].x, 358, 'max-gen tick pins the right edge from data');
});
