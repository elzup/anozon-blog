---
title: '各言語特有っぽい構文: Scala'
date: 2025-12-16 00:00:00
topics:
  - Scala
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 16 日目の記事です。

個人的な好みを交えて紹介します。  
Scala は勉強中なので、入門的な内容です。

二分探索のサンプルコード

```scala
// Scala - パターンマッチ + Option + 中置記法
def binarySearch[T: Ordering](arr: IndexedSeq[T], target: T): Option[Int] = {
  import Ordering.Implicits._

  @annotation.tailrec
  def go(left: Int, right: Int): Option[Int] = {
    if (left > right) None
    else {
      val mid = left + (right - left) / 2
      arr(mid) match {
        case x if x == target => Some(mid)
        case x if x < target  => go(mid + 1, right)
        case _                => go(left, mid - 1)
      }
    }
  }
  go(0, arr.length - 1)
}

@main def run(): Unit =
  println(binarySearch(Vector(1, 3, 5, 7, 9), 5).getOrElse(-1))  // 2
```

## ピックアップ構文

### implicit parameter (given/using in Scala 3)

暗黙的にパラメータを渡したり、型クラスのインスタンスを定義できる。

```scala
// 暗黙の引数
def sort[T](list: List[T])(implicit ord: Ordering[T]) = list.sorted

// Scala 3
def sort[T](list: List[T])(using ord: Ordering[T]) = list.sorted

// 型クラスインスタンス
given Ordering[Person] with
  def compare(a: Person, b: Person) = a.age - b.age
```

便利だがコードが追いにくくなりそう。

### for 内包表記

複数のコレクションを組み合わせて新しいコレクションを生成できる。

```scala
// リスト内包
val doubled = for (x <- 1 to 10 if x % 2 == 0) yield x * 2

// 複数ジェネレータ
for {
  x <- 1 to 3
  y <- 1 to 3
  if x != y
} yield (x, y)

// flatMap/map の糖衣構文
for {
  a <- Future(1)
  b <- Future(2)
} yield a + b
```

### 拡張メソッド (Scala 3)

既存の型に新しいメソッドを追加できる。

```scala
extension (s: String)
  def greet: String = s"Hello, $s!"
  def times(n: Int): String = s * n

"World".greet      // "Hello, World!"
"ab".times(3)      // "ababab"
```

簡潔に書けて良い。

### 中置記法

1 つの引数を持つメソッドを中置記法で呼び出せる。

```scala
// メソッドを中置で呼ぶ
1 to 10        // 1.to(10)
list map f     // list.map(f)
a :: b :: Nil  // Nil.::(b).::(a)

// 独自の中置メソッド
case class Vec(x: Int, y: Int) {
  def +(other: Vec) = Vec(x + other.x, y + other.y)
}
Vec(1, 2) + Vec(3, 4)  // Vec(4, 6)
```

### パターンマッチング

match 式で型や値に基づいた強力な分岐ができる。

```scala
// match式
val result = value match {
  case 0 => "zero"
  case 1 | 2 => "one or two"
  case n if n < 0 => s"negative: $n"
  case _ => "other"
}

// case class の分解
case class Person(name: String, age: Int)
person match {
  case Person("Alice", age) => s"Alice is $age"
  case Person(name, age) if age >= 18 => s"$name is adult"
  case _ => "unknown"
}
```

パターンマッチの表現が他の言語より豊富な気がする。

### Option

値の有無を Some と None で型安全に表現できる。

```scala
// Some または None
val opt: Option[Int] = Some(42)

// パターンマッチ
opt match {
  case Some(x) => println(x)
  case None => println("empty")
}

// メソッドチェーン
opt.map(_ * 2).filter(_ > 50).getOrElse(0)

// for内包表記
for {
  x <- Some(10)
  y <- Some(20)
} yield x + y  // Some(30)
```
