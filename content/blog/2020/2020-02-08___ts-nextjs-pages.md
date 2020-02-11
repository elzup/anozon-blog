---
title: Next.js with TypeScript で最小限の _app.tsx, _document.tsx
date: 2020-02-08 15:00:00
tags:
  - Next.js
  - TypeScript
---

この記事では Next.js with TypeScript で最小限の \_app.tsx, \_document.tsx について紹介します。

Gist: [Next\.js with typescript minimum pages/\_document\.tsx, pages/\_app\.tsx](https://gist.github.com/elzup/db2229b132ccda46d4ac3b25a52b60b7)

## pages/\_app.tsx

こちらは Function Component でかけるのでシンプルです。

```tsx
import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

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
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {/* <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" /> */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
        </Head>
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
