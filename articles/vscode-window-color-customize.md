---
title: (プロジェクト毎に) VS Code の Window に色をつける
date: 2021-07-18 23:00:00
topics:
  - VSCode
type: tech
published: true
---

VS Code のテーマを変えました。
[Cyberpunk 2077 rebuild \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Carlos18mz.cyberpunk-2077-rebuild)

ついでに、プロジェクトごとにウィンドウ色を変える設定のメモです。

`Version: 1.58.2`

## サンプル

こんな感じで色が付きます。

![](https://elzup-image-storage.s3.amazonaws.com/blog/window-color-config.png)
プロジェクト(Workspace)毎の設定(テキストモード)は、設定画面からオレンジ枠部分を押していくと開けます。

## プロパティ

Title Bar, Activity Bar をそれぞれ変えます。
inactive の設定がミソです。

```
{
  "workbench.colorCustomizations": {
    "window.activeBorder":"#2B0065",
    "window.inactiveBorder":"#2B0065",
    "titleBar.activeBackground": "#2B0065",
    "titleBar.inactiveBackground": "#2B0065",
    "titleBar.activeForeground": "#ffffff",
    "titleBar.inactiveForeground": "#aaaaaa",

    "activityBar.background": "#2B0065",
    "activityBar.border": "#cea9ff",
    "activityBar.foreground": "#ffffff",
    "activityBar.inactiveForeground": "#ffffff",
  },
}
```
