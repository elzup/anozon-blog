---
title: 間違えて一緒にコミットしちゃった新規ファイルだけコミットを取り消す
date: 2020-12-28 10:00:00
tags:
  - git
  - Tips
type: tech
published: true
---

```sh
git rm --cached {file}
git commit --amend
```

### 例

```sh
$ git log --name-status
A   content/blog/2020/2020-12-17___sort-without-head.md
A   content/blog/2020/2020-12-28___undo-commited-new-file.md

```

`2020-12-28___undo-commited-new-file.md` を間違えてコミットに含めてしまいました。

```sh
$ git rm --cached content/blog/2020/2020-12-28___undo-commited-new-file.md
$ git commit --amend
$ git log --name-status # 確認
A   content/blog/2020/2020-12-17___sort-without-head.md
$ git status
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	content/blog/2020/2020-12-28___undo-commited-new-file.md
```
