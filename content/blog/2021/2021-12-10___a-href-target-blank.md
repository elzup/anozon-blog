---
title: リンクを全部 target=_blank にするブックマークレット
date: 2021-12-10 14:00:00
topics:
  - Bookmarklet
type: tech
published: true
emoji: 🔗
---

Adventar の記事を漁っているときにいちいち新しいタブで開くのが面倒だったので作成しました。  
すべての a タグの `target` 属性を `_blank` にします。

## コード

```
// link を target="_blank" にする
javascript: (() => {
  const elems = Array.from(document.querySelectorAll('a'));

  for (const a of elems) a.setAttribute('target', '_blank');
})();
```

[ブックマークレット活用・すばやい登録と呼び出し \- Qiita](https://qiita.com/elzup/items/1698767d77af39d8dd19)
