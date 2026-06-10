const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("src/dim7.js", "utf8");
const sandbox = {
  document: {
    querySelector() {
      return {
        addEventListener() {},
        hidden: false,
        disabled: false,
        textContent: "",
      };
    },
  },
  localStorage: {
    getItem() {
      return null;
    },
    setItem() {},
  },
  requestAnimationFrame() {},
  window: {
    matchMedia() {
      return { matches: true };
    },
  },
};

vm.createContext(sandbox);
vm.runInContext(source, sandbox);

const chordMatches = source.match(/label: "([^"]+dim7)"/g) || [];
const noteMatches = source.match(/notes: \[([^\]]+)\]/g) || [];

assert.equal(chordMatches.length, 12);
assert.equal(new Set(chordMatches).size, 12);
assert.equal(noteMatches.length, 12);

noteMatches.forEach((match) => {
  const notes = match
    .replace(/^notes: \[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((note) => note.trim());
  assert.equal(notes.length, 4);
});

console.log("dim7 validation passed");
