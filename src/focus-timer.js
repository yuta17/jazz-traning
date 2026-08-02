(function attachFocusTimer(global) {
  "use strict";

  const DURATION_SECONDS = 5 * 60;

  const state = {
    remainingSeconds: DURATION_SECONDS,
    focusText: "",
    intervalId: null,
    running: false,
  };

  function elements() {
    return {
      time: document.querySelector("#focus-time"),
      current: document.querySelector("#focus-current"),
      form: document.querySelector("#focus-form"),
      input: document.querySelector("#focus-input"),
      startButton: document.querySelector("#focus-start-button"),
      nextButton: document.querySelector("#focus-next-button"),
    };
  }

  function formatTime(seconds) {
    const safeSeconds = Math.max(0, seconds);
    const minutes = Math.floor(safeSeconds / 60);
    const rest = String(safeSeconds % 60).padStart(2, "0");
    return `${minutes}:${rest}`;
  }

  function render() {
    const dom = elements();
    const hasFocus = dom.input.value.trim().length > 0;
    const finished = !state.running && state.remainingSeconds === 0;

    dom.time.textContent = formatTime(state.remainingSeconds);
    dom.startButton.disabled = state.running || !hasFocus;
    dom.input.disabled = state.running;
    dom.current.hidden = !state.focusText;
    dom.current.textContent = state.focusText;
    dom.nextButton.hidden = !finished;
  }

  function resetTimer() {
    if (state.intervalId) {
      global.clearInterval(state.intervalId);
      state.intervalId = null;
    }

    const dom = elements();
    state.remainingSeconds = DURATION_SECONDS;
    state.focusText = "";
    state.running = false;
    dom.form.hidden = false;
    dom.input.value = "";
    dom.input.disabled = false;
    render();
    dom.input.focus();
  }

  function finishTimer() {
    if (state.intervalId) {
      global.clearInterval(state.intervalId);
      state.intervalId = null;
    }

    state.remainingSeconds = 0;
    state.running = false;
    render();
  }

  function tick() {
    state.remainingSeconds -= 1;
    if (state.remainingSeconds <= 0) {
      finishTimer();
      return;
    }

    render();
  }

  function startTimer(event) {
    event.preventDefault();

    const dom = elements();
    const focusText = dom.input.value.trim();
    if (!focusText || state.running) return;

    state.focusText = focusText;
    state.remainingSeconds = DURATION_SECONDS;
    state.running = true;
    dom.form.hidden = true;
    render();
    state.intervalId = global.setInterval(tick, 1000);
  }

  function boot() {
    const dom = elements();
    dom.form.addEventListener("submit", startTimer);
    dom.input.addEventListener("input", render);
    dom.nextButton.addEventListener("click", resetTimer);
    render();
  }

  const api = {
    DURATION_SECONDS,
    formatTime,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.FocusTimer = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
