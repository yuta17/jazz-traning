const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { CHORDS, KEYS, ROUND_SIZE, SEQUENCES, buildDeck, buildTask } = require("../src/rootless-251.js");

assert.equal(ROUND_SIZE, 12);
assert.equal(KEYS.length, 12);
assert.deepEqual(SEQUENCES.map((item) => item.id), ["2R2", "R2R"]);
assert.deepEqual(CHORDS.map((item) => item.label), ["ii−7", "V7", "Imaj7"]);
const keyC = KEYS.find((item) => item.id === "C");
assert.deepEqual(buildTask(keyC, SEQUENCES[0]).chords, [
  { label: "ii−7", notes: [{ degree: "♭7", note: "ド" }, { degree: "9", note: "ミ" }, { degree: "♭3", note: "ファ" }, { degree: "5", note: "ラ" }] },
  { label: "V7", notes: [{ degree: "3", note: "シ" }, { degree: "5", note: "レ" }, { degree: "♭7", note: "ファ" }, { degree: "9", note: "ラ" }] },
  { label: "Imaj7", notes: [{ degree: "7", note: "シ" }, { degree: "9", note: "レ" }, { degree: "3", note: "ミ" }, { degree: "5", note: "ソ" }] },
]);
assert.deepEqual(buildTask(keyC, SEQUENCES[1]).chords.map((chord) => chord.notes.map((note) => note.note)), [
  ["ファ", "ラ", "ド", "ミ"], ["ファ", "ラ", "シ", "レ"], ["ミ", "ソ", "シ", "レ"],
]);
const deck = buildDeck();
assert.equal(deck.length, 12);
assert.equal(new Set(deck.map((task) => task.key.id)).size, 12);
assert.equal(deck.filter((task) => task.sequence.id === "2R2").length, 6);
assert.equal(deck.filter((task) => task.sequence.id === "R2R").length, 6);
const html = fs.readFileSync(path.join(__dirname, "../rootless-251/index.html"), "utf8");
assert(html.includes("rootless-251.js?v=20260809-rootless251"));
console.log("Rootless 2-5-1 validation passed");
