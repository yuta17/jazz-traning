const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  DEGREES,
  KEYS,
  NOTE_OPTIONS,
  ROUND_SIZE,
  answerLabel,
  balancedDegrees,
  buildDeck,
  degreeIndex,
  noteForDegree,
  scaleSummary,
  solfegeForNote,
} = require("../src/degree-note.js");

assert.equal(ROUND_SIZE, 12);
assert.deepEqual(DEGREES, [1, 3, 5, 7, 9, 11, 13]);
assert.equal(KEYS.length, 12);
assert.equal(new Set(KEYS.map((key) => key.id)).size, 12);
assert.equal(NOTE_OPTIONS.includes("C♭"), true);
assert.equal(NOTE_OPTIONS.includes("D♯"), true);
assert.equal(NOTE_OPTIONS.includes("A♯"), true);

const keyF = KEYS.find((key) => key.id === "F");
const keyGb = KEYS.find((key) => key.id === "Gb");
const keyB = KEYS.find((key) => key.id === "B");

assert.equal(noteForDegree(keyF, 1), "F");
assert.equal(noteForDegree(keyF, 3), "A");
assert.equal(noteForDegree(keyF, 9), "G");
assert.equal(noteForDegree(keyF, 11), "B♭");
assert.equal(noteForDegree(keyF, 13), "D");
assert.equal(noteForDegree(keyGb, 11), "C♭");
assert.equal(noteForDegree(keyB, 9), "C♯");
assert.equal(noteForDegree(keyB, 13), "G♯");

assert.equal(degreeIndex(1), 0);
assert.equal(degreeIndex(7), 6);
assert.equal(degreeIndex(9), 1);
assert.equal(degreeIndex(13), 5);
assert.equal(degreeIndex(2), -1);

assert.equal(solfegeForNote("A"), "ラ");
assert.equal(solfegeForNote("B♭"), "シ♭");
assert.equal(solfegeForNote("C♯"), "ド♯");
assert.equal(answerLabel("G"), "G（ソ）");

assert.deepEqual(
  scaleSummary(keyF, 9),
  [
    { degree: 1, note: "F", active: false },
    { degree: 3, note: "A", active: false },
    { degree: 5, note: "C", active: false },
    { degree: 7, note: "E", active: false },
    { degree: 9, note: "G", active: true },
    { degree: 11, note: "B♭", active: false },
    { degree: 13, note: "D", active: false },
  ],
);

assert.equal(balancedDegrees(12).length, 12);
balancedDegrees(28).forEach((degree) => assert(DEGREES.includes(degree)));

const deck = buildDeck();
assert.equal(deck.length, 12);
assert.equal(new Set(deck.map((task) => task.key.id)).size, 12);
deck.forEach((task) => {
  assert(DEGREES.includes(task.degree));
  assert.equal(task.answer, noteForDegree(task.key, task.degree));
  assert(NOTE_OPTIONS.includes(task.answer));
});

KEYS.forEach((key) => {
  DEGREES.forEach((degree) => {
    assert(NOTE_OPTIONS.includes(noteForDegree(key, degree)));
  });
});

const html = fs.readFileSync(path.join(__dirname, "../degree-note/index.html"), "utf8");
assert(html.includes("styles.css?v=20260804-degree-note"));
assert(html.includes("daily-progress.js?v=20260804-degree-note"));
assert(html.includes("degree-note.js?v=20260804-degree-note"));

console.log("Degree note validation passed");
