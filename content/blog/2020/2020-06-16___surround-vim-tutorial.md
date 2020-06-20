---
title: surround.vim 入門【vim中級者向け】
date: 2020-06-16 21:00:00
tags:
  - Vim
  - Coding
---

```toc

```

公式リポジトリ https://github.com/tpope/vim-surround

## why

- 周囲(クウォート, 括弧, タグ ...)の操作が楽になる
- Vim plugin にデフォルトでついてることが多いのですぐ使える

VSCodeVim(VSCode), IdeaVIM(JetBrains)

```
Plug 'tpope/vim-surround'
```

## demos

公式の Introduction にそって基本コマンドを紹介します。
[vim\-surround/surround\.txt at master · tpope/vim\-surround](https://github.com/tpope/vim-surround/blob/master/doc/surround.txt)

### cs "change surround"

既存の括弧の変更。カーソル位置の外側の括弧を変更します。

```
"Hello world!"
↓cs"'
'Hello world!'
```

```
"Hello world!"
↓cs"<q>
<q>Hello world!</q>
```

```
(123+456)/2
↓cs)]
[123+456]/2
```

左括弧の場合は間に括弧の内側にスペースが入ります。

```
(123+456)/2
↓cs)[
[ 123+456 ]/2
```

```
<div>Yo!</div>
↓cst<p>
<p>Yo!</p>
```

### ds "delete surround"

括弧の削除。カーソル位置から 1 つ外側。

```
"Hello world!"
↓ds"
Hello world!
```

```
(123+456)/2
↓ds)
123+456/2
```

```
<p>Yo!</p>
↓dst
Yo!
```

### ys "you surround"

```
Hello w\*orld!
↓ysiw)
Hello (world)!
```

### virtual select → S

```
Hello w\*orld!
↓viwS)
Hello (world)!
```
