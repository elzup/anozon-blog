---
title: Markdown でコードブロックの中にバックスラッシュ3つを書く
date: 2020-07-06 12:00:00
tags:
  - Markdown
type: tech
published: true
---

Markdown の複数行コードブロックは普通以下のように書きます。

````md
sample code

```
console.log('hello')
```
````

その中に` ``` `を書くときは ` ```` ` を使います。

`````md
Markdown の複数行コードブロックは普通以下のように書きます。

````
sample code

```
console.log('hello')
```
````
`````

※この記事はマークダウンで書いているので更に ` ````` ` で囲っています。（[コード elzup/anozonbiyori@a7d62e3](https://github.com/elzup/anozonbiyori/commit/a7d62e39bebaf726cb2a8b248422debd70aafebc)）

#### 補足

バックスラッシュでエスケープしようとするとそのままでてしまいます。

```md
sample code

\`\`\`
console.log('hello')
\`\`\`
```

このリポジトリの readme を書いていたときに知ったネタでした。
[elzup/codeblock\-cat](https://github.com/elzup/codeblock-cat)
