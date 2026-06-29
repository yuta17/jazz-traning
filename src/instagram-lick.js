(function attachInstagramLick(global) {
  "use strict";

  const TRAINING_ID = "instagram-lick";
  const RESET_HOUR = 6;
  const EAR_COPY_SONGS = [
    {
      id: "so-what",
      title: "So What",
      artist: "Miles Davis",
      youtubeUrl: "https://www.youtube.com/watch?v=ylXk1LBvIqU",
    },
    {
      id: "blue-monk",
      title: "Blue Monk",
      artist: "Thelonious Monk",
      youtubeUrl: "https://www.youtube.com/watch?v=yHKl0euhZI0",
    },
    {
      id: "c-jam-blues",
      title: "C Jam Blues",
      artist: "Duke Ellington",
      youtubeUrl: "https://www.youtube.com/watch?v=dLrC-BZiFuA",
    },
    {
      id: "nows-the-time",
      title: "Now's The Time",
      artist: "Charlie Parker",
      youtubeUrl: "https://www.youtube.com/watch?v=0f3zsTtj2Sg",
    },
    {
      id: "autumn-leaves",
      title: "Autumn Leaves",
      artist: "Cannonball Adderley",
      youtubeUrl: "https://www.youtube.com/watch?v=CpB7-8SGlJ0",
    },
  ];

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

  function songForDay(date = new Date()) {
    const seed = hashString(`${TRAINING_ID}:${trainingDayKey(date)}`);
    return {
      ...EAR_COPY_SONGS[seed % EAR_COPY_SONGS.length],
      day: trainingDayKey(date),
      index: seed % EAR_COPY_SONGS.length,
      total: EAR_COPY_SONGS.length,
    };
  }

  function elements() {
    return {
      panel: document.querySelector("#instagram-lick-panel"),
      doneButton: document.querySelector("#instagram-lick-done-button"),
    };
  }

  function render() {
    const dom = elements();
    const song = songForDay();
    const completed = Boolean(global.JazzDailyProgress?.isComplete(TRAINING_ID));

    dom.panel.innerHTML = `
      <span class="instagram-song-label">今日の1曲</span>
      <strong>${song.title}</strong>
      <p>${song.artist}</p>
      <a
        class="instagram-youtube-link"
        href="${song.youtubeUrl}"
        target="_blank"
        rel="noopener noreferrer"
      >
        YouTubeを開く
      </a>
    `;

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
    EAR_COPY_SONGS,
    TRAINING_ID,
    fallbackTrainingDayKey,
    hashString,
    songForDay,
    trainingDayKey,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.InstagramLick = api;

  if (typeof document !== "undefined") {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
