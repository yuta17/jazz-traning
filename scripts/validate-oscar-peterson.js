const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  EXERCISES,
  TRAINING_ID,
  exerciseForDay,
  fallbackTrainingDayKey,
  hashString,
} = require("../src/oscar-peterson.js");

assert.equal(TRAINING_ID, "oscar-peterson");
assert.deepEqual(
  EXERCISES.map((exercise) => exercise.title),
  [
    "Oscar Peterson Exercise 1",
    "Oscar Peterson Exercise 2",
    "Oscar Peterson Exercise 3",
  ],
);

assert.equal(fallbackTrainingDayKey(new Date(2026, 5, 12, 5, 59)), "2026-06-11");
assert.equal(fallbackTrainingDayKey(new Date(2026, 5, 12, 6, 0)), "2026-06-12");

const morning = exerciseForDay(new Date(2026, 5, 12, 8, 0));
const evening = exerciseForDay(new Date(2026, 5, 12, 23, 30));
assert.equal(morning.day, "2026-06-12");
assert.equal(morning.id, evening.id);
assert.equal(morning.title, evening.title);
assert(["1", "2", "3"].includes(morning.id));
assert(morning.index >= 0);
assert(morning.index < EXERCISES.length);
assert.equal(morning.total, EXERCISES.length);

const nextDay = exerciseForDay(new Date(2026, 5, 13, 8, 0));
assert.equal(nextDay.day, "2026-06-13");
assert(nextDay.id);
assert.notEqual(hashString("oscar-peterson:2026-06-12"), hashString("oscar-peterson:2026-06-13"));

const html = fs.readFileSync(path.join(__dirname, "../oscar-peterson/index.html"), "utf8");
[
  "今日の重点練習",
  '<strong id="peterson-exercise-title">1</strong>',
  "毎日、Exercise 1〜3の中から1曲をランダムで選び",
  "まず1回通して弾き、ミスしやすい箇所を確認する。",
  "ミスした箇所（2〜4拍程度）だけを切り出して、超ゆっくり5回弾く。",
  "少しテンポを上げて5回弾く。",
  "元のテンポで通して弾く。",
  "ノーミスを目指して繰り返す（3〜10回連続成功を目標）。",
  "styles.css?v=20260708-daily-exercise",
  "oscar-peterson.js?v=20260708-daily-exercise-number",
].forEach((text) => {
  assert(html.includes(text), `Missing text: ${text}`);
});

console.log("Oscar Peterson validation passed");
