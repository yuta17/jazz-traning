const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const theory = require("../src/theory.js");
const source = fs.readFileSync(path.join(__dirname, "../src/app.js"), "utf8");

for (const quality of ["major", "minor"]) {
  for (const [random, label] of [[0, "3から"], [0.49, "3から"], [0.5, "5から"], [0.99, "5から"]]) {
    for (const alt of [false, true]) {
      const settings = { major: [], minor: [], [quality]: ["R2R"] };
      const task = theory.buildDeck(settings).find((item) => item.keyId === "C");
      const nodes = new Map();
      const checkboxes = ["major", "minor"].flatMap((name) => theory.VARIATIONS.map((value) => ({ name, value, addEventListener() {} })));
      const document = {
        querySelectorAll: () => checkboxes,
        querySelector(selector) {
          if (!nodes.has(selector)) nodes.set(selector, { addEventListener(event, fn) { this[event] = fn; } });
          return nodes.get(selector);
        },
      };
      const window = {
        JazzTheory: { ...theory, buildDeck: () => [task] },
        matchMedia: () => ({ matches: true }),
      };
      vm.runInNewContext(source, {
        window, document, Math: { ...Math, random: () => quality === "minor" ? random : (alt ? 0.1 : 0.9), floor: Math.floor },
        requestAnimationFrame() {},
        localStorage: { getItem: () => JSON.stringify({ settings }), setItem() {} },
      });
      document.querySelector("#start-button").click();
      const panel = document.querySelector("#question-panel");
      assert(panel.innerHTML.includes(task.chords[0].symbol));
      assert(panel.innerHTML.includes(task.chords[1].symbol));
      assert(!panel.innerHTML.includes(task.chords[2].symbol));
      const expectedLabel = quality === "minor" ? label : "R2R";
      assert.equal(panel.innerHTML.includes('class="voicing-pill"'), Boolean(expectedLabel));
      if (expectedLabel) assert(panel.innerHTML.includes(`>${expectedLabel}</span>`));
      assert(!panel.innerHTML.includes("ラベルなし"));
      assert(!panel.innerHTML.includes("2nd"));
      assert(!panel.innerHTML.includes("7から"));
      assert.equal(panel.innerHTML.includes('>alt</span>'), quality === "minor" || alt);
      document.querySelector("#reveal-button").click();
      assert(panel.innerHTML.includes(task.chords[2].symbol));
      assert.equal(panel.innerHTML.includes('>alt</span>'), quality === "minor" || alt);
      if (quality === "minor") {
        assert.equal(panel.innerHTML.includes('class="voicing-pill"'), Boolean(label));
        if (label) assert(panel.innerHTML.includes(`>${label}</span>`));
      }
    }
  }
}
console.log("II-V-I UI validation passed");
