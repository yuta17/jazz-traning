(function attachInstagramLick(global) {
  "use strict";

  const TRAINING_ID = "instagram-lick";

  function elements() {
    return {
      doneButton: document.querySelector("#instagram-lick-done-button"),
    };
  }

  function render() {
    const dom = elements();
    const completed = Boolean(global.JazzDailyProgress?.isComplete(TRAINING_ID));

    dom.doneButton.disabled = completed;
    dom.doneButton.setAttribute("aria-pressed", completed ? "true" : "false");
    dom.doneButton.textContent = "弾けた";
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
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.InstagramLick = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
