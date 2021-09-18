---
title: Firebase Hosting の URL で .html を省略する設定
date: 2020-04-26 21:00:00
tags:
  - Tips
  - Firebase
type: tech
published: true
---

## cleanUrls を使う

[ホスティング動作を構成する  \|  Firebase](https://firebase.google.com/docs/hosting/full-config?hl=ja#control_html_extensions)

`firebase.json` の hostings.cleanUrls を true にすることで実現できます。

```json:title=firebase.json
{
  "hosting": {
    "cleanUrls": true, //
    "trailingSlash": false // 末尾にスラッシュを付けるか
  }
}
```

拡張子なしの URL で `.html`にアクセスできます。
`/hoge` → `/hoge.html`
