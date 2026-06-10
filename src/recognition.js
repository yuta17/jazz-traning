(function bootRecognitionTrainer() {
  "use strict";

  const { TARGET_TYPES, CHARTS, answerLabel, targetById } =
    window.ProgressionData;

  const elements = {
    targetTabs: document.querySelector("#target-tabs"),
    chartTitle: document.querySelector("#chart-title"),
    chartCount: document.querySelector("#chart-count"),
    chartGrid: document.querySelector("#chart-grid"),
    clearMarks: document.querySelector("#clear-marks"),
    checkAnswer: document.querySelector("#check-answer"),
    nextChart: document.querySelector("#next-chart"),
    result: document.querySelector("#spotter-result"),
  };

  const state = {
    chartIndex: 0,
    targetType: TARGET_TYPES[0].id,
    selected: new Set(),
    checked: false,
  };

  function currentChart() {
    return CHARTS[state.chartIndex];
  }

  function currentAnswers() {
    const target = targetById(state.targetType);
    return currentChart().answers.filter(
      (answer) => target.answerTypes.includes(answer.type),
    );
  }

  function answerStarts() {
    return new Set(currentAnswers().map((answer) => answer.start));
  }

  function answerSpans() {
    return new Set(currentAnswers().flatMap((answer) => answer.span));
  }

  function renderTargets() {
    elements.targetTabs.innerHTML = TARGET_TYPES.map(
      (target) => `
        <button
          class="target-tab ${target.id === state.targetType ? "active" : ""}"
          type="button"
          data-target="${target.id}"
        >
          ${target.label}
        </button>
      `,
    ).join("");
  }

  function renderMeta() {
    elements.chartTitle.textContent = currentChart().title;
    elements.chartCount.textContent = `${state.chartIndex + 1} / ${CHARTS.length}`;
  }

  function renderChart() {
    const starts = answerStarts();
    const spans = answerSpans();
    const answers = currentAnswers();

    elements.chartGrid.innerHTML = currentChart().bars
      .map((bar, index) => {
        const answerAtStart = state.checked
          ? answers.find((answer) => answer.start === index)
          : null;
        const selected = state.selected.has(index);
        const correctStart = state.checked && selected && starts.has(index);
        const wrongStart = state.checked && selected && !starts.has(index);
        const missedStart = state.checked && !selected && starts.has(index);
        const inAnswerSpan = state.checked && spans.has(index);
        const classes = [
          "bar-cell",
          selected ? "selected" : "",
          inAnswerSpan ? "answer-span" : "",
          correctStart ? "correct-start" : "",
          wrongStart ? "wrong-start" : "",
          missedStart ? "missed-start" : "",
        ]
          .filter(Boolean)
          .join(" ");

        const chords = bar
          .map((symbol) => `<span class="chart-chord">${symbol}</span>`)
          .join("");

        return `
          <button class="${classes}" type="button" data-bar="${index}">
            <span class="bar-number">${index + 1}</span>
            <span class="chart-chords">${chords}</span>
            ${
              answerAtStart
                ? `<span class="answer-badge">${answerLabel(answerAtStart.type)}</span>`
                : ""
            }
          </button>
        `;
      })
      .join("");
  }

  function renderResult() {
    if (!state.checked) {
      elements.result.innerHTML = "<span>READY</span><strong>-</strong>";
      return;
    }

    const starts = answerStarts();
    const correct = Array.from(state.selected).filter((index) =>
      starts.has(index),
    ).length;
    const extra = Array.from(state.selected).filter(
      (index) => !starts.has(index),
    ).length;
    const missed = Array.from(starts).filter(
      (index) => !state.selected.has(index),
    ).length;

    elements.result.innerHTML = `
      <span>RESULT</span>
      <strong>正解 ${correct}/${starts.size}</strong>
      <em>ミス ${extra + missed}</em>
    `;
  }

  function renderControls() {
    elements.checkAnswer.disabled = state.checked;
    elements.clearMarks.disabled = state.selected.size === 0 && !state.checked;
  }

  function render() {
    renderTargets();
    renderMeta();
    renderChart();
    renderResult();
    renderControls();
  }

  function resetMarks() {
    state.selected.clear();
    state.checked = false;
    render();
  }

  function switchTarget(targetType) {
    state.targetType = targetType;
    resetMarks();
  }

  function toggleBar(index) {
    if (state.checked) return;

    if (state.selected.has(index)) {
      state.selected.delete(index);
    } else {
      state.selected.add(index);
    }

    render();
  }

  function checkAnswer() {
    state.checked = true;
    render();
  }

  function nextChart() {
    state.chartIndex = (state.chartIndex + 1) % CHARTS.length;
    resetMarks();
  }

  elements.targetTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-target]");
    if (!button) return;
    switchTarget(button.dataset.target);
  });

  elements.chartGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-bar]");
    if (!button) return;
    toggleBar(Number(button.dataset.bar));
  });

  elements.clearMarks.addEventListener("click", resetMarks);
  elements.checkAnswer.addEventListener("click", checkAnswer);
  elements.nextChart.addEventListener("click", nextChart);

  render();
})();
