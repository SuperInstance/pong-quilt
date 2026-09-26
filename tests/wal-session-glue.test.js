// R26 booked small — session-driver glue pins (the real receipt-panel→WAL
// loop). FAIL-first: tools/wal-session.js is absent on main, so the
// extraction pin trips loudly. Why pins: wal-export.js's demo driver
// hand-writes rows; a WAL that only ever carries demo rows is a demo moat.
// These pins prove the export is fed by a REAL session — core.js step +
// qa.js suggest, the same two modules the browser receipt panel receipts —
// that the session is seeded-deterministic (byte-identical export on re-run,
// a different seed a different chain), that exhaustion is receipted for real
// (pot driven below QA's SIM_POT_FLOOR produces QA-REFUSAL rows from the
// actual seam, not a written-by-hand one), and that tampering with a session
// receipt is caught as hash_mismatch in the doctor's own vocabulary.
'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');

function extractDriver() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'tools', 'wal-session.js'), 'utf8');
  assert.ok(src.includes('function runSession('), 'wal-session.js absent on this tip — the session-fed WAL lane is not shipped');
  return require('../tools/wal-session.js');
}
function extractExporter() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'tools', 'wal-export.js'), 'utf8');
  assert.ok(src.includes('function toQuiltWal('), 'wal-export.js absent — the exporter the driver feeds is not shipped');
  return require('../tools/wal-export.js');
}

test('a real session feeds the WAL — advice, exhaustion, and death all receipted by running', () => {
  const { runSession, sessionToWal } = extractDriver();
  const { verifyQuiltWal } = extractExporter();
  const session = runSession(11, { games: 2, shotsPerBin: 3, maxFramesPerGame: 1500 });
  // pot starts at 3 and depletes 1/advice: the floor (SIM_POT_FLOOR=2) is
  // crossed early, so the qa channel returns null and the seam receipts
  // QA-REFUSAL — produced by the real suggest(), not written by hand.
  assert.ok(session.receipts.length > 0, 'a session must produce receipts');
  assert.ok(session.receipts.some(r => r.kind === 'QA-REFUSAL'),
    'pot driven below SIM_POT_FLOOR must receipt QA-REFUSAL through the real seam');
  assert.ok(session.receipts.some(r => r.kind !== 'QA-REFUSAL' && r.kind !== 'DEATH'),
    'advice rows must carry the advisor source name (qa-sim), not a bare L2');
  const adviceRows = session.receipts.filter(r => r.kind === 'qa-sim');
  for (const r of adviceRows) assert.ok([-1, 0, 1].includes(r.move), 'advice move is a legal action');
  const lines = sessionToWal(session);
  const report = verifyQuiltWal(lines);
  assert.deepEqual(report.divergences, [], 'a real-session WAL must verify clean');
  assert.strictEqual(lines[0].op, 'BIND');
  assert.ok(lines[0].args.source.includes('wal-session.js'), 'genesis BIND names the session driver');
  const linkRows = lines.filter(l => l.op === 'LINK');
  assert.strictEqual(linkRows.length, session.receipts.length,
    'every session receipt lands as one LINK row — none dropped, none invented');
  const kinds = linkRows.map(l => l.args.kind);
  assert.ok(kinds.includes('QA-REFUSAL'), 'the refusal receipt rides the WAL');
});

test('seeded determinism: same seed → byte-identical WAL; different seed → different chain', () => {
  const { runSession, sessionToWal } = extractDriver();
  const { walToJsonl } = extractExporter();
  const a1 = walToJsonl(sessionToWal(runSession(42, { games: 2 })));
  const a2 = walToJsonl(sessionToWal(runSession(42, { games: 2 })));
  assert.strictEqual(a1, a2, 'same seed must replay byte-identically (receipt lineage is reproducible)');
  const b = walToJsonl(sessionToWal(runSession(43, { games: 2 })));
  assert.notStrictEqual(a1, b, 'a different seed is a different session, not a renamed one');
});

test('tampering with a session receipt is named hash_mismatch, in the doctor vocabulary', () => {
  const { runSession, sessionToWal } = extractDriver();
  const { verifyQuiltWal } = extractExporter();
  const lines = sessionToWal(runSession(7, { games: 1 }));
  const tampered = JSON.parse(JSON.stringify(lines));
  const link = tampered.find(l => l.op === 'LINK');
  link.args.conf = 0.99; // a laundered confidence, no re-chain
  const r = verifyQuiltWal(tampered);
  assert.strictEqual(r.ok, false);
  const seqs = r.divergences.filter(d => d.why === 'hash_mismatch').map(d => d.seq);
  assert.ok(seqs.includes(link.seq), 'the tampered row is caught at its own seq');
});

test('honest panel bound: a long session admits its evictions in a VIEW row, never laundered', () => {
  const { runSession, sessionToWal } = extractDriver();
  // enough advice events to exceed the page panel's 40-row bound
  const session = runSession(5, { games: 3, shotsPerBin: 32, maxFramesPerGame: 4000 });
  assert.ok(session.receipts.length > 40, 'session must exceed the 40-row panel bound for this pin');
  const lines = sessionToWal(session);
  const evict = lines.find(l => l.op === 'VIEW' && l.cell === 'pq/projection/eviction');
  assert.ok(evict, 'eviction VIEW row must exist when the ledger exceeds the panel bound');
  assert.strictEqual(evict.args.evicted, session.receipts.length - 40);
  assert.strictEqual(evict.args.shown, 40);
  const sess = lines.find(l => l.cell === 'pq/projection/session');
  assert.ok(sess, 'session VIEW row always present');
  assert.strictEqual(sess.args.advice + sess.args.refusals, session.receipts.length - sess.args.deaths,
    'advice + refusals + deaths = every receipt — the projection accounts for all of them');
});

test('CLI driver runs end-to-end and self-verifies (exit 0, report on stderr, JSONL on stdout)', () => {
  const { execFileSync } = require('node:child_process');
  const out = execFileSync(process.execPath,
    [path.join(__dirname, '..', 'tools', 'wal-session.js'), '99'], { encoding: 'utf8' });
  const lines = out.trim().split('\n').map(l => JSON.parse(l));
  const { verifyQuiltWal } = extractExporter();
  assert.deepEqual(verifyQuiltWal(lines).divergences, []);
  assert.strictEqual(lines[0].op, 'BIND');
  assert.ok(lines.some(l => l.op === 'LINK'), 'the CLI export carries real receipt rows');
});
