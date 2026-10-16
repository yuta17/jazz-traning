const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { ROOTS, buildDeck } = require('../src/altered-scale.js');
const expected = ROOTS.map(root => `${root}m7`).sort();
for (let i = 0; i < 50; i++) assert.deepEqual(buildDeck().sort(), expected);
assert.notDeepEqual(buildDeck(() => 0), buildDeck(() => 0.99));
const nodes = new Map();
const marks = [];
const document = { querySelector(selector) {
  if (!nodes.has(selector)) nodes.set(selector, { addEventListener(event, handler) { this[event] = handler; }, focus() {} });
  return nodes.get(selector);
} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/altered-scale.js'), 'utf8'), {
  document, JazzDailyProgress: { mark: id => marks.push(id) },
});
const get = id => nodes.get(`#altered-${id}`);
const seen = [];
for (let i = 0; i < 12; i++) {
  assert.equal(get('progress').textContent, `${i} / 12`);
  assert.equal(get('next').disabled, false);
  seen.push(get('chord').textContent);
  assert.equal(marks.length, 0);
  get('next').click();
}
assert.deepEqual(seen.sort(), expected);
assert.equal(get('progress').textContent, '12 / 12');
assert.equal(get('chord').textContent, '');
assert.equal(get('next').disabled, true);
assert.equal(get('status').hidden, false);
assert.equal(get('restart').hidden, false);
assert.deepEqual(marks, ['altered-scale']);
get('next').click();
assert.deepEqual(marks, ['altered-scale']);
get('restart').click();
assert.equal(get('progress').textContent, '0 / 12');
assert.equal(get('next').disabled, false);
assert.equal(get('status').hidden, true);
assert(expected.includes(get('chord').textContent));
console.log('Altered scale 12-key flow validation passed');
