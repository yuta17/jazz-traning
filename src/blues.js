(function (global) {
  "use strict";
  // Durations are in eighth-note units; null is a written and silent rest.
  const note = (pitch, duration = 1) => ({ pitch, duration });
  const hold = (pitch, duration) => ({ ...note(pitch, duration), tie: true });
  const accent = (pitch, duration = 1) => ({ ...note(pitch, duration), accent: true });
  const clip = (pitch, duration = 1) => ({ ...note(pitch, duration), staccato: true });
  // Original blues riffs, developed through repetition, displacement, and register changes.
  const PATTERNS = {
    "one": { label: "裏拍のブルース・リフ", bars: 1, explanation: "5度→♭7度→5度を短い言葉として歌います。Responseは1拍遅れてその5度を受け、ブルーノートを通って♭3度を伸ばします。高い音を足すより、アクセントの位置を聴き取ります。", phrases: [
      [note(null), accent(7), note(10), note(7), clip(5, 2), note(null, 2)],
      [note(null, 2), note(7), note(6), note(5), accent(3, 2), note(null)],
    ] },
    "one-turn": { label: "下降を高いルートで切り返す", bars: 1, explanation: "Callの♭7度と4度の間を広く取ります。Responseは低い♭3度から跳び、裏拍の5度を押して高いルートへ。Callの下降に対して、違う音域の答えを返します。", phrases: [
      [note(10), clip(7), note(5, 3), note(7), note(null, 2)],
      [note(null), note(3), note(5), accent(7), note(10), note(12, 2), note(null)],
    ] },
    "one-repeat": { label: "同音のパンチをほどく", bars: 1, explanation: "5度の短い反復と、裏拍のアクセントでCallを作ります。Responseは最初の5度を長く受け、♭3度を押して低いルートへ。反復の勢いを滑らかな結びに変えます。", phrases: [
      [clip(7), accent(7), note(null), clip(7), accent(10, 2), note(null, 2)],
      [note(7, 2), note(6), note(5), accent(3), note(0, 2), note(null)],
    ] },
    "one-register": { label: "高いリフに低く答える", bars: 1, explanation: "Callは高いルートとその上の♭3度で、歌うような短いリフ。Responseは5度まで音域を下げて受け、同じ跳躍の響きを残しながら低い♭3度へ落ち着きます。", phrases: [
      [note(null), accent(12), note(15), note(12), clip(10, 2), note(null, 2)],
      [note(7, 2), note(10), note(7), note(5), accent(3, 2), note(null)],
    ] },
    "one-held": { label: "伸ばす音と裏拍の返し", bars: 1, explanation: "Callは♭7度を付点4分で伸ばし、5度を短く切って♭7度へ戻ります。Responseはその2音を裏拍から組み替え、4度へ結びます。伸びと短い音の差がポイントです。", phrases: [
      [accent(10, 3), clip(7), note(10, 2), note(null, 2)],
      [note(null), note(10), note(7), note(10), note(7), accent(5, 2), note(null)],
    ] },
    "one-compress": { label: "高音のひと言に低く短く", bars: 1, explanation: "Callは5度・♭7度から高い♭3度まで跳び、ルートへ折り返します。Responseは♭7度と5度を短く受け、4度を長めに置く3音の答え。余白を残して言い切ります。", phrases: [
      [note(null), note(7), note(10), note(12), accent(15), note(12), note(null, 2)],
      [clip(10), note(7), accent(5, 3), note(null, 3)],
    ] },
    "one-expand": { label: "2音のフックを膨らませる", bars: 1, explanation: "Callは短い5度と、裏拍から伸ばす♭7度だけ。Responseはその2音を引用し、ブルーノートから5度へ戻る折り返しを加えます。音数が増えても同じ話題を保ちます。", phrases: [
      [clip(7), accent(10, 3), note(null, 4)],
      [note(null), note(7), note(10), note(7), note(6), accent(7, 2), note(null)],
    ] },
    "one-fragment": { label: "途切れるリフをつなぎ直す", bars: 1, explanation: "Callの5度→♭7度と5度→4度の間を1拍空けます。Responseは同じ5度を裏拍から受け、4度に重みを置いて低いルートへつなぎます。", phrases: [
      [note(7), accent(10), note(null, 2), note(7), clip(5), note(null, 2)],
      [note(null), note(7), note(6), accent(5), note(3), note(0, 2), note(null)],
    ] },
    "one-leap": { label: "跳躍を別の音域で返す", bars: 1, explanation: "Callは低いルートから5度・♭7度へ跳びます。Responseは高い♭3度から下がり、裏拍の5度を押して高いルートへ。跳躍の勢いを音域を変えて返します。", phrases: [
      [note(0), clip(7), accent(10, 2), note(7, 2), note(null, 2)],
      [note(15, 2), note(12), clip(10), accent(7), note(12, 2), note(null)],
    ] },
    "one-blue-up": { label: "ブルーノートの小さな引っかかり", bars: 1, explanation: "Callの4度→ブルーノート→5度は軽く、到達した5度を押します。Responseは1拍待って♭7度から入り、同じブルーノートを挟んで5度に戻ります。", phrases: [
      [note(5), note(6), accent(7, 2), clip(10, 2), note(null, 2)],
      [note(null, 2), note(10), note(7), note(6), accent(7, 2), note(null)],
    ] },
    "one-blue-down": { label: "♭3度のブルース・フック", bars: 1, explanation: "Callはブルーノートを通って4度へ、最後の♭3度は短く。Responseはその♭3度を受けて4度との折り返しを作り、ルートをかすめて♭3度を伸ばします。", phrases: [
      [note(7), note(6), accent(5, 2), clip(3, 2), note(null, 2)],
      [note(null), note(3), note(5), accent(3), note(0), note(3, 2), note(null)],
    ] },
    "one-late": { label: "遅い問いに頭のアクセント", bars: 1, explanation: "Callは2拍目の裏から入り、♭7度にアクセントを置く短い言葉。Responseは次の小節頭でその♭7度を受け、5度との往復を4度へ収めます。", phrases: [
      [note(null, 3), note(7), accent(10), note(7), clip(5), note(null)],
      [accent(10, 2), note(7), note(10), clip(7), accent(5, 2), note(null)],
    ] },
    "one-early": { label: "オクターブの問いと短い落ち", bars: 1, explanation: "Callは裏拍の5度から高いルートへ跳び、♭7度を伸ばします。Responseは5度→♭3度→低いルートの3音に圧縮。後半2拍の沈黙まで含めて答えます。", phrases: [
      [note(null), note(7), accent(12), note(10, 3), note(null, 2)],
      [accent(7), clip(3), note(0, 2), note(null, 4)],
    ] },
    "one-low-high": { label: "低いフックを上へ持ち上げる", bars: 1, explanation: "Callは低いルートと♭3度の小さなリフ。Responseは同じ2音の響きを1オクターブ上へ移し、♭7度を挟んで高いルートへ戻ります。リズムも変えて歌い直します。", phrases: [
      [clip(0), accent(3), note(0, 2), note(3, 2), note(null, 2)],
      [note(null), note(12), note(15), accent(12), note(10), note(12, 2), note(null)],
    ] },
    "one-high-root": { label: "高い♭3度からの返答", bars: 1, explanation: "Callは高い♭3度を短く、高いルートを押して5度へ下がります。Responseは1拍待ってCallの♭7度・5度を拾い、高いルートを裏拍から長く伸ばします。", phrases: [
      [clip(15), accent(12), note(10, 2), note(7, 2), note(null, 2)],
      [note(null, 2), note(10), note(7), accent(12, 3), note(null)],
    ] },
    "two": { label: "裏拍のリフを育てる", bars: 2, explanation: "Callは5度→♭7度→5度を繰り返し、小節末のリフから次の高いルートへつなぎます。Responseは同じ入口から高い♭3度へ展開し、後半だけ低く結びます。アクセントを置く音と、短く抜く音を分けます。", phrases: [
      [note(null), note(7), accent(10), note(7), clip(5), note(null), note(7), accent(10)],
      [note(12, 2), clip(10), note(7), accent(10, 2), note(null, 2)],
      [note(null, 2), note(7), accent(10), note(12, 2), note(15), accent(12)],
      [note(10), note(7), clip(5), accent(3), note(0, 2), note(null, 2)],
    ] },
    "two-space": { label: "伸ばす問いを高く広げる", bars: 2, explanation: "Callは5度と♭7度のリフを、タイで小節線の先へ伸ばして4度へ。Responseは同じ5度から高い♭3度まで音域を広げ、最後は低い♭3度を伸ばして答えます。長い音の途中で重みを失わないように歌います。", phrases: [
      [note(7, 2), note(null), clip(7), note(10, 2), hold(7, 2)],
      [note(7, 2), accent(10), note(7), note(5, 2), note(null, 2)],
      [note(null), note(7), note(10), note(12), accent(15, 2), note(12), note(10)],
      [accent(7, 3), clip(5), note(3, 2), note(null, 2)],
    ] },
    "two-turn": { label: "高い下降を上へ切り返す", bars: 2, explanation: "Callは高い♭3度から下がり、小節末でルートをもう一度目指して4度へ留まります。Responseは4度からブルーノートを押し上げ、高いルートをタイで持ち越します。結びは♭7度へ置き換えます。", phrases: [
      [note(null), note(15, 2), accent(12), note(10, 2), note(7), note(10)],
      [note(12, 2), note(10), note(7), accent(5, 2), note(null, 2)],
      [note(null), note(5), note(6), accent(7), note(10, 2), hold(12, 2)],
      [note(12, 2), note(15), note(12), accent(10, 2), note(null, 2)],
    ] },
    "two-pickup": { label: "遅いフックを短く返す", bars: 2, explanation: "Callは2拍目の裏から5度・♭7度を行き来し、次の小節で高い♭3度へ。Responseは1拍待って同じ2音のリフを受け、低いルートと♭3度だけに圧縮して締めます。", phrases: [
      [note(null, 3), note(7), accent(10), note(7), note(10), accent(12)],
      [note(15, 2), note(12), clip(10), note(7, 2), note(null, 2)],
      [note(null, 2), note(7), accent(10), note(7, 2), note(5), note(3)],
      [note(0, 3), clip(3), note(0, 2), note(null, 2)],
    ] },
    "two-register": { label: "高い言葉を低い声で返す", bars: 2, explanation: "Callは高い♭3度とルートを軸にしたリフ。Responseは低い5度・ルート・♭7度で、同じ跳躍の感じを別の声に移します。低音域の♭3度を押し、最後はルートで閉じます。", phrases: [
      [note(15, 2), note(null), accent(12), note(10), note(12), note(10), note(7)],
      [note(10, 2), note(7), clip(5), accent(7, 2), note(null, 2)],
      [clip(-5), accent(0), note(-2), note(0), note(null), note(3), note(0), note(-2)],
      [note(-5), note(0), accent(3, 2), note(0, 2), note(null, 2)],
    ] },
    "two-punctuate": { label: "短い音と長い答え", bars: 2, explanation: "Callは短い5度とアクセント付きの♭7度を組み合わせ、後半で音を伸ばします。Responseはそのリフを引用し、途中の短い息継ぎから低い♭3度を長く伸ばす答えへ。休符の前も急いで切り上げません。", phrases: [
      [clip(7), accent(10), note(null), clip(7), note(10, 2), note(7), accent(10)],
      [clip(12), accent(10), note(7, 2), note(10, 2), note(null, 2)],
      [note(null), note(7), accent(10), note(12), clip(10), note(null), note(7), note(5)],
      [accent(3, 3), clip(0), note(3, 2), note(null, 2)],
    ] },
    "two-sequence": { label: "跳躍のリフを繰り上げる", bars: 2, explanation: "Callは♭3度→5度→4度を、4度→♭7度→5度へ少し高く展開し、次の小節で高いルートへ。Responseは高いルートから5度へのリフで受け、後半で低いルートへ着地します。", phrases: [
      [clip(3), accent(7), note(5, 2), note(null), note(5), accent(10), note(7)],
      [note(7, 2), note(10), accent(12), note(10, 2), note(null, 2)],
      [note(null), note(12), note(10), accent(7), note(10, 2), note(7), note(5)],
      [clip(3), note(5), accent(7, 2), note(0, 2), note(null, 2)],
    ] },
    "two-neighbor": { label: "5度の周りを揺らす", bars: 2, explanation: "Callは5度をブルーノートで揺らし、♭7度を短く切って5度をタイで持ち越します。Responseは4度と5度の小さな折り返しに変え、最後は♭7度から4度へ。上下のスケールより、同じ音の周りの動きを歌います。", phrases: [
      [note(7), note(6), accent(7, 2), note(null), clip(10), hold(7, 2)],
      [note(7, 2), note(10), clip(7), accent(5, 2), note(null, 2)],
      [note(null), note(5), note(6), accent(7), note(5, 2), note(6), note(7)],
      [accent(10, 3), clip(7), note(5, 2), note(null, 2)],
    ] },
    "two-dense-sparse": { label: "高い言葉を少ない音で受ける", bars: 2, explanation: "Callは5度・♭7度・ルート・高い♭3度のリフを折り返します。Responseは高いルート、♭7度、5度へ音数を減らし、タイで次の小節へ。最後は♭7度を長く置いて言い切ります。", phrases: [
      [note(null), note(7), note(10), accent(12), note(15), note(12), note(10), note(7)],
      [note(10), note(7), clip(5), accent(7), note(10, 2), note(null, 2)],
      [accent(12, 2), note(null), note(10, 3), hold(7, 2)],
      [note(7, 2), accent(10, 3), note(null, 3)],
    ] },
    "two-sparse-dense": { label: "3音の問いを跳ねるリフへ", bars: 2, explanation: "Callはルート・♭3度・5度を少ない音で置き、5度をタイで次へ渡します。Responseはその5度を出発点に、♭7度と高いルートを行き来するリフへ広げます。最後の♭3度だけ押して、低いルートへ。", phrases: [
      [clip(0, 2), note(null), accent(3, 3), hold(7, 2)],
      [note(7, 2), clip(10, 2), accent(7, 2), note(null, 2)],
      [note(null), note(7), note(10), accent(12), note(10, 2), note(7), note(10)],
      [note(12), note(10), clip(7), accent(3), note(0, 2), note(null, 2)],
    ] },
    "two-repeat": { label: "同音のパンチに滑らかに答える", bars: 2, explanation: "Callは5度の短い反復を小節線の先まで展開し、4度へ留まります。Responseはその5度をブルーノートで揺らし、高いルートをタイでつなぎます。最後も高いルートへ戻り、音域と音の長さを変えて答えます。", phrases: [
      [clip(7), accent(7), note(null), clip(7), note(10, 2), note(7), accent(7)],
      [note(10, 2), clip(7), note(7), accent(5, 2), note(null, 2)],
      [note(null), note(7), note(6), accent(7), note(10, 2), hold(12, 2)],
      [note(12, 2), clip(10), note(7), accent(12, 2), note(null, 2)],
    ] },
    "two-displace": { label: "同じフックを1拍ずらす", bars: 2, explanation: "Callの5度→♭7度→5度は1拍目の裏から始まり、次の小節の高いルートへ。Responseは同じ入口を2拍目から受け、4度を長く伸ばして低いルートへ収めます。拍をずらしても同じ話題と感じるように弾きます。", phrases: [
      [note(null), note(7), accent(10), note(7), note(10, 2), note(7), accent(10)],
      [note(12, 3), clip(10), note(7, 2), note(null, 2)],
      [note(null, 2), note(7), accent(10), note(7, 2), note(10), note(7)],
      [accent(5, 3), clip(3), note(0, 2), note(null, 2)],
    ] },
    "two-high-ending": { label: "低いフックに高い5度で返す", bars: 2, explanation: "Callは低いルートと♭3度のフックを、5度のタイから4度へ展開します。Responseは同じ跳躍を高い音域で受け、高いルートの周りを動いてからさらに上の5度へ。最後まで高い声で答えます。", phrases: [
      [clip(0), accent(3), note(0, 2), note(null), note(3), hold(7, 2)],
      [note(7, 2), note(10), clip(7), accent(5, 2), note(null, 2)],
      [note(null), note(7), accent(12), note(10), note(12, 2), note(15), accent(12)],
      [note(10, 2), note(7), note(10), accent(19, 2), note(null, 2)],
    ] },
    "two-early-close": { label: "高く返して低く言い切る", bars: 2, explanation: "Callは5度・♭7度・高いルートのリフを2小節に展開します。Responseは高い♭3度まで持ち上げて受け、5度をタイで次へ渡します。そこから低いルートへ短く落とし、2拍の沈黙を残します。", phrases: [
      [note(null), note(7), accent(10), note(12), note(10, 2), note(7), note(10)],
      [note(12), note(10), clip(7), accent(5), note(7, 2), note(null, 2)],
      [accent(15, 2), note(null), note(12), note(10, 2), hold(7, 2)],
      [note(7), clip(3), accent(0, 2), note(null, 4)],
    ] },
    "two-breath": { label: "息継ぎの位置でリフを変える", bars: 2, explanation: "Callは4度→5度→♭7度と、ブルーノートから5度への短い返しを組み合わせます。Responseは5度・♭7度のリフを、違う位置の息継ぎで受けます。最後は低い♭3度を長く置いてルートに答えます。", phrases: [
      [clip(5), accent(7), note(10, 2), note(null), note(7), note(6), accent(7)],
      [note(10), note(7), clip(5), accent(7), note(5, 2), note(null, 2)],
      [note(null), note(7), accent(10), note(7), note(null), note(5), note(3), note(0)],
      [accent(3, 3), clip(0), note(0, 2), note(null, 2)],
    ] },
  };
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
    C: { root: 60, scale: "C · E♭ · F · G♭ · G · B♭", abc: {[-5]:"G,",[-2]:"_B,",0:"C",3:"_E",5:"F",6:"_G",7:"=G",10:"_B",12:"c",15:"_e",19:"=g"} },
    F: { root: 65, scale: "F · A♭ · B♭ · C♭ · C · E♭", abc: {[-5]:"C",[-2]:"_E",0:"F",3:"_A",5:"_B",6:"_c",7:"=c",10:"_e",12:"f",15:"_a",19:"=c'"} },
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
        return gap + open + (event.accent ? "!accent!" : "") + (event.staccato ? "." : "") + (event.pitch === null ? "z" : KEYS[key].abc[event.pitch])
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
    const attack = Math.min(0.005, duration / 4);
    gain.gain.linearRampToValueAtTime(volume, when + attack);
    if (!click) {
      // Keep the long triplet subdivision audible until just before the next note.
      const release = Math.min(0.012, duration / 8);
      gain.gain.exponentialRampToValueAtTime(volume * 0.75, when + duration - release);
    }
    gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
    osc.connect(gain); gain.connect(context.destination);
    osc.start(when); osc.stop(when + duration);
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
    const practice = !$("response-audio").checked;
    const root = KEYS[$("key").value].root;
    for (let i = 0; i < (totalBeats + (countIn ? 4 : 0)); i++) tone(i % 4 === 0 ? 1400 : 1000, start + i * beat, 0.045, 0.055, true);
    phraseEvents.forEach(event => {
      if (event.pitch === null || (practice && event.position >= pattern.bars * 8)) return;
      const onset = swing(event.position);
      const duration = swing(event.position + event.duration) - onset;
      tone(440 * 2 ** ((root + event.pitch - 69) / 12), melodyStart + onset * beat, duration * beat * (event.staccato ? 0.5 : 1), event.accent ? 0.2 : 0.14);
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
      else stop(`${pattern.bars * 2}小節が終わりました。もう一度聴いたり、一緒に弾いたりしてみましょう。`);
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
  ["key", "tempo", "response-audio", "pattern", "example"].forEach(id => $(id).addEventListener("change", () => {
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
