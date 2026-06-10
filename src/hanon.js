(function attachHanon(global) {
  "use strict";

  const STORAGE_KEY = "jazz-hanon-today-v1";
  const HANON_NUMBERS = [1, 2, 3, 4, 5];

  function dateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function shuffle(items, random = Math.random) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function uniqueValidNumbers(items) {
    const seen = new Set();
    return (Array.isArray(items) ? items : []).filter((item) => {
      const valid = HANON_NUMBERS.includes(item) && !seen.has(item);
      seen.add(item);
      return valid;
    });
  }

  function normalizeState(raw) {
    return {
      date: typeof raw?.date === "string" ? raw.date : "",
      current: HANON_NUMBERS.includes(raw?.current) ? raw.current : null,
      queue: uniqueValidNumbers(raw?.queue),
      history: Array.isArray(raw?.history) ? raw.history.slice(0, 10) : [],
    };
  }

  function createQueue(previous, random = Math.random) {
    const queue = shuffle(HANON_NUMBERS, random);
    if (queue.length > 1 && queue[0] === previous) {
      [queue[0], queue[1]] = [queue[1], queue[0]];
    }
    return queue;
  }

  function assignForDate(rawState, targetDate = dateKey(), random = Math.random) {
    const state = normalizeState(rawState);
    if (state.date === targetDate && state.current) return state;

    const queue = state.queue.length > 0
      ? state.queue.slice()
      : createQueue(state.current, random);
    const current = queue.shift();
    const history = state.current
      ? [{ date: state.date, number: state.current }, ...state.history].slice(0, 10)
      : state.history;

    return {
      date: targetDate,
      current,
      queue,
      history,
    };
  }

  function loadState() {
    try {
      return JSON.parse(global.localStorage?.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveState(state) {
    global.localStorage?.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function render(state) {
    const date = document.querySelector("#hanon-date");
    const number = document.querySelector("#hanon-number");
    const cycle = document.querySelector("#hanon-cycle");
    const history = document.querySelector("#hanon-history");

    date.textContent = state.date;
    number.textContent = state.current;
    cycle.textContent = `サイクル ${HANON_NUMBERS.length - state.queue.length} / ${HANON_NUMBERS.length}`;
    history.innerHTML = state.history.length
      ? state.history.map((item) => `<li><span>${item.date}</span><strong>番号 ${item.number}</strong></li>`).join("")
      : `<li class="empty-row">まだ履歴はありません</li>`;
  }

  function boot() {
    const state = assignForDate(loadState(), dateKey());
    saveState(state);
    render(state);
  }

  const api = {
    HANON_NUMBERS,
    assignForDate,
    createQueue,
    dateKey,
    shuffle,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.HanonToday = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
