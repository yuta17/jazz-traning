const assert = require("node:assert/strict");
const {
  CHORD_QUALITIES,
  LIMIT_SECONDS,
  ROUND_SIZE,
  buildChord,
  createDeck,
  createFullDeck,
} = require("../src/chord-flash.js");

assert.equal(LIMIT_SECONDS, 5);
assert.equal(ROUND_SIZE, 10);
assert.equal(CHORD_QUALITIES.length, 5);
assert.deepEqual(
  CHORD_QUALITIES.map((quality) => quality.id),
  ["maj7", "m7", "7", "m7b5", "dim7"],
);

CHORD_QUALITIES.forEach((quality) => {
  assert.equal(quality.roots.length, 12);
  assert.equal(quality.intervals.length, 4);
  assert.equal(quality.degrees.length, 4);
});

const fullDeck = createFullDeck();
assert.equal(fullDeck.length, 60);
assert.equal(new Set(fullDeck.map((chord) => chord.id)).size, 60);

const deck = createDeck();
assert.equal(deck.length, 10);
assert.equal(new Set(deck.map((chord) => chord.id)).size, 10);
CHORD_QUALITIES.forEach((quality) => {
  assert.equal(deck.filter((chord) => chord.qualityId === quality.id).length, 2);
});

deck.forEach((chord) => {
  assert(chord.label);
  assert.equal(chord.notes.length, 4);
  chord.notes.forEach((note) => {
    assert(!note.includes("𝄫"));
    assert(!note.includes("𝄪"));
    assert(!["C♭", "F♭", "B♯", "E♯"].includes(note));
  });
});

function quality(id) {
  return CHORD_QUALITIES.find((item) => item.id === id);
}

assert.deepEqual(
  buildChord("B♭", quality("maj7")),
  {
    id: "B♭-maj7",
    label: "B♭maj7",
    notes: ["B♭", "D", "F", "A"],
    root: "B♭",
    qualityId: "maj7",
    qualityLabel: "maj7",
  },
);

assert.deepEqual(buildChord("F♯", quality("m7b5")).notes, ["F♯", "A", "C", "E"]);
assert.deepEqual(buildChord("G", quality("7")).notes, ["G", "B", "D", "F"]);
assert.deepEqual(buildChord("C♯", quality("dim7")).notes, ["C♯", "E", "G", "B♭"]);
assert.deepEqual(buildChord("A", quality("m7")).notes, ["A", "C", "E", "G"]);

console.log("Chord flash validation passed");
