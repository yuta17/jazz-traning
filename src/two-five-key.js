(function attachTwoFiveKey(global) {
  "use strict";

  const ROUND_SIZE = 12;
  const MODES = ["major", "minor"];
  const MODE_LABELS = {
    major: "メジャー",
    minor: "マイナー",
  };

  const theory = typeof module !== "undefined" && module.exports
    ? require("./theory.js")
    : global.JazzTheory;
  const KEYS = theory.KEYS;
  const ANSWER_OPTIONS = KEYS.slice().sort((a, b) => {
    const order = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    return order.indexOf(a.id) - order.indexOf(b.id);
  });

  const state = {
    modes: ["major"],
    roundModes: [],
    deck: [],
    index: 0,
    answered: null,
    correct: 0,
    completed: false,
  };

  function shuffle(items, random = Math.random) {
    const result = items.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function sanitizeModes(modes) {
    const selected = Array.isArray(modes) ? modes : [];
    return MODES.filter((mode) => selected.includes(mode));
  }

  function balancedModes(modes, count, random = Math.random) {
    const selected = sanitizeModes(modes);
    const pool = [];

    if (selected.length === 0) return pool;

    while (pool.length < count) {
      pool.push(...shuffle(selected, random));
    }

    return pool.slice(0, count);
  }

  function answerLabel(mode, keyId) {
    return `${KEYS.find((key) => key.id === keyId).label} ${MODE_LABELS[mode]}`;
  }

  function buildDeck(modes, random = Math.random) {
    const selected = sanitizeModes(modes);
    if (!selected.length) return [];
    const modeOrder = balancedModes(selected, ROUND_SIZE, random);
    return shuffle(KEYS, random).map((key, index) => {
      const mode = modeOrder[index];
      return {
        id: `${mode}:${key.id}`,
        keyId: key.id,
        mode,
        answer: `${mode}:${key.id}`,
        chords: key[mode].slice(0, 2),
        resolution: key[mode][2],
      };
    });
  }

  function elements() {
    return {
      checkboxes: Array.from(document.querySelectorAll("input[name='mode']")),
      startButton: document.querySelector("#two-five-key-start-button"),
      progressCount: document.querySelector("#two-five-key-progress-count"),
      questionPanel: document.querySelector("#two-five-key-question-panel"),
      choiceGrid: document.querySelector("#two-five-key-choice-grid"),
      nextButton: document.querySelector("#two-five-key-next-button"),
    };
  }

  function readModes() {
    return elements().checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
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
      ? `<p class="signature-result">${
        state.answered === task.answer
          ? `正解：${answerLabel(task.mode, task.keyId)}`
          : `正解は ${answerLabel(task.mode, task.keyId)}`
      }</p>`
      : "";

    dom.questionPanel.innerHTML = `
      <div class="signature-question-state">
        <div class="two-five-key-chords">
          ${task.chords.map((chord) => `<strong>${chord}</strong>`).join('<span aria-hidden="true">→</span>')}
        </div>
        ${result}
        ${state.answered ? `<p>${task.chords.join(" → ")} → ${task.resolution}</p>` : ""}
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

    dom.choiceGrid.innerHTML = state.roundModes.flatMap((mode) => ANSWER_OPTIONS
      .map((key) => {
        const answer = `${mode}:${key.id}`;
        const isSelected = state.answered === answer;
        const isCorrect = state.answered && answer === task.answer;
        const isWrong = isSelected && answer !== task.answer;
        const className = [
          "signature-choice",
          isCorrect ? "correct" : "",
          isWrong ? "wrong" : "",
        ].filter(Boolean).join(" ");

        return `
          <button
            class="${className}"
            type="button"
            data-answer="${answer}"
            ${state.answered ? "disabled" : ""}
          >
            ${answerLabel(mode, key.id)}
          </button>
        `;
      }))
      .join("");
  }

  function renderControls() {
    const dom = elements();
    const hasSelection = sanitizeModes(state.modes).length > 0;
    dom.startButton.disabled = !hasSelection;
    dom.startButton.textContent = state.deck.length ? "再スタート" : "スタート";
    dom.nextButton.hidden = !state.answered || state.completed;
    dom.nextButton.textContent = state.index >= state.deck.length - 1 ? "完了" : "次へ";

    if (state.completed) {
      dom.startButton.textContent = "もう一周";
    }
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
    state.modes = readModes();
    state.roundModes = state.modes.slice();
    state.deck = buildDeck(state.roundModes);
    state.index = 0;
    state.answered = null;
    state.correct = 0;
    state.completed = state.deck.length === 0;
    render();
    scrollPracticeIntoView();
  }

  function answerQuestion(answer) {
    const task = currentTask();
    if (!task || state.completed || state.answered) return;
    if (!state.roundModes.some((mode) => KEYS.some((key) => answer === `${mode}:${key.id}`))) return;

    state.answered = answer;
    if (answer === task.answer) state.correct += 1;
    render();
  }

  function nextQuestion() {
    if (!currentTask() || state.completed || !state.answered) return;

    if (state.index >= state.deck.length - 1) {
      state.completed = true;
      global.JazzDailyProgress?.mark("two-five-key");
    } else {
      state.index += 1;
      state.answered = null;
    }

    render();
  }

  function updateModes() {
    state.modes = readModes();
    renderControls();
  }

  function boot() {
    const dom = elements();

    dom.checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateModes);
    });
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
    ANSWER_OPTIONS,
    KEYS,
    MODE_LABELS,
    MODES,
    ROUND_SIZE,
    answerLabel,
    balancedModes,
    buildDeck,
    sanitizeModes,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.TwoFiveKeyTraining = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
