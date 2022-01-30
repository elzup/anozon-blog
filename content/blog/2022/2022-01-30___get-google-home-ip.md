---
title: ネットワーク内の Google Home Mini のIPアドレスを取得する
date: 2022-01-30 12:00:00
topics:
  - Google Home
  - mdns
  - Node.js
type: tech
published: true
emoji: 🔈
---

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

```js
const ip = await getGoogleHomeIp()
console.log(ip)
```
