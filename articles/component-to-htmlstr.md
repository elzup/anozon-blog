---
title: React Component から HTML コードを取得する
date: 2022-01-12 15:00:00
topics:
  - React
type: tech
published: true
emoji: 🖨
---

## コード

React コンポーネントからレンダリングされる HTML コードを文字列として返す関数です。

```ts
import ReactDOM from 'react-dom'

export function getComponentHtmlCode(component: React.ReactElement) {
  const div = document.createElement('div')

  return new Promise<string>((resolve) => {
    ReactDOM.render(component, div, () => {
      resolve(div.innerHTML)
    })
  })
}
```

[CodeSandbox](https://codesandbox.io/s/get-html-code-br1fh?file=/src/App.js)
