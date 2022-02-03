---
title: 何もしないタグ付きテンプレート
date: 2022-01-12 16:00:00
topics:
  - JavaScript
  - TypeScript
type: tech
published: true
emoji: 🕳
---

## noop

`noop` は何もしない関数です。

```js
const noop = () => {}

// TypeScript
const noop = (..._args: unknown[]) => {}
```

## identity function (恒等関数)

渡された引数をそのまま返す関数です。

```js
const identity = (v) => v
const identity = (...v) => v
// ts
const identity = (v: unknown) => v
```

## 何もしないタグ付きテンプレート

テンプレートリテラルは `${}` で変数の埋め込みができます。

```js
const name = 'world'
console.log(`hello ${name}`)
// hello world
```

**タグ関数** は テンプレートリテラルを関数で解析できます。

```js
const myTag = (a, b, c) => [a, b, c]

myTag`__${1}___${'str'}__`
// [ [ '__', '___', '__' ], 1, 'str' ]
```

[テンプレートリテラル \(テンプレート文字列\) \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)

[styled\-components](https://styled-components.com/) などで使われています。

本題でただのテンプレートリテラルとして動くタグ関数(タグつきテンプレート関数)を作ってみる。

```ts
const identify = (strs: TemplateStringsArray, ...exps: any[]) =>
  strs.map((a, i) => a + String(exps[i] || '')).join('')
```

```ts
const name = 'world'
const suffix = '!!'

identify`hello ${name} ${suffix}.`
// 'hello world !!.'
;`hello ${name} ${suffix}.`
// 'hello world !!.'
```
