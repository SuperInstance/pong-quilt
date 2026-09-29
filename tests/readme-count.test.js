// Round 19 pin — the README test-count rot, killed structurally.
// Found this round by counting: README claimed "(94 tests total: 86 in
// `tests/` + 8 in `tools/test-qa.js` — counts as of Round 16)" while the real
// suite is 103 + 8 (R17 +3, R18 +4). The R16 sweep fixed the same lie once;
// a hardcoded number in prose rots again every time anyone adds a test — the
// rot is structural, so the fix must be too: the count in README is now a
// claim this file verifies BY RUNNING, every suite, forever.
// How: spawn the canonical suite (this file excluded — otherwise the spawn
// would recurse) plus tools/test-qa.js, parse the tap summaries, and assert
// README's stated numbers equal the live ones.
// R49b hermetic rule: the tests/ count = PASS + SKIP + this file — TOTAL
// registered tests, not env-dependent passes. Env-gated live tests (signTip
// lane, doctor-lens freshness) PASS where their checkout exists and SKIP
// honestly where it does not; either way they ARE part of the suite. The
// pre-R49b formula (passes + 1) was bistable: 235 locally vs 234 on CI for
// the same tree — the pin itself was red in exactly one environment, which
// is the R49 wound this amendment closes for good.
// R58 amendment: the formula must also count the FAIL class. The R58
// main-repair round-trip proved the wound by running: at main f53519b (red
// on canonical-index) the spawned suite printed pass 258 / fail 1 / skip 2,
// and the old formula demanded 261 (258+2+1); the moment the sibling red was
// repaired the same tree demanded 262 (259+0+2+1). A builder obeying the pin
// MID-RED plants a count that flips red when the sibling is fixed — the pin
// demanding a README edit that the pin itself will reject is the wound.
// FAIL is an outcome class of REGISTERED tests; omitting it makes the demand
// = 262 − (#spawned fails), i.e. red-state-dependent, against this pin's own
// doctrine. New formula: PASS + FAIL + SKIP + this file = total registered,
// invariant across red/green (verified: 262 demanded at f53519b-red and at
// the green repair tip alike).
// FAIL-first: on main (94 claimed, 103 real) the assertion fails; after the
// README correction it passes, and it can never rot again — any future test
// added without updating README turns the suite red with this file's name on it.
// Runner-env lesson (R19, found by running): `node --test` exports
// NODE_TEST_CONTEXT=child-v8 into test files; a grandchild spawn that inherits
// it suppresses its own stdout, so the spawn must strip the runner's env.
const test = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SELF = "readme-count.test.js"; // excluded from the spawn: no recursion

// Under `node --test` the runner exports NODE_TEST_CONTEXT=child-v8 (and some
// runners export VITEST) into every test file's env; a spawned grandchild that
// inherits it believes it is a test child and suppresses its own stdout — the
// tap summary never arrives. Strip the runner's context vars for the spawn.
function cleanEnv() {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  delete env.VITEST;
  return env;
}

function suitePasses() {
  const files = fs.readdirSync(__dirname)
    .filter((f) => f.endsWith(".test.js") && f !== SELF)
    .map((f) => `tests/${f}`);
  let out, status = 0;
  try {
    out = execFileSync(process.execPath,
      ["--test", "--test-reporter=tap", ...files],
      { cwd: ROOT, encoding: "utf8", maxBuffer: 16 * 1024 * 1024, env: cleanEnv() });
  } catch (e) {
    out = (e.stdout || "") + "\n--SPAWN-STDERR--\n" + (e.stderr || "");
    status = e.status;
  }
  const m = out.match(/^# pass (\d+)$/m);
  assert.ok(m, `spawned suite must print a tap '# pass N' summary (status ${status}); tail:\n${out.slice(-600)}`);
  const f = out.match(/^# fail (\d+)$/m);
  const s = out.match(/^# skipped (\d+)$/m);
  return { pass: Number(m[1]), fail: f ? Number(f[1]) : 0, skipped: s ? Number(s[1]) : 0 };
}

function qaPasses() {
  let out, status = 0;
  try {
    out = execFileSync(process.execPath,
      ["--test", "--test-reporter=tap", "tools/test-qa.js"],
      { cwd: ROOT, encoding: "utf8", maxBuffer: 16 * 1024 * 1024, env: cleanEnv() });
  } catch (e) {
    out = (e.stdout || "") + "\n--SPAWN-STDERR--\n" + (e.stderr || "");
    status = e.status;
  }
  const m = out.match(/^# pass (\d+)$/m);
  assert.ok(m, `tools/test-qa.js must print a tap '# pass N' summary (status ${status}); tail:\n${out.slice(-600)}`);
  return Number(m[1]);
}

test("README's stated test counts equal the live suite counts (run-verified)", () => {
  const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
  const m = readme.match(/\((\d+) tests total: (\d+) in `tests\/` \+ (\d+) in `tools\/test-qa\.js`/);
  assert.ok(m, "README must state its test counts in the pinned '(N tests total: …)' form");
  const [, claimedTotal, claimedSuite, claimedQa] = m.map(Number);
  const suite = suitePasses();
  const liveSuite = suite.pass + suite.fail + suite.skipped + 1; // total registered: every outcome class + this file (R49b, fail-class added R58 — red-invariant)
  const liveQa = qaPasses();
  assert.equal(claimedSuite, liveSuite,
    `README claims ${claimedSuite} tests in tests/ but the suite registers ${liveSuite} (${suite.pass} pass + ${suite.fail} fail + ${suite.skipped} honest skip in this env) — update the count (or let this pin name you)`);
  assert.equal(claimedQa, liveQa,
    `README claims ${claimedQa} tests in tools/test-qa.js but it runs ${liveQa}`);
  assert.equal(claimedTotal, liveSuite + liveQa,
    `README's stated total ${claimedTotal} != ${liveSuite}+${liveQa}`);
});
