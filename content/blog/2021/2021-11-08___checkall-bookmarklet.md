---
title: CheckBox 一括でチェックするブックマークレット
date: 2021-11-08 15:00:00
topics:
  - Bookmarklet
  - JavaScript
type: tech
published: true
emoji: ☑️
---

実行するとすべてを 1 つめの checkbox と逆の状態にするブックマークレットです。

```js
// Checkbox すべてトグルする
javascript: (() => {
  const inputs = Array.from(document.querySelectorAll('input[type=checkbox]'))
  if (inputs.length === 0) return

  const checked = !inputs[0].checked

  for (const input of inputs) {
    input.checked = checked
  }
})()
```

`Array.from(document.querySelectorAll(''))` の部分は私がよく使う Tips です。
`document.querySelectorAll` の返り値が NodeList 型でループに使いづらいので、Array に変換しています。

## 補足: Bookmarklet の作法

```
javascript: (() => {
})()
```

ハイパーリンクから JavaScript を実行するときは `javascript:` の[ラベル付き文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/label)にします。
グローバル汚染をしないために即時関数で囲います。
