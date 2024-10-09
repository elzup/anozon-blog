---
title: ssh 接続先の vim でマウスの選択範囲をコピーする
date: 2021-01-13 13:00:00
topics:
  - Vim
  - iTerm2
  - ssh
type: tech
published: true
---

## vim で mouse を off にする
(vim の機能の方のマウス選択が邪魔をしているのでオフにする)

```vim
:set mouse=
```

## iTerm2 の設定

![](https://elzup-image-storage.s3.amazonaws.com/blog/iterm-clipboard-option.png)

これでターミナルの時と同じように、マウスでドラッグした範囲をクリックでコピーできるようになる
