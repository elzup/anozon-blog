---
title: '各言語特有っぽい構文: Go'
date: 2025-12-12 00:00:00
topics:
  - Go
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 12 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

```go
// Go - 多値返却 + 名前付き戻り値 + defer
package main

import "fmt"

func binarySearch(arr []int, target int) (index int, found bool) {
    left, right := 0, len(arr)-1

    for left <= right {
        mid := left + (right-left)/2
        switch {
        case arr[mid] == target:
            return mid, true
        case arr[mid] < target:
            left = mid + 1
        default:
            right = mid - 1
        }
    }
    return -1, false
}

func main() {
    arr := []int{1, 3, 5, 7, 9}
    if idx, ok := binarySearch(arr, 5); ok {
        fmt.Println(idx)  // 2
    }
}
```

## ピックアップ構文

### goroutine と channel

軽量な並行処理とゴルーチン間の通信機能。`go` キーワードで簡単に並行処理を開始できる。

```go
// 並行処理
go func() {
    fmt.Println("concurrent")
}()

// channel
ch := make(chan int)
go func() { ch <- 42 }()
value := <-ch

// select
select {
case v := <-ch1:
    fmt.Println(v)
case v := <-ch2:
    fmt.Println(v)
default:
    fmt.Println("no data")
}
```

js の `Promise.race` がこれでかけてしまうのが面白い。

### 多値返却

関数から複数の値を同時に返すことができる。エラーハンドリングで頻出。

```go
// 複数の値を返す
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

result, err := divide(10, 2)
if err != nil {
    log.Fatal(err)
}

// 一部を無視
result, _ := divide(10, 2)
```

### 名前付き戻り値

戻り値に名前を付けて、naked return で返せる。

```go
// 戻り値に名前を付ける
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return  // naked return
}
```

nuked とても面白くて良さげだが可読性が下がりそう。

### interface

暗黙的にインターフェースを実装し、型アサーションで型を判定できる。`implements` 宣言が不要。

```go
// 暗黙的な実装
type Reader interface {
    Read(p []byte) (n int, err error)
}

// 空インターフェース
func print(v interface{}) {
    fmt.Println(v)
}

// 型アサーション
if s, ok := v.(string); ok {
    fmt.Println(s)
}

// 型スイッチ
switch v := x.(type) {
case int:
    fmt.Println("int:", v)
case string:
    fmt.Println("string:", v)
}
```

### defer

関数終了時に必ず実行される処理を登録できる。

```go
// 関数終了時に実行
func readFile(path string) ([]byte, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close()  // 関数終了時にClose

    return io.ReadAll(f)
}

// LIFO順で実行
defer fmt.Println("1")
defer fmt.Println("2")
// 出力: 2, 1
```

Swift にもある。
