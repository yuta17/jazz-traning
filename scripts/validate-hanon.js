const assert = require("node:assert/strict");
const {
  HANON_NUMBERS,
  assignForDate,
  createQueue,
  dateKey,
} = require("../src/hanon.js");

assert.deepEqual(HANON_NUMBERS, [1, 2, 3, 4, 5]);
assert.match(dateKey(new Date(2026, 5, 10)), /^2026-06-10$/);

const fixedRandom = () => 0.42;
const queue = createQueue(null, fixedRandom);
assert.equal(queue.length, 5);
assert.equal(new Set(queue).size, 5);
queue.forEach((number) => assert(HANON_NUMBERS.includes(number)));

let state = {};
const firstCycle = [];
for (let day = 1; day <= 5; day += 1) {
  state = assignForDate(state, `2026-06-${String(day).padStart(2, "0")}`, fixedRandom);
  firstCycle.push(state.current);
}

assert.equal(firstCycle.length, 5);
assert.equal(new Set(firstCycle).size, 5);

const sameDay = assignForDate(state, "2026-06-05", fixedRandom);
assert.equal(sameDay.current, state.current);

const nextDay = assignForDate(state, "2026-06-06", fixedRandom);
assert(HANON_NUMBERS.includes(nextDay.current));
assert.notEqual(nextDay.current, state.current);
assert(nextDay.history.length > 0);

console.log("Hanon validation passed");
