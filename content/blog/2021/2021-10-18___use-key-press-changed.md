---
title: すべてのキーの onDown, onUp イベントを取る React Hooks
date: 2021-10-18 11:00:00
topics:
  - React
  - TypeScript
  - ReactHooks
type: tech
emoji: ⌨️
published: true
---

ピアノツールを作ってたら**押すたびに 1 度だけ発火する**イベントハンドラが欲しくなったので作りました。
その際にキーイベントに関する他パターンのカスタムフックを作ってみました。

`react-use` を拡張します。

<!-- `onKeyDown` では長押しで連打のように発火してしまいます。 -->

## (1 回だけ発火するように)キーの長押しのはじめと終わりを取る

`useKeyPress` `useKeyPressEvent` を使うことで取ることが出来ます。

```tsx
import { useKeyPress } from 'react-use'

const Component = () => {
  const [pressed, e] = useKeyPress('a')

  useEffect(() => {
    if (pressed) {
      // 押したとき
    } else {
      // 離したとき
    }
  }, [pressed]) // 切り替わった時
}
```

または、

```tsx
import { useKeyPressEvent } from 'react-use'

useKeyPressEvent(
  'a',
  (e) => {
    // 押したとき
  },
  (e) => {
    // 離したとき
  }
)
```

## すべてのキーのイベントを取る

第一引数の KeyFilter に `() => true` を指定するとすべてのキーについてイベントを取れます。

```tsx
import { useKeyPressEvent } from 'react-use'

const Component = () => {
  useKeyPressEvent(
    () => true,
    () => {
      // 押されたとき
    },
    () => {
      // 離したとき
    }
  )
}
```

一見これでピアノを実装するための複数のキー長押しも実装できそうですができません。  
**キーごとに見てくれているわけではありません。** .
ondown は何かしらのキーが押されてから、最初に何かしらのキーが離されたときに発火します。  
`react-use` の `useKeyPressEvent` は呼び出し毎に 1 つの key(`key|KeyFilter`)の状態管理しかしません(実装が間違っているわけではなく仕様です)。

https://github.com/streamich/react-use/blob/6f894599f150c60f314650994327f0743ad435d2/src/useKeyPressEvent.ts#L5

## すべてのキーの長押しを取る

カスタムフックで拡張します。
以下のフックで各キーの押し離しのイベントが取れます。

```tsx
const noop = () => {}
const nonFilter = () => true
const mapReducer = (
  v: Record<string, boolean>,
  { key, down }: { key: string; down: boolean }
) => ({ ...v, [key]: down })

export const useKeyPressAll = (
  keydown: Handler,
  keyup: Handler = noop,
  keydownAll: Handler = noop
) => {
  const [downs, set] = useReducer(mapReducer, {} as Record<string, boolean>)
  const downsRef = useRef(downs)

  useEffect(() => {
    downsRef.current = downs
  }, [downs])

  useKey(
    nonFilter,
    (e) => {
      keydownAll(e)

      if (!downsRef.current[e.key]) keydown(e)
      set({ key: e.key, down: true })
    },
    { event: 'keydown' }
  )
  useKey(
    nonFilter,
    (e) => {
      if (downsRef.current[e.key]) keyup(e)
      set({ key: e.key, down: false })
    },
    { event: 'keyup' }
  )
  return { downs }
}

const Component = () => {
  useKeyPressAll(
    (e) => {
      // 押されたとき
    },
    (e) => {
      // 離したとき
    }
  )
}
```

<!-- ## 特定のフォーカスされているコンポーネントでの使い方

`useEventListener` というものも作れるが型定義が複雑になる
https://github.com/foray1010/use-typed-event-listener/blob/master/src/index.ts
https://github.com/donavon/use-event-listener/blob/develop/types/index.d.ts -->

## 他の useKeyHook 拡張例

### 直近の入力シーケンス

```tsx
const updateQueue = <T>(arr: T[], size: number, item: T) =>
  [...arr, item].slice(-size)

export const useQueue = <T>(size: number, initArr: T[] = []) =>
  useReducer((v: T[], item: T) => updateQueue(v, size, item), initArr)

export const useKeyQueue = () => {
  const [downQueue, setDownQueue] = useQueue<string>(10)
  const [downAllQueue, setDownAllQueue] = useQueue<string>(10)
  const [upQueue, setUpQueue] = useQueue<string>(10)

  useKeyPressAll(
    ({ key }) => {
      setDownQueue(key)
    },
    ({ key }) => {
      setUpQueue(key)
    },
    ({ key }) => {
      setDownAllQueue(key)
    }
  )

  return {
    downQueue,
    downAllQueue,
    upQueue,
  }
}
```

```tsx
const KeyDemo = () => {
  const { downQueue, upQueue, downAllQueue } = useKeyQueue()

  return (
    <div>
      <div>
        <p>downQueue: {downQueue.join(',')}</p>
        <p>upQueue: {upQueue.join(',')}</p>
        <p>downAllQueue: {downAllQueue.join(',')}</p>
      </div>
    </div>
  )
}
```

### 特定の DOM のキーイベント

特定の DOM へフォーカス時のみイベントを取る例です。ref を使い設定できるようにします。
`useKey` の `options: { target }` 指定がうまく動かなかったので、  
`rocks` の `useKeyRef` を使う例を書きました。

フォーカスしない要素 (input 以外の div など) では `tabIndex={-1}` の指定が必要です。

```tsx
import { useKeyRef } from 'rooks'

const allKeys = `qwertyuiop[]asdfghjkl;'zxcvbnm,./`.split('')
const KeyDemo = () => {
  const ref = useKeyRef(
    allKeys,
    (e) => {
      if (e.type === 'keydown') {
        // on down
      } else if (e.type === 'keyup') {
        // on up
      }
    },
    { eventTypes: ['keydown', 'keyup'] }
  )

  return (
    <div>
      <div ref={ref} tabIndex={-1}>
        ref area
      </div>
      <input ref={ref}>ref area</input>
    </div>
  )
}
```

ちなみに press と keydown の違いは、
press は文字キーで keydown は記号含めすべてのキーです。
