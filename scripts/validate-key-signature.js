const assert = require("node:assert/strict");
const {
  ANSWER_OPTIONS,
  KEY_SIGNATURES,
  MODE_LABELS,
  MODES,
  ROUND_SIZE,
  answerForTask,
  balancedModes,
  buildDeck,
  sanitizeModes,
  signatureLabel,
} = require("../src/key-signature.js");

assert.equal(ROUND_SIZE, 12);
assert.deepEqual(MODES, ["major", "minor"]);
assert.deepEqual(MODE_LABELS, {
  major: "メジャー",
  minor: "マイナー",
});

assert.deepEqual(sanitizeModes(["minor", "unknown", "major"]), ["major", "minor"]);
assert.deepEqual(sanitizeModes(["unknown"]), []);
assert.deepEqual(balancedModes(["major"], 12), Array(12).fill("major"));

assert.equal(KEY_SIGNATURES.length, 12);
assert.equal(new Set(KEY_SIGNATURES.map((item) => item.id)).size, 12);
assert.deepEqual(ANSWER_OPTIONS.major, [
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
assert.deepEqual(ANSWER_OPTIONS.minor, [
  "A",
  "B♭",
  "B",
  "C",
  "C♯",
  "D",
  "E♭",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
]);

assert.deepEqual(
  KEY_SIGNATURES.map((item) => signatureLabel(item)),
  [
    "♯/♭なし",
    "♭ 1個",
    "♭ 2個",
    "♭ 3個",
    "♭ 4個",
    "♭ 5個",
    "♭ 6個",
    "♯ 5個",
    "♯ 4個",
    "♯ 3個",
    "♯ 2個",
    "♯ 1個",
  ],
);

KEY_SIGNATURES.forEach((signature) => {
  assert(signature.major);
  assert(signature.minor);
  assert.equal(answerForTask({ signature, mode: "major" }), signature.major);
  assert.equal(answerForTask({ signature, mode: "minor" }), signature.minor);
});

const majorDeck = buildDeck(["major"]);
assert.equal(majorDeck.length, 12);
assert.equal(new Set(majorDeck.map((task) => task.signature.id)).size, 12);
assert.equal(majorDeck.filter((task) => task.mode === "major").length, 12);

const minorDeck = buildDeck(["minor"]);
assert.equal(minorDeck.length, 12);
assert.equal(new Set(minorDeck.map((task) => task.signature.id)).size, 12);
assert.equal(minorDeck.filter((task) => task.mode === "minor").length, 12);

const mixedDeck = buildDeck(["major", "minor"]);
assert.equal(mixedDeck.length, 12);
assert.equal(new Set(mixedDeck.map((task) => task.signature.id)).size, 12);
assert.equal(mixedDeck.filter((task) => task.mode === "major").length, 6);
assert.equal(mixedDeck.filter((task) => task.mode === "minor").length, 6);
mixedDeck.forEach((task) => {
  assert.equal(task.answer, task.signature[task.mode]);
});

assert.deepEqual(buildDeck([]), []);

console.log("Key signature validation passed");
