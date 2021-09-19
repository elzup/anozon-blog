---
title: Node.js で家のネットワークかどうかチェックする
date: 2021-07-05 15:00:00
topics:
  - Node.js
  - Network
type: tech
published: true
---

家のネットワーク上でだけ実行したいスクリプトがあったので、接続しているかチェックするコードを書きました。

## network (npm) を使う

[tomas/network: The missing network utilities in Node\.js\.](https://github.com/tomas/network)

CLI でも以下のように確認できます。Mac, Linux, Windows 対応しているみたいです。

```
npx network active_interface
{
  name: 'en0',
  type: 'Wireless',
  ip_address: '192.168.11.12',
  mac_address: 'ff:ff:ff:01:ce:5b', // ここ
  gateway_ip: '192.168.11.1',
  netmask: '255.255.255.0'
}
```

### 現在のネットワークを記録

今接続しているアクセスポイントの MAC アドレスを取得します。

```ts
import { promisify } from 'util'
import network from 'network'

const getActiveInterface = promisify(network.get_active_interface)
const getCurrent = async () => (await getActiveInterface())?.mac_address

const currntAccessPointMacAddress = await getCurrent()

console.log(currntAccessPointMacAddress)
// ff:ff:ff:ff:ce:5b
```

### 比較する

```ts
const isSameNetwork = async (mac: string) => mac === (await getCurrent())

const HOME_MAC_ADDRESS = 'ff:ff:ff:ff:ce:5b'

console.log(await isSameNetwork(HOME_MAC_ADDRESS))
// true
```

### ファイルにストアする例

```ts
const SAVE_FILE = 'home.mac.txt'

const saveHomeNetwork = (id: string) => fs.writeFileSync('home.mac.txt', id)
const loadHomeNetwork = () => fs.readFileSync(SAVE_FILE, 'utf-8').trim()

const isHomeNetwork = () => isSameNetwork(loadHomeNetwork())
```

#### Home 設定

```ts
async function setupHome() {
  const currntAccessPointMacAddress = await getCurrent()

  console.log(currntAccessPointMacAddress)
  saveHomeNetwork(currntAccessPointMacAddress)
}
```

#### チェック

```tsx
console.log(await isHomeNetwork())
```

## 全体のコード

Gist: [Check is home Network](https://gist.github.com/elzup/a324b8d1129dc00d076870565670eea9)
