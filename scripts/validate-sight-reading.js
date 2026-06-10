const assert = require("node:assert/strict");
const {
  DURATIONS,
  SIGHT_READING_SAMPLES,
  createExercise,
  isBeatStart,
} = require("../src/sight-reading.js");

assert.equal(Object.keys(DURATIONS).length, 7);
assert(SIGHT_READING_SAMPLES.length >= 16);
assert.equal(new Set(SIGHT_READING_SAMPLES.map((sample) => sample.id)).size, SIGHT_READING_SAMPLES.length);

function measureTotal(events) {
  return events.reduce((sum, event) => sum + event.d, 0);
}

SIGHT_READING_SAMPLES.forEach((sample) => {
  assert.equal(sample.treble.length, 4);
  assert.equal(sample.bass.length, 4);

  ["treble", "bass"].forEach((staff) => {
    sample[staff].forEach((measure) => {
      assert.equal(measureTotal(measure), 4);
      measure.forEach((event) => {
        assert(event.kind in DURATIONS);
        assert.equal(event.d, DURATIONS[event.kind]);
        assert(event.rest || /^[A-G][0-9]$/.test(event.pitch));
      });
    });
  });

  const allEvents = [...sample.treble.flat(), ...sample.bass.flat()];
  assert(allEvents.some((event) => event.kind === "8"));
  assert(allEvents.some((event) => event.kind === "16"));
  assert(allEvents.some((event) => event.kind.startsWith("d")));
  assert(allEvents.some((event) => event.rest));
});

for (let i = 0; i < 30; i += 1) {
  const exercise = createExercise();
  assert(exercise.id);
  assert(exercise.title);
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
