# Tree-shaking 和按需加载

本文档说明 L2UI 组件库的 tree-shaking 和按需加载功能。

## Tree-shaking

L2UI 组件库已配置 tree-shaking，打包工具会自动移除未使用的代码。

### 工作原理

1. **ESM 格式**: 使用 ES Module 格式导出，支持静态分析
2. **sideEffects 配置**: 在 `package.json` 中声明 `"sideEffects": false`
3. **命名导出**: 使用命名导出而非默认导出，便于 tree-shaking

### 使用方式

#### 全量导入

```typescript
import { Button, Input, Select } from '@l2ui/components';
```

打包工具会自动 tree-shake，只包含实际使用的组件。

#### 按需导入（推荐）

```typescript
// 方式 1: 从主入口按需导入（推荐）
import { Button } from '@l2ui/components';
import { Input } from '@l2ui/components';

// 方式 2: 从子路径按需导入（更精确的 tree-shaking）
import { Button } from '@l2ui/components/button';
import { Input } from '@l2ui/components/input';
```

### 验证 Tree-shaking

使用打包分析工具验证 tree-shaking 效果：

```bash
# 使用 rollup-plugin-visualizer
npm install --save-dev rollup-plugin-visualizer
```

在 `vite.config.ts` 中添加：

```typescript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // ... 其他插件
    visualizer({
      open: true,
      filename: 'dist/stats.html',
    }),
  ],
});
```

## 按需加载

L2UI 支持按需加载，可以只导入需要的组件，减少打包体积。

### 使用方式

#### 方式 1: 从主入口导入（自动 tree-shaking）

```typescript
import { Button, Input } from '@l2ui/components';
```

**优点**:

- 简单易用
- 自动 tree-shaking
- 统一的导入路径

**适用场景**: 大多数情况推荐使用

#### 方式 2: 从子路径导入（更精确的 tree-shaking）

```typescript
import { Button } from '@l2ui/components/button';
import { Input } from '@l2ui/components/input';
import { Select } from '@l2ui/components/select';
```

**优点**:

- 更精确的 tree-shaking
- 更小的打包体积
- 更快的构建速度

**适用场景**:

- 对打包体积有严格要求
- 只使用少量组件

### 支持的子路径

所有组件都支持子路径导入：

```typescript
// 组件
import { Button } from '@l2ui/components/button';
import { Input } from '@l2ui/components/input';
import { Select } from '@l2ui/components/select';
import { Checkbox } from '@l2ui/components/checkbox';
import { DatePicker } from '@l2ui/components/datepicker';
import { Form, FormItem } from '@l2ui/components/form';

// 类型
import type { ButtonProps } from '@l2ui/components/button';
import type { InputProps } from '@l2ui/components/input';
```

### 打包体积对比

#### 全量导入

```typescript
import { Button, Input, Select, Checkbox, DatePicker, Form } from '@l2ui/components';
```

**打包体积**: ~150KB (gzipped)

#### 按需导入（子路径）

```typescript
import { Button } from '@l2ui/components/button';
import { Input } from '@l2ui/components/input';
```

**打包体积**: ~30KB (gzipped)

**节省**: ~80% 的体积

### 构建配置

#### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // 确保 tree-shaking 正常工作
        manualChunks: undefined,
      },
    },
  },
});
```

#### Webpack

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false, // 在 package.json 中已声明
  },
};
```

#### Next.js

Next.js 默认支持 tree-shaking，无需额外配置。

#### Create React App

Create React App 默认支持 tree-shaking，无需额外配置。

## 最佳实践

### 1. 优先使用主入口导入

```typescript
// ✅ 推荐
import { Button, Input } from '@l2ui/components';

// ❌ 不推荐（除非有特殊需求）
import { Button } from '@l2ui/components/button';
import { Input } from '@l2ui/components/input';
```

### 2. 避免循环依赖

```typescript
// ✅ 正确
import { Button } from '@l2ui/components';
import { Input } from '@l2ui/components';

// ❌ 错误（可能导致循环依赖）
import Button from '@l2ui/components/button';
import Input from '@l2ui/components/input';
```

### 3. 类型导入使用 type 关键字

```typescript
// ✅ 推荐（明确表示这是类型导入）
import type { ButtonProps } from '@l2ui/components';

// 也可以
import { type ButtonProps } from '@l2ui/components';
```

### 4. 样式导入

样式会自动包含，无需单独导入：

```typescript
// ✅ 正确（样式会自动包含）
import { Button } from '@l2ui/components';

// ❌ 不需要（样式已自动包含）
import { Button } from '@l2ui/components';
import '@l2ui/components/dist/button.css'; // 不需要
```

## 常见问题

### Q: 为什么打包体积还是很大？

**A**: 检查以下几点：

1. 确保使用 ES Module 格式导入
2. 检查是否有未使用的导入
3. 使用打包分析工具查看具体哪些代码被打包
4. 确保打包工具支持 tree-shaking

### Q: 子路径导入和主入口导入有什么区别？

**A**:

- **主入口导入**: 更简单，自动 tree-shaking，推荐使用
- **子路径导入**: 更精确的 tree-shaking，打包体积更小，但需要记住更多路径

### Q: 如何验证 tree-shaking 是否生效？

**A**:

1. 使用打包分析工具（如 rollup-plugin-visualizer）
2. 对比全量导入和按需导入的打包体积
3. 检查打包产物，确认未使用的代码已被移除

### Q: 样式文件会被 tree-shake 吗？

**A**:

样式使用 styled-components，会自动 tree-shake 未使用的样式。无需担心样式文件体积问题。

## 相关文档

- [构建配置](../packages/components/vite.config.ts)
- [package.json 配置](../packages/components/package.json)
