---
title: java で標準出力を一旦オフにする
date: 2020-11-04 11:00:00
topics:
  - Java
type: tech
published: true
---

java で標準出力を一時的にオフにする方法です。

[Repl\.it \- StdOutToNull](https://repl.it/@anozon/StdOutToNull#Main.java)

## コード

```java
import java.io.*;
import java.util.*;

class Main {
  public static void main(String[] args) {
    PrintStream stdout = System.out;

    System.setOut(new PrintStream(new OutputStream() {
      public void write(int b) { /* noop */ }
    }));
    System.out.println("no print");
    System.out.println("no print");

    System.setOut(stdout);
    System.out.println("print");
    System.out.println("print");
  }
}
```

```shell
print
print
```

`System.setOut` で "デフォルトの出力" と "何もしない OutputStream" を切り替えています。

## snippet

Snippet 部分のみコード。

```java
PrintStream stdout = System.out;
System.setOut(new PrintStream(new OutputStream() {
  public void write(int b) { /* noop */ }
}));
// out off

System.setOut(stdout);
// out on
```
