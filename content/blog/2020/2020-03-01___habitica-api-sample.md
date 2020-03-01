---
title: javascript で Habitica API で日課の記録を取得する
date: 2020-03-01 15:00:00
tags:
  - Habitica API
  - Node.js
  - json
  - fx
---

この記事では Habitica API で日課の記録を取得する方法について紹介します。

Habitica は日課管理ツールです。

[Habitica \- Gamify Your Life](https://habitica.com/)

```toc

```

## token を取得する

![](https://elzup-image-storage.s3.amazonaws.com/blog/Habitica_-_Gamify_Your_Life.png)

## node.js で API を叩く

[axios](https://github.com/axios/axios) で叩いてみます。
とりあえずレスポンス全体を出力します。

```js:title="main.js"
const axios = require('axios').default
const { HABITICA_USER_ID, HABITICA_TOKEN } = process.env

const client = axios.create({
  baseURL: 'https://habitica.com',
  headers: {
    Accept: 'application/json',
    'x-api-user': HABITICA_USER_ID,
    'x-api-key': HABITICA_TOKEN,
    'x-client': HABITICA_USER_ID + '-node',
  },
})

const main = async () => {
  const res = await client.get('/api/v3/tasks/user')

  // all data
  console.log(JSON.stringify(res.data.data))
```

## 中身を確認する

出力された json の構造を確認してみます。

`fx` という JSON 解析 cli ツールを使っていておすすめです。jq の filter も使えます。
[antonmedv/fx: Command\-line tool and terminal JSON viewer 🔥](https://github.com/antonmedv/fx)

```
node main.js | fx
```

取り出したい日課 `/筋トレ` で検索します。

![](https://elzup-image-storage.s3.amazonaws.com/blog/fx.png)

データ構造を確認すると "name" と "history" がありますね。

## 日課を達成した日付一覧を出力してみる

'YYYY-MM-DD' の形式で出力してみます。

```js:title="main.js"
const { format } = require('fecha')

const tasks = res.data.data
const workout = tasks.find(v => /筋トレ/.exec(v.text))

const times = workout.history.map(commit => format(commit.date, 'YYYY-MM-DD'))
// 後日 commit のタイムスタンプ
console.log(times.join('\n'))
```

```sh
$ node main.js

2020-02-19
2020-02-20
2020-02-21
2020-02-22 //
2020-02-22 // ←翌日のリマインドでチェックした場合かぶってします
2020-02-23
2020-02-24
2020-02-25
2020-02-26
2020-02-29
2020-03-01
```

ということでかぶった場合は前日にするパッチを当てます。

```js
const times = workout.history.map(commit => [
  format(commit.date, 'YYYY-MM-DD'),
  commit.date,
])
times.reverse()

let prev = ''
const strs = times.map(([s, t], i) => {
  // 一致する場合は前日に
  const ts = s === prev ? format(t - 24 * 60 * 60 * 1000, 'YYYY-MM-DD') : s
  return (prev = ts)
})

strs.reverse()
console.log(strs.join('\n'))
```

```
2020-02-19
2020-02-20
2020-02-21
2020-02-22
2020-02-23
2020-02-24
2020-02-25
2020-02-26
2020-02-29
2020-03-01
```

かぶらなくなりました。
ただし以下のようなパターンの場合は確証がありません。

```
History なし      // こちらの日に実行した可能性あり
History あり
History なし
```

コード: https://github.com/elzup-sandbox/habitica-api-node-sample/blob/master/main.js

## おわりに

Habitica の API を使うことで、 「ボタン 1 つでタイムスタンプを記録する」 というツールとしても今後使えそうだなと思いました。
