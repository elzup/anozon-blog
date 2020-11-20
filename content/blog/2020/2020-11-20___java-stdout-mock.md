---
title: java で標準出力を文字列として取得する
date: 2020-11-20 17:00:00
tags:
  - java
---

以前書いた、
[java で標準出力を一旦オフにする \| あのぞんブログ](https://blog.anozon.me/java-stdout-null)

から発展して出力の受け取り方です。

[Repl\.it \- StdOutToStr](https://repl.it/@anozon/StdOutToStr)

## コード

```java
import java.io.*;
import java.util.*;

class Main {
  public static void main(String[] args) {
    PrintStream stdout = System.out;
    ByteArrayOutputStream bos = new ByteArrayOutputStream();
    PrintStream ps = new PrintStream(bos);
    System.out.println("before System.setOut(ps)");
    System.setOut(ps);

    System.out.println("no print");
    System.out.println("no print");

    System.setOut(stdout);
    System.out.println("after System.setOut(stdout)");
    System.out.println("print");
    System.out.println("print");

    System.out.println("bos.toString()");
    System.out.println(bos.toString());
  }
}
```

```shell
before System.setOut(ps)
after System.setOut(stdout)
print
print
bos.toString()
no print
no print
```
