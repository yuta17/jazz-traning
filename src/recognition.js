(function bootRecognitionTrainer() {
  "use strict";

  const { CHARTS, answerLabel } = window.ProgressionData;

  const elements = {
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
    marks: [],
    pendingSpan: [],
    dragStart: null,
    dragPointerId: null,
    checked: false,
  };

  function currentChart() {
    return CHARTS[state.chartIndex];
  }

  function currentAnswers() {
    return currentChart().answers;
  }

  function answerStarts() {
    return new Set(currentAnswers().map((answer) => answer.start));
  }

  function answerSpans() {
    return new Set(currentAnswers().flatMap((answer) => answer.span));
  }

  function spanKey(span) {
    return span.slice().sort((a, b) => a - b).join(",");
  }

  function spanBetween(start, end) {
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    return Array.from({ length: max - min + 1 }, (_, offset) => min + offset);
  }

  function spansOverlap(first, second) {
    const secondSet = new Set(second);
    return first.some((index) => secondSet.has(index));
  }

  function markedBars() {
    return new Set(state.marks.flatMap((mark) => mark.span));
  }

  function pendingBars() {
    return new Set(state.pendingSpan);
  }

  function gradeSelection() {
    const answerBySpan = new Map(
      currentAnswers().map((answer) => [spanKey(answer.span), answer]),
    );
    const selectedBySpan = new Set(state.marks.map((mark) => spanKey(mark.span)));
    const correctAnswers = currentAnswers().filter((answer) =>
      selectedBySpan.has(spanKey(answer.span)),
    );
    const missedAnswers = currentAnswers().filter((answer) =>
      !selectedBySpan.has(spanKey(answer.span)),
    );
    const wrongMarks = state.marks.filter((mark) =>
      !answerBySpan.has(spanKey(mark.span)),
    );

    return {
      correctAnswers,
      missedAnswers,
      wrongMarks,
      correctBars: new Set(correctAnswers.flatMap((answer) => answer.span)),
      missedBars: new Set(missedAnswers.flatMap((answer) => answer.span)),
      wrongBars: new Set(wrongMarks.flatMap((mark) => mark.span)),
    };
  }

  function renderMeta() {
    elements.chartTitle.textContent = currentChart().title;
    elements.chartCount.textContent = `${state.chartIndex + 1} / ${CHARTS.length}`;
  }

  function renderChart() {
    const starts = answerStarts();
    const spans = answerSpans();
    const answers = currentAnswers();
    const selectedBars = markedBars();
    const previewBars = pendingBars();
    const grade = state.checked ? gradeSelection() : null;

    elements.chartGrid.innerHTML = currentChart().bars
      .map((bar, index) => {
        const answerAtStart = state.checked
          ? answers.find((answer) => answer.start === index)
          : null;
        const selected = selectedBars.has(index);
        const preview = previewBars.has(index);
        const correctSpan = state.checked && grade.correctBars.has(index);
        const wrongSpan = state.checked && grade.wrongBars.has(index);
        const missedSpan = state.checked && grade.missedBars.has(index);
        const correctStart = correctSpan && starts.has(index);
        const wrongStart = wrongSpan && starts.has(index);
        const missedStart = missedSpan && starts.has(index);
        const inAnswerSpan = state.checked && spans.has(index);
        const classes = [
          "bar-cell",
          selected ? "selected" : "",
          preview ? "range-preview" : "",
          inAnswerSpan ? "answer-span" : "",
          correctSpan ? "correct-span" : "",
          wrongSpan ? "wrong-span" : "",
          missedSpan ? "missed-span" : "",
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
      elements.result.innerHTML = "<span>待機中</span><strong>-</strong>";
      return;
    }

    const grade = gradeSelection();
    const correct = grade.correctAnswers.length;
    const extra = grade.wrongMarks.length;
    const missed = grade.missedAnswers.length;

    elements.result.innerHTML = `
      <span>結果</span>
      <strong>正解 ${correct}/${currentAnswers().length}</strong>
      <em>ミス ${extra + missed}</em>
    `;
  }

  function renderControls() {
    elements.checkAnswer.disabled = state.checked;
    elements.clearMarks.disabled = state.marks.length === 0 && !state.checked;
  }

  function render() {
    renderMeta();
    renderChart();
    renderResult();
    renderControls();
  }

  function resetMarks() {
    state.marks = [];
    state.pendingSpan = [];
    state.dragStart = null;
    state.dragPointerId = null;
    state.checked = false;
    render();
  }

  function removeMark(mark) {
    state.marks = state.marks.filter((item) => item !== mark);
  }

  function toggleSingleBar(index) {
    const existing = state.marks.find((mark) => mark.span.includes(index));
    if (existing) {
      removeMark(existing);
      render();
      return;
    }

    state.marks.push({ span: [index] });
    render();
  }

  function toggleRange(start, end) {
    if (state.checked) return;

    const span = spanBetween(start, end);
    const key = spanKey(span);
    const existing = state.marks.find((mark) => spanKey(mark.span) === key);

    if (existing) {
      removeMark(existing);
    } else {
      state.marks = state.marks.filter((mark) => !spansOverlap(mark.span, span));
      state.marks.push({ span });
    }

    render();
  }

  function indexFromEvent(event) {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    const button = element?.closest("[data-bar]");
    return button ? Number(button.dataset.bar) : null;
  }

  function startRange(event) {
    if (state.checked) return;

    const button = event.target.closest("[data-bar]");
    if (!button) return;

    const index = Number(button.dataset.bar);
    state.dragStart = index;
    state.dragPointerId = event.pointerId;
    state.pendingSpan = [index];
    elements.chartGrid.setPointerCapture?.(event.pointerId);
    event.preventDefault();
    render();
  }

  function updateRange(event) {
    if (state.dragPointerId !== event.pointerId || state.dragStart === null) return;

    const index = indexFromEvent(event);
    if (index === null) return;

    const nextSpan = spanBetween(state.dragStart, index);
    if (spanKey(nextSpan) === spanKey(state.pendingSpan)) return;

    state.pendingSpan = nextSpan;
    render();
  }

  function finishRange(event) {
    if (state.dragPointerId !== event.pointerId || state.dragStart === null) return;

    const index = indexFromEvent(event);
    const start = state.dragStart;
    const fallbackEnd = state.pendingSpan[state.pendingSpan.length - 1];
    const end = index === null ? fallbackEnd : index;
    const span = spanBetween(start, end);

    state.pendingSpan = [];
    state.dragStart = null;
    state.dragPointerId = null;
    elements.chartGrid.releasePointerCapture?.(event.pointerId);

    if (span.length === 1) {
      toggleSingleBar(span[0]);
    } else {
      toggleRange(span[0], span[span.length - 1]);
    }
  }

  function cancelRange(event) {
    if (state.dragPointerId !== event.pointerId) return;

    state.pendingSpan = [];
    state.dragStart = null;
    state.dragPointerId = null;
    render();
  }

  function checkAnswer() {
    state.checked = true;
    window.JazzDailyProgress?.mark("recognition");
    render();
  }

  function nextChart() {
    state.chartIndex = (state.chartIndex + 1) % CHARTS.length;
    resetMarks();
  }

  elements.chartGrid.addEventListener("pointerdown", startRange);
  elements.chartGrid.addEventListener("pointermove", updateRange);
  elements.chartGrid.addEventListener("pointerup", finishRange);
  elements.chartGrid.addEventListener("pointercancel", cancelRange);

  elements.clearMarks.addEventListener("click", resetMarks);
  elements.checkAnswer.addEventListener("click", checkAnswer);
  elements.nextChart.addEventListener("click", nextChart);

  render();
})();
