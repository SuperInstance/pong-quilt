// Round 38 — the wal-session driver's stone-v1 seal (queue lane: every
// receipt/WAL export lane verifies through quilt-stone stone-v1; pong-quilt
// had the exporter seal (R36) and the prerun seal (R37, parallel PR) but the
// SESSION driver — the real-session half of the WAL lane — still emitted an
// unsealed chain). tools/wal-session.js gains --stone-out PATH: the session
// rows are re-anchored into stone-v1 via wal-export.js's toStoneV1 (exactly
// one dialect in the repo), verified BEFORE the file is written (offline
// mirror always; quilt-stone's OWN stone.mjs via loadStone() when
// QUILT_STONE_DIR names a checkout), any refusal → exit 1, no file, never a
// hand-rolled stand-in presented as stone.
// FAIL-first: on pristine main the seam is absent — the source pin trips, the
// CLI pins find no seal file.
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CLI = path.join(ROOT, 'tools', 'wal-session.js');
const WALX = require('../tools/wal-export.js');

// Strip the runner's context vars (R19 lesson: NODE_TEST_CONTEXT=child-v8
// suppresses a spawned grandchild's stdout).
function cleanEnv(extra) {
  const env = { ...process.env, ...extra };
  delete env.NODE_TEST_CONTEXT;
  delete env.VITEST;
  return env;
}

function runCli(args, extraEnv) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pq-stone-'));
  const out = path.join(tmp, 'session.jsonl');
  const stoneOut = path.join(tmp, 'session.stone.jsonl');
  const argv = [CLI, String(args.seed || 20260926), '--out', out, '--stone-out', stoneOut];
  let r;
  const p = spawnSync(process.execPath, argv,
    { cwd: ROOT, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024, env: cleanEnv(extraEnv) });
  r = { status: p.status, stdout: p.stdout || '', stderr: p.stderr || '' };
  return { ...r, out, stoneOut, tmp };
}

function readJsonl(p) {
  return fs.readFileSync(p, 'utf8').trim().split('\n').map(l => JSON.parse(l));
}

test('seam exists: wal-session.js carries the --stone-out seal lane (FAIL-first: absent on main)', () => {
  const src = fs.readFileSync(CLI, 'utf8');
  assert.ok(src.includes('--stone-out'), 'wal-session.js has no --stone-out flag — the session seal lane is not shipped');
  assert.ok(src.includes('sessionToStoneV1'), 'wal-session.js has no sessionToStoneV1 — the session seal lane is not shipped');
  assert.ok(src.includes('loadStone'), 'the seam never loads quilt-stone\'s OWN verifier — a stand-in could be presented as stone');
});

test('CLI end-to-end: --stone-out writes a stone-v1 chain over the SAME session rows, verified live', () => {
  const r = runCli({ seed: 20260926 });
  assert.equal(r.status, 0, `CLI must exit 0; stderr: ${r.stderr}`);
  assert.ok(fs.existsSync(r.stoneOut), 'seal file must be written on success');
  const seal = readJsonl(r.stoneOut);
  assert.equal(seal[0].kind, 'stone.header');
  assert.equal(seal[0].alg, 'stone-v1');
  // the seal is the receipt OVER the same rows the WAL carries: same payload
  // count (WAL lines = BIND + rows; stone = header + rows), same ops in order
  const wal = readJsonl(r.out);
  assert.equal(seal.length - 1, wal.length - 1,
    'stone payload rows must be the WAL payload rows, one-for-one');
  seal.slice(1).forEach((row, i) => {
    assert.equal(row.op, wal[i + 1].op, `row ${i} op diverges between WAL and seal`);
    assert.equal(row.cell, wal[i + 1].cell, `row ${i} cell diverges between WAL and seal`);
  });
  const mirror = WALX.verifyStoneV1(seal);
  assert.ok(mirror.ok, `seal must verify under the offline mirror: ${JSON.stringify(mirror)}`);
  assert.match(r.stderr, /stone: sealed \d+ session rows/);
});

test('same seed → byte-identical seal (the chain is a receipt, not a nonce)', () => {
  const a = runCli({ seed: 777 });
  const b = runCli({ seed: 777 });
  assert.equal(a.status, 0, a.stderr);
  assert.equal(b.status, 0, b.stderr);
  assert.equal(fs.readFileSync(a.stoneOut, 'utf8'), fs.readFileSync(b.stoneOut, 'utf8'),
    'same seed must re-seal to a byte-identical chain');
});

test('post-write tamper is caught at the exact row by the mirror (content edit, not producer input)', () => {
  const r = runCli({ seed: 20260926 });
  assert.equal(r.status, 0, r.stderr);
  const seal = readJsonl(r.stoneOut);
  const victim = 2; // a payload row, past the header
  seal[victim].args = { ...seal[victim].args, conf: 0.999 }; // post-hash content edit
  const v = WALX.verifyStoneV1(seal);
  assert.equal(v.ok, false, 'tampered seal must NOT verify');
  assert.equal(v.at, victim, 'tamper must be named at the exact row');
  assert.equal(v.why, 'hash mismatch');
});

test('live seam: QUILT_STONE_DIR naming a real quilt-stone checkout receipts the canonical verifier', () => {
  const stoneDir = process.env.QUILT_STONE_DIR || '/root/work/quilt-stone';
  if (!fs.existsSync(path.join(stoneDir, 'stone.mjs'))) {
    // offline abstain, named — never a fake green (wal-doctor-e2e precedent)
    console.log(`SKIP live pin: no quilt-stone checkout at ${stoneDir}`);
    return;
  }
  const r = runCli({ seed: 20260926 }, { QUILT_STONE_DIR: stoneDir });
  assert.equal(r.status, 0, `CLI with live stone must exit 0; stderr: ${r.stderr}`);
  assert.match(r.stderr, /live stone\.mjs verifyChain: ok/,
    'stderr must receipt the canonical verifier when a checkout is named');
});

test('seam-closed honesty: a bogus QUILT_STONE_DIR degrades to a labeled mirror-only receipt, never a fake live line', () => {
  const r = runCli({ seed: 20260926 }, { QUILT_STONE_DIR: '/nonexistent/quilt-stone' });
  assert.equal(r.status, 0, `bogus checkout must not brick the run; stderr: ${r.stderr}`);
  assert.ok(fs.existsSync(r.stoneOut), 'mirror-verified seal is still written when the live seam is closed');
  assert.match(r.stderr, /mirror-only receipt, labeled/);
  assert.doesNotMatch(r.stderr, /live stone\.mjs verifyChain: ok/,
    'a bogus checkout must never produce a live-ok line');
});

test('usage guard: valueless --stone-out -> usage + non-zero, like --out', () => {
  const p = spawnSync(process.execPath, [CLI, '--stone-out'], { cwd: ROOT, encoding: 'utf8',
    env: cleanEnv() });
  assert.notEqual(p.status, 0, 'valueless --stone-out must exit non-zero');
  assert.match(p.stderr || '', /^usage: node tools\/wal-session\.js/);
  assert.match(p.stderr || '', /--stone-out requires a PATH value/);
});
