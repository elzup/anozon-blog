---
title: React で特定の props を固定した特化コンポーネントを定義する
date: 2021-01-19 20:00:00
topics:
  - TypeScript
  - React
  - recompose
  - styledcomponents
type: tech
published: true
---

React で特定の props を固定した特化コンポーネントを定義する方法をいくつかまとめました。

```toc

```

DEMO です。
[react\-set\-props \- CodeSandbox](https://codesandbox.io/s/react-set-props-w690b)

以下の `Message` という自作コンポーネントと `Star` というライブラリのコンポーネントを例に使います。  
Star は `material-ui の icon コンポーネントです。

```tsx
import Star from '@material-ui/icons/Star'

const Message = (props) => <p>mes: {props.text}</p>
const App = () => (
  <>
    <h2>default</h2>
    <Message text="hello yo" />
    <Star />
    <Star fontSize="large" />
  </>
)
```

## そのまま生の React で書く

```tsx
type MProps = React.ComponentProps<typeof Message>
const MessageGoodby = (props: MProps) => (
  <Message text="good by..." {...props} />
)

type StarProps = React.ComponentProps<typeof Star>
const StarLarge = (props: StarProps) => <Star fontSize="large" {...props} />

// 型なし
// const MessageGoodby = (props) => <Message {...props} text="good by..." />
// const StarLarge = (props) => <Star {...props} fontSize="large" />
```

```tsx
const App = () => (
  <>
    <h2>generic</h2>
    <MessageGoodby />
    <StarLarge />
    <MessageGoodby text="overridable" /> {/* works */}
    <StarLarge fontSize="small" /> {/* works */}
  </>
)
```

## recompose/defaultProps を使う方法

```tsx
import { compose, defaultProps } from 'recompose'

const MessageGoodbyR = defaultProps({ text: 'good by...' })(Message)

const withFontLargeProp = compose(defaultProps({ fontSize: 'large' }))
const StarLargeR = withFontLargeProp(Star)
```

```tsx
const App = () => (
  <>
    <h2>recompose/defaultProps</h2>
    <MessageGoodbyR />
    <StarLargeR />
    <MessageGoodbyR text="overridable" /> {/* works */}
    {/* <StarLargeR fontSize="small" /> works, TypeError */}
  </>
)
```

こちらは 短く書ける上に `withHogeProps` と HOC を作ることができます。
ただ上記のコードだと既存ライブラリの拡張コンポーネントに props を再度指定した際に Type エラーが起きてしまうのが気になります。(ジェネリクスで指定できる？)

## styled-components を使う方法

```ts
import styled from 'styled-components'
type MProps = React.ComponentProps<typeof Message>
type StarProps = React.ComponentProps<typeof Star>
const MessageGoodbyS = styled(Message).attrs((props: MProps) => ({
  text: 'good by...',
  ...props,
}))``
const StarLargeS = styled(Star).attrs((props: StarProps) => ({
  fontSize: 'large',
  ...props,
}))``
```

```tsx
const App = () => (
    <h2>styled-components</h2>
    <MessageGoodbyS />
    <StarLargeS />
    <MessageGoodbyS text="overridable" /> {/* works */}
    <StarLargeS fontSize="small" /> {/* works */}
)
```

こちらはしっかり上書きできますが型指定が必要です。

上書きはできませんが以下のように省略して書くこともできます。

```tsx
const MessageGoodbyS2 = styled(Message).attrs({ text: 'good by...' })``
const StarLargeS2 = styled(Star).attrs({ fontSize: 'large' })``

const App = () => (
    <MessageGoodbyS2 />
    <StarLargeS2 />
    <MessageGoodbyS2 text="overridable" /> {/* ❌ */}
    {/* <StarLargeS2 fontSize="small" /> ❌, TypeError */}
)
```
