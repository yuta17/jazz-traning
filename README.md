# ジャズトレーニング

ジャズのメジャー / マイナー 2-5-1 を12キー均一に回す静的Webアプリです。

## 仕様

- メジャー: `IIm7 -> V7 -> Imaj7`
- マイナー: `II-7(♭5) -> V7 -> I-7`
- `RRR`, `R2R`, `2R2` をメジャー / マイナー別に選択
- メジャーのみ、またはマイナーのみは1周12問
- メジャーとマイナーを含む場合も1周12問
- 選択したバリエーションは1周内でできるだけ均等に割り当て
- `two-five-one/` で2-5-1キー練習
- `recognition.html` で2-5-1 / 2-5 / メジャー / マイナー混在の進行判定トレーニング
- `hanon/` でハノン1-5から開くたびに番号をランダム表示
- `chord-flash/` でmaj7 / m7 / 7 / m7♭5 / dim7をRoot / 2nd混在の1周12問で瞬間判定
- `sight-reading/` で4小節大譜表の譜読み・リズム練習
- HOMEでは朝6時区切りで当日の実施済みトレーニングにチェックを表示

## ローカル確認

```bash
python3 -m http.server 4173
```

ブラウザで `http://localhost:4173` を開きます。

## 検証

```bash
node scripts/validate-theory.js
node scripts/validate-progressions.js
node scripts/validate-daily-progress.js
node scripts/validate-hanon.js
node scripts/validate-chord-flash.js
node scripts/validate-sight-reading.js
```
