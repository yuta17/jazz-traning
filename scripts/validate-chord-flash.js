const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  CHORD_FORMS,
  CHORD_QUALITIES,
  LIMIT_SECONDS,
  ROUND_SIZE,
  VOICINGS,
  allowedVoicings,
  buildChord,
  createDeck,
  createFullDeck,
  questionPlans,
} = require("../src/chord-flash.js");

assert.equal(LIMIT_SECONDS, 5);
assert.equal(ROUND_SIZE, 24);
assert.equal(CHORD_QUALITIES.length, 5);
assert.deepEqual(
  VOICINGS.map((voicing) => voicing.id),
  ["root", "second"],
);
assert.deepEqual(
  CHORD_FORMS.map((form) => form.id),
  ["basic", "rootless9"],
);
assert.deepEqual(
  CHORD_QUALITIES.map((quality) => quality.id),
  ["maj7", "m7", "7", "m7b5", "dim7"],
);

CHORD_QUALITIES.forEach((quality) => {
  assert.equal(quality.roots.length, 12);
  assert.equal(quality.intervals.length, 4);
  assert.equal(quality.degrees.length, 4);
});

const plans = questionPlans();
assert.equal(plans.length, 19);
assert.equal(plans.filter((plan) => plan.form.id === "rootless9").length, 9);
assert.equal(plans.filter((plan) => plan.quality.id === "dim7").length, 1);
assert.deepEqual(
  plans.filter((plan) => plan.quality.id === "dim7").map((plan) => `${plan.form.id}:${plan.voicing.id}`),
  ["basic:root"],
);

const fullDeck = createFullDeck();
assert.equal(fullDeck.length, 228);
assert.equal(new Set(fullDeck.map((chord) => chord.id)).size, 228);

for (const ninth of [false, true]) {
  const flatLabels = new Set();
  for (let run = 0; run < 100; run += 1) {
    const deck = createDeck(ninth);
    assert.equal(deck.length, 24);
    assert.equal(new Set(deck.map((chord) => chord.id)).size, 24);
    assert.equal(deck.some((chord) => chord.qualityId === "dim7"), !ninth);
    for (const chord of deck) {
      assert.equal(chord.formId, ninth ? "rootless9" : "basic");
      assert.equal(chord.extensionLabel, ninth ? "9th" : "");
      assert.equal(chord.notes.length, 4);
      if (chord.qualityId === "m7b5") {
        assert(["3から", "7から", ""].includes(chord.voicingLabel));
        flatLabels.add(chord.voicingLabel);
      } else {
        assert(["Root", "2nd"].includes(chord.voicingLabel));
      }
      for (const note of chord.notes) {
        assert(!/[𝄫𝄪]/u.test(note));
        assert(!["C♭", "F♭", "B♯", "E♯"].includes(note));
      }
    }
  }
  assert.equal(flatLabels.size, 3);
}

for (const form of CHORD_FORMS) {
  const flatQuality = CHORD_QUALITIES.find((item) => item.id === "m7b5");
  const voicings = allowedVoicings(flatQuality, form);
  assert.equal(buildChord("C", flatQuality, voicings[0], form).notes[0], "E♭");
  assert.equal(buildChord("C", flatQuality, voicings[1], form).notes[0], "B♭");
  assert.equal(buildChord("C", flatQuality, VOICINGS[1], form).voicingLabel, "");
}

function quality(id) {
  return CHORD_QUALITIES.find((item) => item.id === id);
}

assert.deepEqual(
  buildChord("B♭", quality("maj7")),
  {
    id: "B♭-maj7-root",
    label: "B♭△7",
    notes: ["B♭", "D", "F", "A"],
    root: "B♭",
    formId: "basic",
    extensionLabel: "",
    qualityId: "maj7",
    qualityLabel: "△7",
    voicingId: "root",
    voicingLabel: "Root",
  },
);

assert.deepEqual(buildChord("B♭", quality("maj7"), VOICINGS[1]).notes, ["F", "A", "B♭", "D"]);
assert.deepEqual(buildChord("F♯", quality("m7b5")).notes, ["F♯", "A", "C", "E"]);
assert.deepEqual(buildChord("G", quality("7")).notes, ["G", "B", "D", "F"]);
assert.deepEqual(buildChord("C♯", quality("dim7")).notes, ["C♯", "E", "G", "B♭"]);
assert.deepEqual(buildChord("A", quality("m7")).notes, ["A", "C", "E", "G"]);
assert.equal(buildChord("C", quality("dim7"), VOICINGS[1], CHORD_FORMS[1]).formId, "basic");
assert.equal(buildChord("C", quality("dim7"), VOICINGS[1], CHORD_FORMS[1]).voicingId, "root");
assert.deepEqual(buildChord("C", quality("maj7"), VOICINGS[0], CHORD_FORMS[1]).notes, ["E", "G", "B", "D"]);
assert.deepEqual(buildChord("C", quality("maj7"), VOICINGS[1], CHORD_FORMS[1]).notes, ["B", "D", "E", "G"]);
assert.deepEqual(buildChord("F", quality("7"), VOICINGS[0], CHORD_FORMS[1]).notes, ["A", "C", "E♭", "G"]);
assert.deepEqual(buildChord("B♭", quality("m7"), VOICINGS[0], CHORD_FORMS[1]).notes, ["D♭", "F", "A♭", "C"]);
assert.deepEqual(buildChord("F♯", quality("m7b5"), VOICINGS[0], CHORD_FORMS[1]).notes, ["A", "C", "E", "G♯"]);

const html = fs.readFileSync(path.join(__dirname, "../chord-flash/index.html"), "utf8");
assert(html.includes("styles.css?v=20260925-chord-options"));
assert(html.includes("chord-flash.js?v=20260925-chord-options"));

// Exercise the start checkbox, rendered labels, and completion through the UI handlers.
const vm = require("node:vm");
const nodes = new Map();
const document = {
  querySelector(selector) {
    if (!nodes.has(selector)) nodes.set(selector, {
      checked: false, style: {}, dataset: {},
      addEventListener(event, handler) { this[event] = handler; },
    });
    return nodes.get(selector);
  },
};
let completed = 0;
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../src/chord-flash.js"), "utf8"), {
  document, setInterval: () => 1, clearInterval() {},
  JazzDailyProgress: { mark() { completed += 1; } },
});
const node = (id) => document.querySelector(`#chord-${id}`);
assert.equal(node("progress-count").textContent, "0 / 24");
for (const ninth of [false, true]) {
  node("ninth-checkbox").checked = ninth;
  node("start-button").click();
  node("ninth-checkbox").checked = !ninth;
  for (let i = 0; i < 24; i += 1) {
    assert.equal(node("progress-count").textContent, `${i + 1} / 24`);
    const question = node("question-panel").innerHTML;
    assert.equal(question.includes(">9th</span>"), ninth);
    assert(!question.includes('<span class="voicing-pill"></span>'));
    if (question.includes("m7♭5")) assert(!question.includes("2nd"));
    node("reveal-button").click();
    assert(node("question-panel").innerHTML.includes("chord-note-list"));
    node("hit-button").click();
  }
  assert(node("question-panel").innerHTML.includes("完了"));
  assert.equal(node("progress-count").textContent, "24 / 24");
}
assert.equal(completed, 2);
console.log("Chord flash validation passed");
