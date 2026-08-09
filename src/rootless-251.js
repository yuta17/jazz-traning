(function attachRootless251(global) {
  "use strict";

  const ROUND_SIZE = 12;
  const SOLFEGE = { C: "ド", D: "レ", E: "ミ", F: "ファ", G: "ソ", A: "ラ", B: "シ" };
  const KEYS = [
    key("C", ["C", "D", "E", "F", "G", "A", "B"]), key("F", ["F", "G", "A", "B♭", "C", "D", "E"]),
    key("B♭", ["B♭", "C", "D", "E♭", "F", "G", "A"]), key("E♭", ["E♭", "F", "G", "A♭", "B♭", "C", "D"]),
    key("A♭", ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"]), key("D♭", ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"]),
    key("G♭", ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F"]), key("B", ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"]),
    key("E", ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"]), key("A", ["A", "B", "C♯", "D", "E", "F♯", "G♯"]),
    key("D", ["D", "E", "F♯", "G", "A", "B", "C♯"]), key("G", ["G", "A", "B", "C", "D", "E", "F♯"]),
  ];
  const SEQUENCES = [
    { id: "2R2", label: "2nd → Root → 2nd", voicings: ["second", "root", "second"] },
    { id: "R2R", label: "Root → 2nd → Root", voicings: ["root", "second", "root"] },
  ];
  const CHORDS = [
    { label: "ii−7", rootIndex: 1, scaleOffsets: [2, 4, 6, 1], degrees: ["♭3", "5", "♭7", "9"] },
    { label: "V7", rootIndex: 4, scaleOffsets: [2, 4, 6, 1], degrees: ["3", "5", "♭7", "9"] },
    { label: "Imaj7", rootIndex: 0, scaleOffsets: [2, 4, 6, 1], degrees: ["3", "5", "7", "9"] },
  ];
  const VOICING_ORDER = { root: [0, 1, 2, 3], second: [2, 3, 0, 1] };
  const state = { deck: [], index: 0, revealed: false, completed: false };

  function key(label, scale) { return { id: label, label, scale }; }
  function shuffle(items, random = Math.random) { const result = items.slice(); for (let i = result.length - 1; i > 0; i -= 1) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; } return result; }
  function solfegeForNote(note) { return `${SOLFEGE[note[0]]}${note.slice(1)}`; }
  function scaleNote(keyItem, index) { return keyItem.scale[(index + 7) % 7]; }

  function buildChord(keyItem, chord, voicing) {
    const baseNotes = chord.scaleOffsets.map((offset, index) => ({ degree: chord.degrees[index], note: solfegeForNote(scaleNote(keyItem, chord.rootIndex + offset)) }));
    return { label: chord.label, notes: VOICING_ORDER[voicing].map((index) => baseNotes[index]) };
  }

  function buildTask(keyItem, sequence) {
    return { id: `${keyItem.id}:${sequence.id}`, key: keyItem, sequence, chords: CHORDS.map((chord, index) => buildChord(keyItem, chord, sequence.voicings[index])) };
  }

  function buildDeck(random = Math.random) {
    const keys = shuffle(KEYS, random);
    const sequences = shuffle(Array.from({ length: ROUND_SIZE }, (_, index) => SEQUENCES[index % SEQUENCES.length]), random);
    return keys.map((keyItem, index) => buildTask(keyItem, sequences[index]));
  }

  function elements() { return { start: document.querySelector("#rootless-251-start-button"), progress: document.querySelector("#rootless-251-progress-count"), panel: document.querySelector("#rootless-251-question-panel"), reveal: document.querySelector("#rootless-251-reveal-button"), next: document.querySelector("#rootless-251-next-button") }; }
  function currentTask() { return state.deck[state.index] || null; }
  function answerMarkup(task) { return task.chords.map((chord) => `<div class="rootless-251-chord"><span class="rootless-251-chord-label">${chord.label}</span><div class="rootless-answer-notes">${chord.notes.map(({ degree, note }) => `<span class="rootless-answer-note"><small>${degree}</small><strong>${note}</strong></span>`).join("")}</div></div>`).join(""); }

  function render() {
    const dom = elements(); const task = currentTask(); const total = state.deck.length || ROUND_SIZE;
    dom.progress.textContent = `${state.completed ? total : task ? state.index + 1 : 0} / ${total}`;
    dom.start.textContent = state.completed ? "もう一周" : state.deck.length ? "再スタート" : "スタート";
    dom.reveal.hidden = state.revealed || state.completed; dom.reveal.disabled = !task || state.revealed || state.completed;
    dom.next.hidden = !state.revealed || state.completed; dom.next.textContent = state.index === state.deck.length - 1 ? "完了" : "次へ";
    if (state.completed) dom.panel.innerHTML = '<div class="complete-state"><strong>完了</strong></div>';
    else if (!task) dom.panel.innerHTML = '<div class="ready-state"><strong>待機中</strong></div>';
    else if (!state.revealed) dom.panel.innerHTML = `<div class="rootless-question-state"><span class="rootless-voicing-label">${task.sequence.label}</span><span class="rootless-key-label">Key</span><strong class="question-key">${task.key.label}</strong></div>`;
    else dom.panel.innerHTML = `<div class="rootless-question-state"><span class="rootless-voicing-label">${task.sequence.label}</span><p class="answer-title"><strong>Key ${task.key.label}</strong></p><div class="rootless-251-answer" aria-label="回答">${answerMarkup(task)}</div></div>`;
  }

  function startCycle() { state.deck = buildDeck(); state.index = 0; state.revealed = false; state.completed = false; render(); }
  function revealAnswer() { if (currentTask()) { state.revealed = true; render(); } }
  function nextTask() { if (state.index >= state.deck.length - 1) { state.completed = true; global.JazzDailyProgress?.mark("rootless-251"); } else { state.index += 1; state.revealed = false; } render(); }
  function boot() { const dom = elements(); dom.start.addEventListener("click", startCycle); dom.reveal.addEventListener("click", revealAnswer); dom.next.addEventListener("click", nextTask); render(); }

  const api = { CHORDS, KEYS, ROUND_SIZE, SEQUENCES, buildChord, buildDeck, buildTask, solfegeForNote };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.Rootless251 = api;
  if (typeof document !== "undefined") boot();
})(typeof window !== "undefined" ? window : globalThis);
