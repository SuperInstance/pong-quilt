// R45 coev birth-seal pins — prerun-coev.js seals the C1 ledger birth rows
// into a stone-v1 chain, mirror-first exactly like wal-session-stone (R38)
// and prerun's own checkpoint seal (R37). FAIL-first: on pristine main the
// seam is absent, so the extraction pin trips and the committed-artifact pin
// finds no coev-stone-v1.json.
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const COEV = require('../tools/prerun-coev.js');
const WAL = require('../tools/wal-export.js');

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'tools', 'prerun-coev.js');
const ARTIFACT = path.join(ROOT, 'checkpoints', 'coev.js');
const SEAL = path.join(ROOT, 'checkpoints', 'coev-stone-v1.json');
const STONE_DIR = process.env.QUILT_STONE_DIR || '/tmp/quilt-stone';

const sampleRows = [
  { gen: 0, sId: 'aaaaaaaa', eId: 'bbbbbbbb', outcome: 'SURVIVOR-CAP', frames: 1200,
    sFit: 1250, eFit: 5, loserId: null, prev: '0'.repeat(64), hash: '11111111' },
  { gen: 1, sId: 'cccccccc', eId: 'dddddddd', outcome: 'ENDER-KILL', frames: 559,
    sFit: 20, eFit: 5481, loserId: 'cccccccc', prev: '11111111', hash: '22222222' },
  { gen: 2, sId: 'eeeeeeee', eId: 'ffffffff', outcome: 'SURVIVOR-CAP', frames: 6000,
    sFit: 6600, eFit: 10, loserId: 'ffffffff', prev: '22222222', hash: '33333333' },
];

function loadArtifact() {
  const hadWindow = Object.prototype.hasOwnProperty.call(globalThis, 'window');
  const oldWindow = globalThis.window;
  globalThis.window = {};
  delete require.cache[require.resolve(ARTIFACT)];
  require(ARTIFACT);
  const artifact = globalThis.window.PONG_QUILT_COEV;
  if (hadWindow) globalThis.window = oldWindow; else delete globalThis.window;
  return artifact;
}

test('prerun-coev ships the coev birth-seal lane (extraction pin — absent on main)', () => {
  const src = fs.readFileSync(TOOL, 'utf8');
  for (const marker of ['coev-stone-v1.json', 'toStoneV1', 'verifyStoneV1', 'loadStone',
                        'SEAL/REFUSED', 'pq/prerun-coev-birth', 'verify BEFORE write',
                        'SuperInstance/quilt-stone', 'stone.mjs', 'STONE-SPEC.md'])
    assert.ok(src.includes(marker), `prerun-coev.js seal lane missing marker: ${marker}`);
  assert.ok(/process\.exit\(1\)/.test(src), 'a refused seal must exit 1');
  assert.ok(src.indexOf('rmSync') < src.indexOf('const rand = PQ.rng(SEED)'),
    'stale coev-stone-v1.json must be removed BEFORE the run that rewrites coev.js');
});

test('the coev birth seal is the ledger rows one-for-one and verifies clean (mirror)', () => {
  const seal = COEV.buildCoevBirthSeal(sampleRows);
  assert.equal(seal[0].kind, 'stone.header');
  assert.equal(seal[0].alg, 'stone-v1');
  assert.equal(seal[0].genesis, WAL.STONE_GENESIS);
  assert.equal(seal.length, sampleRows.length + 1);
  seal.slice(1).forEach((row, i) => {
    assert.equal(row.kind, 'pq/wal-op');
    assert.equal(row.seq, i + 1);
    assert.equal(row.op, 'LINK');
    assert.equal(row.cell, 'pq/prerun-coev-birth');
    assert.equal(row.args.gen, sampleRows[i].gen);
    assert.equal(row.args.sId, sampleRows[i].sId);
    assert.equal(row.args.eId, sampleRows[i].eId);
    assert.equal(row.args.outcome, sampleRows[i].outcome);
    assert.equal(row.args.hash, sampleRows[i].hash);
    assert.equal(row.args.prev, sampleRows[i].prev);
  });
  const verdict = WAL.verifyStoneV1(seal);
  assert.ok(verdict.ok, `mirror must verify the coev birth seal: ${JSON.stringify(verdict)}`);
});

