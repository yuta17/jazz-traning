const assert = require("node:assert/strict");
const {
  DURATIONS,
  SIGHT_READING_SAMPLES,
  createExercise,
  isBeatStart,
} = require("../src/sight-reading.js");

assert.equal(Object.keys(DURATIONS).length, 7);
assert(SIGHT_READING_SAMPLES.length >= 18);
assert.equal(new Set(SIGHT_READING_SAMPLES.map((sample) => sample.id)).size, SIGHT_READING_SAMPLES.length);

const KEY_SIGNATURES = {
  C: {},
  G: { F: 1 },
  D: { F: 1, C: 1 },
  A: { F: 1, C: 1, G: 1 },
  F: { B: -1 },
  Bb: { B: -1, E: -1 },
  Eb: { B: -1, E: -1, A: -1 },
};

const NATURAL_PITCHES = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

function parsePitch(pitch) {
  const match = pitch.match(/^([A-G])([#b]?)([0-9])$/);
  if (!match) return null;

  const [, letter, accidental, octave] = match;
  return { letter, accidental, octave: Number(octave) };
}

function pitchToMidi(pitch, keySignature) {
  const parsed = parsePitch(pitch);
  assert(parsed, `invalid pitch ${pitch}`);

  const keyAlterations = KEY_SIGNATURES[keySignature] || {};
  const explicitAlteration = parsed.accidental === "#" ? 1 : parsed.accidental === "b" ? -1 : null;
  const alteration = explicitAlteration ?? keyAlterations[parsed.letter] ?? 0;

  return (parsed.octave + 1) * 12 + NATURAL_PITCHES[parsed.letter] + alteration;
}

function measureTotal(events) {
  return events.reduce((sum, event) => sum + event.d, 0);
}

function eventBoundaries(measure) {
  let cursor = 0;
  return measure.map((event, index) => {
    const start = cursor;
    cursor += event.d;
    return {
      ...event,
      index,
      start,
      end: cursor,
    };
  });
}

function assertMeasureIsComplete(sample, staff, measure, measureIndex) {
  const bounded = eventBoundaries(measure);

  for (let beat = 0; beat < 4; beat += 1) {
    const beatEnd = beat + 1;
    const coverage = bounded.reduce((sum, event) => {
      const overlap = Math.max(0, Math.min(event.end, beatEnd) - Math.max(event.start, beat));
      return sum + overlap;
    }, 0);
    assert.equal(
      coverage,
      1,
      `${sample.id} ${staff} m${measureIndex + 1} beat ${beat + 1} must be fully covered`,
    );
  }

  bounded.forEach((event, index) => {
    if (!Number.isInteger(event.start) || event.d >= 1) return;

    const hasFollowerInsideBeat = bounded
      .slice(index + 1)
      .some((nextEvent) => nextEvent.start < event.start + 1);
    assert(
      hasFollowerInsideBeat,
      `${sample.id} ${staff} m${measureIndex + 1} has a short event alone at beat ${event.start + 1}`,
    );
  });
}

function assertTiesAreValid(sample, staff, measure, measureIndex) {
  measure.forEach((event, index) => {
    if (!event.tieToNext) return;

    const nextEvent = measure[index + 1];
    assert(nextEvent, `${sample.id} ${staff} m${measureIndex + 1} tie must have a following note`);
    assert(!event.rest && !nextEvent.rest, `${sample.id} ${staff} m${measureIndex + 1} tie cannot connect rests`);
    assert.equal(
      event.pitch,
      nextEvent.pitch,
      `${sample.id} ${staff} m${measureIndex + 1} tie must connect the same pitch`,
    );
  });
}

function assertPlayableLine(sample, staff) {
  const range = staff === "treble"
    ? { min: 62, max: 79, maxLeap: 9 }
    : { min: 39, max: 55, maxLeap: 12 };
  let previousMidi = null;

  sample[staff].forEach((measure, measureIndex) => {
    measure.forEach((event, index) => {
      if (event.rest) {
        previousMidi = null;
        return;
      }

      const midi = pitchToMidi(event.pitch, sample.keySignature);
      assert(
        midi >= range.min && midi <= range.max,
        `${sample.id} ${staff} m${measureIndex + 1} event ${index + 1} is out of playable range`,
      );

      if (previousMidi !== null) {
        assert(
          Math.abs(midi - previousMidi) <= range.maxLeap,
          `${sample.id} ${staff} m${measureIndex + 1} event ${index + 1} has an awkward leap`,
        );
      }

      previousMidi = midi;
    });
  });
}

const keySignatures = new Set(SIGHT_READING_SAMPLES.map((sample) => sample.keySignature));
["C", "G", "D", "A", "F", "Bb", "Eb"].forEach((keySignature) => {
  assert(keySignatures.has(keySignature), `missing ${keySignature} sight-reading sample`);
});

SIGHT_READING_SAMPLES.forEach((sample) => {
  assert(sample.title);
  assert(sample.keySignature in KEY_SIGNATURES);
  assert.equal(sample.treble.length, 4);
  assert.equal(sample.bass.length, 4);
  assertPlayableLine(sample, "treble");
  assertPlayableLine(sample, "bass");

  ["treble", "bass"].forEach((staff) => {
    sample[staff].forEach((measure, measureIndex) => {
      assert.equal(measureTotal(measure), 4);
      assertMeasureIsComplete(sample, staff, measure, measureIndex);
      assertTiesAreValid(sample, staff, measure, measureIndex);
      measure.forEach((event) => {
        assert(event.kind in DURATIONS);
        assert.equal(event.d, DURATIONS[event.kind]);
        assert(event.rest || parsePitch(event.pitch));
      });
    });
  });

  const allEvents = [...sample.treble.flat(), ...sample.bass.flat()];
  assert(allEvents.some((event) => event.kind === "8"));
  assert(allEvents.some((event) => event.kind === "16"));
  assert(allEvents.some((event) => event.kind.startsWith("d")));
  assert(allEvents.some((event) => event.rest));
});

const catalogEvents = SIGHT_READING_SAMPLES.flatMap((sample) => [
  ...sample.treble.flat(),
  ...sample.bass.flat(),
]);
assert(catalogEvents.some((event) => event.kind === "dq" && !event.rest));
assert(catalogEvents.some((event) => event.kind === "dh" && !event.rest));
assert(catalogEvents.some((event) => event.kind.startsWith("d") && event.rest));

assert(
  SIGHT_READING_SAMPLES.some((sample) => [...sample.treble.flat(), ...sample.bass.flat()].some((event) => event.tieToNext)),
  "at least one sight-reading sample should include a tie",
);

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
