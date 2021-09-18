---
title: PID を使わずにアプリケーションを kill する方法
date: 2020-02-11 10:00:00
topics:
  - CLI
  - ShellScript
  - MacOS
  - Alfred
type: tech
published: true
---

`ps -ef |grep NAME` で PID を確認する方法は面倒です。また、`pkill` や `killall` コマンドは間違ったプロセスを強制終了してしまうリスクがあります。
この記事ではオススメのアプリケーションを kill する方法をいくつか紹介します。

```toc

```

## fkill CLI

sindresorhus が作っている `fkill` というコマンドを使うと便利です。
絞り込みができて Enter で kill できます。

```sh
$ npm i -g fkill
$ fkill
# or
$ npx fkill
```

[sindresorhus/fkill: Fabulously kill processes\. Cross\-platform\.](https://github.com/sindresorhus/fkill)

![anozonbiyori__fkill](https://elzup-image-storage.s3.amazonaws.com/blog/anozonbiyori__fkill.png)

## Alfred Kill Process

Mac OS で [Alfred](https://www.alfredapp.com/) を使ってる人にはオススメの workflow があります。

[Kill Process \| Packal](http://www.packal.org/workflow/kill-process)

![alfred-kill-chrome](https://elzup-image-storage.s3.amazonaws.com/blog/alfred-kill-chrome.png)
