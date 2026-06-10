(function attachSightReading(global) {
  "use strict";

  const SCORE = {
    width: 1040,
    height: 392,
    x: 28,
    firstMeasureWidth: 282,
    measureWidth: 238,
    trebleY: 62,
    bassY: 216,
    guideTop: 76,
    guideBottom: 326,
    labelY: 364,
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

  function statusClass(event) {
    const selected = state.selected.has(event.id);
    const target = isBeatStart(event);

    if (!state.checked) return selected ? "selected" : "";
    if (selected && target) return "correct-start";
    if (selected && !target) return "wrong-start";
    if (!selected && target) return "missed-start";
    return "";
  }

  function measureX(measure) {
    if (measure === 0) return SCORE.x;
    return SCORE.x + SCORE.firstMeasureWidth + (measure - 1) * SCORE.measureWidth;
  }

  function measureWidth(measure) {
    return measure === 0 ? SCORE.firstMeasureWidth : SCORE.measureWidth;
  }

  function eventDuration(event) {
    const dotted = event.kind.startsWith("d");
    const base = dotted ? event.kind.slice(1) : event.kind;
    return `${base}${dotted ? "d" : ""}${event.rest ? "r" : ""}`;
  }

  function eventKey(event) {
    if (event.rest) return event.staff === "treble" ? "b/4" : "d/3";
    return event.pitch.replace(/^([A-G])([0-9])$/, (_, note, octave) => `${note.toLowerCase()}/${octave}`);
  }

  function getVexFlow() {
    return global.VexFlow || global.VF;
  }

  function createSvgElement(tagName, attributes = {}) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, value);
    });
    return element;
  }

  function getBoxValue(box, getter, key) {
    if (!box) return 0;
    if (typeof box[getter] === "function") return box[getter]();
    return box[key] || 0;
  }

  function noteBounds(note, event) {
    const box = typeof note.getBoundingBox === "function" ? note.getBoundingBox() : null;
    const boxY = getBoxValue(box, "getY", "y");
    const boxHeight = getBoxValue(box, "getH", "h");
    const ys = typeof note.getYs === "function" ? note.getYs() : [];
    const centerX = note.getAbsoluteX();
    const centerY = ys.length > 0 ? ys[0] : boxY + boxHeight / 2;
    const width = event.duration >= 1.5 ? 58 : 48;
    const height = event.rest ? 54 : 70;
    return {
      centerX,
      centerY,
      x: centerX - width / 2,
      y: centerY - height / 2,
      width,
      height,
    };
  }

  function drawConnectors(VF, context, trebleStave, bassStave, measure) {
    if (measure !== 0) return;

    [
      VF.StaveConnector.type.BRACE,
      VF.StaveConnector.type.SINGLE_LEFT,
    ].forEach((type) => {
      new VF.StaveConnector(trebleStave, bassStave)
        .setType(type)
        .setContext(context)
        .draw();
    });
  }

  function drawBeams(VF, context, notes, events) {
    let group = [];
    const flush = () => {
      if (group.length > 1) {
        VF.Beam.generateBeams(group).forEach((beam) => {
          beam.setContext(context).draw();
        });
      }
      group = [];
    };

    notes.forEach((note, index) => {
      if (!events[index].rest && events[index].duration < 1) {
        group.push(note);
      } else {
        flush();
      }
    });
    flush();
  }

  function drawOverlay(svg, noteRecords) {
    const guideLayer = createSvgElement("g", { class: "reading-guide-layer" });
    const eventLayer = createSvgElement("g", { class: "reading-hit-layer" });

    if (state.checked) {
      for (let measure = 0; measure < 4; measure += 1) {
        for (let beat = 0; beat < 4; beat += 1) {
          const leftPadding = measure === 0 ? 112 : 24;
          const usableWidth = measureWidth(measure) - leftPadding - 18;
          const x = measureX(measure) + leftPadding + (usableWidth * beat) / 4;
          guideLayer.appendChild(createSvgElement("line", {
            class: "beat-guide",
            x1: x,
            y1: SCORE.guideTop,
            x2: x,
            y2: SCORE.guideBottom,
          }));
          const label = createSvgElement("text", {
            class: "beat-label",
            x,
            y: SCORE.labelY,
          });
          label.textContent = String(beat + 1);
          guideLayer.appendChild(label);
        }
      }
    }

    noteRecords.forEach(({ event, note }) => {
      const bounds = noteBounds(note, event);
      const status = statusClass(event);
      const group = createSvgElement("g", {
        class: `score-event ${status}`.trim(),
        "data-event": event.id,
      });
      group.appendChild(createSvgElement("rect", {
        class: "event-hitbox",
        x: bounds.x - 16,
        y: bounds.y - 14,
        width: bounds.width + 36,
        height: bounds.height + 28,
      }));

      if (state.checked && isBeatStart(event)) {
        const badge = createSvgElement("text", {
          class: "event-beat-badge",
          x: bounds.centerX,
          y: bounds.y - 8,
        });
        badge.textContent = beatNumber(event);
        group.appendChild(badge);
      }

      eventLayer.appendChild(group);
    });

    svg.appendChild(guideLayer);
    svg.appendChild(eventLayer);
  }

  function drawScore(container) {
    const VF = getVexFlow();
    if (!VF) {
      container.innerHTML = '<p class="score-error">譜面ライブラリを読み込めませんでした。</p>';
      return;
    }

    container.innerHTML = '<div class="reading-vex-score"></div>';
    const target = container.querySelector(".reading-vex-score");
    const renderer = new VF.Renderer(target, VF.Renderer.Backends.SVG);
    renderer.resize(SCORE.width, SCORE.height);

    const context = renderer.getContext();
    const noteRecords = [];

    for (let measure = 0; measure < 4; measure += 1) {
      const x = measureX(measure);
      const width = measureWidth(measure);
      const trebleStave = new VF.Stave(x, SCORE.trebleY, width);
      const bassStave = new VF.Stave(x, SCORE.bassY, width);

      if (measure === 0) {
        trebleStave.addClef("treble").addTimeSignature("4/4");
        bassStave.addClef("bass").addTimeSignature("4/4");
      }

      trebleStave.setContext(context).draw();
      bassStave.setContext(context).draw();
      drawConnectors(VF, context, trebleStave, bassStave, measure);

      ["treble", "bass"].forEach((staff) => {
        const events = state.exercise.events.filter(
          (event) => event.staff === staff && event.measure === measure,
        );
        const notes = events.map((event) => new VF.StaveNote({
          clef: staff,
          keys: [eventKey(event)],
          duration: eventDuration(event),
        }));
        const voice = new VF.Voice({ num_beats: 4, beat_value: 4 }).addTickables(notes);
        const stave = staff === "treble" ? trebleStave : bassStave;
        new VF.Formatter().joinVoices([voice]).format([voice], width - (measure === 0 ? 92 : 36));
        voice.draw(context, stave);
        drawBeams(VF, context, notes, events);

        notes.forEach((note, index) => {
          const event = events[index];
          noteRecords.push({ event, note });
        });
      });
    }

    const svg = target.querySelector("svg");
    svg.classList.add("reading-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "4小節の大譜表");
    drawOverlay(svg, noteRecords);
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
    drawScore(score);
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
