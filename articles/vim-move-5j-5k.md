---
title: Vim で 5j 5k を使い縦移動をレベルアップする
date: 2021-11-12 18:00:00
topics:
  - Vim
type: idea
published: true
emoji: 🚀
---

こんにちは。Vim 8 年目にして Visual Mode を Virtual Mode と混在していたことに気づいたあのぞんです。  
ここ 2 年くらい 使っていていい感じだった Vim 設定について提案します。

```
nnoremap <C-j> 5j
nnoremap <C-k> 5k
vnoremap <C-j> 5j
vnoremap <C-k> 5k
```

## Vim の弱点

Vim は横移動も、縦移動も強力な力を力強く持っています。画面上至るところに数ストロークでたどり着けます。

![vim horizonal](https://elzup-image-storage.s3.amazonaws.com/blog/vim-ho.png)
![vim vertical](https://elzup-image-storage.s3.amazonaws.com/blog/vim-va.png)

(`<C-d>` `<C-f>` `<C-u>` `<C-b>` 移動もあります。)

しかし弱点もあります。ここです。

![vim weak point](https://elzup-image-storage.s3.amazonaws.com/blog/vim-weakpoint.png)

## C-j, C-k にマップする

```
-7 `<C-k>` kk
-6 `<C-k>` k
-5 `<C-k>`
-4 `<C-k>` j
-3 kkk
-2 kk
-1 k
0 `<curren>`
+1 j
+2 jj
+3 jjj
+4 `<C-j>` k
+5 `<C-j>`
+6 `<C-j>` j
+7 `<C-j>` jj
```

前後 7 行に最大 3 ストロークでアクセスできるようになりました。

## その先へ

この前後 5 行目は飛んでからでないと着地点がわかりません。
`set rnu` も一時期使っていましたが視線移動が微妙でした。

そこで今回、常に着地点を表示しておくプラグインを作成しました。  
悲しいお知らせですが、 Vim Script Plugin ではないです。
筆者は長らく VSCode(当然 VSCodeVim 入り)を使っているので作成したのは VSCode Extension になります。

拡張機能については別記事 [](https://zenn.dev/anozon/articles/checkall-bookmarklet)にまとめます。
