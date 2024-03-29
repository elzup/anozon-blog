---
title: jq コマンドで json の特定のフィールドを削る・抽出する
date: 2021-01-15 19:00:00
topics:
  - json
  - jq
  - ShellScript
type: tech
published: true
---

`jq` コマンドを使って json 内部特定のフィールドを操作します。

`jq 'del(.フィールド1,.フィールド2)'` で行えます。

### 抽出(pick)・削除(omit)

```sh
$ # aを抽出
$ echo '{ "a": 10, "b": 20, "c": 30 }' |jq '{a}'
{
  "a": 10
}
$ # a,bを抽出
$ echo '{ "a": 10, "b": 20, "c": 30 }' |jq '{a,b}'
{
  "a": 10,
  "b": 20
}

$ # cを削除
$ echo '{ "a": 10, "b": 20, "c": 30 }' |jq 'del(.c)'
{
  "a": 10,
  "b": 20
}

$ # b,cを削除
$ echo '{ "a": 10, "b": 20, "c": 30 }' |jq 'del(.c,.b)'
{
  "a": 10
}
```

### ファイル入出力

```sh
$ cat abc.json
{ "a": 10, "b": 20, "c": 30 }

$ cat abc.json |jq 'del(.c)'
{
  "a": 10,
  "b": 20
}

$ cat abc.json |jq 'del(.c)' > ab.json # ファイル出力
$ cat ab.json
{
  "a": 10,
  "b": 20
}
```

### 配列の各要素を操作

```sh
$ echo '[{ "a": 1, "b": 2, "c": 3 },{ "a": 11, "b": 12, "c": 13}]' |jq '.[]|{a}'
{
  "a": 1
}
{
  "a": 11
}

 echo '[{ "a": 1, "b": 2, "c": 3 },{ "a": 11, "b": 12, "c": 13}]' |jq '.[]|del(.c)'
{
  "a": 1,
  "b": 2
}
{
  "a": 11,
  "b": 12
}
```
