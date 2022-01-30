---
title: 1pxのsvgのコード
date: 2022-01-13 21:00:00
topics:
  - svg
type: tech
published: true
emoji: 🔲
---

以前作った 1px x 1px の png データ URL 生成ツールに svg のコード生成を追加しました。  
[1px data url generator](https://tools.anozon.me/1px)

## SVG コード例

style の background-color で指定することで実現しています。

```
<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" style="background: [COLOR CODE];"></svg>
```

### XML フォーマット

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" style="background: rgb(0, 0, 0);"></svg>
<!-- アルファ値 -->
<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" style="background: rgba(126, 211, 33, 0.5);"></svg>
```

### データ URL

```
data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%20style%3D%22background%3A%20rgba(102%2C%2045%2C%2045%2C%200.57)%3B%22%3E%3C%2Fsvg%3E
```
