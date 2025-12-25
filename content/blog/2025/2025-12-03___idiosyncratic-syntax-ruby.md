---
title: '各言語特有っぽい構文: Ruby'
date: 2025-12-03 00:00:00
topics:
  - Ruby
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 3 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。

```ruby
def binary_search(arr, target)
  left, right = 0, arr.length - 1
  while left <= right
    mid = (left + right) / 2
    case arr[mid] <=> target
    when 0 then return mid
    when -1 then left = mid + 1
    when 1 then right = mid - 1
    end
  end
  -1
end

p binary_search([1, 3, 5, 7, 9], 5)  # 2
```

## ピックアップ構文

### 暗黙の return

```ruby
# 最後の式が自動的に返り値になる
def double(x)
  x * 2  # return 不要
end

def grade(score)
  if score >= 90
    "A"
  elsif score >= 80
    "B"
  else
    "C"
  end  # if式の結果が返る
end

# case式も値を返す
def describe(n)
  case n
  when 0 then "zero"
  when 1..9 then "single digit"
  else "large"
  end
end
```

### メモ化 `||=`

```ruby
# 初回のみ計算してキャッシュ
def expensive_value
  @expensive_value ||= heavy_computation
end

# nilやfalseも有効な値の場合
def value_with_nil
  return @value if defined?(@value)
  @value = compute_possibly_nil
end

# クラスレベルのメモ化
class Config
  def self.settings
    @settings ||= load_settings
  end
end

# 引数付きメモ化
def fibonacci(n)
  @fib_cache ||= {}
  @fib_cache[n] ||= n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2)
end
```

Ruby または Rails でよく見るパターンだ。

### ブロック構文

```ruby
# do...end または { }
[1, 2, 3].each do |x|
  puts x
end

[1, 2, 3].map { |x| x * 2 }  # [2, 4, 6]

# ブロック引数
def with_logging
  puts "start"
  yield
  puts "end"
end
with_logging { puts "hello" }
```

他言語のジェネレータの `yield` と別物。呼び出しは Swift の trailing closure に似ている

### 宇宙船演算子 `<=>`

```ruby
# 比較して -1, 0, 1 を返す
5 <=> 3   # 1
3 <=> 5   # -1
5 <=> 5   # 0

# case文と組み合わせ
case a <=> b
when -1 then "a < b"
when 0 then "a == b"
when 1 then "a > b"
end
```

compare interface に対して便利なもの。 js でいう `Math.sign(a - b)` のような処理

### Safe navigation `&.`

```ruby
# nilの場合はnilを返す
arr.bsearch_index { |x| x >= 5 }&.then { |i| i * 2 }

# 同等のコード
result = arr.bsearch_index { |x| x >= 5 }
result.nil? ? nil : result.then { |i| i * 2 }
```

TypeScript などの `?.` に相当。

### then（yield_self）

```ruby
# 値をブロックに渡して変換
5.then { |x| x * 2 }  # 10

# チェーン
"hello".then { |s| s.upcase }.then { |s| s.reverse }  # "OLLEH"
```

Pipe と同様で使いやすい場面ありそう

### Symbol to proc `&:`

```ruby
# メソッド名をシンボルで渡す
[1, 2, 3].map(&:to_s)  # ["1", "2", "3"]

# 同等のコード
[1, 2, 3].map { |x| x.to_s }
```

メタプログラミング感を強く感じる。

### bsearch / bsearch_index

```ruby
# 組み込みの二分探索
arr = [1, 3, 5, 7, 9]
arr.bsearch { |x| x >= 5 }        # 5（値を返す）
arr.bsearch_index { |x| x >= 5 }  # 2（インデックスを返す）
```
