---
title: ngrok で http リクエストの中身を全部確認する【IoTデバッグ】
date: 2020-10-13 10:00:00
topics:
  - http
  - ngrok
type: tech
published: true
---

「自前の API にリクエストは届いてるけどなにか不具合が起きている」「リクエストをダンプする環境をすぐに用意するのはダルい」とき用。
ngrok の本来の使い方とは違いますが、http パケットキャプチャができます。

```toc

```

## ngrok とは

[ngrok \- secure introspectable tunnels to localhost](https://ngrok.com/)

使い捨て URL (https) でローカルのネットワークを外部に公開できるサービスです。

`brew install ngrok` でも入れられるようになりました。

セットアップ手順 [ngrok – documentation](https://ngrok.com/docs)

無料ユーザ登録と cli に key 登録が必要です。

## どんな事ができるか

コマンドで立ち上げます。

```sh
$ ngrok http 3000
ngrok by @inconshreveable                                        (Ctrl+C to quit)

Session Status                online
Account                       elzup (Plan: Free)
Version                       2.3.35
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://9e95453ed1cb.ngrok.io -> http://localhost:3000
Forwarding                    https://9e95453ed1cb.ngrok.io -> http://localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

ここで web アプリを立ててくれます。 `http://127.0.0.1:4040`

例えば以下のようなリクエストを投げてみます。

```curl
curl -X PUT "https://9e95453ed1cb.ngrok.io/path/hello?query=hello-query" -H "x-myheader: hello-header" -d '{"body":"hello"}'
```

すると受け取った(ngrok が通した) HTTP の中身を見ることが出来ます。

![ngrokサンプル](https://elzup-image-storage.s3.amazonaws.com/blog/ngrok-sample.png)

デフォルトでは ngrok が 502 レスポンスを返すようです。  
もちろん ローカルで http server を立てておけば レスポンス側の内容も見れます。
