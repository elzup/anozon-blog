---
title: vim の visual mode で選択した範囲に paste できないとき
date: 2020-10-30 13:00:00
topics:
  - Vim
type: tech
published: true
---

恐らく visual mode で選択した範囲がコピーされています。

clipboard に `autoselect` が設定されているときの挙動です。

## 設定

```diff
-set clipboard=unnamed,autoselect
+set clipboard=unnamed
```
