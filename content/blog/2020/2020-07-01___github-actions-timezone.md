---
title: テストで TimeZone を固定する
date: 2020-07-01 15:00:00
tags:
  - GitHub Actions
  - test
---

日時の文字列をテストに使っているとき GitHub Actions でつまずいたのでメモ。

javascript の Date は自動でローカルのタイムゾーンで文字列化されます。

```diff
    - Snapshot
    + Received

      Array [
    -   2020-03-22T13:22:00.000Z,
    -   2020-03-22T13:22:00.000Z,
    +   2020-03-22T22:22:00.000Z,
    +   2020-03-22T22:22:00.000Z,
```

```toc

```

## 環境変数 TZ を指定して実行する

```json
{
  "scripts": {
    "test": "TZ=Asia/Tokyo jest"
  }
}
```

## 他の解決策

unix timestamp でテスト比較する。(テストコードが少しわかりにくくなる)

## その他

最初 GitHub Actions 側で指定していたけど、yarn test 側で指定したほうが理想的。

```
      - run: TZ=Asia/Tokyo yarn test
```
