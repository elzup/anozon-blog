---
title: iTerm tab-color メモ
date: 2021-07-19 10:00:00
topics:
  - iTerm2
  - DevOps
  - zsh
type: tech
published: true
---

## `tab-color` コマンドを作っておく

[iTerm2 の tab のタイトルと色を動的にいじる \- Qiita](https://qiita.com/daicche/items/135d063444d152e63e1c)

`tab-color` コマンドを zshrc などに追加します。

```
tab-color () {
	echo -ne "\033]6;1;bg;red;brightness;$1\a"
	echo -ne "\033]6;1;bg;green;brightness;$2\a"
	echo -ne "\033]6;1;bg;blue;brightness;$3\a"
}
```

## 何色かメモ

```sh
tab-color 255 255 200 # light yellow
tab-color 50 71 81 # gray
tab-color 100 100 255 # blue
tab-color 100 255 100 # green
tab-color 255 100 100 # red
tab-color 255 255 100 # yellow
```

![](https://elzup-image-storage.s3.amazonaws.com/blog/tab-color-sample.png)

## 設定作成とキャッシュ

末尾にコメントで色をメモっておくと補完が効いていい(zsh `percol_select_history` の例)

![](https://elzup-image-storage.s3.amazonaws.com/blog/tab-color-completion.png)
