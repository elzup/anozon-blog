---
title: GitHub Copilot はいい相棒になりそう
date: 2021-08-04 00:00:00
tags:
  - GitHub Copilot
  - review
---

1 ヶ月目なので所感を書きます。  
主に TypeScript を書いています。 初日から結構好感です。

```toc

```

## 良い点

### コメント書かなくてもよく効く

関数名だけとか, 関数の途中からでもサジェストしてくれる。

### エディタの Undo 壊す問題がなさそう (vim)

心配があった部分だけど undo redo は問題なく動いている。

### 候補から選べる

サジェスト候補は 1 つでなく複数から選べる。

### サジェスト表示 UI の偉大さ

カーソル下に候補リストが出る UI よりも 単純にサジェスト表示されている状態から確定する UI は体験がよい。
(透過文字で入力後の位置に文字が表示される `zsh-autosuggestion` みたいなやつ。)

### 変数名からの type 予測が効く

string, integer, boolean あたりの予測がだいぶ正確で助かる。

### ググらなくなった

**エディタでググれるようになった。**

「array shuffle」 ってどうやるんだっけとか、「array flatten 関数作りたいな」とか、
Chrome を開いて Google に問い合わせていた。が、

今は 3 行以下の関数は手元の 4 次元ポケットから取り出せるようになった。

### ツールとして使う

作ったばかりのエンコード文字列もなんのエンコードフォーマットなのかとか当ててきた。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">GitHub copilot <a href="https://t.co/qXVXiw5ZPA">pic.twitter.com/qXVXiw5ZPA</a></p>&mdash; あのぞん🌏.tsx (@anozon) <a href="https://twitter.com/anozon/status/1415270080615632896?ref_src=twsrc%5Etfw">July 14, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Randam 要素

コードとか文章とか URL とかを気まぐれにガチャできる。息抜きに雑学を得れたりして良さそう。

## ビビったところ

### 既存コードを使ってくれる

`round` とか定義したあとの関数で `round4` 関数を活用したコードを生成してきたのは驚いた。
![copilot_reuse](https://elzup-image-storage.s3.amazonaws.com/blog/copilot_reuse.png)

ちなみに数字 4 の部分は 10000 とか 1324 とかテキトーな数値でもちゃんと動く。

React でも既存コンポーネント使ってサジェストしてくる。

### 文章とかも結構予測してくれる(日本語も)

この記事もマークダウンで書いているがサジェストされている。  
ただ構文は正確だが流石に期待通りに動かない。
![copilot_japanese](https://elzup-image-storage.s3.amazonaws.com/blog/copilot_japanese.png)

英単語の補完が効いたり良さそう。実際スペルが曖昧な場合に頼れる。

![](https://elzup-image-storage.s3.amazonaws.com/blog/copilot_be_careful.png)

### デバッグ出力にめっぽう強い

log → Tab(snippet 展開) → 出力変数補完みたいなことやっていたけど、

なぜか俺がデバッグ出力したいことを察して `console.log({ val })` と表示してくれる。  
そして Tab キーを押すだけですむ。

### たまに書こうとしてたコードをエスパーしてくる

たまにだけど。どうやってわかったの！？って suggestion 出してくるときは流石に驚かされる。

React の items ループ部分書こうかなってときに、まだ何も書いてないのに `{items.map(() => ())}` を出してくれたり、

![](https://elzup-image-storage.s3.amazonaws.com/blog/copilot_filter.png)

気が利くアシスタントだ。脳のリソース消費が少し減らせそう。

(直前に書いたコードもサジェスト要素に加わっている？)

## 怪しいところ

**まだわからないけど**

### 1 行ずつしか出してくれない時がある。

複数行コードサジェストしてくれたり、1 行ずつしか表示せずタブ何度も押す必要があったりちょっと謎。

### 正しいコードなのかどうか問題

Stack Overflow とかブログのコード見つけたときと同じ、
Test の書いてない、評価が不明なコードを引っ張ってくるときと同じになる。

QuickSort とか calcPi とかサジェストしてみても、動作が怪しいコードや意図と違うコードとってきてしまった。

### 気が散る可能性もある問題

入力する気のないときもカーソルがある場所に補完持って来てしまう。
コード補完と競合する。
Discussions でも議論されている。

## Discussion github/copilot-preview

[Discussions · github/copilot\-preview](https://github.com/github/copilot-preview/discussions)
ではネタや議論が毎日交換されている。

- ライセンスや secrets の漏洩問題など
- 未サポート環境・言語のリクエスト
- `ME:` `AI:` で Chat ができる
- AI bot でもよくある QA ネタをコードで

など。

サジェストはコードブロックで共有できないので、皆スクショなのがちょっと面白い。

### リストアップ

なにかを列挙してもらう使い方はやってみてもサジェストが弱かった。  
正確だとしても使いたくなる場面は少なさそう。

# まとめ

意図的に使う場面 → ググりたくなるようなタイミング。  
無意識に使う場面 → エスパーコード生成。

進化系スニペットの要素が強そう。

Copilot はその瞬間だけ見れるものなので、ゲームでスクショや録画するときみたいに、記念写真スクショを取るという新しい習慣が生まれた。

今後の発展にも大いに期待できる。
