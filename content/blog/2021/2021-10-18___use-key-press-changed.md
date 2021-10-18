---
title: KeyEvent で長押しでも1回だけ発火する React hooks
date: 2021-10-18 11:00:00
topics:
  - React
  - TypeScript
  - ReactHooks
type: tech
published: true
---

ピアノツールを作ってたら**押すたびに 1 度だけ発火する**イベントハンドラが欲しくなったので作りました。
その際にキーイベントに関するいろんなパターンのカスタムフックを作ってみました。

長押しの際にも 1 回だけ発火します。

<!-- `onKeyDown` では長押しで連打のように発火してしまいます。
 -->

```tsx
import { useState } from 'react'

export const useKeyChangePress = ({
  onChangedPress,
  onChangedRelease,
}: {
  onChangedPress?: (key: string) => void
  onChangedRelease?: (key: string) => void
}) => {
  const [pressed, setPressed] = useState<Record<string, boolean>>({})

  const onPress = (key: string) => {
    if (pressed[key]) return

    onChangedPress?.(key)
    setPressed((v) => ({ ...v, [key]: true }))
  }
  const onRelease = (key: string) => {
    if (!pressed[key]) return

    onChangedRelease?.(key)
    setPressed((v) => ({ ...v, [key]: false }))
  }

  return { onPress, onRelease }
}
```

## 特定のフォーカスされているコンポーネントでの使い方

```tsx
function App() {
  const { onPress, onRelease } = useKeyChangePress()

  return (
    <div
      onKeyDown={(e) => onPress(e.key)}
      onKeyUp={(e) => onRelease(e.key)}
      tabIndex={-1}
    ></div>
  )
}
```

### グローバルな

https://usehooks.com/useKeyPress/
