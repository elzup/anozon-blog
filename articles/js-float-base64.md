---
title: Buffer と float、整数、他エンコードとの相互変換【Javascript】
date: 2020-11-01 17:00:00
topics:
  - JavaScript
  - Binary
  - Buffer
type: tech
published: true
---

JavaScript で Buffer と他の型への変換する方法をまとめました。

repl も公開しています。
[Repl\.it \- buffer](https://repl.it/@anozon/buffer#index.js)

## 数値 → Buffer

数値は **→ 型付き配列 → Buffer** という順に変換する。

```js
// int → Buffer
const intBuf = Buffer.from(new Uint8Array([120]).buffer)
// float → Buffer
const floatBuf = Buffer.from(new Float32Array([1.23]).buffer)
// double → Buffer
const doubleBuf = Buffer.from(new Float64Array([1.2345]).buffer)
```

## Buffer → 数値

```js
// Buffer → int
const int = intBuf.readInt8(0)
// Buffer → float
const float = floatBuf.readFloatLE(0)
// Buffer → double
const double = doubleBuf.readDoubleLE(0)

// { int: 120, float: 1.2300000190734863, double: 1.2345 }
```

## 文字列 ↔ Buffer

一番シンプル。

```js
// string → Buffer
const strBuf = Buffer.from('かぼちゃ')
// <Buffer e3 81 8b e3 81 bc e3 81 a1 e3 82 83>

// string → Buffer
strBuf.toString()
// かぼちゃ
```

## 他のエンコーディング ↔ Buffer

```js
// かぼちゃ Buffer → 各エンコード

strBuf.toString('hex')
// e3818be381bce381a1e38283
strBuf.toString('base64')
// 44GL44G844Gh44KD
strBuf.toString('utf8')
// かぼちゃ
strBuf.toString('utf16le')
// 臣벁臣莂

// 各エンコード → Buffer
Buffer.from('e3818be381bce381a1e38283', 'hex')
Buffer.from('44GL44G844Gh44KD', 'base64')
Buffer.from('かぼちゃ', 'utf8')
Buffer.from('臣벁臣莂', 'utf16le')
// <Buffer e3 81 8b e3 81 bc e3 81 a1 e3 82 83>
```

## 他の数値型について

例に上げた `Uint8` や `Float32` の他にも種類があり、"サイズ(バイト数)", "符号の有無" により複数あります。
適したものを使いましょう。

from buffer
[Buffer \| Node\.js v15\.0\.1 Documentation](https://nodejs.org/api/buffer.html)

to buffer
[JavaScript 型付き配列 \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Typed_arrays)

## 変換例

base64 エンコード文字を Dobule 型に戻す例。
(base64 ↔ Buffer ↔ Double)

```js
Buffer.from(new Float64Array([321.123]).buffer).toString('base64')
// 'hxbZzvcRdEA='
Buffer.from('hxbZzvcRdEA=', 'base64').readDoubleLE()
// 321.123
```

hex エンコードを int に戻す。
(hex ↔ Buffer ↔ int)

```js
Buffer.from(new Int32Array([20201010]).buffer).toString('hex')
// '323e3401'
Buffer.from('323e3401', 'hex').readInt32LE(0)
// 20201010
```

### 範囲を間違えると別の値になる

当然ですが書き込んだ形式と別の読み出し型をすると別の値になっていまします。

```js
const b1 = Buffer.from(new Uint32Array([1234]).buffer)
b1.readInt32LE(0)
// o 1234
b1.readInt32BE(0)
// x -771489792 エンディアン間違い
b1.readInt8(0)
// x -46 Byte長 間違い
```

変換時の値の範囲が間違えていても同様です。

```js
const b2 = Buffer.from(new Uint8Array([-10]).buffer)
// 範囲ミス Unsigned なのにマイナス
b2.readUInt8(0)
// x 246

const b3 = Buffer.from(new Uint16Array([65536]).buffer)
// 範囲ミス 65535 より大きい値
b3.readUInt16LE(0)
// x 0
```
