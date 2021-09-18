---
title: React で複数の ref を 1つのコンポーネントにセットする
date: 2021-07-09 17:00:00
topics:
  - ReactHooks
  - TypeScript
type: tech
published: true
---

同じ div に `useSize` と `useHover` の両方を使いたいとがあった。  
しかしどちらも ref を渡さなければいけなかったのでその方法です。

[Share ref with multiple ref handlers · Issue \#13029 · facebook/react](https://github.com/facebook/react/issues/13029)

## useCombinedRefs

ref を合成する関数を用意する。

参考: https://github.com/facebook/react/issues/13029#issuecomment-497641073

```ts
export const useCombinedRefs = <T extends any>(
  ...refs: Array<Ref<T>>
): Ref<T> =>
  useCallback(
    (element: T) =>
      refs.forEach((ref) => {
        if (!ref) {
          return
        }

        // Ref can have two types - a function or an object. We treat each case.
        if (typeof ref === 'function') {
          return ref(element)
        }

        // As per https://github.com/facebook/react/issues/13029
        // it should be fine to set current this way.
        ;(ref as any).current = element
      }),
    refs
  )
```

デモ
[misty\-night\-n6f8n \- CodeSandbox](https://codesandbox.io/s/misty-night-n6f8n?file=/src/App.tsx)

## その他

とはいえライブラリの hook は ref を引数に渡す形が増えているので combineRefs は不要になりそうです。  
カスタム hook を作るときはそうするのが親切ですね。
