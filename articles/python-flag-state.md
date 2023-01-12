---
title: Python の Flag と状態モデルの相性がいい
date: 2023-01-12 19:00:00
topics:
  - Python
  - Flag
type: tech
published: true
emoji: 🚥
---

Python の enum には Flag という機能があることを知りました。入れ子の状態を表現するのに便利そうだと思い使ってみました。
今回はエアコンの状態を例に説明します。

```mermaid
stateDiagram-v2
  direction LR
    [*] --> Off
    Off --> Running
    Running --> Off
    state Running {
      [*] --> Cooling
      Cooling --> Heating
      Heating --> Dry
      Dry --> Cooling
    }
```

```python
from enum import Flag, IntEnum, auto

class State(Flag):
    Off = auto()
    Cooling = auto()
    Heating = auto()
    Dry = auto()
    Running = Cooling | Heating | Dry
```

まず enum 同様以下のように使用できます。

```python
# わかりやすいようにあえて変数名は heat にします
heat = State.Heating

heat
> <State.Heating: 4>

heat == State.Heating
> True

heat == State.Dry
> False

```

しかし属する親状態への判定が enum だとできません。

```python
heat == State.Running
> False
```

代替案として以下のように列挙することになります。

```python
heat == State.Heating or heat == State.Dry or heat == State.Cooling
> True
```

ここで Flag の OR 定義を活かすことができます。

` Running = Cooling | Heating | Dry`

```python
# 同様
heat in State.Heating
> True

# 同様
heat in State.Dry
> False

# 判定可能！
heat in State.Running
> True
```

2 重以上の状態に対してももちろん有効です。

```python
class State(Flag):
    Off = auto()
    Cooling = auto()
    HeatingWeak = auto()
    HeatingStrong = auto()
    Heating = HeatingWeak | HeatingStrong
    Dry = auto()
    Running = Cooling | Heating | Dry

State.HeatingWeak in State.Running
> True
```
