// Round 95 — the README --check-first pin (R94 spec item 5 slice (a),
// first build).
//
// Wound closed: R94 wired `node tools/build-site.mjs --check` into
// EXPERIMENTS.md step 0 (pin: tests/r94-check-adoption-glue.test.js) — but
// the README's "To re-verify" line, the FIRST place a newcomer (or a cron
// play-tester in a fresh workspace) reads for how to check the repo, still
// jumps straight to the 104-second suite. The trap R93's tool closes is
// workspace-per-workspace and discovered only by running the full suite
// (R92, R93 both paid ~104s for it); a README that names the one-command
// check first is the adoption gate's third wall — the tool (R93), the
// protocol (R94), the front door (this round). The R94 spec named this
// slice: "README's re-verify line wires `node tools/build-site.mjs --check`
// as the first move + a testcmd-docs assertion that the canonical command
// block names it".
//
// FAIL-first: on the pre-R95 tree README.md names no --check (grep verified
// empty at round start — only EXPERIMENTS.md does), so both assertions are
// RED there.
//
// Tests:
//  (1) README-NAMES-CHECK — README.md names the literal command
//      `node tools/build-site.mjs --check` in its re-verify instructions.
//      A paraphrase ("check the seal first") without the command is a dead
//      letter: the reader cannot run a paraphrase.
//  (2) CHECK-IS-FIRST-MOVE — README's --check mention precedes the canonical
//      suite command in the file: the seal check is the first move, the
//      suite the second. A mention buried after the suite text is the
//      decoration the R94 pin already forbids in EXPERIMENTS.md; this pin
//      extends the same rule to the front door.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const README = path.join(ROOT, "README.md");

test("README-NAMES-CHECK: README.md names the literal --check command in its re-verify line", () => {
  const readme = fs.readFileSync(README, "utf8");
  assert.ok(/`node tools\/build-site\.mjs --check`/.test(readme),
    "README.md must name `node tools/build-site.mjs --check` as a literal command — a reader cannot run a paraphrase");
});

test("CHECK-IS-FIRST-MOVE: the seal check is named before the canonical suite command in README", () => {
  const readme = fs.readFileSync(README, "utf8");
  const checkAt = readme.indexOf("tools/build-site.mjs --check");
  const suiteAt = readme.indexOf("`node --test tests/*.test.js`");
  assert.ok(checkAt !== -1, "README.md must name the seal check at all");
  assert.ok(suiteAt !== -1, "README.md must keep naming the canonical suite command");
  assert.ok(checkAt < suiteAt,
    "the --check step must be named BEFORE the canonical suite command in README — the seal check is the first move");
});
