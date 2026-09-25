const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const theory = require("../src/theory.js");
const training = require("../src/two-five-key.js");

assert.equal(training.keySignatureLabel("major", "G"), "♯1つ");
assert.equal(training.keySignatureLabel("major", "F"), "♭1つ");
assert.equal(training.keySignatureLabel("major", "C"), "♯・♭なし");
assert.equal(training.keySignatureLabel("minor", "A"), "♯・♭なし");
assert.equal(training.keySignatureLabel("minor", "C"), "♭3つ");
assert.equal(training.keySignatureLabel("minor", "B"), "♯2つ");
assert.equal(training.keySignatureLabel("minor", "Db"), "♯4つ／異名同音のC♯マイナー表記");
assert.equal(training.keySignatureLabel("minor", "Gb"), "♯3つ／異名同音のF♯マイナー表記");
assert.equal(training.keySignatureLabel("minor", "Ab"), "♯5つ／異名同音のG♯マイナー表記");
assert.deepEqual(training.buildDeck([]), []);
assert.deepEqual(training.buildDeck(["invalid"]), []);
for (const modes of [["major"], ["minor"], ["major", "minor"]]) {
  const deck = training.buildDeck(modes);
  assert.equal(deck.length, 12);
  assert.equal(new Set(deck.map((task) => task.keyId)).size, 12);
  for (const task of deck) {
    const key = theory.KEYS.find((item) => item.id === task.keyId);
    assert.deepEqual(task.chords, key[task.mode].slice(0, 2));
    assert.equal(task.resolution, key[task.mode][2]);
    assert.equal(task.answer, `${task.mode}:${key.id}`);
  }
  if (modes.length === 2) assert.equal(deck.filter((task) => task.mode === "major").length, 6);
}
assert.deepEqual(training.buildDeck(["major"]).find((task) => task.keyId === "C").chords, ["Dm7", "G7"]);
assert.deepEqual(training.buildDeck(["minor"]).find((task) => task.keyId === "C").chords, ["D-7(♭5)", "G7"]);

const source = fs.readFileSync(path.join(__dirname, "../src/two-five-key.js"), "utf8");
for (const modes of [["major"], ["minor"], ["major", "minor"]]) {
  const nodes = new Map();
  const makeNode = () => ({ addEventListener(event, handler) { this[event] = handler; } });
  const checkboxes = ["major", "minor"].map((value) => ({ ...makeNode(), value, checked: modes.includes(value) }));
  const document = {
    querySelectorAll: () => checkboxes,
    querySelector(selector) {
      if (!nodes.has(selector)) nodes.set(selector, makeNode());
      return nodes.get(selector);
    },
  };
  const marks = [];
  vm.runInNewContext(source, { document, JazzTheory: theory, JazzDailyProgress: { mark: (id) => marks.push(id) } });
  const node = (id) => document.querySelector(`#two-five-key-${id}`);
  const answer = (value) => node("choice-grid").click({ target: { closest: () => ({ dataset: { answer: value } }) } });
  node("start-button").click();
  for (let i = 0; i < 12; i += 1) {
    const panel = node("question-panel").innerHTML;
    const chords = [...panel.matchAll(/<strong>(.*?)<\/strong>/g)].map((match) => match[1]);
    const task = modes.flatMap((mode) => training.buildDeck([mode])).find((item) => item.chords.join() === chords.join());
    assert(task);
    assert.equal(chords.length, 2);
    assert(!panel.includes("signature-result"));
    assert.equal((node("choice-grid").innerHTML.match(/data-answer=/g) || []).length, 12);
    const otherMode = task.mode === "major" ? "minor" : "major";
    assert(!node("choice-grid").innerHTML.includes(`data-answer="${otherMode}:`));
    answer(`${otherMode}:${task.keyId}`);
    assert.equal(node("question-panel").innerHTML, panel);
    assert.equal(node("progress-count").textContent, `${i + 1} / 12`);
    node("next-button").click();
    assert.equal(node("question-panel").innerHTML, panel);
    const response = i === 0 ? `${task.mode}:${task.keyId === "C" ? "D" : "C"}` : task.answer;
    answer(response);
    const result = node("question-panel").innerHTML;
    assert(result.includes(task.resolution));
    assert(result.includes(training.keySignatureLabel(task.mode, task.keyId)));
    assert(result.includes(i === 0 ? "正解は" : "正解："));
    answer(task.answer);
    assert.equal(node("question-panel").innerHTML, result);
    node("next-button").click();
  }
  assert(node("question-panel").innerHTML.includes("正解 11 / 12"));
  assert.deepEqual(marks, ["two-five-key"]);
  node("next-button").click();
  assert.equal(marks.length, 1);
  node("start-button").click();
  assert.equal(node("progress-count").textContent, "1 / 12");
  checkboxes.forEach((checkbox) => { checkbox.checked = false; checkbox.change(); });
  assert(node("start-button").disabled);
}
console.log("Two-five key validation passed");
