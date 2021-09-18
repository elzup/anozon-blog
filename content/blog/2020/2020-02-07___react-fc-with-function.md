---
title: children を持つ Component を normal function で書くときの型定義
date: 2020-02-07 12:00:00
topics:
  - React
  - TypeScript
type: tech
published: true
---

この記事では children を持つ Component を function で書くときの型定義する方法を説明します。

## 書き方

`React.PropsWithChildren<Props>` を使うことで書けます。

Sample [PropsWithChildren \- CodeSandbox](https://codesandbox.io/s/propswithchildren-3scmd)

```tsx
type Props = {}
function Component(props: React.PropsWithChildren<Props>) {}
```

### それぞれの書き方

```tsx
/* children なし */
// arrow function
const DecorateConst = (props: Props) => {
  return <span>{props.name}</span>
}

// normal function
function DecorateFunc(props: Props) {
  return <span>{props.name}</span>
}

/* children あり */
// arrow function
const DecorateConstHasChild: React.FC<Props> = (props) => {
  return <div>{props.children}</div>
}

// normal function
function DecorateFuncHasChild(props: React.PropsWithChildren<Props>) {
  return <div>{props.children}</div>
}
```

## 関連 Tips

Props に children を持たないのに React.FC で型付けしてしまうと、
想定外の書き方をしても気づけません。

```tsx
const Badge: React.FC<{}> = () => {
  return <span>Yo</span>
}

const Component = () => {
  // no Error
  return <Badge>hoge</Badge>
}
```

以下のようにいくつかショートハンドを使用できます。

```tsx
const Component = (props: Props) => {
  return <span>{props.name}</span>
}

// ↓

const Component = ({ name }: Props) => {
  return <span>{name}</span>
}

// ↓

const Component = ({ name }: Props) => <span>{name}</span>
```
