---
title: Node.js で Google Home Mini のIPアドレスを取得する
date: 2022-01-30 12:00:00
topics:
  - Google Home
  - mdns
  - Node.js
type: tech
published: true
emoji: 🔈
---

ネットワーク内の Google Home Mini のアドレスを取得します。

[agnat/node_mdns: mdns/zeroconf/bonjour service discovery add\-on for node\.js](https://github.com/agnat/node_mdns)

## コード

```js
import mdns, { Service } from 'mdns'

/* ts
export function getServiceCb(
  name: string,
  callback: (err: unknown, service: Service | null) => void
) {
*/
export function getServiceCb(name callback) {
  const browser = mdns.createBrowser(mdns.tcp(name))

  try {
    browser.start()
    browser.on('serviceUp', (info) => {
      callback(null, info)
      browser.stop()
    })
  } catch (e) {
    callback(e, null)
  }
}

const getServicePromise = promisify(getServiceCb)

export async function getGoogleHomeIp() {
  const service = await getServicePromise('googlecast')

  if (!service) return null

  return service.addresses[0]
}
```

```js
const ip = await getGoogleHomeIp()
console.log(ip)
// => XXX.XXX.XXX.XXX
```

### p-event を使う版

```ts
import mdns, { Service } from 'mdns'
import pEvent from 'p-event' // < 5 (without EMS)
// import { pEvent } from 'p-event' >= 5 (require EMS)

export async function getService(name: string) {
  const browser = mdns.createBrowser(mdns.tcp(name))

  browser.start()
  const service = await pEvent<'serviceUp', Service>(browser, 'serviceUp')
  browser.stop()

  return service
}

export async function getGoogleHomeIp() {
  const service = await getService('googlecast')

  return service.addresses[0]
}
```

### mdns.Service type

`service` では他に以下の情報も取れます。

```
{
  interfaceIndex: 6,
  type: ServiceType {
    name: 'googlecast',
    protocol: 'tcp',
    subtypes: [],
    fullyQualified: true
  },
  replyDomain: 'local.',
  flags: 2,
  name: 'Google-Nest-Mini-FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
  networkInterface: 'en0',
  fullname: 'Google-Nest-Mini-FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF._googlecast._tcp.local.',
  host: 'ffffffffffffffffffffffffffffffffffff.local.',
  port: 8009,
  rawTxtRecord: <Buffer ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ... 156 more bytes>,
  txtRecord: {
    id: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    cd: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    rm: 'FFFFFFFFFFFFFFFF',
    ve: '05',
    md: 'Google Nest Mini',
    ic: '/setup/icon.png',
    fn: 'ダイニング ルーム',
    ca: '000000',
    st: '0',
    bs: 'FFFFFFFFFFFF',
    nf: '1',
    rs: ''
  },
  addresses: [ '192.168.11.5' ]
}
```
