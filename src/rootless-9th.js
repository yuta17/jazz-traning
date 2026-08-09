(function attachRootlessNinth(global) {
  "use strict";

  const ROUND_SIZE = 12;
  const SOLFEGE = { C: "ド", D: "レ", E: "ミ", F: "ファ", G: "ソ", A: "ラ", B: "シ" };
  const KEYS = [
    key("C", ["C", "D", "E", "F", "G", "A", "B"]),
    key("F", ["F", "G", "A", "B♭", "C", "D", "E"]),
    key("B♭", ["B♭", "C", "D", "E♭", "F", "G", "A"]),
    key("E♭", ["E♭", "F", "G", "A♭", "B♭", "C", "D"]),
    key("A♭", ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"]),
    key("D♭", ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"]),
    key("G♭", ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F"]),
    key("B", ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"]),
    key("E", ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"]),
    key("A", ["A", "B", "C♯", "D", "E", "F♯", "G♯"]),
    key("D", ["D", "E", "F♯", "G", "A", "B", "C♯"]),
    key("G", ["G", "A", "B", "C", "D", "E", "F♯"]),
  ];
  const VOICINGS = [
    { id: "root", label: "基本形", degrees: [3, 5, 7, 9] },
    { id: "second", label: "2nd Inversion", degrees: [7, 9, 3, 5] },
  ];

  const state = { deck: [], index: 0, revealed: false, completed: false };

  function key(label, scale) { return { id: label, label, scale }; }

  function shuffle(items, random = Math.random) {
    const result = items.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function noteForDegree(keyItem, degree) { return keyItem.scale[(degree - 1) % 7]; }

  function solfegeForNote(note) { return `${SOLFEGE[note[0]]}${note.slice(1)}`; }

  function buildTask(keyItem, voicing) {
    return {
      id: `${keyItem.id}:${voicing.id}`,
      key: keyItem,
      voicing,
      notes: voicing.degrees.map((degree) => ({ degree, note: solfegeForNote(noteForDegree(keyItem, degree)) })),
    };
  }

  function buildDeck(random = Math.random) {
    const keyOrder = shuffle(KEYS, random);
    const voicingPool = shuffle(Array.from({ length: ROUND_SIZE }, (_, index) => VOICINGS[index % VOICINGS.length]), random);
    return keyOrder.map((keyItem, index) => buildTask(keyItem, voicingPool[index]));
  }

  function elements() {
    return {
      startButton: document.querySelector("#rootless-start-button"),
      progressCount: document.querySelector("#rootless-progress-count"),
      questionPanel: document.querySelector("#rootless-question-panel"),
      revealButton: document.querySelector("#rootless-reveal-button"),
      nextButton: document.querySelector("#rootless-next-button"),
    };
  }

  function currentTask() { return state.deck[state.index] || null; }

  function renderQuestion() {
    const task = currentTask();
    const dom = elements();
    if (state.completed) {
      dom.questionPanel.innerHTML = '<div class="complete-state"><strong>完了</strong></div>';
    } else if (!task) {
      dom.questionPanel.innerHTML = '<div class="ready-state"><strong>待機中</strong></div>';
    } else if (!state.revealed) {
      dom.questionPanel.innerHTML = `
        <div class="rootless-question-state">
          <span class="rootless-voicing-label">${task.voicing.label}</span>
          <span class="rootless-key-label">Key</span>
          <strong class="question-key">${task.key.label}</strong>
        </div>`;
    } else {
      dom.questionPanel.innerHTML = `
        <div class="rootless-question-state">
          <span class="rootless-voicing-label">${task.voicing.label}</span>
          <p class="answer-title"><strong>Key ${task.key.label}</strong></p>
          <div class="rootless-answer-notes" aria-label="回答">
            ${task.notes.map(({ degree, note }) => `<span class="rootless-answer-note"><small>${degree}</small><strong>${note}</strong></span>`).join("")}
          </div>
        </div>`;
    }
  }

  function render() {
    const dom = elements();
    const task = currentTask();
    const total = state.deck.length || ROUND_SIZE;
    dom.progressCount.textContent = `${state.completed ? total : task ? state.index + 1 : 0} / ${total}`;
    dom.startButton.textContent = state.completed ? "もう一周" : state.deck.length ? "再スタート" : "スタート";
    dom.revealButton.hidden = state.revealed || state.completed;
    dom.revealButton.disabled = !task || state.revealed || state.completed;
    dom.nextButton.hidden = !state.revealed || state.completed;
    dom.nextButton.textContent = state.index === state.deck.length - 1 ? "完了" : "次へ";
    renderQuestion();
  }

  function startCycle() {
    state.deck = buildDeck(); state.index = 0; state.revealed = false; state.completed = false;
    render();
  }

  function revealAnswer() { if (currentTask()) { state.revealed = true; render(); } }

  function nextTask() {
    if (state.index >= state.deck.length - 1) {
      state.completed = true;
      global.JazzDailyProgress?.mark("rootless-9th");
    } else { state.index += 1; state.revealed = false; }
    render();
  }

  function boot() {
    const dom = elements();
    dom.startButton.addEventListener("click", startCycle);
    dom.revealButton.addEventListener("click", revealAnswer);
    dom.nextButton.addEventListener("click", nextTask);
    render();
  }

  const api = { KEYS, ROUND_SIZE, VOICINGS, buildDeck, buildTask, noteForDegree, solfegeForNote };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.RootlessNinth = api;
  if (typeof document !== "undefined") boot();
})(typeof window !== "undefined" ? window : globalThis);
