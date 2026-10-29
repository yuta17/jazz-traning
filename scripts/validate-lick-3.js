const assert = require('node:assert/strict');
const lick = require('../src/lick-3.js');
const task = lick.buildTask(lick.MAJOR_KEYS.find(key => key.id === 'C'));
assert.equal(task.progression, 'Dm7 → G7 → G7 → C△7');
assert.deepEqual(task.segments.map(s => s.notes), [
  ['休', 'D', 'E', 'F', 'A', 'C', 'E'],
  ['G', 'F♯', 'F', 'A', 'G♯', 'A', 'E', 'D'],
  ['E♭', 'B', 'B♭', 'A♭'],
  ['G'],
]);
assert.deepEqual(task.segments.map(s => s.degreeLabels), [
  ['休', '1', '9', '3', '5', '7', '9'],
  ['半', '半', '7', '9', '半', '9', '半', '半'],
  ['♭13', '3', '♯9', '♭9'],
  ['5'],
]);
const deck = lick.createDeck();
assert.equal(deck.length, 12);
assert.equal(new Set(deck.map(t => t.id)).size, 12);
for (const t of deck) {
  const tonic = lick.parseRoot(t.key).pitchClass;
  for (const s of t.segments) {
    assert.equal(s.notes.length, s.degreeLabels.length);
    s.notes.forEach((note, i) => {
      if (s.intervals[i] === null) { assert.equal(note, '休'); return; }
      assert.equal(lick.parseRoot(note).pitchClass, (tonic + s.rootOffset + s.intervals[i]) % 12);
      if (s.degreeLabels[i] === '半') {
        // E and D enclose the next segment's E-flat, rather than each other.
        const target = s.id === 'v' && i >= 6 ? t.segments[2].notes[0] : s.notes[i + 1];
        const next = lick.parseRoot(target).pitchClass;
        assert([1, 11].includes((next - lick.parseRoot(note).pitchClass + 12) % 12));
      }
    });
  }
}
console.log('Lick 3 transcription and 12-key transposition validation passed');
