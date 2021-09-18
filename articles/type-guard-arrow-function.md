---
title: アロー関数とfunction それぞれの Type Guard 書き方
date: 2021-01-04 23:00:00
topics:
  - TypeScript
type: tech
published: true
---

この記事では アロー関数で Type Guard について紹介します。

[TypeScript: TS Playground \- An online editor for exploring TypeScript and JavaScript](https://www.typescriptlang.org/play?#code/FAFwngDgpgBAcgSwOYIE4JgXhgb2DAmAYwEMQokB7VMALhgHIA7ZNBB-QpqEE+gZxDomSYAF9QkWAHEArkwDWJJllycCpclRr0GSeUqYdCMbrwFCEI9aeoJ6TWQFsARlFTjJ0GAGVZ-AAsMbEQUdBgAHxg5RWVgYAAzeSIQBEoVBH5QtgAKfn8g+j9AhABKAQKMTPhWcLwTVB5ZVBV8koA6TQpqMCxMbGZa9k8AehHidMEYTJjDVTzKosrymDag6f5og2UsAD5Vys6ybpo+gf1Yo2AiSZAN2Z3sBZKlkpW1qs2HlUx9+sJGiBmq1Dl1tL1+udtlcJEA)

```ts
type Nigiri = {
  category: 'nigiri'
  neta: string
}
type Gunkan = {
  category: 'gunkan'
  neta: string
  nori: number
}
type Sushi = Nigiri | Gunkan
```

## function パターン

```ts
function isNigiri(sushi: Sushi): sushi is Nigiri {
  return sushi.category === 'nigiri'
}
```

## arrow function パターン

```ts
const isGunkan = (sushi: Sushi): sushi is Gunkan => sushi.category === 'gunkan'
// or
const isGunkan = (sushi: Sushi): sushi is Gunkan => {
  return sushi.category === 'gunkan'
}
```

よくコロンを忘れて混乱する。
