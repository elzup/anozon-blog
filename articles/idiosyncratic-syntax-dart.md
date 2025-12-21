---
title: "各言語特有っぽい構文: Dart"
date: 2025-12-21 00:00:00
topics:
  - Dart
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 21日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード


```dart
// Dart - Null安全 + カスケード記法 + 拡張メソッド
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

## ピックアップ構文

### Null安全

型システムでnullを明示的に扱い、null参照エラーを防げる。

```dart
// Null許容型
String? name;  // nullを許容
String name = "Alice";  // nullは不可

// Null合体演算子
String displayName = name ?? "anonymous";

// Null条件アクセス
int? length = name?.length;

// Null合体代入
name ??= "default";

// 強制アンラップ
String s = nullableString!;
```

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

// null条件カスケード
list?..add(1)..add(2);
```

### パターンマッチング (Dart 3)

switch式やif-caseで値の構造に基づいた分岐ができる。

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

### 拡張メソッド

既存のクラスを変更せずに新しいメソッドを追加できる。

```dart
// 既存クラスにメソッドを追加
extension StringExtension on String {
  String get reversed => split('').reversed.join();
  String times(int n) => this * n;
}

"hello".reversed;  // "olleh"
"ab".times(3);     // "ababab"
```

### コレクション操作

スプレッド演算子やコレクションif/forでコレクションを簡潔に操作できる。

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
final result = numbers
    .where((n) => n > 0)
    .map((n) => n * 2)
    .toList();
```

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
