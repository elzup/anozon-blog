---
title: Python で TypeScript の UnionType を使う
date: 2020-08-24 15:00:00
tags:
  - Python
  - TypeScript
---

TypeScript の UnionType は以下のように定義できます。

```ts
type Color = 'red' | 'green'
```

Python の type でも同じようなことができるのか調べました。
ちなみに `typeing.Union` というのがありますが別です。

## typeing.Literal を使う

```python
from typing import Literal, get_args

COLOR = Literal['red', 'green', 'blue']
SIZE = Literal[1, 2, 4, 8, 12]

## assign
color: COLOR = 'red'

## argument
def func(color: COLOR, size: SIZE):
  pass

func('yellow', 8)  # error
# Argument of type "Literal['yellow']" cannot be assigned to parameter "color" of type "COLOR" in function "func"

func('red', 8) # ok
```

ちなみに get_args を使うとタプルで取得できます。

```
get_args(SIZE)
# => (1, 2, 4, 8, 12)
```

## よくわかってない部分

### 補完ができない

string について補完できる環境が作れるのかはわかりません。

環境 VSCode
plugin: `Python`, `Python Type Hint`, `Pyright`

### 計算して渡せない

```py
func('red', 4 * 2)
```

上のように書くと `4 * 2` でエラーが出てしまいます。
