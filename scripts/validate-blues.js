const assert = require('node:assert/strict');
const { PATTERNS, KEYS, events, swing, score } = require('../src/blues.js');
const { parseOnly } = require('../assets/vendor/abcjs-basic-min.js');
const NATURAL_PITCHES = [0, 2, 4, 5, 7, 9, 11];

function readWrittenEvents(tune, root) {
  let accidentals = {};
  return tune.lines.flatMap(line => line.staff || []).flatMap(staff => staff.voices).flat().flatMap(event => {
    if (event.el_type === 'bar') accidentals = {};
    if (event.el_type !== 'note') return [];
    let pitch = null;
    if (event.pitches) {
      const written = event.pitches[0];
      if (written.accidental) accidentals[written.pitch] = { flat: -1, natural: 0, sharp: 1 }[written.accidental];
      pitch = 60 + Math.floor(written.pitch / 7) * 12 + NATURAL_PITCHES[written.pitch % 7]
        + (accidentals[written.pitch] || 0) - root;
    }
    return [{ pitch, duration: event.duration * 8, ...(event.pitches?.[0].startTie ? { tie: true } : {}) }];
  });
}

for (const [id, pattern] of Object.entries(PATTERNS)) {
  assert.equal(pattern.phrases.length, pattern.bars * 2);
  for (const bar of pattern.phrases) {
    assert.equal(bar.reduce((sum, event) => sum + event.duration, 0), 8, 'Each bar lasts four beats');

    for (const event of bar) {
      assert.ok(event.duration > 0);
      if (event.pitch !== null) {
        assert.ok([0, 3, 5, 6, 7, 10].includes(event.pitch % 12));
        for (const key of Object.values(KEYS)) assert.ok(key.abc[event.pitch]);
      }
    }
  }
  for (const part of [0, 1]) {
    const phrase = pattern.phrases.slice(part * pattern.bars, (part + 1) * pattern.bars);
    assert.ok(phrase.flat().some(event => event.pitch === null), `${id}: keep breathing room`);
    assert.equal(phrase.at(-1).at(-1).pitch, null, `${id}: leave space at the phrase ending`);
    if (pattern.bars === 2) {
      assert.notEqual(phrase[0].at(-1).pitch, null, `${id}: lead into the second bar`);
      assert.notEqual(phrase[1][0].pitch, null, `${id}: continue across the internal barline`);
      assert.ok(phrase[1].at(-1).duration >= 2, `${id}: a longer rest at the actual phrase boundary`);
    }
    const written = phrase.flat();
    written.forEach((event, index) => {
      if (event.tie) {
        assert.notEqual(event.pitch, null);
        assert.equal(written[index + 1]?.pitch, event.pitch, `${id}: ties sustain the same pitch`);
      }
    });
  }
  const call = pattern.phrases.slice(0, pattern.bars).flat();
  const response = pattern.phrases.slice(pattern.bars).flat();
  assert.notDeepEqual(call.filter(e => e.pitch !== null).map(e => e.pitch), response.filter(e => e.pitch !== null).map(e => e.pitch));
  assert.notDeepEqual(call.map(e => [e.pitch === null, e.duration]), response.map(e => [e.pitch === null, e.duration]));
  assert.equal(response.filter(e => e.pitch !== null).at(-1).pitch % 12, 0);
  if (pattern.bars === 2) assert.notEqual(call.filter(e => e.pitch !== null).at(-1).pitch % 12, 0, `${id}: reserve tonic closure for the answer`);
  const timeline = events(pattern);
  for (let index = 1; index < timeline.length; index++) {
    assert.equal(timeline[index].position, timeline[index - 1].position + timeline[index - 1].duration);
  }
  assert.equal(timeline.filter(e => e.pitch !== null).length,
    pattern.phrases.flat().filter(e => e.pitch !== null).length - pattern.phrases.flat().filter(e => e.tie).length,
    `${id}: tied notes must sound once rather than retriggering`);
  assert.equal(timeline.at(-1).position + timeline.at(-1).duration, pattern.bars * 16);
  assert.equal(swing(pattern.bars * 16), pattern.bars * 8);
  for (const key of Object.keys(KEYS)) for (const part of [0, 1]) {
    const abc = score(key, part, id);
    assert.match(abc, /z/);
    assert.ok(abc.includes(`${pattern.bars}小節`));
    const tune = parseOnly(abc)[0];
    assert.ok(!tune.warnings?.length, `${id} / ${key}: valid notation`);
    if (pattern.bars === 2) {
      const pitches = tune.lines.flatMap(line => line.staff || []).flatMap(staff => staff.voices).flat()
        .filter(event => event.el_type === 'note' && event.pitches).map(event => event.pitches[0]);
      assert.equal(pitches[0].startSlur?.length, 1, `${id}: phrase arc starts at first note`);
      assert.equal(pitches.at(-1).endSlur?.length, 1, `${id}: phrase arc ends at last note`);
    }
    assert.deepEqual(readWrittenEvents(tune, KEYS[key].root),
      pattern.phrases.slice(part * pattern.bars, (part + 1) * pattern.bars).flat(),
      `${id} / ${key}: written pitches, durations, and rests match playback`);
  }
}
for (const bars of [1, 2]) {
  const examples = Object.values(PATTERNS).filter(pattern => pattern.bars === bars);
  assert.equal(examples.length, 15);
  assert.equal(new Set(examples.map(pattern => JSON.stringify(pattern.phrases))).size, examples.length);
}
const sustained = events(PATTERNS['two-space']).find(event => event.position === 6);
assert.equal(sustained.duration, 4);
assert.equal(sustained.sustained, true);
assert.equal(swing(1), 2 / 3);
assert.equal(swing(2), 1);
console.log('30 Blues examples: rhythm, scale, and 120 written call/response scores passed');
