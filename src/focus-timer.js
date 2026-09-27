(function attachFocusTimer(global) {
  "use strict";

  const DURATION_SECONDS = 5 * 60;

  const STORAGE_KEY = "jazz-focus-timer-v1";

  const state = {
    remainingSeconds: DURATION_SECONDS,
    focusText: "",
    intervalId: null,
    running: false,
    startedAt: null,
    stoppedAt: null,
  };

  function elements() {
    return {
      time: document.querySelector("#focus-time"),
      current: document.querySelector("#focus-current"),
      form: document.querySelector("#focus-form"),
      input: document.querySelector("#focus-input"),
      startButton: document.querySelector("#focus-start-button"),
      stopButton: document.querySelector("#focus-stop-button"),
      nextButton: document.querySelector("#focus-next-button"),
    };
  }

  function formatTime(seconds) {
    const safeSeconds = Math.max(0, seconds);
    const minutes = Math.floor(safeSeconds / 60);
    const rest = String(safeSeconds % 60).padStart(2, "0");
    return `${minutes}:${rest}`;
  }

  function saveTimer() {
    try {
      global.localStorage?.setItem(STORAGE_KEY, JSON.stringify({
        startedAt: state.startedAt,
        stoppedAt: state.stoppedAt,
        focusText: state.focusText,
      }));
    } catch {
      // Keep the current timer usable when browser storage is unavailable.
    }
  }

  function restoreTimer() {
    try {
      const saved = JSON.parse(global.localStorage?.getItem(STORAGE_KEY) || "null");
      if (!saved || !Number.isFinite(saved.startedAt) || saved.startedAt < 0
        || typeof saved.focusText !== "string"
        || !(saved.stoppedAt === null || (Number.isFinite(saved.stoppedAt) && saved.stoppedAt >= saved.startedAt))) return;
      state.startedAt = saved.startedAt;
      state.stoppedAt = saved.stoppedAt;
      state.focusText = saved.focusText;
      state.running = saved.stoppedAt === null;
    } catch {
      // Invalid saved data starts with a fresh timer.
    }
  }

  function updateRemaining() {
    if (state.startedAt === null) return;
    const now = state.stoppedAt === null ? Date.now() : state.stoppedAt;
    state.remainingSeconds = DURATION_SECONDS - Math.max(0, Math.floor((now - state.startedAt) / 1000));
  }

  function render() {
    const dom = elements();
    const hasFocus = dom.input.value.trim().length > 0;
    const stopped = state.startedAt !== null && !state.running;
    updateRemaining();
    dom.time.textContent = state.remainingSeconds < 0
      ? `+${formatTime(-state.remainingSeconds)}`
      : formatTime(state.remainingSeconds);
    dom.startButton.disabled = state.running || !hasFocus;
    dom.input.disabled = state.running;
    dom.form.hidden = state.startedAt !== null;
    dom.current.hidden = !state.focusText;
    dom.current.textContent = state.focusText;
    dom.stopButton.hidden = !state.running;
    dom.nextButton.hidden = !stopped;
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
    state.startedAt = null;
    state.stoppedAt = null;
    saveTimer();
    dom.form.hidden = false;
    dom.input.value = "";
    dom.input.disabled = false;
    render();
    dom.input.focus();
  }

  function stopTimer() {
    if (!state.running) return;
    if (state.intervalId) {
      global.clearInterval(state.intervalId);
      state.intervalId = null;
    }
    state.stoppedAt = Date.now();
    state.running = false;
    saveTimer();
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
    state.startedAt = Date.now();
    state.stoppedAt = null;
    saveTimer();
    dom.form.hidden = true;
    render();
    state.intervalId = global.setInterval(render, 250);
  }

  function syncTimer() {
    if (state.intervalId) global.clearInterval(state.intervalId);
    state.intervalId = null;
    state.startedAt = null;
    state.stoppedAt = null;
    state.focusText = "";
    state.running = false;
    state.remainingSeconds = DURATION_SECONDS;
    restoreTimer();
    if (state.running) state.intervalId = global.setInterval(render, 250);
    render();
  }

  function boot() {
    const dom = elements();
    dom.form.addEventListener("submit", startTimer);
    dom.input.addEventListener("input", render);
    dom.nextButton.addEventListener("click", resetTimer);
    dom.stopButton.addEventListener("click", stopTimer);
    restoreTimer();
    if (state.running) state.intervalId = global.setInterval(render, 250);
    global.addEventListener?.("pageshow", syncTimer);
    global.addEventListener?.("storage", (event) => {
      if (event.key === STORAGE_KEY || event.key === null) syncTimer();
    });
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
