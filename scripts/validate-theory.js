const assert = require("node:assert/strict");
const theory = require("../src/theory.js");

const byId = new Map(theory.KEYS.map((key) => [key.id, key]));

assert.equal(theory.KEYS.length, 12);
assert.deepEqual(byId.get("Db").major, ["E♭m7", "A♭7", "D♭maj7"]);
assert.deepEqual(byId.get("B").major, ["C♯m7", "F♯7", "Bmaj7"]);
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
assert.equal(majorMinorDeck.length, 24);
assert.equal(
  majorMinorDeck.filter((task) => task.quality === "major").length,
  12,
);
assert.equal(
  majorMinorDeck.filter((task) => task.quality === "minor").length,
  12,
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

console.log("Theory validation passed");
