---
title: 組み合わせ・順列プログラミングそれぞれまとめ nPr nCr nHr nΠr
date: 2021-07-29 21:00:00
tags:
  - 数学
  - Array
  - Rust
  - Python
  - 高階関数
  - 競技プログラミング
---

順列を扱うための情報をまとめました。

## 4 パターン表

| 名前         | 英語                          | 記号 | 2X2 [0, 1] から 2 つ       |
| ------------ | ----------------------------- | ---- | -------------------------- |
| 順列         | Permutation                   | nPr  | `[0, 1][1, 0]`             |
| 重複順列     | Peramutation with replacement | nΠr  | `[0, 0][0, 1][1, 0][1, 1]` |
| 組合わせ     | Combination                   | nCr  | `[0, 1]`                   |
| 重複組合わせ | Combination with replacement  | nHr  | `[0, 0][0, 1][1, 1]`       |

## もう少しだけ複雑な例

3 X 2

### 順列

<sub>3</sub>P<sub>2</sub>(3 個の中から 2 個選んで並べる)

`[0, 1][0, 2][1, 0][1, 2][2, 0][2, 1]`

### 重複順列

<sub>n</sub>Π<sub>2</sub> で n 桁の bit 全探索になる。
<sub>3</sub>Π<sub>2</sub>(重複ありで 3 個の中から 2 個選んで並べる)

`[0, 0][0, 1][0, 2][1, 0][1, 1][1, 2][2, 0][2, 1][2, 2]`

### 組合わせ

<sub>3</sub>C<sub>2</sub>(3 個の中から 2 個選ぶ)

`[0, 1][0, 2][1, 2]`

### 重複組合わせ

<sub>3</sub>H<sub>2</sub>(重複ありで 3 個の中から 2 個選ぶ)

`[0, 0][0, 1][0, 2][1, 1][1, 2][2, 2]`

## コード例

### Rust

```rust
// permutation
(0..3).permutations(2)
// [0, 1][0, 2][1, 0][1, 2][2, 0][2, 1]

// permutation with replacement
iproduct!(0..3, 0..3)
// (0, 0)(0, 1)(0, 2)(1, 0)(1, 1)(1, 2)(2, 0)(2, 1)(2, 2)

// combination
(0..3).combinations(2)
// [0, 1][0, 2][1, 2]

// combination with replacement
(0..3).combinations_with_replacement(2)
// [0, 0][0, 1][0, 2][1, 1][1, 2][2, 2]
```

重複順列だけ Rust の経験が浅くてわからないです。
擬似言語で言うこんな書き方ができれば実現できそうです。

```rust
// 引数 r 個分同じ長さの配列を Rest parameters(残余構文)で渡す
iproduct!(...(0..3).repeat(2))
```

### Python

```python
import itertools

itertools.product('ABCD', repeat=2)
# AA AB AC AD BA BB BC BD CA CB CC CD DA DB DC DD

itertools.permutations('ABCD', 2)
# AB AC AD BA BC BD CA CB CD DA DB DC

itertools.combinations('ABCD', 2)
# AB AC AD BC BD CD

itertools.combinations_with_replacement('ABCD', 2)
# AA AB AC AD BB BC BD CC CD DD
```
