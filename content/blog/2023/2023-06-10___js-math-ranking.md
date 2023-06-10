---
title: JS でよく使われている Math関数やObject関数ランキング出してみた
date: 2023-06-10 12:00:00
topics:
  - JavaScript
  - Math
type: tech
published: true
emoji: 📊
---

`Math.sign` を知ったことがきっかけで、他に知らない組み込み関数がないか調べることにしました。

順番に読んでいくのは退屈そうだったので、使用頻度の低い順で読むことにしました。以下はそのために作ったデータです。

## 調査方法

GitHub のソースコード検索 API を使いました。 `language` が `JavaScript` と `TypeScript` のコードで絞り込んでいます。

コード: https://github.com/elzup/HowUsedCodeList

## Math 関数とフィールドの使用頻度

<div style="display: flex;">
  <img style="width: 50%;" src="https://elzup-image-storage.s3.amazonaws.com/blog/how-used-code-math-bar.png" />
  <img style="width: 50%;" src="https://elzup-image-storage.s3.amazonaws.com/blog/how-used-code-math-pie.png" />
</div>

`dumped at 2023/6/10`

| code         | count  |
| ------------ | ------ |
| Math.floor   | 681728 |
| Math.max     | 539392 |
| Math.round   | 419584 |
| Math.min     | 405888 |
| Math.random  | 278016 |
| Math.abs     | 268672 |
| Math.ceil    | 246272 |
| Math.sqrt    | 201968 |
| Math.PI      | 196008 |
| Math.pow     | 161472 |
| Math.cos     | 116768 |
| Math.sin     | 95544  |
| Math.log     | 55968  |
| Math.atan    | 50716  |
| Math.E       | 42464  |
| Math.atan2   | 32608  |
| Math.tan     | 19712  |
| Math.exp     | 17624  |
| Math.sign    | 11368  |
| Math.acos    | 10836  |
| Math.asin    | 10280  |
| Math.trunc   | 10040  |
| Math.log10   | 7472   |
| Math.log2    | 7432   |
| Math.LN2     | 6488   |
| Math.hypot   | 5288   |
| Math.LN10    | 3824   |
| Math.imul    | 3664   |
| Math.fround  | 2882   |
| Math.sinh    | 2788   |
| Math.cbrt    | 2543   |
| Math.cosh    | 2328   |
| Math.tanh    | 2160   |
| Math.clz32   | 2136   |
| Math.log1p   | 2098   |
| Math.LOG2E   | 2044   |
| Math.SQRT2   | 2026   |
| Math.asinh   | 2023   |
| Math.LOG10E  | 1950   |
| Math.expm1   | 1941   |
| Math.atanh   | 1817   |
| Math.SQRT1_2 | 1784   |
| Math.acosh   | 1753   |

## Object 関数とフィールドの使用頻度

<div style="display: flex;">
  <img style="width: 50%;" src="https://elzup-image-storage.s3.amazonaws.com/blog/how-used-code-obj-bar.png" />
  <img style="width: 50%;" src="https://elzup-image-storage.s3.amazonaws.com/blog/how-used-code-obj-pie.png" />
</div>

dumped at 2023/5/22

| code                             | count  |
| -------------------------------- | ------ |
| Object.keys                      | 802816 |
| Object.assign                    | 546816 |
| Object.defineProperty            | 289024 |
| Object.is                        | 278528 |
| Object.entries                   | 217088 |
| Object.values                    | 204288 |
| Object.create                    | 181760 |
| Object.prototype                 | 176640 |
| Object.name                      | 84480  |
| Object.freeze                    | 83456  |
| Object.getPrototypeOf            | 52224  |
| Object.defineProperties          | 42112  |
| Object.setPrototypeOf            | 40704  |
| Object.getOwnPropertyNames       | 36608  |
| Object.fromEntries               | 31104  |
| Object.hasOwn                    | 23520  |
| Object.length                    | 16672  |
| Object.getOwnPropertyDescriptor  | 16400  |
| Object.getOwnPropertySymbols     | 15552  |
| Object.seal                      | 13280  |
| Object.isFrozen                  | 8560   |
| Object.getOwnPropertyDescriptors | 7904   |
| Object.isExtensible              | 6720   |
| Object.preventExtensions         | 6208   |
| Object.isSealed                  | 4136   |

### Number fields

dumped at 2023/6/10

| code                     | count |
| ------------------------ | ----- |
| Number.isInteger         | 41360 |
| Number.MAX_VALUE         | 31104 |
| Number.isNaN             | 25744 |
| Number.MAX_SAFE_INTEGER  | 23840 |
| Number.parseInt          | 19600 |
| Number.POSITIVE_INFINITY | 14432 |
| Number.isFinite          | 13384 |
| Number.prototype         | 10736 |
| Number.length            | 9408  |
| Number.NEGATIVE_INFINITY | 8936  |
| Number.parseFloat        | 6304  |
| Number.MIN_SAFE_INTEGER  | 6096  |
| Number.MIN_VALUE         | 5880  |
| Number.NaN               | 5116  |
| Number.EPSILON           | 4684  |
| Number.isSafeInteger     | 3552  |
| Number.name              | 1232  |

### String fields

dumped at 2023/6/10

| code                 | count  |
| -------------------- | ------ |
| String.fromCharCode  | 133216 |
| String.length        | 75840  |
| String.prototype     | 56872  |
| String.fromCodePoint | 6024   |
| String.raw           | 5216   |
| String.name          | 1722   |
