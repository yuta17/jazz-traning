const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  EAR_COPY_SONGS,
  TRAINING_ID,
  songForDay,
  trainingDayKey,
} = require("../src/instagram-lick.js");
const { TRAINING_IDS } = require("../src/daily-progress.js");

assert.equal(TRAINING_ID, "instagram-lick");
assert(TRAINING_IDS.includes(TRAINING_ID));
assert.equal(EAR_COPY_SONGS.length, 5);
assert.deepEqual(
  EAR_COPY_SONGS.map((song) => song.title),
  ["So What", "Blue Monk", "C Jam Blues", "Now's The Time", "Autumn Leaves"],
);
EAR_COPY_SONGS.forEach((song) => {
  assert(song.artist);
  assert(song.youtubeUrl.startsWith("https://www.youtube.com/watch?v="));
});

assert.equal(trainingDayKey(new Date(2026, 5, 29, 5, 59)), "2026-06-28");
assert.equal(trainingDayKey(new Date(2026, 5, 29, 6, 0)), "2026-06-29");

const todaySong = songForDay(new Date(2026, 5, 29, 12, 0));
assert.equal(todaySong.day, "2026-06-29");
assert.equal(todaySong.total, 5);
assert(EAR_COPY_SONGS.some((song) => song.id === todaySong.id));

assert(fs.existsSync(path.join(__dirname, "../instagram-lick/index.html")));

const html = fs.readFileSync(path.join(__dirname, "../instagram-lick/index.html"), "utf8");
assert(html.includes("1小節耳コピしよう"));
assert(html.includes("今日の1曲"));
assert(html.includes("弾けた"));
assert(html.includes("src/instagram-lick.js"));

console.log("Instagram lick validation passed");
