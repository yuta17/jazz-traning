# ジャズトレーニング

ジャズのメジャー / マイナー 2-5-1 を12キー均一に回す静的Webアプリです。

## 仕様

- メジャー: `IIm7 -> V7 -> I△7`
- マイナー: `II-7(♭5) -> V7 -> I-7`
- `RRR`, `R2R`, `2R2` をメジャー / マイナー別に選択
- メジャーのみ、またはマイナーのみは1周12問
- メジャーとマイナーを含む場合も1周12問
- 選択したバリエーションは1周内でできるだけ均等に割り当て
- `two-five-one/` でII・Vのコードを見て2-5-1を練習（マイナーは「3から」「7から」またはラベルなしをランダム表示）
- `two-five-key/` でII–Vから解決先のキーを選ぶ1周12問のキー判定（メジャー / マイナーを選択可）
- `hanon/` でハノン1-5から開くたびにひとつ表示し、番号に対応するYouTube参考動画を表示し、練習したボタンで完了
- `oscar-peterson/` でJazz Exercise 1〜3の練習メモと日次完了ボタンを表示
- `licks/1/` でii-V-Iリック1を譜例と度数で確認しながら12メジャーキーで練習
- `chord-flash/` で開始前に基本コード / ルートレス9thを選び、1周24問で瞬間判定（9thではdim7を除外、♭5は「3から」「7から」またはラベルなし）
- `key-signature/` で♯/♭の数からメジャー / マイナーキーを答える1周12問の調号判定
- `all-the-things-you-are/` で日替わりのキーに移調してAll the Things You Areを弾く
- `standard-sight-reading/` で重要度別のジャズスタンダードからランダムに1曲を表示
- HOMEでは朝6時区切りで当日の実施済みトレーニングにチェックを表示

## ローカル確認

```bash
python3 -m http.server 4173
```

ブラウザで `http://localhost:4173` を開きます。

## 検証

```bash
node scripts/validate-theory.js
node scripts/validate-251-ui.js
node scripts/validate-two-five-key.js
node scripts/validate-daily-progress.js
node scripts/validate-hanon.js
node scripts/validate-chord-flash.js
node scripts/validate-lick-1.js
node scripts/validate-lick-2.js
node scripts/validate-key-signature.js
node scripts/validate-oscar-peterson.js
node scripts/validate-all-the-things-you-are.js
node scripts/validate-standard-sight-reading.js
node scripts/validate-instagram-lick.js
```
