---
title: "各言語特有っぽい構文: PHP"
date: 2025-12-04 00:00:00
topics:
  - PHP
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 4日目の記事です。

個人的な好みを交えて紹介します。


```php
<?php
// PHP - match式 + アロー関数
function binarySearch(array $arr, mixed $target): int {
    $left = 0;
    $right = count($arr) - 1;

    while ($left <= $right) {
        $mid = intdiv($left + $right, 2);
        [$left, $right] = match (true) {
            $arr[$mid] === $target => [return $mid][0] ?? [$mid, $mid],
            $arr[$mid] < $target => [$mid + 1, $right],
            default => [$left, $mid - 1],
        };
    }
    return -1;
}

// シンプル版
function binarySearchSimple(array $arr, mixed $target): int {
    $left = 0;
    $right = count($arr) - 1;

    while ($left <= $right) {
        $mid = intdiv($left + $right, 2);
        $value = $arr[$mid];

        if ($value === $target) return $mid;

        [$left, $right] = $value < $target
            ? [$mid + 1, $right]
            : [$left, $mid - 1];
    }
    return -1;
}

echo binarySearchSimple([1, 3, 5, 7, 9], 5);  // 2
```

## ピックアップ構文

### rendering

```php
Hello, World! 1
ここはそのまま表示されます。
HTML のレスんポンスを生成するのに便利です。
<?php
echo "Hello, World! 2";
?>
<?= "Hello, World!" ?> 3
```

### アロー関数 `fn() =>`
```php
// 短い無名関数
$double = fn($x) => $x * 2;

// 変数を自動キャプチャ
$multiplier = 3;
$multiply = fn($x) => $x * $multiplier;

// 従来の書き方
$multiply = function($x) use ($multiplier) {
    return $x * $multiplier;
};
```

### 連想配列
```php
// 連想配列の定義
$user = [
    'name' => 'Alice',
    'age' => 30,
    111 => 'numeric key',
    {'complex' . 'key'} => 'computed key',
];
```

### 分割代入（list / []）
```php
// 配列の分割
[$a, $b] = [1, 2];

// 値の入れ替え
[$left, $right] = [$right, $left];

// キー指定
['name' => $name, 'age' => $age] = $user;
```

### Null合体演算子 `??`
```php
// nullまたは未定義の場合にデフォルト値
$name = $user['name'] ?? 'anonymous';

// 代入と組み合わせ
$cache[$key] ??= computeValue($key);
```

### スプレッド演算子 `...`
```php
// 配列の展開
$merged = [...$arr1, ...$arr2];

// 引数の展開
function sum(...$nums) {
    return array_sum($nums);
}
sum(1, 2, 3);  // 6

// 関数呼び出し時
$args = [1, 2, 3];
sum(...$args);
```

### 名前付き引数 (PHP 8.0+)
```php
function greet(string $name, string $greeting = "Hello") {
    return "$greeting, $name!";
}

greet(name: "World", greeting: "Hi");  // "Hi, World!"
greet(name: "PHP");  // "Hello, PHP!"
```


### match式 (PHP 8.0+)
```php
// switch文の式バージョン
$result = match ($value) {
    1 => "one",
    2 => "two",
    default => "other",
};

// 条件式も使える
$result = match (true) {
    $x < 0 => "negative",
    $x > 0 => "positive",
    default => "zero",
};
```
