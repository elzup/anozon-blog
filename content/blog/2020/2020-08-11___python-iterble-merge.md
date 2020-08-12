---
title: Python で 2つの Iterable をマージしてループする
date: 2020-08-11 18:00:00
tags:
  - Python
---

巨大なソート済み csv ファイルをソートしながらマージする事があったので。
2 つの Iterable な list をロジカルにループする方法を残しておきます。

## コード 1

```python
def merge_iter(f1, f2):
    row1 = next(f1)
    row2 = next(f2)
    while row1 and row2:
        if row2 is None or row1 < row2: # どちらを先にするか条件
            yield row1
            row1 = next(f1, None)
        else:
            yield row2
            row2 = next(f2, None)

arr2 = iter([3, 5, 7])
arr1 = iter([1, 2, 4, 6, 8, 9])

for row in merge_iter(arr1, arr2):
  print(row)
# => 1
# => 2
# => 3
# => ...
# => 9
```

[Repl\.it \- yield\-merge\-loop](https://repl.it/@anozon/yield-merge-loop#main.py)

`next(iter)` はなかった場合に例外を投げます。
第２引数で例外の代わりに返す値を指定できます。

## コード 2

汎用的な例です。

```python
def merge_iter(f1, f2, getter, compare):
    row1 = getter(f1)
    row2 = getter(f2)
    while row1 and row2:
        if row2 is None or compare(row1, row2):
            yield row1
            row1 = getter(f1)
        else:
            yield row2
            row2 = getter(f2)

def sort_merge_iter(f1, f2):
    next_or_none = lambda li: next(li, None)
    sort_comp = lambda a, b: a < b
    return merge_iter(f1, f2, next_or_none, sort_comp)
```

## 追記: コード 3

`heapq` を使っても出来ました。

```
import heapq
heapq.merge(f1, f2)
```
