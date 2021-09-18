---
title: Next.js export 実行時のタイムスタンプをコンポーネントで使う
date: 2020-11-17 14:00:00
tags:
  - Next.js
  - TypeScript
  - SSR
type: tech
published: true
---

`next export` を実行した時のタイムスタンプをレンダリングしたいときの方法です。  
jsx 上で `<span>{new Date()}</span>` などとするとクライアントサイドでレンダリングされた時間が表示されてしまいます。

SSR 時のデータを React で使いたい場合は NextPage コンポーネント で `Component.getInitialProps` を使うと渡すことが出来ます。
(`/pages` 直下で export するコンポーネント)

## コード

```tsx
import { createContext } from 'react'

type InitialProps = { buildTime: string }
const IndexPage: NextPage<InitialProps> = ({ buildTime }) => (
  <div>
    <span>ビルド日時: {buildTime}</span>
  </div>
)

IndexPage.getInitialProps = async () => {
  return { buildTime: String(new Date()) }
}

export default IndexPage
```

## useContext 経由で使う場合

```tsx
import { createContext } from 'react'
export const TimeContext = createContext('')

type InitialProps = { buildTime: string }

const IndexPage: NextPage<InitialProps> = ({ buildTime }) => (
  <TimeContext.Provider value={buildTime}>
    <Index />
  </TimeContext.Provider>
)

IndexPage.getInitialProps = async () => {
  return { buildTime: String(new Date()) }
}

export default IndexPage
```

```tsx
const Footer = () => {
  const timeStr = useContext(TimeContext)

  return <span>ビルド日時: {timeStr}</span>
}
```
