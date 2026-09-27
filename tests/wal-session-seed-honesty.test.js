'use strict';
// Round 43 — wal-session seed honesty (R40 playtest finding 3, the P3 class):
// an EXPLICIT seed of 0 was silently collapsed into the default (20260926)
// by `parseInt(arg, 10) || 20260926` — the exact "never silently default the
// seed" lie the R33 usage guard was built to end, one falsy value away from
// the guarded cases. Post-R43: 0 is a real seed (PQ.rng(0) is a valid LCG
// stream, verified live), and a non-integer seed is a USAGE error (exit 2 +
// usage naming the arg), never a silent default.
const test = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { parseCliArgs } = require('../tools/wal-session.js');

const CLI = path.join(__dirname, '..', 'tools', 'wal-session.js');

function runCli(args) {
  // spawnSync, not execFileSync: the verify report + session stats go to
  // STDERR even on exit 0, and both streams must be captured on every path.
  const r = spawnSync(process.execPath, [CLI, ...args],
    { stdio: ['ignore', 'pipe', 'pipe'] });
  return { code: r.status, stdout: (r.stdout || '').toString(),
           stderr: (r.stderr || '').toString() };
}

test('seed honesty: explicit 0 is honored, not falsy-collapsed to the default', () => {
  const p = parseCliArgs(['0']);
  assert.ok(!p.error, 'seed 0 must parse, got usage error: ' + p.error);
  assert.strictEqual(p.seed, 0, 'seed 0 collapsed to ' + p.seed + ' — the R40 finding 3 bug');
});

test('seed honesty: non-integer seed is a usage error naming the arg, never a silent default', () => {
  const p = parseCliArgs(['abc']);
  assert.ok(p.error, 'non-integer seed silently defaulted to ' +
    JSON.stringify(p.seed) + ' — the same collapse class as seed 0');
  assert.match(p.error, /abc/, 'usage names the offending seed');
});

test('seed honesty: real CLI run with seed 0 reports stats.seed 0 and a seed-0 genesis', () => {
  const r = runCli(['0']);
  assert.strictEqual(r.code, 0, 'seed-0 run must exit 0: ' + r.stderr);
  const report = JSON.parse(r.stderr.trim().split('\n').pop());
  assert.strictEqual(report.stats.seed, 0,
    'the played session claims seed ' + report.stats.seed + ' — collapse live in the CLI path');
  const genesis = r.stdout.split('\n').filter(Boolean)[0];
  assert.match(genesis, /seed 0,/,
    'WAL genesis must name the seed that was actually played: ' + genesis);
  assert.doesNotMatch(genesis, /seed 20260926/,
    'genesis names the DEFAULT seed for an explicit 0 — the session is not the one requested');
});

test('seed honesty: seed 0 and the default produce different sessions (no laundering by collapse)', () => {
  const a = runCli(['0']);
  const b = runCli([]);
  assert.strictEqual(a.code, 0, 'seed-0 run must exit 0: ' + a.stderr);
  assert.strictEqual(b.code, 0, 'default run must exit 0: ' + b.stderr);
  assert.notStrictEqual(a.stdout, b.stdout,
    'explicit seed 0 and the default emitted identical sessions — one of them is lying');
});

test('seed honesty: guarded forms from R33 are unchanged (regression rail)', () => {
  assert.deepStrictEqual(parseCliArgs([]), { seed: 20260926, outPath: null, stoneOutPath: null });
  assert.deepStrictEqual(parseCliArgs(['7']), { seed: 7, outPath: null, stoneOutPath: null });
  assert.deepStrictEqual(parseCliArgs(['0', '--out', '/tmp/x.jsonl']),
    { seed: 0, outPath: '/tmp/x.jsonl', stoneOutPath: null });
  const r = runCli(['abc']);
  assert.strictEqual(r.code, 2, 'non-integer seed exits 2 like every other usage error, got ' + r.code);
  assert.match(r.stderr, /^usage: node tools\/wal-session\.js/);
});
