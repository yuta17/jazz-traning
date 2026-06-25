(function attachStandardSightReading(global) {
  "use strict";

  const TRAINING_ID = "standard-sight-reading";
  const RESET_HOUR = 6;

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

  function songs() {
    return global.JazzStandardSongs?.STANDARD_SONGS || [];
  }

  function songForDay(date = new Date()) {
    const source = songs();
    if (!source.length) return null;

    const seed = hashString(`standard-sight-reading:${trainingDayKey(date)}`);
    return {
      ...source[seed % source.length],
      index: seed % source.length,
      day: trainingDayKey(date),
      total: source.length,
    };
  }

  function elements() {
    return {
      panel: document.querySelector("#standard-song-panel"),
      doneButton: document.querySelector("#standard-done-button"),
    };
  }

  function render() {
    const dom = elements();
    const song = songForDay();
    const completed = global.JazzDailyProgress?.isComplete(TRAINING_ID);

    if (!song) {
      dom.panel.innerHTML = `
        <div class="ready-state">
          <strong>未読込</strong>
        </div>
      `;
      dom.doneButton.disabled = true;
      return;
    }

    dom.panel.innerHTML = `
      <div class="standard-song">
        <span class="standard-song-label">今日の1曲</span>
        <strong>${song.title}</strong>
        <p>${song.composer}</p>
        <small>${song.total}曲から選曲</small>
      </div>
    `;

    dom.doneButton.disabled = Boolean(completed);
    dom.doneButton.textContent = completed ? "完了済み" : "弾いた";
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
    TRAINING_ID,
    fallbackTrainingDayKey,
    hashString,
    songForDay,
    trainingDayKey,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.StandardSightReading = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
