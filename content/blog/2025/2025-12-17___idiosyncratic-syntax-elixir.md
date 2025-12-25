---
title: '各言語特有っぽい構文: Elixir'
date: 2025-12-17 00:00:00
topics:
  - Elixir
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 17 日目の記事です。

個人的な好みを交えて紹介します。
Elixir は勉強中なので、入門的な内容です。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。

```elixir
# Elixir - パイプ演算子 + パターンマッチ + ガード
defmodule Search do
  def binary_search(arr, target) when is_list(arr) do
    arr |> Enum.with_index() |> Enum.into(%{}) |> do_search(target, 0, length(arr) - 1)
  end

  defp do_search(_map, _target, left, right) when left > right, do: nil
  defp do_search(map, target, left, right) do
    mid = div(left + right, 2)
    {value, _} = Enum.at(Map.to_list(map), mid)

    cond do
      value == target -> mid
      value < target  -> do_search(map, target, mid + 1, right)
      true            -> do_search(map, target, left, mid - 1)
    end
  end
end

IO.puts Search.binary_search([1, 3, 5, 7, 9], 5)  # 2
```

## ピックアップ構文

### パイプ演算子 `|>`

左の結果を右の関数の第一引数に渡せる。

```elixir
# 左の結果を右の第一引数に
"hello world"
|> String.upcase()
|> String.split()
|> Enum.reverse()
# ["WORLD", "HELLO"]

# 同等のコード
Enum.reverse(String.split(String.upcase("hello world")))
```

パイプは F#発祥だが、Elixir が普及に貢献した印象がある。

### with 式

複数のパターンマッチを連鎖させて、エラーハンドリングを簡潔に書ける。

```elixir
# 複数のパターンマッチを連鎖
with {:ok, user} <- fetch_user(id),
     {:ok, posts} <- fetch_posts(user),
     {:ok, comments} <- fetch_comments(posts) do
  {:ok, %{user: user, posts: posts, comments: comments}}
else
  {:error, reason} -> {:error, reason}
end
```

### シギル

~記号で始まる特殊なリテラル記法で、文字列や正規表現などを表現できる。

```elixir
~s(文字列 "引用符" も使える)
~r/正規表現/i
~w(word list here)           # ["word", "list", "here"]
~w(atoms list here)a         # [:atoms, :list, :here]
~D[2024-01-01]               # Date
~T[12:00:00]                 # Time
```

特殊な記法である。シギルをユーザー定義できてとても拡張性の高い仕組み。

### プロセス

軽量プロセスを spawn で生成し、send/receive でメッセージをやり取りできる。

```elixir
# プロセス生成
pid = spawn(fn ->
  receive do
    {:hello, msg} -> IO.puts("Received: #{msg}")
  end
end)

# メッセージ送信
send(pid, {:hello, "world"})

# 自分自身の PID
self()
```

### キャプチャ演算子 `&`

関数を簡潔に参照・定義できる。

```elixir
# 短縮記法
double = &(&1 * 2)
double.(5)  # 10

# 関数参照
Enum.map([1, 2, 3], &String.to_string/1)

# 複数引数
add = &(&1 + &2)
add.(1, 2)  # 3
```

### ガード節

when 句で関数やパターンマッチに条件を追加できる。

```elixir
# when でガード条件
def abs(n) when n < 0, do: -n
def abs(n), do: n

# 複数条件
def process(x) when is_integer(x) and x > 0 do
  x * 2
end

# case でもガード
case value do
  x when x > 0 -> "positive"
  x when x < 0 -> "negative"
  _ -> "zero"
end
```

### パターンマッチング

関数の引数や case 式でデータ構造を分解してマッチングできる。

```elixir
# 関数の引数でマッチ
def greet(%{name: name}), do: "Hello, #{name}!"
def greet(_), do: "Hello, stranger!"

# case式
case value do
  {:ok, result} -> result
  {:error, reason} -> raise reason
  _ -> :unknown
end

# リストパターン
[head | tail] = [1, 2, 3]
# head = 1, tail = [2, 3]
```

Erlang 由来。多くの関数型言語にある。
