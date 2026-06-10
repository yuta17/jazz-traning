(function attachHanon(global) {
  "use strict";

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

  function boot() {
    render(pickNumber());
    global.JazzDailyProgress?.mark("hanon");
  }

  const api = {
    HANON_NUMBERS,
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
