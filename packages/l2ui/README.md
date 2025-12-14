# l2ui

L2UI 主入口包，统一导出所有组件和工具。

## 安装

```bash
npm install l2ui
# 或
yarn add l2ui
# 或
pnpm add l2ui
```

## 使用

```tsx
import React from 'react';
import { Button, ConfigProvider } from 'l2ui';

function App() {
  return (
    <ConfigProvider>
      <Button type="primary">点击我</Button>
    </ConfigProvider>
  );
}
```

## 组件

查看 [组件文档](../../README.md#组件列表) 了解所有可用组件。

## 工具函数

```tsx
import { isString, formatNumber } from 'l2ui';
```

## 主题

```tsx
import { ConfigProvider, defaultTheme } from 'l2ui';

const customTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#your-color',
  },
};

<ConfigProvider theme={customTheme}>{/* 你的应用 */}</ConfigProvider>;
```
