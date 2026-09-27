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

// ---------------------------------------------------------------------------
// R36 — stone-v1 forward format (SuperInstance/quilt-stone, Task 26-b).
// quilt-stone is THE CANONICAL receipt-chain module: one zero-dep verifier
// (stone.mjs) for every repo chain, 42/42 sibling chains conformance-verified.
// House law over there: "a receipt without a chain is a rumor" — and NEW
// chains MUST write stone-v1: row 0 is a stone.header naming its alg, hash =
// sha256Hex over canonicalJSON([prev, row minus row_hash]), genesis
// 'STONE-GENESIS-1' hashed into row 0 (STONE-SPEC.md §4.6). This lane seals
// the SAME five-opcode WAL rows in the stone-v1 forward shape, so pong-quilt
// receipts are directly consumable by the fleet's canonical verifier.
//
// HONESTY CONTRACT (fleet doctrine, same shape as the doctor seam): the live
// cross-check loads quilt-stone's OWN stone.mjs via loadStone() and only when
// an explicit checkout is named (QUILT_STONE_DIR, or opts.dir). Absent → null
// → consumers skip, NEVER a hand-rolled stand-in presented as stone.
// CITATION (referral edge candidate, PENDING per weight law): canonical
// source = SuperInstance/quilt-stone stone.mjs + STONE-SPEC.md §4.6.
// VERIFIED only when a merged PR in the TARGET repo names this citation.
// ---------------------------------------------------------------------------

const STONE_GENESIS = 'STONE-GENESIS-1';

// stone.mjs canonicalJSON, mirrored verbatim (undefined-valued keys SKIPPED —
// the fleet canonical() above keeps them as undefined→omitted-by-JSON, which
// coincides for our rows but NOT for explicit undefined; the mirror is exact
// so cross-tool hashes can never diverge on a serialization subtlety).
function canonicalStone(d) {
  if (d === null || typeof d !== 'object') return JSON.stringify(d ?? null);
  if (Array.isArray(d)) return '[' + d.map(canonicalStone).join(',') + ']';
  const keys = Object.keys(d).filter(k => d[k] !== undefined).sort();
  return '{' + keys.map(k => JSON.stringify(k) + ':' + canonicalStone(d[k])).join(',') + '}';
}

// sha256Hex is node-only (tools/tests). The page WAL seam (Round 30) is
// unchanged — the browser door never calls the stone-v1 lane.
function sha256Hex(s) {
  if (typeof require !== 'function') throw new Error('stone-v1 sealing is node-only; the page WAL seam is unchanged');
  return require('crypto').createHash('sha256').update(s, 'utf8').digest('hex');
}

// rows: [{op, cell, args}, ...] — the same five-opcode WAL ops as toQuiltWal.
// meta: {tool, source} — lands in the stone.header row (self-describing chain).
// Returns stone-v1 rows: row 0 = {kind:'stone.header', alg, genesis, ...},
// payload rows carry {kind:'pq/wal-op', seq (1-based), op, cell, args}, each
// with row_hash = sha256Hex(canonicalJSON([prev, row minus row_hash])).
function toStoneV1(meta, rows) {
  const header = { kind: 'stone.header', alg: 'stone-v1', genesis: STONE_GENESIS,
                   tool: meta.tool, source: meta.source };
  const body = rows.map((r, i) => {
    if (!OPS.includes(r.op)) throw new Error('unknown WAL op: ' + r.op);
    return { kind: 'pq/wal-op', seq: i + 1, op: r.op, cell: r.cell, args: r.args };
  });
  let prev = STONE_GENESIS;
  return [header].concat(body).map(r => {
    const row = Object.assign({}, r);
    const { row_hash, ...rest } = row; // strip if caller re-seals
    row.row_hash = sha256Hex(canonicalStone([prev, rest]));
    prev = row.row_hash;
    return row;
  });
}

// Offline mirror of stone.mjs verifyChain for the stone-v1 dialect, so pins
// trip without a checkout; the live seam (below) is the receipted authority.
function verifyStoneV1(lines) {
  let prev = STONE_GENESIS;
  for (let i = 0; i < lines.length; i++) {
    const row = lines[i];
    const h = row && row.row_hash;
    if (typeof h !== 'string' || !/^[0-9a-f]{64}$/.test(h))
      return { ok: false, at: i, why: 'row_hash form', links: i };
    const { row_hash, ...rest } = row;
    if (sha256Hex(canonicalStone([prev, rest])) !== h)
      return { ok: false, at: i, why: 'hash mismatch', links: i };
    prev = h;
  }
  return { ok: true, at: null, why: null, links: lines.length, tip: lines.length ? prev : null };
}

// Live seam: load quilt-stone's OWN verifier. dir resolution: opts.dir ||
// QUILT_STONE_DIR env; NO relative guess (quilt-stone is brand-new — unlike
// quilt-doctor there is no standing sibling checkout to assume).
// Returns the stone module ({verifyChain, verifyChainFile, detectAlg, ...})
// or null — never throws, never fabricates.
async function loadStone(opts) {
  if (typeof require !== 'function') return null; // browser door: seam closed
  const dir = (opts && opts.dir) || (typeof process !== 'undefined' && process.env && process.env.QUILT_STONE_DIR);
  if (!dir) return null;
  try {
    const m = await import(require('path').join(dir, 'stone.mjs'));
    if (typeof m.verifyChain === 'function') return m;
  } catch (e) { /* absent or unloadable: seam closed */ }
  return null;
}

function walToJsonl(lines) {
  // json.dumps(line, sort_keys=True) equivalent — the replacer-array trick
  // would whitelist NESTED keys too and silently drop args fields; canonical()
  // sorts every level and keeps everything.
  return lines.map(l => canonical(l)).join('\n') + '\n';
}

// Dual load: node (tools, tests) and the page (script tag). The page
// seam (Round 30) needs the SAME exporter the tools pin — one impl, two doors.
const WAL_EXPORT_API = { fnv1a64, canonical, toQuiltWal, verifyQuiltWal, walToJsonl, OPS,
                         toStoneV1, verifyStoneV1, canonicalStone, loadStone, STONE_GENESIS };
if (typeof module !== 'undefined' && module.exports) module.exports = WAL_EXPORT_API;
if (typeof window !== 'undefined') window.QUILT_WAL = WAL_EXPORT_API;

// CLI: node tools/wal-export.js — demo driver, exports the page's demo
// receipt kinds as a doctor-consumable WAL and self-verifies it.
if (typeof require !== 'undefined' && require.main === module) {
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
