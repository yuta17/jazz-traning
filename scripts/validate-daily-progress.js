const assert = require("node:assert/strict");
const {
  TRAINING_IDS,
  normalizeSnapshot,
  trainingDayKey,
} = require("../src/daily-progress.js");

assert.deepEqual(TRAINING_IDS, [
  "hanon",
  "oscar-peterson",
  "lick-1",
  "lick-2",
  "chord-flash",
  "degree-note",
  "key-signature",
  "two-five-one",
  "all-the-things-you-are",
  "standard-sight-reading",
  "instagram-lick",
]);

assert.equal(trainingDayKey(new Date(2026, 5, 10, 5, 59)), "2026-06-09");
assert.equal(trainingDayKey(new Date(2026, 5, 10, 6, 0)), "2026-06-10");
assert.equal(trainingDayKey(new Date(2026, 5, 11, 5, 59)), "2026-06-10");

assert.deepEqual(
  normalizeSnapshot(
    {
      day: "2026-06-10",
      completed: {
        hanon: true,
        unknown: true,
      },
    },
    new Date(2026, 5, 10, 12, 0),
  ),
  {
    day: "2026-06-10",
    completed: {
      hanon: true,
    },
  },
);

assert.deepEqual(
  normalizeSnapshot(
    {
      day: "2026-06-09",
      completed: {
        hanon: true,
      },
    },
    new Date(2026, 5, 10, 12, 0),
  ),
  {
    day: "2026-06-10",
    completed: {},
  },
);

console.log("Daily progress validation passed");
