const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { QUALITIES, ROOTS, ROUND_SIZE, VOICINGS, buildDeck, buildTask, solfegeForNote } = require("../src/rootless-9th.js");

assert.equal(ROUND_SIZE, 12);
assert.equal(ROOTS.length, 12);
assert.deepEqual(QUALITIES.map((item) => [item.id, item.degrees]), [
  ["maj7", ["3", "5", "7", "9"]], ["m7", ["♭3", "5", "♭7", "9"]], ["7", ["3", "5", "♭7", "9"]],
]);
assert.deepEqual(VOICINGS.map((item) => item.id), ["root", "second"]);
const quality = (id) => QUALITIES.find((item) => item.id === id);
assert.deepEqual(buildTask("C", quality("maj7"), VOICINGS[0]).notes, [
  { degree: "3", note: "ミ" }, { degree: "5", note: "ソ" }, { degree: "7", note: "シ" }, { degree: "9", note: "レ" },
]);
assert.deepEqual(buildTask("C", quality("7"), VOICINGS[0]).notes, [
  { degree: "3", note: "ミ" }, { degree: "5", note: "ソ" }, { degree: "♭7", note: "シ♭" }, { degree: "9", note: "レ" },
]);
assert.deepEqual(buildTask("C", quality("m7"), VOICINGS[1]).notes, [
  { degree: "♭7", note: "シ♭" }, { degree: "9", note: "レ" }, { degree: "♭3", note: "ミ♭" }, { degree: "5", note: "ソ" },
]);
assert.deepEqual(buildTask("D♭", quality("maj7"), VOICINGS[0]).notes, [
  { degree: "3", note: "ファ" }, { degree: "5", note: "ラ♭" }, { degree: "7", note: "ド" }, { degree: "9", note: "ミ♭" },
]);
assert.equal(solfegeForNote("G♭"), "ソ♭");
const deck = buildDeck();
assert.equal(deck.length, 12);
assert.equal(new Set(deck.map((task) => task.code)).size, 12);
assert.deepEqual(QUALITIES.map((quality) => deck.filter((task) => task.quality.id === quality.id).length), [4, 4, 4]);
assert.equal(deck.filter((task) => task.voicing.id === "root").length, 6);
assert.equal(deck.filter((task) => task.voicing.id === "second").length, 6);
const html = fs.readFileSync(path.join(__dirname, "../rootless-9th/index.html"), "utf8");
assert(html.includes("rootless-9th.js?v=20260809-rootless9th"));
console.log("Rootless 9th validation passed");
