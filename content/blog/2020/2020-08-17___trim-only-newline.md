---
title: js の trim で前後の改行のみ取り除く(空白は保持する)
date: 2020-08-17 17:00:00
tags:
  - JavaScript
type: tech
published: true
---

複数行テキストの trim で行頭の空白を消されたくない時があったので、前後の改行のみ消す方法を紹介します。

## 方法

### コード

```js
const trimLine = (text: string) => text.replace(/^\n*|\n*$/g, '')
```

### サンプル

[Repl\.it \- trim\-only](https://repl.it/@anozon/trim-only#index.js)

```js
const text = `

  <- keep space ->   
keep double newline


  <- keep space ->   


`

const trimKeepWhite = (text) => text.replace(/^\n*|\n*$/g, '')

const res1 = text.trim()
const res2 = trimKeepWhite(text)

const wrapLines = (text) =>
  text
    .split('\n')
    .map((l) => `|${l}|`)
    .join('\n')

console.log('trim')
console.log(wrapLines(res1))

console.log()
console.log('trim without whitespace')
console.log(wrapLines(res2))
```

### 動作

```
trim 空白も削除されます。
|<- keep space ->   |
|keep double newline|
||
||
|  <- keep space ->|

trim without whitespace 空白は保持しています。
|  <- keep space ->   |
|keep double newline|
||
||
|  <- keep space ->   |
```
