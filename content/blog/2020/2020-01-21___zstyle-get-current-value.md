---
title: zstyle で現在の値を取得する
date: 2020-01-21 16:00:00
tags:
  - zsh
---

この記事では zstyle で現在の値を取得する について紹介します。

zstyle コマンドのマニュアル [zsh: 22 Zsh Modules](http://zsh.sourceforge.net/Doc/Release/Zsh-Modules.html#index-zstyle)

## 方法 1. -g オプションを使う。

```sh
$ zstyle -g tmp ':chpwd:*'
$ echo $tmp
recent-dirs-max

$ zstyle -g tmp ':chpwd:*' recent-dirs-max
$ echo $tmp
500
```

## 方法 2. そのまま叩く

```
zstyle
```

デフォルト値以外設定された値が全て出ます。

## デフォルト値について

マニュアルからたどるしかなさそうです。

## ちょっと感想

zsh のマニュアルが少し不親切だった。リファレンス内検索もないし辿り着きにくかった。
--help や man zstyle が無いと思ったらオプション無しだとなんか出たり。
