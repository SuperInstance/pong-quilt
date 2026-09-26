// R26 — WAL export in the fleet five-opcode quilt shape (the quilt-doctor
// consumer lane). The page's receipt panel and makeLedger chain with the
// page hash (hash8, h*31 — a panel display hash, never claimed otherwise).
// quilt-doctor's substrate (SuperInstance/quilt-doctor quilt_doctor/substrate.py,
// canonical producer SuperInstance/git-agent PR #1's quilt_emit) speaks the
// fleet WAL: BIND/LINK/VIEW lines, fnv1a-64 chained, replayable. This tool
// re-anchors any row list into THAT shape, so the doctor's own verify() can
// consume pong-quilt's receipts without a bespoke adapter. Live cross-tool
// receipt (Round 26 PLAYLOG): the export is verified by quilt_doctor's own
// QuiltSubstrate.verify() run against the emitted file. Weight law: a merged
// quilt-doctor PR consuming this export and citing pong-quilt = candidate
// VERIFIED referral edge pq -> quilt-doctor.
'use strict';

// fnv1a-64, exactly as quilt_doctor/substrate.py implements it
// (FNV_OFFSET 0xcbf29ce484222325, PRIME 0x100000001b3, %016x).
function fnv1a64(s) {
  // BigInt: the prime 0x100000001b3 is 40 bits — Math.imul would truncate it.
  let h = 0xcbf29ce484222325n;
  for (let i = 0; i < s.length; i++) {
    h = ((h ^ BigInt(s.charCodeAt(i))) * 0x100000001b3n) & 0xffffffffffffffffn;
  }
  return h.toString(16).padStart(16, '0');
}

// Python json.dumps(sort_keys=True, separators=(",",":")) equivalent:
// keys sorted at EVERY nesting level, no whitespace.
function canonical(d) {
  if (d === null || typeof d !== 'object') return JSON.stringify(d);
  if (Array.isArray(d)) return '[' + d.map(canonical).join(',') + ']';
  const keys = Object.keys(d).sort();
  return '{' + keys.map(k => JSON.stringify(k) + ':' + canonical(d[k])).join(',') + '}';
}

// The five WAL opcodes, vendored by name from the spine
// (git-agent PR #1's quilt_emit — the third VERIFIED edge's target).
const OPS = ['BIND', 'LINK', 'VIEW'];

// rows: [{op, cell, args}, ...] — op must be one of OPS.
// meta: {tool, source} — lands in the BIND genesis row's args.
// Returns the hash-chained line list, exactly the key shape
// {args, cell, hash, op, prev_hash, seq} quilt_doctor/substrate.py writes.
function toQuiltWal(meta, rows) {
  const lines = [];
  const all = [{ op: 'BIND', cell: 'pq/session', args: { tool: meta.tool, source: meta.source } }]
    .concat(rows.map(r => {
      if (!OPS.includes(r.op)) throw new Error('unknown WAL op: ' + r.op);
      return { op: r.op, cell: r.cell, args: r.args };
    }));
  for (let seq = 0; seq < all.length; seq++) {
    const line = { op: all[seq].op, cell: all[seq].cell, args: all[seq].args,
                   seq, prev_hash: seq === 0 ? '0'.repeat(16) : lines[seq - 1].hash };
    line.hash = fnv1a64(canonical(line));
    lines.push(line);
  }
  return lines;
}

// The consumer's verify(), mirrored line-for-line from
// quilt_doctor/substrate.py QuiltSubstrate.verify() — hash_mismatch /
// chain_break / seq_gap divergences, so a pin can prove our export fails
// the doctor's checks exactly when tampered, in the doctor's own vocabulary.
function verifyQuiltWal(lines) {
  let prevHash = '0'.repeat(16);
  const divergences = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const { hash, ...rest } = line;
    if (line.hash !== fnv1a64(canonical(rest)))
      divergences.push({ seq: i, why: 'hash_mismatch' });
    if (line.prev_hash !== prevHash)
      divergences.push({ seq: i, why: 'chain_break' });
    if (line.seq !== i)
      divergences.push({ seq: i, why: 'seq_gap' });
    prevHash = line.hash;
  }
  return { ok: divergences.length === 0, divergences, lines: lines.length };
}

function walToJsonl(lines) {
  // json.dumps(line, sort_keys=True) equivalent — the replacer-array trick
  // would whitelist NESTED keys too and silently drop args fields; canonical()
  // sorts every level and keeps everything.
  return lines.map(l => canonical(l)).join('\n') + '\n';
}

module.exports = { fnv1a64, canonical, toQuiltWal, verifyQuiltWal, walToJsonl, OPS };

// CLI: node tools/wal-export.js — demo driver, exports the page's demo
// receipt kinds as a doctor-consumable WAL and self-verifies it.
if (require.main === module) {
  const lines = toQuiltWal(
    { tool: 'pong-quilt', source: 'tools/wal-export.js demo driver (Round 26)' },
    [
      { op: 'LINK', cell: 'pq/receipt', args: { kind: 'L2', move: 1, conf: 0.42, gen: 0 } },
      { op: 'LINK', cell: 'pq/receipt', args: { kind: 'DEATH', move: 0, conf: 0, gen: 3 } },
      { op: 'LINK', cell: 'pq/receipt', args: { kind: 'QA-REFUSAL', move: 0, conf: 0, gen: 3 } },
      { op: 'VIEW', cell: 'pq/projection/eviction', args: { shown: 3, evicted: 41 } },
    ]);
  const report = verifyQuiltWal(lines);
  process.stdout.write(walToJsonl(lines));
  console.error(JSON.stringify(report));
  if (!report.ok) process.exit(1);
}
