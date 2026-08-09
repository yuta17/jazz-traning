const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { KEYS, ROUND_SIZE, VOICINGS, buildDeck, buildTask, noteForDegree, solfegeForNote } = require("../src/rootless-9th.js");

assert.equal(ROUND_SIZE, 12);
assert.equal(KEYS.length, 12);
assert.deepEqual(VOICINGS.map(({ id, degrees }) => [id, degrees]), [
  ["root", [3, 5, 7, 9]],
  ["second", [7, 9, 3, 5]],
]);

const keyC = KEYS.find((item) => item.id === "C");
const keyF = KEYS.find((item) => item.id === "F");
const keyB = KEYS.find((item) => item.id === "B");
const keyDb = KEYS.find((item) => item.id === "D♭");
assert.deepEqual(buildTask(keyC, VOICINGS[0]).notes, [
  { degree: 3, note: "ミ" }, { degree: 5, note: "ソ" }, { degree: 7, note: "シ" }, { degree: 9, note: "レ" },
]);
assert.deepEqual(buildTask(keyF, VOICINGS[1]).notes, [
  { degree: 7, note: "ミ" }, { degree: 9, note: "ソ" }, { degree: 3, note: "ラ" }, { degree: 5, note: "ド" },
]);
assert.deepEqual(buildTask(keyB, VOICINGS[1]).notes, [
  { degree: 7, note: "ラ♯" }, { degree: 9, note: "ド♯" }, { degree: 3, note: "レ♯" }, { degree: 5, note: "ファ♯" },
]);
assert.deepEqual(buildTask(keyDb, VOICINGS[0]).notes, [
  { degree: 3, note: "ファ" }, { degree: 5, note: "ラ♭" }, { degree: 7, note: "ド" }, { degree: 9, note: "ミ♭" },
]);
assert.equal(noteForDegree(keyF, 9), "G");
assert.equal(solfegeForNote("G♭"), "ソ♭");

const deck = buildDeck();
assert.equal(deck.length, ROUND_SIZE);
assert.equal(new Set(deck.map((task) => task.key.id)).size, 12);
assert.equal(deck.filter((task) => task.voicing.id === "root").length, 6);
assert.equal(deck.filter((task) => task.voicing.id === "second").length, 6);

const html = fs.readFileSync(path.join(__dirname, "../rootless-9th/index.html"), "utf8");
assert(html.includes("rootless-9th.js?v=20260809-rootless9th"));
assert(html.includes("daily-progress.js?v=20260809-rootless9th"));
console.log("Rootless 9th validation passed");
