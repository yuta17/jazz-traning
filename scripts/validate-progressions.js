const assert = require("node:assert/strict");
const {
  ANSWER_LABELS,
  CHARTS,
  answerLabel,
} = require("../src/progressions.js");

const answerTypeIds = new Set(Object.keys(ANSWER_LABELS));
const typeCounts = Object.fromEntries(
  Object.keys(ANSWER_LABELS).map((type) => [type, 0]),
);
let overlappingAnswerPairCount = 0;

assert.equal(CHARTS.length, 7);

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
    chartTypes.add(answer.type);
    typeCounts[answer.type] += 1;
  });

  Object.keys(ANSWER_LABELS).forEach((type) => {
    assert(chartTypes.has(type), `${chart.title} missing ${type}`);
  });

  const has251 = chart.answers.some((answer) => answer.type.endsWith("251"));
  const has25 = chart.answers.some((answer) => answer.type.endsWith("25"));
  assert(has251 && has25, `${chart.title} must mix 2-5-1 and 2-5`);
});

Object.entries(typeCounts).forEach(([type, count]) => {
  assert(count >= 6, `${type} should appear across the deck`);
});

assert(overlappingAnswerPairCount >= 1, "Deck should include overlapping 251 -> 25 patterns");

console.log("Progression validation passed");
