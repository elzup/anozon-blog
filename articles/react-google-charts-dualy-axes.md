---
title: React Google Charts の Dual-Y でオプションが反映されないときの解決策
date: 2021-10-26 09:00:00
topics:
  - GoogleChart
type: tech
published: true
emoji: 📈
---

2 回ハマったのでメモしておきます。  
'react-google-charts' で複数軸のグラフを描画するパターンです。

vAxis ではなく vAxes を使います。現状 Type エラーで回避できなさそうです。

```diff
import Chart from 'react-google-charts'
const Component = () => {
    return <Chart
      <!-- 省略 -->
      options={{
        series: [
          { targetAxisIndex: 0, axis: 'りんご' },
          { targetAxisIndex: 1, axis: 'なす' },
        ],
-        vAxis: {
+        vAxes: {
          0: {
            viewWindow: { max: 0, min: 20 },
            title: 'りんご' ,
          },
          1: {
            viewWindow: { min: 10, max: 100 },
            title: 'なす',
          },
        }
        />
}
```

React ではなく Google Charts のオプション指定でも起こりうる問題の可能性もあります。
