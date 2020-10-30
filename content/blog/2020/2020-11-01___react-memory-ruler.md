---
title: React と display grid でメモリ付き定規
date: 2020-11-01 12:00:00
tags:
  - React
  - TypeScript
  - CSS
---

メモリ付きの定規、ルーラーコンポーネントのサンプルです。

![react-memory-component](https://elzup-image-storage.s3.amazonaws.com/blog/ruler-component.png)

## コード

[ruler\-with\-memory \- CodeSandbox](https://codesandbox.io/s/ruler-with-memory-3yogt)

```tsx:title=Ruler.tsx
<Ruler
  memories={[1, 2, 4, 8, 16, 32, 64, 128]}
  colors={['#333', '#444', '#555', '#666', '#777', '#888', '#999']}
/>
```

```tsx
function Ruler({ memories, colors }: Props) {
  if (memories.length - 1 !== colors.length)
    console.warn('expect Ruler.memories.length - 1=== Ruler.colors.length')
  return (
    <div>
      <div
        className="memories"
        style={{ gridTemplateColumns: `repeat(${memories.length}, 1fr)` }}
      >
        {memories.map((memori, i) => (
          <div key={i}>{memori}</div>
        ))}
      </div>
      <div
        className="blocks"
        style={{
          gridTemplateColumns: `1fr repeat(${memories.length - 1}, 2fr) 1fr`,
        }}
      >
        {range(memories.length + 1).map((i) => (
          <div key={i} style={{ background: colors[i - 1] || '' }}></div>
        ))}
      </div>
    </div>
  )
}
```

```scss
.memories {
  display: grid;
  text-align: center;
}

.blocks {
  display: grid;
  > div {
    border: solid 1px black;
    height: 1rem;
    &div:first-child,
    &:last-child {
      border: none;
    }
  }
}
```

## ミソ

ブロック部分とメモリ部分を 0.5 ブロックずらし、メモリを`text-align: center` とすることで境界に数字が来るようにしています。
![memory grid css](https://elzup-image-storage.s3.amazonaws.com/blog/memori-grid-css.png)

ブロック `grid-template-columns: 1fr repeat(<ブロック数> - 1}, 2fr) 1fr`

メモリ部分 `grid-template-columns: repeat(<ブロック数>, 1fr)`

## 重なってる border を消す場合

```scss
.blocks {
  display: grid;
  > div {
    border: solid 1px black;
    border-left: none;
    height: 1rem;
    &div:first-child {
      border: none;
      border-right: solid 1px black;
    }
    &:last-child {
      border: none;
    }
  }
}
```
