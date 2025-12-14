# 主题 Token 文档

本文档详细说明 L2UI 主题系统中的所有 Token 及其用途。

## 颜色系统

### 语义化颜色

| Token            | CSS 变量               | 说明                           | 亮色值    | 暗色值    |
| ---------------- | ---------------------- | ------------------------------ | --------- | --------- |
| `colors.primary` | `--l2ui-color-primary` | 主色，用于主要操作、链接等     | `#1890ff` | `#1890ff` |
| `colors.success` | `--l2ui-color-success` | 成功色，用于成功状态、完成操作 | `#52c41a` | `#52c41a` |
| `colors.warning` | `--l2ui-color-warning` | 警告色，用于警告提示           | `#faad14` | `#faad14` |
| `colors.error`   | `--l2ui-color-error`   | 错误色，用于错误提示、危险操作 | `#ff4d4f` | `#ff4d4f` |
| `colors.info`    | `--l2ui-color-info`    | 信息色，用于信息提示           | `#1890ff` | `#1890ff` |

### 文本颜色

| Token                  | CSS 变量                     | 说明                     | 亮色值      | 暗色值      |
| ---------------------- | ---------------------------- | ------------------------ | ----------- | ----------- |
| `colors.text`          | `--l2ui-color-text`          | 主文本色，用于主要内容   | `#000000d9` | `#ffffffd9` |
| `colors.textSecondary` | `--l2ui-color-textSecondary` | 次要文本色，用于辅助信息 | `#00000073` | `#ffffff73` |

### 界面颜色

| Token               | CSS 变量                  | 说明                       | 亮色值                | 暗色值                      |
| ------------------- | ------------------------- | -------------------------- | --------------------- | --------------------------- |
| `colors.border`     | `--l2ui-color-border`     | 边框色，用于分割线、边框   | `#d9d9d9`             | `#434343`                   |
| `colors.background` | `--l2ui-color-background` | 背景色，用于页面、卡片背景 | `#ffffff`             | `#141414`                   |
| `colors.hover`      | `--l2ui-color-hover`      | 悬停背景色，用于交互反馈   | `rgba(0, 0, 0, 0.06)` | `rgba(255, 255, 255, 0.08)` |

## 间距系统

间距系统采用 4px 基础单位，提供一致的间距体验。

| Token         | CSS 变量             | 值     | 说明     | 使用场景                 |
| ------------- | -------------------- | ------ | -------- | ------------------------ |
| `spacing.xs`  | `--l2ui-spacing-xs`  | `4px`  | 极小间距 | 紧密排列的元素           |
| `spacing.sm`  | `--l2ui-spacing-sm`  | `8px`  | 小间距   | 相关元素之间的间距       |
| `spacing.md`  | `--l2ui-spacing-md`  | `16px` | 中等间距 | 默认间距，用于大部分场景 |
| `spacing.lg`  | `--l2ui-spacing-lg`  | `24px` | 大间距   | 区块之间的间距           |
| `spacing.xl`  | `--l2ui-spacing-xl`  | `32px` | 超大间距 | 大区块之间的间距         |
| `spacing.xxl` | `--l2ui-spacing-xxl` | `48px` | 极大间距 | 页面级别的间距           |

## 排版系统

### 字体大小

| Token                     | CSS 变量               | 值     | 说明     | 使用场景       |
| ------------------------- | ---------------------- | ------ | -------- | -------------- |
| `typography.fontSize.xs`  | `--l2ui-font-size-xs`  | `12px` | 极小字体 | 辅助信息、标签 |
| `typography.fontSize.sm`  | `--l2ui-font-size-sm`  | `14px` | 小字体   | 次要文本       |
| `typography.fontSize.md`  | `--l2ui-font-size-md`  | `16px` | 中等字体 | 正文（默认）   |
| `typography.fontSize.lg`  | `--l2ui-font-size-lg`  | `18px` | 大字体   | 强调文本       |
| `typography.fontSize.xl`  | `--l2ui-font-size-xl`  | `20px` | 超大字体 | 小标题         |
| `typography.fontSize.xxl` | `--l2ui-font-size-xxl` | `24px` | 极大字体 | 大标题         |

