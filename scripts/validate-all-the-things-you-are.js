const assert = require("node:assert/strict");
const {
  KEYS,
  dayNumber,
  fallbackTrainingDayKey,
  keyForDay,
  shuffledKeys,
} = require("../src/all-the-things-you-are.js");

assert.deepEqual(KEYS, [
  "C",
  "D♭",
  "D",
  "E♭",
  "E",
  "F",
  "G♭",
  "G",
  "A♭",
  "A",
  "B♭",
  "B",
]);

assert.equal(fallbackTrainingDayKey(new Date(2026, 6, 9, 5, 59)), "2026-07-08");
assert.equal(fallbackTrainingDayKey(new Date(2026, 6, 9, 6, 0)), "2026-07-09");
assert.equal(dayNumber("2026-07-09") + 1, dayNumber("2026-07-10"));

for (let cycle = 0; cycle < 20; cycle += 1) {
  const keys = shuffledKeys(cycle);
  assert.equal(keys.length, 12);
  assert.deepEqual(new Set(keys), new Set(KEYS));
}

const firstDay = new Date(1970, 0, 1, 12, 0);
const firstCycle = Array.from({ length: 12 }, (_, offset) => {
  const date = new Date(firstDay);
  date.setDate(date.getDate() + offset);
  return keyForDay(date).key;
});

assert.deepEqual(new Set(firstCycle), new Set(KEYS));
assert.equal(keyForDay(firstDay).key, keyForDay(firstDay).key);

console.log("All the Things You Are validation passed");
