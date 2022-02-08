---
title: JavaScript で Object の更新はどれが速いのか
date: 2020-08-23 10:00:00
topics:
  - JavaScript
type: tech
published: true
---

スプレッド構文で書くのが面倒だったので検証しました。

## 結果

結論としてはクローンが書きやすいし速いので良さそうでした。

|                                  | コスト  | 書きやすさ |
| -------------------------------- | ------- | ---------- |
| スプレッド構文                   | 221 ms  | △          |
| スプレッド構文でクローンして代入 | 195 ms  | ○          |
| Object.assign でクローンして代入 | 9126 ms | ○          |

恐らく単体では誤差の範囲です。  
ですが大規模データでの統計や実行回数が増える場合は意識しようと思いました。

検証環境: `node v12.16.1`  
コード: https://repl.it/@anozon/object-update-spped#index.js

## 検証

```js
// ただ代入する破壊的変更のパターン。
function updateObjOverwrite(obj, key1, key2, v) {
  obj[key1][key2] = v
  return obj
}

// スプレッド構文
function updateObjSpread(obj, key1, key2, v) {
  return {
    ...obj,
    [key1]: {
      ...obj[key1],
      [key1]: v,
    },
  }
}

// Object.assign でクローンして代入
function updateObjCloneObjectAssign(obj, key1, key2, v) {
  const newObj = Object.assign({}, obj)

  newObj[key1][key2] = v
  return newObj
}

// スプレッド構文でクローンして代入
function updateObjCloneSpread(obj, key1, key2, v) {
  const newObj = { ...obj }

  newObj[key1][key2] = v
  return newObj
}
```

1000key x 1000key のオブジェクトについて、 10000 回実行しました。

```js
const obj = {}

for (let i = 0; i < 1000; i++) {
  obj[i] = {}
  for (let j = 0; j < 1000; j++) {
    obj[i][j] = Math.random()
  }
}

const rand = () => Math.floor(Math.random() * 1000)
function nope() {}
const funcs = [
  nope,
  updateObjOverwrite,
  updateObjSpread,
  updateObjCloneSpread,
  updateObjCloneObjectAssign,
]

funcs.forEach((func) => {
  const start = new Date()
  for (let i = 0; i < 10000; i++) {
    func(obj, rand(), rand(), Math.random())
  }
  console.log(func.name, new Date() - start, 'ms')
})
```

```
nope 24 ms
updateObjOverwrite 80 ms
updateObjSpread 214 ms
updateObjCloneSpread 183 ms
updateObjCloneObjectAssign 8298 ms

nope 76 ms
updateObjOverwrite 82 ms
updateObjSpread 221 ms
updateObjCloneSpread 195 ms
updateObjCloneObjectAssign 9126 ms
```

## その他

JSON.parse でクローンするのも速かったんだっけ？と思って調べなおそうとしたんですが、  
それは Object literal より JSON.parse のほうが速いって話でした。

[json parse vs object literal \- Google 検索](https://www.google.com/search?q=json+parse+vs+object+literal)
