(function bootTrainer() {
  "use strict";

  const {
    KEYS,
    sanitizeSettings,
    selectedQualities,
    cycleSize,
    buildDeck,
    statKey,
  } = window.JazzTheory;

  const STORAGE_KEY = "jazz-251-trainer-state-v1";
  const DEFAULT_SETTINGS = {
    major: ["R2R", "2R2"],
    minor: [],
  };

  const elements = {
    checkboxes: Array.from(document.querySelectorAll("input[type='checkbox']")),
    startButton: document.querySelector("#start-button"),
    progressCount: document.querySelector("#progress-count"),
    questionPanel: document.querySelector("#question-panel"),
    revealButton: document.querySelector("#reveal-button"),
    answerButtons: document.querySelector("#answer-buttons"),
    hitButton: document.querySelector("#hit-button"),
    missButton: document.querySelector("#miss-button"),
    statsBody: document.querySelector("#stats-body"),
  };

  const state = {
    settings: loadSettings(),
    stats: loadStats(),
    deck: [],
    index: 0,
    revealed: false,
    completed: false,
  };

  function loadSnapshot() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function loadSettings() {
    return sanitizeSettings(loadSnapshot().settings || DEFAULT_SETTINGS);
  }

  function loadStats() {
    const snapshot = loadSnapshot();
    return snapshot.stats && typeof snapshot.stats === "object"
      ? snapshot.stats
      : {};
  }

  function saveState() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        settings: state.settings,
        stats: state.stats,
      }),
    );
  }

  function readSettingsFromForm() {
    const next = { major: [], minor: [] };
    elements.checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        next[checkbox.name].push(checkbox.value);
      }
    });
    return sanitizeSettings(next);
  }

  function syncSettingsToForm() {
    elements.checkboxes.forEach((checkbox) => {
      checkbox.checked = state.settings[checkbox.name].includes(checkbox.value);
    });
  }

  function currentTask() {
    return state.deck[state.index] || null;
  }

  function displayKey(task) {
    return task.quality === "minor"
      ? `${task.keyLabel}<span class="minor-token">(-)</span>`
      : `${task.keyLabel}<span class="major-token">△</span>`;
  }

  function plainKey(task) {
    return task.quality === "minor" ? `${task.keyLabel}(-)` : `${task.keyLabel}△`;
  }

  function renderQuestion() {
    const task = currentTask();

    if (state.completed) {
      elements.questionPanel.innerHTML = `
        <div class="complete-state">
          <p>一周</p>
          <strong>完了</strong>
        </div>
      `;
      return;
    }

    if (!task) {
      elements.questionPanel.innerHTML = `
        <div class="ready-state">
          <p>キー</p>
          <strong>待機中</strong>
        </div>
      `;
      return;
    }

    if (!state.revealed) {
      elements.questionPanel.innerHTML = `
        <div class="question-state">
          <p>キー</p>
          <strong class="question-key">
            ${displayKey(task)}
            <span class="variation-token">[${task.variation}]</span>
          </strong>
        </div>
      `;
      return;
    }

    const chords = task.chords
      .map(
        (chord) => `
          <div class="chord-card">
            <span class="degree">${chord.degree}</span>
            <span class="chord-symbol">${chord.symbol}</span>
          </div>
        `,
      )
      .join("");

    elements.questionPanel.innerHTML = `
      <div class="answer-state">
        <p class="answer-title">
          キー <strong>${plainKey(task)}</strong>
          <span>[${task.variation}]</span>
        </p>
        <div class="chord-list">${chords}</div>
      </div>
    `;
  }

  function renderProgress() {
    const total = state.deck.length || cycleSize(state.settings) || 12;
    const current = state.deck.length && !state.completed ? state.index + 1 : 0;
    elements.progressCount.textContent = `${current} / ${total}`;
  }

  function renderControls() {
    const hasSelection = cycleSize(state.settings) > 0;
    const hasTask = Boolean(currentTask());

    elements.startButton.disabled = !hasSelection;
    elements.startButton.textContent = state.deck.length ? "再スタート" : "スタート";
    elements.revealButton.hidden = state.revealed || state.completed;
    elements.revealButton.disabled = !hasTask || state.revealed || state.completed;
    elements.answerButtons.hidden = !state.revealed || state.completed;

    if (state.completed) {
      elements.startButton.textContent = "もう一周";
    }
  }

  function renderStats() {
    const rows = [];
    const qualities = selectedQualities(state.settings);

    qualities.forEach((quality) => {
      KEYS.forEach((key) => {
        state.settings[quality].forEach((variation) => {
          const keyId = statKey(quality, key.id, variation);
          const row = state.stats[keyId] || { attempts: 0, correct: 0 };
          const rate = row.attempts
            ? `${Math.round((row.correct / row.attempts) * 100)}%`
            : "-";

          rows.push(`
            <tr>
              <td>
                <span class="key-label">
                  ${quality === "minor" ? `${key.label}(-)` : key.label}
                  <span class="badge">${variation}</span>
                </span>
              </td>
              <td>${row.attempts}</td>
              <td>${row.correct}</td>
              <td>${rate}</td>
            </tr>
          `);
        });
      });
    });

    elements.statsBody.innerHTML = rows.length
      ? rows.join("")
      : `<tr class="empty-row"><td colspan="4">未選択</td></tr>`;
  }

  function render() {
    syncSettingsToForm();
    renderQuestion();
    renderProgress();
    renderControls();
    renderStats();
  }

  function startCycle() {
    state.settings = readSettingsFromForm();
    state.deck = buildDeck(state.settings);
    state.index = 0;
    state.revealed = false;
    state.completed = state.deck.length === 0;
    saveState();
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

    const key = statKey(task.quality, task.keyId, task.variation);
    const row = state.stats[key] || { attempts: 0, correct: 0 };
    row.attempts += 1;
    if (wasCorrect) row.correct += 1;
    state.stats[key] = row;

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

  function updateSettingsFromForm() {
    state.settings = readSettingsFromForm();
    saveState();
    render();
  }

  elements.checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateSettingsFromForm);
  });

  elements.startButton.addEventListener("click", startCycle);
  elements.revealButton.addEventListener("click", revealAnswer);
  elements.hitButton.addEventListener("click", () => markAnswer(true));
  elements.missButton.addEventListener("click", () => markAnswer(false));

  render();
})();
