---
title: "各言語特有っぽい構文: Rust"
date: 2025-12-11 00:00:00
topics:
  - Rust
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 11日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード


```rust
// Rust - パターンマッチング + Result/Option + イテレータ
fn binary_search<T: Ord>(arr: &[T], target: &T) -> Option<usize> {
    let (mut left, mut right) = (0, arr.len().checked_sub(1)?);

    while left <= right {
        let mid = left + (right - left) / 2;
        match arr[mid].cmp(target) {
            std::cmp::Ordering::Equal => return Some(mid),
            std::cmp::Ordering::Less => left = mid + 1,
            std::cmp::Ordering::Greater => right = mid.checked_sub(1)?,
        }
    }
    None
}

fn main() {
    let arr = [1, 3, 5, 7, 9];
    println!("{}", binary_search(&arr, &5).unwrap_or(!0));  // 2
}
```

## ピックアップ構文

### パターンマッチング

match式やif letで値の構造に基づいた分岐ができる。

```rust
// match式
match value {
    0 => println!("zero"),
    1 | 2 => println!("one or two"),
    3..=9 => println!("three to nine"),
    n if n < 0 => println!("negative"),
    _ => println!("other"),
}

// if let
if let Some(x) = optional {
    println!("{}", x);
}

// let else
let Some(x) = optional else { return };
```

### Option と Result

値の有無やエラーを型安全に扱うための列挙型。

```rust
// Option: 値があるかもしれない
let opt: Option<i32> = Some(42);
let val = opt.unwrap_or(0);
let val = opt.map(|x| x * 2);
opt?;  // None なら早期リターン

// Result: 成功か失敗か
let result: Result<i32, String> = Ok(42);
let val = result.unwrap_or_else(|e| panic!("{}", e));
result?;  // Err なら早期リターン
```

### 所有権とライフタイム

メモリ安全性を保証するための所有権システムと参照の有効期間管理。

```rust
// 所有権の移動
let s1 = String::from("hello");
let s2 = s1;  // s1は無効に

// 借用
fn len(s: &String) -> usize { s.len() }
fn push(s: &mut String) { s.push('!'); }

// ライフタイム注釈
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

### イテレータとクロージャ

遅延評価されるイテレータチェーンと無名関数の機能。

```rust
// イテレータチェーン
let sum: i32 = (1..=10)
    .filter(|x| x % 2 == 0)
    .map(|x| x * x)
    .sum();

// クロージャ
let add = |a, b| a + b;
let double = |x| x * 2;

// move クロージャ
let s = String::from("hello");
let f = move || println!("{}", s);
```

### マクロ

コンパイル時にコードを生成する宣言的マクロ。

```rust
// 宣言的マクロ
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp = Vec::new();
            $( temp.push($x); )*
            temp
        }
    };
}

// 組み込みマクロ
println!("Hello, {}!", name);
format!("{:?}", value);
vec![1, 2, 3];
```

### トレイト境界

ジェネリック型に対して必要な機能を制約として指定できる。

```rust
// ジェネリクスの制約
fn print_debug<T: std::fmt::Debug>(value: T) {
    println!("{:?}", value);
}

// where句
fn complex<T, U>(t: T, u: U)
where
    T: Clone + Debug,
    U: Into<String>,
{ }

// impl Trait
fn make_iter() -> impl Iterator<Item = i32> {
    (0..10).filter(|x| x % 2 == 0)
}
```
