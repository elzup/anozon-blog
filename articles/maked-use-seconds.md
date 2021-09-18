---
title: useSecounds という時計用 hooks を作った
date: 2020-03-08 18:00:00
topics:
  - ReactHooks
  - 作った
type: tech
published: true
---

`useSecounds` という react-hooks ライブラリ を作りました。

[elzup/use\-seconds: Seconds interval time for ReactHooks](https://github.com/elzup/use-seconds)

[DEMO \- CodeSandbox](https://codesandbox.io/s/use-seconds-example-w875w)

## useSecounds の特徴

- 長時間使用しても .000 (コンマ 0 ミリ秒) のタイミングで更新する
- **getSeconds() が 1 つ前の Date を渡さない**

処理が早まって x.995 のタイミングで更新が発生しても (x + 1).000 のタイムスタンプを返します。

## setInterval はずれていく

「setInterval は 登録時の timestamp から 補正しながら実行されるのか？ 🤔」と思い調べてみたのですがずれていく(drift する)みたいです。

参考: [javascript \- Will setInterval drift? \- Stack Overflow](https://stackoverflow.com/questions/985670/will-setinterval-drift)

検証してみても徐々にずれていきました。

![](https://elzup-image-storage.s3.amazonaws.com/blog/set-interval-1h.png)

## hooks ライブラリの実装で意識したこと

### 返り値が配列にした

最初オブジェクトで実装していたのですが、[返り値についての記事](https://dev.to/namick/writing-your-own-react-hooks-the-return-value-3lp6)を読んで配列にしました。

[Writing Your Own ReactHooks, the Return Value \- DEV Community 👩‍💻👨‍💻](https://dev.to/namick/writing-your-own-react-hooks-the-return-value-3lp6)

命名できる利点が挙げられています。

### useState を分けた

カスタムフックの中で 管理していた state が 3 つあったのですが useState 3 つに分けました。

公式ドキュメントに保守性が上がる理由を挙げられています。

[フックに関するよくある質問 – React](https://ja.reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables)

### create-react-hook

https://github.com/hermanya/create-react-hook が使いやすかった。

- TypeScript サポート
- example ディレクトリがある
- test のサンプルがある

などが良かったです。
