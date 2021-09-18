---
title: Next.js with TypeScript で最小限の _app.tsx, _document.tsx
date: 2020-02-08 15:00:00
tags:
  - Next.js
  - TypeScript
type: tech
published: true
---

この記事では Next.js with TypeScript で最小限の \_app.tsx, \_document.tsx について紹介します。

Gist: [Next\.js with typescript minimum pages/\_document\.tsx, pages/\_app\.tsx](https://gist.github.com/elzup/db2229b132ccda46d4ac3b25a52b60b7)

## pages/\_app.tsx

こちらは Function Component でかけるのでシンプルです。

```tsx
import { AppProps } from 'next/app'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {/* <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" /> */}
      {/* <link rel="manifest" href="/manifest.json" /> */}
    </Head>
    <Component {...pageProps} />
  </>
)

export default App
```

## pages/\_documents.tsx

こちらはまだ NextDocument クラスの継承が必要みたいです。

```tsx
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

type Props = {}

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html {/* lang="ja" */} >
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
```

追記: `2020-11-03`

Head 位置の変更が推奨されたので記事内のコードも更新しました。
[next\.js/no\-document\-viewport\-meta\.md at master · vercel/next\.js](https://github.com/vercel/next.js/blob/master/errors/no-document-viewport-meta.md)
