---
title: Firebase Functions の console.log をまとめる
date: 2020-07-02 16:00:00
tags:
  - Firebase
  - Firebase Functions
type: tech
published: true
---

Firebase Functions が Node 8 サポートを終了しログの仕様が少し変わりました。
`console.log` で Object を渡すと 1 行ずつにログが分割されてしまうようになりました。

[Console\.log calls result in multiple log entries where a single entry is expected · Issue \#612 · firebase/firebase\-functions](https://github.com/firebase/firebase-functions/issues/612)

## とりあえずの解決策

```js
require('firebase-functions/lib/logger/compat')
```

```ts:title=tsの場合
import 'firebase-functions/lib/logger/compat'
```
