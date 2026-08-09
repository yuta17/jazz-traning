(function attachRootlessNinth(global) {
  "use strict";

  const ROUND_SIZE = 12;
  const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
  const NATURAL_PITCH = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const SOLFEGE = { C: "ド", D: "レ", E: "ミ", F: "ファ", G: "ソ", A: "ラ", B: "シ" };
  const ROOTS = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
  const QUALITIES = [
    { id: "maj7", suffix: "maj7", intervals: [4, 7, 11, 14], degrees: ["3", "5", "7", "9"] },
    { id: "m7", suffix: "m7", intervals: [3, 7, 10, 14], degrees: ["♭3", "5", "♭7", "9"] },
    { id: "7", suffix: "7", intervals: [4, 7, 10, 14], degrees: ["3", "5", "♭7", "9"] },
  ];
  const VOICINGS = [
    { id: "root", label: "基本形", order: [0, 1, 2, 3] },
    { id: "second", label: "2nd Inversion", order: [2, 3, 0, 1] },
  ];
  const state = { deck: [], index: 0, revealed: false, completed: false };

  function normalizePitch(value) { return ((value % 12) + 12) % 12; }
  function shuffle(items, random = Math.random) { const result = items.slice(); for (let i = result.length - 1; i > 0; i -= 1) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; } return result; }
  function parseRoot(label) { const letter = label[0]; return { label, letter, letterIndex: LETTERS.indexOf(letter), pitch: normalizePitch(NATURAL_PITCH[letter] + (label.includes("♯") ? 1 : label.includes("♭") ? -1 : 0)) }; }
  function accidentalDelta(naturalPitch, targetPitch) { let delta = normalizePitch(targetPitch - naturalPitch); if (delta > 6) delta -= 12; return delta; }
  function spellNote(root, degreeOffset, interval) {
    const letter = LETTERS[(root.letterIndex + degreeOffset) % LETTERS.length];
    const delta = accidentalDelta(NATURAL_PITCH[letter], normalizePitch(root.pitch + interval));
    return `${letter}${delta === 1 ? "♯" : delta === -1 ? "♭" : ""}`;
  }
  function solfegeForNote(note) { return `${SOLFEGE[note[0]]}${note.slice(1)}`; }

  function buildTask(rootLabel, quality, voicing) {
    const root = parseRoot(rootLabel);
    const baseNotes = quality.intervals.map((interval, index) => ({ degree: quality.degrees[index], note: solfegeForNote(spellNote(root, [2, 4, 6, 1][index], interval)) }));
    return { id: `${root.label}:${quality.id}:${voicing.id}`, code: `${root.label}${quality.suffix}`, quality, voicing, notes: voicing.order.map((index) => baseNotes[index]) };
  }

  function buildDeck(random = Math.random) {
    const roots = shuffle(ROOTS, random);
    const qualities = shuffle(Array.from({ length: ROUND_SIZE }, (_, index) => QUALITIES[index % QUALITIES.length]), random);
    const voicings = shuffle(Array.from({ length: ROUND_SIZE }, (_, index) => VOICINGS[index % VOICINGS.length]), random);
    return roots.map((root, index) => buildTask(root, qualities[index], voicings[index]));
  }

  function elements() { return { startButton: document.querySelector("#rootless-start-button"), progressCount: document.querySelector("#rootless-progress-count"), questionPanel: document.querySelector("#rootless-question-panel"), revealButton: document.querySelector("#rootless-reveal-button"), nextButton: document.querySelector("#rootless-next-button") }; }
  function currentTask() { return state.deck[state.index] || null; }

  function renderQuestion() {
    const task = currentTask(); const dom = elements();
    if (state.completed) dom.questionPanel.innerHTML = '<div class="complete-state"><strong>完了</strong></div>';
    else if (!task) dom.questionPanel.innerHTML = '<div class="ready-state"><strong>待機中</strong></div>';
    else if (!state.revealed) dom.questionPanel.innerHTML = `<div class="rootless-question-state"><span class="rootless-voicing-label">${task.voicing.label}</span><strong class="question-key chord-symbol">${task.code}</strong></div>`;
    else dom.questionPanel.innerHTML = `<div class="rootless-question-state"><span class="rootless-voicing-label">${task.voicing.label}</span><p class="answer-title"><strong>${task.code}</strong></p><div class="rootless-answer-notes" aria-label="回答">${task.notes.map(({ degree, note }) => `<span class="rootless-answer-note"><small>${degree}</small><strong>${note}</strong></span>`).join("")}</div></div>`;
  }

  function render() {
    const dom = elements(); const task = currentTask(); const total = state.deck.length || ROUND_SIZE;
    dom.progressCount.textContent = `${state.completed ? total : task ? state.index + 1 : 0} / ${total}`;
    dom.startButton.textContent = state.completed ? "もう一周" : state.deck.length ? "再スタート" : "スタート";
    dom.revealButton.hidden = state.revealed || state.completed; dom.revealButton.disabled = !task || state.revealed || state.completed;
    dom.nextButton.hidden = !state.revealed || state.completed; dom.nextButton.textContent = state.index === state.deck.length - 1 ? "完了" : "次へ";
    renderQuestion();
  }
  function startCycle() { state.deck = buildDeck(); state.index = 0; state.revealed = false; state.completed = false; render(); }
  function revealAnswer() { if (currentTask()) { state.revealed = true; render(); } }
  function nextTask() { if (state.index >= state.deck.length - 1) { state.completed = true; global.JazzDailyProgress?.mark("rootless-9th"); } else { state.index += 1; state.revealed = false; } render(); }
  function boot() { const dom = elements(); dom.startButton.addEventListener("click", startCycle); dom.revealButton.addEventListener("click", revealAnswer); dom.nextButton.addEventListener("click", nextTask); render(); }

  const api = { QUALITIES, ROOTS, ROUND_SIZE, VOICINGS, buildDeck, buildTask, solfegeForNote };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.RootlessNinth = api;
  if (typeof document !== "undefined") boot();
})(typeof window !== "undefined" ? window : globalThis);
