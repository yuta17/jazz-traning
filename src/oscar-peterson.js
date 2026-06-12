(function attachOscarPeterson(global) {
  "use strict";

  const STORAGE_KEY = "jazz-oscar-peterson-state-v1";
  const TRAINING_ID = "oscar-peterson";
  const RESET_HOUR = 6;
  const EXERCISES = ["1", "2", "3"];

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function fallbackTrainingDayKey(date = new Date()) {
    const shifted = new Date(date.getTime() - RESET_HOUR * 60 * 60 * 1000);
    return `${shifted.getFullYear()}-${pad(shifted.getMonth() + 1)}-${pad(shifted.getDate())}`;
  }

  function trainingDayKey(date = new Date()) {
    return global.JazzDailyProgress?.trainingDayKey(date) || fallbackTrainingDayKey(date);
  }

  function normalizeSnapshot(snapshot, date = new Date()) {
    const day = trainingDayKey(date);
    if (!snapshot || snapshot.day !== day || !Array.isArray(snapshot.completed)) {
      return { day, completed: [] };
    }

    return {
      day,
      completed: EXERCISES.filter((exercise) => snapshot.completed.includes(exercise)),
    };
  }

  function readRaw() {
    try {
      return JSON.parse(global.localStorage?.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function load(date = new Date()) {
    return normalizeSnapshot(readRaw(), date);
  }

  function save(snapshot) {
    global.localStorage?.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }

  function isCompleteSnapshot(snapshot) {
    return EXERCISES.every((exercise) => snapshot.completed.includes(exercise));
  }

  function markExercise(exercise, date = new Date()) {
    if (!EXERCISES.includes(exercise)) return load(date);

    const snapshot = load(date);
    if (!snapshot.completed.includes(exercise)) {
      snapshot.completed.push(exercise);
    }
    save(snapshot);

    if (isCompleteSnapshot(snapshot)) {
      global.JazzDailyProgress?.mark(TRAINING_ID, date);
    }

    return snapshot;
  }

  function elements() {
    return {
      buttons: Array.from(document.querySelectorAll("[data-exercise]")),
      status: document.querySelector("#peterson-status"),
    };
  }

  function render() {
    const snapshot = load();
    const completed = new Set(snapshot.completed);
    const dom = elements();

    dom.buttons.forEach((button) => {
      const done = completed.has(button.dataset.exercise);
      button.disabled = done;
      button.classList.toggle("success", done);
      button.classList.toggle("neutral", !done);
      button.setAttribute("aria-pressed", done ? "true" : "false");
      button.textContent = done ? "完了" : "やった";
    });

    if (dom.status) {
      dom.status.textContent = isCompleteSnapshot(snapshot)
        ? "今日のタスク完了"
        : `${snapshot.completed.length} / ${EXERCISES.length}`;
    }

    if (isCompleteSnapshot(snapshot)) {
      global.JazzDailyProgress?.mark(TRAINING_ID);
    }
  }

  function boot() {
    elements().buttons.forEach((button) => {
      button.addEventListener("click", () => {
        markExercise(button.dataset.exercise);
        render();
      });
    });

    render();
  }

  const api = {
    EXERCISES,
    RESET_HOUR,
    STORAGE_KEY,
    TRAINING_ID,
    fallbackTrainingDayKey,
    isCompleteSnapshot,
    load,
    markExercise,
    normalizeSnapshot,
    trainingDayKey,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.OscarPetersonPractice = api;

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
