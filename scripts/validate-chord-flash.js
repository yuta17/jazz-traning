const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  CHORD_FORMS,
  CHORD_QUALITIES,
  LIMIT_SECONDS,
  ROUND_SIZE,
  VOICINGS,
  buildChord,
  createDeck,
  createFullDeck,
  questionPlans,
} = require("../src/chord-flash.js");

assert.equal(LIMIT_SECONDS, 5);
assert.equal(ROUND_SIZE, 12);
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
assert.equal(plans.length, 17);
assert.equal(plans.filter((plan) => plan.form.id === "rootless9").length, 8);
assert.equal(plans.filter((plan) => plan.quality.id === "dim7").length, 1);
assert.deepEqual(
  plans.filter((plan) => plan.quality.id === "dim7").map((plan) => `${plan.form.id}:${plan.voicing.id}`),
  ["basic:root"],
);

const fullDeck = createFullDeck();
assert.equal(fullDeck.length, 204);
assert.equal(new Set(fullDeck.map((chord) => chord.id)).size, 204);

const deck = createDeck();
assert.equal(deck.length, 12);
assert.equal(new Set(deck.map((chord) => chord.id)).size, 12);
assert(deck.some((chord) => chord.formId === "rootless9" && chord.voicingId === "root"));
assert(deck.some((chord) => chord.formId === "rootless9" && chord.voicingId === "second"));
assert(deck.some((chord) => chord.qualityId === "dim7"));

deck.forEach((chord) => {
  assert(chord.label);
  assert.equal(chord.notes.length, 4);
  assert(chord.voicingLabel === "Root" || chord.voicingLabel === "2nd");
  if (chord.formId === "rootless9") {
    assert.equal(chord.extensionLabel, "9th");
    assert.notEqual(chord.qualityId, "dim7");
  }
  if (chord.qualityId === "dim7") {
    assert.equal(chord.formId, "basic");
    assert.equal(chord.voicingId, "root");
    assert.equal(chord.extensionLabel, "");
  }
  chord.notes.forEach((note) => {
    assert(!note.includes("𝄫"));
    assert(!note.includes("𝄪"));
    assert(!["C♭", "F♭", "B♯", "E♯"].includes(note));
  });
});

function quality(id) {
  return CHORD_QUALITIES.find((item) => item.id === id);
}

assert.deepEqual(
  buildChord("B♭", quality("maj7")),
  {
    id: "B♭-maj7-root",
    label: "B♭maj7",
    notes: ["B♭", "D", "F", "A"],
    root: "B♭",
    formId: "basic",
    extensionLabel: "",
    qualityId: "maj7",
    qualityLabel: "maj7",
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
assert(html.includes("styles.css?v=20260708-chord-rootless9"));
assert(html.includes("chord-flash.js?v=20260708-chord-rootless9"));

console.log("Chord flash validation passed");
