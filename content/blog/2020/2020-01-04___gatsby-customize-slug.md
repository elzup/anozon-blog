---
title: GatsbyJSで記事のURLをカスタマイズする
date: 2020-01-04 23:03:38
tags:
  - Gatsby
category:
  - Tech
---

この記事では GatsbyJS で作るブログの **slug(URL のパス部分)** のカスタマイズ方法を紹介します。

## URL(記事のパス)の変更方法

(`gatsby-source-filesystem`)[https://www.gatsbyjs.org/packages/gatsby-source-filesystem/] を使用しています。

## 実装例

今回このブログを例にカスタマイズします。

プロジェクトのブログポストのディレクトリ構造はここに位置しています。
`/content/blog/{year}/{year}-{month}-{day}_{slug}.md`

変更前の記事 URL は以下で、
→ `https://blog.anozon.me/2020/2020-01-04_gatsby-customize-slug`

slug に当たる部分のみを URL に含める形にしたいです。
→ `https://blog.anozon.me/gatsby-customize-slug`
