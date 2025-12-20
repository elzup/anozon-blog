---
title: "各言語特有っぽい構文: R"
date: 2025-12-22 00:00:00
topics:
  - R
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 22日目の記事です。

個人的な好みを交えて紹介します。


```r
# R - ベクトル演算 + パイプ演算子 + 関数型スタイル
binary_search <- function(arr, target) {
  left <- 1
  right <- length(arr)

  while (left <= right) {
    mid <- (left + right) %/% 2
    if (arr[mid] == target) {
      return(mid)
    } else if (arr[mid] < target) {
      left <- mid + 1
    } else {
      right <- mid - 1
    }
  }
  return(NA)
}

arr <- c(1, 3, 5, 7, 9)
result <- binary_search(arr, 5)
print(ifelse(is.na(result), -1, result))  # 3 (Rは1始まり)
```

## ピックアップ構文

### ベクトル演算
```r
# ベクトル全体に演算
x <- c(1, 2, 3, 4, 5)
x * 2         # c(2, 4, 6, 8, 10)
x + c(10, 20, 30, 40, 50)

# ブロードキャスト
x + 10        # c(11, 12, 13, 14, 15)

# 論理演算
x > 3         # c(FALSE, FALSE, FALSE, TRUE, TRUE)
x[x > 3]      # c(4, 5) フィルタリング

# ベクトル化関数
sqrt(x)
sum(x)
mean(x)
```

### パイプ演算子
```r
# |> (R 4.1+) または %>% (magrittr)
result <- c(1, 2, 3, 4, 5) |>
  (\(x) x * 2)() |>
  sum()
# 30

# tidyverse スタイル
library(dplyr)
data |>
  filter(age > 18) |>
  select(name, age) |>
  arrange(desc(age))
```

### インデックス（1始まり）
```r
arr <- c(10, 20, 30, 40, 50)

# 単一要素
arr[1]        # 10 (最初の要素)
arr[length(arr)]  # 50 (最後)

# 範囲
arr[2:4]      # c(20, 30, 40)

# 負のインデックス = 除外
arr[-1]       # c(20, 30, 40, 50)
arr[c(-1, -2)]  # c(30, 40, 50)

# 論理インデックス
arr[arr > 25]  # c(30, 40, 50)
```

### 関数定義
```r
# 基本形
add <- function(a, b) {
  a + b  # 最後の式が返り値
}

# デフォルト引数
greet <- function(name, greeting = "Hello") {
  paste(greeting, name)
}

# 可変長引数
sum_all <- function(...) {
  args <- list(...)
  Reduce(`+`, args, 0)
}
```

### リストとデータフレーム
```r
# リスト（異種混合）
person <- list(name = "Alice", age = 30, scores = c(80, 90, 85))
person$name       # "Alice"
person[["age"]]   # 30
person$scores[1]  # 80

# データフレーム
df <- data.frame(
  name = c("Alice", "Bob"),
  age = c(30, 25)
)
df$name           # 列アクセス
df[1, ]           # 行アクセス
df[df$age > 25, ] # フィルタ
```

### 特殊な代入演算子
```r
# 右から左
x <- 10
x = 10  # 同じ

# 左から右
10 -> x

# スーパー代入（親スコープに代入）
f <- function() {
  x <<- 100  # グローバルに代入
}
```
