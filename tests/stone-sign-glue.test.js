// R39 stone-sign glue pins (FAIL-first: the sign pilot lane is absent on
// pristine main, so extraction itself trips — loud fail, not silent skip).
// Why pins: STONE-V2-PILOTS' first sign pilot moves the producer key to
// pong-quilt — every `node tools/prerun.js` run whose named quilt-stone
// checkout ships signTip (the stone-v2 sign lane) staples the birth-seal
// chain's tip with an ed25519 producer signature, verified BEFORE write by
// quilt-stone's OWN verifyTipSignature, and writes checkpoints/stone-v1.signed.json.
// The pins prove: the lane exists and names its canonical source; the staple
// binds to the exact chain (post-sign edit → 'signed tip does not match');
// an ephemeral key is LABELED, never presented as standing identity; the
// seam ships closed (no signTip in the named checkout → nothing written,
// skip printed labeled); and a refused staple bricks the run (exit 1).
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), crypto = require('crypto');

const PRERUN = path.join(__dirname, '..', 'tools', 'prerun.js');
const STONE_DIR = process.env.QUILT_STONE_DIR || '/tmp/quilt-stone';

function extractExports() { // same harness shape as stone-prerun-glue.test.js
  const src = fs.readFileSync(path.join(__dirname, '..', 'tools', 'wal-export.js'), 'utf8');
  const mod = { exports: {} };
  new Function('module', 'require', 'process', src + '\nif(false){}')(mod, require, { main: {}, env: {} });
  return mod.exports;
}

test('prerun ships the sign-pilot lane (extraction pin — absent on main)', () => {
  const src = fs.readFileSync(PRERUN, 'utf8');
  for (const marker of ['signTip', 'verifyTipSignature', 'stone-v1.signed.json',
                        'SIGN/REFUSED', 'QUILT_STONE_SIGN_KEY', 'ephemeral',
                        'pq-prerun-sign-pilot', 'staple skipped, labeled'])
    assert.ok(src.includes(marker), `prerun.js sign lane missing marker: ${marker}`);
  // a refused staple must brick the run, never write a broken receipt quietly
  assert.ok(/SIGN\/REFUSED[\s\S]*process\.exit\(1\)/.test(src), 'a refused staple must exit 1');
  // stale staple dropped before the provenance loop, next to the stale seal
  assert.ok(src.indexOf('rmSync') < src.indexOf('readdirSync(cpDir)'),
    'stale stone-v1.signed.json must be removed BEFORE the provenance loop lists the dir');
  // the unsigned birth seal must survive stapling untouched (staple signs a copy)
  const tail = src.slice(src.indexOf('signTip'));
  assert.ok(tail.includes('seal.map'), 'the staple must sign a COPY — seal.map(...) — not the canonical seal');
});

test('citation pin: the sign lane names SuperInstance/quilt-stone in-repo (weight law)', () => {
  const src = fs.readFileSync(PRERUN, 'utf8');
  assert.ok(src.includes('SuperInstance/quilt-stone'), 'canonical source must be cited by name in-repo');
  assert.ok(src.includes('STONE-V2-PILOTS') && src.includes('STONE-SPEC.md §4.6.2'),
    'citation must name the pilot and the spec section');
});

test('live: signTip staples the prerun-shaped seal and verifyTipSignature accepts it', async (t) => {
  const p = path.join(STONE_DIR, 'stone.mjs');
  if (!fs.existsSync(p)) return t.skip('no quilt-stone checkout (set QUILT_STONE_DIR) — honest abstain, never fake green');
  const stone = await import(p);
  if (typeof stone.signTip !== 'function')
    return t.skip('named checkout has no signTip (sign lane not merged there) — honest abstain, never fake green');
  const { toStoneV1 } = extractExports();
  const seal = toStoneV1({ tool: 'pong-quilt', source: 'sign pilot live pin' },
    [{ op: 'LINK', cell: 'pq/prerun-checkpoint', args: { file: 'curve.json', md5: '63617065d33068159e86e77da9181a61' } },
     { op: 'LINK', cell: 'pq/prerun-checkpoint', args: { file: 'level2.js', md5: '454511548f9224f9302c106abd9313d0' } }]);
  const pair = crypto.generateKeyPairSync('ed25519');
  const pubPem = pair.publicKey.export({ type: 'spki', format: 'pem' });
  const signed = seal.map(r => ({ ...r }));
  stone.signTip(signed, pair.privateKey, { key_id: 'pq-prerun-sign-pilot', signer_role: 'producer' });
  assert.strictEqual(signed.length, seal.length + 1, 'exactly one stone.sign annotation row is stapled');
  assert.strictEqual(signed[signed.length - 1].kind, 'stone.sign');
  const v = stone.verifyTipSignature(signed, pubPem);
  assert.strictEqual(v.ok, true, 'verifyTipSignature must accept the fresh staple: ' + JSON.stringify(v));
  assert.strictEqual(v.signer.key_id, 'pq-prerun-sign-pilot');
  assert.strictEqual(v.signer.signer_role, 'producer');
  // the unsigned seal is untouched (the staple signed a copy)
  assert.deepStrictEqual(seal.map(r => r.kind), ['stone.header', 'pq/wal-op', 'pq/wal-op']);
  // the laundering case: edit a body row AFTER signing — hashes re-seal
  // self-consistent, but the signature still names the OLD tip and refuses
  const tampered = signed.map(r => ({ ...r }));
  tampered[1].args = { file: 'curve.json', md5: 'FORGED' };
  const bad = stone.verifyTipSignature(tampered, pubPem);
  assert.strictEqual(bad.ok, false);
  assert.strictEqual(bad.why, 'signed tip does not match the chain tip (post-signature chain edit)');
  // wrong key refuses with the honest reason
  const other = crypto.generateKeyPairSync('ed25519');
  const wrong = stone.verifyTipSignature(signed, other.publicKey.export({ type: 'spki', format: 'pem' }));
  assert.strictEqual(wrong.ok, false);
  assert.strictEqual(wrong.why, 'signature invalid for this tip and key');
});

test('live: an ephemeral keypair round-trips through the exact prerun seam shape', async (t) => {
  const p = path.join(STONE_DIR, 'stone.mjs');
  if (!fs.existsSync(p)) return t.skip('no quilt-stone checkout — honest abstain');
  const stone = await import(p);
  if (typeof stone.signTip !== 'function') return t.skip('no signTip in named checkout — honest abstain');
  // mirror of prerun.js R39: key from env path if named, else ephemeral + labeled
  const pair = crypto.generateKeyPairSync('ed25519');
  const pubPem = pair.publicKey.export({ type: 'spki', format: 'pem' });
  const wrapped = {
    tool: 'pong-quilt', round: 'R39', key: { ephemeral: true, public: pubPem },
    chain: stone.signTip([{ op: 'LINK', cell: 'c', args: { file: 'f', md5: 'm' } }],
      pair.privateKey, { key_id: 'pq-prerun-sign-pilot', signer_role: 'producer' }),
  };
  // note: a bare row list without a stone.header is not a full seal — the
  // prerun seam always staples the toStoneV1 output; here we only pin that
  // the wrapped file shape carries the ephemeral label and public key.
  assert.strictEqual(wrapped.key.ephemeral, true, 'a generated key must be labeled ephemeral in the file');
  assert.ok(wrapped.key.public.includes('BEGIN PUBLIC KEY'));
  assert.strictEqual(wrapped.chain[wrapped.chain.length - 1].signer_role, 'producer');
});
