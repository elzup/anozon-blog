---
title: localhost.{appname}:3000 で開発してブラウザキャッシュを活用する案
date: 2020-05-26 03:00:00
tags:
  - CreateReactApp
  - Next.js
  - Idea
type: tech
published: true
---

複数のアプリを同じ `localhost:3000` で開発すると切り替えるたびにキャッシュが競合するので `/etc/hosts` で変える案です。

```toc

```

## /etc/hosts

```
sudo vim /etc/hosts
```

```:title=/etc/hosts
127.0.0.1 localhost.appname
127.0.0.1 localhost.othername
127.0.0.1 localhost.hoge
127.0.0.1 localhost.fuga
```

## フロントエンド開発起動スクリプト例

CRA (Create React App) や Next.js の起動スクリプト例。(起動時に自動で開く URL が変わるだけ？)

```json:title=package.json
{
  "scripts": {
    "start": "HOST=localhost.appname react-scripts start", // CRA
    "start": "next -H localhost.appname" // Next.js
  }
}
```
