---
title: "各言語特有っぽい構文: JavaScript/TypeScript"
date: 2025-12-01 00:00:00
topics:
  - JavaScript
  - TypeScript
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 1日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。

```javascript
// JavaScript - 分割代入 + スプレッド合成 (while版)
const binarySearch = (arr, target) => {
  let { left, right } = { left: 0, right: arr.length - 1 };

  while (left <= right) {
    const mid = (left + right) >>> 1;
    const value = arr.at(mid) ?? undefined;

    if (value === target) return mid;

    ({ left, right } = value < target
      ? { left: mid + 1, right }
      : { left, right: mid - 1 });
  }
  return -1;
};

console.log(binarySearch([1, 3, 5, 7, 9], 5)); // 2
```

```typescript
// TypeScript - ジェネリクス + 再帰 + スプレッド合成
type Range = { left: number; right: number };

const binarySearch = <T>(arr: T[], target: T): number => {
  const search = ({ left, right }: Range): number => {
    if (left > right) return -1;
    const mid = (left + right) >>> 1;
    const value = arr.at(mid);
    if (value === target) return mid;
    return search(
      value! < target
        ? { ...{ left, right }, left: mid + 1 }
        : { ...{ left, right }, right: mid - 1 }
    );
  };
  return search({ left: 0, right: arr.length - 1 });
};

console.log(binarySearch([1, 3, 5, 7, 9], 5)); // 2
```

## ピックアップ構文
### オブジェクトの定義
```
const obj = { key1: value1, key2: value2 }
type ObjType = { key1: Type1; key2: Type2 } // TS
```
JSON ライクに書ける。

key はダブルクウォートが基本不要。

### アロー関数
```
// 短くかける, 式を返せる
const binarySearch = (arr, target) => { ... }

// 同等
function binarySearch(arr, target) { ... } // this がある

// 値も返せる
const sum = (a, b) => a + b
const merge = (obj1, obj2) => ({ ...obj1, ...obj2 }) 
```

とても短くかけて好きな部分。

### 分割代入・スプレッド構文・オブジェクト合成

```
// フィールド取り出し
const { left, right } = state
// 引数も分割代入可能
const area = ({ left, right }) => {}
// オブジェクト合成
{ ...state, left: mid + 1 }
const newState = { ...oldState, key: newValue }
const { a, b, ...rest } = obj
// with assign
const { a: alpha, b: beta } = obj
const area = ({ left: l, right: r }) => {}
const { size: { w, h: height }} = rect
```

これも柔軟に書けるので好きな部分。

### Nullish coalescing
`??`
```
null ?? 'default' // 'default'
undefined ?? 'default' // 'default'
0 ?? 'default' // 0
'' ?? 'default' // ''
```

### ジェネリクス `<T>` (TS)

```
const swap = <T, S>(t: T, s: S): [S, T] => [s, t]
```
