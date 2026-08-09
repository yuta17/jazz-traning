(function attachDegreeNote(global) {
  "use strict";

  const ROUND_SIZE = 12;
  const DEGREES = [1, 3, 5, 7, 9, 11, 13];
  const NOTE_OPTIONS = [
    "C",
    "C♯",
    "D♭",
    "D",
    "D♯",
    "E♭",
    "E",
    "F",
    "F♯",
    "G♭",
    "G",
    "G♯",
    "A♭",
    "A",
    "A♯",
    "B♭",
    "B",
    "C♭",
  ];

  const KEYS = [
    key("C", ["C", "D", "E", "F", "G", "A", "B"]),
    key("F", ["F", "G", "A", "B♭", "C", "D", "E"]),
    key("Bb", ["B♭", "C", "D", "E♭", "F", "G", "A"]),
    key("Eb", ["E♭", "F", "G", "A♭", "B♭", "C", "D"]),
    key("Ab", ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"]),
    key("Db", ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"]),
    key("Gb", ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F"]),
    key("B", ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"]),
    key("E", ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"]),
    key("A", ["A", "B", "C♯", "D", "E", "F♯", "G♯"]),
    key("D", ["D", "E", "F♯", "G", "A", "B", "C♯"]),
    key("G", ["G", "A", "B", "C", "D", "E", "F♯"]),
  ];

  const SOLFEGE = {
    C: "ド",
    D: "レ",
    E: "ミ",
    F: "ファ",
    G: "ソ",
    A: "ラ",
    B: "シ",
  };

  const state = {
    deck: [],
    index: 0,
    answered: null,
    correct: 0,
    completed: false,
  };

  function key(id, scale) {
    return {
      id,
      label: scale[0],
      scale,
    };
  }

  function shuffle(items, random = Math.random) {
    const result = items.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function balancedDegrees(count, random = Math.random) {
    const pool = [];
    while (pool.length < count) {
      pool.push(...shuffle(DEGREES, random));
    }
    return pool.slice(0, count);
  }

  function degreeIndex(degree) {
    const normalized = Number(degree);
    if (!DEGREES.includes(normalized)) return -1;
    return (normalized - 1) % 7;
  }

  function noteForDegree(keyItem, degree) {
    const index = degreeIndex(degree);
    return index >= 0 ? keyItem.scale[index] : "";
  }

  function solfegeForNote(note) {
    const letter = note[0];
    const accidental = note.slice(1);
    return `${SOLFEGE[letter] || note}${accidental}`;
  }

  function answerLabel(note) {
    return `${note}（${solfegeForNote(note)}）`;
  }

  function scaleSummary(keyItem, activeDegree) {
    return DEGREES.map((degree) => {
      const note = noteForDegree(keyItem, degree);
      return {
        degree,
        note,
        active: degree === activeDegree,
      };
    });
  }

  function buildDeck(random = Math.random) {
    const keyOrder = shuffle(KEYS, random);
    const degreeOrder = balancedDegrees(ROUND_SIZE, random);

    return keyOrder.map((keyItem, index) => {
      const degree = degreeOrder[index];
      const answer = noteForDegree(keyItem, degree);
      return {
        id: `${keyItem.id}:${degree}`,
        key: keyItem,
        degree,
        answer,
      };
    });
  }

  function elements() {
    return {
      startButton: document.querySelector("#degree-start-button"),
      progressCount: document.querySelector("#degree-progress-count"),
      questionPanel: document.querySelector("#degree-question-panel"),
      choiceGrid: document.querySelector("#degree-choice-grid"),
      nextButton: document.querySelector("#degree-next-button"),
    };
  }

  function currentTask() {
    return state.deck[state.index] || null;
  }

  function renderProgress() {
    const dom = elements();
    const total = state.deck.length || ROUND_SIZE;
    const current = state.completed ? total : state.deck.length ? state.index + 1 : 0;
    dom.progressCount.textContent = `${current} / ${total}`;
  }

  function renderQuestion() {
    const dom = elements();
    const task = currentTask();

    if (state.completed) {
      dom.questionPanel.innerHTML = `
        <div class="complete-state">
          <p>正解 ${state.correct} / ${ROUND_SIZE}</p>
          <strong>完了</strong>
        </div>
      `;
      return;
    }

    if (!task) {
      dom.questionPanel.innerHTML = `
        <div class="ready-state">
          <strong>待機中</strong>
        </div>
      `;
      return;
    }

    const result = state.answered
      ? `<p class="degree-result">${
        state.answered === task.answer
          ? "正解"
          : `正解は ${answerLabel(task.answer)}`
      }</p>`
      : "";
    const summary = state.answered
      ? `
        <div class="degree-scale-line" aria-label="度数一覧">
          ${scaleSummary(task.key, task.degree).map((item) => `
            <span class="${item.active ? "active" : ""}">
              <b>${item.degree}</b>${item.note}
            </span>
          `).join("")}
        </div>
      `
      : "";

    dom.questionPanel.innerHTML = `
      <div class="degree-question-state">
        <span class="degree-key-label">Key ${task.key.label}</span>
        <strong class="degree-number">${task.degree}</strong>
        ${result}
        ${summary}
      </div>
    `;
  }

  function renderChoices() {
    const dom = elements();
    const task = currentTask();

    if (!task || state.completed) {
      dom.choiceGrid.innerHTML = "";
      return;
    }

    dom.choiceGrid.innerHTML = NOTE_OPTIONS.map((note) => {
      const isSelected = state.answered === note;
      const isCorrect = state.answered && note === task.answer;
      const isWrong = isSelected && note !== task.answer;
      const className = [
        "degree-choice",
        isCorrect ? "correct" : "",
        isWrong ? "wrong" : "",
      ].filter(Boolean).join(" ");

      return `
        <button
          class="${className}"
          type="button"
          data-answer="${note}"
          ${state.answered ? "disabled" : ""}
        >
          <span>${note}</span>
          <small>${solfegeForNote(note)}</small>
        </button>
      `;
    }).join("");
  }

  function renderControls() {
    const dom = elements();
    dom.startButton.textContent = state.completed
      ? "もう一周"
      : state.deck.length
        ? "再スタート"
        : "スタート";
    dom.nextButton.hidden = !state.answered || state.completed;
    dom.nextButton.textContent = state.index >= state.deck.length - 1 ? "完了" : "次へ";
  }

  function render() {
    renderProgress();
    renderQuestion();
    renderChoices();
    renderControls();
  }

  function scrollPracticeIntoView() {
    const prefersReducedMotion = global.matchMedia
      && global.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = prefersReducedMotion ? "auto" : "smooth";

    global.requestAnimationFrame?.(() => {
      document.querySelector(".practice").scrollIntoView({
        behavior,
        block: "start",
      });
    });
  }

  function startCycle() {
    state.deck = buildDeck();
    state.index = 0;
    state.answered = null;
    state.correct = 0;
    state.completed = state.deck.length === 0;
    render();
    scrollPracticeIntoView();
  }

  function answerQuestion(answer) {
    const task = currentTask();
    if (!task || state.answered) return;

    state.answered = answer;
    if (answer === task.answer) state.correct += 1;
    render();
  }

  function nextQuestion() {
    if (!currentTask() || !state.answered) return;

    if (state.index >= state.deck.length - 1) {
      state.completed = true;
      global.JazzDailyProgress?.mark("degree-note");
    } else {
      state.index += 1;
      state.answered = null;
    }

    render();
  }

  function boot() {
    const dom = elements();
    dom.startButton.addEventListener("click", startCycle);
    dom.nextButton.addEventListener("click", nextQuestion);
    dom.choiceGrid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-answer]");
      if (!button) return;
      answerQuestion(button.dataset.answer);
    });

    render();
  }

  const api = {
    DEGREES,
    KEYS,
    NOTE_OPTIONS,
    ROUND_SIZE,
    answerLabel,
    balancedDegrees,
    buildDeck,
    degreeIndex,
    noteForDegree,
    scaleSummary,
    solfegeForNote,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.DegreeNoteTraining = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
