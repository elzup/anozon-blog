---
title: node.js で Streaming の メタデータを取得する
date: 2021-01-12 14:00:00
topics:
  - Node.js
  - icy
  - Streaming
type: tech
published: true
---

この記事では node.js で Streaming の メタデータを取得する方法について紹介します。

`node-icy` を使用します。

[TooTallNate/node\-icy: Node\.js module for parsing and/or injecting ICY metadata](https://github.com/TooTallNate/node-icy)

## コード

```js
const icy = require('icy')
const iconv = require('iconv-lite')

const sjisToUtf8 = (str) => iconv.decode(str, 'SJIS')
const url = process.env.URL

icy.get(url, (res) => {
  // HTTP response headers
  // console.log(res.headers)

  res.on('metadata', (metadata) => {
    const parsed = icy.parse(sjisToUtf8(metadata))

    console.log(parsed.StreamTitle) // タイトル
  })
  res.on('end', () => {
    console.log('end')
  })
  res.resume() // 何度も取得する場合
})
```

文字 encoding がある場合は `icy.parse()` 前に decode します。

### 関数版

```js
function subscribe(url, callback, onEnd) {
  icy.get(url, (res) => {
    res.on('metadata', (metadata) => {
      const parsed = icy.parse(sjisToUtf8(metadata))

      callback(parsed.StreamTitle)
    })
    res.on('end', onEnd)
    res.resume()
  })
}
subscribe(
  'http://hoge.mp4',
  (title) => console.log('title: ' + title),
  () => {
    console.log('end')
  }
)
```
