(function attachAllTheThingsYouAre(global) {
  "use strict";

  const TRAINING_ID = "all-the-things-you-are";
  const RESET_HOUR = 6;
  const KEYS = [
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
    "F",
    "G♭",
    "G",
    "A♭",
    "A",
    "B♭",
    "B",
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

  function dayNumber(day) {
    const [year, month, date] = day.split("-").map(Number);
    return Math.floor(Date.UTC(year, month - 1, date) / 86400000);
  }

  function hashString(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seed) {
    let state = seed >>> 0;
    return function random() {
      state += 0x6d2b79f5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffledKeys(cycle) {
    const result = [...KEYS];
    const random = seededRandom(hashString(`${TRAINING_ID}:${cycle}`));

    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }

    return result;
  }

  function keyForDay(date = new Date()) {
    const day = trainingDayKey(date);
    const number = dayNumber(day);
    const cycle = Math.floor(number / KEYS.length);
    const position = ((number % KEYS.length) + KEYS.length) % KEYS.length;

    return {
      day,
      key: shuffledKeys(cycle)[position],
      position,
      total: KEYS.length,
    };
  }

  function elements() {
    return {
      doneButton: document.querySelector("#all-things-done-button"),
      key: document.querySelector("#all-things-key"),
    };
  }

  function render() {
    const dom = elements();
    const task = keyForDay();
    const completed = Boolean(global.JazzDailyProgress?.isComplete(TRAINING_ID));

    dom.key.textContent = task.key;
    dom.doneButton.disabled = completed;
    dom.doneButton.setAttribute("aria-pressed", completed ? "true" : "false");
    dom.doneButton.textContent = completed ? "完了済み" : "弾けた";
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
    KEYS,
    RESET_HOUR,
    TRAINING_ID,
    dayNumber,
    fallbackTrainingDayKey,
    hashString,
    keyForDay,
    seededRandom,
    shuffledKeys,
    trainingDayKey,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.AllTheThingsYouArePractice = api;

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
