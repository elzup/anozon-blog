---
title: 5層 ReactComponent と TypeScript でカウンター書いてみる
date: 2020-01-21 11:00:00
tags:
  - React
  - TypeScript
  - Redux
---

[経年劣化に耐える ReactComponent の書き方 \- Qiita](https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a#comment-9e55cb6f442777882e65)
が良さそうだったので TypeScript で書く場合を試してみた。

## コード

[CodeSandbox](https://codesandbox.io/s/typescript-react-5layer-sczy6)

```js
import React, { useState } from "react"
import styled from "styled-components"

type Props = {
  className?: string
  count: number
  handleCountUp: () => void
  handleCountDown: () => void
} & ContainerProps

const Component = (props: Props) => {
  return (
    <div className={props.className}>
      <p>{props.count}</p>
      <button onClick={props.handleCountUp}>UP</button>
      <button onClick={props.handleCountDown}>DOWN</button>
    </div>
  )
}

const StyledComponent = styled(Component)`
  background: #eee;
  padding: 4px;
  > button {
    padding: 4px 8px;
    border-radius: 4px;
  }
`

type ContainerProps = {}
const Container = (props: ContainerProps) => {
  const [count, setCount] = useState<number>(0)

  return (
    <StyledComponent
      {...props}
      count={count}
      handleCountUp={() => setCount(s => s + 1)}
      handleCountDown={() => setCount(s => s - 1)}
    />
  )
}

export default Container
```

## 気になる部分

StyledComponent で既存 Component を Wrap する際わ className が必要になったが、Type がついてないため
`className?: string` が必要。

## Container(DI 部分)

Redux の場合こんなイメージになるはず。(生に書きます)

Redux hooks

```js
import { useSelector, useDispatch } from 'redux'
import { countUp, countDown } from './actions'
import { getCount } from './selectors'

type ContainerProps = {}
const Container = (props: ContainerProps) => {
  const count = useSelector<State, number>(getCount)
  const dispatch = useDispatch()

  return (
    <StyledComponent
      {...props}
      count={count}
      handleCountUp={() => dispatch(countUp())}
      handleCountDown={() => dispatch(countDown())}
    />
  )
}
```

Redux connect

```js
import { connect } from 'redux'
import { countUp, countDown } from './actions'
import { getCount } from './selectors'

type OProps = {}
type SProps = { counter: number }
type DProps = { countUp: () => void; countDown: () => void  }
const Container = connect<SProps, DProps, OProps, State>(
  (state) => ({ counter: getCounter(state)}),
  { handleCountUp: countUp, handleCountDown: countDown }
)(StyledComponent)

```

## 元記事含めて感想

記事への反応でも言ってる人が多いが、同じようにロジック(DI)を分ける設計は頭にあった。

StyledComponent で大胆に全体を Wrap したことがなかったが結構整理されるように感じるので良さそう。
コード上ではきれいに分けることができるが、sytled-components に依存する部分は弱く感じる。(今の所 styled-components は好きだしよく使っている)
