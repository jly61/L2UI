# 快速开始

## 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0

## 安装依赖

```bash
# 在项目根目录执行
pnpm install
```

## 开发

### 启动文档站点（Storybook）

```bash
pnpm --filter @l2ui/docs dev
```

访问 http://localhost:6006 查看组件文档。

### 开发组件包

```bash
# 开发模式（监听文件变化）
pnpm --filter @l2ui/components dev
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @l2ui/components build
```

### 测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @l2ui/components test

# Watch 模式
pnpm --filter @l2ui/components test:watch
```

### 代码检查

```bash
# ESLint 检查
pnpm lint

# 自动修复
pnpm lint:fix

# 代码格式化
pnpm format

# 类型检查
pnpm type-check
```

## 项目结构

```
L2UI/
├── packages/
│   ├── components/      # 组件源码包
│   ├── utils/           # 工具函数包
│   ├── styles/          # 样式主题包
│   └── l2ui/            # 主入口包
├── apps/
│   └── docs/            # 文档站点
└── docs/                # 项目文档
```

## 添加新组件

1. 在 `packages/components/src/` 创建组件目录
2. 创建组件文件：
   - `ComponentName.tsx` - 组件实现
   - `ComponentName.styles.ts` - 样式定义
   - `ComponentName.types.ts` - 类型定义
   - `ComponentName.test.tsx` - 单元测试
   - `ComponentName.stories.tsx` - Storybook 文档
   - `README.md` - 组件文档
3. 在 `packages/components/src/index.ts` 导出组件
4. 在 `packages/l2ui/src/index.ts` 重新导出

参考 `packages/components/src/button/` 目录的结构。

## 使用组件库

### 在项目中使用

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

### 按需导入

```tsx
import { Button } from 'l2ui';
```

## 下一步

- 查看 [开发指南](./docs/development.md) 了解详细开发流程
- 查看 [架构设计](./docs/architecture.md) 了解项目架构
- 查看 [贡献指南](./docs/contributing.md) 了解如何贡献代码

