# @l2ui/styles

L2UI 样式和主题系统包，提供主题配置、全局样式、CSS 变量等功能。

## 功能特性

- ✅ 主题系统（亮色/暗色）
- ✅ 全局样式重置
- ✅ CSS 变量支持
- ✅ TypeScript 类型支持
- ✅ 响应式断点

## 安装

```bash
pnpm add @l2ui/styles
```

## 基本用法

### 使用默认主题

```tsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';

function App() {
  return <ThemeProvider theme={defaultTheme}>{/* 你的应用 */}</ThemeProvider>;
}
```

### 使用暗色主题

```tsx
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '@l2ui/styles';

function App() {
  return <ThemeProvider theme={darkTheme}>{/* 你的应用 */}</ThemeProvider>;
}
```

### 使用全局样式

```tsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme, GlobalStyles } from '@l2ui/styles';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles theme={defaultTheme} />
      {/* 你的应用 */}
    </ThemeProvider>
  );
}
```

### 自定义主题

```tsx
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import type { Theme } from '@l2ui/styles';

const customTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#722ed1', // 自定义主色
  },
};

function App() {
  return <ThemeProvider theme={customTheme}>{/* 你的应用 */}</ThemeProvider>;
}
```

## CSS 变量

### 启用 CSS 变量

```tsx
import { GlobalStyles } from '@l2ui/styles';

<GlobalStyles theme={defaultTheme} enableCSSVariables={true} />;
```

### 在 CSS 中使用变量

```css
.my-component {
  color: var(--l2ui-color-primary);
  padding: var(--l2ui-spacing-md);
  border-radius: var(--l2ui-border-radius-default);
  font-size: var(--l2ui-font-size-md);
}
```

### 可用的 CSS 变量

#### 颜色变量

- `--l2ui-color-primary`
- `--l2ui-color-success`
- `--l2ui-color-warning`
- `--l2ui-color-error`
- `--l2ui-color-info`
- `--l2ui-color-text`
- `--l2ui-color-textSecondary`
- `--l2ui-color-border`
- `--l2ui-color-background`
- `--l2ui-color-hover`

#### 间距变量

- `--l2ui-spacing-xs`
- `--l2ui-spacing-sm`
- `--l2ui-spacing-md`
- `--l2ui-spacing-lg`
- `--l2ui-spacing-xl`
- `--l2ui-spacing-xxl`

#### 字体变量

- `--l2ui-font-family`
- `--l2ui-font-size-xs` 到 `--l2ui-font-size-xxl`
- `--l2ui-font-weight-normal` 到 `--l2ui-font-weight-bold`
- `--l2ui-line-height-tight` 到 `--l2ui-line-height-relaxed`

#### 圆角变量

- `--l2ui-border-radius-sm`
- `--l2ui-border-radius-default`
- `--l2ui-border-radius-lg`
- `--l2ui-border-radius-full`

#### 断点变量

- `--l2ui-breakpoint-xs` 到 `--l2ui-breakpoint-xxl`

## 主题 Token 文档

### Colors（颜色）

| Token           | 说明       | 默认值（亮色）        | 默认值（暗色）              |
| --------------- | ---------- | --------------------- | --------------------------- |
| `primary`       | 主色       | `#1890ff`             | `#1890ff`                   |
| `success`       | 成功色     | `#52c41a`             | `#52c41a`                   |
| `warning`       | 警告色     | `#faad14`             | `#faad14`                   |
| `error`         | 错误色     | `#ff4d4f`             | `#ff4d4f`                   |
| `info`          | 信息色     | `#1890ff`             | `#1890ff`                   |
| `text`          | 主文本色   | `#000000d9`           | `#ffffffd9`                 |
| `textSecondary` | 次要文本色 | `#00000073`           | `#ffffff73`                 |
| `border`        | 边框色     | `#d9d9d9`             | `#434343`                   |
| `background`    | 背景色     | `#ffffff`             | `#141414`                   |
| `hover`         | 悬停背景色 | `rgba(0, 0, 0, 0.06)` | `rgba(255, 255, 255, 0.08)` |

