---
title: '各言語特有っぽい構文: C/C++'
date: 2025-12-10 00:00:00
topics:
  - C
  - C++
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 10 日目の記事です。

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
int *p = arr;    // 配列名はポインタに変換される

p       // 0x1000（アドレス）
*p      // 1（先頭の値）

// アドレス計算（型のサイズ分だけ移動）
p + 2     // 0x1008（int=4byte × 2 進む）
*(p + 2)  // 3（デリファレンスで値取得）
p[2]      // 3（*(p+2) の糖衣構文）

// ポインタの移動
p++;  // p が arr[1] を指すようになる
*p    // 2

// ポインタ同士の引き算 → 要素数の差
int *mid = arr + 2;
mid - arr  // 2（インデックスを計算）
```

複雑なアルゴリズム処理だと使ったほうが良い実装できそう(メモリ節約などもできそう)だけど C 以外から入る人にとっては直感的ではないし危なそうだなと思う。

### 参照 `&` (C++)

ポインタの安全版。null になれず、再代入もできない。

```cpp
// 値渡し - コピーが発生（遅い）
void process(std::vector<int> v);

// 参照渡し - コピーなし（高速）
void process(const std::vector<int>& v);

// 値を変更したい場合
void increment(int& n) { n++; }
```

破壊的操作以外にも、高速化やメモリ節約のために使われる。

### std::vector (C++)

可変長配列。C の配列より安全で便利。

```cpp
std::vector<int> v = {1, 2, 3};
v.push_back(4);     // 末尾に追加
v.size();           // 要素数
v[0];               // アクセス
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

テキスト置き換えなので何でもできる。だが型安全性がない。  
定数は `constexpr` を使うし、活用されているか知らない。  
競技プログラミングでは見かけた。

### 演算子オーバーロード (C++)

ユーザー定義型に対して演算子の振る舞いを定義できる。

```cpp
struct Point {
    int x, y;

    // 加算演算子
    Point operator+(const Point& other) const {
        return {x + other.x, y + other.y};
    }

    // 三方比較演算子 (C++20) - これだけで ==, !=, <, <=, >, >= が全て使える
    auto operator<=>(const Point&) const = default;
};

Point a{1, 2}, b{3, 4};
Point c = a + b;  // {4, 6}
a < b;            // true (x, y の順で比較)
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
