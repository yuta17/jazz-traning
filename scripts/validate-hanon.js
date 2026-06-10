const assert = require("node:assert/strict");
const {
  HANON_NUMBERS,
  pickNumber,
} = require("../src/hanon.js");

assert.deepEqual(HANON_NUMBERS, [1, 2, 3, 4, 5]);
assert.equal(pickNumber(() => 0), 1);
assert.equal(pickNumber(() => 0.199), 1);
assert.equal(pickNumber(() => 0.2), 2);
assert.equal(pickNumber(() => 0.999), 5);

for (let i = 0; i < 100; i += 1) {
  assert(HANON_NUMBERS.includes(pickNumber()));
}

console.log("Hanon validation passed");
