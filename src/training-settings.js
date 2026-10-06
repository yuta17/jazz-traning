(function attachTrainingSettings(global) {
  "use strict";
  const STORAGE_KEY = "jazz-training-round-counts-v1";
  const DEFAULTS = { "chord-flash": 24, "key-signature": 12, "two-five-key": 12, "two-five-one": 12 };

  function normalize(value, fallback) {
    return Number.isInteger(value) && value >= 1 && value <= 100 ? value : fallback;
  }

  function load() {
    let saved;
    try { saved = JSON.parse(global.localStorage?.getItem(STORAGE_KEY) || "{}"); } catch { saved = {}; }
    return Object.fromEntries(Object.entries(DEFAULTS).map(([id, count]) => [id, normalize(saved?.[id], count)]));
  }

  function getCount(id) { return load()[id]; }

  function save(counts) {
    const clean = {};
    for (const id of Object.keys(DEFAULTS)) {
      if (normalize(counts[id], null) === null) throw new Error("出題数は1〜100の整数で入力してください。");
      clean[id] = counts[id];
    }
    try {
      if (!global.localStorage) throw new Error();
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch {
      throw new Error("保存できませんでした。ブラウザのデータ保存設定を確認してください。");
    }
    return clean;
  }

  const api = { DEFAULTS, STORAGE_KEY, load, save, getCount };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.TrainingSettings = api;
})(typeof window !== "undefined" ? window : globalThis);
