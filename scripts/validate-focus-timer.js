const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  DURATION_SECONDS,
  formatTime,
} = require("../src/focus-timer.js");

assert.equal(DURATION_SECONDS, 300);
assert.equal(formatTime(300), "5:00");
assert.equal(formatTime(0), "0:00");
assert.equal(formatTime(-1), "0:00");

const root = path.join(__dirname, "..");
const homeHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const timerHtml = fs.readFileSync(path.join(root, "focus-timer/index.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const timerSource = fs.readFileSync(path.join(root, "src/focus-timer.js"), "utf8");

assert(homeHtml.includes("href=\"./focus-timer/\""));
assert(homeHtml.indexOf("5分間タイマー") < homeHtml.indexOf("ハノン"));
assert(homeHtml.includes("styles.css?v=20260927-tablet-fullscreen"));
assert(homeHtml.includes("home-divider"));
assert(timerHtml.includes("何に焦点を合わせるか"));
assert(timerHtml.includes("次のタイマー"));
assert(timerHtml.includes("src/focus-timer.js?v=20260927-persistent"));
assert(styles.includes(".focus-timer-stage"));
assert(styles.includes(".home-divider"));
assert(timerSource.includes("dom.startButton.disabled = state.running || !hasFocus"));
assert(timerSource.includes("state.remainingSeconds = DURATION_SECONDS"));
assert(timerSource.includes("dom.form.hidden = true"));

console.log("Focus timer validation passed");

const vm = require("node:vm");
let now = 1000000;
const storage = new Map();
function page() {
  const nodes = new Map();
  const events = {};
  const callbacks = new Map();
  let interval = 0;
  const document = {
    querySelector(id) {
      if (!nodes.has(id)) nodes.set(id, {
        value: "", hidden: false, focus() {},
        addEventListener(event, handler) { this[event] = handler; },
      });
      return nodes.get(id);
    },
  };
  vm.runInNewContext(timerSource, {
    document, Date: { now: () => now },
    localStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    setInterval(fn) { callbacks.set(++interval, fn); return interval; },
    clearInterval(id) { callbacks.delete(id); },
    addEventListener(event, fn) { events[event] = fn; },
  });
  return { node: (id) => document.querySelector(`#focus-${id}`), tick: () => callbacks.forEach((fn) => fn()), events };
}
const first = page();
first.node("input").value = "左手";
first.node("form").submit({ preventDefault() {} });
assert.equal(first.node("time").textContent, "5:00");
assert.equal(first.node("stop-button").hidden, false);
now += 90000; // No ticks while away from the page.
const restored = page();
assert.equal(restored.node("time").textContent, "3:30");
assert.equal(restored.node("current").textContent, "左手");
assert(restored.node("form").hidden);
now += 240000;
restored.tick();
assert.equal(restored.node("time").textContent, "+0:30");
restored.node("stop-button").click();
now += 60000;
const stopped = page();
assert.equal(stopped.node("time").textContent, "+0:30");
assert(stopped.node("stop-button").hidden);
assert.equal(stopped.node("next-button").hidden, false);
first.events.storage({ key: "jazz-focus-timer-v1" });
assert.equal(first.node("time").textContent, "+0:30");
assert(first.node("stop-button").hidden);
stopped.node("next-button").click();
first.events.pageshow();
assert.equal(first.node("time").textContent, "5:00");
assert.equal(first.node("form").hidden, false);
assert.equal(page().node("time").textContent, "5:00");
assert(!homeHtml.includes('href="./all-the-things-you-are/"'));
assert(!homeHtml.includes('href="./instagram-lick/"'));
console.log("Persistent timer navigation, overtime, stop, and sync validation passed");
