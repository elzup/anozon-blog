---
title: 【JavaScript】ズームしたときの座標を求める関数
date: 2021-02-13 17:00:00
topics:
  - JavaScript
type: tech
published: true
---

![](https://elzup-image-storage.s3.amazonaws.com/blog/zoome-rect.png)

図の外側四角 (`sx, sy, ex, ey`) と選択点(`ox, oy`)と拡大率から 内側の四角(`nsx, nsy, nex, ney`)を求める関数です。

## コード

```js
const zoom1D = (s, e, p, scale = 2) => {
  const d = e - s
  const o = s + d * p
  const r = d / scale / 2
  return [o - r, o + r]
}
const zoom2D = (sx, sy, ex, ey, px, py, scale = 2) => {
  const [nsx, nex] = zoom1D(sx, ex, px, scale)
  const [nsy, ney] = zoom1D(sy, ey, py, scale)
  return [nsx, nex, nsy, ney]
}
```

## マンデルブロ集合をズームしてくサンプル

コード [tools/mandelbulb\.tsx at master · elzup/tools](https://github.com/elzup/tools/blob/master/src/pages/mandelbulb.tsx)

Web [マンデルブロ集合](https://tools.anozon.me/mandelbulb)
