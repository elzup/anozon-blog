---
title: 【PLOP CLI】新しいファイルをテンプレートから生成するCLI
date: 2020-01-12
tags:
  - PLOP
  - Node.js
  - CLI
  - GatsbyJS
---

この記事では PLOP について紹介します。
GatsbyJS で書いている当ブログの記事作成を例に話します。

[Consistency Made Simple : PLOP](https://plopjs.com/)

## 手順 1. インストール

npm で global インストールだと何故か動かなかった。
プロジェクト依存で入れた。

```
yarn add plop -D
```

## 手順 2. テンプレートを作る

記事のテンプレートを用意します。
markdown でメタ情報含めて定義しました。

```:title=post.hbs
---
title: {{title}}
date: {{date}} {{hms}}
tags:
- a
- b
category: {{category}}
---

この記事では {{title}} について紹介します。
```

`{{variable}}` で変数を定義します。

## 手順 3. plopfile.js を作る

ファイルを生成する設定を書きます。

**テンプレートで必要となる変数**, **ファイルのパス**が揃うように作ります。

```js:title=propfile.js
const pad00 = num => String(num).padStart(2, '0')
const date = new Date()
const year = date.getFullYear()
const month = pad00(date.getMonth() + 1)
const day = pad00(date.getDate())
const hms = `${pad00(date.getHours())}:00:00`
const datePrefix = `${year}-${month}-${day}`

const categories = ['Other', 'Tech', 'BlogOps']

module.exports = function(
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setHelper('getKebabFirst', date => date.split('-')[0])
  plop.setHelper('hms', () => hms)
  plop.setGenerator('post', {
    description: 'Write new blog post',
    prompts: [
      { type: 'input', name: 'title' },
      { type: 'input', name: 'id', message: `kebab-case` },
      {
        type: 'input',
        name: 'date',
        default: datePrefix,
        message: `YYYY-MM-DD`,
      },
      {
        type: 'list',
        name: 'category',
        default: 'Tech',
        choices: categories,
      },
    ],
    actions: [
      {
        type: 'add',
        path: `content/blog/{{getKebabFirst date}}/{{date}}___{{id}}.md`,
        templateFile: 'templates/post.hbs', // 自分のテンプレートがある path
      },
    ],
  })
}
```

上記のコードによって、

title は入力して設定
id (slug, ファイルのパスに必要)も入力して設定、

category は選択して設定、

ファイルのパスやタイムスタンプはデフォルトで自動生成するようになります。

質問の `type` は [Inquirer\.js:](https://github.com/SBoudrias/Inquirer.js) の中から使えます。

[SBoudrias/Inquirer\.js: A collection of common interactive command line user interfaces\.](https://github.com/SBoudrias/Inquirer.js)

## 手順 4. 実行してみる

```
yarn plop
```

![plop example](https://elzup-image-storage.s3.amazonaws.com/blog/gatsby-plop-example.png)

```:title=content/blog/2020/2020-01-13___gatsby-plop-newpost.md
---
title: 【PLOP】GatsbyJSで新しい記事をテンプレートから作成する
date: 2020-01-13 20:00:00
tags:
- a
- b
category: BlogOps
---

この記事では 【PLOP】GatsbyJSで新しい記事をテンプレートから作成する について紹介します。

## 手順 1. 初期化する

## 手順 2. リクエストを定義する

## xx の場合
```

目的のファイルが目的のパスに生成されました！

## 感想

今回はテンプレートからファイル生成ということでシンプルに需要ありそうですが、そういうツール聞いたこと無いなと思って探してみて見つけたものでした。

最初"file template generator cli" などでググってなかなか見つからずに自分で shell や sed で実装しようとしました。
しかし、[react\-boilerplate/react\-boilerplate](https://github.com/react-boilerplate/react-boilerplate) で generator がついてたのを思い出して何が使われているのか調べたところ `plop` にたどり着きました。

もちろん他にも使えそうで良いものを見つけた。
