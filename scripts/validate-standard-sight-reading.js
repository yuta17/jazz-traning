const assert = require("node:assert/strict");
const { jazzStandards } = require("../src/jazz-standards.js");
const {
  HISTORY_LIMIT,
  loadHistory,
  randomSong,
  recentTitlesForCategory,
} = require("../src/standard-sight-reading.js");

assert.equal(jazzStandards.priority31.length, 31);
assert.equal(jazzStandards.next47.length, 47);
assert.equal(jazzStandards.fourHit76.length, 76);

Object.values(jazzStandards).forEach((songs) => {
  assert.equal(new Set(songs).size, songs.length);
  songs.forEach((song) => assert.equal(typeof song, "string"));
});

assert.equal(randomSong(["A", "B", "C"], [], () => 0), "A");
assert.equal(randomSong(["A", "B", "C"], [], () => 0.999), "C");
assert.equal(randomSong(["A", "B", "C"], ["A", "B"], () => 0), "C");
assert.equal(randomSong(["A"], ["A"], () => 0), "A");

const sampleHistory = [
  { title: "One", category: "priority31" },
  { title: "Other", category: "next47" },
  { title: "Two", category: "priority31" },
];
assert.deepEqual(recentTitlesForCategory("priority31", sampleHistory), ["One", "Two"]);

const validStoredHistory = Array.from({ length: 12 }, (_, index) => ({
  title: `Song ${index}`,
  category: "priority31",
}));
assert.equal(loadHistory({ getItem: () => JSON.stringify(validStoredHistory) }).length, HISTORY_LIMIT);
assert.deepEqual(loadHistory({ getItem: () => "invalid json" }), []);

console.log("Standard sight-reading validation passed");
