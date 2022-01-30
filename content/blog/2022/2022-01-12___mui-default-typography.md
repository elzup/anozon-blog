---
title: MUI の Typography が大きすぎるときの設定
date: 2022-01-12 15:00:00
topics:
  - MUI
type: tech
published: false
emoji: ✏️
---

MUI の Typography のフォントサイズが毎回大きめで気になるのでいい感じの数値のメモです。
MUI 公式ドキュメントサイトの theme を元に作成しました。
[material\-ui/theme\.ts at master · mui\-org/material\-ui](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/premium-themes/onepirate/modules/theme.ts)

##

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
