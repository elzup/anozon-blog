---
title: '各言語特有っぽい構文: Clojure'
date: 2025-12-18 00:00:00
topics:
  - Clojure
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 18 日目の記事です。

個人的な好みを交えて紹介します。
Clojure は勉強中なので、入門的な内容です。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。

```clojure
;; Clojure - スレッディングマクロ + 分配束縛 + 遅延シーケンス
(defn binary-search [arr target]
  (loop [left 0
         right (dec (count arr))]
    (when (<= left right)
      (let [mid (quot (+ left right) 2)
            value (nth arr mid)]
        (cond
          (= value target) mid
          (< value target) (recur (inc mid) right)
          :else (recur left (dec mid)))))))

(-> (binary-search [1 3 5 7 9] 5)
    (or -1)
    println)  ;; 2
```

すべてをリスト構文で表現するのが Lisp 系言語の特徴。

## ピックアップ構文

### スレッディングマクロ

関数呼び出しを連鎖させて、データの変換パイプラインを構築できる。

```clojure
;; -> スレッドファースト（第一引数に挿入）
(-> "hello"
    clojure.string/upper-case
    (clojure.string/replace "L" "X"))
;; "HEXXO"

;; ->> スレッドラスト（最後の引数に挿入）
(->> (range 10)
     (filter even?)
     (map #(* % 2))
     (reduce +))
;; 40

;; some-> nilセーフ
(some-> user :address :city clojure.string/upper-case)
```

両方あるの便利。

### 分配束縛 (Destructuring)

データ構造を分解して複数の変数に同時に束縛できる。

```clojure
;; 基本の束縛
(let [x 1 y 2] (+ x y))  ;; 3

;; ベクタの分配
(let [[a b & rest] [1 2 3 4 5]]
  {:a a :b b :rest rest})
;; {:a 1, :b 2, :rest (3 4 5)}

;; マップの分配
(let [{:keys [name age]} {:name "Alice" :age 30}]
  (str name " is " age))
;; "Alice is 30"
;; (let [{name :name age :age} {:name "Alice" :age 30}] と同等

;; デフォルト値
(let [{:keys [x y] :or {x 0 y 0}} {:x 5}]
  [x y])
;; [5 0]
```

JavaScript とコロンの位置もエイリアス指定も逆になる。  
js: `(({ name: n, age: a }) => {})({ name: "Alice", age: 30 })`  
clojure: `(let [{ n :name a :age} {:name "Alice" :age 30}] )`

### 遅延シーケンス

必要になるまで評価されない遅延評価のシーケンスを扱える。

```clojure
;; 無限シーケンス
(def naturals (iterate inc 0))
(take 5 naturals)  ;; (0 1 2 3 4)

;; lazy-seq
(defn fib-seq
  ([] (fib-seq 0 1))
  ([a b] (lazy-seq (cons a (fib-seq b (+ a b))))))

(take 10 (fib-seq))  ;; (0 1 1 2 3 5 8 13 21 34)
```

### マルチメソッド

ディスパッチ関数の結果に応じて異なる実装を選択できるポリモーフィズム。

```clojure
;; ディスパッチ関数で振り分け
(defmulti area :shape)

(defmethod area :circle [{:keys [radius]}]
  (* Math/PI radius radius))

(defmethod area :rectangle [{:keys [width height]}]
  (* width height))

(area {:shape :circle :radius 5})     ;; 78.54...
(area {:shape :rectangle :width 3 :height 4})  ;; 12
```

### アトム（状態管理）

イミュータブルなデータを保持しつつ、アトミックに状態を更新できる。

```clojure
;; イミュータブルな状態管理
(def counter (atom 0))

@counter          ;; 0 (deref)
(swap! counter inc)   ;; 1
(reset! counter 10)   ;; 10

;; トランザクション
(swap! counter #(+ % 5))  ;; 15
```

### 無名関数の短縮形

#()と%を使って無名関数を簡潔に記述できる。

```clojure
;; #() と % で無名関数
#(+ % 1)           ;; (fn [x] (+ x 1))
#(+ %1 %2)         ;; (fn [x y] (+ x y))
#(apply + %&)      ;; 可変引数

(map #(* % 2) [1 2 3])  ;; (2 4 6)
```
