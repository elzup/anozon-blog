---
title: '各言語特有っぽい構文: Python'
date: 2025-12-02 00:00:00
topics:
  - Python
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 2 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

```python
def binary_search(arr: list, target) -> int:
    left, right = 0, len(arr) - 1
    while left <= right:
        if arr[mid := (left + right) // 2] == target:
            return mid
        left, right = (mid + 1, right) if arr[mid] < target else (left, mid - 1)
    return -1

print(binary_search([1, 3, 5, 7, 9], 5))  # 2
```

## ピックアップ構文

#### ブロック構文

```python
# インデントでブロックを表現
def func():
    if condition:
        print("ok")
    else:
        print("ng")
```

エディタキーバインドによっては親和性がなくてセットアップが必要かもしれない。



### walrus(セイウチ)演算子 `:=`

```python
# 代入と式を同時に
if (n := len(arr)) > 10:
    print(f"長さ: {n}")

# ループ内で活用
while (line := input()) != "quit":
    print(line)

# 条件式内で計算結果を保持
if (idx := bisect_left(arr, target)) < len(arr):
    return arr[idx]
```

if 文前に変数を用意しなくてもよくなるので便利。

### タプルアンパック

```python
# 複数代入
left, right = 0, len(arr) - 1

# スワップ
a, b = b, a

# 条件付き代入 三項演算子
#  条件式 ? 真の場合 : 偽の場合
left, right = (mid + 1, right) if condition else (left, mid - 1)
result = "even" if n % 2 == 0 else "odd"
```

### スライス

```python
arr[1:4]      # インデックス1〜3
arr[:3]       # 最初から3つ
arr[2:]       # インデックス2以降
arr[::2]      # 2つおき
arr[::-1]     # 逆順

[10, 20, 30, 40, 50][1:4:2] # => [20, 40]
```

### numpy

```python
import numpy as np
a = np.array([[0, 1, 0],
              [0, 2, 0],
              [0, 3, 0]])
a[:, 1]  # [1, 2, 3]
```

#### リスト内包表記

```python
# リスト生成
squares = [x**2 for x in range(10) if x % 2 == 0]
```

### unbound method と bound method

```
class Value:
    def __init__(self, v):
        self.v = v

    def add(self, n):
        return self.v + n

    def double(self):
        return self.v * 2

v5 = Value(5)
v8 = Value(8)

# 1. bound method（self は自動で入る）
v3.double()            # => 6
# 2. unbound method（self を手動で渡す）
Value.double(v3)       # => 6


# 3. bound method with argument
v5.add(v8)              # => 13
# 4. unbound method with argument（第1引数が self）
Value.add(v5, v8)       # => 13
```

関数型プログラミングに通づる物があって好き。
