---
title: fitty を React で使う useFitty hook
date: 2021-06-14 18:00:00
tags:
  - fitty
  - TypeScript
  - JavaScript
  - React hooks
---

`fitty` はコンテナに合わせてテキストのフォントサイズをフィットしてくれるライブラリです。  
[rikschennink/fitty: ✨ Makes text fit perfectly](https://github.com/rikschennink/fitty)

それを React で使うための hooks を書いた。

Gist [fitty for react](https://gist.github.com/elzup/f7805a581fea36355d1e1c8ee953b50c)

### コード

```tsx
import { useEffect, useRef } from 'react'
import fitty from 'fitty'

export function useFitty() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    fitty(ref.current)
    //     ref.current.addEventListener('fit', (e) => {
    //       console.log(e)
    //     })
  }, [ref.current])
  return [ref] as const
}
```

### 呼び出し方

```tsx
import React from 'react'

type Props = {}
function Component(props: Props) {
  const [divRef] = useFitty()
  return (
    <div ref={divRef} style={{ width: '100px' }}>
      Hello
    </div>
  )
}
export default Component
```

ただコンテナ側は縮小するときにリサイズしてくれないようです。
