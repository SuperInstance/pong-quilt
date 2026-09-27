// R37 stone-prerun glue pins (FAIL-first: the seal lane is absent on pristine
// main, so extraction itself trips — loud fail, not silent skip).
// Why pins: R35's merge-gate lesson ("the stone lens opens on the merge
// gate") moves to birth — every `node tools/prerun.js` run seals the four
// checkpoints it just wrote into checkpoints/stone-v1.json, a stone-v1
// forward chain (SuperInstance/quilt-stone stone.mjs + STONE-SPEC.md §4.6)
// whose rows carry {file, md5}. The pins prove: the lane exists and names
// its canonical source; the seal is deterministic (same md5s → same chain);
// tamper breaks the chain at the exact row; quilt-stone's OWN verifier
// accepts the prerun-shaped seal when a checkout is present (honest skip
// when it is not); and the live seam can never be faked by a stand-in.
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');

const PRERUN = path.join(__dirname, '..', 'tools', 'prerun.js');

function extractExports() { // same harness shape as stone-v1-glue.test.js
  const src = fs.readFileSync(path.join(__dirname, '..', 'tools', 'wal-export.js'), 'utf8');
  const mod = { exports: {} };
  new Function('module', 'require', 'process', src + '\nif(false){}')(mod, require, { main: {}, env: {} });
  return mod.exports;
}

// The canonical external authority (house default; QUILT_STONE_DIR overrides).
const STONE_DIR = process.env.QUILT_STONE_DIR || '/tmp/quilt-stone';

test('prerun ships the birth-seal lane (extraction pin — absent on main)', () => {
  const src = fs.readFileSync(PRERUN, 'utf8');
  for (const marker of ['stone-v1.json', 'toStoneV1', 'verifyStoneV1', 'loadStone',
                        'SEAL/REFUSED', 'pq/prerun-checkpoint', 'verify BEFORE write'])
    assert.ok(src.includes(marker), `prerun.js seal lane missing marker: ${marker}`);
  // refusal must brick the run (exit 1), never write a broken receipt quietly
  assert.ok(/process\.exit\(1\)/.test(src), 'a refused seal must exit 1');
  // stale seal dropped before the provenance loop: the md5 loop must not
  // print a prior run's receipt as if it were this run's artifact
  assert.ok(src.indexOf('rmSync') < src.indexOf('readdirSync(cpDir)'),
    'stale stone-v1.json must be removed BEFORE the provenance loop lists the dir');
});

test('the prerun-shaped seal is deterministic and verifies clean (mirror)', () => {
  const { toStoneV1, verifyStoneV1, STONE_GENESIS } = extractExports();
  const md5s = { 'curve.json': '63617065d33068159e86e77da9181a61',
                 'level0.js': '8a49b0f659b572d5ba6943bcabbbe082',
                 'level1.js': '643bd132d51f3fd2f08c0054b48967ae',
                 'level2.js': '454511548f9224f9302c106abd9313d0' }; // post-R21 line, verify-by-running
  const build = () => toStoneV1(
    { tool: 'pong-quilt', source: 'tools/prerun.js canonical checkpoint seal (Round 37)' },
    Object.keys(md5s).map(f => ({ op: 'LINK', cell: 'pq/prerun-checkpoint', args: { file: f, md5: md5s[f] } })));
  const a = build(), b = build();
  assert.strictEqual(JSON.stringify(a), JSON.stringify(b),
    'same md5s must seal to byte-identical chains — provenance is a function, not a mood');
  assert.strictEqual(a[0].kind, 'stone.header');
  assert.strictEqual(a[0].alg, 'stone-v1');
  assert.strictEqual(a[0].genesis, STONE_GENESIS);
  assert.strictEqual(a.length, 5); // header + 4 checkpoint rows
  assert.deepStrictEqual(verifyStoneV1(a).ok, true);
  // re-keying args must not move the chain (canonicalJSON permutation-invariance)
  const re = toStoneV1({ tool: 'pong-quilt', source: 'tools/prerun.js canonical checkpoint seal (Round 37)' },
    Object.keys(md5s).map(f => ({ op: 'LINK', cell: 'pq/prerun-checkpoint', args: { md5: md5s[f], file: f } })));
  assert.deepStrictEqual(re.map(r => r.row_hash), a.map(r => r.row_hash));
});

test('tamper with one checkpoint md5 breaks the seal at that exact row', () => {
  const { toStoneV1, verifyStoneV1 } = extractExports();
  const seal = toStoneV1({ tool: 'pong-quilt', source: 'pin' },
    [{ op: 'LINK', cell: 'pq/prerun-checkpoint', args: { file: 'curve.json', md5: 'aa' } },
     { op: 'LINK', cell: 'pq/prerun-checkpoint', args: { file: 'level2.js', md5: 'bb' } }]);
  const tampered = seal.map(r => ({ ...r }));
  tampered[2].args = { file: 'level2.js', md5: 'FORGED' }; // row 2 = level2 row
  const bad = verifyStoneV1(tampered);
  assert.strictEqual(bad.ok, false);
  assert.strictEqual(bad.at, 2);
  assert.strictEqual(bad.why, 'hash mismatch');
});

test('live: stone.mjs accepts the prerun-shaped seal and localizes tamper in ITS vocabulary', async (t) => {
  const p = path.join(STONE_DIR, 'stone.mjs');
  if (!fs.existsSync(p)) return t.skip('no quilt-stone checkout (set QUILT_STONE_DIR) — honest abstain, never fake green');
  const { toStoneV1 } = extractExports();
  const stone = await import(p);
  const seal = toStoneV1({ tool: 'pong-quilt', source: 'prerun live pin' },
    [{ op: 'LINK', cell: 'pq/prerun-checkpoint', args: { file: 'curve.json', md5: '63617065d33068159e86e77da9181a61' } },
     { op: 'LINK', cell: 'pq/prerun-checkpoint', args: { file: 'level2.js', md5: '454511548f9224f9302c106abd9313d0' } }]);
  const verdict = stone.verifyChain(seal);
  assert.strictEqual(verdict.ok, true, 'stone.mjs itself must verify the prerun seal: ' + JSON.stringify(verdict));
  assert.strictEqual(verdict.alg, 'stone-v1');
  assert.strictEqual(verdict.links, 3);
  const tampered = seal.map(r => ({ ...r }));
  tampered[1].args.md5 = 'FORGED';
  const bad = stone.verifyChain(tampered);
  assert.strictEqual(bad.ok, false);
  assert.strictEqual(bad.why, 'hash mismatch');
  assert.strictEqual(bad.firstBadIndex, 1);
});

test('citation pin: the seal lane names SuperInstance/quilt-stone in-repo (weight-law PENDING edge)', () => {
  const src = fs.readFileSync(PRERUN, 'utf8');
  assert.ok(src.includes('SuperInstance/quilt-stone'), 'canonical source must be cited by name in-repo');
  assert.ok(src.includes('stone.mjs') && src.includes('STONE-SPEC.md'), 'citation must name the verifier and the spec');
});
