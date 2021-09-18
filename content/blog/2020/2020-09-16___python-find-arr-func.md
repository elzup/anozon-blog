---
title: Python で Array.find
date: 2020-09-16 11:00:00
tags:
  - Python
type: tech
published: true
---

配列の中で条件に該当する１つ目を取り出す関数。
なければ None を返す。

```py
def find(func, arr):
    rs = list(filter(func, arr))
    if len(rs) == 0: return None
    return rs[0]
```

```py
find(lambda v: v > 100, [1, 2, 101, 200])
# 101
print(find(lambda v: v > 100, [1, 2, 11, 20]))
# None
```
