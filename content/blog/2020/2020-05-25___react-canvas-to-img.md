---
title: React で canvas から画像生成する最小コード
date: 2020-05-25 10:00:00
topics:
  - React
  - TypeScript
  - canvas
type: tech
published: true
---

この記事では React (と TypeScript で) canvas から画像生成する方法を紹介します。
文字描画や色変更をサンプルに説明していきます。

```toc

```

## React で Canvas を使うベースのコード

```tsx
import React, { useEffect, useState } from 'react'
const width = 255
const height = 255

function App() {
  const [png, setPng] = useState<string | null>(null)

  useEffect(() => {
    const canvasElem = document.createElement('canvas')
    canvasElem.width = width
    canvasElem.height = height
    const ctx = canvasElem.getContext('2d')

    // draw

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#888888'
    ctx.fillRect(0, 0, width, height)

    setPng(canvasElem.toDataURL())
  }, [])

  return (
    <div>
      <h3>画像生成</h3>
      <h4>生成</h4>
      {png && (
        <div className="comp" style={{ display: 'flex' }}>
          <img alt="icon" src={png} />
          <img alt="round icon" src={png} style={{ borderRadius: '100%' }} />
        </div>
      )}
    </div>
  )
}
export default App
```

useEffect の中で以下のことをしています。

- HTMLCanvasElement と context の用意する
- context で描画する
- `HTMLCanvasElement#toDataURL()` で dataURL を作る

レンダリングを img タグですることで style しやすくなります。
スマホブラウザでは canvas タグのままでは画像ダウンロード出来ないことがあるのでエクスポート対応しやすくなります。

## 文字色や背景色を変えるサンプル

`oembed: https://codesandbox.io/embed/canvas-img-f7bw7?fontsize=14&hidenavigation=1&theme=dark`

描画に使う変数を useState で作り、 **useEffect の deps に追加**します。

```ts
  const [bgColor, setBgColor] = useState<string>('#888888')
  const [foColor, setFoColor] = useState<string>('#000000')`
```

```ts
useEffect(() => {
  const canvasElem = document.createElement('canvas')
  canvasElem.width = width
  canvasElem.height = height

  const ctx = canvasElem && canvasElem.getContext('2d')
  if (!canvasElem || !ctx) return

  // draw

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, width, height)

  ctx.font = '30px Hiragino Maru Gothic Pro'
  ctx.fillStyle = foColor
  ctx.fillText('Hello ハロー', width / 6, height / 2)

  setPng(canvasElem.toDataURL())
}, [bgColor, foColor])
```

フォーム側の setState する部分は以下です。

```tsx
<>
  <h4>背景色</h4>
  {['#f00', '#0f0', '#00f'].map((color) => (
    <button
      key={color}
      style={{ background: color }}
      onClick={() => setBgColor(color)}
    >
      {color}
    </button>
  ))}
  <h4>文字色</h4>
  {['#f00', '#0f0', '#00f'].map((color) => (
    <button style={{ color }} onClick={() => setFoColor(color)}>
      {color}
    </button>
  ))}
</>
```