### Spacing（间距）

| Token | 值     | 说明     |
| ----- | ------ | -------- |
| `xs`  | `4px`  | 极小间距 |
| `sm`  | `8px`  | 小间距   |
| `md`  | `16px` | 中等间距 |
| `lg`  | `24px` | 大间距   |
| `xl`  | `32px` | 超大间距 |
| `xxl` | `48px` | 极大间距 |

### Typography（排版）

#### 字体大小

| Token | 值     | 说明             |
| ----- | ------ | ---------------- |
| `xs`  | `12px` | 极小字体         |
| `sm`  | `14px` | 小字体           |
| `md`  | `16px` | 中等字体（默认） |
| `lg`  | `18px` | 大字体           |
| `xl`  | `20px` | 超大字体         |
| `xxl` | `24px` | 极大字体         |

#### 字重

| Token      | 值    | 说明 |
| ---------- | ----- | ---- |
| `normal`   | `400` | 正常 |
| `medium`   | `500` | 中等 |
| `semibold` | `600` | 半粗 |
| `bold`     | `700` | 粗体 |

#### 行高

| Token     | 值     | 说明 |
| --------- | ------ | ---- |
| `tight`   | `1.25` | 紧密 |
| `normal`  | `1.5`  | 正常 |
| `relaxed` | `1.75` | 宽松 |

### BorderRadius（圆角）

| Token     | 值       | 说明             |
| --------- | -------- | ---------------- |
| `sm`      | `2px`    | 小圆角           |
| `default` | `4px`    | 默认圆角         |
| `lg`      | `8px`    | 大圆角           |
| `full`    | `9999px` | 完全圆角（圆形） |

### Breakpoints（断点）

| Token | 值       | 说明   |
| ----- | -------- | ------ |
| `xs`  | `480px`  | 超小屏 |
| `sm`  | `576px`  | 小屏   |
| `md`  | `768px`  | 中屏   |
| `lg`  | `992px`  | 大屏   |
| `xl`  | `1200px` | 超大屏 |
| `xxl` | `1600px` | 极大屏 |

## API

### GlobalStyles

全局样式组件。

**Props:**

| 属性               | 说明                 | 类型      | 默认值 |
| ------------------ | -------------------- | --------- | ------ |
| theme              | 主题对象             | `Theme`   | -      |
| enableReset        | 是否启用全局样式重置 | `boolean` | `true` |
| enableCSSVariables | 是否启用 CSS 变量    | `boolean` | `true` |

### themeToCSSVariables

将主题对象转换为 CSS 变量对象。

```tsx
import { themeToCSSVariables } from '@l2ui/styles';

const vars = themeToCSSVariables(defaultTheme);
// { '--l2ui-color-primary': '#1890ff', ... }
```

### generateCSSVariables

生成 CSS 变量样式字符串。

```tsx
import { generateCSSVariables } from '@l2ui/styles';

const css = generateCSSVariables(defaultTheme);
// ':root {\n  --l2ui-color-primary: #1890ff;\n  ...\n}'
```

## 最佳实践

1. **使用主题 Provider**：始终使用 `ThemeProvider` 包裹应用
2. **启用全局样式**：在应用根组件使用 `GlobalStyles`
3. **使用 CSS 变量**：在自定义样式时优先使用 CSS 变量
4. **主题切换**：通过切换 `ThemeProvider` 的 theme 属性实现主题切换

## 示例

### 主题切换

```tsx
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, darkTheme, GlobalStyles } from '@l2ui/styles';

function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <button onClick={() => setIsDark(!isDark)}>切换到{isDark ? '亮色' : '暗色'}主题</button>
      {/* 你的应用 */}
    </ThemeProvider>
  );
}
```
