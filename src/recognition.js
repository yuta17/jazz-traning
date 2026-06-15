(function bootRecognitionTrainer() {
  "use strict";

  const { ANSWER_TYPES, CHARTS, answerLabel } = window.ProgressionData;

  const elements = {
    chartTitle: document.querySelector("#chart-title"),
    chartCount: document.querySelector("#chart-count"),
    typePicker: document.querySelector("#mark-type-picker"),
    chartGrid: document.querySelector("#chart-grid"),
    clearMarks: document.querySelector("#clear-marks"),
    checkAnswer: document.querySelector("#check-answer"),
    nextChart: document.querySelector("#next-chart"),
    result: document.querySelector("#spotter-result"),
  };

  const state = {
    chartIndex: 0,
    activeType: ANSWER_TYPES[0],
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

  function answerSpans() {
    return new Set(currentAnswers().flatMap((answer) => answer.span));
  }

  function spanKey(span) {
    return span.slice().sort((a, b) => a - b).join(",");
  }

  function answerKey(answer) {
    return `${answer.type}:${spanKey(answer.span)}`;
  }

  function spanBetween(start, end) {
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    return Array.from({ length: max - min + 1 }, (_, offset) => min + offset);
  }

  function markedBars() {
    return new Set(state.marks.flatMap((mark) => mark.span));
  }

  function selectedCountsByBar() {
    return state.marks.reduce((counts, mark) => {
      mark.span.forEach((index) => {
        counts.set(index, (counts.get(index) || 0) + 1);
      });
      return counts;
    }, new Map());
  }

  function pendingBars() {
    return new Set(state.pendingSpan);
  }

  function gradeSelection() {
    const answerByKey = new Map(
      currentAnswers().map((answer) => [answerKey(answer), answer]),
    );
    const selectedByKey = new Set(state.marks.map((mark) => answerKey(mark)));
    const correctAnswers = currentAnswers().filter((answer) =>
      selectedByKey.has(answerKey(answer)),
    );
    const missedAnswers = currentAnswers().filter((answer) =>
      !selectedByKey.has(answerKey(answer)),
    );
    const wrongMarks = state.marks.filter((mark) =>
      !answerByKey.has(answerKey(mark)),
    );
    const correctMarkKeys = new Set(
      state.marks
        .filter((mark) => answerByKey.has(answerKey(mark)))
        .map((mark) => answerKey(mark)),
    );
    const correctAnswerKeys = new Set(correctAnswers.map((answer) => answerKey(answer)));

    return {
      correctAnswers,
      correctAnswerKeys,
      correctMarkKeys,
      missedAnswers,
      wrongMarks,
      correctBars: new Set(correctAnswers.flatMap((answer) => answer.span)),
      missedBars: new Set(missedAnswers.flatMap((answer) => answer.span)),
      wrongBars: new Set(wrongMarks.flatMap((mark) => mark.span)),
    };
  }

  function renderTypePicker() {
    elements.typePicker.innerHTML = ANSWER_TYPES.map((type) => {
      const active = state.activeType === type;
      return `
        <button
          class="type-toggle"
          type="button"
          data-type="${type}"
          aria-pressed="${active ? "true" : "false"}"
          ${state.checked ? "disabled" : ""}
        >
          ${answerLabel(type)}
        </button>
      `;
    }).join("");
  }

  function renderMeta() {
    elements.chartTitle.textContent = currentChart().title;
    elements.chartCount.textContent = `${state.chartIndex + 1} / ${CHARTS.length}`;
  }

  function renderChart() {
    const spans = answerSpans();
    const answers = currentAnswers();
    const selectedBars = markedBars();
    const selectedCounts = selectedCountsByBar();
    const previewBars = pendingBars();
    const grade = state.checked ? gradeSelection() : null;

    elements.chartGrid.innerHTML = currentChart().bars
      .map((bar, index) => {
        const selectedAtStart = state.marks.filter((mark) => mark.span[0] === index);
        const answersAtStart = state.checked
          ? answers.filter((answer) => answer.start === index)
          : [];
        const selected = selectedBars.has(index);
        const multiSelected = (selectedCounts.get(index) || 0) > 1;
        const preview = previewBars.has(index);
        const correctSpan = state.checked && grade.correctBars.has(index);
        const wrongSpan = state.checked && grade.wrongBars.has(index);
        const missedSpan = state.checked && grade.missedBars.has(index);
        const correctStart =
          state.checked &&
          answersAtStart.some((answer) => grade.correctAnswerKeys.has(answerKey(answer)));
        const wrongStart =
          state.checked &&
          selectedAtStart.some((mark) => !grade.correctMarkKeys.has(answerKey(mark)));
        const missedStart =
          state.checked &&
          answersAtStart.some((answer) => !grade.correctAnswerKeys.has(answerKey(answer)));
        const inAnswerSpan = state.checked && spans.has(index);
        const classes = [
          "bar-cell",
          selected ? "selected" : "",
          multiSelected ? "multi-selected" : "",
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
        const selectedBadges = selectedAtStart
          .map((mark) => {
            const correct = state.checked && grade.correctMarkKeys.has(answerKey(mark));
            const wrong = state.checked && !grade.correctMarkKeys.has(answerKey(mark));
            const badgeClass = correct ? "correct-badge" : wrong ? "wrong-badge" : "";
            return `
              <span class="answer-badge selected-badge ${badgeClass}">
                ${answerLabel(mark.type)}
              </span>
            `;
          })
          .join("");
        const missedBadges = answersAtStart
          .filter((answer) => !grade.correctAnswerKeys.has(answerKey(answer)))
          .map(
            (answer) => `
              <span class="answer-badge missed-badge">
                ${answerLabel(answer.type)}
              </span>
            `,
          )
          .join("");
        const badges = `${selectedBadges}${missedBadges}`;

        return `
          <button class="${classes}" type="button" data-bar="${index}">
            <span class="bar-number">${index + 1}</span>
            <span class="chart-chords">${chords}</span>
            ${badges ? `<span class="answer-badges">${badges}</span>` : ""}
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
    renderTypePicker();
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

  function toggleSpan(span) {
    if (state.checked) return;

    const key = spanKey(span);
    const existingIndex = state.marks.findIndex((mark) => spanKey(mark.span) === key);

    if (existingIndex >= 0) {
      const existing = state.marks[existingIndex];
      if (existing.type === state.activeType) {
        removeMark(existing);
      } else {
        state.marks[existingIndex] = { type: state.activeType, span };
      }
      render();
      return;
    }

    state.marks.push({ type: state.activeType, span });
    render();
  }

  function toggleSingleBar(index) {
    toggleSpan([index]);
  }

  function toggleRange(start, end) {
    toggleSpan(spanBetween(start, end));
  }

  function setActiveType(type) {
    if (state.checked || !ANSWER_TYPES.includes(type)) return;

    state.activeType = type;
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

  elements.typePicker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-type]");
    if (!button) return;

    setActiveType(button.dataset.type);
  });
  elements.clearMarks.addEventListener("click", resetMarks);
  elements.checkAnswer.addEventListener("click", checkAnswer);
  elements.nextChart.addEventListener("click", nextChart);

  render();
})();
