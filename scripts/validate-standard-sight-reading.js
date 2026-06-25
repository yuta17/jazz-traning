const assert = require("node:assert/strict");
const { STANDARD_SONGS } = require("../src/standard-songs.js");
const {
  fallbackTrainingDayKey,
  hashString,
} = require("../src/standard-sight-reading.js");

assert.equal(STANDARD_SONGS.length, 1460);
assert.equal(STANDARD_SONGS[0].title, "9.20 Special");
assert.equal(STANDARD_SONGS[0].composer, "Warren Earl");
assert.equal(STANDARD_SONGS.at(-1).title, "Zoltan");
assert.equal(STANDARD_SONGS.at(-1).composer, "Shaw Woody");
assert.equal(new Set(STANDARD_SONGS.map((song) => song.title.toLowerCase())).size, 1460);

STANDARD_SONGS.forEach((song) => {
  assert(song.title);
  assert(song.composer);
});

assert.equal(fallbackTrainingDayKey(new Date(2026, 5, 10, 5, 59)), "2026-06-09");
assert.equal(fallbackTrainingDayKey(new Date(2026, 5, 10, 6, 0)), "2026-06-10");
assert.equal(hashString("2026-06-10"), hashString("2026-06-10"));
assert.notEqual(hashString("2026-06-10"), hashString("2026-06-11"));

console.log("Standard sight-reading validation passed");
