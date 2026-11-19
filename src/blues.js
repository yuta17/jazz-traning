(function (global) {
  "use strict";
  // Durations and positions use eighth-note units. null is a written rest.
  const note = (pitch, duration = 1) => ({ pitch, duration });
  const accent = (pitch, duration = 1) => ({ ...note(pitch, duration), accent: true });
  const clip = (pitch, duration = 1) => ({ ...note(pitch, duration), staccato: true });
  const hold = (pitch, duration) => ({ ...note(pitch, duration), tie: true });
  const LESSONS = {
    one: { bars: 1, call: [
      [note(null), accent(7), note(10), note(7), clip(5, 2), note(null, 2)],
    ], responses: [
      { label: "リズムを残して、音を変える", hint: "Callと同じリズムで、少し低い音へ。音の長さとアクセントを残して答えます。", phrase: [
        [note(null), accent(5), note(7), note(5), clip(3, 2), note(null, 2)],
      ] },
      { label: "音を残して、リズムを変える", hint: "5度・♭7度・5度・4度の順はそのまま。頭から長めに入り、間とアクセントの位置を変えます。", phrase: [
        [note(7, 2), note(null), accent(10), note(7), note(5, 2), note(null)],
      ] },
      { label: "最後の着地点を変える", hint: "Callの入口はそのまま引用し、最後だけ4度からルートへ変えて収めます。", phrase: [
        [note(null), accent(7), note(10), note(7), clip(0, 2), note(null, 2)],
      ] },
      { label: "音数を減らして、間を作る", hint: "5度とルートの2音だけで答えます。休符の間も拍を感じ、次の音を急がず待ちます。", phrase: [
        [note(null, 2), accent(7), note(0, 2), note(null, 3)],
      ] },
      { label: "一部を引用して、続きを作る", hint: "5度→♭7度を借りて、高いルートへ展開。Callのリフを別の続きに育てます。", phrase: [
        [note(null), note(7), accent(10), note(12), note(10), note(7, 2), note(null)],
      ] },
    ] },
    two: { bars: 2, call: [
      [note(null), note(7), accent(10), note(7), clip(5), note(null), note(7), accent(10)],
      [note(12, 2), clip(10), note(7), accent(10, 2), note(null, 2)],
    ], responses: [
      { label: "リズムを残して、音を変える", hint: "Callのリズムと短い音を残して、少し低い音域へ。2小節目末の♭3度まで、ひと息で答えます。", phrase: [
        [note(null), note(5), accent(7), note(5), clip(3), note(null), note(5), accent(7)],
        [note(10, 2), clip(7), note(5), accent(3, 2), note(null, 2)],
      ] },
      { label: "音を残して、リズムを変える", hint: "音の順を変えず、頭から入って長さと間を変えます。小節線を越える高いルートを長めに伸ばします。", phrase: [
        [note(7, 2), note(null), accent(10), note(7), note(5), note(7), accent(10)],
        [note(12, 3), clip(10), note(7), accent(10), note(null, 2)],
      ] },
      { label: "最後の着地点を変える", hint: "Callのリフを引き継ぎ、最後の♭7度だけルートへ置き換えます。同じ話の終わり方を変えて聴き比べます。", phrase: [
        [note(null), note(7), accent(10), note(7), clip(5), note(null), note(7), accent(10)],
        [note(12, 2), clip(10), note(7), accent(0, 2), note(null, 2)],
      ] },
      { label: "音数を減らして、間を作る", hint: "5度・♭7度・ルートに絞ります。♭7度はタイで次の小節まで伸ばし、最後の2拍は空けて答えます。", phrase: [
        [note(null), accent(7, 2), note(null), hold(10, 4)],
        [note(10, 2), note(0, 2), note(null, 4)],
      ] },
      { label: "一部を引用して、続きを作る", hint: "Call前半のリフを引用し、途中から高いルート・♭3度へ広げます。最後は5度で結び、別の続きにします。", phrase: [
        [note(null), note(7), accent(10), note(7), clip(5), note(null), note(7), accent(12)],
        [note(15, 2), note(12), note(10), accent(7, 2), note(null, 2)],
      ] },
    ] },
  };
  const KEYS = {
    C: { root: 60, scale: "C · E♭ · F · G♭ · G · B♭", abc: {0:"C",3:"_E",5:"F",6:"_G",7:"=G",10:"_B",12:"c",15:"_e"} },
    F: { root: 65, scale: "F · A♭ · B♭ · C♭ · C · E♭", abc: {0:"F",3:"_A",5:"_B",6:"_c",7:"=c",10:"_e",12:"f",15:"_a"} },
  };
  function swing(eighths) {
    return Math.floor(eighths / 2) + (eighths % 2 ? 2 / 3 : 0);
  }
  function events(phrase) {
    const timeline = [];
    let position = 0;
    phrase.flat().forEach(event => {
      const previous = timeline.at(-1);
      if (previous?.tie) {
        previous.duration += event.duration;
        if (event.tie) previous.tie = true;
        else delete previous.tie;
      } else timeline.push({ ...event, position });
      position += event.duration;
    });
    return timeline;
  }
  function createPlan(lesson, mode, responseIndex = 0) {
    const beats = lesson.bars * 4;
    const call = { kind: "call", part: 0, start: 0, notes: events(lesson.call) };
    const response = { kind: "response", part: 1, start: 0, notes: events(lesson.responses[responseIndex].phrase) };
    if (mode === "call") return { beats, segments: [call] };
    if (mode === "response") return { beats, segments: [response] };
    if (mode === "compare") return { beats: beats * 2, segments: [call, { ...response, start: beats }] };
    if (mode === "sing" || mode === "play") {
      return { beats: beats * 2, segments: [call, { kind: mode, part: null, start: beats, notes: [] }] };
    }
    throw new Error(`Unknown playback mode: ${mode}`);
  }
  function score(key, part, lessonId = "one", responseIndex = 0) {
    const lesson = LESSONS[lessonId];
    const phrase = part ? lesson.responses[responseIndex].phrase : lesson.call;
    const flat = phrase.flat();
    const first = flat.findIndex(event => event.pitch !== null);
    const last = flat.findLastIndex(event => event.pitch !== null);
    let index = 0;
    const bars = phrase.map(bar => {
      let position = 0;
      return bar.map(event => {
        const gap = position % 2 === 0 || event.duration !== 1 ? " " : "";
        position += event.duration;
        const open = lesson.bars === 2 && index === first ? "(" : "";
        const close = lesson.bars === 2 && index === last ? ")" : "";
        index++;
        return gap + open + (event.accent ? "!accent!" : "") + (event.staccato ? "." : "")
          + (event.pitch === null ? "z" : KEYS[key].abc[event.pitch])
          + (event.duration === 1 ? "" : event.duration) + (event.tie ? "-" : "") + close;
      }).join("").trim();
    });
    return `X:1\nT:${part ? "Response" : "Call"} · ${lesson.bars}小節\nM:4/4\nL:1/8\nK:C\n${bars.join(" | ")} |]`;
  }
  const api = { LESSONS, KEYS, events, swing, createPlan, score };
  if (typeof module !== "undefined") module.exports = api;
  global.Blues = api;
  if (typeof document === "undefined") return;
  const $ = id => document.getElementById(`blues-${id}`);
  const steps = ["listen", "sing", "play", "example"];
  let step = "listen", responseIndex = 0, scoreVisible = false;
  let context, timer, frame, playing = false, generation = 0, visuals = [];
  let nodes = [];
  const lesson = () => LESSONS[$("length").value];
  function renderScores() {
    if (!scoreVisible) return;
    visuals = ["call", "response"].map((id, part) => global.ABCJS.renderAbc(`blues-${id}`, score($("key").value, part, $("length").value, responseIndex), {
      staffwidth: lesson().bars === 1 ? 480 : 850, paddingtop: 10, paddingleft: 20, paddingright: 20, add_classes: true,
    })[0]);
    visuals.forEach(visual => visual.setTiming(120, 0));
    document.querySelectorAll(".blues-score svg").forEach(svg => {
      svg.setAttribute("viewBox", `0 0 ${svg.getAttribute("width")} ${svg.getAttribute("height")}`);
    });
    $("scores").classList.toggle("single-bar", lesson().bars === 1);
  }
  function populateChoices() {
    $("choices").replaceChildren(...lesson().responses.map((response, index) => {
      const label = document.createElement("label");
      label.className = "blues-choice";
      const radio = document.createElement("input");
      radio.type = "radio"; radio.name = "response"; radio.value = index;
      radio.checked = responseIndex === index;
      const text = document.createElement("span");
      text.textContent = response.label;
      label.append(radio, text);
      return label;
    }));
  }
  function render() {
    steps.forEach(id => {
      const active = step === id;
      $(id + "-panel").hidden = !active;
      const tab = $("step-" + id);
      if (active) tab.setAttribute("aria-current", "step");
      else tab.removeAttribute("aria-current");
    });
    $("scale").textContent = `${$("key").value}：${KEYS[$("key").value].scale}`;
    $("length-label").textContent = `Call ${lesson().bars}小節 → 自分のResponse ${lesson().bars}小節`;
    $("choices").querySelectorAll("input").forEach(radio => { radio.checked = Number(radio.value) === responseIndex; });
    $("hint").textContent = lesson().responses[responseIndex].hint;
    $("scores").hidden = !scoreVisible;
    $("score-toggle").textContent = scoreVisible ? "譜面を隠す" : "譜面を見る";
    $("score-toggle").setAttribute("aria-expanded", String(scoreVisible));
    renderScores();
  }
  function highlight(part, position) {
    document.querySelectorAll(".is-current").forEach(n => n.classList.remove("is-current"));
    ["call", "response"].forEach((id, index) => $(id).classList.toggle("is-playing", part === index));
    if (part === null || !scoreVisible) return;
    const event = visuals[part]?.noteTimings?.find(n => n.type === "event" && Math.abs(n.milliseconds - position * 250) < 1);
    event?.elements?.flat().forEach(n => n?.classList?.add("is-current"));
  }
  function stop(message = "停止しました。") {
    generation++; playing = false;
    clearTimeout(timer); cancelAnimationFrame(frame);
    nodes.slice().forEach(node => { try { node.stop(); } catch {} });
    highlight(null); $("stop").disabled = true;
    $("status").textContent = message; $("beat").textContent = "";
  }
  function setStep(next) {
    stop(""); step = next;
    // Returning to practice puts the reference away again.
    if (next !== "example") scoreVisible = false;
    render();
  }
  function tone(freq, when, duration, volume, click = false) {
    const osc = context.createOscillator(), gain = context.createGain();
    osc.type = click ? "sine" : "triangle"; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(volume, when + Math.min(0.005, duration / 4));
    if (!click) gain.gain.exponentialRampToValueAtTime(volume * 0.75, when + duration - Math.min(0.012, duration / 8));
    gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
    osc.connect(gain); gain.connect(context.destination);
    osc.start(when); osc.stop(when + duration);
    nodes.push(osc);
    osc.onended = () => { osc.disconnect(); gain.disconnect(); nodes = nodes.filter(n => n !== osc); };
  }
  function cycle(mode, start, beat, countIn) {
    const plan = createPlan(lesson(), mode, responseIndex);
    const melodyStart = start + (countIn ? 4 * beat : 0);
    const end = melodyStart + plan.beats * beat;
    const root = KEYS[$("key").value].root;
    for (let i = 0; i < plan.beats + (countIn ? 4 : 0); i++) tone(i % 4 ? 1000 : 1400, start + i * beat, 0.045, 0.055, true);
    plan.segments.forEach(segment => segment.notes.forEach(event => {
      if (event.pitch === null) return;
      const onset = segment.start + swing(event.position);
      const duration = (swing(event.position + event.duration) - swing(event.position)) * beat;
      tone(440 * 2 ** ((root + event.pitch - 69) / 12), melodyStart + onset * beat,
        duration * (event.staccato ? 0.5 : 1), event.accent ? 0.2 : 0.14);
    }));
    function animate() {
      if (!playing) return;
      const elapsed = (context.currentTime - melodyStart) / beat;
      if (elapsed < 0) {
        highlight(null); $("status").textContent = "カウント";
        $("beat").textContent = `${Math.max(1, Math.floor(elapsed + 4) + 1)} / 4`;
      } else if (elapsed < plan.beats) {
        const segment = plan.segments.findLast(s => elapsed >= s.start);
        const local = elapsed - segment.start;
        const event = segment.notes.find(n => local >= swing(n.position) && local < swing(n.position + n.duration));
        highlight(segment.part, event?.pitch === null ? -1 : event?.position ?? -1);
        $("status").textContent = { call: "Call：聴いて覚える", sing: "あなたの番：歌う", play: "あなたの番：鍵盤で弾く", response: "Response：お手本" }[segment.kind];
        $("beat").textContent = `${Math.floor(local / 4) + 1} / ${lesson().bars}小節 · ${Math.floor(local % 4) + 1}拍`;
      }
      frame = global.requestAnimationFrame(animate);
    }
    animate();
    timer = global.setTimeout(() => {
      cancelAnimationFrame(frame);
      if ((mode === "sing" || mode === "play") && $("loop").checked && playing) cycle(mode, Math.max(end, context.currentTime + 0.03), beat, false);
      else {
        stop(mode === "sing" ? "歌った答えを、次は鍵盤で探してみましょう。" : mode === "play" ? "自分の答えを弾けましたか？ 必要ならお手本を確認できます。" : "再生が終わりました。");
        if (mode === "call" && step === "listen") {
          step = "sing"; render();
          $("status").textContent = "同じCallに、まずは2〜3音で歌って答えてみましょう。";
        }
      }
    }, Math.max(0, (end - context.currentTime) * 1000));
  }
  async function play(mode) {
    stop("");
    const tempo = Number($("tempo").value);
    if (!Number.isFinite(tempo) || tempo < 40 || tempo > 240) { $("status").textContent = "テンポは40〜240 BPMで指定できます。"; return; }
    const token = generation;
    $("stop").disabled = false;
    try {
      context ||= new (global.AudioContext || global.webkitAudioContext)();
      await context.resume();
      if (token !== generation) return;
      playing = true; cycle(mode, context.currentTime + 0.1, 60 / tempo, true);
    } catch { stop("音声を開始できませんでした。ブラウザの音声設定を確認して再生をお試しください。"); }
  }
  document.querySelectorAll("[data-step]").forEach(button => button.addEventListener("click", () => setStep(button.dataset.step)));
  document.querySelectorAll("[data-play]").forEach(button => button.addEventListener("click", () => play(button.dataset.play)));
  $("stop").addEventListener("click", () => stop());
  $("choices").addEventListener("change", event => {
    if (event.target.name !== "response") return;
    stop(""); responseIndex = Number(event.target.value); render();
  });
  $("score-toggle").addEventListener("click", () => {
    scoreVisible = !scoreVisible; render();
  });
  ["length", "key"].forEach(id => $(id).addEventListener("change", () => {
    stop("設定を変更しました。同じCallを聴くところから始めましょう。");
    step = "listen"; responseIndex = 0; scoreVisible = false; visuals = []; populateChoices(); render();
  }));
  $("tempo").addEventListener("change", () => stop("テンポを変更しました。"));
  $("done").addEventListener("click", () => {
    stop("");
    try { global.JazzDailyProgress?.mark("blues"); } catch {}
    $("status").textContent = "今日のBlues練習を記録しました。";
  });
  global.addEventListener("pagehide", () => stop());
  if (!global.ABCJS) {
    $("status").textContent = "譜面の読み込みに失敗しました。ページを再読み込みすると確認できます。";
    document.querySelectorAll("[data-play]").forEach(button => { button.disabled = true; });
    return;
  }
  populateChoices();
  render();
})(typeof window !== "undefined" ? window : globalThis);
