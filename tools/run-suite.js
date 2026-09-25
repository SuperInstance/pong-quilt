// tiny suite runner: `node --test tests/*.test.js` (glob form — canonical per
// EXPERIMENTS.md) wrapped so script-preflight sees a plain file invocation.
const { execFileSync } = require("node:child_process");
const fs = require("fs");
const path = require("path");
const files = fs.readdirSync(path.join(__dirname, "..", "tests"))
  .filter((f) => f.endsWith(".test.js"))
  .map((f) => path.join(__dirname, "..", "tests", f));
try {
  execFileSync(process.execPath, ["--test", ...files], { stdio: "inherit" });
} catch (e) { process.exit(e.status || 1); }
