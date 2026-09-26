// Round 19 pin — the README test-count rot, killed structurally.
// Found this round by counting: README claimed "(94 tests total: 86 in
// `tests/` + 8 in `tools/test-qa.js` — counts as of Round 16)" while the real
// suite is 103 + 8 (R17 +3, R18 +4). The R16 sweep fixed the same lie once;
// a hardcoded number in prose rots again every time anyone adds a test — the
// rot is structural, so the fix must be too: the count in README is now a
// claim this file verifies BY RUNNING, every suite, forever.
// How: spawn the canonical suite (this file excluded — otherwise the spawn
// would recurse) plus tools/test-qa.js, parse the tap "# pass" summaries,
// and assert README's stated numbers equal the live ones. The full-suite
// count = spawned + 1 (this file's own single registration).
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
  return Number(m[1]);
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
  const liveSuite = suitePasses() + 1; // + this file's own registration
  const liveQa = qaPasses();
  assert.equal(claimedSuite, liveSuite,
    `README claims ${claimedSuite} tests in tests/ but the suite runs ${liveSuite} — update the count (or let this pin name you)`);
  assert.equal(claimedQa, liveQa,
    `README claims ${claimedQa} tests in tools/test-qa.js but it runs ${liveQa}`);
  assert.equal(claimedTotal, liveSuite + liveQa,
    `README's stated total ${claimedTotal} != ${liveSuite}+${liveQa}`);
});
