---
title: .git/config からリモートリポジトリを変える
date: 2020-05-03 17:00:00
tags:
  - git
type: tech
published: true
---

リモートリポジトリ先を変更(やリネーム)した際に .git/config から変える癖がついてしまったので整理もかねて。

## git コマンドで URL を変える

```
git remote set-url origin git@github.com:elzup/new-name.git
```

### メリット

- 無効な設定をしてしまうリスクが少ない
- 1 コマンドで済む

## .git/config から

```sh
code .git/config
```

```diff
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
-	url = git@github.com:elzup/old-name.git
+	url = git@github.com:elzup/new-name.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
```

### メリット

- remote 名前を確認しながらできる
- リポジトリ名だけ変更すれば良い
- 編集操作が効く(undo など)
