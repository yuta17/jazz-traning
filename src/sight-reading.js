(function attachSightReading(global) {
  "use strict";

  const SCORE = {
    width: 1040,
    height: 392,
    x: 28,
    firstMeasureWidth: 304,
    measureWidth: 232,
    trebleY: 62,
    bassY: 216,
    guideTop: 76,
    guideBottom: 326,
    labelY: 364,
  };

  const DURATIONS = {
    16: 0.25,
    8: 0.5,
    d8: 0.75,
    q: 1,
    dq: 1.5,
    h: 2,
    dh: 3,
  };

  const SIGHT_READING_SAMPLES = [
    piece(
      "reading-sample-01",
      "課題 01",
      "C",
      [
        [note("q", "C5"), note("8", "D5"), note("8", "E5"), note("q", "F5"), note("q", "E5")],
        [note("d8", "D5"), note("16", "E5"), note("8", "F5"), note("8", "E5"), note("q", "D5"), note("q", "C5")],
        [note("q", "G4"), note("q", "A4"), note("d8", "B4"), note("16", "C5"), note("q", "D5")],
        [note("h", "E5"), note("q", "D5"), note("q", "C5")],
      ],
      [
        [note("h", "C3"), note("h", "G2")],
        [note("q", "F2"), note("q", "C3"), rest("q"), note("q", "G2")],
        [note("q", "A2"), note("q", "E3"), note("h", "F3")],
        [note("h", "G2"), note("h", "C3")],
      ],
    ),
    piece(
      "reading-sample-02",
      "課題 02",
      "G",
      [
        [note("q", "G4"), note("8", "A4"), note("8", "B4"), note("q", "D5"), note("q", "B4")],
        [note("d8", "C5"), note("16", "B4"), note("8", "A4"), note("8", "G4"), note("q", "A4"), note("q", "B4")],
        [note("q", "D5"), note("q", "E5"), note("16", "F5"), note("16", "E5"), note("16", "D5"), note("16", "C5"), note("q", "B4")],
        [note("h", "A4"), note("q", "B4"), note("q", "G4")],
      ],
      [
        [note("h", "G2"), note("h", "D3")],
        [note("q", "C3"), note("q", "G2"), rest("q"), note("q", "D3")],
        [note("q", "E3"), note("q", "B2"), note("h", "C3")],
        [note("h", "D3"), note("h", "G2")],
      ],
    ),
    piece(
      "reading-sample-03",
      "課題 03",
      "F",
      [
        [note("q", "F4"), note("8", "A4"), note("8", "C5"), note("q", "D5"), note("q", "C5")],
        [note("d8", "B4"), note("16", "C5"), note("8", "D5"), note("8", "C5"), note("q", "A4"), note("q", "F4")],
        [note("q", "G4"), note("q", "A4"), note("16", "B4"), note("16", "A4"), note("16", "G4"), note("16", "F4"), note("q", "E4")],
        [note("h", "F4"), note("q", "G4"), note("q", "F4")],
      ],
      [
        [note("h", "F2"), note("h", "C3")],
        [note("q", "B2"), note("q", "F3"), rest("q"), note("q", "C3")],
        [note("q", "D3"), note("q", "A2"), note("h", "B2")],
        [note("h", "C3"), note("h", "F2")],
      ],
    ),
    piece(
      "reading-sample-04",
      "課題 04",
      "D",
      [
        [note("q", "D5"), note("8", "E5"), note("8", "F5"), note("q", "A4"), note("q", "B4")],
        [note("d8", "A4"), note("16", "B4"), note("q", "D5"), note("8", "C5"), note("8", "B4"), note("q", "A4")],
        [note("q", "F5"), note("q", "E5"), note("16", "D5"), note("16", "C5"), note("16", "B4"), note("16", "A4"), note("q", "B4")],
        [note("h", "A4"), note("q", "F5"), note("q", "D5")],
      ],
      [
        [note("h", "D3"), note("h", "A2")],
        [note("q", "G2"), note("q", "D3"), rest("q"), note("q", "A2")],
        [note("q", "B2"), note("q", "F3"), note("h", "G3")],
        [note("h", "A2"), note("h", "D3")],
      ],
    ),
    piece(
      "reading-sample-05",
      "課題 05",
      "Bb",
      [
        [note("q", "B4"), note("8", "C5"), note("8", "D5"), note("q", "F5"), note("q", "D5")],
        [note("d8", "E5"), note("16", "D5"), note("8", "C5"), note("8", "B4"), note("q", "C5"), note("q", "D5")],
        [note("q", "F4"), note("q", "G4"), note("16", "A4"), note("16", "B4"), note("16", "C5"), note("16", "D5"), note("q", "C5")],
        [note("h", "D5"), note("q", "C5"), note("q", "B4")],
      ],
      [
        [note("h", "B2"), note("h", "F2")],
        [note("q", "E3"), note("q", "B2"), rest("q"), note("q", "F2")],
        [note("q", "G2"), note("q", "D3"), note("h", "E3")],
        [note("h", "F2"), note("h", "B2")],
      ],
    ),
    piece(
      "reading-sample-06",
      "課題 06",
      "Eb",
      [
        [note("q", "E4"), note("8", "G4"), note("8", "B4"), note("q", "C5"), note("q", "B4")],
        [note("d8", "A4"), note("16", "B4"), note("8", "C5"), note("8", "B4"), note("q", "G4"), note("q", "E4")],
        [note("q", "G4"), note("q", "B4"), note("16", "C5"), note("16", "B4"), note("16", "A4"), note("16", "G4"), note("q", "F4")],
        [note("h", "E4"), note("q", "F4"), note("q", "E4")],
      ],
      [
        [note("h", "E2"), note("h", "B2")],
        [note("q", "A2"), note("q", "E3"), rest("q"), note("q", "B2")],
        [note("q", "C3"), note("q", "G2"), note("h", "A2")],
        [note("h", "B2"), note("h", "E3")],
      ],
    ),
    piece(
      "reading-sample-07",
      "課題 07",
      "A",
      [
        [note("q", "A4"), note("8", "B4"), note("8", "C5"), note("q", "E5"), note("q", "C5")],
        [note("d8", "D5"), note("16", "E5"), note("8", "F5"), note("8", "E5"), note("q", "C5"), note("q", "A4")],
        [note("q", "B4"), note("q", "C5"), note("16", "D5"), note("16", "C5"), note("16", "B4"), note("16", "A4"), note("q", "B4")],
        [note("h", "C5"), note("q", "B4"), note("q", "A4")],
      ],
      [
        [note("h", "A2"), note("h", "E3")],
        [note("q", "D3"), note("q", "A2"), rest("q"), note("q", "E3")],
        [note("q", "F3"), note("q", "C3"), note("h", "D3")],
        [note("h", "E3"), note("h", "A2")],
      ],
    ),
    piece(
      "reading-sample-08",
      "課題 08",
      "G",
      [
        [note("q", "E5"), note("8", "D5"), note("8", "B4"), note("q", "G4"), note("q", "A4")],
        [note("d8", "B4"), note("16", "A4"), note("8", "G4"), note("8", "A4"), note("q", "B4"), note("q", "D5")],
        [note("q", "E5"), note("q", "D5"), note("16", "B4"), note("16", "A4"), note("16", "G4"), note("16", "A4"), note("q", "B4")],
        [note("h", "G4"), note("q", "A4"), note("q", "E4")],
      ],
      [
        [note("h", "E2"), note("h", "B2")],
        [note("q", "C3"), note("q", "G2"), rest("q"), note("q", "D3")],
        [note("q", "A2"), note("q", "E3"), note("h", "C3")],
        [note("h", "B2"), note("h", "E3")],
      ],
    ),
    piece(
      "reading-sample-09",
      "課題 09",
      "F",
      [
        [note("q", "D5"), note("8", "E5"), note("8", "F5"), note("q", "A4"), note("q", "F5")],
        [note("d8", "F5"), note("16", "E5"), note("8", "D5"), note("8", "C5"), note("q", "D5"), note("q", "F5")],
        [note("q", "A4"), note("q", "C5"), note("16", "D5"), note("16", "C5"), note("16", "B4"), note("16", "A4"), note("q", "G4")],
        [note("h", "F4"), note("q", "E4"), note("q", "D4")],
      ],
      [
        [note("h", "D3"), note("h", "A2")],
        [note("q", "B2"), note("q", "F3"), rest("q"), note("q", "A2")],
        [note("q", "G2"), note("q", "D3"), note("h", "B2")],
        [note("h", "A2"), note("h", "D3")],
      ],
    ),
    piece(
      "reading-sample-10",
      "課題 10",
      "C",
      [
        [note("q", "C5"), note("8", "D5"), note("8", "E5"), tie("8", "G5"), note("8", "G5"), note("q", "E5")],
        [note("d8", "F5"), note("16", "E5"), note("8", "D5"), note("8", "C5"), note("q", "D5"), note("q", "E5")],
        [note("q", "G4"), note("q", "A4"), note("16", "B4"), note("16", "C5"), note("16", "D5"), note("16", "C5"), note("q", "B4")],
        [note("h", "C5"), note("q", "D5"), note("q", "C5")],
      ],
      [
        [note("h", "C3"), note("h", "G2")],
        [note("q", "F2"), note("q", "C3"), rest("q"), note("q", "G2")],
        [note("q", "A2"), note("q", "E3"), note("h", "F3")],
        [note("h", "G2"), note("h", "C3")],
      ],
    ),
    piece(
      "reading-sample-11",
      "課題 11",
      "G",
      [
        [rest("8"), note("8", "G4"), note("q", "B4"), note("q", "D5"), note("q", "C5")],
        [note("d8", "B4"), note("16", "A4"), note("8", "G4"), note("8", "A4"), note("q", "B4"), note("q", "D5")],
        [note("q", "E5"), note("q", "D5"), note("16", "C5"), note("16", "B4"), note("16", "A4"), note("16", "G4"), note("q", "A4")],
        [note("h", "B4"), note("q", "A4"), note("q", "G4")],
      ],
      [
        [note("h", "G2"), note("h", "D3")],
        [note("q", "C3"), note("q", "G2"), rest("q"), note("q", "D3")],
        [note("q", "E3"), note("q", "B2"), note("h", "C3")],
        [note("h", "D3"), note("h", "G2")],
      ],
    ),
    piece(
      "reading-sample-12",
      "課題 12",
      "F",
      [
        [note("q", "A4"), note("8", "C5"), note("8", "D5"), note("q", "C5"), note("q", "A4")],
        [note("d8", "G4"), note("16", "A4"), note("8", "B4"), note("8", "C5"), note("q", "D5"), note("q", "C5")],
        [note("q", "F5"), note("q", "E5"), note("16", "D5"), note("16", "C5"), note("16", "B4"), note("16", "A4"), note("q", "G4")],
        [note("h", "F4"), note("q", "A4"), rest("q")],
      ],
      [
        [note("h", "F2"), note("h", "C3")],
        [note("q", "B2"), note("q", "F3"), rest("q"), note("q", "C3")],
        [note("q", "D3"), note("q", "A2"), note("h", "B2")],
        [note("h", "C3"), note("h", "F2")],
      ],
    ),
    piece(
      "reading-sample-13",
      "課題 13",
      "D",
      [
        [note("q", "F4"), note("8", "A4"), note("8", "B4"), note("q", "A4"), note("q", "F4")],
        [note("d8", "E4"), note("16", "F4"), note("8", "G4"), note("8", "A4"), note("q", "B4"), note("q", "A4")],
        [note("q", "D5"), note("q", "C5"), note("16", "B4"), note("16", "A4"), note("16", "G4"), note("16", "F4"), note("q", "E4")],
        [note("h", "D4"), note("q", "F4"), note("q", "D4")],
      ],
      [
        [note("h", "D3"), note("h", "A2")],
        [note("q", "G2"), note("q", "D3"), rest("q"), note("q", "A2")],
        [note("q", "B2"), note("q", "F3"), note("h", "G3")],
        [note("h", "A2"), note("h", "D3")],
      ],
    ),
    piece(
      "reading-sample-14",
      "課題 14",
      "Bb",
      [
        [note("q", "D5"), note("8", "C5"), note("8", "B4"), note("q", "F4"), note("q", "G4")],
        [note("d8", "A4"), note("16", "B4"), note("8", "C5"), note("8", "D5"), note("q", "C5"), note("q", "B4")],
        [note("q", "F5"), note("q", "D5"), note("16", "C5"), note("16", "B4"), note("16", "A4"), note("16", "G4"), note("q", "F4")],
        [note("h", "B4"), note("q", "C5"), note("q", "B4")],
      ],
      [
        [note("h", "B2"), note("h", "F2")],
        [note("q", "E3"), note("q", "B2"), rest("q"), note("q", "F2")],
        [note("q", "G2"), note("q", "D3"), note("h", "E3")],
        [note("h", "F2"), note("h", "B2")],
      ],
    ),
    piece(
      "reading-sample-15",
      "課題 15",
      "Eb",
      [
        [note("q", "G4"), note("8", "B4"), note("8", "C5"), tie("8", "B4"), note("8", "B4"), note("q", "G4")],
        [note("d8", "A4"), note("16", "G4"), note("8", "F4"), note("8", "G4"), note("q", "B4"), note("q", "C5")],
        [note("q", "E5"), note("q", "D5"), note("16", "C5"), note("16", "B4"), note("16", "A4"), note("16", "G4"), note("q", "F4")],
        [note("h", "E4"), note("q", "F4"), note("q", "E4")],
      ],
      [
        [note("h", "E2"), note("h", "B2")],
        [note("q", "A2"), note("q", "E3"), rest("q"), note("q", "B2")],
        [note("q", "C3"), note("q", "G2"), note("h", "A2")],
        [note("h", "B2"), note("h", "E3")],
      ],
    ),
    piece(
      "reading-sample-16",
      "課題 16",
      "A",
      [
        [note("q", "C5"), note("8", "B4"), note("8", "A4"), note("q", "E5"), note("q", "C5")],
        [note("d8", "D5"), note("16", "C5"), note("8", "B4"), note("8", "A4"), note("q", "B4"), note("q", "C5")],
        [note("q", "E5"), note("q", "F5"), note("16", "E5"), note("16", "D5"), note("16", "C5"), note("16", "B4"), note("q", "A4")],
        [note("h", "C5"), note("q", "B4"), note("q", "A4")],
      ],
      [
        [note("h", "A2"), note("h", "E3")],
        [note("q", "D3"), note("q", "A2"), rest("q"), note("q", "E3")],
        [note("q", "F3"), note("q", "C3"), note("h", "D3")],
        [note("h", "E3"), note("h", "A2")],
      ],
    ),
  ];

  const state = {
    exercise: null,
    selected: new Set(),
    checked: false,
  };

  function note(kind, pitch) {
    return { d: DURATIONS[kind], kind, pitch };
  }

  function tie(kind, pitch) {
    return { ...note(kind, pitch), tieToNext: true };
  }

  function rest(kind) {
    return { d: DURATIONS[kind], kind, rest: true };
  }

  function piece(id, title, keySignature, treble, bass) {
    return { id, title, keySignature, treble, bass };
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function sampleToEvents(sample) {
    const events = [];

    ["treble", "bass"].forEach((staff) => {
      const measures = sample[staff];
      for (let measure = 0; measure < 4; measure += 1) {
        let beat = 0;
        measures[measure].forEach((item, index) => {
          events.push({
            id: `${sample.id}-${staff}-${measure}-${index}`,
            staff,
            measure,
            beat,
            duration: item.d,
            kind: item.kind,
            rest: Boolean(item.rest),
            pitch: item.pitch || null,
            tieToNext: Boolean(item.tieToNext),
          });
          beat += item.d;
        });
      }
    });

    return events;
  }

  function createExercise() {
    const sample = randomItem(SIGHT_READING_SAMPLES);
    return {
      id: sample.id,
      title: sample.title,
      keySignature: sample.keySignature,
      events: sampleToEvents(sample),
    };
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

  function parsePitch(pitch) {
    return pitch.match(/^([A-G])([#b]?)([0-9])$/);
  }

  function eventKey(event) {
    if (event.rest) return event.staff === "treble" ? "b/4" : "d/3";
    const [, note, accidental, octave] = parsePitch(event.pitch);
    return `${note.toLowerCase()}${accidental}/${octave}`;
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

  function noteHitRecords(noteRecords) {
    const grouped = new Map();
    noteRecords.forEach((record) => {
      const key = `${record.event.staff}-${record.event.measure}`;
      const records = grouped.get(key) || [];
      records.push({
        ...record,
        bounds: noteBounds(record.note, record.event),
      });
      grouped.set(key, records);
    });

    const result = [];
    grouped.forEach((records) => {
      const sorted = records.sort((a, b) => a.bounds.centerX - b.bounds.centerX);
      sorted.forEach((record, index) => {
        const prev = sorted[index - 1];
        const next = sorted[index + 1];
        const left = prev
          ? (prev.bounds.centerX + record.bounds.centerX) / 2
          : record.bounds.centerX - 28;
        const right = next
          ? (record.bounds.centerX + next.bounds.centerX) / 2
          : record.bounds.centerX + 28;

        result.push({
          ...record,
          hit: {
            x: left,
            y: record.bounds.centerY - (record.event.rest ? 34 : 44),
            width: Math.max(12, right - left),
            height: record.event.rest ? 68 : 88,
          },
        });
      });
    });

    return result;
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

  function createBeams(VF, notes, events) {
    const beams = [];
    let group = [];
    let groupBeat = null;

    const flush = () => {
      if (group.length > 1) {
        beams.push(...VF.Beam.generateBeams(group));
      }
      group = [];
      groupBeat = null;
    };

    notes.forEach((note, index) => {
      const event = events[index];
      const beatGroup = Math.floor(event.beat);

      if (!event.rest && event.duration < 1 && groupBeat === beatGroup) {
        group.push(note);
        return;
      }

      flush();

      if (!event.rest && event.duration < 1) {
        group = [note];
        groupBeat = beatGroup;
      }
    });
    flush();

    return beams;
  }

  function positionForBeat(records, measure, beat) {
    const sorted = records
      .filter((record) => record.event.measure === measure)
      .sort((a, b) => a.event.beat - b.event.beat);
    const exact = sorted.find((record) => Math.abs(record.event.beat - beat) < 0.001);

    if (exact) return exact.note.getAbsoluteX();

    const previous = [...sorted].reverse().find((record) => record.event.beat < beat);
    const next = sorted.find((record) => record.event.beat > beat);

    if (previous) {
      const start = previous.event.beat;
      const end = next ? next.event.beat : Math.min(4, start + previous.event.duration);
      const startX = previous.note.getAbsoluteX();
      const endX = next ? next.note.getAbsoluteX() : measureX(measure) + measureWidth(measure) - 18;
      const span = Math.max(0.001, end - start);

      if (beat <= end) return startX + (endX - startX) * ((beat - start) / span);
    }

    if (next) {
      const leftPadding = measure === 0 ? 112 : 24;
      return measureX(measure) + leftPadding + (next.note.getAbsoluteX() - measureX(measure) - leftPadding) * (beat / Math.max(0.001, next.event.beat));
    }

    const leftPadding = measure === 0 ? 112 : 24;
    const usableWidth = measureWidth(measure) - leftPadding - 18;
    return measureX(measure) + leftPadding + (usableWidth * beat) / 4;
  }

  function beatGuidePositions(noteRecords) {
    const guide = new Map();

    for (let measure = 0; measure < 4; measure += 1) {
      const trebleRecords = noteRecords.filter((record) => record.event.staff === "treble");
      const bassRecords = noteRecords.filter((record) => record.event.staff === "bass");
      for (let beat = 0; beat < 4; beat += 1) {
        guide.set(`${measure}-${beat}`, positionForBeat(trebleRecords, measure, beat) || positionForBeat(bassRecords, measure, beat));
      }
    }

    return guide;
  }

  function createTies(VF, notes, events) {
    return events
      .map((event, index) => {
        const nextEvent = events[index + 1];
        const nextNote = notes[index + 1];
        if (!event.tieToNext || !nextEvent || !nextNote) return null;
        if (event.rest || nextEvent.rest || event.pitch !== nextEvent.pitch) return null;

        return new VF.StaveTie({
          firstNote: notes[index],
          lastNote: nextNote,
          firstIndices: [0],
          lastIndices: [0],
        });
      })
      .filter(Boolean);
  }

  function drawOverlay(svg, noteRecords) {
    const guideLayer = createSvgElement("g", { class: "reading-guide-layer" });
    const eventLayer = createSvgElement("g", { class: "reading-hit-layer" });
    const guidePositions = beatGuidePositions(noteRecords);

    if (state.checked) {
      for (let measure = 0; measure < 4; measure += 1) {
        for (let beat = 0; beat < 4; beat += 1) {
          const x = guidePositions.get(`${measure}-${beat}`);
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

    noteHitRecords(noteRecords).forEach(({ event, hit, bounds }) => {
      const status = statusClass(event);
      const group = createSvgElement("g", {
        class: `score-event ${status}`.trim(),
        "data-event": event.id,
      });
      group.appendChild(createSvgElement("rect", {
        class: "event-hitbox",
        x: hit.x,
        y: hit.y,
        width: hit.width,
        height: hit.height,
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
        trebleStave.addClef("treble");
        bassStave.addClef("bass");

        if (state.exercise.keySignature !== "C") {
          trebleStave.addKeySignature(state.exercise.keySignature);
          bassStave.addKeySignature(state.exercise.keySignature);
        }

        trebleStave.addTimeSignature("4/4");
        bassStave.addTimeSignature("4/4");
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
        const beams = createBeams(VF, notes, events);
        const ties = createTies(VF, notes, events);

        new VF.Formatter().joinVoices([voice]).format([voice], width - (measure === 0 ? 112 : 36));
        voice.draw(context, stave);
        beams.forEach((beam) => {
          beam.setContext(context).draw();
        });
        ties.forEach((tie) => {
          tie.setContext(context).draw();
        });

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
      result.innerHTML = "<span>待機中</span><strong>-</strong>";
      return;
    }

    const targets = state.exercise.events.filter(isBeatStart);
    const selected = state.exercise.events.filter((event) => state.selected.has(event.id));
    const correct = selected.filter(isBeatStart).length;
    const extra = selected.filter((event) => !isBeatStart(event)).length;
    const missed = targets.filter((event) => !state.selected.has(event.id)).length;

    result.innerHTML = `
      <span>結果</span>
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
    DURATIONS,
    SIGHT_READING_SAMPLES,
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
