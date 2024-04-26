---
title: 曜日によってVSCodeのテーマを変える
date: 2024-04-26 09:00:00
topics:
  - VSCode
  - ShellScript
type: tech
published: true
emoji: 🌈
---

曜日によって気分を切り替えるために VSCode のテーマを変える方法を考えました。

## 方法

VSCode の設定ファイル `setting.json` に以下のように設定を書きます。

```json5
{
  // "workbench.colorTheme": "Fluffy Dark Theme",            // @theme-auto-change Mon
  // "workbench.colorTheme": "Amethyst Dark",                // @theme-auto-change Tue
  // "workbench.colorTheme": "Abyss",                        // @theme-auto-change Wed
  // "workbench.colorTheme": "Fluffy Dark Theme",            // @theme-auto-change Thu
  'workbench.colorTheme': 'GitHub Dark Default', // @theme-auto-change Fri
  // "workbench.colorTheme": "Hackpot Batman vs Joker Dark", // @theme-auto-change Sat
  // "workbench.colorTheme": "Hackpot Darker Knight",        // @theme-auto-change Sun
  // "workbench.colorTheme": "Hackpot Garden Of Atlantis",
}
```

以下のスクリプトを実行すると、今日の曜日に合わせてコメントアウトされているテーマの設定を有効にします。  
変数 `$HOME/Library/Application Support/Code/User/settings.json` は OS によって変えてください。

```sh
#!/usr/bin/env bash

FILE_PATH="$HOME/Library/Application Support/Code/User/settings.json"
# FILE_PATH="./vscode/test.json5.txt"
today=$(LC_TIME=en_US.UTF-8 date +%a)

# comment out all @theme-auto-change config
sed -i '' -E 's/^[[:space:]]*([^/][^/]*)("workbench.colorTheme": ".*@theme-auto-change)/\/\/ \2/' "$FILE_PATH"
# enabled todays theme
sed -i '' -E 's/^([[:space:]]*)\/\/([[:space:]]*"workbench.colorTheme": ".*",.*@theme-auto-change '$today'.*)/\1\2/' "$FILE_PATH"
```

コード: https://github.com/elzup/kit-sh/blob/main/vscode/change_vscode_theme.sh

## 各 OS で毎日実行する

省略します。Mac の場合 crontab か ショートカット.app、launchd 登録で可能です。  
ChatGPT: https://chat.openai.com/share/67d7f585-83b8-4583-8ead-1172c71acc3d
