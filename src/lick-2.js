(function attachLick2(global) {
  "use strict";

  const ROUND_SIZE = 12;
  const TRAINING_ID = "lick-2";
  const REST_LABEL = "休";
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
  const PITCH_NAMES = ["C", "D♭", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
  const MAJOR_KEYS = [
    { id: "C", label: "C", pitch: 0 },
    { id: "F", label: "F", pitch: 5 },
    { id: "Bb", label: "B♭", pitch: 10 },
    { id: "Eb", label: "E♭", pitch: 3 },
    { id: "Ab", label: "A♭", pitch: 8 },
    { id: "Db", label: "D♭", pitch: 1 },
    { id: "Gb", label: "G♭", pitch: 6 },
    { id: "B", label: "B", pitch: 11 },
    { id: "E", label: "E", pitch: 4 },
    { id: "A", label: "A", pitch: 9 },
    { id: "D", label: "D", pitch: 2 },
    { id: "G", label: "G", pitch: 7 },
  ];

  const LICK_SEGMENTS = [
    {
      id: "ii",
      degree: "II-7",
      suffix: "-7",
      rootOffset: 2,
      rootLetterOffset: 1,
      intervals: [5, 4, 3, null, 7, 6, 7],
      noteLetterOffsets: [3, 2, 2, null, 4, 3, 4],
      degreeLabels: ["半", "半", "3", REST_LABEL, "5", "半", "5"],
    },
    {
      id: "v",
      degree: "V7",
      suffix: "7",
      rootOffset: 7,
      rootLetterOffset: 4,
      intervals: [9, 5, 7, 8, 3, 1, 0, 10],
      noteLetterOffsets: [5, 3, 4, 5, 2, 0, 0, 6],
      degreeLabels: ["13", "11", "5", "♭13", "♯9", "♭9", "1", "7"],
    },
    {
      id: "i",
      degree: "Imaj7",
      suffix: "maj7",
      rootOffset: 0,
      rootLetterOffset: 0,
      intervals: [4],
      noteLetterOffsets: [2],
      degreeLabels: ["3"],
    },
  ];

  const state = {
    deck: [],
    index: 0,
    completed: false,
  };

  function normalizePitch(value) {
    return ((value % 12) + 12) % 12;
  }

  function pitchName(pitchClass) {
    return PITCH_NAMES[normalizePitch(pitchClass)];
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

  function spellPitch(root, letterOffset, interval) {
    const letter = LETTERS[(root.letterIndex + letterOffset) % LETTERS.length];
    const targetPitch = normalizePitch(root.pitchClass + interval);
    const delta = accidentalDelta(NATURAL_PITCH[letter], targetPitch);

    if (Math.abs(delta) > 1) return pitchName(targetPitch);

    const accidental = delta > 0 ? "♯".repeat(delta) : delta < 0 ? "♭".repeat(Math.abs(delta)) : "";
    return `${letter}${accidental}`;
  }

  function chordRoot(key, segment) {
    return spellPitch(parseRoot(key.label), segment.rootLetterOffset, segment.rootOffset);
  }

  function chordName(key, segment) {
    return `${chordRoot(key, segment)}${segment.suffix}`;
  }

  function segmentNotes(key, segment) {
    const root = parseRoot(chordRoot(key, segment));
    return segment.intervals.map((interval, index) => {
      if (interval === null) return REST_LABEL;
      return spellPitch(root, segment.noteLetterOffsets[index], interval);
    });
  }

  function buildTask(key) {
    const segments = LICK_SEGMENTS.map((segment) => ({
      ...segment,
      chord: chordName(key, segment),
      notes: segmentNotes(key, segment),
    }));

    return {
      id: key.id,
      key: key.label,
      progression: segments.map((segment) => segment.chord).join(" → "),
      segments,
    };
  }

  function shuffle(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function createDeck() {
    return shuffle(MAJOR_KEYS).map(buildTask);
  }

  function currentTask() {
    return state.deck[state.index] || null;
  }

  function elements() {
    return {
      startButton: document.querySelector("#lick-start-button"),
      progressCount: document.querySelector("#lick-progress-count"),
      questionPanel: document.querySelector("#lick-question-panel"),
      hitButton: document.querySelector("#lick-hit-button"),
    };
  }

  function renderNotePairs(segment) {
    return segment.notes.map((note, index) => {
      const label = segment.degreeLabels[index] || "&nbsp;";
      return `
        <span class="lick-note-pair">
          <span class="lick-degree-label">${label}</span>
          <span class="lick-note-label">${note}</span>
        </span>
      `;
    }).join("");
  }

  function renderQuestion() {
    const dom = elements();
    const task = currentTask();

    if (state.completed) {
      dom.questionPanel.innerHTML = `
        <div class="complete-state">
          <p>一周</p>
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

    dom.questionPanel.innerHTML = `
      <div class="lick-task">
        <div class="lick-key-block">
          <span>キー</span>
          <strong>${task.key}</strong>
          <p>${task.progression}</p>
        </div>
        <div class="lick-degree-grid">
          ${task.segments.map((segment) => `
            <div class="lick-degree-card">
              <div class="lick-degree-header">
                <span>${segment.degree}</span>
                <strong>${segment.chord}</strong>
              </div>
              <div class="lick-note-pairs">${renderNotePairs(segment)}</div>
            </div>
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
    dom.hitButton.disabled = !hasTask;

    if (state.completed) {
      dom.startButton.textContent = "もう一周";
    }
  }

  function render() {
    renderQuestion();
    renderProgress();
    renderControls();
  }

  function scrollPracticeIntoView() {
    const behavior = global.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    global.requestAnimationFrame?.(() => {
      document.querySelector(".practice").scrollIntoView({
        behavior,
        block: "start",
      });
    });
  }

  function startCycle() {
    state.deck = createDeck();
    state.index = 0;
    state.completed = false;
    render();
    scrollPracticeIntoView();
  }

  function markDone() {
    if (!currentTask()) return;

    if (state.index >= state.deck.length - 1) {
      state.completed = true;
      global.JazzDailyProgress?.mark(TRAINING_ID);
    } else {
      state.index += 1;
    }

    render();
  }

  function boot() {
    const dom = elements();
    dom.startButton.addEventListener("click", startCycle);
    dom.hitButton.addEventListener("click", markDone);
    render();
  }

  const api = {
    LICK_SEGMENTS,
    MAJOR_KEYS,
    PITCH_NAMES,
    REST_LABEL,
    ROUND_SIZE,
    buildTask,
    chordRoot,
    chordName,
    createDeck,
    parseRoot,
    segmentNotes,
    spellPitch,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.Lick2 = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
