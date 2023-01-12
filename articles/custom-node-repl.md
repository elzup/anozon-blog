---
title: 便利にカスタマイズした Node REPL を起動する
date: 2022-12-23 18:00:00
topics:
  - node
type: tech
published: true
emoji: 🛠
---

js の挙動を確かめたいときに, ターミナルを開いて `node` コマンドでインタラクティブシェルを起動することがよくあります。  
その時に util 関数を使いたくなることがあるので、事前にロードされてる環境を作ってみました。

## repl モジュールの作成

```js:title=index.js
import lodash from 'lodash'
import kit from '@elzup/kit'
import repl from 'repl'

// start message
console.log('anozon node repl (^•ω•^)')

const r = repl.start({ prompt: 'node> ' })

Object.defineProperty(r.context, '_', {
  enumerable: true,
  value: lodash,
})

r.context.kit = kit
```

```sh
> node index.js
anozon node repl (^•ω•^)
node> _.range(5)
[ 0, 1, 2, 3, 4 ]
```

`_` は `r.context._ = lodash` 直接代入するとエラーが出るので `Object.defineProperty` を使います。

## ローカルのコマンドに登録する

コマンド名(例 `anode`)を `package.json` にセットアップし、グローバルにインストールします。

```json:title=package.json
{
  "description": "personal custom node REPL",
  "main": "index.js",
  "type": "module",
  "bin": {
    "anode": "index.js"
  }
}
```

```sh
> npm i -g .
> anode
anozon node repl (^•ω•^)
node>
```

起動メッセージや prompt もいじれるので、好みに合わせてカスタマイズできます。

サンプルリポジトリ:
[elzup/anode\-repl: personal custom node REPL](https://github.com/elzup/anode-repl)
