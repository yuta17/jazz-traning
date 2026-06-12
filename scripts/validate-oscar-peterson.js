const assert = require("node:assert/strict");
const {
  EXERCISES,
  TRAINING_ID,
  fallbackTrainingDayKey,
  isCompleteSnapshot,
  normalizeSnapshot,
} = require("../src/oscar-peterson.js");

assert.equal(TRAINING_ID, "oscar-peterson");
assert.deepEqual(EXERCISES, ["1", "2", "3"]);

assert.equal(fallbackTrainingDayKey(new Date(2026, 5, 12, 5, 59)), "2026-06-11");
assert.equal(fallbackTrainingDayKey(new Date(2026, 5, 12, 6, 0)), "2026-06-12");

assert.deepEqual(
  normalizeSnapshot(
    {
      day: "2026-06-12",
      completed: ["1", "unknown", "3"],
    },
    new Date(2026, 5, 12, 12, 0),
  ),
  {
    day: "2026-06-12",
    completed: ["1", "3"],
  },
);

assert.deepEqual(
  normalizeSnapshot(
    {
      day: "2026-06-11",
      completed: ["1", "2", "3"],
    },
    new Date(2026, 5, 12, 12, 0),
  ),
  {
    day: "2026-06-12",
    completed: [],
  },
);

assert.equal(isCompleteSnapshot({ completed: ["1", "2"] }), false);
assert.equal(isCompleteSnapshot({ completed: ["1", "2", "3"] }), true);

console.log("Oscar Peterson validation passed");
