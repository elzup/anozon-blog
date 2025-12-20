---
title: "各言語特有っぽい構文: Julia"
date: 2025-12-23 00:00:00
topics:
  - Julia
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 23日目の記事です。

個人的な好みを交えて紹介します。


```julia
# Julia - 多重ディスパッチ + ブロードキャスト + マクロ
function binary_search(arr::AbstractVector{T}, target::T) where T
    left, right = 1, length(arr)

    while left ≤ right
        mid = (left + right) ÷ 2
        arr[mid] == target && return mid
        arr[mid] < target ? (left = mid + 1) : (right = mid - 1)
    end
    return nothing
end

arr = [1, 3, 5, 7, 9]
result = binary_search(arr, 5)
println(something(result, -1))  # 3 (Juliaは1始まり)
```

## ピックアップ構文

### 多重ディスパッチ
```julia
# 引数の型に応じて異なる実装
function process(x::Int)
    println("Integer: $x")
end

function process(x::String)
    println("String: $x")
end

function process(x::Int, y::Int)
    println("Two integers: $x, $y")
end

process(42)       # Integer: 42
process("hello")  # String: hello
process(1, 2)     # Two integers: 1, 2
```

### ブロードキャスト `.`
```julia
# 要素ごとの演算
arr = [1, 2, 3, 4, 5]
arr .* 2          # [2, 4, 6, 8, 10]
arr .^ 2          # [1, 4, 9, 16, 25]

# 関数のブロードキャスト
sqrt.(arr)        # 各要素にsqrt適用
f.(arr)           # カスタム関数も同様

# 比較
arr .> 3          # [false, false, false, true, true]
```

### Unicode演算子
```julia
# 数学記号が使える
α = 0.5
β = 1.5
∑ = sum
∏ = prod

# 比較演算子
x ≤ y   # x <= y
x ≥ y   # x >= y
x ≠ y   # x != y
x ∈ arr # x in arr

# 集合演算
A ∪ B   # union(A, B)
A ∩ B   # intersect(A, B)
```

### マクロ
```julia
# @で呼び出す
@time sum(1:1000000)  # 実行時間計測
@show x + y           # デバッグ出力

# カスタムマクロ
macro twice(ex)
    quote
        $(esc(ex))
        $(esc(ex))
    end
end

@twice println("Hello")  # 2回出力
```

### パイプ演算子 `|>`
```julia
# 左から右へ関数適用
[1, 2, 3, 4, 5] |>
    x -> filter(iseven, x) |>
    x -> map(y -> y^2, x) |>
    sum
# 20

# 関数合成
f = sqrt ∘ abs ∘ sin
f(-π/2)  # 1.0
```

### 複合式 `begin`-`end`
```julia
# 複数の式をまとめる
result = begin
    x = 10
    y = 20
    x + y
end  # 30

# ワンライナー
result = (x = 10; y = 20; x + y)
```

### do構文
```julia
# 無名関数を最後の引数に
map([1, 2, 3]) do x
    x^2
end  # [1, 4, 9]

# ファイル処理
open("file.txt") do f
    read(f, String)
end  # 自動でclose
```
