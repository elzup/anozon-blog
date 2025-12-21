---
title: '各言語特有っぽい構文: Rust'
date: 2025-12-11 00:00:00
topics:
  - Rust
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 11 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

```rust
// Rust - パターンマッチング + Result/Option + イテレータ
use std::cmp::Ordering::*;

fn binary_search<T: Ord>(arr: &[T], target: &T) -> Option<usize> {
    let (mut left, mut right) = (0, arr.len().checked_sub(1)?);

    while left <= right {
        let mid = left + (right - left) / 2;
        match arr[mid].cmp(target) {
            Equal => return Some(mid),
            Less => left = mid + 1,
            Greater => right = mid.checked_sub(1)?,
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

match 式や if let で値の構造に基づいた分岐ができる。

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

パターンマッチの表現が豊富で良い。

### Option

値があるかもしれない状態を型で表現。null 参照エラーを防ぐ。

```rust
// CLI引数での Optional 値
struct Cli {
    port: Option<u16>,      // 指定されないかもしれない
    process: Option<String>,
}

// if let パターンマッチ
if let Some(port) = port_filter {
    println!("Port: {}", port);
}

// 分割して取り出す
if let Some((start, end)) = "3000-3100".split_once('-') {
    println!("{} to {}", start, end);
}
```

Option チェーン

```rust
// and_then, map, ok でチェーン
extract_port(name).and_then(|s| {
    s.parse::<u16>().ok().map(|port| PortInfo { port })
})

// unwrap 系メソッド
let cmd = get_command(pid).unwrap_or_else(|_| "unknown".to_string());
let time = get_time(pid).unwrap_or_default();  // Default トレイト使用
let name = info.first().map(|i| i.name.clone()).unwrap_or_default();
```

### Result

成功か失敗かを型で表現。例外なしでエラーハンドリング。

```rust
use anyhow::{Context, Result};

// Result を返す関数
fn load_config() -> Result<Config> {
    let path = config_path()?;  // ? で早期リターン
    let content = std::fs::read_to_string(&path)
        .context("Failed to read config")?;  // エラーにコンテキスト追加
    toml::from_str(&content).context("Failed to parse config")
}

// main でも Result を返せる
fn main() -> Result<()> {
    let config = load_config()?;
    Ok(())
}
```

### 所有権 (Ownership)

GC なしでメモリ安全を保証する Rust 特有のシステム。

```rust
// 所有権の移動 (Move)
let s1 = String::from("hello");
let s2 = s1;  // s1 の所有権が s2 に移動
// println!("{}", s1);  // コンパイルエラー！s1 は無効

// Copy 型は移動ではなくコピー
let x = 5;
let y = x;  // i32 は Copy なのでコピー
println!("{}", x);  // OK
```

借用ルール

```rust
let mut s = String::from("hello");

// 不変借用: 複数OK
let r1 = &s;
let r2 = &s;

// 可変借用: 1つだけ
let r3 = &mut s;
// let r4 = &mut s;  // エラー！同時に2つの可変参照は不可

// 不変と可変の同時使用も不可
// let r5 = &s;      // r3 があるので不可
```

この制約でデータ競合をコンパイル時に防ぐ。

ライフタイム

```rust
// 戻り値がどの参照と同じ寿命かを明示
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// ダングリング参照をコンパイル時に検出
fn dangling() -> &String {
    let s = String::from("hello");
    &s  // エラー！s はスコープ外で解放される
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

閉区間開区間がわかりやすいタイプの演算子なの好き。

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

マクロで実現されているのが面白い。

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
