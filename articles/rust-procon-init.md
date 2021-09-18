---
title: Rust で競プロ環境整えたメモ
date: 2021-08-20 22:00:00
topics:
  - Rust
  - 競技プログラミング
  - AtCoder
type: tech
published: true
---

```toc

```

`atcoder-cli` のおかげで快適に参加できるようになりました。

[tanakh/cargo\-atcoder: Cargo subcommand for AtCoder](https://github.com/tanakh/cargo-atcoder)

## 整えた環境でのコンテスト参加

```sh
cargo atcoder new abc214
cd abc214
# Cargo.toml 追加(自動化したい)
# a 問題コーディング
cargo atcoder submit a
```

`cargo atcoder submit` で `cargo atcoder test` もしてくれていて、  
**コンパイルやテストケースに通った場合のみ提出してくれます。**

テストケースは `cargo atcoer new` で問題ページにあるものを取得してくれます。

`atcoder-cli` + `oj` ではテンプレート設定とテストケース編集・追加できたのですが、こちらもできるのかはまだわかりません。

## 実践

[![asciicast](https://asciinema.org/a/giirM6sSEUNGBTRwKVW9smLk2.svg)](https://asciinema.org/a/giirM6sSEUNGBTRwKVW9smLk2)

## テンプレートメモ

コンテストごとに追加が必要です。  
proconio などの追加。
cargo は `node.js` の `npm i -S` `yarn add` のように cli から dependencies を追記できないので、 編集が必要そう。
(`cargo-edit` でもできるみたい)

```diff title:Cargo
[package]
name = "abc214"
version = "0.1.0"
edition = "2018"

# dependencies added to new project
[dependencies]
+ proconio = { version = "0.3.6", features = ["derive"] }
+ itertools = "0.10.1"

[profile.release]
lto = true
panic = 'abort'
```

コードテンプレ。

```
use proconio::input;

fn sub() -> u32 {
    input! {
        n: u32,
    }
    return n;
}

fn main() {
    println!("{}", sub());
}
```

`proconio` 0.4 がローカルでうまく動かなかったのでこれにしているが適切なバージョンであるか謎。 `#[fastout]` も動かなかったりする。

## 作業プロジェクトの構成

[GitHub elzup/anozon\-blog](https://github.com/elzup/anozon-blog)

```
/rust # ←ここで new する
/rust/target
/rust/abc000/.toml
/rust/abc000/Cargo.toml
/rust/abc000/src/bin/a.rs
/rust/abc000/src/bin/b.rs
/rust/abc001
/rust/abc002
```
