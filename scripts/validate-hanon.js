const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  HANON_NUMBERS,
  TRAINING_ID,
  pickNumber,
} = require("../src/hanon.js");

assert.equal(TRAINING_ID, "hanon");
assert.deepEqual(HANON_NUMBERS, [1, 2, 3, 4, 5]);
assert.equal(pickNumber(() => 0), 1);
assert.equal(pickNumber(() => 0.199), 1);
assert.equal(pickNumber(() => 0.2), 2);
assert.equal(pickNumber(() => 0.999), 5);

for (let i = 0; i < 100; i += 1) {
  assert(HANON_NUMBERS.includes(pickNumber()));
}

const html = fs.readFileSync(path.join(__dirname, "../hanon/index.html"), "utf8");
assert(html.includes("<title>ハノン</title>"));
assert(html.includes("<h1>ハノン</h1>"));
assert(html.includes('aria-label="ハノン"'));
assert(html.includes('id="hanon-done-button"'));
assert(html.includes("練習した"));
assert(html.includes("styles.css?v=20260708-hanon-button"));
assert(html.includes("hanon.js?v=20260708-hanon-done"));
assert(!html.includes("ハノン番号"));
assert(!html.includes(">番号<"));

const source = fs.readFileSync(path.join(__dirname, "../src/hanon.js"), "utf8");
assert(source.includes("JazzDailyProgress?.mark(TRAINING_ID)"));
assert(!source.includes("JazzDailyProgress?.mark(\"hanon\")"));

console.log("Hanon validation passed");
