---
title: vim でディレクトリ内のファイルを一括リネームする
date: 2020-02-19 15:00:00
tags:
  - Vim
type: tech
published: true
---

vimfiler の rename 機能が便利で、複数ファイルを自由自在にリネームできます。
[Shougo/vimfiler\.vim: Powerful file explorer implemented by Vim script](https://github.com/Shougo/vimfiler.vim)

```toc

```

## やってみる

![before-rename-files.png](https://elzup-image-storage.s3.amazonaws.com/blog/before-rename-files.png)

.js ファイルを .tsx に書き換えます。

### 動画

`oembed: https://www.youtube.com/watch?v=BxSkWfem7uI&feature=youtu.be`

1. `vim target/dir` ディレクトリを開く
1. `*` 全ファイル選択
1. `r` リネームモード

**vim 編集の例 1 解説**

1. `/js` js に移動
1. `cwtsx<esc>` js 削除 tsx に書き換えて戻る
1. `n.n.` 次の js に移動書き換え再実行繰り返し

**vim 編集の例 2 解説**

1. `:%s/js/tsx` js を tsx に replace

## 関連: renamer を使う

例のようにパターンがある場合は [renamer](https://github.com/75lb/renamer) も使えます。

[75lb/renamer: Rename files in bulk\.](https://github.com/75lb/renamer)

```
renamer --find "/^(.*?)\.js\$/" --replace "\$1.tsx" src/**/*
```
