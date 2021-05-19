---
title: styled-components の keyframes で ts-styled-plugin のエラーが出る
date: 2021-05-19 18:00:00
tags:
  - VSCode
  - TypeScript
  - styled-components
status: no draft
---

css animation の `100%` や `0%` などのキーワードに対して `ts-styled-plugin` のエラーが出たので対処しました。

`styled-components` で animation を扱う場合以下のように書きます。 (`styled-components@5.2.1`)

```js
import styled, { keyframes } from 'styled-components'

const invert = keyframes`
0% {
	background: white;
	color: black;
}
100% {
	background: black;
	color: white;
}
`
```

この `0%` や `100%` に **VS Code** 上で赤線エラーが出てしまいました。
`from` `to` などに置き換えるとエラーは消えます。

## 対処法

VSCode の プラグイン [vscode-styled-components](https://github.com/styled-components/vscode-styled-components) で有効になる `ts-styled-plugin` 原因でした。

`keyframes` を使うと css と違い `@keyframe` の内側のスコープを記述するのでエラーが出てしまいます。

`tsconfig.json` から `styled` のみチェックするように変更することで `keyframes` は無視してくれます。

```json:title=tsconfig.json
{
  "plugins": [
    {
      "name": "typescript-styled-plugin",
      "tags": ["styled"]
    }
  ]
}
```
