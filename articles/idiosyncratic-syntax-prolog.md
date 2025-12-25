---
title: "各言語特有っぽい構文: Prolog"
date: 2025-12-25 00:00:00
topics:
  - Prolog
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 25日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。


```prolog
% Prolog - 宣言的プログラミング + ユニフィケーション + バックトラック
binary_search(List, Target, Index) :-
    length(List, Len),
    Right is Len - 1,
    binary_search(List, Target, 0, Right, Index).

binary_search(List, Target, Left, Right, Mid) :-
    Left =< Right,
    Mid is (Left + Right) // 2,
    nth0(Mid, List, Value),
    (   Value =:= Target
    ->  true
    ;   Value < Target
    ->  NewLeft is Mid + 1,
        binary_search(List, Target, NewLeft, Right, Index),
        Index = Index
    ;   NewRight is Mid - 1,
        binary_search(List, Target, Left, NewRight, Index),
        Index = Index
    ).

% クエリ: binary_search([1, 3, 5, 7, 9], 5, X).
% X = 2
```

## ピックアップ構文

### ユニフィケーション

変数と値、パターンを統一的にマッチングさせる仕組み。

```prolog
% = で構造をマッチ
X = 5.                      % X は 5
[H|T] = [1, 2, 3].          % H = 1, T = [2, 3]
point(X, Y) = point(3, 4).  % X = 3, Y = 4

% パターンマッチング
first([X|_], X).
second([_,X|_], X).

% 同じ変数は同じ値
swap(pair(A, B), pair(B, A)).
```

### バックトラック

自動的に複数の解を探索し、失敗時に前の選択に戻る仕組み。

```prolog
% 複数の解を探索
member(X, [X|_]).
member(X, [_|T]) :- member(X, T).

% ?- member(X, [1, 2, 3]).
% X = 1 ;
% X = 2 ;
% X = 3.

% カット ! でバックトラック停止
max(X, Y, X) :- X >= Y, !.
max(_, Y, Y).
```

### リスト操作

リストのパターンマッチングと基本操作が組み込まれている。

```prolog
% リストパターン
[H|T]                   % 先頭と残り
[A, B|Rest]             % 最初の2要素と残り
[]                      % 空リスト

% 基本操作
append([1,2], [3,4], X).  % X = [1,2,3,4]
length([a,b,c], N).       % N = 3
reverse([1,2,3], X).      % X = [3,2,1]
nth0(1, [a,b,c], X).      % X = b (0始まり)

% リスト内包表記
findall(X, (member(X, [1,2,3,4,5]), X > 2), L).
% L = [3, 4, 5]
```

### 算術評価 `is`

is演算子で算術式を評価し、結果を変数に束縛できる。

```prolog
% is で算術式を評価
X is 3 + 4.             % X = 7
Y is 10 // 3.           % Y = 3 (整数除算)
Z is 2 ** 10.           % Z = 1024

% 算術比較
5 > 3.                  % true
X =:= Y.                % 算術的に等しい
X =\= Y.                % 算術的に異なる
X >= Y.
X =< Y.
```

### DCG (Definite Clause Grammar)

文法規則を宣言的に記述し、パーサーを簡潔に実装できる。

```prolog
% 文法規則の記述
sentence --> noun_phrase, verb_phrase.
noun_phrase --> determiner, noun.
verb_phrase --> verb, noun_phrase.

determiner --> [the].
noun --> [cat] | [dog].
verb --> [chases] | [sees].

% ?- phrase(sentence, [the, cat, chases, the, dog]).
% true
```

### 条件分岐

if-then-else構文や複数節で条件分岐を表現できる。

```prolog
% if-then-else
grade(Score, Grade) :-
    (   Score >= 90
    ->  Grade = 'A'
    ;   Score >= 80
    ->  Grade = 'B'
    ;   Grade = 'C'
    ).

% 同等の複数節
grade(Score, 'A') :- Score >= 90, !.
grade(Score, 'B') :- Score >= 80, !.
grade(_, 'C').
```
