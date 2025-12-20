---
title: "各言語特有っぽい構文: Racket"
date: 2025-12-19 00:00:00
topics:
  - Racket
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 19日目の記事です。

個人的な好みを交えて紹介します。


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

## ピックアップ構文

### match（パターンマッチング）
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

### マクロ
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

### 名前付きlet
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

### 継続
```racket
;; call/cc (call-with-current-continuation)
(define (find-first pred lst)
  (call/cc
   (λ (return)
     (for-each (λ (x) (when (pred x) (return x))) lst)
     #f)))

(find-first even? '(1 3 5 6 7))  ;; 6

;; 早期リターン
(define (search arr target)
  (call/cc
   (λ (return)
     (for ([i (in-range (vector-length arr))])
       (when (= (vector-ref arr i) target)
         (return i)))
     -1)))
```

### コントラクト
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

### シーケンス
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
