---
title: Gatsby のブログを Zenn に連携する
date: 2021-09-18 16:00:00
topics:
  - Markdown
  - Gatsby
  - Zenn
emoji: 🚚
type: tech
published: true
---

## Zenn に対応する

個人ブログ(Gatsby のブログ)から Zenn にマルチポストする設定をしました。  
`canonical_url` は Zenn に向けています。

週 1 以上書くというペースを心がけて気づいたら 91 記事も書いていました。
Zenn エディタやフォーマットの恩恵や Zenn でのフィードバックを受けて記事を書くモチベをさらにあげたいです。

[公式の記事](https://zenn.dev/zenn/articles/connect-to-github)にもあるように Zenn で用意されている GitHub 連携できるような構造、マークダウンやファイル名に対応していきます。

## デプロイ設定(エクスポート処理)

現在のファイル構造は変えずにエクスポートをして GitHub Actions で zenn 用ブランチに push します。
Zenn 側での設定はほぼボタン 1 つでできるので省きます。

### ディレクトリ位置

現在の記事の位置は以下のパスにあります。

```
./content/blog/2021/2021-09-18___blog-title.md
```

Zenn では以下の構造に決まっています。 `zen-cli` で `zen-init` して生成されます。とてもシンプルです。

```
/articles
/books
```

`/out_zenn` ディレクトリをルートとして一旦エクスポートします。

`/content/blog/**/*-slug.md` を `/out_zenn/articles/slug.md` にコピーするスクリプトを作成しました。
コード [anozon\-blog/export_zenn\.js at master · elzup/anozon\-blog](https://github.com/elzup/anozon-blog/blob/master/export_zenn.js)

シェルスクリプトでもできそうだったんですが、拡張できるように node で書きました。

out_zenn で `zenn preview` するとしっかり表示されました。

![zenn-local-preview](https://storage.googleapis.com/zenn-user-upload/05b92b12eaa86fb01165a5f3.png)

### Zenn export GitHub Actions 作成

GitHub Actions で特定のブランチに commit するには [s0/git-publish-subdir-action](https://github.com/s0/git-publish-subdir-action) が便利でした。

**packages.json に scripts 追加**

```title=packages.json
  "scripts": {
    "zenn:export": "node export_zenn.js",
  }
```

`.github/workflows/zenn.yml` を作成します。

```yml title=zenn.yml
# 省略
steps:
  - uses: actions/checkout@master
  - uses: actions/setup-node@v2
    with:
      node-version: ${{ matrix.node-version }}
  - name: Push to build branch
    uses: s0/git-publish-subdir-action@master
    env:
      REPO: self
      BRANCH: zenn
      FOLDER: out_zenn
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Zenn のファイルフォーマットに修正する

preview で記事を開くとエラがー出たので対応します。わかりやすくてとても助かる 😎。
![zenn-error](https://storage.googleapis.com/zenn-user-upload/d51953a7fa3ab46d65881541.png)

## Markdown メタデータを対応する

既存の命名にこだわりもないので Zenn で使われているキーワードに全部移行する。

#### topics, published, type 対応

- `topics` -> `topics`
- `status: draft` -> `published: false`
- `type: tech` を追加

追加メタは正規表現で一括置き換えした。
s/`( -.*\n)---`/`$1type: tech\npublished: true\n---`
![zenn-add-tag](https://storage.googleapis.com/zenn-user-upload/82781151e7b0135692c824b5.png)

Gatsby 側のコードに関わる部分も対応が必要です。`topics` や `status` など対応しました。

#### emoji 追加

お気に入りの記事だけ設定した。オプショナルでランダムな(ハッシュから？)絵文字を設定してくれる。
ランダムでもそれっぽくなる。

#### 短すぎる slug の修正

slug (ファイル名のキーワード) を**12 文字〜50 文字** に対応します。
12 文字より短いのがあったので修正した。ちょっと大変だった。
こだわってつけていたわけじゃないから命名は楽だった。

#### topics の記号禁止対応

Zenn 側では登録されている Toipcs タグの表示はアイコンやラベルがマッピングされます。
既存記事ではスペースやドットなど記号込みでつけていたので修正しました。
(そもそもメタデータ記法として正しいのかわからないまま記号入りで書いていました。)
大小文字は対応してくれている優しさを感じる。

### Markdown 本文修正

#### diff タイプのコードブロック対応

なぜか diff タイプのコードブロックがうまく動きませんでした。
JSON parse Error みたいなのが出てしまいました。
` ```diff.*` を ` ``` ` に置き換えて対応しました。

#### 目次(gatsby-remark-table-of-contents) を削除する

目次に[gatsby\-remark\-table\-of\-contents \| Gatsby](https://www.gatsbyjs.com/plugins/gatsby-remark-table-of-contents/) を使っていました。

````
```toc
# This code block gets replaced with the TOC
```
````

目次つけたい記事内に毎回これを挿入する必要があってイケてないので削除しました。

## canonical url

[gatsby\-plugin\-react\-helmet\-canonical\-urls \| Gatsby](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet-canonical-urls/?=canonical%20url) を使って設定しました。

[gatsby\-plugin\-canonical\-urls](https://www.gatsbyjs.com/plugins/gatsby-plugin-canonical-urls/?=canonical%20url) も試したんですが、パスを含む siteUrl に対応できなかったので(`https://zenn.dev/slug` になってしまう)やめました。

## 対応完了 🎉

91 記事インポートできました。

![](https://storage.googleapis.com/zenn-user-upload/fd657c1252f2bccc00a428ed.png)

## その他後回しにしてる部分

- 記事タイトルをに`【JavaScript】` みたいなのいれてるのを外す。
- コードブロックの title 対応
  - gatsby に依存しているため ` ```js title=hoge.js` っていう微妙なフォーマットになっている。

## Zenn cli preview 編集関係

Zenn でのプレビューは npm scripts に追加すると `yarn zen` ですぐ見れます。

```title=package.json
    "zenn": "yarn zenn:export && (cd out_zenn && npx zenn)",
```

#### VSCode Plugin Zenn Editor を使えるようにする

![vscode-zenn-editor](https://storage.googleapis.com/zenn-user-upload/29ce0451c3310c2499d1f49c.png)

articles, books ディレクトリの構造がないと使えないためシンボリックリンクで実現しました。

```
mkdir zenn_tmp
ln -s ../content/blog/2021/ ./articles
code zenn_tmp
```

マークダウンがどう表示されるのか気になって試したけど、今後は使うこと無い(かも)。

### ちょっと困ったこと

現状 GitHub 連携してしまうと Zenn web での執筆 UI がどんなものなのか試せませんでした。
books だけ web で書きたさがあったりします。

## 感想

基本今までイマイチだなあと思っていた仕様を対応する形になったので良かったです。
zen の ローカル preview のエラーがめっちゃわかりやすくてリッチな体験でした。
