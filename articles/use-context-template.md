---
title: お手軽用 React Context で State 管理のテンプレート
date: 2022-02-24 15:00:00
topics:
  - React
  - ReactHooks
type: tech
published: true
emoji: 🪝‍
---

ミニマムだけど使いやすい(と思ってる)テンプレートです。
**createContext 周りを書くのが地味にだるい**ので使っています。

DEMO: [minimum\-use\-context\-config \- CodeSandbox](https://codesandbox.io/s/minimum-use-context-config-bhzn6m?file=/src/index.tsx)

## コード

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react'

type Config = {
  version: number
  showList: boolean
  showName: boolean
  mode: 'a' | 'b'
}

const defaultConfig: Config = {
  version: 3,
  showList: true,
  showName: false,
  mode: 'a',
} as const

const ConfigContext = createContext<[Config, (config: Config) => void]>([
  defaultConfig,
  () => {},
])

const migrate = (config: Config) => {
  // NOTE: if (config.version < 3) { // custom migration logic }
  return { ...defaultConfig, ...config, version: defaultConfig.version }
}

export const ConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = useState<Config>(defaultConfig)

  useEffect(() => {
    if (config.version === defaultConfig.version) return
    setConfig(migrate(config))
  }, [config, setConfig])

  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)
```

### 使い方

```tsx
function Page() {
  const [config, setConfig] = useConfig()

  return <div>{config.mode}</div>
}

function App() {
  return (
    <div className="App">
      <ConfigProvider>
        <Page />
      </ConfigProvider>
    </div>
  )
}
```

## 部分的な Config Hook に分割する

```tsx
export const useSomeConfig = <Key extends keyof Config>(key: Key) => {
  const [config, setConfig] = useConfig()

  return [
    config[key],
    (v: Config[Key]) => setConfig({ ...config, [key]: v }),
  ] as const
}
```

```tsx
export const useMode = () => useSomeConfig('mode')

const ModeRadios = () => {
  const [mode, setMode] = useMode()

  const handle = (e) => {
    setMode(e.target.value)
  }
  const radioProps = (value: 'a' | 'b'): React.HTMLProps<HTMLInputElement> => ({
    type: 'radio',
    onChange: handle,
    value,
    checked: value === mode,
    name: 'mode',
  })

  return (
    <div>
      <input id="modeA" {...radioProps('a')} />
      <label htmlFor="modeA">A</label>

      <input id="modeB" {...radioProps('b')} />
      <label htmlFor="modeB">B</label>
    </div>
  )
}
```

### 個別の設定をもう少しカスタムするパターン

```tsx
export const useShowList = () => {
  const [showList, setShowList] = useSomeConfig('showList')
  const toggleConfig = () => setShowList(!showList)

  return { showList, setShowList, toggleConfig }
}

const ShowListOption = () => {
  const { showList, setShowList } = useShowList()

  return (
    <div>
      <input
        id="showListCheck"
        type="checkbox"
        checked={showList}
        onChange={(e) => {
          setShowList(e.target.checked)
        }}
      />
      <label htmlFor="showListCheck">ListVisible</label>
    </div>
  )
}
```

## State の Storage を変える

```tsx
import { useLocalStorage } from 'react-use'
// import { useSessionStorage } from 'react-use'

export const ConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = useLocalStorage<Config>('config-name')
  // const [config, setConfig] = useSessionStorage<Config>('config-name')
}
```
