---
title: gitリポジトリごとにデフォルトのコミットメッセージを設定する
date: 2020-03-07 12:00:00
topics:
  - git
  - BlogOps
type: tech
published: true
---

git は `commit.template` でデフォルトのコミットメッセージの設定できます。

例えばこのブログのリポジトリは、記事を書いたとき 📝 `:pencil:` をコミットメッセージの先頭に入れています。

![](https://elzup-image-storage.s3.amazonaws.com/blog/Commits_%C2%B7_elzup_anozonbiyori.png)

毎回入力するのは面倒なので `commit.template` を使って省略してみます。

## 手順 1. テンプレートファイルを用意する

今回は「 `:pencil:`」 とだけ入力したファイルを用意します。

```.commit_template
:pencil:
```

コメントを使って絵文字規約を設定している人もいます。

```
# ==================== Emojis ====================
# 🎉  :tada: 初めてのコミット（Initial Commit）
# 🔖  :bookmark: バージョンタグ（Version Tag）
# ✨  :sparkles: 新機能（New Feature）
...
```

## 手順 2. git 設定する

local(プロジェクトごと) の git config は `.git/config` ファイルに保存されます。

コマンドを使う場合、

```
git config --local commit.template .commit_template
```

直接変更する場合、

```:title=.git/config
[commit]
template = .commit_template
```
