---
title: Gatsby のブログを zenn に連携する
date: 2021-09-18 16:00:00
topics:
  - Markdown
  - Gatsby
  - Zenn
published: false
---

この記事では Gatsby のブログを zenn に連携する について紹介します。

## 既存記事の Markdown メタデータを zenn に合わせる

既存の命名にこだわりもないので zenn で使われているキーワードに全部移行する。

- `topics` -> `topics`
- `status: draft` -> `published: false`
- `type: tech` を追加

一括置き換えした正規表現。

```
(  -.*\n)---
```

```
$1type: tech\npublished: true\n---
```
