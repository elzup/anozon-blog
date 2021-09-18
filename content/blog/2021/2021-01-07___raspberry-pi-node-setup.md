---
title: Raspberry Pi に Node.js セットアップ
date: 2021-01-07 21:00:00
tags:
  - Node.js
  - Raspberry Pi
type: tech
published: true
---

Raspberry Pi に Node.js 入れる方法のメモです。

[tj/n: Node version management](https://github.com/tj/n) を使います。

## .profile の設定

```
$ vim ~/.profile
```

```sh title=.profile
export PATH=~/.npm-global/bin:$PATH
export N_PREFIX="$HOME/n"
export PATH=$N_PREFIX/bin:$PATH
```

## インストール作業

```sh
$ sudo apt-get install -y nodejs npm

# permission で怒られないように変更する
$ mkdir ~/.npm-global
$ npm config set prefix '~/.npm-global'

# n の設定
$ npm i n --global
$ n stable

# 最初の node を消す
$ sudo apt purge -y nodejs npm
$ node -v
v10.23.1
$ which node
/home/pi/n/bin/node
```
