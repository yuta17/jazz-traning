const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
let stored = null;
const context = vm.createContext({ localStorage: {
  getItem: () => stored,
  setItem: (_, value) => { stored = value; },
} });
for (const name of ['training-settings', 'theory', 'chord-flash', 'two-five-key', 'key-signature']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, `../src/${name}.js`), 'utf8'), context);
}
const settings = context.TrainingSettings;
assert.equal(settings.getCount('chord-flash'), 24);
assert.equal(settings.getCount('two-five-one'), 12);
for (const count of [1, 5, 12, 24, 32, 100]) {
  const counts = Object.fromEntries(Object.keys(settings.DEFAULTS).map(id => [id, count]));
  settings.save(counts);
  assert.equal(JSON.stringify(settings.load()), JSON.stringify(counts));
  for (const ninth of [false, true]) {
    const deck = context.ChordFlash.createDeck(ninth);
    assert.equal(deck.length, count);
    assert(!JSON.stringify(deck).includes('undefined'));
  }
  for (const modes of [['major'], ['minor'], ['major', 'minor']]) {
    assert.equal(context.TwoFiveKeyTraining.buildDeck(modes).length, count);
    assert.equal(context.KeySignatureTraining.buildDeck(modes).length, count);
    const deck = context.JazzTheory.buildDeck({ major: modes.includes('major') ? ['RRR'] : [], minor: modes.includes('minor') ? ['minor'] : [] });
    assert.equal(deck.length, count);
    assert(deck.filter(task => task.quality === 'minor').every(task => ['D', 'Bb', 'C', 'F', 'G'].includes(task.keyId)));
  }
}
for (const invalid of [0, 101, 1.5, '12', null]) {
  assert.throws(() => settings.save({ ...settings.DEFAULTS, 'chord-flash': invalid }));
  stored = JSON.stringify({ 'chord-flash': invalid });
  assert.equal(settings.getCount('chord-flash'), 24);
}
for (const invalid of ['invalid json', 'null', '[]']) {
  stored = invalid;
  assert.equal(settings.getCount('two-five-key'), 12);
}
context.localStorage.setItem = () => { throw new Error('blocked'); };
assert.throws(() => settings.save(settings.DEFAULTS), /保存できません/);
context.localStorage.getItem = () => { throw new Error('blocked'); };
assert.equal(settings.getCount('chord-flash'), 24);
console.log('Training settings validation passed.');
