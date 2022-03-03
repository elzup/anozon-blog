---
title: MUI の Typography が大きすぎるときの設定
date: 2022-01-12 15:00:00
topics:
  - MUI
type: tech
published: true
emoji: ✏️
---

MUI の Typography のフォントサイズが毎回大きめで気になるのでいい感じの数値のメモです。  
スマートなやり方があったら知りたいです。

## 例 1

```ts
export const theme = createTheme({
  typography: {
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,

    h1: { fontSize: 60 },
    h2: { fontSize: 48 },
    h3: { fontSize: 42 },
    h4: { fontSize: 36 },
    h5: { fontSize: 20 },
    h6: { fontSize: 18 },
    subtitle1: { fontSize: 18 },
    body1: { fontSize: 16 },
    button: { textTransform: 'none' },
  },
})
```

## 例 2

```js
const defaultTheme = createTheme({})
const { pxToRem } = defaultTheme.typography

export const theme = createTheme({
  h1: { fontSize: pxToRem(60) },
  h2: { fontSize: pxToRem(48) },
  h3: { fontSize: pxToRem(42) },
  h4: { fontSize: pxToRem(36) },
  h5: { fontSize: pxToRem(20) },
  h6: { fontSize: pxToRem(18) },
  subtitle1: { fontSize: pxToRem(18) },
  body1: { fontSize: pxToRem(16) },
})
```
