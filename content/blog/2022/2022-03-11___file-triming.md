---
title: ファイルの任意の文字から文字までの複数行を取り出すシェル
date: 2022-03-11 12:00:00
topics:
  - Bash
  - ShellScript
type: tech
published: true
emoji: ✂️
---

sed と正規表現は使いません。(環境によって挙動が違うので)  
開始行と終了行の行番号を文字列検索で出して、`awk` で抜き出す方法です。

## ファイルから取り出す

```title=target.txt
AAA
BBB
CCC
DDD
EEE
FFF
GGG
```

```bash
#!/usr/bin/env bash
IN_FILE=target.txt

LINE_BGN=$(sed -n '/BBB/=' $IN_FILE)
LINE_END=$(sed -n '/EEE/=' $IN_FILE)
echo $LINE_BGN
echo $LINE_END

cat $IN_FILE |awk "$LINE_BGN<=NR && NR<=$LINE_END{print \$0}"
```

```title=出力
2
5
BBB
CCC
DDD
EEE
```

## pipe で取り出す

```bash
#!/usr/bin/env bash

DATA1="AAA\nBBB\nCCC\nDDD\nEEE\nFFF\nGGG\n"

LINE_BGN=$(echo -e $DATA1 |sed -n '/BBB/=')
LINE_END=$(echo -e $DATA1 |sed -n '/EEE/=')
echo $LINE_BGN
echo $LINE_END

echo -e $DATA1 |awk "$LINE_BGN<=NR && NR<=$LINE_END{print \$0}"
```

`echo -e` の `-e` オプションは改行文字を含む文字列を渡すときに必要です。

出力は同じです。
