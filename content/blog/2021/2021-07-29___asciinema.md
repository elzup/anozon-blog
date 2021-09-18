---
title: Terminal の録画ができる asciinema 使ってみた
date: 2021-07-29 10:00:00
tags:
  - asciinema
  - Shell
  - Terminal
type: tech
published: true
---

Terminal に特化した録画ができる asciinema 使ってみました。

[asciinema \- Record and share your terminal sessions, the right way](https://asciinema.org/)

```toc

```

## 録画してみる

保存するファイル名を `.cat` を指定して録画開始します。

```
asciinema rec anosignal.cast
```

こんな感じになりました。
[![asciicast](https://asciinema.org/a/w1uickh4DWUf24NHucKk3yVIL.svg)](https://asciinema.org/a/w1uickh4DWUf24NHucKk3yVIL)

```
ls anosignal.cast
741k anosignal.cast
```

15 秒くらいで 1MB 弱と意外と大きくなった。(文字数が多いから？)

## 再生してみる

`asciinema play` コマンドがとても面白いです。

```sh
# 出力をみれる
asciinema cat anosignal.cast
# アップロードしてWebで見たり共有できる
asciinema upload anosignal.cast
# 現在のターミナル上同じ Delay と出力で再生できる
asciinema play anosignal.cast
```

## .cast ファイルのサイズ検証

| 時間  | 出力          | サイズ    | ウィンドウ |
| ----- | ------------- | --------- | ---------- |
| 1 秒  | echo hello    | 1.4KB     | 小         |
| 10 秒 | echo hello    | 2KB       | 小         |
| 10 秒 | echo hello    | 1.4KB (?) | 大         |
| 10 秒 | 約 20000 文字 | 10KB      | 小         |
| 10 秒 | 約 20000 文字 | 58k       | 大         |

zsh の autosuggession も表示されます。  
`asciinema play` はウィンドウサイズが違うとずれる。
[Featured asciicasts \- asciinema](https://asciinema.org/explore) 他の人の録画が流れてくるのでたまに見ると面白そう。
