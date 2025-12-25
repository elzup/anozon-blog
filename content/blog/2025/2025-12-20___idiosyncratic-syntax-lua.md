---
title: '各言語特有っぽい構文: Lua'
date: 2025-12-20 00:00:00
topics:
  - Lua
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 20 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。

```lua
-- Lua - テーブル + メタテーブル + コルーチン
function binarySearch(arr, target)
    local left, right = 1, #arr

    while left <= right do
        local mid = math.floor((left + right) / 2)
        local value = arr[mid]

        if value == target then
            return mid
        elseif value < target then
            left = mid + 1
        else
            right = mid - 1
        end
    end
    return nil
end

local arr = {1, 3, 5, 7, 9}
print(binarySearch(arr, 5) or -1)  -- 3 (Luaは1始まり)
```

軽量なのでゲーム組み込み用途でも有名。テーブル一つで何でも表現するミニマルな設計思想。
ミニマルすぎて今では珍しい構文は少ない。

## ピックアップ構文

### テーブル

配列と連想配列の両方として使える唯一のデータ構造。

```lua
-- 配列として
local arr = {1, 2, 3, 4, 5}
print(arr[1])  -- 1 (1始まり!)
print(#arr)    -- 5 (長さ)

-- 連想配列として
local person = {
    name = "Alice",
    age = 30,
    ["key with space"] = "value"
}
print(person.name)  -- Alice
print(person["age"])  -- 30

-- 混合
local mixed = {1, 2, 3, name = "test"}
```

1 始まりやテーブルという構造しかないのは特徴的。テーブルは PHP の連想配列に似ている。

### メタテーブル

テーブルの動作をカスタマイズし、オブジェクト指向や演算子オーバーロードを実現できる。

```lua
-- オブジェクト指向風
local Vector = {}
Vector.__index = Vector

function Vector.new(x, y)
    return setmetatable({x = x, y = y}, Vector)
end

function Vector:length()
    return math.sqrt(self.x^2 + self.y^2)
end

-- 演算子オーバーロード
function Vector.__add(a, b)
    return Vector.new(a.x + b.x, a.y + b.y)
end

local v1 = Vector.new(3, 4)
print(v1:length())  -- 5
```

### コルーチン

協調的マルチタスクを実現する軽量スレッド機能。

```lua
-- 協調的マルチタスク
local co = coroutine.create(function()
    for i = 1, 3 do
        print("coroutine:", i)
        coroutine.yield(i)
    end
end)

coroutine.resume(co)  -- coroutine: 1
coroutine.resume(co)  -- coroutine: 2

-- ジェネレータ風
function range(n)
    return coroutine.wrap(function()
        for i = 1, n do
            coroutine.yield(i)
        end
    end)
end

for i in range(5) do print(i) end
```

### 演算子 `and` / `or` / `not`

短絡評価を利用してデフォルト値や条件式を簡潔に書ける。

```lua
-- 短絡評価でデフォルト値
local name = user_name or "anonymous"

-- 三項演算子風
local result = condition and "yes" or "no"

-- nil チェック
if value ~= nil then
    -- nil でない
end
```

`and`/`or` で三項演算子を再現する書き方は Lua イディオム。`~=` も独特。

### 可変長引数

...を使って任意の数の引数を受け取れる。

```lua
function sum(...)
    local args = {...}
    local total = 0
    for _, v in ipairs(args) do
        total = total + v
    end
    return total
end

print(sum(1, 2, 3, 4, 5))  -- 15
```
