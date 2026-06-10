const assert = require("node:assert/strict");
const {
  ANSWER_LABELS,
  CHARTS,
  TARGET_TYPES,
  answerLabel,
  targetById,
} = require("../src/progressions.js");

const answerTypeIds = new Set(Object.keys(ANSWER_LABELS));
const typeCounts = Object.fromEntries(
  Object.keys(ANSWER_LABELS).map((type) => [type, 0]),
);

assert.equal(CHARTS.length, 6);
assert.deepEqual(
  TARGET_TYPES.map((target) => target.id),
  ["all251", "all25"],
);

TARGET_TYPES.forEach((target) => {
  assert.equal(targetById(target.id).id, target.id);
  assert(target.answerTypes.length >= 2);
  target.answerTypes.forEach((type) => assert(answerTypeIds.has(type)));
});

CHARTS.forEach((chart) => {
  assert.equal(chart.bars.length, 16, `${chart.title} must have 16 bars`);
  assert(chart.answers.length > 0, `${chart.title} must have answers`);

  chart.bars.forEach((bar, index) => {
    assert(Array.isArray(bar), `${chart.title} bar ${index + 1} must be an array`);
    assert(bar.length >= 1, `${chart.title} bar ${index + 1} must have chords`);
  });

  const chartTypes = new Set();
  chart.answers.forEach((answer) => {
    assert(answerTypeIds.has(answer.type), `Unknown answer type ${answer.type}`);
    assert.equal(answerLabel(answer.type), ANSWER_LABELS[answer.type]);
    assert(answer.start >= 0 && answer.start < 16, "Answer start out of range");
    assert(answer.span.includes(answer.start), "Answer span must include start");
    answer.span.forEach((barIndex) => {
      assert(barIndex >= 0 && barIndex < 16, "Answer span out of range");
    });
    chartTypes.add(answer.type);
    typeCounts[answer.type] += 1;
  });

  Object.keys(ANSWER_LABELS).forEach((type) => {
    assert(chartTypes.has(type), `${chart.title} missing ${type}`);
  });
});

Object.entries(typeCounts).forEach(([type, count]) => {
  assert(count >= 6, `${type} should appear across the deck`);
});

console.log("Progression validation passed");
