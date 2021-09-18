---
title: docker-compose.yml に環境変数を渡す
date: 2020-05-01 18:00:00
topics:
  - DockerCompose
  - Docker
type: tech
published: true
---

```toc

```

## .env ファイルを使う

サンプルコード: [elzup\-sandbox/docker\-scratch](https://github.com/elzup-sandbox/docker-scratch)

```
docker-compose.yml
shell/
  Dockerfile
```

### docker-compose.yml

services.shell.environment に環境変数をパスしたいとします。
変数 `TOP_TOKEN` を `.env` ファイルに記述します。

```yml title=docker-compose.yml
version: '3'
services:
  shell:
    build: ./shell
    volumes:
      - ./shell:/src
    image: shell
    environment:
      TOKEN: '${TOP_TOKEN}'
```

```.env
TOP_TOKEN='Hello I am env variable!'
```

Docker の実行では環境変数をそのまま `echo` してみます。

```:title=Dockerfile
FROM debian:stretch-slim

CMD echo $TOKEN
```

この状態で `docker-compose up` すると設定した値が渡っているのがわかります。

```
shell_1  | 'Hello I am env variable!'
```