test('same birth rows seal byte-identically (the chain is a receipt, not a nonce)', () => {
  const a = COEV.buildCoevBirthSeal(sampleRows);
  const b = COEV.buildCoevBirthSeal(sampleRows.map((r) => ({ ...r })));
  assert.equal(JSON.stringify(a), JSON.stringify(b));
});

test('canonical JSON is permutation-invariant for the birth-row args', () => {
  const normal = COEV.buildCoevBirthSeal(sampleRows.slice(0, 1));
  const reversed = COEV.buildCoevBirthSeal([{
    hash: sampleRows[0].hash, prev: sampleRows[0].prev, loserId: sampleRows[0].loserId,
    eFit: sampleRows[0].eFit, sFit: sampleRows[0].sFit, frames: sampleRows[0].frames,
    outcome: sampleRows[0].outcome, eId: sampleRows[0].eId, sId: sampleRows[0].sId,
    gen: sampleRows[0].gen,
  }]);
  assert.deepEqual(reversed.map((r) => r.row_hash), normal.map((r) => r.row_hash),
    'arg key order must not move the stone hashes — canonicalJSON sorts');
});

test('post-write tamper is caught at the exact birth row by the mirror', () => {
  const seal = COEV.buildCoevBirthSeal(sampleRows);
  const victim = 2; // header + gen 0, then gen 1
  seal[victim].args = { ...seal[victim].args, frames: 999999 };
  const bad = WAL.verifyStoneV1(seal);
  assert.equal(bad.ok, false);
  assert.equal(bad.at, victim);
  assert.equal(bad.why, 'hash mismatch');
});

test('committed coev-stone-v1.json receipts the shipped coev.js ledger one-for-one', () => {
  const artifact = loadArtifact();
  assert.ok(artifact && Array.isArray(artifact.ledger), 'checkpoints/coev.js must expose its ledger');
  assert.ok(fs.existsSync(SEAL), 'checkpoints/coev-stone-v1.json must be written at the tip');
  const seal = JSON.parse(fs.readFileSync(SEAL, 'utf8'));
  assert.equal(seal.length, artifact.ledger.length + 1,
    'seal rows must be header + one row per coev ledger birth row');
  seal.slice(1).forEach((row, i) => {
    const birth = artifact.ledger[i];
    assert.equal(row.args.gen, birth.gen, `row ${i + 1} gen diverges from coev.js`);
    assert.equal(row.args.sId, birth.sId, `row ${i + 1} sId diverges from coev.js`);
    assert.equal(row.args.eId, birth.eId, `row ${i + 1} eId diverges from coev.js`);
    assert.equal(row.args.outcome, birth.outcome, `row ${i + 1} outcome diverges from coev.js`);
    assert.equal(row.args.hash, birth.hash, `row ${i + 1} ledger hash diverges from coev.js`);
    assert.equal(row.args.prev, birth.prev, `row ${i + 1} ledger prev diverges from coev.js`);
  });
  const verdict = WAL.verifyStoneV1(seal);
  assert.ok(verdict.ok, `committed coev birth seal must verify: ${JSON.stringify(verdict)}`);
});

test('live: stone.mjs accepts the coev birth-seal shape and localizes tamper in ITS vocabulary', async (t) => {
  const p = path.join(STONE_DIR, 'stone.mjs');
  if (!fs.existsSync(p)) return t.skip('no quilt-stone checkout (set QUILT_STONE_DIR) — honest abstain, never fake green');
  const stone = await import(p);
  const seal = COEV.buildCoevBirthSeal(sampleRows);
  const verdict = stone.verifyChain(seal);
  assert.equal(verdict.ok, true, 'stone.mjs itself must verify the coev birth seal: ' + JSON.stringify(verdict));
  assert.equal(verdict.alg, 'stone-v1');
  assert.equal(verdict.links, seal.length);
  const tampered = seal.map((r) => ({ ...r }));
  tampered[1].args.outcome = 'FORGED';
  const bad = stone.verifyChain(tampered);
  assert.equal(bad.ok, false);
  assert.equal(bad.why, 'hash mismatch');
  assert.equal(bad.firstBadIndex, 1);
});
