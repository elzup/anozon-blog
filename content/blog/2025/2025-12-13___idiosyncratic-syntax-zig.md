---
title: '各言語特有っぽい構文: Zig'
date: 2025-12-13 00:00:00
topics:
  - Zig
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 13 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。

```zig
// Zig - comptime + オプショナル + エラーユニオン
const std = @import("std");

fn binarySearch(comptime T: type, arr: []const T, target: T) ?usize {
    var left: usize = 0;
    var right: usize = arr.len -| 1;

    while (left <= right) {
        const mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid -| 1;
        }
    }
    return null;
}

pub fn main() void {
    const arr = [_]i32{ 1, 3, 5, 7, 9 };
    const result = binarySearch(i32, &arr, 5);
    std.debug.print("{}\n", .{result orelse @as(usize, 0) -% 1});  // 2
}
```

## ピックアップ構文

### comptime (コンパイル時評価)

コンパイル時にコードを実行し、型やパラメータを決定できる。

```zig
// コンパイル時に実行される
fn factorial(comptime n: u64) u64 {
    return if (n == 0) 1 else n * factorial(n - 1);
}

const result = factorial(5);  // コンパイル時に120に

// 型をパラメータとして
fn max(comptime T: type, a: T, b: T) T {
    return if (a > b) a else b;
}
```

### オプショナル型

null を許容する型を?T で表現し、orelse や if 文でアンラップできる。

```zig
// ?T は null を許容
var value: ?i32 = 42;
value = null;

// orelse でデフォルト値
const x = value orelse 0;

// if でアンラップ
if (value) |v| {
    std.debug.print("{}\n", .{v});
}

// .? で強制アンラップ
const y = value.?;
```

orelse や orerror という演算子があるのが面白い。

### エラーユニオン

エラーまたは値を返す!T 型で、明示的なエラーハンドリングを強制できる。

```zig
// !T はエラーまたは値
fn divide(a: i32, b: i32) !i32 {
    if (b == 0) return error.DivisionByZero;
    return @divTrunc(a, b);
}

// try でエラー伝播
const result = try divide(10, 2);

// catch でエラーハンドリング
const result = divide(10, 0) catch |err| {
    std.debug.print("error: {}\n", .{err});
    return;
};
```

### 飽和演算子

オーバーフローせずに上限・下限で飽和する演算子。

```zig
// オーバーフローしない演算
const a: u8 = 250;
const b = a +| 10;   // 飽和加算: 255
const c = a -| 255;  // 飽和減算: 0

// ラップアラウンド演算
const d = a +% 10;   // 4 (オーバーフロー)
```

minmax 相当ですが安全で便利そう。

### defer と errdefer

スコープ終了時、またはエラー時のみ実行される処理を定義できる。

```zig
// スコープ終了時に実行
const file = try std.fs.cwd().openFile("test.txt", .{});
defer file.close();

// エラー時のみ実行
const resource = try allocate();
errdefer deallocate(resource);
try useResource(resource);
```

### ペイロードキャプチャ

while、if、switch で値を取り出しながら分岐できる。

```zig
// while, if, switch でペイロードを取得
while (iterator.next()) |item| {
    process(item);
}

// ポインタキャプチャ
if (optional_ptr) |*ptr| {
    ptr.* = 42;  // 値を変更
}

if ((fetchValue()) |err| {
    std.debug.print("error: {}\n", .{err});
    return;
}) |value| {
    std.debug.print("value: {}\n", .{value});
}
```

JS の promise の `then` を面白い書き方できる。
