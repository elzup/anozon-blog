---
title: "各言語特有っぽい構文: Bash/AWK"
date: 2025-12-24 00:00:00
topics:
  - Bash
  - AWK
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 24日目の記事です。

個人的な好みを交えて紹介します。


```bash
#!/bin/bash
# Bash - 配列 + 算術展開 + 条件分岐
binary_search() {
    local -n arr=$1
    local target=$2
    local left=0
    local right=$((${#arr[@]} - 1))

    while ((left <= right)); do
        local mid=$(((left + right) / 2))
        if ((arr[mid] == target)); then
            echo $mid
            return
        elif ((arr[mid] < target)); then
            left=$((mid + 1))
        else
            right=$((mid - 1))
        fi
    done
    echo -1
}

arr=(1 3 5 7 9)
binary_search arr 5  # 2
```

```awk
# AWK - パターン-アクション + 連想配列
BEGIN {
    split("1 3 5 7 9", arr, " ")
    target = 5
    print binary_search(arr, length(arr), target)
}

function binary_search(arr, n, target,    left, right, mid) {
    left = 1
    right = n
    while (left <= right) {
        mid = int((left + right) / 2)
        if (arr[mid] == target) return mid
        else if (arr[mid] < target) left = mid + 1
        else right = mid - 1
    }
    return -1
}
```

## ピックアップ構文

### 変数展開 (Bash)
```bash
# 基本
name="world"
echo "Hello, $name"
echo "Hello, ${name}"

# デフォルト値
${var:-default}    # 未定義ならdefault
${var:=default}    # 未定義なら代入も
${var:+value}      # 定義済みならvalue
${var:?error}      # 未定義ならエラー

# 文字列操作
${#var}            # 長さ
${var:0:5}         # 部分文字列
${var#pattern}     # 前方削除（最短）
${var##pattern}    # 前方削除（最長）
${var%pattern}     # 後方削除（最短）
${var/old/new}     # 置換
```

### 算術展開 (Bash)
```bash
# ((...)) 算術評価
((x = 5 + 3))
((x++))
((x > 10)) && echo "big"

# $((...)) 算術展開
result=$((5 * 3))
echo $((2 ** 10))  # 1024
echo $((RANDOM % 100))

# let
let "x = x + 1"
```

### パターン-アクション (AWK)
```awk
# パターンにマッチした行にアクション実行
/error/ { print "Found:", $0 }

# 条件式
$3 > 100 { total += $3 }

# 範囲パターン
/START/,/END/ { print }

# BEGIN/END
BEGIN { FS = "," }
END { print "Total:", NR, "lines" }
```

### フィールド変数 (AWK)
```awk
# $0: 行全体, $1, $2...: フィールド
{ print $1, $3 }

# NF: フィールド数, NR: 行番号
{ print NR, NF, $NF }  # $NF は最後のフィールド

# フィールド区切り
BEGIN { FS = ":" }     # 入力区切り
BEGIN { OFS = "\t" }   # 出力区切り
```

### プロセス置換 (Bash)
```bash
# <(...) プロセスの出力をファイルとして
diff <(sort file1) <(sort file2)

# >(...) プロセスへの入力として
tee >(grep error > errors.log) >(grep warn > warns.log)
```

### 連想配列
```bash
# Bash 4+
declare -A map
map[name]="Alice"
map[age]=30
echo ${map[name]}
echo ${!map[@]}  # キー一覧
```

```awk
# AWK
arr["name"] = "Alice"
arr["age"] = 30
for (key in arr) print key, arr[key]
delete arr["age"]
```
