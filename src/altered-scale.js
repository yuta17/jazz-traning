(function attachAlteredScale(global) {
  "use strict";

  const ROOTS = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];

  function buildDeck(random = Math.random) {
    const deck = ROOTS.map((root) => `${root}m7`);
    for (let i = deck.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  function boot() {
    const chord = document.querySelector("#altered-chord");
    const progress = document.querySelector("#altered-progress");
    const status = document.querySelector("#altered-status");
    const next = document.querySelector("#altered-next");
    const restart = document.querySelector("#altered-restart");
    let deck;
    let completed;

    function render() {
      const done = completed === deck.length;
      progress.textContent = `${completed} / ${deck.length}`;
      chord.textContent = done ? "" : deck[completed];
      status.hidden = !done;
      next.hidden = done;
      next.disabled = done;
      restart.hidden = !done;
    }

    function start() {
      deck = buildDeck();
      completed = 0;
      render();
    }

    next.addEventListener("click", () => {
      if (completed === deck.length) return;
      completed += 1;
      render();
      if (completed === deck.length) {
        restart.focus();
        try { global.JazzDailyProgress?.mark("altered-scale"); } catch { /* Practice works without storage. */ }
      }
    });
    restart.addEventListener("click", () => { start(); next.focus(); });
    start();
  }

  const api = { ROOTS, buildDeck };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.AlteredScale = api;
  if (typeof document !== "undefined") boot();
})(typeof window !== "undefined" ? window : globalThis);
