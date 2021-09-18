---
title: 絵文字を含めて文字数カウントするWebアプリ作った
date: 2020-10-02 19:00:00
tags:
  - JavaScript
  - TypeScript
type: tech
published: true
---

```toc

```

## アプリ

[文字頻度カウント\(絵文字対応\)](https://tools.anozon.me/char-counter)
![emoji-count](https://elzup-image-storage.s3.amazonaws.com/blog/emoji-count.png)

## 絵文字対応

`"text".split('')` では絵文字が 1 文字として分割できません。

```js
> "😔"
'😔'
> "😔".split('')
[ '�', '�' ]
```

`punycode.js` を使います。

```ts
const punySplit = (s: string) =>
  punycode.ucs2.decode(s).map((v) => punycode.ucs2.encode([v]))

punySplit('😔')
// [ '😔' ]
punySplit('😔😎')
// [ '😔', '😎' ]
```

[bestiejs/punycode\.js: A robust Punycode converter that fully complies to RFC 3492 and RFC 5891\.](https://github.com/bestiejs/punycode.js/)

## カウントする関数

```ts
import punycode from 'punycode'

type Count = { char: string; count: number }

function analyzeCount(text: string): Count[] {
  const map: Record<string, number> = {}
  const chars = punycode.ucs2.decode(text).map((v) => punycode.ucs2.encode([v]))

  chars.forEach((c) => {
    map[c] = (map[c] || 0) + 1
  })
  return Object.entries(map)
    .sort(([, v1], [, v2]) => v2 - v1)
    .map(([char, count]) => ({ char, count }))
}
```

## エスケープ文字の可視化

そのまま React で render すると改行文字(`\n`)が見えないのでバックスラッシュをエスケープしました。

```ts
function visibleEscapeChars(text: string) {
  return text
    .replace(/\t/g, '\\t')
    .replace(/\v/g, '\\v')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\f/g, '\\f')
    .replace(/\0/g, '\\0')
}
```

なにかこういうライブラリあれば知りたいです。
