(function (global) {
  "use strict";
  // Durations are in eighth-note units; null is a written and silent rest.
  const note = (pitch, duration = 1) => ({ pitch, duration });
  const hold = (pitch, duration) => ({ ...note(pitch, duration), tie: true });
  const PATTERNS = {
    one: { label: "1拍待って答える", bars: 1, explanation: "Callの5度・4度の響きを受けて、Responseは1拍待って4度から入ります。4度→ブルーノート→♭3度と形を変え、裏拍から伸ばすルートで答えます。", phrases: [
      [note(null, 1), note(7), note(10), note(7), note(5, 2), note(null, 2)],
      [note(null, 2), note(5), note(6), note(3), note(0, 2), note(null, 1)],
    ] },
  };
  Object.assign(PATTERNS, {
    "one-turn": { label: "下降に上昇で答える", bars: 1,
      explanation: "Callは♭7度から4度へ下降。Responseは低い♭3度から5度へ上がり、音の向きを反転させます。共通の4度・5度でつなぎ、ルートへ着地します。",
      phrases: [
        [note(10), note(7), note(6), note(5, 3), note(null, 2)],
        [note(null, 1), note(3), note(5), note(7), note(0, 2), note(null, 2)],
      ] },
    "one-repeat": { label: "同音の問いをほどく", bars: 1,
      explanation: "Callは同じ5度を繰り返し、♭7度へ跳ねます。Responseは5度を一度だけ受け取り、ブルーノートを通る下降に変えてルートを伸ばします。",
      phrases: [
        [note(7), note(7), note(null, 1), note(7), note(10, 2), note(null, 2)],
        [note(7, 2), note(6), note(5), note(3), note(0, 2), note(null, 1)],
      ] },
  });
  Object.assign(PATTERNS, {
    "one-register": { label: "高い問いを低く受ける", bars: 1,
      explanation: "Callは高いルートを裏拍で拾い、5度へ下がります。Responseは低い♭3度を長めに置いて音域を変え、5度まで持ち上げて低いルートで答えます。",
      phrases: [
        [note(null, 1), note(12), note(10), note(7), note(10, 2), note(null, 2)],
        [note(3, 2), note(5), note(6), note(7), note(0, 2), note(null, 1)],
      ] },
    "one-held": { label: "伸ばした問いを細かく返す", bars: 1,
      explanation: "Callは4度を付点4分で伸ばし、ブルーノートから5度へ。Responseは裏拍から5度を受け、短い下降でルートへほどきます。長さの違いを聴き分けます。",
      phrases: [
        [note(5, 3), note(6), note(7, 2), note(null, 2)],
        [note(null, 1), note(7), note(6), note(5), note(3), note(0, 2), note(null, 1)],
      ] },
    "one-compress": { label: "走る問いに短く答える", bars: 1,
      explanation: "Callは裏拍から8分音符で上がります。Responseは到達点より低い5度を長めに受け、♭3度とルートの3音に絞って落ち着かせます。",
      phrases: [
        [note(null, 1), note(3), note(5), note(6), note(7), note(10), note(null, 2)],
        [note(7, 2), note(3), note(0, 3), note(null, 2)],
      ] },
    "one-expand": { label: "2音の問いを広げる", bars: 1,
      explanation: "Callは♭3度と4度の2音を置き、後半を空けます。Responseは同じ♭3度から裏拍で入り、ブルーノートを通る8分音符へ広げます。",
      phrases: [
        [note(3, 2), note(5, 2), note(null, 4)],
        [note(null, 1), note(3), note(5), note(6), note(7), note(0, 2), note(null, 1)],
      ] },
    "one-fragment": { label: "途切れた問いをつなぐ", bars: 1,
      explanation: "Callは5度→♭7度と5度→4度の間を休符で切ります。Responseは4度を受けてブルーノートから5度へつなぎ、長めのルートで締めます。",
      phrases: [
        [note(7), note(10), note(null, 2), note(7), note(5), note(null, 2)],
        [note(5), note(6), note(7, 2), note(0, 2), note(null, 2)],
      ] },
    "one-leap": { label: "跳躍の問いを階段で返す", bars: 1,
      explanation: "Callはルートから5度へ跳び、♭7度へ広がります。Responseはその♭7度を受け、5度・4度・♭3度をたどってルートへ戻ります。",
      phrases: [
        [note(0), note(7), note(10, 2), note(7, 2), note(null, 2)],
        [note(10, 2), note(7), note(5), note(3), note(0, 2), note(null, 1)],
      ] },
    "one-blue-up": { label: "ブルーノートを上って下る", bars: 1,
      explanation: "Callは4度→ブルーノート→5度を上向きに使います。Responseは1拍待ち、同じ3音を下向きに引用。♭3度を経て短いルートで答えます。",
      phrases: [
        [note(5), note(6), note(7, 2), note(10, 2), note(null, 2)],
        [note(null, 2), note(7), note(6), note(5), note(3), note(0), note(null, 1)],
      ] },
    "one-blue-down": { label: "低く下った問いを上へ返す", bars: 1,
      explanation: "Callは5度からブルーノートを通って♭3度へ下降。Responseはその♭3度を裏拍で受け、跳躍を交えて高いルートまで上がります。",
      phrases: [
        [note(7), note(6), note(5, 2), note(3, 2), note(null, 2)],
        [note(null, 1), note(3), note(5), note(7), note(10), note(12, 2), note(null, 1)],
      ] },
    "one-late": { label: "遅い問いに頭から答える", bars: 1,
      explanation: "Callは2拍目の裏まで待って入り、短く下降します。Responseは次の小節の頭で4度を受け取り、裏拍からルートを伸ばして重心を変えます。",
      phrases: [
        [note(null, 3), note(7), note(10), note(7), note(5), note(null, 1)],
        [note(5, 2), note(3), note(5), note(3), note(0, 2), note(null, 1)],
      ] },
    "one-early": { label: "短く答えて余白を残す", bars: 1,
      explanation: "Callは裏拍から上がり、5度を伸ばします。Responseは5度→4度→ルートの3音だけで早めに閉じます。後半2拍の沈黙もフレーズの一部です。",
      phrases: [
        [note(null, 1), note(3), note(5), note(7, 3), note(null, 2)],
        [note(7), note(5), note(0, 2), note(null, 4)],
      ] },
    "one-low-high": { label: "低い問いから高い結びへ", bars: 1,
      explanation: "Callは低いルートと♭3度・4度で問いかけます。Responseは5度から裏拍で入り、4度を一度引用して高いルートへ跳びます。",
      phrases: [
        [note(0), note(3), note(5, 2), note(3, 2), note(null, 2)],
        [note(null, 1), note(7), note(10), note(7), note(5), note(12, 2), note(null, 1)],
      ] },
    "one-high-root": { label: "下った問いを跳躍で結ぶ", bars: 1,
      explanation: "Callは高いルートから4度へ下がります。Responseは1拍待って低い♭3度から上がり、5度から高いルートへ跳んで締めます。",
      phrases: [
        [note(12, 2), note(10), note(7), note(5, 2), note(null, 2)],
        [note(null, 2), note(3), note(5), note(7), note(12, 2), note(null, 1)],
      ] },
  });
  // Two-bar phrases: the first bar leads onward; only the second bar closes.
  Object.assign(PATTERNS, {
    two: { label: "上昇に下降で答える", bars: 2,
      explanation: "Callは♭3度から上がり、1小節目末の5度→♭7度を足掛かりに、2小節目の高いルートまで進みます。Responseはその♭7度を受け、低いルートまで2小節かけて下降します。途中の息継ぎより、2小節目末の間を大きく取ります。",
      phrases: [
        [note(null), note(3), note(5), note(7), note(10, 2), note(7), note(10)],
        [note(12, 2), note(10), note(7), note(6), note(7), note(null, 2)],
        [note(10, 2), note(null), note(7), note(6), note(5), note(3), note(5)],
        [note(7), note(6), note(5), note(3), note(0, 2), note(null, 2)],
      ] },
    "two-space": { label: "伸ばした問いを広げて返す", bars: 2,
      explanation: "Callの5度をタイで小節線の先まで伸ばし、2小節目で4度へ問いかけます。Responseは5度を裏拍から受け、音域を広げてから下降。1小節目末のブルーノートを次の4度へつなぎ、最後にルートへ着地します。",
      phrases: [
        [note(7, 2), note(null), note(7), note(10, 2), hold(7, 2)],
        [note(7, 2), note(5), note(3), note(5, 2), note(null, 2)],
        [note(null), note(7), note(10), note(12), note(10, 2), note(7), note(6)],
        [note(5, 2), note(3), note(5), note(0, 2), note(null, 2)],
      ] },
    "two-turn": { label: "下降の問いを折り返す", bars: 2,
      explanation: "Callは高いルートから下降し、小節線を越えた♭3度で折り返して5度に留まります。Responseはその低い♭3度から上向きに展開。途中の5度をタイでつなぎ、最後だけルートに落ち着きます。",
      phrases: [
        [note(null), note(12, 2), note(10), note(7, 2), note(6), note(5)],
        [note(3, 2), note(5), note(6), note(7, 2), note(null, 2)],
        [note(null), note(3), note(5), note(7), note(10, 2), hold(7, 2)],
        [note(7), note(6), note(5), note(3), note(0, 2), note(null, 2)],
      ] },
    "two-pickup": { label: "遅い入りをゆったり返す", bars: 2,
      explanation: "Callは2拍目の裏から上がり、その勢いを2小節目の高いルートまで運びます。Responseは1拍待って♭7度から下降し、小節線をまたぐ折り返しを経てルートへ。入りの遅さを途中の終わりと混同せず、2小節先へ歌います。",
      phrases: [
        [note(null, 3), note(3), note(5), note(6), note(7), note(10)],
        [note(12, 2), note(10), note(7), note(10, 2), note(null, 2)],
        [note(null, 2), note(10), note(7), note(6), note(5), note(3), note(5)],
        [note(7, 2), note(5), note(3), note(0, 2), note(null, 2)],
      ] },
    "two-register": { label: "高音の問いを低音へ移す", bars: 2,
      explanation: "Callは高音域から下降し、1小節目末のブルーノートを次の4度へ進めます。Responseは低いルートから上昇し、高いルートを2小節目の下降の出発点にします。音域を入れ替えつつ、結びは4小節目まで残します。",
      phrases: [
        [note(12, 2), note(null), note(10), note(7), note(10), note(7), note(6)],
        [note(5, 2), note(3), note(5), note(7, 2), note(null, 2)],
        [note(0, 2), note(3), note(5), note(null), note(7), note(10), note(12)],
        [note(10), note(7), note(6), note(5), note(0, 2), note(null, 2)],
      ] },
    "two-punctuate": { label: "短い息継ぎを一息で返す", bars: 2,
      explanation: "Callは途中に半拍の息継ぎを入れ、4度→ブルーノート→5度から次の♭7度へつなぎます。ResponseはCallの着地点の♭3度を受け、上昇と下降を一息で展開。両方とも2小節目末で初めて1拍空けます。",
      phrases: [
        [note(7), note(10), note(null), note(7), note(5, 2), note(6), note(7)],
        [note(10, 2), note(7), note(5), note(3, 2), note(null, 2)],
        [note(null), note(3), note(5), note(7), note(10), note(12), note(10), note(7)],
        [note(5, 2), note(3), note(5), note(0, 2), note(null, 2)],
      ] },
    "two-sequence": { label: "繰り上げた問いをほどく", bars: 2,
      explanation: "Callは♭3度→4度→5度を、短い息継ぎのあと4度→5度→♭7度へ繰り上げ、次の小節の高いルートへ導きます。Responseはその上昇を下降に変え、小節線を越えて低いルートへほどきます。",
      phrases: [
        [note(3), note(5), note(7, 2), note(null), note(5), note(7), note(10)],
        [note(12, 2), note(10), note(7), note(10, 2), note(null, 2)],
        [note(null), note(10), note(7), note(5), note(7, 2), note(6), note(5)],
        [note(3, 2), note(5), note(3), note(0, 2), note(null, 2)],
      ] },
    "two-neighbor": { label: "ブルーノートの向きを変える", bars: 2,
      explanation: "Callは5度をブルーノートで揺らし、その5度をタイで次の小節へ持ち越します。Responseは4度から同じブルーノートを上向きに使い、後半で下降。1小節ごとの終止ではなく、揺らぎから結びへ進めます。",
      phrases: [
        [note(7), note(6), note(7, 2), note(null), note(10), hold(7, 2)],
        [note(7, 2), note(6), note(5), note(7, 2), note(null, 2)],
        [note(5, 2), note(null), note(6), note(7, 2), note(10), note(7)],
        [note(6), note(5), note(3, 2), note(0, 2), note(null, 2)],
      ] },
    "two-dense-sparse": { label: "細かな問いに少ない音で答える", bars: 2,
      explanation: "Callは裏拍から動き始め、高い音域を経て次の小節まで下降を続けます。Responseは♭7度と5度を長めに受け、♭3度を小節線の先までタイで伸ばします。少ない音でも、ルートへの結びを2小節目に置きます。",
      phrases: [
        [note(null), note(3), note(5), note(6), note(7), note(10), note(12), note(10)],
        [note(7), note(6), note(5), note(3), note(7, 2), note(null, 2)],
        [note(10, 2), note(null), note(7, 3), hold(3, 2)],
        [note(3, 2), note(0, 3), note(null, 3)],
      ] },
    "two-sparse-dense": { label: "余白の問いを8分音符で広げる", bars: 2,
      explanation: "Callは少ない音と息継ぎで上がり、4度をタイで次の小節へ伸ばして♭7度まで展開します。Responseはその4度から8分音符へ広げ、高い音域を折り返して、次の小節で低いルートへ着地します。",
      phrases: [
        [note(0, 2), note(null), note(3, 3), hold(5, 2)],
        [note(5, 2), note(7, 2), note(10, 2), note(null, 2)],
        [note(null), note(5), note(6), note(7), note(10, 2), note(12), note(10)],
        [note(7), note(6), note(5), note(3), note(0, 2), note(null, 2)],
      ] },
    "two-repeat": { label: "繰り返す5度を歌に変える", bars: 2,
      explanation: "Callは5度を反復し、1小節目末の反復を次の小節の4度へ運び、♭7度まで続けます。Responseは同じ5度を受けて下降し、途中の4度をタイで次の小節へ。反復を流れる旋律に変えてルートで締めます。",
      phrases: [
        [note(7), note(7), note(null), note(7), note(10, 2), note(7), note(7)],
        [note(5, 2), note(7), note(7), note(10, 2), note(null, 2)],
        [note(null), note(7), note(6), note(5), note(3, 2), hold(5, 2)],
        [note(5, 2), note(7), note(3), note(0, 2), note(null, 2)],
      ] },
    "two-displace": { label: "入りの位置をずらして返す", bars: 2,
      explanation: "Callの4度→5度→♭7度は1拍目の裏から始まり、小節末で4度→5度を再提示して次の♭7度へつなぎます。Responseは同じ3音を2拍目から受け、2小節目で初めてルートへ。入りをずらしながら長いまとまりを保ちます。",
      phrases: [
        [note(null), note(5), note(7), note(10), note(7, 2), note(5), note(7)],
        [note(10, 2), note(7), note(6), note(5, 2), note(null, 2)],
        [note(null, 2), note(5), note(7), note(10, 2), note(7), note(5)],
        [note(3, 2), note(5), note(3), note(0, 2), note(null, 2)],
      ] },
    "two-high-ending": { label: "低い問いを高いルートで結ぶ", bars: 2,
      explanation: "Callは低いルートから4度へ進み、タイでつないで次の小節の♭7度まで上がります。Responseは4度→5度→♭7度を引き継ぎ、小節末のブルーノートを通過点にして、最後は高いルートで結びます。",
      phrases: [
        [note(0, 2), note(3), note(5), note(null), note(3), hold(5, 2)],
        [note(5, 2), note(6), note(7), note(10, 2), note(null, 2)],
        [note(null), note(5), note(7), note(10), note(7, 2), note(6), note(7)],
        [note(10, 2), note(7), note(10), note(12, 2), note(null, 2)],
      ] },
    "two-early-close": { label: "長い問いに早めの結び", bars: 2,
      explanation: "Callは高いルートまで上がってから下がり、小節線の先でブルーノートから再び持ち上げます。Responseは高いルートから下降し、4度をタイで次の小節へ。そこから低いルートで早めに結び、残り2拍を空けます。",
      phrases: [
        [note(null), note(7), note(10), note(12), note(10, 2), note(7), note(5)],
        [note(6), note(7), note(10, 2), note(7, 2), note(null, 2)],
        [note(12, 2), note(null), note(10), note(7, 2), hold(5, 2)],
        [note(5), note(3), note(0, 2), note(null, 4)],
      ] },
    "two-breath": { label: "息継ぎを挟んで折り返す", bars: 2,
      explanation: "Callは4度→ブルーノート→5度を、途中の息継ぎのあと小節線をまたいで再び展開します。Responseは4度→5度→♭7度で受け、半拍だけ息継ぎして下降。2小節目の折り返しからルートへ結びます。",
      phrases: [
        [note(5), note(6), note(7, 2), note(null), note(10), note(7), note(5)],
        [note(6), note(7), note(10), note(7), note(5, 2), note(null, 2)],
        [note(null), note(5), note(7), note(10), note(null), note(7), note(6), note(5)],
        [note(3, 2), note(5), note(7), note(0, 2), note(null, 2)],
      ] },
  });
  function swing(eighths) {
    return Math.floor(eighths / 2) + (eighths % 2 ? 2 / 3 : 0);
  }
  function events(pattern) {
    const timeline = [];
    let position = 0;
    pattern.phrases.flat().forEach(event => {
      const previous = timeline.at(-1);
      if (previous?.tie) {
        previous.duration += event.duration;
        previous.sustained = true;
        if (event.tie) previous.tie = true;
        else delete previous.tie;
      } else {
        timeline.push({ ...event, position });
      }
      position += event.duration;
    });
    return timeline;
  }
  const KEYS = {
    C: { root: 60, scale: "C · E♭ · F · G♭ · G · B♭", abc: {0:"C",3:"_E",5:"F",6:"_G",7:"=G",10:"_B",12:"c"} },
    F: { root: 65, scale: "F · A♭ · B♭ · C♭ · C · E♭", abc: {0:"F",3:"_A",5:"_B",6:"_c",7:"=c",10:"_e",12:"f"} },
  };
  function score(key, part, patternId = "two") {
    const pattern = PATTERNS[patternId];
    const phrase = pattern.phrases.slice(part * pattern.bars, (part + 1) * pattern.bars);
    const flat = phrase.flat();
    const firstNote = flat.findIndex(event => event.pitch !== null);
    const lastNote = flat.findLastIndex(event => event.pitch !== null);
    let index = 0;
    const bars = phrase.map(bar => {
      let position = 0;
      return bar.map(event => {
        const gap = position % 2 === 0 || event.duration !== 1 ? " " : "";
        position += event.duration;
        const open = pattern.bars === 2 && index === firstNote ? "(" : "";
        const close = pattern.bars === 2 && index === lastNote ? ")" : "";
        index++;
        return gap + open + (event.pitch === null ? "z" : KEYS[key].abc[event.pitch])
          + (event.duration === 1 ? "" : event.duration) + (event.tie ? "-" : "") + close;
      }).join("").trim();
    });
    return `X:1\nT:${part ? "Response" : "Call"} · ${pattern.bars}小節\nM:4/4\nL:1/8\nK:C\n${bars.join(" | ")} |]`;
  }
  const api = { PATTERNS, KEYS, score, swing, events };
  if (typeof module !== "undefined") module.exports = api;
  global.Blues = api;
  if (typeof document === "undefined") return;
  const $ = id => document.getElementById(`blues-${id}`);
  let context, timer, frame, playing = false, generation = 0, visuals = [];
  let nodes = [];
  const selectedExamples = { two: "two", one: "one" };
  function currentPatternId() { return $("example").value; }
  function populateExamples() {
    const length = $("pattern").value;
    const bars = length === "two" ? 2 : 1;
    $("example").replaceChildren(...Object.entries(PATTERNS)
      .filter(([, pattern]) => pattern.bars === bars)
      .map(([id, pattern], index) => new Option(`${index + 1}. ${pattern.label}`, id)));
    $("example").value = selectedExamples[length];
  }
  function render() {
    const pattern = PATTERNS[currentPatternId()];
    const bars = pattern.bars;
    $("conversation").textContent = pattern.explanation;
    $("phrasing").hidden = bars !== 2;
    $("example-count").textContent = `${$("example").selectedIndex + 1} / ${$("example").options.length} 譜例（全30種類）`;
    $("description").textContent = `${bars}小節の問いかけに、${bars}小節で答える`;
    ["call", "response"].forEach((id, part) => $(id).setAttribute("aria-label", `${part ? "Response" : "Call"}の${bars}小節の五線譜`));
    $("scale").textContent = `${$("key").value} マイナーブルーススケール：${KEYS[$("key").value].scale}`;
    visuals = ["call", "response"].map((id, part) => global.ABCJS.renderAbc(`blues-${id}`, score($("key").value, part, currentPatternId()), { staffwidth: 850, paddingtop: 10, paddingleft: 20, paddingright: 20, add_classes: true })[0]);
    visuals.forEach(visual => visual.setTiming(120, 0));
    document.querySelectorAll(".blues-score svg").forEach(svg => {
      svg.setAttribute("viewBox", `0 0 ${svg.getAttribute("width")} ${svg.getAttribute("height")}`);
    });
  }
  function tone(freq, when, duration, volume, click = false) {
    const osc = context.createOscillator(), gain = context.createGain();
    osc.type = click ? "sine" : "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(volume, when + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
    osc.connect(gain); gain.connect(context.destination);
    osc.start(when); osc.stop(when + duration + 0.02);
    nodes.push(osc);
    osc.onended = () => { osc.disconnect(); gain.disconnect(); nodes = nodes.filter(node => node !== osc); };
  }
  function highlight(part, position) {
    document.querySelectorAll(".is-current").forEach(n => n.classList.remove("is-current"));
    ["call", "response"].forEach((id, p) => $(id).classList.toggle("is-playing", part === p));
    if (part < 0) return;
    const note = visuals[part]?.noteTimings?.find(n => n.type === "event" && Math.abs(n.milliseconds - position * 250) < 1);
    note?.elements?.flat().forEach(n => n?.classList?.add("is-current"));
  }
  function stop(message = "停止しました。") {
    generation++; playing = false;
    clearTimeout(timer); cancelAnimationFrame(frame);
    nodes.slice().forEach(node => { try { node.stop(); } catch {} });
    highlight(-1); $("play").disabled = false; $("stop").disabled = true;
    $("status").textContent = message;
  }
  function cycle(start, beat, countIn) {
    const melodyStart = start + (countIn ? 4 * beat : 0);
    const pattern = PATTERNS[currentPatternId()];
    const phraseEvents = events(pattern);
    const totalBeats = pattern.bars * 8;
    const end = melodyStart + totalBeats * beat;
    const practice = $("mode").value === "practice";
    const root = KEYS[$("key").value].root;
    for (let i = 0; i < (totalBeats + (countIn ? 4 : 0)); i++) tone(i % 4 === 0 ? 1400 : 1000, start + i * beat, 0.045, 0.055, true);
    phraseEvents.forEach(event => {
      if (event.pitch === null || (practice && event.position >= pattern.bars * 8)) return;
      const onset = swing(event.position);
      const duration = swing(event.position + event.duration) - onset;
      tone(440 * 2 ** ((root + event.pitch - 69) / 12), melodyStart + onset * beat, duration * beat * (event.sustained ? 0.97 : 0.85), event.position % 2 ? 0.19 : 0.14);
    });
    function animate() {
      if (!playing) return;
      const elapsed = (context.currentTime - melodyStart) / beat;
      if (elapsed < 0) {
        highlight(-1); $("status").textContent = `カウント ${Math.max(1, Math.floor(elapsed + 4) + 1)} / 4`;
      } else if (elapsed < totalBeats) {
        const part = elapsed < pattern.bars * 4 ? 0 : 1;
        const local = elapsed % (pattern.bars * 4);
        const current = phraseEvents.find(event => elapsed >= swing(event.position) && elapsed < swing(event.position + event.duration));
        highlight(part, current?.pitch === null ? -1 : (current?.position ?? -1) - part * pattern.bars * 8);
        $("status").textContent = `${part ? (practice ? "Response：自分で弾く" : "Response：お手本") : "Call：聴いて覚える"} · ${Math.floor(local / 4) + 1} / ${pattern.bars}小節 · ${Math.floor(local % 4) + 1}拍${current?.pitch === null ? " · 休符" : ""}`;
      }
      frame = requestAnimationFrame(animate);
    }
    animate();
    timer = setTimeout(() => {
      cancelAnimationFrame(frame);
      if ($("loop").checked && playing) cycle(Math.max(end, context.currentTime + 0.03), beat, false);
      else stop(`${pattern.bars * 2}小節が終わりました。responseを弾いてみましょう。`);
    }, Math.max(0, (end - context.currentTime) * 1000));
  }
  $("play").addEventListener("click", async () => {
    const tempo = Number($("tempo").value);
    if (!Number.isFinite(tempo) || tempo < 40 || tempo > 240) { $("status").textContent = "テンポは40〜240 BPMで指定できます。"; return; }
    const token = ++generation;
    $("play").disabled = true; $("stop").disabled = false;
    try {
      context ||= new (global.AudioContext || global.webkitAudioContext)();
      await context.resume();
      if (token !== generation) return;
      playing = true;
      cycle(context.currentTime + 0.1, 60 / tempo, true);
    } catch { stop("音声を開始できませんでした。ブラウザの音声設定を確認して再生をお試しください。"); }
  });
  $("stop").addEventListener("click", () => stop());
  ["key", "tempo", "mode", "pattern", "example"].forEach(id => $(id).addEventListener("change", () => {
    stop("設定を変更しました。再生すると最初から始まります。");
    if (id === "pattern") populateExamples();
    if (id === "example") selectedExamples[$("pattern").value] = currentPatternId();
    if (["key", "pattern", "example"].includes(id)) render();
  }));
  $("done").addEventListener("click", () => {
    try { global.JazzDailyProgress?.mark("blues"); } catch {}
    $("status").textContent = "今日のBlues練習を記録しました。";
  });
  global.addEventListener("pagehide", () => stop());
  if (!global.ABCJS) { $("status").textContent = "譜面を読み込めませんでした。ページを再読み込みしてください。"; $("play").disabled = true; return; }
  populateExamples();
  render();
})(typeof window !== "undefined" ? window : globalThis);
