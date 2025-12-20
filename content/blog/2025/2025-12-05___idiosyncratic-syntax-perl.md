---
title: "各言語特有っぽい構文: Perl"
date: 2025-12-05 00:00:00
topics:
  - Perl
  - プログラミング言語
type: tech
published: false
emoji: 🔡
---

この記事は[プログラミング言語の特有構文 Advent Calendar 2025](https://adventar.org/calendars/12640) 5日目の記事です。

個人的な好みを交えて紹介します。


```perl
# Perl - 正規表現 + 特殊変数 + wantarray
sub binary_search {
    my ($arr, $target) = @_;
    my ($left, $right) = (0, $#$arr);

    while ($left <= $right) {
        my $mid = int(($left + $right) / 2);
        given ($arr->[$mid] <=> $target) {
            when (0)  { return $mid }
            when (-1) { $left = $mid + 1 }
            when (1)  { $right = $mid - 1 }
        }
    }
    return -1;
}

my @arr = (1, 3, 5, 7, 9);
print binary_search(\@arr, 5);  # 2
```

## ピックアップ構文

### 特殊変数
```perl
# 配列の最後のインデックス
$#arr        # @arr の最後のインデックス
$#$arr_ref   # リファレンス経由

# デフォルト変数 $_
@doubled = map { $_ * 2 } @arr;
print for @arr;  # 各要素を出力

# 正規表現マッチ結果
if ($str =~ /(\d+)-(\d+)/) {
    print "$1 to $2";  # $1, $2 はキャプチャグループ
}
```

### リファレンスとデリファレンス
```perl
# リファレンス作成
my $arr_ref = \@arr;
my $hash_ref = \%hash;

# デリファレンス
@{$arr_ref}      # 配列として
$arr_ref->[$i]   # アロー記法

# 無名配列/ハッシュ
my $arr = [1, 2, 3];
my $hash = { key => 'value' };
```

### 宇宙船演算子 `<=>`
```perl
# 数値比較: -1, 0, 1 を返す
5 <=> 3   # 1
3 <=> 5   # -1

# 文字列版
"abc" cmp "def"  # -1

# ソートで活用
@sorted = sort { $a <=> $b } @arr;  # 数値昇順
@sorted = sort { $b <=> $a } @arr;  # 数値降順
```

### given-when (switch文)
```perl
use feature 'switch';

given ($value) {
    when (1)     { say "one" }
    when ([2,3]) { say "two or three" }
    when (/^\d+$/) { say "number" }
    default      { say "other" }
}
```

### 文脈依存の戻り値
```perl
sub get_data {
    my @data = (1, 2, 3);
    return wantarray ? @data : scalar @data;
}

my @arr = get_data();  # (1, 2, 3)
my $count = get_data();  # 3
```
