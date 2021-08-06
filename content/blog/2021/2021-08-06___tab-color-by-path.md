---
title: iTerm2 でディレクトリによってタブの色を変える
date: 2021-08-06 16:00:00
tags:
  - Shell
  - zsh
  - iTerm2
---

ディレクトリ移動時に自動でタブの色が変わるようにします。

<!-- TODO -->

```sh
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
