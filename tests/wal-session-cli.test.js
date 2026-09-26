'use strict';
// Round 33 — wal-session CLI usage guard (R28/R32 spec item, the R32-booked
// P4): an unrecognized positional arg or flag, or a valueless --out, must
// print usage to stderr and exit non-zero — never silently default the seed
// and never throw a raw TypeError from fs.writeFileSync(undefined).
const test = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const { parseCliArgs } = require('../tools/wal-session.js');

const CLI = path.join(__dirname, '..', 'tools', 'wal-session.js');

function runCli(args) {
  try {
    const stdout = execFileSync(process.execPath, [CLI, ...args],
      { stdio: ['ignore', 'pipe', 'pipe'] });
    return { code: 0, stdout: stdout.toString(), stderr: '' };
  } catch (e) {
    return { code: e.status, stdout: (e.stdout || '').toString(),
             stderr: (e.stderr || '').toString() };
  }
}

test('usage guard: unrecognized positional arg -> usage on stderr + non-zero exit', () => {
  const r = runCli(['99', 'bogus']);
  assert.notStrictEqual(r.code, 0, 'expected non-zero exit, got 0 (arg silently ignored)');
  assert.match(r.stderr, /^usage: node tools\/wal-session\.js/);
  assert.match(r.stderr, /bogus/, 'usage names the offending arg');
});

test('usage guard: valueless --out -> usage + non-zero, no raw TypeError', () => {
  const r = runCli(['99', '--out']);
  assert.notStrictEqual(r.code, 0, 'expected non-zero exit, got 0 (or a thrown TypeError)');
  assert.match(r.stderr, /^usage: node tools\/wal-session\.js/);
  assert.doesNotMatch(r.stderr, /TypeError/, 'missing-value path must not leak a raw TypeError');
});

test('usage guard: unknown flag -> usage + non-zero', () => {
  const r = runCli(['--bogus']);
  assert.notStrictEqual(r.code, 0);
  assert.match(r.stderr, /^usage: node tools\/wal-session\.js/);
});

test('parseCliArgs unit: valid forms unchanged (defaults, seed, --out placements)', () => {
  assert.deepStrictEqual(parseCliArgs([]), { seed: 20260926, outPath: null });
  assert.deepStrictEqual(parseCliArgs(['7']), { seed: 7, outPath: null });
  assert.deepStrictEqual(parseCliArgs(['--out', '/tmp/x.jsonl']),
    { seed: 20260926, outPath: '/tmp/x.jsonl' });
  assert.deepStrictEqual(parseCliArgs(['7', '--out', '/tmp/x.jsonl']),
    { seed: 7, outPath: '/tmp/x.jsonl' });
  assert.ok(parseCliArgs(['99', 'bogus']).error);
  assert.ok(parseCliArgs(['--out']).error);
  assert.ok(parseCliArgs(['--out', '--out']).error, 'flag as --out value rejected');
});

test('guard does not fence the happy path: valid CLI invocation still exports JSONL', () => {
  const r = runCli(['7']);
  assert.strictEqual(r.code, 0, 'valid invocation must still exit 0: ' + r.stderr);
  assert.ok(r.stdout.split('\n').filter(Boolean).length > 1, 'JSONL lines on stdout');
});
