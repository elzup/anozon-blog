---
title: 【JavaScript】ソースコードを出力するソースコード書いた
date: 2020-02-26 21:00:00
tags:
  - JavaScript
  - CodingChallange
---

ソースコード自身を出力するソースコード書いてみました。

`fs.readFile` は使いません。

面白そうだと思った人は以降を見ずに挑戦してみてください。

```toc

```

## 成果コード

<!-- prettier-ignore -->
```js
const quote = String.fromCharCode(96)
const unzip = str => {
  return str + 'console.log(unzip(' + quote + str + quote + '))'
}
console.log(unzip(`
const quote = String.fromCharCode(96)
const unzip = str => {
  return str + 'console.log(unzip(' + quote + str + quote + '))'
}
`))
```

<!-- prettier-ignore-end -->

## 解説

動作を追うと若干頭がグワングワンしますが、意外とシンプルです。

![](https://elzup-image-storage.s3.amazonaws.com/blog/code-own-print.png)

まず赤枠二箇所は全く同じコードです。上の関数で全体を出力します。

青枠がそれ以外の部分を出力する部分です。

紫が最後にバッククォート自身を下のヒアドキュメント内部に直接書き込んでしまうと構文エラーになるので
上の関数で **バッククォート**を使わずにバッククォートを出力するように工夫しています。

最終的に
青、赤、紫、赤、青と全体を出力できました。

## 動画

挑戦してたときの実況動画。

https://www.youtube.com/watch?v=_FD4l394JHc&t=468s

## 最小コード

同じ方法で最小限にすると以下の一行になります。

<!-- prettier-ignore -->
```js
q = String.fromCharCode(34);m = s => s + ';console.log(m(' + q + s + q + '))';console.log(m("q = String.fromCharCode(34);m = s => s + ';console.log(m(' + q + s + q + '))'"))
```

別例。

<!-- prettier-ignore -->
```js
m = s => s + ';console.log(m(' + (q = String.fromCharCode(34)) + s + q + '))';console.log(m("m = s => s + ';console.log(m(' + (q = String.fromCharCode(34)) + s + q + '))'"))
```

<!-- prettier-ignore-end -->
