const assert = require("node:assert/strict");
const theory = require("../src/theory.js");

const byId = new Map(theory.KEYS.map((key) => [key.id, key]));

assert.equal(theory.KEYS.length, 12);
assert.equal(theory.ROUND_SIZE, 12);
assert.deepEqual(byId.get("Db").major, ["E♭m7", "A♭7", "D♭△7"]);
assert.deepEqual(byId.get("B").major, ["C♯m7", "F♯7", "B△7"]);
assert.deepEqual(byId.get("C").minor, ["D-7(♭5)", "G7", "C-7"]);
assert.deepEqual(byId.get("Bb").minor, ["C-7(♭5)", "F7", "B♭-7"]);

const majorOnlyDeck = theory.buildDeck({
  major: ["RRR", "R2R", "2R2"],
  minor: [],
});
assert.equal(majorOnlyDeck.length, 12);
assert.equal(new Set(majorOnlyDeck.map((task) => task.keyId)).size, 12);
assert(majorOnlyDeck.every((task) => task.quality === "major"));

const majorMinorDeck = theory.buildDeck({
  major: ["R2R"],
  minor: ["2R2"],
});
assert.equal(majorMinorDeck.length, 12);

assert.equal(
  majorMinorDeck.filter((task) => task.quality === "major").length,
  6,
);
assert.equal(
  majorMinorDeck.filter((task) => task.quality === "minor").length,
  6,
);

const variationDeck = theory.buildDeck({
  major: ["RRR", "R2R", "2R2"],
  minor: [],
});
const counts = variationDeck.reduce((acc, task) => {
  acc[task.variation] = (acc[task.variation] || 0) + 1;
  return acc;
}, {});
assert.deepEqual(counts, { RRR: 4, R2R: 4, "2R2": 4 });

for (const minor of [["minor"], ["RRR"], ["R2R", "2R2"]]) {
  assert.deepEqual(theory.sanitizeSettings({ minor }).minor, ["minor"]);
  for (const major of [[], ["R2R"]]) {
    const deck = theory.buildDeck({ major, minor });
    assert.equal(deck.length, 12);
    const minorTasks = deck.filter((task) => task.quality === "minor");
    assert.deepEqual([...new Set(minorTasks.map((task) => task.keyId))].sort(), ["Bb", "C", "D", "F", "G"]);
    const counts = theory.MINOR_KEY_IDS.map((id) => minorTasks.filter((task) => task.keyId === id).length);
    assert(Math.max(...counts) - Math.min(...counts) <= 1);
    assert(minorTasks.every((task) => task.variation === "minor"));
  }
}
assert.equal(theory.buildDeck({ major: [], minor: [] }).length, 0);
console.log("Theory validation passed");
