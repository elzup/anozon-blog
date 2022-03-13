---
title: タイプが苦手な単語をタイピング練習できるツールを作った
date: 2022-03-13 21:00:00
topics:
  - 個人開発
  - React
type: tech
published: true
emoji: ⌨️
---

最近椅子を変えてキーボードに添える手の位置が変わったのか、タイピングしづらいと感じることが増えました。  
昔は TyepWell という知る限りでは一番良いタイピング練習ソフトを使っていましたが Mac では使えません。うち間違えた単語を自動で苦手辞書に追加してくれて専用練習できるのが 1 つの特徴でした。

**そこで自分で登録した単語を練習できるアプリを作ってみました。**

[苦手タイパー nigate typing](http://localhost:3000/nigate-typing)

![nigate typing](https://elzup-image-storage.s3.amazonaws.com/blog/nigate-typing.png)

使っている技術は React + TypeScript + `@mui/material` + Next.js + Vercel です。

https://elzup-image-storage.s3.amazonaws.com/blog/nigate-typing.png

## 技術的な点

特に凝ったことはしてないので少しだけ。

コード: https://github.com/elzup/tools/blob/main/src/components/NigateTyping/index.tsx

### 半角文字のみ制限

単語登録のテキストエリアで半角文字と改行のみ使えるようにする。

```ts
export const asciify = (s: string) => s.replace(/[^\x20-\x7e\n]*/g, '')
```

_`input` の `pattern` 属性も使える可能性がある。_

### input とテキスト の文字サイズを揃える

`font-family` と `font-size` を揃えることでサイズが一致します。

```css
span,
input {
  font-family: 'Roboto Mono', monospace;
  font-size: 100%;
}
```

### チェック結果の色付け

レンダリング部分にロジックをおいているのが微妙。

```tsx
<div className="answer">
  {ans.split('').map((c, i) => (
    <span
      key={i}
      data-correct={c === text[i]}
      data-current={i === text.length}
      data-leached={i < text.length}
    >
      {c}
    </span>
  ))}
</div>
```

```scss
.answer {
  margin-left: 4px;
  span {
    color: gray;
    &[data-correct='true'] {
      color: black;
    }
    &[data-correct='false'][data-leached='true'] {
      color: red;
      border-bottom: solid 1px red;
    }
    &[data-current='true'] {
      border-bottom: solid 1px blue;
      background: hsla(180, 50%, 50%, 0.5);
    }
  }
}
```

## その他備考

- タイピングツールは間違えた文字から入力するタイプと入力した文 Backspace が必要なタイプがありますが**後者のが好き**。
- 苦手な単語をスムーズに打てるようにするよりも、**苦手な指の運びを攻略していきたい**という目的で作った。
- カーソル位置の表示は意外と css で簡単にできた。
