const assert = require("node:assert/strict");
const {
  BASS_PITCHES,
  RHYTHM_PATTERNS,
  TREBLE_PITCHES,
  createExercise,
  isBeatStart,
} = require("../src/sight-reading.js");

assert(TREBLE_PITCHES.length >= 8);
assert(BASS_PITCHES.length >= 8);
assert(RHYTHM_PATTERNS.length >= 6);

RHYTHM_PATTERNS.forEach((pattern) => {
  const total = pattern.reduce((sum, item) => sum + item.d, 0);
  assert.equal(total, 4);
  pattern.forEach((item) => {
    assert(item.d > 0);
    assert(item.kind);
  });
});

assert(RHYTHM_PATTERNS.some((pattern) => pattern.some((item) => item.d === 0.5)));
assert(RHYTHM_PATTERNS.some((pattern) => pattern.some((item) => item.d === 0.25)));
assert(RHYTHM_PATTERNS.some((pattern) => pattern.some((item) => item.kind.startsWith("d"))));

for (let i = 0; i < 20; i += 1) {
  const exercise = createExercise();
  assert.equal(exercise.events.filter((event) => event.staff === "treble").length > 0, true);
  assert.equal(exercise.events.filter((event) => event.staff === "bass").length > 0, true);
  assert(exercise.events.some((event) => event.duration === 0.5));
  assert(exercise.events.some((event) => event.duration === 0.25));
  assert(exercise.events.some((event) => event.kind.startsWith("d")));
  assert(exercise.events.some((event) => event.rest));

  ["treble", "bass"].forEach((staff) => {
    for (let measure = 0; measure < 4; measure += 1) {
      const events = exercise.events.filter(
        (event) => event.staff === staff && event.measure === measure,
      );
      const total = events.reduce((sum, event) => sum + event.duration, 0);
      assert.equal(total, 4);
      assert(events.some(isBeatStart));
    }
  });
}

console.log("Sight reading validation passed");
