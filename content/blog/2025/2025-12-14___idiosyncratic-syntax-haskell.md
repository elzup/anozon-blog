---
title: '各言語特有っぽい構文: Haskell'
date: 2025-12-14 00:00:00
topics:
  - Haskell
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 14 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。

```haskell
-- Haskell - ガード + パターンマッチ + モナド
import Data.Maybe (fromMaybe)

binarySearch :: Ord a => [a] -> a -> Maybe Int
binarySearch arr target = go 0 (length arr - 1)
  where
    go left right
      | left > right = Nothing
      | arr !! mid == target = Just mid
      | arr !! mid < target  = go (mid + 1) right
      | otherwise            = go left (mid - 1)
      where mid = (left + right) `div` 2

main :: IO ()
main = print $ fromMaybe (-1) $ binarySearch [1, 3, 5, 7, 9] 5  -- 2
```

## ピックアップ構文

### 関数合成 `.`

複数の関数を合成して新しい関数を作成できる。

```haskell
-- 関数を合成
-- (f . g) x = f (g x)

-- 例
doubleNegate = negate . (*2)
doubleNegate 3  -- -6

-- パイプライン風に（右から左へ実行）
process = reverse . map toUpper . filter isAlpha
```

数式のように、これ以上なくシンプルに関数合成が書ける。

### ポイントフリースタイル

引数を明示せずに関数を合成して定義するスタイル。

```haskell
-- 引数を省略
sum' = foldr (+) 0
double = map (*2)
lengths = map length

-- 同等の明示的記述
sum' xs = foldr (+) 0 xs
double xs = map (*2) xs
```

ちょっと可読性が下がりそう。

### do 記法

モナドの連鎖を命令型風に記述できる構文糖衣。

```haskell
-- モナドを順次実行
main :: IO ()
main = do
  putStrLn "What's your name?"
  name <- getLine
  putStrLn $ "Hello, " ++ name ++ "!"

-- Maybeモナド
safeDivide :: Int -> Int -> Maybe Int
safeDivide _ 0 = Nothing
safeDivide a b = Just (a `div` b)

calculate :: Maybe Int
calculate = do
  x <- safeDivide 10 2
  y <- safeDivide x 2
  return (x + y)

-- 同等の明示的記述
calculate' :: Maybe Int
calculate' =
  safeDivide 10 2 >>= \x ->
  safeDivide x 2 >>= \y ->
  return (x + y)
```

命令型言語のようにもかける。

### 末尾再帰と where

Haskell にはループがなく、繰り返しは再帰で表現する。`where` で内部関数を定義し、引数で状態を持ち回す。

```haskell
-- 二分探索: go が末尾再帰のヘルパー関数
binarySearch arr target = go 0 (length arr - 1)
  where
    go left right
      | left > right = Nothing
      | otherwise = case compare (arr !! mid) target of
          EQ -> Just mid
          LT -> go (mid + 1) right  -- 新しい値で再帰
          GT -> go left (mid - 1)
      where mid = (left + right) `div` 2

-- 階乗: アキュムレータパターン
factorial n = go n 1
  where
    go 0 acc = acc
    go n acc = go (n - 1) (n * acc)
```

末尾再帰はコンパイラがループに最適化する。

### ガード

関数定義で条件分岐をガード節として記述できる。

```haskell
-- 条件分岐をガードで表現
absolute :: Int -> Int
absolute n
  | n < 0     = -n
  | otherwise = n

-- 複数条件
grade :: Int -> String
grade score
  | score >= 90 = "A"
  | score >= 80 = "B"
  | score >= 70 = "C"
  | otherwise   = "F"
```

### パターンマッチング

関数の引数や case 式でデータ構造を分解してマッチングできる。

```haskell
-- リストパターン
head' :: [a] -> a
head' (x:_) = x
head' []    = error "empty list"

-- タプルパターン
fst' :: (a, b) -> a
fst' (x, _) = x

-- case式
describe :: Maybe Int -> String
describe x = case x of
  Just n  -> "Value: " ++ show n
  Nothing -> "No value"
```

### リスト内包表記

条件付きでリストを生成する簡潔な記法。

```haskell
-- 条件付きリスト生成
[x * 2 | x <- [1..10], even x]  -- [4,8,12,16,20]

-- 複数のジェネレータ
[(x, y) | x <- [1,2,3], y <- ['a','b']]
-- [(1,'a'),(1,'b'),(2,'a'),(2,'b'),(3,'a'),(3,'b')]
```

なぜか Python にもあるやつ。

### 中置記法とバッククォート

関数をバッククォートで囲んで中置記法で呼び出せる。

```haskell
-- 関数を中置で使う
10 `div` 3  -- 3
5 `elem` [1..10]  -- True

-- 演算子を前置で使う
(+) 1 2  -- 3
map (*2) [1,2,3]  -- [2,4,6]
```

前置記法にできるのが珍しくて面白い。
