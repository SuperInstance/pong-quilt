// Round 81 — the R1 measured-at-tag pin (R81 spec item 2, first build:
// the R74 annotation restored after its re-land loss + a structural pin so
// the loss class cannot recur).
//
// Wound closed: R74 built the R1 measured-at-tag annotation (original
// branch commit 1032342) and its receipt claimed it shipped ("the R1 entry
// gains ### Measured at the tag"), but the re-land cab770c (#96) dropped
// the R1-entry edit while keeping the receipt text — the R34/R41-class
// entry loss, recurring four repaired rounds later, invisible to every
// pin on the repo (the suite stayed green through #96). For five
// subsequent rounds (R77–R81) the cap-cluster annotation specs carried
// against an annotation that existed nowhere canonical: the specs were
// updating a ghost. This pin turns the R1 annotation from prose-attested
// to suite-guarded: the section must exist, must name the unseeded-swan
// root cause, must source its spread to the ledger (never a hand tally —
// the R77 discipline), and must name the cap-cluster structure rather
// than a single-value ceiling claim.
//
// FAIL-first on the pre-R81 tree: SECTION-EXISTS + ROOT-CAUSE-NAMED +
// LEDGER-SOURCED + CLUSTER-NOT-POINT all RED (4/4 — the section was
// absent; only R74's receipt mention survived).
//
// Tests:
//  (1) SECTION-EXISTS — the R1 PLAYLOG entry carries a
//      "### Measured at the tag" section (the baseline-integrity layer
//      R74 built, R81 restored).
//  (2) ROOT-CAUSE-NAMED — the section names the unseeded swan
//      (raw Math.random in the black-swan path) as why every published
//      v1 number is a distribution sample.
//  (3) LEDGER-SOURCED — the section names research/v1-draws.jsonl as its
//      source of truth, not a hand-maintained table (the R73 off-by-one
//      was born from hand tallies).
//  (4) CLUSTER-NOT-POINT — the section names the 6000-frame cap with
//      hit-variation (the cap-cluster) as the L2 ceiling structure, never
//      a single "ceiling attractor" value; the zero-hit floor is named.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const PLAYLOG_PATH = path.join(__dirname, "..", "PLAYLOG.md");

function r1Entry() {
  const md = fs.readFileSync(PLAYLOG_PATH, "utf8");
  const start = md.indexOf("## Round 1 —");
  assert.notEqual(start, -1, "PLAYLOG must contain the Round 1 entry");
  const rest = md.slice(start + 1);
  const next = rest.indexOf("\n## Round ");
  return next === -1 ? md.slice(start) : md.slice(start, start + 1 + next);
}
function measuredSection() {
  const entry = r1Entry();
  const start = entry.indexOf("### Measured at the tag");
  if (start === -1) return null;
  const rest = entry.slice(start + 1);
  const next = rest.indexOf("\n### ");
  return next === -1 ? entry.slice(start) : entry.slice(start, start + 1 + next);
}

test("SECTION-EXISTS: the R1 entry carries its measured-at-tag section", () => {
  assert.ok(measuredSection(),
    "Round 1 entry has no '### Measured at the tag' section — the R74 annotation " +
    "was lost (re-land #96 dropped it) or never restored; the baseline-integrity " +
    "layer is gone");
});

test("ROOT-CAUSE-NAMED: the section names the unseeded swan as the root cause", () => {
  const s = measuredSection();
  assert.ok(s, "prerequisite: section exists");
  assert.ok(/Math\.random|unseeded/i.test(s),
    "the measured-at-tag section must name the unseeded-swan root cause " +
    "(raw Math.random in the black-swan path) — a spread without its cause " +
    "is a table, not an explanation");
});

test("LEDGER-SOURCED: the section sources its spread to the draw ledger, not a hand tally", () => {
  const s = measuredSection();
  assert.ok(s, "prerequisite: section exists");
  assert.ok(/research\/v1-draws\.jsonl/.test(s),
    "the measured-at-tag section must name research/v1-draws.jsonl as its " +
    "source of truth — hand-maintained tallies carried the R73 off-by-one " +
    "for four rounds; the ledger is the only allowed source (R77 discipline)");
});

test("CLUSTER-NOT-POINT: the L2 ceiling is named as the 6000-frame cap with hit-variation, and the zero-hit floor is named", () => {
  const s = measuredSection();
  assert.ok(s, "prerequisite: section exists");
  assert.ok(/6000/.test(s) && /cap/i.test(s) && /hit-variation|hit variation|hits/i.test(s),
    "the section must name the 6000-frame cap with hit-variation as the L2 " +
    "ceiling structure — the single-value 'ceiling attractor' claim drifted " +
    "from the measured distribution (6075@3h, 6125×5@5h, 6225@9h)");
  assert.ok(/589/.test(s) && /zero-hit|zero hit/.test(s),
    "the section must name the zero-hit floor (589×2) — a champion whose " +
    "best game never touches the ball is the distribution's darkest feature");
});
