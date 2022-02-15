---
title: github.io のページからソースリポジトリを開くブックマークレット
date: 2022-02-15 12:00:00
topics:
  - GitHubPages
  - Bookmarklet
type: tech
published: true
emoji: 🐈‍⬛
---

GitHub Pages を使って公開されているページを見ているときに、  
ソースコードのある該当リポジトリへジャンプする ブックマークレットです。

`[id].github.io` または `[id].github.io/[repository]` という形式の URL に対応しています。

```js
javascript: (() => {
  const githubIoUrlToRepoUrl = (url) => {
    const m = url.match(/(([^/]+).github.io)\/?([^/]*)/)
    if (!m) {
      return false
    }

    const [, host, githubId, repoPath] = m

    const repo = repoPath || host
    return `http://github.com/${githubId}/${repo}`
  }

  const url = githubIoUrlToRepoUrl(location.href)
  console.log(url)

  if (!url) {
    alert('not github.io repository')
    return
  }
  location.href = url
})()
```
