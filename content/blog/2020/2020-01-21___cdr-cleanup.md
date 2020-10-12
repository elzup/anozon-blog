---
title: 【zsh】なくなったディレクトリを anyframe-widget-cdr から消す
date: 2020-01-21 17:00:00
tags:
  - zsh
  - ShellScript
  - DevOps
---

この記事では cdr から不要なディレクトリを削除する方法を紹介します。

cdr は zsh に入っているコマンドで、過去に開いたディレクトリへ移動できるコマンドです。

普段は `cdr` をラップした [anyframe](https://github.com/mollifier/anyframe) を使っています。
過去のディレクトリに素早く移動できてはかどっています。

しかし cdr は rm や mv (rename) したディレクトリをキャッシュしていなくて残ってしまってるようです。

そこでキャッシュから存在しないディレクトリを一掃してみます。

## 手順 1. キャッシュファイルの場所を確認する

`$ zstyle` を実行して `recent-dirs-file` があればそこです。

デフォルトは `~/.chpwd-recent-dirs` です。

![chpwd-recent-dirs](https://elzup-image-storage.s3.amazonaws.com/blog/chpwd-recent-dirs.png)

なにやら見慣れぬ形式で入っていました。

## 手順 2. 削除するシェル

1 行ずつ「ディレクトリが存在するか？」を見ます。
そして、無ければ消すシンプルなシェルを書きます。

Gist: [Clean no exists directories](https://gist.github.com/elzup/4d36336470d18ae9e6216d5276f19cbd)

```sh
#!/bin/sh

cat ~/.chpwd-recent-dirs \
  | sed -e 's/^..\(.*\)./\1/g' \
  | while read line
do
  if [ -d "$line" ]; then
    echo "\$'$line'"
  fi
done
```

```sh
$ chmod +x cdr-recent-dirs-clearn.sh
$ bash cdr-recent-dirs-clearn.sh > .chpwd-recent-dirs-clearn
$ vimdiff ~/.chpwd-recent-dirs .chpwd-recent-dirs-clearn
```

vimdiff で確認すると存在しないディレクトリがちゃんとなくなっていそうです。

![vimdiff-cdr-clean.png](https://elzup-image-storage.s3.amazonaws.com/blog/vimdiff-cdr-clean.png)

```sh
$ mv .chpwd-recent-dirs-clearn ~/.chpwd-recent-dirs
```

よければ replace します。そして cdr に引っかかっていた 存在しないパスも消えました！
