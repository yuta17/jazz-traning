(function () {
  "use strict";
  const settings = window.TrainingSettings;
  const form = document.querySelector("#round-settings-form");
  const status = document.querySelector("#settings-status");
  function fill(counts) {
    for (const [id, count] of Object.entries(counts)) form.elements.namedItem(id).value = count;
  }
  fill(settings.load());
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const counts = Object.fromEntries(Object.keys(settings.DEFAULTS).map((id) => [id, Number(form.elements.namedItem(id).value)]));
    try {
      settings.save(counts);
      status.textContent = "保存しました。次のスタートから反映されます。";
    } catch (error) { status.textContent = error.message; }
  });
  form.addEventListener("input", () => { status.textContent = "未保存の変更があります。"; });
  document.querySelector("#settings-reset").addEventListener("click", () => {
    try {
      fill(settings.save(settings.DEFAULTS));
      status.textContent = "初期値に戻して保存しました。";
    } catch (error) { status.textContent = error.message; }
  });
})();
