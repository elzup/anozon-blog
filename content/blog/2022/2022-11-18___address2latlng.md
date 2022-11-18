---
title: 住所リストから緯度軽度を一括で出力する
date: 2022-11-18 11:00:00
topics:
  - GeoCoding
  - Google Maps
type: tech
published: true
emoji: 🌎
---

## 準備

`node-geocoder` を使います。

[nchaulet/node\-geocoder: nodejs geocoding library](https://github.com/nchaulet/node-geocoder)

認証キー(`GOOGLE_API_KEY`) の取得

[API キーを使用して認証する  \|  Google Cloud](https://cloud.google.com/docs/authentication/api-keys?hl=ja)

## コード

`getGeoCodes(addressList: string[])` 関数

```js
const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'google',
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null,
}

const geocoder = NodeGeocoder(options)
const getGeoCode = (address) => geocoder.geocode(address)

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec))

async function getGeoCodes(addressList) {
  const geoCodes = new Map()

  for (const address of addressList) {
    await sleep(2000) // 制限回避
    const res = await getGeoCode(address)
    geoCodes.set(address, res[0])
  }
  return geoCodes
}
```

## 例

```js
const addressList = `
東京都千代田区丸の内１丁目
東京都千代田区鍛冶町２丁目
東京都千代田区外神田１丁目
存在しない地名
`
  .trim()
  .split('\n')
  .filter(Boolean)

async function main() {
  const res = await getGeoCodes(addressList)

  for (const [address, entry] of res.entries()) {
    if (!entry) {
      console.log(address + '\t\t')
    } else {
      console.log(address + '\t' + entry.latitude + '\t' + entry.longitude)
    }
  }
}
main()
```

出力

<!-- prettier-ignore -->
<!-- prettier-ignore -->
```
東京都千代田区丸の内１丁目	35.6818718	139.7658469
東京都千代田区鍛冶町２丁目	35.6920527	139.7719172
東京都千代田区外神田１丁目	35.6986829	139.7712782
存在しない地名		
```
