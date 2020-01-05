---
title: GatsbyJSで記事のURLをカスタマイズする
date: 2020-01-04 23:03:38
tags:
  - GatsbyJS
  - BlogOps
category:
  - Tech
---

この記事では GatsbyJS で作るブログの **slug(URL のパス部分)** のカスタマイズ方法を紹介します。

[gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/) を使用している前提で説明します(gatsby-starter-blog に入っています)。

## 手順. /gatsby-node.js を編集する

slug は `/gatsby-node.js` の onCreateNode 内の createNodeField で設定しています。以下のコードでは createFilePath で作成されるパスがそのまま設定されています。

```js:title=gatsby-node.js
exports.onCreateNode = ({ node, actions, getNode }) => {
  const value = createFilePath({ node, getNode })
  createNodeField({
    name: `slug`,
    node,
    value,
  })
}
```

createFilePath で返されるパスは `gatsby-source-filesystem` の path オプションをルートとした絶対パスとなっています。**ファイルの拡張子はついていません**。

```js:title=gatsby-config.js
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
```

## 実装例

今回このブログを例にカスタマイズします。

僕のブログではブログポストのファイルは以下のディレクトリに配置しています。

`/content/blog/2020/2020-01-04___gatsby-customize-slug.md`

(`/content/blog/{year}/{year}-{month}-{day}___{slug}.md`)

URL は以下のようになっています。

`https://blog.anozon.me/2020/2020-01-04_gatsby-customize-slug`

この日付入り URL を、記事の ID に当たる部分のみに省略してシンプルにします。

`https://blog.anozon.me/gatsby-customize-slug`

[実装 Commit](https://github.com/elzup/anozonbiyori/commit/34505a0a39640ea0b2a1b60c7662412544179510#diff-fda05457e393bada716f508859bfc604)

変更点

- SLUG_SEPARATOR によって slug 部分をチュシュツして返す getSlug 関数の作成
  - SLUG_SEPARATOR を含まない場合はそのまま
- getSlug を適用して返す

```js:title=gatsby-node.js
const SLUG_SEPARATOR = '___'

// '2020/2020-01-04___gatsby-customize-slug' → 'gatsby-customize-slug'
const getSlug = path => {
  const [prefix, slug] = path.split(SLUG_SEPARATOR)
  return slug || path
}

if (node.internal.type !== `MarkdownRemark`) return

const { createNodeField } = actions
const filePath = createFilePath({ node, getNode, trailingSlash: false })
const slug = getSlug(filePath)

createNodeField({
  name: `slug`,
  node,
  value: slug,
})
```

![https://elzup-image-storage.s3-ap-northeast-1.amazonaws.com/blog/gatsby-custom-slug.png](https://elzup-image-storage.s3-ap-northeast-1.amazonaws.com/blog/gatsby-custom-slug.png)

カスタマイズできました。
