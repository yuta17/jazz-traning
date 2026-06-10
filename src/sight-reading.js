(function attachSightReading(global) {
  "use strict";

  const STAFF = {
    width: 920,
    height: 400,
    startX: 112,
    endX: 872,
    barWidth: 190,
    lineGap: 12,
    trebleTop: 74,
    bassTop: 224,
  };

  const TREBLE_PITCHES = ["E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5"];
  const BASS_PITCHES = ["G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3"];

  const RHYTHM_PATTERNS = [
    [
      { d: 1, kind: "q" },
      { d: 1, kind: "q" },
      { d: 1, kind: "q" },
      { d: 1, kind: "q" },
    ],
    [
      { d: 0.5, kind: "8" },
      { d: 0.5, kind: "8" },
      { d: 1, kind: "q" },
      { d: 1.5, kind: "dq" },
      { d: 0.5, kind: "8" },
    ],
    [
      { d: 0.75, kind: "d8" },
      { d: 0.25, kind: "16" },
      { d: 0.5, kind: "8" },
      { d: 0.5, kind: "8" },
      { d: 1, kind: "q" },
      { d: 1, kind: "q" },
    ],
    [
      { d: 1.5, kind: "dq" },
      { d: 0.5, kind: "8" },
      { d: 0.25, kind: "16" },
      { d: 0.25, kind: "16" },
      { d: 0.25, kind: "16" },
      { d: 0.25, kind: "16" },
      { d: 1, kind: "q" },
    ],
    [
      { d: 2, kind: "h" },
      { d: 0.5, kind: "8" },
      { d: 0.5, kind: "8" },
      { d: 0.75, kind: "d8" },
      { d: 0.25, kind: "16" },
    ],
    [
      { d: 0.25, kind: "16" },
      { d: 0.25, kind: "16" },
      { d: 0.25, kind: "16" },
      { d: 0.25, kind: "16" },
      { d: 1, kind: "q" },
      { d: 0.5, kind: "8" },
      { d: 0.5, kind: "8" },
      { d: 1, kind: "q" },
    ],
    [
      { d: 3, kind: "dh" },
      { d: 0.5, kind: "8" },
      { d: 0.5, kind: "8" },
    ],
  ];

  const REQUIRED_PATTERN_INDEXES = [2, 3, 4, 6];

  const state = {
    exercise: null,
    selected: new Set(),
    checked: false,
  };

  function pitchIndex(pitch) {
    const match = pitch.match(/^([A-G])([0-9])$/);
    const note = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 }[match[1]];
    return Number(match[2]) * 7 + note;
  }

  function pitchY(staff, pitch) {
    const bottomY = staff === "treble"
      ? STAFF.trebleTop + STAFF.lineGap * 4
      : STAFF.bassTop + STAFF.lineGap * 4;
    const reference = staff === "treble" ? "E4" : "G2";
    return bottomY - (pitchIndex(pitch) - pitchIndex(reference)) * (STAFF.lineGap / 2);
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function createPatternPlan() {
    const randomIndexes = Array.from({ length: 4 }, () => Math.floor(Math.random() * RHYTHM_PATTERNS.length));
    return shuffle([...REQUIRED_PATTERN_INDEXES, ...randomIndexes]);
  }

  function createExercise() {
    const events = [];
    const restCandidates = [];
    const patternPlan = createPatternPlan();
    let slot = 0;

    ["treble", "bass"].forEach((staff) => {
      for (let measure = 0; measure < 4; measure += 1) {
        const pattern = RHYTHM_PATTERNS[patternPlan[slot]];
        let beat = 0;
        pattern.forEach((item, index) => {
          const canRest = index > 0;
          const rest = canRest && Math.random() < 0.26;
          const pitches = staff === "treble" ? TREBLE_PITCHES : BASS_PITCHES;
          const event = {
            id: `${staff}-${measure}-${index}`,
            staff,
            measure,
            beat,
            duration: item.d,
            kind: item.kind,
            rest,
            pitch: randomItem(pitches),
          };
          events.push(event);
          if (canRest) restCandidates.push(event);
          beat += item.d;
        });
        slot += 1;
      }
    });

    if (!events.some((event) => event.rest) && restCandidates.length > 0) {
      randomItem(restCandidates).rest = true;
    }

    return { events };
  }

  function isBeatStart(event) {
    return Number.isInteger(event.beat) && event.beat >= 0 && event.beat < 4;
  }

  function beatNumber(event) {
    return String(event.beat + 1);
  }

  function eventX(event) {
    const barStart = STAFF.startX + event.measure * STAFF.barWidth;
    const beatWidth = STAFF.barWidth / 4;
    return barStart + event.beat * beatWidth + 16;
  }

  function staffTop(staff) {
    return staff === "treble" ? STAFF.trebleTop : STAFF.bassTop;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function drawStaff(top, clef) {
    const lines = [];
    for (let i = 0; i < 5; i += 1) {
      const y = top + i * STAFF.lineGap;
      lines.push(`<line x1="${STAFF.startX}" y1="${y}" x2="${STAFF.endX}" y2="${y}" />`);
    }

    for (let i = 0; i <= 4; i += 1) {
      const x = STAFF.startX + i * STAFF.barWidth;
      lines.push(`<line class="bar-line" x1="${x}" y1="${top}" x2="${x}" y2="${top + STAFF.lineGap * 4}" />`);
    }

    return `
      <g class="staff-lines">
        ${lines.join("")}
      </g>
      <text class="staff-clef ${clef === "𝄢" ? "bass-clef" : ""}" x="36" y="${top + 42}">${clef}</text>
    `;
  }

  function drawBeatGuides() {
    if (!state.checked) return "";

    const parts = [];
    for (let measure = 0; measure < 4; measure += 1) {
      for (let beat = 0; beat < 4; beat += 1) {
        const x = STAFF.startX + measure * STAFF.barWidth + beat * (STAFF.barWidth / 4) + 16;
        parts.push(`
          <line class="beat-guide" x1="${x}" y1="54" x2="${x}" y2="328" />
          <text class="beat-label" x="${x}" y="350">${beat + 1}</text>
        `);
      }
    }
    return parts.join("");
  }

  function drawNote(event, statusClass) {
    const x = eventX(event);
    const y = pitchY(event.staff, event.pitch);
    const openHead = event.duration >= 2;
    const stemHeight = 38;
    const flagCount = event.duration <= 0.25 ? 2 : event.duration <= 0.75 ? 1 : 0;
    const dotted = event.kind.startsWith("d");
    const ledgerLines = [];

    const top = staffTop(event.staff);
    const bottom = top + STAFF.lineGap * 4;
    if (y < top) {
      for (let ly = top - STAFF.lineGap; ly >= y - 1; ly -= STAFF.lineGap) {
        ledgerLines.push(`<line class="ledger-line" x1="${x - 13}" y1="${ly}" x2="${x + 13}" y2="${ly}" />`);
      }
    }
    if (y > bottom) {
      for (let ly = bottom + STAFF.lineGap; ly <= y + 1; ly += STAFF.lineGap) {
        ledgerLines.push(`<line class="ledger-line" x1="${x - 13}" y1="${ly}" x2="${x + 13}" y2="${ly}" />`);
      }
    }

    const flags = [];
    for (let i = 0; i < flagCount; i += 1) {
      const fy = y - stemHeight + i * 9;
      flags.push(`<path class="note-stem" d="M ${x + 8} ${fy} C ${x + 28} ${fy + 5}, ${x + 25} ${fy + 15}, ${x + 10} ${fy + 17}" />`);
    }

    return `
      <g class="score-event ${statusClass}" data-event="${event.id}">
        <rect class="event-hitbox" x="${x - 22}" y="${y - 48}" width="54" height="86" />
        ${ledgerLines.join("")}
        <ellipse class="note-head ${openHead ? "open" : ""}" cx="${x}" cy="${y}" rx="9" ry="6" transform="rotate(-18 ${x} ${y})" />
        ${event.duration < 4 ? `<line class="note-stem" x1="${x + 8}" y1="${y}" x2="${x + 8}" y2="${y - stemHeight}" />` : ""}
        ${flags.join("")}
        ${dotted ? `<circle class="rhythm-dot" cx="${x + 20}" cy="${y - 1}" r="2.6" />` : ""}
        ${state.checked && isBeatStart(event) ? `<text class="event-beat-badge" x="${x}" y="${y - 22}">${beatNumber(event)}</text>` : ""}
      </g>
    `;
  }

  function drawRest(event, statusClass) {
    const x = eventX(event);
    const y = staffTop(event.staff) + STAFF.lineGap * 2;
    const dotted = event.kind.startsWith("d");
    const flagCount = event.duration <= 0.25 ? 2 : event.duration <= 0.75 ? 1 : 0;
    let shape = "";

    if (event.duration >= 2) {
      shape = `<rect class="rest-shape" x="${x - 11}" y="${y - 8}" width="22" height="7" />`;
    } else if (event.duration >= 1) {
      shape = `<path class="rest-shape path" d="M ${x - 4} ${y - 26} L ${x + 8} ${y - 13} L ${x - 4} ${y - 1} L ${x + 7} ${y + 12}" />`;
    } else {
      const flags = [];
      for (let i = 0; i < flagCount; i += 1) {
        const fy = y - 22 + i * 9;
        flags.push(`<path class="rest-shape path" d="M ${x} ${fy} C ${x + 15} ${fy + 2}, ${x + 14} ${fy + 14}, ${x + 1} ${fy + 15}" />`);
      }
      shape = `
        <line class="rest-shape path" x1="${x}" y1="${y - 24}" x2="${x}" y2="${y + 18}" />
        ${flags.join("")}
      `;
    }

    return `
      <g class="score-event ${statusClass}" data-event="${event.id}">
        <rect class="event-hitbox" x="${x - 24}" y="${y - 46}" width="54" height="82" />
        ${shape}
        ${dotted ? `<circle class="rhythm-dot" cx="${x + 20}" cy="${y - 1}" r="2.6" />` : ""}
        ${state.checked && isBeatStart(event) ? `<text class="event-beat-badge" x="${x}" y="${y - 28}">${beatNumber(event)}</text>` : ""}
      </g>
    `;
  }

  function statusClass(event) {
    const selected = state.selected.has(event.id);
    const target = isBeatStart(event);

    if (!state.checked) return selected ? "selected" : "";
    if (selected && target) return "correct-start";
    if (selected && !target) return "wrong-start";
    if (!selected && target) return "missed-start";
    return "";
  }

  function renderScore() {
    const events = state.exercise.events.map((event) => {
      const cls = statusClass(event);
      return event.rest ? drawRest(event, cls) : drawNote(event, cls);
    });

    return `
      <svg class="reading-svg" viewBox="0 0 ${STAFF.width} ${STAFF.height}" role="img" aria-label="4小節の大譜表">
        <rect class="score-paper" x="0" y="0" width="${STAFF.width}" height="${STAFF.height}" />
        ${drawBeatGuides()}
        ${drawStaff(STAFF.trebleTop, "𝄞")}
        ${drawStaff(STAFF.bassTop, "𝄢")}
        <text class="time-signature" x="82" y="${STAFF.trebleTop + 27}">4</text>
        <text class="time-signature" x="82" y="${STAFF.trebleTop + 51}">4</text>
        <text class="time-signature" x="82" y="${STAFF.bassTop + 27}">4</text>
        <text class="time-signature" x="82" y="${STAFF.bassTop + 51}">4</text>
        <line class="brace-line" x1="18" y1="${STAFF.trebleTop}" x2="18" y2="${STAFF.bassTop + STAFF.lineGap * 4}" />
        ${events.join("")}
      </svg>
    `;
  }

  function renderResult() {
    const result = document.querySelector("#reading-result");
    if (!state.checked) {
      result.innerHTML = "<span>READY</span><strong>-</strong>";
      return;
    }

    const targets = state.exercise.events.filter(isBeatStart);
    const selected = state.exercise.events.filter((event) => state.selected.has(event.id));
    const correct = selected.filter(isBeatStart).length;
    const extra = selected.filter((event) => !isBeatStart(event)).length;
    const missed = targets.filter((event) => !state.selected.has(event.id)).length;

    result.innerHTML = `
      <span>RESULT</span>
      <strong>正解 ${correct}/${targets.length}</strong>
      <em>ミス ${extra + missed}</em>
    `;
  }

  function render() {
    const score = document.querySelector("#reading-score");
    score.innerHTML = renderScore();
    document.querySelector("#reading-check").disabled = state.checked;
    document.querySelector("#reading-clear").disabled = state.selected.size === 0 && !state.checked;
    renderResult();
  }

  function newExercise() {
    state.exercise = createExercise();
    state.selected.clear();
    state.checked = false;
    render();
  }

  function clearSelection() {
    state.selected.clear();
    state.checked = false;
    render();
  }

  function checkAnswer() {
    state.checked = true;
    render();
  }

  function toggleEvent(id) {
    if (state.checked) return;
    if (state.selected.has(id)) {
      state.selected.delete(id);
    } else {
      state.selected.add(id);
    }
    render();
  }

  function boot() {
    document.querySelector("#reading-new").addEventListener("click", newExercise);
    document.querySelector("#reading-clear").addEventListener("click", clearSelection);
    document.querySelector("#reading-check").addEventListener("click", checkAnswer);
    document.querySelector("#reading-score").addEventListener("click", (event) => {
      const target = event.target.closest("[data-event]");
      if (!target) return;
      toggleEvent(target.dataset.event);
    });
    newExercise();
  }

  const api = {
    BASS_PITCHES,
    RHYTHM_PATTERNS,
    TREBLE_PITCHES,
    createExercise,
    isBeatStart,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.SightReading = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
