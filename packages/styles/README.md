# @l2ui/styles

L2UI 样式主题包，包含主题配置和全局样式。

## 安装

```bash
pnpm add @l2ui/styles
```

## 使用

```tsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* 你的应用 */}
    </ThemeProvider>
  );
}
```

## 主题配置

主题包含以下配置：

- `colors` - 颜色系统
- `spacing` - 间距系统
- `typography` - 字体系统
- `borderRadius` - 圆角系统
- `breakpoints` - 响应式断点

## 自定义主题

```tsx
import { defaultTheme } from '@l2ui/styles';
import type { Theme } from '@l2ui/styles';

const customTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#your-color',
  },
};
```

