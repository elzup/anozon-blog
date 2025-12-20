---
title: "各言語特有っぽい構文: Swift"
date: 2025-12-08 00:00:00
topics:
  - Swift
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 8日目の記事です。


```swift
// Swift - guard + where句 + オプショナルチェーン
func binarySearch<T: Comparable>(_ arr: [T], target: T) -> Int? {
    var (left, right) = (0, arr.count - 1)

    while left <= right {
        let mid = (left + right) >> 1

        switch arr[mid] {
        case let x where x == target: return mid
        case let x where x < target: left = mid + 1
        default: right = mid - 1
        }
    }
    return nil
}

let arr = [1, 3, 5, 7, 9]
print(binarySearch(arr, target: 5) ?? -1)  // 2
```

## ピックアップ構文

### guard文
```swift
// 早期リターンで条件を明示
func process(_ value: Int?) {
    guard let value = value else { return }
    guard value > 0 else { return }
    // valueは非オプショナルとして使える
    print(value)
}

// 複数条件
guard let x = optX, let y = optY, x > y else {
    return
}
```

### switch + where句
```swift
// パターンマッチングと条件の組み合わせ
switch value {
case let x where x < 0: print("negative")
case 0: print("zero")
case let x where x > 0: print("positive")
default: break
}

// タプルマッチ
switch (x, y) {
case (0, 0): print("origin")
case (_, 0): print("on x-axis")
case (0, _): print("on y-axis")
case let (x, y) where x == y: print("diagonal")
default: print("other")
}
```

### オプショナル
```swift
// ?で宣言、!で強制アンラップ
var name: String? = nil
name = "Alice"
print(name!)  // 強制アンラップ

// オプショナルバインディング
if let name = name {
    print(name)
}

// オプショナルチェーン
let length = user?.profile?.name?.count

// nil合体演算子
let displayName = name ?? "anonymous"
```

### タプルと分解
```swift
// 複数の値を返す
func minMax(_ arr: [Int]) -> (min: Int, max: Int)? {
    guard let first = arr.first else { return nil }
    return arr.reduce((first, first)) { ($0.0.min($1), $0.1.max($1)) }
}

// 分解代入
let (min, max) = minMax([1, 2, 3])!
var (left, right) = (0, arr.count - 1)
```

### Trailing Closures
```swift
// 最後の引数がクロージャの場合、外に出せる
arr.filter { $0 > 0 }
    .map { $0 * 2 }
    .forEach { print($0) }

// 複数のトレイリングクロージャ
UIView.animate(withDuration: 0.3) {
    view.alpha = 0
} completion: { _ in
    view.removeFromSuperview()
}
```

### $0, $1 (暗黙の引数名)
```swift
// クロージャの引数を省略
let doubled = arr.map { $0 * 2 }
let sum = arr.reduce(0) { $0 + $1 }
let sorted = arr.sorted { $0 > $1 }
```

### defer
```swift
// スコープ終了時に必ず実行される
func readFile() {
    let file = open("data.txt")
    defer { close(file) }  // 関数終了時に実行

    guard let content = read(file) else { return }  // ここでもdefer実行
    process(content)
}

// 複数のdeferは逆順で実行
defer { print("1") }
defer { print("2") }  // 出力: 2, 1
```

### willSet / didSet (プロパティオブザーバー)
```swift
var score: Int = 0 {
    willSet { print("変更前: \(score) → \(newValue)") }
    didSet { print("変更後: \(oldValue) → \(score)") }
}

// didSetでの値の検証
var percentage: Int = 0 {
    didSet { percentage = min(100, max(0, percentage)) }
}
```

### KeyPath \.
```swift
// プロパティへの参照をファーストクラスで扱う
let names = users.map(\.name)  // users.map { $0.name } と同じ
let sorted = users.sorted(by: \.age)

// 動的なプロパティアクセス
struct User { var name: String; var age: Int }
let keyPath: KeyPath<User, String> = \.name
print(user[keyPath: keyPath])
```

### some / any (不透明型・存在型)
```swift
// some: 具体的な型を隠蔽（コンパイラは型を知っている）
func makeShape() -> some Shape { Circle() }

// any: 存在型（異なる型を混在可能）
var shapes: [any Shape] = [Circle(), Rectangle()]

// SwiftUIでの典型的な使用
var body: some View {
    Text("Hello")
}
```

### @resultBuilder (DSLビルダー)
```swift
// SwiftUIのView構築で使用
var body: some View {
    VStack {
        Text("Hello")
        Text("World")
        if showButton {
            Button("Tap") { }
        }
    }  // 配列でもクロージャでもない宣言的構文
}
```
