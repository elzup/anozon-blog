---
title: gatsby-starter-blog のコードからリファクタリングしてみた
date: 2020-01-23 13:00:00
tags:
  - a
  - b
category: BlogOps
status: draft
---

この記事では gatsby-starter-blog のコードからリファクタリングしてみた について紹介します。

## Container わける

StaticQuery を DI(依存性の注入)として分けます。
Bio を例に

Bio を純粋なコンポーネントにできる
ネストが下がります

render props を使っていたのでピンときたけど hooks が用意されていました。

## 手順 2. リクエストを定義する

## xx の場合
