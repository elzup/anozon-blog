---
title: Web カメラを確認できる鏡ツールを作った
date: 2021-08-26 15:00:00
topics:
  - Mitelop
  - Video
  - 作ったもの
type: tech
published: true
---

Mitelop の 1 ツールとして追加しました。
[Widget makeing tool \| Mitelop](https://mitelop.anozon.me/)

https://elzup-image-storage.s3.amazonaws.com/blog/mitelop-mirror.png

## カメラ起動確認

![](https://elzup-image-storage.s3.amazonaws.com/blog/mitelop-lock.png)

毎回ボタンでカメラ起動するようにしています。（配信に映るとまずいので）
もちろん初回はカメラ権限の承認を求めます。

もっと安全な Confirm UI があればアップデートしたいです。

## cover と contain

カメラレイアウトを `cover` と `contain` のオプションを付けました。  
定番 CSS の `object-fit` を使っています。

![](https://elzup-image-storage.s3.amazonaws.com/blog/mitelop-mirror-fit.png)

## 姿見にも

大きいモニタで表示したら姿見としても使えました。

![](https://elzup-image-storage.s3.amazonaws.com/blog/mitelop-mirror-big.jpg)
