---
title: "各言語特有っぽい構文: Haskell"
date: 2025-12-14 00:00:00
topics:
  - Haskell
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 14日目の記事です。


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

### ガード
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

### 関数合成 `.`
```haskell
-- 関数を合成
f . g = \x -> f (g x)

-- 例
doubleNegate = negate . (*2)
doubleNegate 3  -- -6

-- パイプライン風に
process = reverse . map toUpper . filter isAlpha
```

### ポイントフリースタイル
```haskell
-- 引数を省略
sum' = foldr (+) 0
double = map (*2)
lengths = map length

-- 同等の明示的記述
sum' xs = foldr (+) 0 xs
double xs = map (*2) xs
```

### do記法
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
```

### リスト内包表記
```haskell
-- 条件付きリスト生成
[x * 2 | x <- [1..10], even x]  -- [4,8,12,16,20]

-- 複数のジェネレータ
[(x, y) | x <- [1,2,3], y <- ['a','b']]
-- [(1,'a'),(1,'b'),(2,'a'),(2,'b'),(3,'a'),(3,'b')]
```

### 中置記法とバッククォート
```haskell
-- 関数を中置で使う
10 `div` 3  -- 3
5 `elem` [1..10]  -- True

-- 演算子を前置で使う
(+) 1 2  -- 3
map (*2) [1,2,3]  -- [2,4,6]
```
