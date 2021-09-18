---
title: js で先頭以外(n行目以降)をソートする
date: 2020-12-17 11:00:00
tags:
  - JavaScript
  - TypeScript
  - Tips
type: tech
published: true
---

js で配列の 2 行目以降のみをソートする方法のメモです。

repl: https://repl.it/@anozon/sortbody#index.ts

```toc

```

## ソート対象の配列

```ts
// js
const elems = [
  { name: 'primary', count: 10 }, // ソートしないで！
  { name: 'b', count: 2 },
  { name: 'd', count: 12 },
  { name: 'a', count: 1 },
  { name: 'c', count: 11 },
]

// ts
type Elem = {
  name: string
  count: number
}

const elems: Elem[] = [
  { name: 'primary', count: 10 },
  { name: 'b', count: 2 },
  { name: 'd', count: 12 },
  { name: 'a', count: 1 },
  { name: 'c', count: 11 },
]
```

## 先頭以外をソートする

```ts
function sortBody(arr0: Elem[]) {
  if (arr0.length <= 2) return arr0
  const [head, ...arr] = arr0

  arr.sort((a, b) => a.count - b.count)
  return [head, ...arr]
}
sortBody(elems)
// [ { name: 'primary', count: 10 },
//   { name: 'a', count: 1 },
//   { name: 'b', count: 2 },
//   { name: 'c', count: 11 },
//   { name: 'd', count: 12 } ]
```

## n 行目以降のみソートする

```ts
const arrSplit = <T>(aa: T[], n: number): [T[], T[]] => [
  aa.slice(0, n),
  aa.slice(n),
]
function sortBodyN(arr0: Elem[], n: number) {
  const [heads, arr] = arrSplit(arr0, n)

  arr.sort((a, b) => a.count - b.count)
  return [...heads, ...arr]
}
const sortBody = (arr0: Elem[]) => sortBodyN(arr0, 0)

sortBodyN(elems, 2)
// [ { name: 'primary', count: 10 },
//   { name: 'b', count: 2 },
//   { name: 'a', count: 1 },
//   { name: 'c', count: 11 },
//   { name: 'd', count: 12 } ]
```

## Lodash を使う場合

`_.sortBy(arr, [(o, i) => /* */ ])` のようには最初の index は取れ*なかった*ので
一旦 index をつけてから最後に戻す方法です。

```ts
import { sortBy } from 'lodash'
function sortBodyLoN(arr: Elem[], n: number) {
  return sortBy(
    arr.map((v, i) => [v, i]),
    [([o, i]) => (i < n ? i : Infinity), '0.count']
  ).map((v) => v[0])
}
```

```ts
import { sortBy } from 'lodash'

const withKey = <T>(a: T[]) => a.map((v, i): [number, T] => [i, v])
// const withKey = <T>(a: T[]) => Object.entries(a).map(([i, v]): [number, T] => [Number(i), v])

function sortBodyLo(arr: Elem[], n: number = 0) {
  return sortBy(withKey(arr), [
    ([i, o]) => (i < n ? i : Infinity),
    '1.count',
  ]).map((v) => v[1])
}
```

`([i, o]) => (i < n ? i : Infinity),` では i 行目以下のみソート(順番保持)しています。

Lodash に関しては TreeShaking 関係を意識することになるのでガッツリ使うとき以外は避けているのですが、  
複雑な条件のソートについては書きやすいので使うことが多いです。
