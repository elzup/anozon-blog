---
title: Firebase Function 内から Cloud Messaging で通知を投げる最小コード
date: 2020-01-08 23:03:38
tags:
  - Firebase
  - Firebase Cloud Messaging
  - GCP
category:
  - Tech
---

Firebase Function から Cloud Messaging (FCM HTTP v1 API) を使って通知を送る方法のメモです。

## firebase-admin の初期化設定する

[アプリサーバーからの送信リクエストを作成する  \|  Firebase](https://firebase.google.com/docs/cloud-messaging/send-message?hl=ja) (公式ドキュメント)

「`GOOGLE_APPLICATION_CREDENTIALS` が必要なの？」とか「 ADC はどうやって承認するの？」とか「Authorization ヘッダにどの Token をセットするの？」とか少しややこしかった。

結論から言うと **Firebase Function にデプロイする場合は何も考えなくていい**。
以下のコードで暗黙的に検出される。

```js
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})
```

## functions/index.js のコード例

`gist:elzup/66d33599362f232dfeb6f6c802718679#functions_index.js`

firestore などを使う場合は `databaseURL` オプションを設定する。
