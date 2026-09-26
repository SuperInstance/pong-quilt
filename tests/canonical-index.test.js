// Round 19 pin — canonical-index drift, both directions (R19 spec small,
// fresh). The PLAYLOG canonical index at the top of the file and the
// `## Round N` headings below it are two views of the same fact; R18 shipped
// its entry without an index row, proving the drift class is real. This pin
// regexes both directions: every Round heading must have an index row, and
// every `R<N>` index row must have a heading. The artifact row ("R2
// artifact", a retitled stale duplicate, explicitly not a Round) is exempt
// from the heading direction. FAIL-first provable by deleting any index row.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const log = fs.readFileSync(path.join(__dirname, "..", "PLAYLOG.md"), "utf8");
const lines = log.split("\n");

// The canonical index table lives between its "## Canonical index" heading and
// the first "## Round" heading after it.
const idxStart = lines.findIndex((l) => /^## Canonical index/.test(l));
const firstRound = lines.findIndex((l, i) => i > idxStart && /^## Round/.test(l));
assert.ok(idxStart >= 0 && firstRound > idxStart, "PLAYLOG must have a canonical index before the Round entries");
const indexSection = lines.slice(idxStart, firstRound);
const bodySection = lines.slice(firstRound);

const indexRows = indexSection.filter((l) => /^\|\s*R\d+(\s+artifact)?\s*\|/.test(l));
const rowKeys = indexRows.map((l) => l.split("|")[1].trim());
// Pure-round rows (R2's TWO branch headings share one row, so no dup check).
const pureRoundKeys = rowKeys.filter((k) => /^R\d+$/.test(k));

const headingRounds = bodySection.filter((l) => /^## Round\s+(\d+)/.test(l))
  .map((l) => l.match(/^## Round\s+(\d+)/)[1]);
// Multiple headings may share one round number (R2's two canonical branches).
const headingSet = [...new Set(headingRounds)];

test("every ## Round N heading has a canonical-index row", () => {
  for (const n of headingSet) {
    assert.ok(pureRoundKeys.includes(`R${n}`),
      `Round ${n} has a ## heading but no index row — add '| R${n} | ... |' to the canonical index`);
  }
});

test("every pure R<N> index row has a ## Round N heading", () => {
  for (const k of pureRoundKeys) {
    const n = k.slice(1);
    assert.ok(headingSet.includes(n),
      `index row ${k} has no ## Round ${n} heading below — a row without a round is a phantom receipt`);
  }
});

test("index rows are unique (no duplicated round keys)", () => {
  const dupes = pureRoundKeys.filter((k, i) => pureRoundKeys.indexOf(k) !== i);
  assert.deepEqual(dupes, [], `duplicated index rows: ${dupes.join(", ")}`);
});
