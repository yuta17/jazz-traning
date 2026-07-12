const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  LICK_SEGMENTS,
  MAJOR_KEYS,
  REST_LABEL,
  ROUND_SIZE,
  buildTask,
  createDeck,
} = require("../src/lick-2.js");

const PITCH_CLASS = {
  C: 0,
  "B♯": 0,
  "C♯": 1,
  "D♭": 1,
  D: 2,
  "D♯": 3,
  "E♭": 3,
  E: 4,
  "F♭": 4,
  F: 5,
  "E♯": 5,
  "F♯": 6,
  "G♭": 6,
  G: 7,
  "G♯": 8,
  "A♭": 8,
  A: 9,
  "A♯": 10,
  "B♭": 10,
  B: 11,
  "C♭": 11,
};

assert.equal(ROUND_SIZE, 12);
assert.equal(MAJOR_KEYS.length, 12);
assert.equal(new Set(MAJOR_KEYS.map((key) => key.id)).size, 12);
assert.deepEqual(
  LICK_SEGMENTS.map((segment) => segment.degree),
  ["II-7", "V7", "Imaj7"],
);

LICK_SEGMENTS.forEach((segment) => {
  assert.equal(segment.intervals.length, segment.degreeLabels.length);
  assert.equal(segment.intervals.length, segment.noteLetterOffsets.length);
  assert(segment.intervals.length > 0);
  assert(!segment.degreeLabels.includes("8"));
});

const cTask = buildTask(MAJOR_KEYS.find((key) => key.id === "C"));
assert.equal(cTask.key, "C");
assert.equal(cTask.progression, "D-7 → G7 → Cmaj7");
assert.deepEqual(cTask.segments[0].degreeLabels, ["半", "半", "3", "休", "5", "半", "5"]);
assert.deepEqual(cTask.segments[0].notes, ["G", "F♯", "F", "休", "A", "G♯", "A"]);
assert.deepEqual(cTask.segments[1].degreeLabels, ["13", "11", "5", "♭13", "♯9", "♭9", "1", "7"]);
assert.deepEqual(cTask.segments[1].notes, ["E", "C", "D", "E♭", "B♭", "G♯", "G", "F"]);
assert.deepEqual(cTask.segments[2].degreeLabels, ["3"]);
assert.deepEqual(cTask.segments[2].notes, ["E"]);

const gTask = buildTask(MAJOR_KEYS.find((key) => key.id === "G"));
assert.equal(gTask.progression, "A-7 → D7 → Gmaj7");
assert.deepEqual(gTask.segments[0].notes, ["D", "C♯", "C", "休", "E", "D♯", "E"]);
assert.deepEqual(gTask.segments[1].notes, ["B", "G", "A", "B♭", "F", "D♯", "D", "C"]);
assert.deepEqual(gTask.segments[2].notes, ["B"]);

const dbTask = buildTask(MAJOR_KEYS.find((key) => key.id === "Db"));
assert.deepEqual(dbTask.segments[1].notes, ["F", "D♭", "E♭", "F♭", "C♭", "A", "A♭", "G♭"]);

const bTask = buildTask(MAJOR_KEYS.find((key) => key.id === "B"));
assert.deepEqual(bTask.segments[1].notes, ["D♯", "B", "C♯", "D", "A", "G", "F♯", "E"]);

const cPitchRows = cTask.segments.map((segment) => (
  segment.notes.map((note) => (note === REST_LABEL ? REST_LABEL : PITCH_CLASS[note]))
));

MAJOR_KEYS.forEach((key) => {
  const task = buildTask(key);
  task.segments.forEach((segment, segmentIndex) => {
    assert.deepEqual(
      segment.notes.filter((note) => note !== REST_LABEL && !(note in PITCH_CLASS)),
      [],
      `${task.key} ${segment.chord} has unsupported note spelling`,
    );

    assert.deepEqual(
      segment.notes.filter((note) => /♯♯|♭♭/.test(note)),
      [],
      `${task.key} ${segment.chord} should not use double accidentals`,
    );

    assert.deepEqual(
      segment.notes.map((note) => (note === REST_LABEL ? REST_LABEL : PITCH_CLASS[note])),
      cPitchRows[segmentIndex].map((pitchClass) => (
        pitchClass === REST_LABEL ? REST_LABEL : (pitchClass + key.pitch) % 12
      )),
      `${task.key} ${segment.chord} should transpose from the C source lick`,
    );
  });
});

const deck = createDeck();
assert.equal(deck.length, 12);
assert.equal(new Set(deck.map((task) => task.id)).size, 12);
deck.forEach((task) => {
  assert.equal(task.segments.length, 3);
  assert(task.progression.includes(" → "));
});

assert(fs.existsSync(path.join(__dirname, "../assets/licks/lick-2.jpg")));
const lick2Html = fs.readFileSync(path.join(__dirname, "../licks/2/index.html"), "utf8");
assert(lick2Html.includes("https://www.youtube.com/watch?v=HlAxgeO1WXI"));
assert(lick2Html.includes("lick-2.js?v=20260713-lick-readable-notes"));

console.log("Lick 2 validation passed");
