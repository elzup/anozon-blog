---
title: Rust で2進数にしたときの桁数を求める
date: 2021-08-24 10:00:00
topics:
  - Rust
  - Binary
type: tech
published: true
---

usize で取得する関数です。

**closure 版**

```rust
let blen = |v: u64| -> usize { format!("{:b}", v).to_string().len() };
```

**fn 版**

```rust
fn blen(v: i64) -> usize {
    format!("{:b}", v).to_string().len()
}
```

```rust
blen(100)
// 7
blen(0b0000111100001111)
// 12
```
