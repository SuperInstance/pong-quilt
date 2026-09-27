// dev helper: run the suite and print only failures (preflight-safe wrapper)
const { execSync } = require("node:child_process");
const path = require("node:path");
const suite = path.join(__dirname, "run-suite.js");
let out;
try {
  out = execSync(`node ${JSON.stringify(suite)}`, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
} catch (e) {
  out = (e.output && (e.output[1] || e.output[2])) || String(e);
}
const lines = out.split("\n");
for (let i = 0; i < lines.length; i++) {
  if (/^not ok/.test(lines[i])) {
    console.log(lines[i]);
    for (let j = i + 1; j < Math.min(i + 24, lines.length); j++) {
      if (/^(ok|not ok|#)/.test(lines[j])) break;
      console.log(lines[j]);
    }
    console.log("---");
  }
}
const tail = lines.filter((l) => /^# (tests|pass|fail)/.test(l)).join("\n");
console.log(tail);
