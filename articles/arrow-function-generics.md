---
title: Arrow function で generics にすると HTML タグとして認識されてしまうときの tips
date: 2021-09-02 06:00:00
topics:
  - TypeScript
type: tech
published: true
---

エディタなどによってうまくハイライトされなかったときはこうする。

```tsx
const double = <T>(v: T): [T, T] => [v, v]
const hello = () => <p>Hello</p>
// ↑ハイライトがおかしい
```

`<T>`を`<T,>`にする。

<!-- prettier-ignore -->
```tsx
const double = <T,>(v: T): [T, T] => [v, v]
const hello = () => <p>Hello</p>
// ↑OK
```
