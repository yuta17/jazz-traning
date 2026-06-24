(function attachRootless9th(global) {
  "use strict";

  const ROUND_SIZE = 12;
  const STORAGE_KEY = "jazz-rootless-9th-state-v1";

  const NATURAL_PITCH = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  };

  const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
  const ROOTS = ["C", "D♭", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
  const PRACTICAL_NAMES = ["C", "D♭", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
  const SIMPLE_ACCIDENTAL_BLACKLIST = new Set(["C♭", "F♭", "B♯", "E♯"]);
  const KANA = {
    C: "ド",
    D: "レ",
    E: "ミ",
    F: "ファ",
    G: "ソ",
    A: "ラ",
    B: "シ",
  };

  const ROOTLESS_QUALITIES = [
    {
      id: "maj7",
      label: "maj7",
      suffix: "maj7",
      degrees: [2, 4, 6, 8],
      degreeLabels: ["3", "5", "7", "9"],
      intervals: [4, 7, 11, 14],
    },
    {
      id: "7",
      label: "7",
      suffix: "7",
      degrees: [2, 4, 6, 8],
      degreeLabels: ["3", "5", "♭7", "9"],
      intervals: [4, 7, 10, 14],
    },
    {
      id: "m7",
      label: "m7",
      suffix: "m7",
      degrees: [2, 4, 6, 8],
      degreeLabels: ["♭3", "5", "♭7", "9"],
      intervals: [3, 7, 10, 14],
    },
    {
      id: "m7b5",
      label: "m7♭5",
      suffix: "m7♭5",
      degrees: [2, 4, 6, 8],
      degreeLabels: ["♭3", "♭5", "♭7", "9"],
      intervals: [3, 6, 10, 14],
    },
  ];

  const state = {
    stats: loadStats(),
    deck: [],
    index: 0,
    revealed: false,
    completed: false,
  };

  function normalizePitch(value) {
    return ((value % 12) + 12) % 12;
  }

  function parseRoot(root) {
    const normalized = root.replace(/#/g, "♯").replace(/b/g, "♭");
    const letter = normalized[0];
    let pitch = NATURAL_PITCH[letter];
    if (normalized.includes("♯")) pitch += 1;
    if (normalized.includes("♭")) pitch -= 1;
    return {
      label: normalized,
      letter,
      letterIndex: LETTERS.indexOf(letter),
      pitchClass: normalizePitch(pitch),
    };
  }

  function accidentalDelta(naturalPitch, targetPitch) {
    let delta = normalizePitch(targetPitch - naturalPitch);
    if (delta > 6) delta -= 12;
    return delta;
  }

  function practicalName(pitchClass) {
    return PRACTICAL_NAMES[normalizePitch(pitchClass)];
  }

  function spellPitch(root, degreeOffset, interval) {
    const letter = LETTERS[(root.letterIndex + degreeOffset) % LETTERS.length];
    const targetPitch = normalizePitch(root.pitchClass + interval);
    const delta = accidentalDelta(NATURAL_PITCH[letter], targetPitch);

    if (Math.abs(delta) > 1) return practicalName(targetPitch);

    const accidental = delta === 1 ? "♯" : delta === -1 ? "♭" : "";
    const spelled = `${letter}${accidental}`;
    return SIMPLE_ACCIDENTAL_BLACKLIST.has(spelled) ? practicalName(targetPitch) : spelled;
  }

  function kanaNote(spelled) {
    const letter = spelled[0];
    const accidental = spelled.includes("♯") ? "♯" : spelled.includes("♭") ? "♭" : "";
    const base = KANA[letter];
    const help = accidental === "♯"
      ? `${base}を半音上げ`
      : accidental === "♭"
        ? `${base}を半音下げ`
        : base;

    return {
      kana: `${base}${accidental}`,
      help,
      symbol: spelled,
    };
  }

  function buildVoicing(rootLabel, quality) {
    const root = parseRoot(rootLabel);
    const notes = quality.intervals.map((interval, index) => {
      const symbol = spellPitch(root, quality.degrees[index], interval);
      return {
        degree: quality.degreeLabels[index],
        ...kanaNote(symbol),
      };
    });

    return {
      id: `${root.label}-${quality.id}`,
      label: `${root.label}${quality.suffix}`,
      notes,
      kanaNotes: notes.map((note) => note.kana),
      noteLine: notes.map((note) => note.kana).join(" "),
      root: root.label,
      qualityId: quality.id,
      qualityLabel: quality.label,
    };
  }

  function createFullDeck() {
    return ROOTLESS_QUALITIES.flatMap((quality) => (
      ROOTS.map((root) => buildVoicing(root, quality))
    ));
  }

  function createDeck() {
    const roots = shuffle(ROOTS);
    const qualities = shuffle(ROOTLESS_QUALITIES.flatMap((quality) => (
      Array.from({ length: 3 }, () => quality)
    )));

    return shuffle(roots.map((root, index) => buildVoicing(root, qualities[index])));
  }

  function loadStats() {
    try {
      const snapshot = JSON.parse(global.localStorage?.getItem(STORAGE_KEY) || "{}");
      return snapshot.stats && typeof snapshot.stats === "object"
        ? snapshot.stats
        : {};
    } catch {
      return {};
    }
  }

  function saveState() {
    global.localStorage?.setItem(
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

  function elements() {
    return {
      startButton: document.querySelector("#rootless-start-button"),
      progressCount: document.querySelector("#rootless-progress-count"),
      questionPanel: document.querySelector("#rootless-question-panel"),
      revealButton: document.querySelector("#rootless-reveal-button"),
      hitButton: document.querySelector("#rootless-hit-button"),
      missButton: document.querySelector("#rootless-miss-button"),
      statsBody: document.querySelector("#rootless-stats-body"),
    };
  }

  function renderQuestion() {
    const dom = elements();
    const task = currentTask();

    if (state.completed) {
      dom.questionPanel.innerHTML = `
        <div class="complete-state">
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

    if (!state.revealed) {
      dom.questionPanel.innerHTML = `
        <div class="question-state">
          <span class="voicing-pill">3・5・7・9</span>
          <strong class="question-key chord-symbol">${task.label}</strong>
        </div>
      `;
      return;
    }

    dom.questionPanel.innerHTML = `
      <div class="answer-state">
        <p class="answer-title">
          <strong>${task.label}</strong>
        </p>
        <div class="rootless-note-line">${task.noteLine}</div>
        <div class="rootless-note-list">
          ${task.notes.map((note) => `
            <span class="rootless-note">
              <small>${note.degree}</small>
              <strong>${note.kana}</strong>
              <em>${note.help}</em>
            </span>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderProgress() {
    const dom = elements();
    const total = state.deck.length || ROUND_SIZE;
    const current = state.completed ? total : state.deck.length ? state.index + 1 : 0;
    dom.progressCount.textContent = `${current} / ${total}`;
  }

  function renderControls() {
    const dom = elements();
    const hasTask = Boolean(currentTask()) && !state.completed;

    dom.startButton.textContent = state.deck.length ? "再スタート" : "スタート";
    dom.revealButton.disabled = !hasTask || state.revealed;
    dom.revealButton.hidden = state.revealed || state.completed;
    dom.hitButton.disabled = !hasTask;
    dom.missButton.disabled = !hasTask;

    if (state.completed) {
      dom.startButton.textContent = "もう一周";
    }
  }

  function renderStats() {
    const dom = elements();
    dom.statsBody.innerHTML = ROOTLESS_QUALITIES.map((quality) => {
      const row = state.stats[quality.id] || { attempts: 0, correct: 0 };
      const rate = row.attempts
        ? `${Math.round((row.correct / row.attempts) * 100)}%`
        : "-";

      return `
        <tr>
          <td><span class="key-label">${quality.label}</span></td>
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
    state.deck = createDeck();
    state.index = 0;
    state.revealed = false;
    state.completed = false;
    render();
    scrollPracticeIntoView();
  }

  function scrollPracticeIntoView() {
    const prefersReducedMotion = global.matchMedia
      && global.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = prefersReducedMotion
      ? "auto"
      : "smooth";

    global.requestAnimationFrame?.(() => {
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

    const row = state.stats[task.qualityId] || { attempts: 0, correct: 0 };
    row.attempts += 1;
    if (wasCorrect) row.correct += 1;
    state.stats[task.qualityId] = row;

    if (state.index >= state.deck.length - 1) {
      state.completed = true;
      state.revealed = false;
      global.JazzDailyProgress?.mark("rootless-9th");
    } else {
      state.index += 1;
      state.revealed = false;
    }

    saveState();
    render();
  }

  function boot() {
    const dom = elements();
    dom.startButton.addEventListener("click", startCycle);
    dom.revealButton.addEventListener("click", revealAnswer);
    dom.hitButton.addEventListener("click", () => markAnswer(true));
    dom.missButton.addEventListener("click", () => markAnswer(false));
    render();
  }

  const api = {
    ROOTLESS_QUALITIES,
    ROOTS,
    ROUND_SIZE,
    buildVoicing,
    createDeck,
    createFullDeck,
    kanaNote,
    parseRoot,
    spellPitch,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.Rootless9th = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
