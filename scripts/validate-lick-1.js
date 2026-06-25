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

assert.equal(ROUND_SIZE, 12);
assert.equal(MAJOR_KEYS.length, 12);
assert.equal(new Set(MAJOR_KEYS.map((key) => key.id)).size, 12);
assert.deepEqual(
  LICK_SEGMENTS.map((segment) => segment.degree),
  ["II-7", "V7", "Imaj"],
);

LICK_SEGMENTS.forEach((segment) => {
  assert.equal(segment.intervals.length, segment.degreeLabels.length);
  assert(segment.intervals.length > 0);
});

const cTask = buildTask(MAJOR_KEYS.find((key) => key.id === "C"));
assert.equal(cTask.key, "C");
assert.equal(cTask.progression, "D-7 → G7 → Cmaj");
assert.deepEqual(cTask.segments[0].degreeLabels, ["1", "♭3", "5", "♭7", "13", "5", "♭3", "1"]);
assert.deepEqual(cTask.segments[0].notes, ["D", "F", "A", "C", "B", "A", "F", "D"]);
assert.deepEqual(cTask.segments[1].degreeLabels, ["1", "3", "5", "♭7", "♭9", "1", "♭7", "13", "5"]);
assert.deepEqual(cTask.segments[1].notes, ["G", "B", "D", "F", "A♭", "G", "F", "E", "D"]);
assert.deepEqual(cTask.segments[2].notes, ["C"]);

const dbTask = buildTask(MAJOR_KEYS.find((key) => key.id === "Db"));
assert.equal(dbTask.progression, "E♭-7 → A♭7 → D♭maj");
assert.deepEqual(dbTask.segments[0].notes, ["E♭", "G♭", "B♭", "D♭", "C", "B♭", "G♭", "E♭"]);
assert.deepEqual(dbTask.segments[1].notes, ["A♭", "C", "E♭", "G♭", "A", "A♭", "G♭", "F", "E♭"]);

const deck = createDeck();
assert.equal(deck.length, 12);
assert.equal(new Set(deck.map((task) => task.id)).size, 12);
deck.forEach((task) => {
  assert.equal(task.segments.length, 3);
  assert(task.progression.includes(" → "));
});

assert(fs.existsSync(path.join(__dirname, "../assets/licks/lick-1.jpg")));

console.log("Lick 1 validation passed");
