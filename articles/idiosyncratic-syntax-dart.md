---
title: '各言語特有っぽい構文: Dart'
date: 2025-12-21 00:00:00
topics:
  - Dart
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 21 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。

```dart
int? binarySearch<T extends Comparable>(List<T> arr, T target) {
  var (left, right) = (0, arr.length - 1);

  while (left <= right) {
    final mid = (left + right) >> 1;
    final cmp = arr[mid].compareTo(target);

    switch (cmp) {
      case 0:
        return mid;
      case < 0:
        left = mid + 1;
      default:
        right = mid - 1;
    }
  }
  return null;
}

void main() {
  final arr = [1, 3, 5, 7, 9];
  print(binarySearch(arr, 5) ?? -1); // 2
}
```

Flutter でお馴染み。Java や C# の良いところを取り入れつつモダンな構文。

## ピックアップ構文

### カスケード記法 `..`

同じオブジェクトに対して連続してメソッドやプロパティ操作ができる。

```dart
// オブジェクトに連続操作
final list = <int>[]
  ..add(1)
  ..add(2)
  ..add(3)
  ..sort();

// Builderパターン風
final query = StringBuilder()
  ..write('SELECT ')
  ..write('* ')
  ..write('FROM users');

// 以下と同等
final query = StringBuilder();
query.write('SELECT ');
query.write('* ');
query.write('FROM users');


// null条件カスケード
list?..add(1)..add(2);
```

戻り値に関わらずメソッドチェーンっぽく書ける。面白い。

### コレクション操作

スプレッド演算子やコレクション if/for でコレクションを簡潔に操作できる。

```dart
// スプレッド演算子
final combined = [...list1, ...list2];

// コレクション if/for
final list = [
  'a',
  if (condition) 'b',
  for (var i in items) i.toUpperCase(),
];

// メソッドチェーン
[1, -2, 3, -4, 5]
    .where((n) => n > 0)
    .map((n) => n * 2)
    .toList();
```

リテラル内で if/for が使えるのは珍しい。
JS の `['a', ...(condition ? ['b'] : [])]` が `['a', if (condition) 'b']` で書ける。
JSX の `{condition && <div/>}` 同様、宣言的 UI 記述向けの構文。

### パターンマッチング (Dart 3)

switch 式や if-case で値の構造に基づいた分岐ができる。

```dart
// switch式
final description = switch (value) {
  0 => "zero",
  1 || 2 => "one or two",
  int n when n < 0 => "negative",
  _ => "other"
};

// if-case
if (json case {'name': String name, 'age': int age}) {
  print('$name is $age years old');
}

// レコードパターン
var (left, right) = (0, 10);
```

Dart 3 で一気に表現力が上がった。`case` でガードも書ける。

### 名前付き引数とデフォルト値

引数に名前を付けたり、デフォルト値を設定できる。

```dart
// 名前付き引数 (中括弧)
void greet({required String name, String greeting = "Hello"}) {
  print('$greeting, $name!');
}
greet(name: "Alice");  // Hello, Alice!

// 位置引数 (角括弧でオプショナル)
void log(String message, [String? prefix]) {
  print('${prefix ?? "LOG"}: $message');
}
```

独特な構文。Python などのキーワード引数や TypeScript の オブジェクト形式の引数とは違う考え方。
