(function attachChordFlash(global) {
  "use strict";

  const LIMIT_SECONDS = 5;
  const ROUND_SIZE = 24;
  const STORAGE_KEY = "jazz-chord-flash-state-v1";

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
  const PRACTICAL_NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
  const SIMPLE_ACCIDENTAL_BLACKLIST = new Set(["C♭", "F♭", "B♯", "E♯"]);

  const ROOT_LABELS = {
    flat: ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"],
    minor: ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"],
  };

  const VOICINGS = [
    {
      id: "root",
      label: "Root",
      noteOrder: [0, 1, 2, 3],
    },
    {
      id: "second",
      label: "2nd",
      noteOrder: [2, 3, 0, 1],
    },
  ];

  const CHORD_FORMS = [
    {
      id: "basic",
      extensionLabel: "",
    },
    {
      id: "rootless9",
      extensionLabel: "9th",
    },
  ];

  const ROOTLESS_NINTH_DEGREES = [2, 4, 6, 1];

  const CHORD_QUALITIES = [
    {
      id: "maj7",
      label: "△7",
      suffix: "△7",
      roots: ROOT_LABELS.flat,
      degrees: [0, 2, 4, 6],
      intervals: [0, 4, 7, 11],
    },
    {
      id: "m7",
      label: "m7",
      suffix: "m7",
      roots: ROOT_LABELS.minor,
      degrees: [0, 2, 4, 6],
      intervals: [0, 3, 7, 10],
    },
    {
      id: "7",
      label: "7",
      suffix: "7",
      roots: ROOT_LABELS.flat,
      degrees: [0, 2, 4, 6],
      intervals: [0, 4, 7, 10],
    },
    {
      id: "m7b5",
      label: "m7♭5",
      suffix: "m7♭5",
      roots: ROOT_LABELS.minor,
      degrees: [0, 2, 4, 6],
      intervals: [0, 3, 6, 10],
    },
    {
      id: "dim7",
      label: "dim7",
      suffix: "dim7",
      roots: ROOT_LABELS.minor,
      degrees: [0, 2, 4, 6],
      intervals: [0, 3, 6, 9],
    },
  ];

  const state = {
    stats: loadStats(),
    deck: [],
    index: 0,
    revealed: false,
    completed: false,
    timeLeft: LIMIT_SECONDS,
    timerId: null,
    deadline: 0,
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
    if (degreeOffset === 0) return root.label;

    const letter = LETTERS[(root.letterIndex + degreeOffset) % LETTERS.length];
    const targetPitch = normalizePitch(root.pitchClass + interval);
    const delta = accidentalDelta(NATURAL_PITCH[letter], targetPitch);

    if (Math.abs(delta) > 1) return practicalName(targetPitch);

    const accidental = delta === 1 ? "♯" : delta === -1 ? "♭" : "";
    const spelled = `${letter}${accidental}`;
    return SIMPLE_ACCIDENTAL_BLACKLIST.has(spelled) ? practicalName(targetPitch) : spelled;
  }

  function supportsForm(quality, form) {
    return form.id === "basic" || quality.id !== "dim7";
  }

  function allowedVoicings(quality, form = CHORD_FORMS[0]) {
    if (quality.id === "dim7") return [VOICINGS[0]];
    if (quality.id === "m7b5") {
      return [
        { id: "third", label: "3から", noteOrder: form.id === "rootless9" ? [0, 1, 2, 3] : [1, 2, 3, 0] },
        { id: "seventh", label: "7から", noteOrder: form.id === "rootless9" ? [2, 3, 0, 1] : [3, 0, 1, 2] },
        { id: "unlabeled", label: "", noteOrder: [0, 1, 2, 3] },
      ];
    }
    return VOICINGS;
  }

  function chordFormsForQuality(quality) {
    return CHORD_FORMS.filter((form) => supportsForm(quality, form));
  }

  function questionPlans() {
    return CHORD_QUALITIES.flatMap((quality) => (
      chordFormsForQuality(quality).flatMap((form) => (
        allowedVoicings(quality, form).map((voicing) => ({ quality, form, voicing }))
      ))
    ));
  }

  function noteSetForQuality(quality, form) {
    if (form.id === "rootless9") {
      return {
        degrees: ROOTLESS_NINTH_DEGREES,
        intervals: quality.intervals.slice(1).concat(14),
      };
    }

    return {
      degrees: quality.degrees,
      intervals: quality.intervals,
    };
  }

  function buildChord(rootLabel, quality, voicing = VOICINGS[0], form = CHORD_FORMS[0]) {
    const activeForm = supportsForm(quality, form) ? form : CHORD_FORMS[0];
    const voicings = allowedVoicings(quality, activeForm);
    const activeVoicing = voicings.find((item) => item.id === voicing.id)
      || voicings.find((item) => item.id === "unlabeled")
      || voicings[0];
    const root = parseRoot(rootLabel);
    const noteSet = noteSetForQuality(quality, activeForm);
    const rootPositionNotes = noteSet.intervals.map((interval, index) => (
      spellPitch(root, noteSet.degrees[index], interval)
    ));
    const notes = activeVoicing.noteOrder.map((noteIndex) => rootPositionNotes[noteIndex]);
    const suffix = activeForm.id === "basic" ? "" : `-${activeForm.id}`;

    return {
      id: `${root.label}-${quality.id}-${activeVoicing.id}${suffix}`,
      label: `${root.label}${quality.suffix}`,
      notes,
      root: root.label,
      formId: activeForm.id,
      extensionLabel: activeForm.extensionLabel,
      qualityId: quality.id,
      qualityLabel: quality.label,
      voicingId: activeVoicing.id,
      voicingLabel: activeVoicing.label,
    };
  }

  function createFullDeck() {
    return CHORD_QUALITIES.flatMap((quality) => (
      quality.roots.flatMap((root) => (
        chordFormsForQuality(quality).flatMap((form) => (
          allowedVoicings(quality, form).map((voicing) => buildChord(root, quality, voicing, form))
        ))
      ))
    ));
  }

  function createDeck(ninth = false) {
    const form = CHORD_FORMS[ninth ? 1 : 0];
    const qualities = CHORD_QUALITIES.filter((quality) => supportsForm(quality, form));
    const pools = new Map(qualities.map((quality) => [quality.id, shuffle(quality.roots)]));
    const chords = [];
    while (chords.length < ROUND_SIZE) {
      for (const quality of shuffle(qualities)) {
        if (chords.length === ROUND_SIZE) break;
        const voicing = shuffle(allowedVoicings(quality, form))[0];
        chords.push(buildChord(pools.get(quality.id).pop(), quality, voicing, form));
      }
    }
    return shuffle(chords);
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
      ninthCheckbox: document.querySelector("#chord-ninth-checkbox"),
      startButton: document.querySelector("#chord-start-button"),
      progressCount: document.querySelector("#chord-progress-count"),
      questionPanel: document.querySelector("#chord-question-panel"),
      revealButton: document.querySelector("#chord-reveal-button"),
      hitButton: document.querySelector("#chord-hit-button"),
      missButton: document.querySelector("#chord-miss-button"),
      statsBody: document.querySelector("#chord-stats-body"),
      timerBar: document.querySelector("#chord-timer-bar"),
      timeLeft: document.querySelector("#chord-time-left"),
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
      const extensionLabel = task.extensionLabel
        ? `<span class="voicing-pill voicing-pill-extension">${task.extensionLabel}</span>`
        : "";
      dom.questionPanel.innerHTML = `
        <div class="question-state">
          <div class="voicing-labels">
            ${task.voicingLabel ? `<span class="voicing-pill">${task.voicingLabel}</span>` : ""}
            ${extensionLabel}
          </div>
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
        <div class="chord-note-list">
          ${task.notes.map((note) => `<span class="chord-note">${note}</span>`).join("")}
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

  function renderTimer() {
    const dom = elements();
    const percent = Math.max(0, Math.min(100, (state.timeLeft / LIMIT_SECONDS) * 100));
    dom.timeLeft.textContent = state.deck.length && !state.completed
      ? state.timeLeft.toFixed(1)
      : LIMIT_SECONDS.toFixed(1);
    dom.timerBar.style.width = `${percent}%`;
    dom.timerBar.dataset.low = percent <= 25 ? "true" : "false";
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
    dom.statsBody.innerHTML = CHORD_QUALITIES.map((quality) => {
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
    renderTimer();
    renderControls();
    renderStats();
  }

  function startTimer() {
    stopTimer();
    state.timeLeft = LIMIT_SECONDS;
    state.deadline = Date.now() + LIMIT_SECONDS * 1000;
    renderTimer();
    state.timerId = global.setInterval(() => {
      state.timeLeft = Math.max(0, (state.deadline - Date.now()) / 1000);
      renderTimer();
      if (state.timeLeft <= 0) stopTimer();
    }, 80);
  }

  function stopTimer() {
    if (!state.timerId) return;
    global.clearInterval(state.timerId);
    state.timerId = null;
  }

  function startCycle() {
    stopTimer();
    state.deck = createDeck(elements().ninthCheckbox.checked);
    state.index = 0;
    state.revealed = false;
    state.completed = false;
    state.timeLeft = LIMIT_SECONDS;
    render();
    startTimer();
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
    stopTimer();
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
      stopTimer();
      global.JazzDailyProgress?.mark("chord-flash");
    } else {
      state.index += 1;
      state.revealed = false;
      state.timeLeft = LIMIT_SECONDS;
    }

    saveState();
    render();
    if (!state.completed) startTimer();
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
    CHORD_FORMS,
    CHORD_QUALITIES,
    LIMIT_SECONDS,
    ROUND_SIZE,
    VOICINGS,
    allowedVoicings,
    buildChord,
    createDeck,
    createFullDeck,
    questionPlans,
    parseRoot,
    spellPitch,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.ChordFlash = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
