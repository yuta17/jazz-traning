(function attachHanon(global) {
  "use strict";

  const TRAINING_ID = "hanon";
  const HANON_NUMBERS = [1, 2, 3, 4, 5];

  function pickNumber(random = Math.random) {
    const index = Math.min(
      HANON_NUMBERS.length - 1,
      Math.floor(random() * HANON_NUMBERS.length),
    );
    return HANON_NUMBERS[index];
  }

  function render(number) {
    document.querySelector("#hanon-number").textContent = number;
  }

  function renderDoneButton() {
    const button = document.querySelector("#hanon-done-button");
    const completed = Boolean(global.JazzDailyProgress?.isComplete(TRAINING_ID));
    button.disabled = completed;
    button.setAttribute("aria-pressed", completed ? "true" : "false");
    button.textContent = completed ? "完了済み" : "練習した";
  }

  function markDone() {
    global.JazzDailyProgress?.mark(TRAINING_ID);
    renderDoneButton();
  }

  function boot() {
    render(pickNumber());
    document.querySelector("#hanon-done-button").addEventListener("click", markDone);
    renderDoneButton();
  }

  const api = {
    HANON_NUMBERS,
    TRAINING_ID,
    pickNumber,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.HanonNumber = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
