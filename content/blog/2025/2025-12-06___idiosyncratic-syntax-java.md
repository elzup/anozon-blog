---
title: "各言語特有っぽい構文: Java"
date: 2025-12-06 00:00:00
topics:
  - Java
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 6日目の記事です。


```java
// Java - ジェネリクス + Optional + Stream
import java.util.*;
import java.util.function.*;

public class BinarySearch {
    public static <T extends Comparable<T>> OptionalInt binarySearch(List<T> arr, T target) {
        int left = 0, right = arr.size() - 1;

        while (left <= right) {
            int mid = (left + right) >>> 1;
            int cmp = arr.get(mid).compareTo(target);

            switch (cmp) {
                case 0 -> { return OptionalInt.of(mid); }
                default -> {
                    var pair = cmp < 0
                        ? new int[]{mid + 1, right}
                        : new int[]{left, mid - 1};
                    left = pair[0];
                    right = pair[1];
                }
            }
        }
        return OptionalInt.empty();
    }

    public static void main(String[] args) {
        var arr = List.of(1, 3, 5, 7, 9);
        System.out.println(binarySearch(arr, 5).orElse(-1));  // 2
    }
}
```

## ピックアップ構文

### var（ローカル変数型推論）
```java
// Java 10+
var list = new ArrayList<String>();
var map = Map.of("key", "value");

// ラムダのパラメータにも使える (Java 11+)
list.forEach((var item) -> System.out.println(item));
```

### switch式 (Java 14+)
```java
// 式として値を返せる
String result = switch (day) {
    case MONDAY, FRIDAY -> "work";
    case SATURDAY, SUNDAY -> "rest";
    default -> "unknown";
};

// yield で値を返す
int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY -> 7;
    default -> {
        String s = day.toString();
        yield s.length();
    }
};
```

### Optional
```java
// null安全な値のラッパー
Optional<String> opt = Optional.ofNullable(getValue());

opt.ifPresent(v -> System.out.println(v));
String value = opt.orElse("default");
String result = opt.map(String::toUpperCase).orElse("");

// OptionalInt, OptionalLong, OptionalDouble
OptionalInt.of(42).orElse(-1);
```

### Stream API
```java
// 関数型スタイルのコレクション処理
List<Integer> doubled = list.stream()
    .filter(x -> x > 0)
    .map(x -> x * 2)
    .collect(Collectors.toList());

// 並列処理
list.parallelStream()
    .forEach(System.out::println);
```

### メソッド参照 `::`
```java
// ラムダの省略形
list.forEach(System.out::println);

// 同等のラムダ
list.forEach(x -> System.out.println(x));

// コンストラクタ参照
list.stream().map(String::new);
```

### 関数型インターフェース (SAM変換)
```java
// 抽象メソッドが1つのインターフェースはラムダで書ける
@FunctionalInterface
interface Calculator {
    int calc(int a, int b);
}

// 従来の匿名クラス
Calculator add1 = new Calculator() {
    @Override
    public int calc(int a, int b) { return a + b; }
};

// ラムダで省略
Calculator add2 = (a, b) -> a + b;

// 標準の関数型インターフェース
Function<String, Integer> len = s -> s.length();
Predicate<Integer> isEven = n -> n % 2 == 0;
Consumer<String> printer = s -> System.out.println(s);
Supplier<Double> random = () -> Math.random();
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Comparator もラムダで
List<String> names = Arrays.asList("Bob", "Alice", "Charlie");
names.sort((a, b) -> a.length() - b.length());
// メソッド参照でさらに短く
names.sort(Comparator.comparingInt(String::length));

// Runnable, Callable
Runnable task = () -> System.out.println("Hello");
Callable<Integer> compute = () -> 42;
```

### Record (Java 16+)
```java
// イミュータブルなデータクラス
record Point(int x, int y) {}

var p = new Point(1, 2);
System.out.println(p.x());  // 1

// Record 内に main を書ける
record App(String name) {
    public static void main(String[] args) {
        var app = new App("MyApp");
        System.out.println(app.name());
    }
}

// コンパクトコンストラクタ（バリデーション）
record Range(int start, int end) {
    Range {  // 引数・代入を省略できる
        if (start > end) throw new IllegalArgumentException();
    }
}

// メソッド追加も可能
record Rectangle(int width, int height) {
    int area() { return width * height; }
}

// パターンマッチング (Java 21+)
Object obj = new Point(3, 4);
if (obj instanceof Point(int x, int y)) {
    System.out.println(x + y);  // 7
}
```

### スクリプトモード (Java 21+)

```java
// Unnamed Classes - クラス宣言不要
// ファイル名: hello.java
void main() {
    System.out.println("Hello, World!");
}

// 実行: java hello.java

// トップレベルに変数・メソッドを書ける
String greeting = "Hello";

String greet(String name) {
    return greeting + ", " + name + "!";
}

void main() {
    System.out.println(greet("Java"));
}
```
