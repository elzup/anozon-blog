---
title: GatsbyJS を Typescript に移行した際の Type 付け
date: 2020-01-09 11:12:20
tags:
  - GatsbyJS
category:
  - Tech
  - BlogOps
---

GatsbyJS で書いているこのブログを Typescript 移行しました。

主に以下の記事を参考に移行しました。なので今回は Type づけに焦点を当てて書きます。

[Gatsby\.js を完全 TypeScript 化する \- Qiita](https://qiita.com/Takepepe/items/144209f860fbe4d5e9bb)

## GraphQL Data, Page Component に型をつける

`gatsby-plugin-graphql-codegen` を使用する方法と `@graphql-codegen/typescript` を使用する方法がありましたが前者を選びました。セットアップが簡潔に済んだので。

### PageQuery

```js
import { IndexPageQuery } from '../../types/graphql-types.d'

type Props = {
  data: IndexPageQuery
  location: Location
}
const bioQuery = graphql`
  query IndexPage {
`
```

### StaticQuery

```js
import { BioDataQuery } from '../../types/graphql-types.d'

    <StaticQuery
      query={bioQuery}
      render={(data: BioDataQuery) => {

```

### その他 Props

```js
import { SitePageContext } from '../../types/graphql-types.d'

location: Location
pageContext: SitePageContext
```

## 感想

TypeScript を入れるとビルド周りで複雑になるフレームワークが多くて不安でしたが、あっさりと移行できてよかったです。
