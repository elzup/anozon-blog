---
title: MacOS Big Sur と VSCode で C# 開発メモ
date: 2021-07-29 11:00:00
tags:
  - C#
  - .NET
  - Cloud Function
  - GCP
type: tech
published: true
---

## VSCode の設定

Plugin は最低限とりあえずこれだけ入れました。
[C\# \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)

```json
{
  "[csharp]": {
    "editor.defaultFormatter": "ms-dotnettools.csharp"
  },
  "omnisharp.useEditorFormattingSettings": true,
  "csharp.format.enable": true
}
```

型補完やフォーマットができるようになります。

## Cloud Function の開発

[最初の関数: \.NET  \|  Google Cloud Functions に関するドキュメント](https://cloud.google.com/functions/docs/first-dotnet?hl=ja)

ここの通りに進めました。

.NET 5.0 だけだと以下のエラーで動きませんでした。

```
It was not possible to find any compatible framework version
The framework 'Microsoft.AspNetCore.App', version '3.1.0' was not found.
  - The following frameworks were found:
      5.0.8 at [/usr/local/share/dotnet/shared/Microsoft.AspNetCore.App]
The .NET 3.1.40x SDKs require version 16.7 of MSBuild.

You can resolve the problem by installing the specified framework and/or SDK.

The specified framework can be found at:
  - https://aka.ms/dotnet-core-applaunch?framework=Microsoft.AspNetCore.App&framework_version=3.1.0&arch=x64&rid=osx.11.0-x64
```

(GCP のドキュメントにも実は書いてあったのですが、) リンク先から`.NET Core 3.1 SDK`を探してインストールしましたら動きました。

### VSCode の追加設定

[C\# \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)

リンクの `Note about using .NET Core 3.1.40x SDKs` にあるように `useGlobalMono never` 設定します。

```json
{
  "omnisharp.useGlobalMono": "never"
}
```
