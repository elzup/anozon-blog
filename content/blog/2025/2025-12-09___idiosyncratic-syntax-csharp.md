---
title: "各言語特有っぽい構文: C#"
date: 2025-12-09 00:00:00
topics:
  - C#
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 9日目の記事です。

個人的な好みを交えて紹介します。


```csharp
// C# - パターンマッチング + switch式 + null許容型
using System;
using System.Collections.Generic;

class Program
{
    static int? BinarySearch<T>(IList<T> arr, T target) where T : IComparable<T>
    {
        var (left, right) = (0, arr.Count - 1);

        while (left <= right)
        {
            var mid = (left + right) >> 1;
            (left, right) = arr[mid].CompareTo(target) switch
            {
                0 => (mid, mid),  // 見つかった
                < 0 => (mid + 1, right),
                > 0 => (left, mid - 1)
            };
            if (arr[mid].CompareTo(target) == 0) return mid;
        }
        return null;
    }

    static void Main()
    {
        var arr = new[] { 1, 3, 5, 7, 9 };
        Console.WriteLine(BinarySearch(arr, 5) ?? -1);  // 2
    }
}
```

## ピックアップ構文

### switch式 (C# 8.0+)
```csharp
// 式として値を返す
var result = value switch
{
    1 => "one",
    2 or 3 => "two or three",
    > 10 => "large",
    _ => "other"
};

// タプルパターン
var quadrant = (x, y) switch
{
    (> 0, > 0) => "Q1",
    (< 0, > 0) => "Q2",
    (< 0, < 0) => "Q3",
    (> 0, < 0) => "Q4",
    _ => "origin or axis"
};
```

### パターンマッチング
```csharp
// 型パターン
if (obj is string s) { Console.WriteLine(s.Length); }

// プロパティパターン
if (person is { Name: "Alice", Age: > 18 }) { }

// リストパターン (C# 11)
if (arr is [var first, .., var last]) { }
```

### null許容型とnull合体演算子
```csharp
// null許容値型
int? value = null;
int result = value ?? 0;

// null合体代入
value ??= 10;

// null条件演算子
var length = str?.Length ?? 0;
arr?[0]?.ToString();
```

### タプルと分解
```csharp
// タプルリテラル
var point = (x: 10, y: 20);
Console.WriteLine(point.x);

// 分解代入
var (left, right) = (0, arr.Length - 1);
(left, right) = (right, left);  // スワップ

// Deconstruct メソッド
public void Deconstruct(out int x, out int y) => (x, y) = (X, Y);
```

### LINQ
```csharp
// クエリ構文
var result = from x in numbers
             where x > 0
             select x * 2;

// メソッド構文
var result = numbers
    .Where(x => x > 0)
    .Select(x => x * 2)
    .ToList();
```

### ラムダ式と式形式メンバー
```csharp
// ラムダ
Func<int, int> square = x => x * x;

// 式形式メソッド
public int Double(int x) => x * 2;

// 式形式プロパティ
public string Name => $"{FirstName} {LastName}";
```

### 拡張メソッド
```csharp
// 既存のクラスにメソッドを追加（クラス変更不要）
public static class StringExtensions
{
    // this キーワードで対象の型を指定
    public static bool IsNullOrEmpty(this string? s) => string.IsNullOrEmpty(s);
    public static string Reverse(this string s) => new(s.Reverse().ToArray());
}

// 使用：インスタンスメソッドのように呼べる
"hello".Reverse();        // "olleh"
string? s = null;
s.IsNullOrEmpty();        // true

// LINQも拡張メソッドで実装されている
numbers.Where(x => x > 0);  // IEnumerable<T> への拡張
```
