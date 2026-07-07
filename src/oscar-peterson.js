(function attachOscarPeterson(global) {
  "use strict";

  const TRAINING_ID = "oscar-peterson";
  const RESET_HOUR = 6;
  const EXERCISES = [
    { id: "1", title: "Oscar Peterson Exercise 1" },
    { id: "2", title: "Oscar Peterson Exercise 2" },
    { id: "3", title: "Oscar Peterson Exercise 3" },
  ];

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

  function hashString(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function exerciseForDay(date = new Date()) {
    const day = trainingDayKey(date);
    const seed = hashString(`${TRAINING_ID}:${day}`);
    return {
      ...EXERCISES[seed % EXERCISES.length],
      day,
      index: seed % EXERCISES.length,
      total: EXERCISES.length,
    };
  }

  function elements() {
    return {
      doneButton: document.querySelector("#peterson-done-button"),
      exerciseTitle: document.querySelector("#peterson-exercise-title"),
    };
  }

  function render() {
    const dom = elements();
    const exercise = exerciseForDay();
    const completed = Boolean(global.JazzDailyProgress?.isComplete(TRAINING_ID));

    dom.exerciseTitle.textContent = exercise.title;
    dom.doneButton.disabled = completed;
    dom.doneButton.setAttribute("aria-pressed", completed ? "true" : "false");
    dom.doneButton.textContent = completed ? "完了済み" : "練習した";
  }

  function markDone() {
    global.JazzDailyProgress?.mark(TRAINING_ID);
    render();
  }

  function boot() {
    const dom = elements();
    dom.doneButton.addEventListener("click", markDone);
    render();
  }

  const api = {
    EXERCISES,
    RESET_HOUR,
    TRAINING_ID,
    exerciseForDay,
    fallbackTrainingDayKey,
    hashString,
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
