---
title: Mac OS でIPアドレスを出力する方法いろいろ
date: 2020-01-31 14:00:00
tags:
  - ShellScript
---

この記事ではプライベート IP アドレスだけ出力する方法をまとめました。

## 目次

```toc

```

## ローカル IP

### ifconfig を使う

```sh
ifconfig en0 | awk '$1 == "inet" {print $2}'
```

### internal-ip-cli (npm module) を使う

[sindresorhus/internal\-ip\-cli: Get your internal IP address](https://github.com/sindresorhus/internal-ip-cli)

```sh
npx -q internal-ip-cli --ipv4

# or

npm i -g internal-ip-cli
internal-ip -4
```

## Public IP

### internal-ip-cli (npm module) を使う

[sindresorhus/public\-ip\-cli: Get your public IP address](https://github.com/sindresorhus/public-ip-cli)

```sh
npx -q public-ip-cli --ipv4
```

### curl とサービスを使う

```sh
curl globalip.me
```
