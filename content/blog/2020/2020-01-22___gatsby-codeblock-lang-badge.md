---
title: GatsbyJS のコードブロックに言語バッジをつける方法
date: 2020-01-22 12:00:00
tags:
  - GatsbyJS
  - CSS
type: tech
published: true
---

この記事では GatsbyJS のコードブロックに言語バッジをつける方法について紹介します。

前提として `gatsby-remark-prismjs` を使っています。

やり方を考えてるとき www.gatsbyjs.org/docs のコードブロックにも言語表示があったのと、このサイト自体も GatsbyJS で書かれていたことを思い出しました。
そこでインスペクターで覗いてみたら **`::before`を使っていました。**

![graphql-name-tag.png](https://elzup-image-storage.s3.amazonaws.com/blog/graphql-name-tag.png)

同じ方法で実装してみます。

**Before**

![](https://elzup-image-storage.s3.amazonaws.com/blog/codeblock-before.png)

**After**

![](https://elzup-image-storage.s3.amazonaws.com/blog/codeblock-after.png)

## CSS を書く

```css:title=globa.scss
pre[class*='language-'] {
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    right: 2em;
    padding: 0 8px;
    border-radius: 0 0 4px 4px;
    font-size: 0.8em;
    color: black;
  }

  &.language-javascript::before {
    content: 'JS';
    background: yellow;
  }

  &.language-ts::before {
    content: 'TS';
    color: white;
    background: blue;
  }
}
```

ついでにコードブロックタイトルの style も変えました。

`::before` (疑似要素) は最後につけないといけないため scss でも、下記の書き方はできないんですね。地味に。

```css
hoge::after {
  &.foo {
  }
}
```
