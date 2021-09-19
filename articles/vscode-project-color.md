---
title: manifest.json から VSCode でプロジェクトごとに色をつける
date: 2020-03-05 11:00:00
topics:
  - CLI
  - VSCode
  - 個人開発
emoji: 🎨
type: tech
published: true
---

プロジェクトごとに VSCode の色を変える方法を見つけて最近利用しています。
しかし毎回設定するのは面倒くさいので manifest.json からテーマカラーを読み出して
設定する cli を作りました。

## vscode-workcolor-setup

`public/manifest.json` や `static/manifest.json` の theme_color を見て自動で `.vscode/settings.json` を設定します。

![](https://elzup-image-storage.s3.amazonaws.com/blog/settings_json_%E2%80%94_mitelop_and_TagPage_tsx_%E2%80%94_anozonbiyori.png)

その他使い方は readme のとおりです。

[vscode\-workcolor\-setup \- npm](https://www.npmjs.com/package/vscode-workcolor-setup)
GitHub [elzup/vscode\-workcolor\-setup](https://github.com/elzup/vscode-workcolor-setup)

## 参考

[プロジェクトごとに VSCode の色とテーマを変えて気持ちを切り替える \- Qiita](https://qiita.com/mottox2/items/a5813feeaf653ef3e2c3)

<!-- textlint-disable ja-technical-writing/no-doubled-joshi-->

[Visual Studio Code エディタの色をプロジェクトごとに違うものにする \- Qiita](https://qiita.com/kabosusoba/items/3afad300ef1ea9ddd50b)

<!-- textlint-enable ja-technical-writing/no-doubled-joshi-->
