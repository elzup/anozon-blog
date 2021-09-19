---
title: 組み合わせ・順列プログラミングそれぞれまとめ nPr nCr nHr nΠr
date: 2021-07-29 21:00:00
topics:
  - 数学
  - Array
  - Rust
  - Python
  - 高階関数
  - 競技プログラミング
type: tech
published: true
---

順列を扱うための情報をまとめました。

## 4 パターン表

| 名前         | 英語                          | 記号 | A,B から 2 つ |
| ------------ | ----------------------------- | ---- | ------------- |
| 順列         | Permutation                   | nPr  | `AB BA`       |
| 重複順列     | Peramutation with replacement | nΠr  | `AA AB BA BB` |
| 組合わせ     | Combination                   | nCr  | `AB`          |
| 重複組合わせ | Combination with replacement  | nHr  | `AA AB BB`    |

### もう少しだけ複雑な例

#### 順列

<sub>4</sub>P<sub>2</sub>(4 個の中から 2 個選んで並べる)

```
AB AC AD BA BC BD CA CB CD DA DB DC
[0, 1][0, 2][0, 3][1, 0][1, 2][1, 3][2, 0][2, 1][2, 3][3, 0][3, 1][3, 2]
```

#### 重複順列

類語: `sequence with repetition`、 直積、全列挙。

<sub>2([0,1])</sub>Π<sub>n</sub> で n 桁の bit 全探索になる。
<sub>4</sub>Π<sub>2</sub>(重複ありで 4 個の中から 2 個選んで並べる)

```
AA AB AC AD BA BB BC BD CA CB CC CD DA DB DC DD
[0, 0][0, 1][0, 2][0, 3][1, 0][1, 1][1, 2][1, 3][2, 0][2, 1][2, 2][2, 3][3, 0][3, 1][3, 2][3, 3]
```

#### 組合わせ

<sub>4</sub>C<sub>2</sub>(4 個の中から 2 個選ぶ)

```
AB AC AD BC BD CD
[0, 1][0, 2][0, 3][1, 2][1, 3][2, 3]
```

#### 重複組合わせ

<sub>4</sub>H<sub>2</sub>(重複ありで 4 個の中から 2 個選ぶ)

```
AA AB AC AD BB BC BD CC CD DD
[0, 0][0, 1][0, 2][0, 3][1, 1][1, 2][1, 3][2, 2][2, 3][3, 3]
```

## コード例

### Rust

```rust
use itertools::{iproduct, Itertools};

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

itertools.permutations('ABCD', 2)
# AB AC BA BC CA CB

itertools.product('ABCD', repeat=2)
# AA AB AC BA BB BC CA CB CC

itertools.combinations('ABCD', 2)
# AB AC BC

itertools.combinations_with_replacement('ABCD', 2)
# AA AB AC BB BC CC
```
