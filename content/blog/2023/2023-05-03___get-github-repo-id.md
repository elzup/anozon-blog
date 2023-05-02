---
title: GitHub のリポジトリ名やownerを取得するシェル
date: 2023-05-03 00:00:00
topics:
  - GitHub
  - git
  - bash
type: tech
published: true
emoji: 🐚
---

git のディレクトリで remote に設定されている GitHub リポジトリの owner や repo 名を取得するシェルです。

## remote URL の取得

```sh
url=$(git config --get remote.origin.url)
echo $url
# git@github.com:elzup/kit-sh.git
```

## url から owner と repo をパースする

```sh
id=$(echo $url |sed -e 's/.*github.com.\(.*\).git/\1/')
# elzup/kit-sh

echo ${id#*/}
# kit-sh
echo ${id%/*}
# elzup
```

bash の変数展開でパターン照合演算子を使っています。  
`echo ${id#*/}` は `id` の先頭から `/` までを削除します。  
`echo ${id%/*}` は `id` の末尾から `/` までを削除します。
