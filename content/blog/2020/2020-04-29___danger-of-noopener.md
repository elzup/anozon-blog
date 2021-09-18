---
title: rel=noopenerをつけないサイトへの攻撃デモ
date: 2020-04-29 21:00:00
tags:
  - Security
  - HTML
type: tech
published: true
---

この記事では rel=noopener&quot;をつけないとどんなことができるのかをデモで示します。

```toc

```

## noopener の攻撃デモ

リンク: https://tools.anozon.me/noopener

```html
<a href="/noopener-attacker" target="_blank">
  noopenerをつけていない危険なリンク
</a>
<a href="/noopener-attacker" target="_blank" rel="noopener">
  noopenerをつけているリンク
</a>
```

noopener をつけていない危険なリンクから開いてパスワードフォームにタイプしてみます。

![](https://elzup-image-storage.s3.amazonaws.com/blog/noopener-attack.gif)

入力内容が攻撃者に丸見えですね。

## 攻撃サイト側のコード

`window.opener.document` でアクセスもとの document にアクセス出来てしまいます。怖いですね。

```ts
window.opener.document
  .getElementsByTagName('input')[0]
  .addEventListener('input', (e) =>
    // console.log(e.target.value)
  )
```

`window.opener` なんてめったにつかわないので デフォルトにしてくれたほうが楽そうですね。
