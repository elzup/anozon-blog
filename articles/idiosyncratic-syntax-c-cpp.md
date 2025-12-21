---
title: "各言語特有っぽい構文: C/C++"
date: 2025-12-10 00:00:00
topics:
  - C
  - C++
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 10日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード


```c
// C - ポインタ演算 + マクロ + 三項演算子
#include <stdio.h>

#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

int binary_search(int *arr, size_t n, int target) {
    int *left = arr, *right = arr + n - 1;

    while (left <= right) {
        int *mid = left + (right - left) / 2;
        if (*mid == target) return mid - arr;
        *mid < target ? (left = mid + 1) : (right = mid - 1);
    }
    return -1;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9};
    printf("%d\n", binary_search(arr, ARRAY_SIZE(arr), 5));  // 2
}
```

```cpp
// C++ - テンプレート + auto + 構造化束縛
#include <iostream>
#include <vector>
#include <optional>

template<typename T>
std::optional<size_t> binary_search(const std::vector<T>& arr, const T& target) {
    auto [left, right] = std::pair{0uz, arr.size() - 1};

    while (left <= right) {
        auto mid = left + (right - left) / 2;
        if (auto cmp = arr[mid] <=> target; cmp == 0)
            return mid;
        else if (cmp < 0)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return std::nullopt;
}

int main() {
    std::vector arr{1, 3, 5, 7, 9};
    std::cout << binary_search(arr, 5).value_or(-1) << '\n';  // 2
}
```

## ピックアップ構文

### ポインタ演算 (C/C++)

ポインタを使った配列の走査やアドレス計算ができる。

```c
int arr[] = {1, 2, 3, 4, 5};
int *p = arr;       // 配列の先頭
*(p + 2)            // arr[2] と同じ
p[2]                // これも同じ
p++                 // 次の要素へ
mid - arr           // インデックスを計算
```

### マクロ (C/C++)

プリプロセッサによるテキスト置換で定数や関数を定義できる。

```c
// 定数マクロ
#define MAX_SIZE 100

// 関数マクロ
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define SWAP(a, b) do { typeof(a) tmp = a; a = b; b = tmp; } while(0)

// 可変引数マクロ
#define LOG(fmt, ...) printf("[LOG] " fmt "\n", ##__VA_ARGS__)
```

### 構造化束縛 (C++17)

タプルや構造体を複数の変数に分解して代入できる。

```cpp
// ペアの分解
auto [left, right] = std::make_pair(0, 10);

// 構造体の分解
struct Point { int x, y; };
auto [x, y] = Point{1, 2};

// mapのイテレーション
for (const auto& [key, value] : map) {
    std::cout << key << ": " << value << '\n';
}
```

### 三方比較演算子 (C++20)

宇宙船演算子（<=>）で大小・等価の比較を一度に行える。

```cpp
// <=> は -1, 0, 1 相当を返す
auto result = a <=> b;
if (result < 0)  { /* a < b */ }
if (result == 0) { /* a == b */ }
if (result > 0)  { /* a > b */ }

// autoでデフォルト生成
auto operator<=>(const Point&) const = default;
```

### std::optional (C++17)

値が存在しない可能性を型安全に表現できる。

```cpp
std::optional<int> find_value();

auto result = find_value();
if (result.has_value()) {
    std::cout << *result;
}
// または
std::cout << result.value_or(-1);
```

### ラムダ式 (C++11+)

無名関数をその場で定義し、外部変数をキャプチャできる。

```cpp
// 基本形
auto add = [](int a, int b) { return a + b; };

// キャプチャ
int x = 10;
auto f = [x](int y) { return x + y; };      // コピー
auto g = [&x](int y) { return x + y; };     // 参照
auto h = [=]() { return x; };               // すべてコピー
auto i = [&]() { return x; };               // すべて参照

// ジェネリックラムダ (C++14)
auto generic = [](auto x, auto y) { return x + y; };
```
