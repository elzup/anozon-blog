---
title: 【ボツネタ】GitHub Actions の URL 1 つからバッジを生成するツール作った
date: 2020-02-03 21:00:00
tags:
  - React
  - GtiHub Actions
---

この記事では GitHub Actions の URL 1 つからバッジを生成するツールを作ったので紹介します。

**するつもりだったのですが、気づいたら公式で発行するするボタンができてました。**

![github-actions-qawolf-badge.png](https://elzup-image-storage.s3.amazonaws.com/blog/github-actions-qawolf-badge.png)

なので、「作っちゃったもの」の技術解説をします。

## バッジの仕様

[ワークフローを設定する \- GitHub ヘルプ](https://help.github.com/ja/actions/automating-your-workflow-with-github-actions/configuring-a-workflow#adding-a-workflow-status-badge-to-your-repository) (公式ドキュメント)

URL の形式。
`https://github.com/<OWNER>/<REPOSITORY>/workflows/<WORKFLOW_FILE_PATH>/badge.svg`

## 成果物

![gha-badge-maker.gif](https://elzup-image-storage.s3.amazonaws.com/blog/gha-badge-maker.gif)

コード: [tools/gha\-badge\-maker\.tsx at master · elzup/tools](https://github.com/elzup/tools/blob/master/pages/gha-badge-maker.tsx)

以下は変換する関数部分です。

```ts
export function convertUrlToBadge(url: string, action?: string): ParseResult {
  const parseReg = '(https://github.com/.*/.*)/actions\\?query=workflow%3A(.*)'
  const m = new RegExp(parseReg).exec(url)

  if (!m) return null

  const [_, repoUrl, actionPath] = m
  const actionName = action || actionPath
  const badgeUrl = `${repoUrl}/workflows/${actionName}/badge.svg`

  return { actionName, badgeUrl, badgeText: `![${actionName}](${badgeUrl})` }
}

// test

test('convertUrlToBadge', () => {
  const url = 'https://github.com/elzup/tools/actions?query=workflow%3Aqawolf'

  expect(convertUrlToBadge(url)).toMatchObject({
    badgeText:
      '![qawolf](https://github.com/elzup/tools/workflows/qawolf/badge.svg)',
    actionName: 'qawolf',
    badgeUrl: 'https://github.com/elzup/tools/workflows/qawolf/badge.svg',
  })
})
```

## まとめ

もちろん既存ツールがないかは調べていたのですが、いつの間にか公式にできてることに書いている途中で気づきました。

毎回どんな URL だっけ？となっていたし需要はあったですね。
