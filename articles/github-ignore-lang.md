---
title: GitHub 言語統計から特定のファイルを無視する
date: 2022-03-03 08:00:00
topics:
  - git
  - GitHub
type: tech
published: true
emoji: 🌈
---

GitHub リポジトリページには使われてる言語割合が表示されます。  
この統計は github-linguist によって生成されています。

[github/linguist](https://github.com/github/linguist)

## 無視するファイルを指定する

`.gitattribute` に以下のように追記すると無視できます。

```title=.gitattributes
[無視したいファイル] linguist-vendored
```

**例**

```title=.gitattributes
jest.config.js linguist-vendored

# ディレクトリ内を除外
src/ext/**/* linguist-vendored

# 除外から外す
src/ext/*.cs linguist-vendored=false
```

`linguist-vendored=false` だと統計に**含める**指定なので注意してください。
また、GitHub 上での表示は時間をおかないと反映されないことがあります。

サンプルリポジトリ [elzup\-sandbox/linguist\-vendored\-sample](https://github.com/elzup-sandbox/linguist-vendored-sample)

### github-linguist

`github-linguist` CLI を入れるとローカルでもチェックできます。
**コミットしていないと動かない**ので注意が必要です。

```
$ gem install github-linguist
$ github-linguist
35.29%  6          TypeScript
35.29%  6          JavaScript
29.41%  5          C#
```
