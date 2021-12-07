---
title: Switchbot人感センサで座りっぱなし防止アラートを作る
date: 2021-12-04 09:00:00
topics:
  - NodeRED
  - TypeScript
  - ローコード
type: tech
published: true
emoji: 🪑
---

この記事は Node-RED Advent Calendar 2021 の 4 日目の記事です。
[Node\-RED のカレンダー \| Advent Calendar 2021 \- Qiita](https://qiita.com/advent-calendar/2021/node-red)

リモートワークで一日中座って作業すると生活習慣病が気になります。そこで、Node-RED で座りっぱなしを検知して運動を促すシステムを作ってみました。

![人感センサ](https://elzup-image-storage.s3.amazonaws.com/blog/sb-motion-sensor.jpg)
![座りっぱSlack通知](https://elzup-image-storage.s3.amazonaws.com/blog/suwarippa-slack-notice.png)

通知が来たらスクワットやストレッチをしています。

## 準備

動きの検知は SwitchBot 人感センサ(Motion Sensor)を使います。
[SwitchBot 人感センサー](https://www.switchbot.jp/products/motion-sensor)
これを机から立ち上がっていないと検知されない位置に調整して設置しました。

Node.js で実装してたのですが、Node-RED Only のパターンでも実装してみました。
ともに以下の環境変数が設定してある前提で書いています。

```
export SWITCHBOT_TOKEN=""
export MONITOR_DEVICE_ID=""
export SLACK_URL=""
```

[OpenWonderLabs/SwitchBotAPI: SwitchBot API Documents](https://github.com/OpenWonderLabs/SwitchBotAPI)
[Slack での Incoming Webhook の利用 \| Slack](https://slack.com/intl/ja-jp/help/articles/115005265063-Slack-%E3%81%A7%E3%81%AE-Incoming-Webhook-%E3%81%AE%E5%88%A9%E7%94%A8)

## Node.js だけで実装する版

成果物リポジトリ  
[elzup/switchbot\-suwarippa\-alert: Detect no motion time by using Switch Bot Motion Sensor](https://github.com/elzup/switchbot-suwarippa-alert)

### SwitchBot API を叩く部分

`/devices` API で使う人感センサのデバイス ID を取得しておきます。

`getMoveDetected` で動体検知をします。
SwitchBot API は現在(2021-11) 過去履歴をリストで取得できないので polling する必要があります。

> Request limit
> The amount of API calls per day is limited to 10000 times. Going over that limit will return "Unauthorized."

API 制限は 1 日に 10000 回なので、この 1 台に API をすべて使う場合 polling 頻度は 1 分に 6 回です。

```ts
import { getEnv } from '@elzup/kit/lib/getEnv'
import got from 'got'

const authorization = getEnv('SWITCHBOT_TOKEN')
const sensorId = getEnv('MONITOR_DEVICE_ID')
if (!authorization) {
  throw new Error('env not setup: SWITCHBOT_TOKEN')
}

export type MotionDeviceLog = {
  statusCode: string
  body: {
    deviceId: string
    deviceType: 'Motion Sensor'
    hubDeviceId: string
    moveDetected: boolean
    brightness: 'bright'
  }
  message: 'scucess'
}
export type DeviceLog = MotionDeviceLog
export type Response = { body: { deviceList: unknown[] } }

const cli = got.extend({
  prefixUrl: 'https://api.switch-bot.com/v1.0',
  headers: { authorization },
  responseType: 'json',
})

export const getDevices = () => cli.get('devices').json<Response>()
export const getDevice = (deviceId: string) =>
  cli.get(`devices/${deviceId}/status`).json<DeviceLog>()

export async function getMoveDetected() {
  const log = await getDevice(sensorId)
  return log.body.moveDetected
}
```

### Slack 通知部分

Slack Incoming Webhook で通知を送ります。

```ts
import { makeSlackParams } from '@elzup/kit/lib/slack'
import { getEnv } from '@elzup/kit/lib/getEnv'
import axios from 'axios'

const SLACK_URL = getEnv('SLACK_URL')

export function postSlack() {
  axios.request(
    makeSlackParams(SLACK_URL, {
      text: '動いて！',
      icon_emoji: ':chair:',
      username: '座りっぱ検知',
    })
  )
}
```

### プロセス部分

check を getMoveDetected、 notice を postSlack として実装します。
10 秒おきに実行します。  
reducer は後述します。

```ts
import { reducer, State } from './reducer'
import { postSlack } from './slack'
import { getMoveDetected } from './switchbot'

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec))

function notice(now: number) {
  postSlack()
  // sendSwarippa(now)
}

const check = getMoveDetected

const initialState: State = {
  lastMoved: 0,
  noticed: false,
}

async function main() {
  let state = initialState

  while (true) {
    const detected = await check()
    const now = +new Date()
    const { state: newState, doNotice } = reducer(state, detected, now)
    if (doNotice) notice(now)
    state = newState

    await sleep(10 * 1000)
  }
}

main()
export default {}
```

### ロジック部分

30 分動きがなかったら通知するように作ります。  
"最後に通知した時刻", "最後の検知後通知済みか" の 2 つを State に保持しています。  
doNotice で通知するかを返します。

```ts
const SUSPEND_DETECT_TIME = 30 * 60 * 1000

export type State = {
  lastMoved: number
  noticed: boolean
}

const isSuspend = (
  now: number,
  lastMoved: number,
  suspendDetectTime: number,
  detect: boolean
): boolean => {
  if (detect) return false
  const suspendTime = now - lastMoved

  return suspendTime >= suspendDetectTime
}

// if not detected some time (SUSPEND_DETECT_TIME), once do notice
export const reducer = (
  { noticed, lastMoved }: State,
  detected: boolean,
  now: number
): { state: State; doNotice: boolean } => {
  if (detected) {
    return { state: { lastMoved: now, noticed: false }, doNotice: false }
  }
  const suspend = isSuspend(now, lastMoved, SUSPEND_DETECT_TIME, detected)
  const doNotice = !noticed && suspend
  return { state: { noticed: doNotice || noticed, lastMoved }, doNotice }
}
```

## Node-RED だけで実装する版

### 設定全体図

![Suwarippa Node-RED](https://elzup-image-storage.s3.amazonaws.com/blog/suwarippa-nodered.png)

[Gist: flow file 座りっぱなし検知アラート](https://gist.github.com/elzup/6f9a2bd5e7c1a75ec0ff17c61be5ebc6)

### ロジック部分

check notice Function Node の中身です。

:::details 前半(reducer の TypeScript を JavaScript に変換しただけです)

```js
const SUSPEND_DETECT_TIME = 30 * 60 * 1000

const isSuspend = (now, lastMoved, suspendDetectTime, detect) => {
  if (detect) return false
  const suspendTime = now - lastMoved

  return suspendTime >= suspendDetectTime
}

// if not detected some time (SUSPEND_DETECT_TIME), once do notice
const reducer = ({ noticed, lastMoved }, detected, now) => {
  if (detected) {
    return { state: { lastMoved: now, noticed }, doNotice: false }
  }
  const suspend = isSuspend(now, lastMoved, SUSPEND_DETECT_TIME, detected)
  const doNotice = !noticed && suspend
  return { state: { noticed: doNotice || noticed, lastMoved }, doNotice }
}

const initialState = {
  lastMoved: 0,
  noticed: true,
}
```

:::

後半: プロセス部分の while ループの中を置き換えてます。

```js
const state = flow.get('suwarippa-state') || initialState

const detected = msg.payload
const now = +new Date()
const { state: newState, doNotice } = reducer(state, detected, now)
flow.set('suwarippa-state', newState)

msg.payload = Number(doNotice)
msg.debug = { newState, doNotice }

return msg
```

#### Node-RED での環境変数

Node-RED での環境変数の取り出し方はこちらです。
[環境変数を利用する : Node\-RED 日本ユーザ会](https://nodered.jp/docs/user-guide/environment-variables)

URL などのプロパティの動的生成にはテンプレートを使います。環境変数は文字列結合で使えませんでした。
[リクエスト先 URL にテンプレートを使用 : Node\-RED](https://cookbook.nodered.jp/http/set-request-url-template)

#### 定期実行

n 秒おきに実行するトリガーノードを作成できます。  
9 時から 21 時までのみ実行するなどスケジュール設定も簡単にできるようになってました。
ですが、その場合単位が「分」になってしまうので今回は使えませんでした。惜しいです。

#### リクエストの構築について

request ノード だけでは HTTP Header などの設定ができません。  
基本的に request ノード の手前で funcsion ノードや change ノードを使ってリクエスト msg を構築します。

### Node-RED で実装した感想

Node-RED のメリットとデメリットをいくつかまとめてみました。

_メリット_

- Input 先 output 先 ノードの変更(つけ外し、複数に拡張など)が容易
- 停止・再開が容易
- ログが見られる
- 現在の Store を (コンテキストデータタブで) 確認できる
  - ![コンテキストデータ](https://elzup-image-storage.s3.amazonaws.com/blog/nodered-context-window.png)
- 定期実行のサービス化が容易

_デメリット_(まだ勉強中)

- コーディング環境が厳しい

これを機に個人用 Node-RED サーバーを立てたので活用していきたいです。
