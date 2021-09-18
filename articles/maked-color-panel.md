---
title: 単色パネル表示するだけのツール作った
date: 2021-02-19 10:00:00
topics:
  - 作った
  - PWA
  - Mitelop
type: tech
published: true
---

たまにモニターの焼け付きが気になって、グレイ色の背景のウィンドウを用意して確認することがあります。  
そんなときに単色のページ探すがだるいので Web ツール化しました。
真っ黒や真っ白なウィンドウも作ることができます。

## ツール

Mitelop という自分が作ってたツール群のサイトに置きました。  
[Widget makeing tool \| Mitelop](https://mitelop.anozon.me/)

![Mitelop カラーパネル作成](https://elzup-image-storage.s3.amazonaws.com/blog/mitelop-color.png)
![Mitelop ポップアップ画像](https://elzup-image-storage.s3.amazonaws.com/blog/mitelop-color-window.png)

PWA で Mitelop をインストールして作成すると上のようなウィンドウを作れます。

## 技術的な話

単色背景については誰でもできるそのまんまの実装です。  
作成画面のカラーピッカーは [React Color](https://casesandberg.github.io/react-color/) というコンポーネントを使っています。

```tsx
import Head from 'next/head'

const ColorPage: NextPage = () => {
  // 省略
  return (
    <Layout title="Color" reset>
      <Head>
        <meta name="theme-color" content={color} />
        <title>Color-{color}</title>
      </Head>
    </Layout>
  )
}

export default ClockPage
```

`<meta name="theme-color" />` を指定することで PWA ウィンドウヘッダーの色を変えられます。
Next.js で実装しているアプリなので、`next/head` を使うことで動的に変更しています。

GitHub [elzup/mitelop: Widget makeing tool](https://github.com/elzup/mitelop)
