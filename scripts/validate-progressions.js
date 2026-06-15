const assert = require("node:assert/strict");
const {
  ANSWER_LABELS,
  ANSWER_TYPES,
  CHARTS,
  answerLabel,
} = require("../src/progressions.js");

const NOTE_VALUES = {
  C: 0,
  "C#": 1,
  "C♯": 1,
  "D♭": 1,
  D: 2,
  "D#": 3,
  "D♯": 3,
  "E♭": 3,
  E: 4,
  F: 5,
  "F#": 6,
  "F♯": 6,
  "G♭": 6,
  G: 7,
  "G#": 8,
  "G♯": 8,
  "A♭": 8,
  A: 9,
  "A#": 10,
  "A♯": 10,
  "B♭": 10,
  B: 11,
};

const answerTypeIds = new Set(ANSWER_TYPES);
const typeCounts = Object.fromEntries(ANSWER_TYPES.map((type) => [type, 0]));
let overlappingAnswerPairCount = 0;
let distractorBarCount = 0;

assert.deepEqual(ANSWER_TYPES, Object.keys(ANSWER_LABELS));
assert.equal(CHARTS.length, 8);

function mod12(value) {
  return ((value % 12) + 12) % 12;
}

function parseChord(symbol) {
  const root = symbol.match(/^([A-G](?:#|♯|b|♭)?)/)?.[1]?.replace("b", "♭");
  assert(root, `Cannot parse chord root: ${symbol}`);
  assert(root in NOTE_VALUES, `Unknown chord root: ${symbol}`);

  let quality = "dominant7";
  if (symbol.includes("(♭5)")) {
    quality = "halfDim";
  } else if (symbol.includes("△") || symbol.includes("maj")) {
    quality = "major";
  } else if (/-7|m7/.test(symbol)) {
    quality = "minor7";
  }

  return { symbol, root, value: NOTE_VALUES[root], quality };
}

function flattenChart(chart) {
  return chart.bars.flatMap((bar, barIndex) =>
    bar.map((symbol, chordIndex) => ({
      symbol,
      barIndex,
      chordIndex,
      chord: parseChord(symbol),
    })),
  );
}

function chordsForSpan(chart, span) {
  return span.flatMap((barIndex) => chart.bars[barIndex].map(parseChord));
}

function spanFromBars(firstBar, lastBar) {
  return Array.from(
    { length: lastBar - firstBar + 1 },
    (_, index) => firstBar + index,
  );
}

function answerKey(type, span) {
  return `${type}:${span.join(",")}`;
}

function pairMode(iiChord, vChord) {
  if (vChord.quality !== "dominant7") return null;
  if (mod12(vChord.value - iiChord.value) !== 5) return null;
  if (iiChord.quality === "halfDim") return "minor";
  if (iiChord.quality === "minor7") return "major";
  return null;
}

function resolutionType(mode, vChord, targetChord) {
  if (mod12(targetChord.value - vChord.value) !== 5) return null;
  if (mode === "major" && targetChord.quality === "major") return "major251";
  if (mode === "minor" && targetChord.quality === "minor7") return "minor251";
  return null;
}

function expectedTypeForAnswer(chords, answer) {
  assert(
    chords.length === (answer.type.endsWith("251") ? 3 : 2),
    `${answer.type} must contain the expected number of chords`,
  );

  const mode = pairMode(chords[0], chords[1]);
  assert(mode, `${answer.type} does not start with a valid 2-5`);

  if (answer.type.endsWith("251")) {
    const resolvedType = resolutionType(mode, chords[1], chords[2]);
    assert(resolvedType, `${answer.type} does not resolve as a 2-5-1`);
    return resolvedType;
  }

  return `${mode}25`;
}

function assertEveryDetectedProgressionIsMarked(chart) {
  const chords = flattenChart(chart);
  const answers = new Set(
    chart.answers.map((answer) => answerKey(answer.type, answer.span)),
  );

  chords.slice(0, -1).forEach((entry, index) => {
    const next = chords[index + 1];
    const mode = pairMode(entry.chord, next.chord);
    if (!mode) return;

    const target = chords[index + 2];
    const resolvedType = target
      ? resolutionType(mode, next.chord, target.chord)
      : null;
    const type = resolvedType || `${mode}25`;
    const lastBar = resolvedType ? target.barIndex : next.barIndex;
    const span = spanFromBars(entry.barIndex, lastBar);
    const key = answerKey(type, span);
    const symbols = resolvedType
      ? `${entry.symbol} -> ${next.symbol} -> ${target.symbol}`
      : `${entry.symbol} -> ${next.symbol}`;

    assert(answers.has(key), `${chart.title} missing ${type}: ${symbols}`);
  });
}

CHARTS.forEach((chart) => {
  assert.equal(chart.bars.length, 16, `${chart.title} must have 16 bars`);
  assert(chart.answers.length > 0, `${chart.title} must have answers`);

  chart.bars.forEach((bar, index) => {
    assert(Array.isArray(bar), `${chart.title} bar ${index + 1} must be an array`);
    assert(bar.length >= 1, `${chart.title} bar ${index + 1} must have chords`);
  });

  const chartTypes = new Set();
  const answerSpanKeys = new Set();
  chart.answers.forEach((answer, answerIndex) => {
    assert(answerTypeIds.has(answer.type), `Unknown answer type ${answer.type}`);
    assert.equal(answerLabel(answer.type), ANSWER_LABELS[answer.type]);
    assert(answer.start >= 0 && answer.start < 16, "Answer start out of range");
    assert(answer.span.includes(answer.start), "Answer span must include start");
    assert.equal(answer.start, answer.span[0], "Answer start must be the first span bar");
    assert.deepEqual(
      answer.span,
      answer.span.slice().sort((a, b) => a - b),
      "Answer span must be sorted",
    );
    answer.span.forEach((barIndex) => {
      assert(barIndex >= 0 && barIndex < 16, "Answer span out of range");
    });
    answer.span.slice(1).forEach((barIndex, index) => {
      assert.equal(
        barIndex,
        answer.span[index] + 1,
        "Answer span must be contiguous",
      );
    });

    const spanKey = answer.span.join(",");
    assert(!answerSpanKeys.has(spanKey), `${chart.title} duplicate answer span ${spanKey}`);
    answerSpanKeys.add(spanKey);
    chart.answers.slice(answerIndex + 1).forEach((nextAnswer) => {
      if (answer.span.some((barIndex) => nextAnswer.span.includes(barIndex))) {
        overlappingAnswerPairCount += 1;
      }
    });

    const chords = chordsForSpan(chart, answer.span);
    assert.equal(expectedTypeForAnswer(chords, answer), answer.type);

    chartTypes.add(answer.type);
    typeCounts[answer.type] += 1;
  });

  const coveredBars = new Set(chart.answers.flatMap((answer) => answer.span));
  distractorBarCount += chart.bars.filter((_, index) => !coveredBars.has(index)).length;

  Object.keys(ANSWER_LABELS).forEach((type) => {
    assert(chartTypes.has(type), `${chart.title} missing ${type}`);
  });

  const has251 = chart.answers.some((answer) => answer.type.endsWith("251"));
  const has25 = chart.answers.some((answer) => answer.type.endsWith("25"));
  assert(has251 && has25, `${chart.title} must mix 2-5-1 and 2-5`);

  assertEveryDetectedProgressionIsMarked(chart);
});

Object.entries(typeCounts).forEach(([type, count]) => {
  assert(count >= 6, `${type} should appear across the deck`);
});

assert(overlappingAnswerPairCount >= 3, "Deck should include overlapping 251 patterns");
assert(distractorBarCount >= 14, "Deck should include non-2-5 distractor bars");

console.log("Progression validation passed");
