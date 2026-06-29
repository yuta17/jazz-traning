const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { TRAINING_ID } = require("../src/instagram-lick.js");
const { TRAINING_IDS } = require("../src/daily-progress.js");

assert.equal(TRAINING_ID, "instagram-lick");
assert(TRAINING_IDS.includes(TRAINING_ID));
assert(fs.existsSync(path.join(__dirname, "../instagram-lick/index.html")));

const html = fs.readFileSync(path.join(__dirname, "../instagram-lick/index.html"), "utf8");
assert(html.includes("1小節耳コピしよう"));
assert(html.includes("1小節"));
assert(html.includes("弾けた"));
assert(html.includes("src/instagram-lick.js"));

console.log("Instagram lick validation passed");
