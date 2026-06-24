const assert = require("node:assert/strict");
const {
  ROOTLESS_QUALITIES,
  ROOTS,
  ROUND_SIZE,
  buildVoicing,
  createDeck,
  createFullDeck,
} = require("../src/rootless-9th.js");

assert.equal(ROUND_SIZE, 12);
assert.equal(ROOTS.length, 12);
assert.deepEqual(
  ROOTLESS_QUALITIES.map((quality) => quality.id),
  ["maj7", "7", "m7", "m7b5"],
);

ROOTLESS_QUALITIES.forEach((quality) => {
  assert.equal(quality.degrees.length, 4);
  assert.equal(quality.degreeLabels.length, 4);
  assert.equal(quality.intervals.length, 4);
});

function quality(id) {
  return ROOTLESS_QUALITIES.find((item) => item.id === id);
}

assert.deepEqual(buildVoicing("C", quality("maj7")).kanaNotes, ["ミ", "ソ", "シ", "レ"]);
assert.deepEqual(buildVoicing("F", quality("7")).kanaNotes, ["ラ", "ド", "ミ♭", "ソ"]);
assert.deepEqual(buildVoicing("B♭", quality("m7")).kanaNotes, ["レ♭", "ファ", "ラ♭", "ド"]);
assert.deepEqual(buildVoicing("C", quality("m7b5")).kanaNotes, ["ミ♭", "ソ♭", "シ♭", "レ"]);

const fullDeck = createFullDeck();
assert.equal(fullDeck.length, 48);
assert.equal(new Set(fullDeck.map((task) => task.id)).size, 48);

const deck = createDeck();
assert.equal(deck.length, 12);
assert.equal(new Set(deck.map((task) => task.root)).size, 12);

ROOTLESS_QUALITIES.forEach((qualityItem) => {
  assert.equal(deck.filter((task) => task.qualityId === qualityItem.id).length, 3);
});

deck.forEach((task) => {
  assert(task.label);
  assert.equal(task.notes.length, 4);
  assert.equal(task.kanaNotes.length, 4);
  assert.equal(task.noteLine.split(" ").length, 4);
  task.notes.forEach((note) => {
    assert(note.degree);
    assert(note.kana);
    assert(note.help);
    assert(!note.symbol.includes("𝄫"));
    assert(!note.symbol.includes("𝄪"));
    assert(!["C♭", "F♭", "B♯", "E♯"].includes(note.symbol));
  });
});

console.log("Rootless 9th validation passed");
