---
title: iTerm2 でディレクトリによってタブの色を変える
date: 2021-08-06 16:00:00
tags:
  - Shell
  - zsh
  - iTerm2
---

ディレクトリ移動時に自動でタブの色が変わるようにします。

移動時にディレクトリによって別のコマンドを実行する方法と、iTerm のタブ色を変える方法を組み合わせて実現します。

[任意のディレクトリ移動時にコマンドを実行する\(zsh\) \| あのぞんブログ](https://blog.anozon.me/chpwd-by-path)

[iTerm tab\-color メモ \| あのぞんブログ](https://blog.anozon.me/iterm2-tab-color)

[iTerm2 の tab のタイトルと色を動的にいじる \- Qiita](https://qiita.com/daicche/items/135d063444d152e63e1c)

```sh:title=.zshrc
autoload -Uz add-zsh-hook

## chpwd_tab_color
tab-color() {
    echo -ne "\033]6;1;bg;red;brightness;$1\a"
    echo -ne "\033]6;1;bg;green;brightness;$2\a"
    echo -ne "\033]6;1;bg;blue;brightness;$3\a"
}

tab-reset() {
    echo -ne "\033]6;1;bg;*;default\a"
}

chpwd_tab_color() {
  case $PWD/ in
    */.ghq/github.com/elzup/*) tab-color 100 0 100;; # purple
    */.ghq/github.com/elzup-sandbox/*) tab-color 100 100 255;; # blue
    */.ghq/github.com/*) tab-color 100 100 100;; # base gray
    *) tab-reset;;
  esac
}
add-zsh-hook chpwd chpwd_tab_color
```

![tabcolor-auto](https://elzup-image-storage.s3.amazonaws.com/blog/tabcolor-auto.png)
