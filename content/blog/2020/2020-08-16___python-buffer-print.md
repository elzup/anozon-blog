---
title: Python で Systemd や nohup を使っていてログがリアルタイムに出力されないとき
date: 2020-08-16 19:00:00
tags:
  - Python
  - Systemd
---

Python スクリプトでリアルタイムにログが出力されないときの対処法。

## -u オプションで起動する

```sh
$ python -u main.py
```

[-u オプション | 1\. コマンドラインと環境 — Python 3\.8\.5 ドキュメント](https://docs.python.org/ja/3/using/cmdline.html#cmdoption-u)

```
force the stdout and stderr streams to be unbuffered;
this option has no effect on stdin; also PYTHONUNBUFFERED=x
```

端末以外からの実行だとバッファして stdout します。
強制的に `unbufferd` (バッファなし) に出力させるときは `-u` をつけて実行します。
