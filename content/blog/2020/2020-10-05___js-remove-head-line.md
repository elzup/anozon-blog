---
title: js で文字列の先頭のn 行を削除する
date: 2020-10-05 18:00:00
tags:
  - JavaScript
type: tech
published: true
---

## コード 1

`Array#slice` を使う方法です。

```js
const removeHeads = (s, n) => s.split('\n').slice(n).join('\n')
```

```js
const removeHeads = (s, n) => s.split('\n').slice(n).join('\n')

removeHeads(text, 1)
// 'line2\nline3\nline4'
removeHeads(text, 2)
// 'line3\nline4'
removeHeads(text, 3)
// 'line4'
removeHeads(text, 4)
// ''
removeHeads(text, 5)
// ''
```

## コード 2

コード 1 でいいですが最初に思いついた正規表現で削る方法です。
~~動作が早いかわからないですが~~ **(渡される n が行数より大きいときに使えません。)**
遅かったです。[Repl\.it \- regex\-vs\-slice](https://repl.it/@anozon/regex-vs-slice#index.js)

```js
const removeHeads = (s, n) => s.replace(new RegExp(".*\n".repeat(n))
```
