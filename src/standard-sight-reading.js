(function attachStandardSightReading(global) {
  "use strict";

  const HISTORY_KEY = "jazz-standard-random-history";
  const HISTORY_LIMIT = 10;
  const EXCLUSION_LIMIT = 5;
  const CATEGORY_LABELS = {
    priority31: "最優先31曲",
    next47: "次の47曲",
    fourHit76: "4 hitの76曲",
  };

  let activeCategory = null;
  let history = [];

  function randomSong(songs, excludedTitles = [], random = Math.random) {
    if (!songs.length) return null;

    const excluded = new Set(excludedTitles);
    const available = songs.filter((song) => !excluded.has(song));
    const pool = available.length ? available : songs;
    return pool[Math.floor(random() * pool.length)];
  }

  function recentTitlesForCategory(category, sourceHistory = history) {
    return sourceHistory
      .filter((item) => item.category === category)
      .slice(0, EXCLUSION_LIMIT)
      .map((item) => item.title);
  }

  function loadHistory(storage = global.localStorage) {
    try {
      const stored = JSON.parse(storage?.getItem(HISTORY_KEY) || "[]");
      if (!Array.isArray(stored)) return [];
      return stored
        .filter((item) => item && CATEGORY_LABELS[item.category] && typeof item.title === "string")
        .slice(0, HISTORY_LIMIT);
    } catch (_error) {
      return [];
    }
  }

  function saveHistory(storage = global.localStorage) {
    try {
      storage?.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (_error) {
      // The picker still works when storage is unavailable or full.
    }
  }

  function elements() {
    return {
      categoryButtons: [...document.querySelectorAll("[data-category]")],
      panel: document.querySelector("#standard-song-panel"),
      title: document.querySelector("#standard-song-title"),
      category: document.querySelector("#standard-song-category"),
      redrawButton: document.querySelector("#standard-redraw-button"),
      historyList: document.querySelector("#standard-history-list"),
    };
  }

  function renderHistory() {
    const list = elements().historyList;
    list.replaceChildren();

    if (!history.length) {
      const empty = document.createElement("li");
      empty.className = "standard-history-empty";
      empty.textContent = "まだ履歴はありません";
      list.append(empty);
      return;
    }

    history.forEach((item) => {
      const entry = document.createElement("li");
      const title = document.createElement("strong");
      const category = document.createElement("span");
      title.textContent = item.title;
      category.textContent = CATEGORY_LABELS[item.category];
      entry.append(title, category);
      list.append(entry);
    });
  }

  function animatePanel(panel) {
    panel.classList.remove("is-changing");
    void panel.offsetWidth;
    panel.classList.add("is-changing");
  }

  function draw(category = activeCategory, random = Math.random) {
    const source = global.JazzStandards?.[category] || [];
    if (!source.length) return null;

    activeCategory = category;
    const song = randomSong(source, recentTitlesForCategory(category), random);
    history = [{ title: song, category }, ...history].slice(0, HISTORY_LIMIT);
    saveHistory();

    const dom = elements();
    dom.title.textContent = song;
    dom.category.textContent = CATEGORY_LABELS[category];
    dom.redrawButton.disabled = false;
    dom.categoryButtons.forEach((button) => {
      const selected = button.dataset.category === category;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    animatePanel(dom.panel);
    renderHistory();
    return song;
  }

  function handleShortcut(event) {
    if (!activeCategory || ![" ", "Enter"].includes(event.key)) return;
    if (event.target.closest("button, a, input, textarea, select")) return;
    event.preventDefault();
    draw();
  }

  function boot() {
    history = loadHistory();
    const dom = elements();
    dom.categoryButtons.forEach((button) => {
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => draw(button.dataset.category));
    });
    dom.redrawButton.addEventListener("click", () => draw());
    document.addEventListener("keydown", handleShortcut);
    renderHistory();
  }

  const api = {
    CATEGORY_LABELS,
    EXCLUSION_LIMIT,
    HISTORY_KEY,
    HISTORY_LIMIT,
    loadHistory,
    randomSong,
    recentTitlesForCategory,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.StandardSightReading = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
