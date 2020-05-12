---
title: Desktopのファイルを一掃する
date: 2020-05-12 20:00:00
tags:
  - ShellScript
---

`~/Desktop`や `~/Downloads` ディレクトリはよく散らかるので、「散らかってきたな〜」と思ったとにバックアップに移動するコマンドをまとめます。

## コマンド

`~/Desktop/*` のファイルを 日付つきディレクトリ(例 `~/backup/desktop20200512`)に移動します。

```sh
today=$(date "+%Y%m%d") && mv $HOME/Desktop/* $HOME/backup/desktop$today/
```
