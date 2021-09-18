---
title: 1つ上のディレクトリ名をとるShellコマンド
date: 2020-05-27 20:00:00
topics:
  - ShellScript
type: tech
published: true
---

```toc

```

## 1 つ上のディレクトリ path をとる

```sh
~/.ghq/github.com/elzup/anozonbiyori
$ basename ${PWD%/*}
elzup
```

## 現在のディレクトリ path をとる

```sh
~/.ghq/github.com/elzup/anozonbiyori
$ basename $PWD
anozonbiyori
```

## 2 ディレクトリをとる

```sh
$
~/.ghq/github.com/elzup/anozonbiyori
echo `basename ${PWD%/*}`/`basename $PWD`
elzup/anozonbiyori
```

## 補足

`${PWD%/*}` という部分は文字列置換が働いてます。

参考: [bash の変数内文字列置換まとめ \- Qiita](https://qiita.com/aosho235/items/c36568830a8d47288284)

```sh
$ pwd
/Users/hiro/.ghq/github.com/elzup/anozonbiyori

$ echo ${PWD%/*} # 末尾から/までの非貪欲マッチ部分を削除
/Users/hiro/.ghq/github.com/elzup

$ basename ${PWD%/*}
elzup

$ echo ${${PWD%/*}##*/}
elzup
```

## おまけ: alias 化

推奨はしないよ！

```sh:title=.zshrc
alias basename-current='basename ${PWD}'
alias basename-parent='echo `basename ${PWD%/*}`/`basename $PWD`'
alias reponame=basename-parent
```
