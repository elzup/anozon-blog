---
title: component から props の型を取得する
date: 2021-07-05 11:00:00
tags:
  - React
  - TypeScript
type: tech
published: true
---

Storybook で props 型が必要だけど export したくなかったので。

### 方法 1

```ts
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof TargetComponent>
```

### 方法 2(古い)

```ts
type Props = Parameters<typeof TargetComponent>[0]
```
