---
title: Docker 止めずに立ち上げるだけする【tty】
date: 2020-06-09 14:00:00
tags:
  - Docker
  - Docker Compose
  - Java
---

## docker-compose.yml

java 実行環境を立ち上げる例。

```yml:title=docker-compose.yml
version: '3'
services:
  java:
    image: openjdk:14-slim
    # volumes:
    #   - ./vm:/root
    tty: true
    container_name: java
```

立ち上げた環境にシェルでアクセスする例。

```sh
# bash 接続
$ docker exec -i java /bin/bash

# コマンド実行
$ docker exec -i java /bin/bash -c "echo running"
running

# java 実行
$ docker exec -i java /bin/bash -c "java -version"
openjdk version "14.0.1" 2020-04-14
OpenJDK Runtime Environment (build 14.0.1+7)
OpenJDK 64-Bit Server VM (build 14.0.1+7, mixed mode, sharing)
```

## Docker コマンドの場合

```sh
$ docker run -ti openjdk:14-slim
```

- tty: `-t` オプション
