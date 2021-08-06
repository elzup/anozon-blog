---
title: 任意のディレクトリ移動時にコマンドを実行する(zsh)
date: 2021-08-06 15:00:00
tags:
  - Shell
  - zsh
---

## 移動時に実行するコマンドを登録する

移動後に実行する hook の登録には `add-zsh-hook` の `chpwd` を使用します。

.zshrc などで以下のように登録をしておきます。

```sh:title=.zshrc
function hoge() {
	# run command
}
autoload -Uz add-zsh-hook
add-zsh-hook chpwd hoge
```

## ディレクトリによって変える関数を定義する

最初にマッチした部分だけ実行されます。

```sh
chpwd_tab_color() {
  case $PWD/ in
    */.ghq/github.com/elzup/*) echo "here is github/elzup";;
    */.ghq/github.com/elzup-sandbox/*)  echo "here is github/elzup-sandbox";;
    */.ghq/github.com/*) echo "here is github/";;
    *) echo "other dir";;
  esac
}

## add-zsh-hook で登録する
add-zsh-hook chpwd chpwd_tab_color
```

応用例として iTerm2 でタブの色を変える方法を別の記事で紹介します。

[iTerm2 でディレクトリによってタブの色を変える \| あのぞんブログ](https://blog.anozon.me/tab-color-by-path)
