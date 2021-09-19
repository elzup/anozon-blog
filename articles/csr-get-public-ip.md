---
title: ブラウザ javascript 側で global ip を取得する
date: 2021-07-06 16:00:00
topics:
  - JavaScript
  - Networking
  - React
type: tech
published: true
---

CSR (Client side rendering) でユーザの public ip を取得する方法です。

## ipify を使う

[ipify \- A Simple Public IP Address API](https://www.ipify.org/)

```js
const API_URL = 'https://api.ipify.org/?format=json'
const res = await fetch(API_URL)
const data = await res.json()
console.log(data.ip)
```

## ReactHooks の例

Code: [tools/global\-ip\.tsx at master · elzup/tools](https://github.com/elzup/tools/blob/master/src/pages/global-ip.tsx)

Demo: [public IP 取得](https://tools.anozon.me/global-ip)
