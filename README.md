# 2-5-1 Training

ジャズのメジャー / マイナー 2-5-1 を12キー均一に回す静的Webアプリです。

## 仕様

- メジャー: `IIm7 -> V7 -> Imaj7`
- マイナー: `II-7(♭5) -> V7 -> I-7`
- `RRR`, `R2R`, `2R2` をメジャー / マイナー別に選択
- メジャーのみ、またはマイナーのみは1周12問
- メジャーとマイナーを含む場合は1周24問
- 選択したバリエーションは1周内でできるだけ均等に割り当て
- `two-five-one/` で2-5-1キー練習
- `recognition.html` で2-5-1 / 2-5 / メジャー / マイナー混在の進行判定トレーニング
- `dim7/` でランダムdim7コード練習
- `chord-flash/` でmaj7 / m7 / 7 / m7♭5 / dim7をRoot positionの1周10問で瞬間判定
- `sight-reading/` で4小節大譜表の譜読み・リズム練習

## ローカル確認

```bash
python3 -m http.server 4173
```

ブラウザで `http://localhost:4173` を開きます。

## 検証

```bash
node scripts/validate-theory.js
node scripts/validate-progressions.js
node scripts/validate-dim7.js
node scripts/validate-chord-flash.js
node scripts/validate-sight-reading.js
```
