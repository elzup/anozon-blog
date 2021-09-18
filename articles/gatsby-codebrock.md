---
title: GatsbyJSでコードブロックを作成する
date: 2020-01-05 23:03:38
topics:
  - GatsbyJS
type: tech
published: true
---

この記事では GatsbyJS で作っているブログのコードブロックをカスタマイズします。
現状 Plain Text なので Syntax Hilight と style 調整をします。

## 手順 1. prismjs のプラグインを追加

```sh
yarn add gatsby-transformer-remark gatsby-remark-prismjs prismjs
yarn add gatsby-remark-prismjs-title
```

[gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=prismjs) と
[gatsby-remark-prismjs-title](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs-title/)を追加します。

## 手順 2. config の追加

`/gatsby-config.js` に config を追加します。
**root の plugins に書くのではなく、 `gatsby-transformer-remark` 以下の plugins へ書くことに注意します。**

```diff:title=gatsby-config.js
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
+          'gatsby-remark-prismjs-title',
+          {
+            resolve: `gatsby-remark-prismjs`,
+            options: {
+              classPrefix: 'language-',
+              inlineCodeMarker: null,
+              aliases: {
+                js: 'javascript',
+                sh: 'bash',
+              },
+              showLineNumbers: false,
+              noInlineHighlight: false,
+              languageExtensions: [
+                {
+                  language: 'superscript',
+                  extend: 'javascript',
+                  definition: { superscript_types: /(SuperType)/ },
+                  insertBefore: {
+                    function: { superscript_keywords: /(superif|superelse)/ },
+                  },
+                },
+              ],
+              prompt: { user: 'root', host: 'localhost', global: false },
+              escapeEntities: {},
+            },
+          },
        ]
      }
```

aliases を使うことで `js` と短くことができます。

更にそれぞれの readme にあるように sample の style を書くことで
以下のような感じになりました。

![anozon blog new codebrock](https://elzup-image-storage.s3-ap-northeast-1.amazonaws.com/blog/codebrock.png)

## gatsby-remark-prismjs-title と gatsby-remark-code-titles

この 2 つのプラグインはどちらもコードブロックの直前に title を挿入してくれるプラグインです。

今回使っていない方 `gatsby-remark-code-titles`では div 単体でコードが挿入されます。
`gatsby-remark-prismjs-title`では div > span の構造で挿入してくれるため style しやすいためこちらを選択しました。
