(function attachDailyProgress(global) {
  "use strict";

  const STORAGE_KEY = "jazz-training-daily-progress-v1";
  const RESET_HOUR = 6;
  const TRAINING_IDS = [
    "hanon",
    "chord-flash",
    "two-five-one",
    "recognition",
    "sight-reading",
  ];

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function trainingDayKey(date = new Date()) {
    const shifted = new Date(date.getTime() - RESET_HOUR * 60 * 60 * 1000);
    return `${shifted.getFullYear()}-${pad(shifted.getMonth() + 1)}-${pad(shifted.getDate())}`;
  }

  function normalizeSnapshot(snapshot, date = new Date()) {
    const day = trainingDayKey(date);
    if (!snapshot || snapshot.day !== day || typeof snapshot.completed !== "object") {
      return { day, completed: {} };
    }

    return {
      day,
      completed: TRAINING_IDS.reduce((completed, id) => {
        if (snapshot.completed[id]) completed[id] = true;
        return completed;
      }, {}),
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

  function mark(trainingId, date = new Date()) {
    if (!TRAINING_IDS.includes(trainingId)) return load(date);

    const snapshot = load(date);
    snapshot.completed[trainingId] = true;
    save(snapshot);
    return snapshot;
  }

  function isComplete(trainingId, date = new Date()) {
    return Boolean(load(date).completed[trainingId]);
  }

  function renderHome(root = global.document) {
    if (!root) return;

    const snapshot = load();
    root.querySelectorAll("[data-training-id]").forEach((card) => {
      const done = Boolean(snapshot.completed[card.dataset.trainingId]);
      card.classList.toggle("completed", done);

      let check = card.querySelector(".home-check");
      if (!check) {
        check = root.createElement("span");
        check.className = "home-check";
        check.setAttribute("aria-label", "今日実施済み");
        check.textContent = "✓";
        card.appendChild(check);
      }

      check.hidden = !done;
    });
  }

  const api = {
    RESET_HOUR,
    STORAGE_KEY,
    TRAINING_IDS,
    isComplete,
    load,
    mark,
    normalizeSnapshot,
    renderHome,
    trainingDayKey,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.JazzDailyProgress = api;

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => renderHome());
    } else {
      renderHome();
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
