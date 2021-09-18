---
title: 【JavaScript】時刻指定で setTimeout するスニペット
date: 2020-02-25 11:00:00
tags:
  - JavaScript
type: tech
published: true
---

ダッシュボードなど開きっぱなしにする Web 画面で特定の時間にイベントを発火させる方法をまとめました。

```toc

```

## 特定の時刻に実行する

```js
setTimeout(() => {
  //  code
  // console.log(new Date())
}, new Date().setHours(13, 30, 0, 0) - new Date()) // 13時30分に実行
```

## 日付が変わったときに

```js
const nextDay = () => new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000
const tommorowFromNow = () => nextDay() - new Date()

setTimeout(() => {
  //  code
}, tommorowFromNow())
```
