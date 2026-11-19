const assert = require('node:assert/strict');
const { LESSONS, KEYS, events, swing, createPlan, score } = require('../src/blues.js');
const { parseOnly } = require('../assets/vendor/abcjs-basic-min.js');
const NATURALS = [0, 2, 4, 5, 7, 9, 11];
function readWrittenEvents(tune, root) {
  let accidentals = {};
  return tune.lines.flatMap(line => line.staff || []).flatMap(staff => staff.voices).flat().flatMap(event => {
    if (event.el_type === 'bar') accidentals = {};
    if (event.el_type !== 'note') return [];
    let pitch = null;
    if (event.pitches) {
      const written = event.pitches[0];
      if (written.accidental) accidentals[written.pitch] = { flat: -1, natural: 0, sharp: 1 }[written.accidental];
      pitch = 60 + Math.floor(written.pitch / 7) * 12 + NATURALS[((written.pitch % 7) + 7) % 7]
        + (accidentals[written.pitch] || 0) - root;
    }
    return [{ pitch, duration: event.duration * 8,
      ...(event.pitches?.[0].startTie ? { tie: true } : {}),
      ...(event.decoration?.includes('accent') ? { accent: true } : {}),
      ...(event.decoration?.includes('staccato') ? { staccato: true } : {}),
    }];
  });
}
const pitches = phrase => phrase.flat().filter(n => n.pitch !== null).map(n => n.pitch);
const rhythm = phrase => phrase.flat().map(n => [n.pitch === null, n.duration]);
let checkedScores = 0;
for (const [id, lesson] of Object.entries(LESSONS)) {
  assert.equal(lesson.responses.length, 5);
  assert.equal(new Set(lesson.responses.map(r => JSON.stringify(r.phrase))).size, 5);
  for (const phrase of [lesson.call, ...lesson.responses.map(r => r.phrase)]) {
    assert.equal(phrase.length, lesson.bars);
    phrase.forEach(bar => {
      assert.equal(bar.reduce((sum, n) => sum + n.duration, 0), 8, `${id}: four beats per bar`);
      bar.forEach(n => {
        assert.ok(Number.isInteger(n.duration) && n.duration > 0);
        if (n.pitch !== null) {
          assert.ok([0, 3, 5, 6, 7, 10].includes(((n.pitch % 12) + 12) % 12));
          Object.values(KEYS).forEach(key => assert.ok(key.abc[n.pitch]));
        }
      });
    });
    assert.equal(phrase.at(-1).at(-1).pitch, null, `${id}: leave phrase-ending space`);
    if (lesson.bars === 2) {
      assert.notEqual(phrase[0].at(-1).pitch, null, `${id}: continue over the internal barline`);
      assert.notEqual(phrase[1][0].pitch, null);
    }
    phrase.flat().forEach((n, i, written) => {
      if (n.tie) { assert.notEqual(n.pitch, null); assert.equal(written[i + 1]?.pitch, n.pitch); }
    });
    const timeline = events(phrase);
    assert.equal(timeline.at(-1).position + timeline.at(-1).duration, lesson.bars * 8);
    assert.equal(timeline.filter(n => n.pitch !== null).length,
      pitches(phrase).length - phrase.flat().filter(n => n.tie).length, 'Ties must not retrigger');
    timeline.slice(1).forEach((n, i) => assert.equal(n.position, timeline[i].position + timeline[i].duration));
  }
  const [sameRhythm, sameNotes, ending, sparse, extension] = lesson.responses.map(r => r.phrase);
  assert.deepEqual(rhythm(sameRhythm), rhythm(lesson.call), `${id}: preserve the call rhythm`);
  assert.notDeepEqual(pitches(sameRhythm), pitches(lesson.call));
  assert.deepEqual(pitches(sameNotes), pitches(lesson.call), `${id}: preserve pitch order`);
  assert.notDeepEqual(rhythm(sameNotes), rhythm(lesson.call));
  assert.deepEqual(pitches(ending).slice(0, -1), pitches(lesson.call).slice(0, -1));
  assert.notEqual(pitches(ending).at(-1), pitches(lesson.call).at(-1));
  assert.ok(pitches(sparse).length < pitches(lesson.call).length);
  assert.deepEqual(pitches(extension).slice(0, 2), pitches(lesson.call).slice(0, 2), `${id}: quote the call opening before developing it`);
  assert.notDeepEqual(pitches(extension), pitches(lesson.call));
  for (let responseIndex = 0; responseIndex < 5; responseIndex++) {
    for (const mode of ['sing', 'play']) {
      const plan = createPlan(lesson, mode, responseIndex);
      assert.equal(plan.beats, lesson.bars * 8);
      assert.deepEqual(plan.segments[0].notes, events(lesson.call), 'The call stays fixed');
      assert.deepEqual(plan.segments[1].notes, [], 'Never leak example notes into the user response window');
      assert.equal(plan.segments[1].start, lesson.bars * 4);
    }
    const call = createPlan(lesson, 'call', responseIndex);
    assert.equal(call.segments.length, 1); assert.equal(call.beats, lesson.bars * 4);
    assert.deepEqual(call.segments[0].notes, events(lesson.call));
    const solo = createPlan(lesson, 'response', responseIndex);
    assert.equal(solo.segments.length, 1);
    assert.deepEqual(solo.segments[0].notes, events(lesson.responses[responseIndex].phrase));
    const compare = createPlan(lesson, 'compare', responseIndex);
    assert.equal(compare.segments[1].start, lesson.bars * 4);
    assert.deepEqual(compare.segments[0].notes, call.segments[0].notes);
    assert.deepEqual(compare.segments[1].notes, solo.segments[0].notes);
    for (const key of Object.keys(KEYS)) for (const part of [0, 1]) {
      const tune = parseOnly(score(key, part, id, responseIndex))[0];
      assert.ok(!tune.warnings?.length, `${id}/${key}: valid notation`);
      assert.deepEqual(readWrittenEvents(tune, KEYS[key].root),
        (part ? lesson.responses[responseIndex].phrase : lesson.call).flat());
      checkedScores++;
    }
  }
}
assert.equal(swing(1), 2 / 3); assert.equal(swing(2), 1);
assert.equal(events(LESSONS.two.responses[3].phrase).find(n => n.position === 4).duration, 6);
console.log(`Blues: fixed calls, five response strategies, silent practice plans, and ${checkedScores} scores passed`);
