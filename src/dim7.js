(function bootDimTrainer() {
  "use strict";

  const CHORDS = [
    { id: "C", label: "Cdim7", notes: ["C", "E♭", "G♭", "A"] },
    { id: "Db", label: "D♭dim7", notes: ["D♭", "E", "G", "B♭"] },
    { id: "D", label: "Ddim7", notes: ["D", "F", "A♭", "B"] },
    { id: "Eb", label: "E♭dim7", notes: ["E♭", "G♭", "A", "C"] },
    { id: "E", label: "Edim7", notes: ["E", "G", "B♭", "D♭"] },
    { id: "F", label: "Fdim7", notes: ["F", "A♭", "B", "D"] },
    { id: "Gb", label: "G♭dim7", notes: ["G♭", "A", "C", "E♭"] },
    { id: "G", label: "Gdim7", notes: ["G", "B♭", "D♭", "E"] },
    { id: "Ab", label: "A♭dim7", notes: ["A♭", "B", "D", "F"] },
    { id: "A", label: "Adim7", notes: ["A", "C", "E♭", "G♭"] },
    { id: "Bb", label: "B♭dim7", notes: ["B♭", "D♭", "E", "G"] },
    { id: "B", label: "Bdim7", notes: ["B", "D", "F", "A♭"] },
  ];

  const STORAGE_KEY = "jazz-dim7-trainer-state-v1";

  const elements = {
    startButton: document.querySelector("#dim-start-button"),
    progressCount: document.querySelector("#dim-progress-count"),
    questionPanel: document.querySelector("#dim-question-panel"),
    revealButton: document.querySelector("#dim-reveal-button"),
    answerButtons: document.querySelector("#dim-answer-buttons"),
    hitButton: document.querySelector("#dim-hit-button"),
    missButton: document.querySelector("#dim-miss-button"),
    statsBody: document.querySelector("#dim-stats-body"),
  };

  const state = {
    stats: loadStats(),
    deck: [],
    index: 0,
    revealed: false,
    completed: false,
  };

  function loadStats() {
    try {
      const snapshot = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return snapshot.stats && typeof snapshot.stats === "object"
        ? snapshot.stats
        : {};
    } catch {
      return {};
    }
  }

  function saveState() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        stats: state.stats,
      }),
    );
  }

  function shuffle(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function currentTask() {
    return state.deck[state.index] || null;
  }

  function renderQuestion() {
    const task = currentTask();

    if (state.completed) {
      elements.questionPanel.innerHTML = `
        <div class="complete-state">
          <p>Cycle</p>
          <strong>完了</strong>
        </div>
      `;
      return;
    }

    if (!task) {
      elements.questionPanel.innerHTML = `
        <div class="ready-state">
          <p>Chord</p>
          <strong>Ready</strong>
        </div>
      `;
      return;
    }

    if (!state.revealed) {
      elements.questionPanel.innerHTML = `
        <div class="question-state">
          <p>Chord</p>
          <strong class="question-key dim-symbol">${task.label}</strong>
        </div>
      `;
      return;
    }

    elements.questionPanel.innerHTML = `
      <div class="answer-state">
        <p class="answer-title">
          <strong>${task.label}</strong>
        </p>
        <div class="dim-note-list">
          ${task.notes.map((note) => `<span class="dim-note">${note}</span>`).join("")}
        </div>
      </div>
    `;
  }

  function renderProgress() {
    const total = state.deck.length || CHORDS.length;
    const current = state.deck.length && !state.completed ? state.index + 1 : 0;
    elements.progressCount.textContent = `${current} / ${total}`;
  }

  function renderControls() {
    const hasTask = Boolean(currentTask());

    elements.startButton.textContent = state.deck.length ? "再スタート" : "スタート";
    elements.revealButton.hidden = state.revealed || state.completed;
    elements.revealButton.disabled = !hasTask || state.revealed || state.completed;
    elements.answerButtons.hidden = !state.revealed || state.completed;

    if (state.completed) {
      elements.startButton.textContent = "もう一周";
    }
  }

  function renderStats() {
    elements.statsBody.innerHTML = CHORDS.map((chord) => {
      const row = state.stats[chord.id] || { attempts: 0, correct: 0 };
      const rate = row.attempts
        ? `${Math.round((row.correct / row.attempts) * 100)}%`
        : "-";

      return `
        <tr>
          <td><span class="key-label">${chord.label}</span></td>
          <td>${row.attempts}</td>
          <td>${row.correct}</td>
          <td>${rate}</td>
        </tr>
      `;
    }).join("");
  }

  function render() {
    renderQuestion();
    renderProgress();
    renderControls();
    renderStats();
  }

  function startCycle() {
    state.deck = shuffle(CHORDS);
    state.index = 0;
    state.revealed = false;
    state.completed = false;
    render();
    scrollPracticeIntoView();
  }

  function scrollPracticeIntoView() {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    requestAnimationFrame(() => {
      document.querySelector(".practice").scrollIntoView({
        behavior,
        block: "start",
      });
    });
  }

  function revealAnswer() {
    if (!currentTask()) return;
    state.revealed = true;
    render();
  }

  function markAnswer(wasCorrect) {
    const task = currentTask();
    if (!task) return;

    const row = state.stats[task.id] || { attempts: 0, correct: 0 };
    row.attempts += 1;
    if (wasCorrect) row.correct += 1;
    state.stats[task.id] = row;

    if (state.index >= state.deck.length - 1) {
      state.completed = true;
      state.revealed = false;
    } else {
      state.index += 1;
      state.revealed = false;
    }

    saveState();
    render();
  }

  elements.startButton.addEventListener("click", startCycle);
  elements.revealButton.addEventListener("click", revealAnswer);
  elements.hitButton.addEventListener("click", () => markAnswer(true));
  elements.missButton.addEventListener("click", () => markAnswer(false));

  render();
})();
