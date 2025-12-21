---
title: '各言語特有っぽい構文: Kotlin'
date: 2025-12-07 00:00:00
topics:
  - Kotlin
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 7 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

```kotlin
// Kotlin - when式 + 分解宣言 + スコープ関数
fun <T : Comparable<T>> binarySearch(arr: List<T>, target: T): Int {
    var (left, right) = 0 to arr.lastIndex

    while (left <= right) {
        val mid = (left + right) ushr 1
        val (newLeft, newRight) = when {
            arr[mid] == target -> return mid
            arr[mid] < target -> (mid + 1) to right
            else -> left to (mid - 1)
        }
        left = newLeft
        right = newRight
    }
    return -1
}

fun main() {
    val arr = listOf(1, 3, 5, 7, 9)
    println(binarySearch(arr, 5))  // 2
}
```

## ピックアップ構文

### when 式

switch 文より強力なパターンマッチングを持つ分岐式。

```kotlin
// switch文の強力な代替
val result = when (x) {
    1 -> "one"
    2, 3 -> "two or three"
    in 4..10 -> "4 to 10"
    is String -> "string"
    else -> "other"
}

// 引数なしで条件分岐
when {
    x < 0 -> "negative"
    x > 0 -> "positive"
    else -> "zero"
}
```

### bit 演算子

```
(0b1010 ushr 1) // 論理右シフト
(0b1010 shl 1)  // 左シフト
(0b1010 inv())  // ビット反転
(0b1010 and 0b1100) // AND
(0b1010 or 0b1100)  // OR
(0b1010 xor 0b1100) // XOR
```

シフト系も用意されている。  
トップレベル関数が多い。

### 分解宣言

Pair や Data Class の値を複数の変数に一度に代入できる。

```kotlin
// Pairやdata classの分解
val (left, right) = 0 to 10
val (name, age) = person

// mapのイテレーション
for ((key, value) in map) {
    println("$key: $value")
}
```

`.entries` や 拡張 for に相当する。

### スコープ関数

オブジェクトのスコープ内でコードブロックを実行する関数群（let、apply、run、also）。

```kotlin
// let: nullチェック + 変換
val length = str?.let { it.length } ?: 0

// apply: オブジェクト設定
val person = Person().apply {
    name = "Alice"
    age = 30
}

// run: ブロック実行
val result = run {
    val x = compute()
    x * 2
}

// also: 副作用
list.also { println("count: ${it.size}") }
```

### 拡張関数

既存のクラスを変更せずに新しいメソッドを追加できる。

```kotlin
// 既存クラスにメソッド追加
fun String.addExclamation() = this + "!"

"Hello".addExclamation()  // "Hello!"

// ジェネリクスと組み合わせ
fun <T> List<T>.secondOrNull(): T? = getOrNull(1)
```

### Elvis 演算子 `?:`

null の場合にデフォルト値を提供する演算子。

```kotlin
// null時のデフォルト値
val name = user?.name ?: "anonymous"

// 早期リターン
val value = getValue() ?: return
val length = str?.length ?: throw IllegalArgumentException()
```

### infix 関数

中置記法で呼び出せる関数を定義できる。

```kotlin
// 中置記法で呼び出せる関数
infix fun Int.times(str: String) = str.repeat(this)
3 times "Hi "  // "Hi Hi Hi "

// 標準ライブラリの例
0 to 10        // Pair(0, 10)
1 until 10     // 1..9
list zip other // ペアのリスト
```

Ruby にもあった気がするが他言語ではあまり馴染みがない。
