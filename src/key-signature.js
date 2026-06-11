(function attachKeySignature(global) {
  "use strict";

  const ROUND_SIZE = 12;
  const MODES = ["major", "minor"];
  const MODE_LABELS = {
    major: "メジャー",
    minor: "マイナー",
  };

  const KEY_SIGNATURES = [
    signature("none", 0, "C", "A"),
    signature("flat", 1, "F", "D"),
    signature("flat", 2, "B♭", "G"),
    signature("flat", 3, "E♭", "C"),
    signature("flat", 4, "A♭", "F"),
    signature("flat", 5, "D♭", "B♭"),
    signature("flat", 6, "G♭", "E♭"),
    signature("sharp", 5, "B", "G♯"),
    signature("sharp", 4, "E", "C♯"),
    signature("sharp", 3, "A", "F♯"),
    signature("sharp", 2, "D", "B"),
    signature("sharp", 1, "G", "E"),
  ];

  const ANSWER_OPTIONS = {
    major: ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"],
    minor: ["A", "B♭", "B", "C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "G♯"],
  };

  const state = {
    modes: ["major", "minor"],
    deck: [],
    index: 0,
    answered: null,
    correct: 0,
    completed: false,
  };

  function signature(type, count, major, minor) {
    return {
      id: `${type}-${count}`,
      type,
      count,
      major,
      minor,
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

  function signatureLabel(item) {
    if (item.type === "none") return "♯/♭なし";
    return `${item.type === "sharp" ? "♯" : "♭"} ${item.count}個`;
  }

  function answerForTask(task) {
    return task.signature[task.mode];
  }

  function answerLabel(mode, answer) {
    return `${answer}${MODE_LABELS[mode]}`;
  }

  function buildDeck(modes, random = Math.random) {
    const selected = sanitizeModes(modes);
    if (selected.length === 0) return [];

    const signatures = shuffle(KEY_SIGNATURES, random);
    const modeOrder = balancedModes(selected, ROUND_SIZE, random);

    return signatures.map((item, index) => {
      const mode = modeOrder[index];
      return {
        id: `${item.id}-${mode}`,
        signature: item,
        mode,
        answer: item[mode],
      };
    });
  }

  function elements() {
    return {
      checkboxes: Array.from(document.querySelectorAll("input[name='mode']")),
      startButton: document.querySelector("#signature-start-button"),
      progressCount: document.querySelector("#signature-progress-count"),
      questionPanel: document.querySelector("#signature-question-panel"),
      choiceGrid: document.querySelector("#signature-choice-grid"),
      nextButton: document.querySelector("#signature-next-button"),
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
          ? "正解"
          : `正解は ${answerLabel(task.mode, task.answer)}`
      }</p>`
      : "";

    dom.questionPanel.innerHTML = `
      <div class="signature-question-state">
        <span class="signature-mode">${MODE_LABELS[task.mode]}</span>
        <strong class="signature-mark">${signatureLabel(task.signature)}</strong>
        ${result}
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

    dom.choiceGrid.innerHTML = ANSWER_OPTIONS[task.mode]
      .map((answer) => {
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
            ${answerLabel(task.mode, answer)}
          </button>
        `;
      })
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
    state.deck = buildDeck(state.modes);
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
      global.JazzDailyProgress?.mark("key-signature");
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
    KEY_SIGNATURES,
    MODE_LABELS,
    MODES,
    ROUND_SIZE,
    answerLabel,
    answerForTask,
    balancedModes,
    buildDeck,
    sanitizeModes,
    signatureLabel,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.KeySignatureTraining = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
