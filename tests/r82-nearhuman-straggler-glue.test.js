// Round 82 pin — the "near-human" stragglers, 4th carrying closed (R79 spec
// item 4 → R80 item 1 → R81 item 1 → R82 build).
//
// Wound: R79 banned the undefined quality label "near-human" from the L2
// load BUTTON (a quality claim DEFINED nowhere in the repo — every grep hit
// a usage, none a definition), but the same label survived on the two other
// surfaces a new reader looks at first: README.md's starting-states table
// (row "L2 near-human") and tools/prerun.js's header comment
// ("(L0 random, L1 mid, L2 near-human)"). A label fixed on one surface and
// left on two others is the R32 P4 drift class — honesty sentences that
// disagree about WHAT the level is. The button says "trained", the table
// said "near-human": one level, two names.
//
// Closed: both stragglers renamed to the button's state label "trained",
// the same word the R79 build chose (a gen-260 trained population, no
// unmeasured quality claim). The historical record is NOT laundered: the
// term survives in PLAYLOG entries, in the r79 pin's own banned-needle
// regex (tests/r79-l2-button-honesty-glue.test.js:71 — the detector keeps
// its needle), and in core.js's VERIFIED_CLAIMS receipt for R79.
//
// Tests:
//  (1) README-CLEAN — README.md carries zero "near-human" occurrences.
//  (2) PRERUN-CLEAN — tools/prerun.js carries zero "near-human" occurrences.
//  (3) LABEL-CONSISTENCY — README's L2 table row now names the level with
//      the same state label the button carries ("L2 trained"), so the table
//      and the page tell one story.
//  (4) NEEDLE-INTACT — the r79 pin still carries its banned-needle regex;
//      history is preserved, not deleted. A "fix" that edits the detector
//      instead of the surface is caught here.
//
// FAIL-first on the pre-R82 tree: (1)(2)(3) all RED (README row read
// "L2 near-human", prerun's header carried the term, no "L2 trained" row),
// (4) GREEN by design.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");

test("README-CLEAN: README.md carries zero 'near-human' occurrences", () => {
  const hits = read("README.md").split("\n")
    .map((l, i) => ({ line: i + 1, text: l }))
    .filter(h => /near-human/i.test(h.text));
  assert.deepEqual(hits, [],
    `README.md must not carry the undefined quality label (hits: ${JSON.stringify(hits)})`);
});

test("PRERUN-CLEAN: tools/prerun.js carries zero 'near-human' occurrences", () => {
  const hits = read("tools/prerun.js").split("\n")
    .map((l, i) => ({ line: i + 1, text: l }))
    .filter(h => /near-human/i.test(h.text));
  assert.deepEqual(hits, [],
    `tools/prerun.js's header must not carry the undefined quality label (hits: ${JSON.stringify(hits)})`);
});

test("LABEL-CONSISTENCY: README's L2 table row carries the button's state label 'trained'", () => {
  const row = read("README.md").split("\n").find(l => /^\|\s*L2\s/.test(l));
  assert.ok(row, "README must carry an L2 table row");
  assert.ok(/L2 trained/.test(row),
    `the L2 row must use the button's state label 'trained' (have: "${row}")`);
  assert.ok(!/near-human/i.test(row),
    "the L2 row must not resurrect the undefined label");
});

test("NEEDLE-INTACT: the r79 pin still carries its banned-needle regex (history preserved)", () => {
  const r79 = read("tests/r79-l2-button-honesty-glue.test.js");
  assert.ok(/\/near-human\/i/.test(r79),
    "the r79 pin's banned-needle regex must survive — the detector keeps its needle");
});
