---
title: 【Clasp】GoogleAppScript のコードをローカルで開発する
date: 2020-01-21 14:00:00
tags:
  - Clasp
  - GoogleAppScript
  - TypeScript
---

この記事では **Clasp** を使って GoogleAppScript のコードを手元で管理する方法を紹介します。

Clasp [Command Line Interface using clasp \| Google Developers](https://developers.google.com/apps-script/guides/clasp)

## 手順 1. 初期化する

管理するディレクトリに移動してしてパッケージをインストールします。
その後 Google アカウントでログインします。

```sh
yarn add @google/clasp -D
clasp login
```

プロジェクトのみに入れてる場合は以降の `clasp hoge` を `yarn clasp hoge` に置き換えて読んでください。

さらに下の `gas` ディレクトリで管理してみます。

**既存のプロジェクトの場合**

```
clasp clone name --rootDir ./gas
```

**新規のプロジェクトの場合**

```
clasp create --type standalone --rootDir ./gas
```

## 手順 2. コードを書く

gas ディレクトリに ファイルを作成して関数を書きます。

```js:title="gas/main.js"
/* global Logger */

// eslint-disable-next-line no-unused-vars
function timeLog() {
  Logger.log(new Date())
}
```

## 手順 3. デプロイする

以下のコマンドで実行すると更新されます。(push と deploy 両方必要なので注意)

```
clasp push && clasp deploy
```

確認してみる。

```
clasp open
```

## 環境変数を使いたいとき

コードに残したくない定数は `PropertiesService` を使います。

```js:title="gas/main.js"
const token = PropertiesService.getScriptProperties().getProperty('API_TOKEN')
Logger.log(token)
```

値の設定は Clasp からはできなさそうでした。

`clasp open` して `ファイル > プロジェクトのプロパティ > スクリプトのプロパティタブ` から設定してください。

![gas-propety](https://elzup-image-storage.s3.amazonaws.com/blog/gasproperty.png)

## TypeScript の場合

TypeScript も Clasp 公式でサポートされていて、こちらに詳しく書いてあります。

[clasp/typescript\.md at master · google/clasp](https://github.com/google/clasp/blob/master/docs/typescript.md)

`@types/google-apps-script` で Global なモジュールの Type が使えます。
