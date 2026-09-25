(function attachHanon(global) {
  "use strict";

  const TRAINING_ID = "hanon";
  const HANON_NUMBERS = [1, 2, 3, 4, 5];

  const HANON_VIDEOS = {
    1: "7eid_ywuSVE",
    2: "i-dc3Ur6YEo",
    3: "YDXzwhnF1Ck",
    4: "goz5fFA3BOg",
    5: "aDRS-08ckUM",
  };

  function pickNumber(random = Math.random) {
    const index = Math.min(
      HANON_NUMBERS.length - 1,
      Math.floor(random() * HANON_NUMBERS.length),
    );
    return HANON_NUMBERS[index];
  }

  function render(number) {
    document.querySelector("#hanon-number").textContent = number;
    const videoId = HANON_VIDEOS[number];
    const player = document.querySelector("#hanon-video");
    player.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
    player.title = `ハノン第${number}番の参考動画`;
    const link = document.querySelector("#hanon-video-link");
    link.href = `https://www.youtube.com/watch?v=${videoId}`;
    link.textContent = `ハノン第${number}番をYouTubeで見る`;

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
    HANON_VIDEOS,
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
