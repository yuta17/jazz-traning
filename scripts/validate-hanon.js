const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  HANON_NUMBERS,
  HANON_VIDEOS,
  TRAINING_ID,
  pickNumber,
} = require("../src/hanon.js");

assert.equal(TRAINING_ID, "hanon");
assert.deepEqual(HANON_NUMBERS, [1, 2, 3, 4, 5]);
assert.equal(pickNumber(() => 0), 1);
assert.equal(pickNumber(() => 0.199), 1);
assert.equal(pickNumber(() => 0.2), 2);
assert.equal(pickNumber(() => 0.999), 5);

for (let i = 0; i < 100; i += 1) {
  assert(HANON_NUMBERS.includes(pickNumber()));
}

const html = fs.readFileSync(path.join(__dirname, "../hanon/index.html"), "utf8");
assert(html.includes("<title>ハノン</title>"));
assert(html.includes("<h1>ハノン</h1>"));
assert(html.includes('aria-label="ハノン"'));
assert(html.includes('id="hanon-done-button"'));
assert(html.includes("練習した"));
assert(html.includes("styles.css?v=20260925-hanon-videos"));
assert(html.includes("hanon.js?v=20260925-hanon-videos"));
assert(!html.includes("ハノン番号"));
assert(!html.includes(">番号<"));

const source = fs.readFileSync(path.join(__dirname, "../src/hanon.js"), "utf8");
assert(source.includes("JazzDailyProgress?.mark(TRAINING_ID)"));
assert(!source.includes("JazzDailyProgress?.mark(\"hanon\")"));

const vm = require("node:vm");
for (const number of HANON_NUMBERS) {
  const nodes = new Map();
  const document = {
    querySelector(selector) {
      if (!nodes.has(selector)) nodes.set(selector, {
        setAttribute() {}, addEventListener() {},
      });
      return nodes.get(selector);
    },
  };
  vm.runInNewContext(source, { document, Math: { random: () => (number - 0.5) / 5, min: Math.min, floor: Math.floor } });
  assert.equal(document.querySelector("#hanon-number").textContent, number);
  const player = document.querySelector("#hanon-video");
  assert.equal(player.src, `https://www.youtube-nocookie.com/embed/${HANON_VIDEOS[number]}`);
  assert.equal(player.title, `ハノン第${number}番の参考動画`);
  assert.equal(document.querySelector("#hanon-video-link").href, `https://www.youtube.com/watch?v=${HANON_VIDEOS[number]}`);
}
console.log("Hanon validation passed");
