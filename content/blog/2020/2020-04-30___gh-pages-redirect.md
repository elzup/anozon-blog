---
title: GitHub Pages から別のサイトに移行するときのリダイレクト設定
date: 2020-04-30 23:00:00
tags:
  - GitHub Pages
type: tech
published: true
---

```toc

```

## 概要

GitHub Pages から別のホスティングへ移行したとき、
ドメインが変わる場合にすべき設定について。

運用していたページ `https://[user].github.io/[repo]` へのアクセスを **新しい URL へリダイレクトする必要があります。**

## gh-pages ブランチをクリーンにする

すでにビルドされたファイルなどがある場合は削除します。

## jekyll でリダイレクトする

サンプルの gh-pages ブランチ
[elzup/dentime at gh\-pages](https://github.com/elzup/dentime/tree/gh-pages)

```
_layouts/
  redirected.html
404.html
Gemfile
Gemfile.lock
_config.yml
index.md
```

プロジェクト構造は以上のようになります。各ファイルは [サンプル](https://github.com/elzup/dentime/tree/gh-pages)を見てください。

`index.md` と `404.html` を以下のように書きかえます。

```md
---
layout: redirected
sitemap: false
redirect_to: <新しいURL>
---
```

`redirect_to` に新しい URL (リダイレクト先) を指定します。

```yml:title=_config.yml
plugins:
  - jekyll-redirect-from
```

```html:title=_layouts/redirected.html
<!DOCTYPE html>
<html>
<head>
<link rel="canonical" href="{{ page.redirect_to }}"/>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta http-equiv="refresh" content="0;url={{ page.redirect_to }}" />
</head>
<body>
    <h1>Redirecting...</h1>
      <a href="{{ page.redirect_to }}">Click here if you are not redirected.<a>
      <script>location='{{ page.redirect_to }}'</script>
</body>
</html>
```

- `<link rel="canonical" href="URL"` : 正規化設定
- `<meta http-equiv="refresh" content="0;url=URL"` : 0 秒で URL にリダイレクト
- javascript で(も？) `location = 'URL'` によりページ遷移
- 遷移しなかった場合のリンクとナビゲーションメッセージのレンダリング

を行っています。
