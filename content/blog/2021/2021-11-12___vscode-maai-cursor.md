---
title: Vim の縦移動をレベルアップする VSCode 拡張を作ってみた
date: 2021-11-12 19:00:00
topics:
  - VS Code
  - VS Code Extension
  - Vim
type: tech
published: true
emoji: 🧩
---

初めて VSCode 拡張を作ってみました。  
カーソル行の上下 5 行目をハイライトします。  
5 行移動ショートカットを使うのでそのための拡張です。

[./vim-move-5j-5k](Vim の弱点と 5 行移動について)。

## 成果物

[elzup/vscode\-maai\-cursor](https://github.com/elzup/vscode-maai-cursor)

![maai-cursor](https://elzup-image-storage.s3.amazonaws.com/blog/maai-cursor.gif)

### オプション

- 行数の変更
- 5 行区切り全部ハイライト

## 簡単な開発の流れ

0. マーケットプレイスアカウント作成
1. npx yo code (with-typescript)
2. コーディング
3. npx vsce package
4. npx vsce publish

## 初めて使ってみた学び

### package.json で Config を定義する

マーケットプレイス のメタ情報だけでなく、定義する Config Param や Command 、 activationEvents なども `package.json` で定義します。

### 座標系

x, y は それぞれ line, charactor を使います。

### yo code で全部定義されていて快適

yoman でジェネレートして開発します。
`scripts` や `.vscode/` から開発に必要なものが定義されてます。

## 参考にしたリポジトリ

Decorator の拡張を参考にしました。

[oderwat/vscode\-indent\-rainbow](https://github.com/oderwat/vscode-indent-rainbow)
[CoenraadS/BracketPair](https://github.com/CoenraadS/BracketPair)
[vscode\-extension\-samples/decorator\-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/decorator-sample)
