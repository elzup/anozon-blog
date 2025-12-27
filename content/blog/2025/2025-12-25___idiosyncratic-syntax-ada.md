---
title: '各言語特有っぽい構文: Ada'
date: 2025-12-25 00:00:00
topics:
  - Ada
  - プログラミング言語
type: tech
published: true
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 25 日目の記事です。

個人的な好みを交えて紹介します。

二分探索のサンプルコード

言語の特徴をあえて使い実装している。

```ada
-- binary_search.ads (仕様)
package Binary_Search_Pkg is
   type Index_Type is range 1 .. 1000;
   type Result_Type is range -1 .. 1000;  -- -1は見つからない
   type Int_Array is array (Index_Type range <>) of Integer;

   function Binary_Search (Arr : Int_Array; Target : Integer) return Result_Type
      with Pre  => Arr'Length > 0,
           Post => Binary_Search'Result = -1 or else
                   Arr(Index_Type(Binary_Search'Result)) = Target;
end Binary_Search_Pkg;

-- binary_search.adb (本体)
package body Binary_Search_Pkg is
   function Binary_Search (Arr : Int_Array; Target : Integer) return Result_Type is
      Left  : Index_Type := Arr'First;
      Right : Index_Type := Arr'Last;
      Mid   : Index_Type;
   begin
      while Left <= Right loop
         Mid := (Left + Right) / 2;
         if Arr(Mid) = Target then
            return Result_Type(Mid);
         elsif Arr(Mid) < Target then
            Left := Mid + 1;
         else
            exit when Mid = Index_Type'First;
            Right := Mid - 1;
         end if;
      end loop;
      return -1;
   end Binary_Search;
end Binary_Search_Pkg;
```

航空宇宙・防衛・鉄道など高信頼性が求められる分野で使われる言語。

## ピックアップ構文

### 範囲型 (Range Types)

変数の取りうる値の範囲を型として定義できる。

```ada
-- 独自の範囲型
type Percentage is range 0 .. 100;
type Month is range 1 .. 12;
type Temperature is range -40 .. 50;

-- 使用時に範囲チェック
P : Percentage := 50;   -- OK
P := 101;               -- 実行時エラー！

-- 派生型
type Age is new Integer range 0 .. 150;
type Score is new Float range 0.0 .. 100.0;
```

コンパイル時・実行時に範囲チェックされる。バグの早期発見に有効。

### 固定小数点型・モジュラー型

浮動小数点の誤差を避けたい場面やビット演算向けの型。

```ada
-- 固定小数点型（組み込み・金融向け）
type Voltage is delta 0.001 range 0.0 .. 5.0;  -- 0.001刻み
type Money is delta 0.01 digits 10;            -- 小数2桁、10桁精度

-- モジュラー型（オーバーフローでラップ）
type Byte is mod 256;     -- 0..255、256で0に戻る
type Word is mod 2**16;
```

step (刻み幅)まで指定できる。

### 属性 (Attributes)

型や変数に対して `'` でメタ情報を取得できる。

```ada
-- 配列属性
Arr'First        -- 最初のインデックス
Arr'Last         -- 最後のインデックス
Arr'Length       -- 長さ
Arr'Range        -- インデックス範囲

-- 型属性
Integer'First    -- 最小値
Integer'Last     -- 最大値
Integer'Image(X) -- 文字列変換
Integer'Value(S) -- 文字列から変換

-- 列挙型属性
type Day is (Mon, Tue, Wed, Thu, Fri, Sat, Sun);
Day'First        -- Mon
Day'Succ(Mon)    -- Tue (次の値)
Day'Pred(Wed)    -- Tue (前の値)
Day'Pos(Wed)     -- 2 (位置)
```

リフレクション的な機能を `'` 記法で提供。`'Image` や `'Range` は頻出。

### パッケージ (Packages)

仕様部 (specification) と本体 (body) を分離して定義する。

```ada
-- math_utils.ads (仕様)
package Math_Utils is
   function Add (A, B : Integer) return Integer;
   function Multiply (A, B : Integer) return Integer;
private
   -- 非公開部分
   Secret_Value : constant := 42;
end Math_Utils;

-- math_utils.adb (本体)
package body Math_Utils is
   function Add (A, B : Integer) return Integer is
   begin
      return A + B;
   end Add;

   function Multiply (A, B : Integer) return Integer is
   begin
      return A * B;
   end Multiply;
end Math_Utils;
```

ヘッダファイルと実装ファイルの分離に似ているが、より厳密。

### タスク (Tasks)

並行処理を言語機能として組み込み。ランデブー（待ち合わせ）で双方向データ交換ができる。

```ada
task Calculator is
   entry Compute(X : in Integer; Result : out Integer);
end Calculator;

task body Calculator is
begin
   accept Compute(X : in Integer; Result : out Integer) do
      Result := X * 2;  -- ランデブー中に処理・返却
   end Compute;
end Calculator;

declare
   Answer : Integer;
begin
   Calculator.Compute(X => 21, Result => Answer);
   Put_Line(Integer'Image(Answer));  -- 42
end;
```

別々に走り、待ち合わせを行うタスクを定義できるというユニークなもの。
Generator + Promise とも違い、並行処理のモデルが独特。

### 契約プログラミング (Ada 2012+)

事前条件・事後条件を宣言的に記述できる。

```ada
function Divide (A, B : Integer) return Integer
   with Pre  => B /= 0,                    -- 事前条件
        Post => Divide'Result * B <= A;    -- 事後条件

type Stack is private
   with Type_Invariant => Size (Stack) <= Max_Size;  -- 不変条件

procedure Push (S : in out Stack; Value : Integer)
   with Pre  => not Is_Full (S),
        Post => Size (S) = Size (S'Old) + 1;
```

安全性重視なのに副作用を許すのは意外だが、ハードウェア制御では純粋関数は現実的でない。  
代わりに契約で副作用を追跡可能にしている。

### 名前付き終端 (Named End Tags)

ブロックの終わりに名前を繰り返して対応を明示できる。
推奨されているスタイル。

```ada
package Math_Utils is
   ...
end Math_Utils;  -- 名前を繰り返す

function Calc return Integer is
begin
   ...
end Calc;
```

安全性へのこだわりを感じる。

### 名前付きパラメータ

引数を名前で指定でき、順番を変えても呼び出せる。

```ada
procedure Greet (Name : String; Age : Integer; Greeting : String := "Hello") is
begin
   Put_Line (Greeting & ", " & Name & "! Age:" & Integer'Image(Age));
end Greet;

-- 呼び出し方
Greet ("Alice", 30, "Hi");              -- 位置指定
Greet (Name => "Bob", Age => 25);       -- 名前指定
Greet (30, Name => "Carol");           -- 順番変更, 混在OK
```
