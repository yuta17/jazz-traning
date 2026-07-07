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
- `hanon/` でハノン1-5から開くたびにひとつ表示し、練習したボタンで完了
- `oscar-peterson/` でJazz Exercise 1〜3の練習メモと日次完了ボタンを表示
- `licks/1/` でii-V-Iリック1を譜例と度数で確認しながら12メジャーキーで練習
- `chord-flash/` でmaj7 / m7 / 7 / m7♭5 / dim7をRoot / 2nd混在の1周12問で瞬間判定
- `key-signature/` で♯/♭の数からメジャー / マイナーキーを答える1周12問の調号判定
- `standard-sight-reading/` でJazz 1460 Standardsから日替わりで1曲を表示
- HOMEでは朝6時区切りで当日の実施済みトレーニングにチェックを表示

## ローカル確認

```bash
python3 -m http.server 4173
```

ブラウザで `http://localhost:4173` を開きます。

## 検証

```bash
node scripts/validate-theory.js
node scripts/validate-daily-progress.js
node scripts/validate-hanon.js
node scripts/validate-chord-flash.js
node scripts/validate-lick-1.js
node scripts/validate-lick-2.js
node scripts/validate-key-signature.js
node scripts/validate-oscar-peterson.js
node scripts/validate-standard-sight-reading.js
node scripts/validate-instagram-lick.js
```
