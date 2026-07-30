const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  LICK_SEGMENTS,
  MAJOR_KEYS,
  ROUND_SIZE,
  buildTask,
  createDeck,
} = require("../src/lick-1.js");

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
  ["II-7", "V7", "Imaj"],
);

LICK_SEGMENTS.forEach((segment) => {
  assert.equal(segment.intervals.length, segment.degreeLabels.length);
  assert.equal(segment.intervals.length, segment.noteLetterOffsets.length);
  assert(segment.intervals.length > 0);
  assert(!segment.degreeLabels.includes("8"));
});

const cTask = buildTask(MAJOR_KEYS.find((key) => key.id === "C"));
assert.equal(cTask.key, "C");
assert.equal(cTask.progression, "D-7 → G7 → Cmaj");
assert.deepEqual(cTask.segments[0].degreeLabels, ["1", "3", "5", "7", "9", "7", "5", "7"]);
assert.deepEqual(cTask.segments[0].notes, ["D", "F", "A", "C", "E", "C", "A", "C"]);
assert.deepEqual(cTask.segments[1].degreeLabels, ["3", "5", "7", "1", "♭9", "♯9", "♭9", "1", "7"]);
assert.deepEqual(cTask.segments[1].notes, ["B", "D", "F", "G", "A♭", "A♯", "A♭", "G", "F"]);
assert.deepEqual(cTask.segments[2].degreeLabels, ["3"]);
assert.deepEqual(cTask.segments[2].notes, ["E"]);

const dbTask = buildTask(MAJOR_KEYS.find((key) => key.id === "Db"));
assert.equal(dbTask.progression, "E♭-7 → A♭7 → D♭maj");
assert.deepEqual(dbTask.segments[0].notes, ["E♭", "G♭", "B♭", "D♭", "F", "D♭", "B♭", "D♭"]);
assert.deepEqual(dbTask.segments[1].notes, ["C", "E♭", "G♭", "A♭", "A", "B", "A", "A♭", "G♭"]);
assert.deepEqual(dbTask.segments[2].notes, ["F"]);

const bTask = buildTask(MAJOR_KEYS.find((key) => key.id === "B"));
assert.deepEqual(bTask.segments[1].notes, ["A♯", "C♯", "E", "F♯", "G", "A", "G", "F♯", "E"]);

const cPitchRows = cTask.segments.map((segment) => (
  segment.notes.map((note) => PITCH_CLASS[note])
));

MAJOR_KEYS.forEach((key) => {
  const task = buildTask(key);
  task.segments.forEach((segment, segmentIndex) => {
    assert.deepEqual(
      segment.notes.filter((note) => !(note in PITCH_CLASS)),
      [],
      `${task.key} ${segment.chord} has unsupported note spelling`,
    );

    assert.deepEqual(
      segment.notes.filter((note) => /♯♯|♭♭/.test(note)),
      [],
      `${task.key} ${segment.chord} should not use double accidentals`,
    );

    assert.deepEqual(
      segment.notes.map((note) => PITCH_CLASS[note]),
      cPitchRows[segmentIndex].map((pitchClass) => (pitchClass + key.pitch) % 12),
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

assert(fs.existsSync(path.join(__dirname, "../assets/licks/lick-1.jpg")));
const lick1Html = fs.readFileSync(path.join(__dirname, "../licks/1/index.html"), "utf8");
const lick1Source = fs.readFileSync(path.join(__dirname, "../src/lick-1.js"), "utf8");
assert(lick1Html.includes("lick-1.js?v=20260730-lick-hide-answer-button"));
assert(lick1Source.includes("lick-answer-button"));
assert(lick1Source.includes("state.answerVisible ? `"));
assert(!lick1Source.includes("<p>${task.progression}</p>"));

console.log("Lick 1 validation passed");
