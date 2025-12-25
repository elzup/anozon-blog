---
title: '各言語特有っぽい構文: Racket'
date: 2025-12-19 00:00:00
topics:
  - Racket
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 19 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。

```racket
#lang racket

;; Racket - マクロ + パターンマッチ + 継続
(define (binary-search arr target)
  (let loop ([left 0]
             [right (sub1 (vector-length arr))])
    (cond
      [(> left right) #f]
      [else
       (define mid (quotient (+ left right) 2))
       (match (vector-ref arr mid)
         [(== target) mid]
         [(? (λ (x) (< x target))) (loop (add1 mid) right)]
         [_ (loop left (sub1 mid))])])))

(displayln (or (binary-search #(1 3 5 7 9) 5) -1))  ;; 2
```

cond や演算子から、 Clojure よりも伝統的な Lisp 系の雰囲気が強い。

## ピックアップ構文

### マクロ

コンパイル時に構文を変換して新しい言語構造を作成できる。Racket のマクロシステムは非常に強力で、新しい言語を作ることも可能。

```racket
;; define-syntax-rule で簡単なマクロ
(define-syntax-rule (swap! a b)
  (let ([tmp a])
    (set! a b)
    (set! b tmp)))

;; syntax-case でより複雑なマクロ
(define-syntax (when stx)
  (syntax-case stx ()
    [(_ test body ...)
     #'(if test (begin body ...) (void))]))

;; パターン変数
(define-syntax-rule (for/sum ([var seq]) body ...)
  (for/fold ([sum 0]) ([var seq])
    (+ sum (begin body ...))))
```

### 継続

「この後の処理」を関数として取り出し、好きなタイミングで呼び出せる。Scheme/Racket 特有の機能。

```racket
;; call/cc (call-with-current-continuation)
(define saved #f)

;; 「□ + 1」の □ に値を入れる処理を k として取り出す
(+ 1 (call/cc (λ (k)
                (set! saved k)  ; k を保存
                10)))           ; → 11（最初は 10 + 1）

;; 保存した k を後から呼ぶ
(saved 100)  ; → 101（100 + 1）
(saved 200)  ; → 201（200 + 1）何度でも呼べる
```

イメージしにくいが特殊な機能。
高階関数ともジェネレーターとも違い、処理の流れ自体を値として保存・再利用できる。

### コントラクト

関数や構造体に型や値の制約を定義して実行時にチェックできる。Racket の標準機能として充実している。

```racket
;; 関数の契約
(define/contract (safe-div a b)
  (-> number? (and/c number? (not/c zero?)) number?)
  (/ a b))

;; 構造体のコントラクト
(struct/contract point
  ([x number?]
   [y number?]))
```

### match（パターンマッチング）

値やデータ構造のパターンに基づいて分岐処理ができる。

```racket
;; 値のマッチ
(match value
  [0 "zero"]
  [(? positive?) "positive"]
  [(? negative?) "negative"])

;; リストパターン
(match lst
  ['() "empty"]
  [(list x) (format "single: ~a" x)]
  [(list x y) (format "pair: ~a, ~a" x y)]
  [(cons x xs) (format "head: ~a, tail: ~a" x xs)])

;; 構造体パターン
(struct point (x y))
(match (point 3 4)
  [(point x y) (sqrt (+ (* x x) (* y y)))])
```

### 名前付き let

let 式に名前を付けて、その名前で再帰的に呼び出せる。Scheme 系に共通の機能。

```racket
;; ループをlet + 再帰で表現
(let loop ([i 0] [sum 0])
  (if (> i 10)
      sum
      (loop (add1 i) (+ sum i))))
;; 55

;; 複数の状態を持つループ
(let loop ([lst '(1 2 3 4 5)]
           [acc '()])
  (match lst
    ['() (reverse acc)]
    [(cons x xs) (loop xs (cons (* x 2) acc))]))
```

### シーケンス

様々なデータ構造を統一的なインターフェースで反復処理できる。

```racket
;; for ループと組み合わせ
(for/list ([x (in-range 5)]
           [y (in-naturals)])
  (cons x y))
;; '((0 . 0) (1 . 1) (2 . 2) (3 . 3) (4 . 4))

;; 様々なシーケンス
(in-range 10)
(in-list '(a b c))
(in-vector #(1 2 3))
(in-string "hello")
```

`for/list` や `for*/list`、zip や 組み合わせ の書き方として独特で面白い。

### λ（ラムダ）

無名関数を作る。`lambda` と同じ意味。

```racket
(lambda (x) (+ x 1))  ; 無名関数
(λ (x) (+ x 1))       ; λ でも OK
```
