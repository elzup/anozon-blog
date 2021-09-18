---
title: Mac の launchctl 毎朝で読むページを自動で開かせる
date: 2020-02-08 13:00:00
topics:
  - launchd
  - Mac
type: tech
published: true
---

毎朝チェックしたいページがあるのですが、毎日開くのは面倒です。
この記事では毎朝読むページを自動で開かせる方法について紹介します。

```toc

```

## スクリプトを準備する

コード: [add morning newspaper · elzup/Brewfile@eb690e2](https://github.com/elzup/Brewfile/commit/eb690e2c127958b3b616c7550f4f37fc81c1dc22)

シェルスクリプトファイルを書きます。
4 つのページを開きたいので `open` コマンドで記述します。

```sh:title=morning-newspaper.sh
open "https://github.com/trending/javascript?since=daily"
open "https://github.com/trending/typescript?since=daily"
open "https://twitter.com/javascriptdaily"
open "https://twitter.com/i/lists/1072318038316244992"
```

## plist ファイルを準備する

7:00 に実行させます。

作業ディレクトリは `/Users/hiro/Brewfile` ここにある例です。

```xml:title=morning-newspaper.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
    <key>Label</key><string>morning-newspaper</string>
    <key>ProgramArguments</key>
    <array>
      <string>/Users/hiro/Brewfile/morning-newspaper/morning-newspaper.sh</string>  // highlight-line
    </array>
    <key>UserName</key><string>hiro</string>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key><integer>07</integer> // highlight-line
        <key>Minute</key><integer>00</integer> // highlight-line
    </dict>
    <key>StandardOutPath</key>
    <string>/dev/null</string>
</dict></plist>
```

## launchctl で登録する

```sh
# /Library/LaunchAgents/ に移動
$ cp morning-newspaper/morning-newspaper.plist ~/Library/LaunchAgents/com.elzup.morning-newspaper.plist

# 登録
$ launchctl load ~/Library/LaunchAgents/com.elzup.morning-newspaper.plist

# 登録できてるか確認
$ launchctl list |grep "morning"
-	0	morning-newspaper
```
