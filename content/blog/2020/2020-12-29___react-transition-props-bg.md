---
title: React で URL props が変わったら fade アニメーションで 背景を変える
date: 2020-12-29 16:00:00
tags:
  - React
  - TypeScript
  - DiceBear Avatars
type: tech
published: true
---

props で指定された URL が変わったら フェードアウト し、  
新しい URL 画像で フェードイン しながら表示するコンポーネントを作りました。
`react-transition-group` を使います。

```toc

```

## デモ

<iframe src="https://codesandbox.io/embed/react-animation-background-image-jznjc?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:210px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-animation-background-image"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## コード

```tsx
import React, { useState } from 'react'
import { Transition } from 'react-transition-group'

const duration = 1000
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

type Props = { url: string }
function FadeChanger({ url }: Props) {
  const [currentUrl, setCurrentUrl] = useState<string>(url)

  return (
    <Transition
      in={url === currentUrl}
      onExited={() => setCurrentUrl(url)}
      timeout={duration}
    >
      {(state) => (
        <div
          style={{
            width: '100px',
            height: '100px',
            background: `url(${currentUrl})`,
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        ></div>
      )}
    </Transition>
  )
}
```

`<Transition in={url === currentUrl}` 部分の説明。

変更された際 `in={false}` になり Exit アニメーション(fade out)をする。

Exit アニメーション終了後 `onExited={() => setCurrentUrl(url)` により `in={true}` になり Enter アニメーション(fade in)をする。

(hooks 使って書きたい...。)

## 呼び出す側のコード

```tsx
const Demo = () => {
  const [num, setNum] = useState<number>(0)
  const incNum = () => setNum((v) => v + 1)

  return (
    <div>
      <FadeChanger
        url={`https://avatars.dicebear.com/4.5/api/male/${num}.svg`}
      />
      <button onClick={incNum}>change</button>
    </div>
  )
}
```

props を変えるだけなので直感的に使えます。

### DiceBear Avatars について(余談)

[DiceBear Avatars](https://avatars.dicebear.com/) は
seed 文字列からランダムな画像を生成するモジュールです。  
SVG を生成するモジュールもありますが、ダイレクトリンクの HTTP API が推奨されています。

人間以外にもロボットやシンボルや `Identicon` (GitHub のデフォルトアイコン) のようにいろんな種類が作られています。

[Overview \| DiceBear Avatars](https://avatars.dicebear.com/styles)

`https://avatars.dicebear.com/4.5/api/male/[文字列].svg` で使用できます。
