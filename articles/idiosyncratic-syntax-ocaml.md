---
title: "各言語特有っぽい構文: OCaml"
date: 2025-12-15 00:00:00
topics:
  - OCaml
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 15日目の記事です。

個人的な好みを交えて紹介します。


```ocaml
(* OCaml - パターンマッチ + パイプ演算子 + オプション型 *)
let binary_search arr target =
  let rec go left right =
    if left > right then None
    else
      let mid = (left + right) / 2 in
      match compare arr.(mid) target with
      | 0 -> Some mid
      | n when n < 0 -> go (mid + 1) right
      | _ -> go left (mid - 1)
  in
  go 0 (Array.length arr - 1)

let () =
  [|1; 3; 5; 7; 9|]
  |> fun arr -> binary_search arr 5
  |> Option.value ~default:(-1)
  |> print_int  (* 2 *)
```

## ピックアップ構文

### パターンマッチング
```ocaml
(* match式 *)
let describe = function
  | 0 -> "zero"
  | 1 -> "one"
  | n when n < 0 -> "negative"
  | _ -> "other"

(* リストパターン *)
let rec sum = function
  | [] -> 0
  | x :: xs -> x + sum xs

(* タプルパターン *)
let fst (x, _) = x
```

### パイプ演算子 `|>`
```ocaml
(* 左から右へデータを流す *)
[1; 2; 3; 4; 5]
|> List.filter (fun x -> x mod 2 = 0)
|> List.map (fun x -> x * 2)
|> List.fold_left (+) 0  (* 12 *)

(* 関数適用の逆順 *)
x |> f |> g  (* = g (f x) *)
```

### オプション型
```ocaml
(* Some または None *)
let safe_div a b =
  if b = 0 then None else Some (a / b)

(* パターンマッチで処理 *)
match safe_div 10 2 with
| Some x -> print_int x
| None -> print_string "error"

(* Option モジュール *)
Option.map (fun x -> x * 2) (Some 5)  (* Some 10 *)
Option.value ~default:0 (Some 5)      (* 5 *)
Option.bind (Some 5) (fun x -> Some (x * 2))
```

### ラベル付き引数とオプション引数
```ocaml
(* ラベル付き引数 ~name *)
let greet ~name ~greeting = greeting ^ ", " ^ name ^ "!"
let _ = greet ~name:"Alice" ~greeting:"Hello"

(* オプション引数 ?name *)
let greet ?(greeting="Hello") name = greeting ^ ", " ^ name ^ "!"
let _ = greet "Alice"              (* "Hello, Alice!" *)
let _ = greet ~greeting:"Hi" "Bob" (* "Hi, Bob!" *)
```

### let式とlet-in
```ocaml
(* ローカルバインディング *)
let x = 1 in
let y = 2 in
x + y

(* 再帰関数 *)
let rec factorial n =
  if n <= 1 then 1 else n * factorial (n - 1)

(* 相互再帰 *)
let rec even n = n = 0 || odd (n - 1)
and odd n = n <> 0 && even (n - 1)
```

### ファンクタ
```ocaml
(* モジュールを引数に取るモジュール *)
module type OrderedType = sig
  type t
  val compare : t -> t -> int
end

module MakeSet (Ord : OrderedType) = struct
  type elt = Ord.t
  type t = elt list
  let empty = []
  let add x s = x :: s
end

module IntSet = MakeSet(Int)
```