### 字重

| Token                            | CSS 变量                      | 值    | 说明 | 使用场景 |
| -------------------------------- | ----------------------------- | ----- | ---- | -------- |
| `typography.fontWeight.normal`   | `--l2ui-font-weight-normal`   | `400` | 正常 | 正文     |
| `typography.fontWeight.medium`   | `--l2ui-font-weight-medium`   | `500` | 中等 | 次要标题 |
| `typography.fontWeight.semibold` | `--l2ui-font-weight-semibold` | `600` | 半粗 | 标题     |
| `typography.fontWeight.bold`     | `--l2ui-font-weight-bold`     | `700` | 粗体 | 强调标题 |

### 行高

| Token                           | CSS 变量                     | 值     | 说明 | 使用场景         |
| ------------------------------- | ---------------------------- | ------ | ---- | ---------------- |
| `typography.lineHeight.tight`   | `--l2ui-line-height-tight`   | `1.25` | 紧密 | 标题、单行文本   |
| `typography.lineHeight.normal`  | `--l2ui-line-height-normal`  | `1.5`  | 正常 | 正文（默认）     |
| `typography.lineHeight.relaxed` | `--l2ui-line-height-relaxed` | `1.75` | 宽松 | 长文本、阅读内容 |

### 字体族

| Token                   | CSS 变量             | 值                                                                                                             |
| ----------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `typography.fontFamily` | `--l2ui-font-family` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, ...` |

## 圆角系统

| Token                  | CSS 变量                       | 值       | 说明     | 使用场景             |
| ---------------------- | ------------------------------ | -------- | -------- | -------------------- |
| `borderRadius.sm`      | `--l2ui-border-radius-sm`      | `2px`    | 小圆角   | 小元素、标签         |
| `borderRadius.default` | `--l2ui-border-radius-default` | `4px`    | 默认圆角 | 按钮、输入框（默认） |
| `borderRadius.lg`      | `--l2ui-border-radius-lg`      | `8px`    | 大圆角   | 卡片、大元素         |
| `borderRadius.full`    | `--l2ui-border-radius-full`    | `9999px` | 完全圆角 | 圆形按钮、头像       |

## 响应式断点

| Token             | CSS 变量                | 值       | 说明   | 设备类型 |
| ----------------- | ----------------------- | -------- | ------ | -------- |
| `breakpoints.xs`  | `--l2ui-breakpoint-xs`  | `480px`  | 超小屏 | 小手机   |
| `breakpoints.sm`  | `--l2ui-breakpoint-sm`  | `576px`  | 小屏   | 大手机   |
| `breakpoints.md`  | `--l2ui-breakpoint-md`  | `768px`  | 中屏   | 平板     |
| `breakpoints.lg`  | `--l2ui-breakpoint-lg`  | `992px`  | 大屏   | 小桌面   |
| `breakpoints.xl`  | `--l2ui-breakpoint-xl`  | `1200px` | 超大屏 | 桌面     |
| `breakpoints.xxl` | `--l2ui-breakpoint-xxl` | `1600px` | 极大屏 | 大桌面   |

## 使用示例

### 在 styled-components 中使用

```tsx
import styled from 'styled-components';

const MyComponent = styled.div`
  color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.default};
  font-size: ${(props) => props.theme.typography.fontSize.md};
`;
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

### 在 JavaScript 中使用

```tsx
import { defaultTheme } from '@l2ui/styles';

const primaryColor = defaultTheme.colors.primary;
const mediumSpacing = defaultTheme.spacing.md;
```

## 设计原则

1. **一致性**：所有 Token 遵循统一的设计规范
2. **可扩展性**：支持自定义主题和部分覆盖
3. **语义化**：使用语义化的命名，而非具体值
4. **响应式**：提供响应式断点支持
5. **可访问性**：确保颜色对比度符合 WCAG 标准
