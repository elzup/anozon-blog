---
title: Cloud Functions の重い処理を分散する
date: 2021-12-16 14:00:00
topics:
  - Firebase
  - Cloud Functions
type: tech
published: false
emoji: ⚖️
---

Cloud Functions の重い処理を分散して実行するサンプルを紹介します。

## 時間のかかる関数

```

```

## Fan-out する

### 小さい処理に分ける

### 注意点

ほぼ同時に呼び出すことになるので、制限や整合性には中が必要です。

参考: [PubSub Function の fan\-out の限界 \(2020\-03\-02\) \| あーありがち](https://aligach.net/diary/2020/0302/)
