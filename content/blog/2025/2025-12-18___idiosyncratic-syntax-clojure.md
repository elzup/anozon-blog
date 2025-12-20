---
title: "各言語特有っぽい構文: Clojure"
date: 2025-12-18 00:00:00
topics:
  - Clojure
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 18日目の記事です。


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

(->> [1 3 5 7 9]
     (#(binary-search % 5))
     (or -1)
     println)  ;; 2
```

## ピックアップ構文

### スレッディングマクロ
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

### 分配束縛 (Destructuring)
```clojure
;; ベクタの分配
(let [[a b & rest] [1 2 3 4 5]]
  {:a a :b b :rest rest})
;; {:a 1, :b 2, :rest (3 4 5)}

;; マップの分配
(let [{:keys [name age]} {:name "Alice" :age 30}]
  (str name " is " age))
;; "Alice is 30"

;; デフォルト値
(let [{:keys [x y] :or {x 0 y 0}} {:x 5}]
  [x y])
;; [5 0]
```

### 遅延シーケンス
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
```clojure
;; #() と % で無名関数
#(+ % 1)           ;; (fn [x] (+ x 1))
#(+ %1 %2)         ;; (fn [x y] (+ x y))
#(apply + %&)      ;; 可変引数

(map #(* % 2) [1 2 3])  ;; (2 4 6)
```
