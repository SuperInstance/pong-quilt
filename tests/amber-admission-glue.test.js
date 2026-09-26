// R34 amber-admission pins (FAIL-first: on origin/main the admission sentence
// exists as THREE literal copies — 'data absent' appears 3× in index.html —
// so the single-source pins trip loudly there).
// Seam: index.html const amberAdmission + the three degrade sites that call it
// (renderCoinJournal's in-renderer branch, coinJournalUnavailable,
// coevStripUnavailable), all extracted VERBATIM.
// Why pins: R32's P4 — three copies of the honesty sentence, already drifted
// in their parentheticals. The parenthetical is per-cause by spec; the stem
// must be one copy by construction, never by discipline.
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');

const SRC = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function extractAdmissionDef() {
  const anchor = 'const amberAdmission = (what, cause) =>';
  const at = SRC.indexOf(anchor);
  assert.notStrictEqual(at, -1, 'amberAdmission definition absent on this tip');
  const tail = SRC.slice(at);
  return tail.slice(0, tail.indexOf('\n'));
}

function extractFn(anchor) {
  const at = SRC.indexOf(anchor);
  assert.notStrictEqual(at, -1, `${anchor} absent on this tip`);
  const tail = SRC.slice(at);
  // brace-count to the matching close (strings/comments in these instruments
  // carry no braces; the R28 comment block sits above the anchor).
  let depth = 0, end = -1;
  for (let i = 0; i < tail.length; i++) {
    const c = tail[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  assert.notStrictEqual(end, -1, 'function close not found');
  return tail.slice(0, end);
}

function driveWithCtx(fnSource, returnName, args) {
  const calls = { texts: [], styles: [] };
  const ctx = {
    set fillStyle(v) { calls.styles.push(v); },
    get fillStyle() { return calls.styles[calls.styles.length - 1]; },
    fillRect: () => {},
    fillText: (t, x, y) => calls.texts.push({ t, x, y, style: calls.styles[calls.styles.length - 1] }),
    font: '10px monospace',
  };
  // the unavailable instruments resolve their canvas via the page's $('id')
  // helper — inject a stub bound to the recording ctx.
  const fn = new Function('__ctx', extractAdmissionDef() +
    '\nconst $ = () => ({ getContext: () => __ctx });\n' +
    fnSource + `\nreturn ${returnName};`)(ctx);
  fn(ctx, ...args); // instruments that take no params ignore the ctx arg
  return calls;
}

test('ONE source: the admission stem exists exactly once; all three sites call it', () => {
  // count in code only — // comment lines may quote the vocabulary
  const code = SRC.split('\n').filter((l) => !l.trimStart().startsWith('//')).join('\n');
  const stemHits = code.split('data absent').length - 1;
  const tailHits = code.split('instrument ships, admits it').length - 1;
  assert.strictEqual(stemHits, 1, `admission stem copied ${stemHits}× — single source violated (R32 P4 drift class)`);
  assert.strictEqual(tailHits, 1, `admission tail copied ${tailHits}× — single source violated`);
  const callSites = code.split('amberAdmission(').length - 1;
  assert.strictEqual(callSites, 3, `expected 3 call sites (renderer degrade + coin unavailable + coev unavailable), found ${callSites}`);
});

test('byte-equality: all three rendered stems come from the one source (parenthetical per-cause)', () => {
  const amberAdmission = new Function(extractAdmissionDef() + '\nreturn amberAdmission;')();
  const coinUnavailable = driveWithCtx(extractFn('function coinJournalUnavailable() {'), 'coinJournalUnavailable', []);
  assert.strictEqual(coinUnavailable.texts[0].t,
    amberAdmission('coin journal', 'serve over http, not file://'),
    'coinJournalUnavailable must render exactly what the source builds');
  const coevUnavailable = driveWithCtx(extractFn('function coevStripUnavailable() {'), 'coevStripUnavailable', []);
  assert.strictEqual(coevUnavailable.texts[0].t,
    amberAdmission('coev ledger', 'checkpoints/coev.js not loaded — serve over http'),
    'coevStripUnavailable must render exactly what the source builds');
  // stem = everything before the per-cause parenthetical; tail = after it.
  // Both must be byte-identical across the two instruments' renders.
  const stemOf = (s) => s.slice(0, s.indexOf('('));
  const tailOf = (s) => s.slice(s.lastIndexOf(')') + 1);
  assert.strictEqual(stemOf(coinUnavailable.texts[0].t), stemOf(amberAdmission('coin journal', 'X')),
    'stem must come from the source, not be re-typed at the site');
  assert.strictEqual(tailOf(coinUnavailable.texts[0].t), tailOf(coevUnavailable.texts[0].t),
    'tails byte-drifted between coin and coev instruments');
  assert.strictEqual(coinUnavailable.texts[0].style, '#d29922', 'amber, not the grey audit color');
  assert.strictEqual(coevUnavailable.texts[0].style, '#d29922', 'amber, not the grey audit color');
});

test('renderer degrade path still admits via the same source (R28 vocabulary preserved)', () => {
  const amberAdmission = new Function(extractAdmissionDef() + '\nreturn amberAdmission;')();
  const calls = driveWithCtx(extractFn('function renderCoinJournal(ctx, tiebreaks, gens) {'), 'renderCoinJournal', [null, 0]);
  assert.strictEqual(calls.texts[0].t, amberAdmission('coin journal', 'journal missing/empty'),
    'renderer degrade sentence must be the source-built one');
  assert.strictEqual(calls.texts[0].style, '#d29922', 'amber admission');
  assert.strictEqual(calls.texts.length, 1, 'no fake ticks on an absent journal');
});
