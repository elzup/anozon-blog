---
title: JSのテキストを&quot;しっかり&quot;行分割する
date: 2022-11-18 13:00:00
topics:
  - JavaScript
type: tech
published: true
emoji: 🪓
---

文字列のリストをコードにベタがきするとき使うコードです。  
複数ぎょうテンプレート文字列(ヒアドキュメント)を String 配列に変換します。

## 前後の空行を無視する

```js
const lines = `
a
b
`
  .trim()
  .split('\n')

// [ 'a', 'b' ]
```

> **Note**
> 空テキスト、改行のみのテキストの時に [``] を返すので注意

## 空行を全部消す

```js
const lines = `
a

b
`
  .split('\n')
  .filter(Boolean)
// [ 'a', 'b' ]
```

## 前後の空行を取り除き 0 行にも対応する

```js
const text = `
a
b
`
const lines = text === '' ? [] : text.trim().split('\n')
```

関数化すると

```js
const toLines = (text) => (text === '' ? [] : text.trim().split('\n'))

toLines(`
a

b
`)
// [ 'a', '', 'b' ]

toLines(`
`)
// [ '' ]
```
