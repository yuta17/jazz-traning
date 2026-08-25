const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  DURATION_SECONDS,
  formatTime,
} = require("../src/focus-timer.js");

assert.equal(DURATION_SECONDS, 300);
assert.equal(formatTime(300), "5:00");
assert.equal(formatTime(0), "0:00");
assert.equal(formatTime(-1), "0:00");

const root = path.join(__dirname, "..");
const homeHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const timerHtml = fs.readFileSync(path.join(root, "focus-timer/index.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const timerSource = fs.readFileSync(path.join(root, "src/focus-timer.js"), "utf8");

assert(homeHtml.includes("href=\"./focus-timer/\""));
assert(homeHtml.indexOf("5分間タイマー") < homeHtml.indexOf("ハノン"));
assert(homeHtml.includes("styles.css?v=20260825-standard-random"));
assert(homeHtml.includes("home-divider"));
assert(timerHtml.includes("何に焦点を合わせるか"));
assert(timerHtml.includes("次のタイマー"));
assert(timerHtml.includes("src/focus-timer.js?v=20260802-focus-timer"));
assert(styles.includes(".focus-timer-stage"));
assert(styles.includes(".home-divider"));
assert(timerSource.includes("dom.startButton.disabled = state.running || !hasFocus"));
assert(timerSource.includes("state.remainingSeconds = DURATION_SECONDS"));
assert(timerSource.includes("dom.form.hidden = true"));

console.log("Focus timer validation passed");
