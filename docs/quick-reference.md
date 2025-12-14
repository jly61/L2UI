# 快速参考手册

本文档提供常用命令和配置的快速参考。

## 🚀 常用命令

### 开发

```bash
# 启动 Storybook（查看组件文档）
pnpm --filter @l2ui/docs dev

# 开发模式构建组件（监听文件变化）
pnpm --filter @l2ui/components dev

# 开发模式构建所有包
pnpm dev
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @l2ui/components build
pnpm --filter @l2ui/utils build
pnpm --filter l2ui build
```

### 测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @l2ui/components test

# Watch 模式
pnpm --filter @l2ui/components test:watch

# 测试覆盖率
pnpm --filter @l2ui/components test:coverage
```

### 代码质量

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

### 清理

```bash
# 清理所有构建产物
pnpm clean

# 清理特定包
pnpm --filter @l2ui/components clean
```

## 📁 项目结构速查

```
L2UI/
├── packages/
│   ├── components/      # 组件源码包
│   ├── utils/           # 工具函数包
│   ├── styles/          # 样式主题包
│   └── l2ui/            # 主入口包
├── apps/
│   └── docs/            # Storybook 文档站点
└── docs/                # 项目文档
```

## 🔧 配置文件位置

### 根目录配置

- `package.json` - 根 package.json，包含所有脚本
- `pnpm-workspace.yaml` - pnpm workspace 配置
- `tsconfig.json` - TypeScript 根配置
- `.eslintrc.js` - ESLint 配置
- `.prettierrc` - Prettier 配置

### 包配置

- `packages/*/package.json` - 各包的配置
- `packages/*/vite.config.ts` - Vite 构建配置
- `packages/*/tsconfig.json` - TypeScript 配置
- `packages/*/vitest.config.ts` - 测试配置

### Storybook 配置

- `apps/docs/.storybook/main.ts` - Storybook 主配置
- `apps/docs/.storybook/preview.tsx` - Storybook 预览配置

## 📦 包说明

### @l2ui/components

- **位置**: `packages/components/`
- **职责**: 所有 UI 组件的实现
- **导出**: 组件和类型

### @l2ui/utils

- **位置**: `packages/utils/`
- **职责**: 通用工具函数
- **导出**: 工具函数

### @l2ui/styles

- **位置**: `packages/styles/`
- **职责**: 样式和主题系统
- **导出**: 主题配置和类型

### l2ui

- **位置**: `packages/l2ui/`
- **职责**: 主入口包，统一导出
- **导出**: 所有组件、工具、样式

### @l2ui/docs

- **位置**: `apps/docs/`
- **职责**: Storybook 文档站点
- **用途**: 组件文档和示例

## 🎨 组件开发模板

### 创建新组件

```bash
cd packages/components/src
mkdir my-component
cd my-component
touch MyComponent.tsx MyComponent.styles.ts MyComponent.types.ts MyComponent.test.tsx MyComponent.stories.tsx README.md
```

### 组件文件结构

```
my-component/
├── MyComponent.tsx          # 组件实现
├── MyComponent.styles.ts    # 样式定义
├── MyComponent.types.ts     # 类型定义
├── MyComponent.test.tsx     # 单元测试
├── MyComponent.stories.tsx  # Storybook 文档
├── README.md                # 组件文档
└── index.ts                 # 导出文件
```

## 🔗 路径别名

在代码中可以使用以下路径别名：

```typescript
import { Button } from '@l2ui/components';
import { isString } from '@l2ui/utils';
import { defaultTheme } from '@l2ui/styles';
```

## 🎯 开发工作流

### 1. 开发新功能

```bash
# 1. 创建功能分支
git checkout -b feat/my-feature

# 2. 开发代码
# ... 编写代码 ...

# 3. 运行测试
pnpm test

# 4. 检查代码
pnpm lint
pnpm type-check

# 5. 提交代码
git commit -m "feat: 添加新功能"
```

### 2. 添加新组件

1. 在 `packages/components/src/` 创建组件目录
2. 实现组件（参考 Button 组件）
3. 在 `packages/components/src/index.ts` 导出
4. 在 `packages/l2ui/src/index.ts` 重新导出
5. 在 `apps/docs/src/` 创建 Storybook stories

## 🐛 常见问题

### Storybook 无法启动

```bash
# 清理缓存
rm -rf apps/docs/node_modules/.vite apps/docs/.storybook-static

# 重新安装依赖
pnpm install

# 重新启动
pnpm --filter @l2ui/docs dev
```

### 测试失败

- 确保使用 `vi.fn()` 而不是 `jest.fn()`
- 检查测试环境配置（jsdom）
- 查看测试文件路径是否正确

### 构建失败

- 检查 TypeScript 错误：`pnpm type-check`
- 检查依赖是否完整：`pnpm install`
- 清理构建缓存：`pnpm clean`

### 类型错误

- 确保所有类型正确导入
- 检查 `tsconfig.json` 配置
- 查看类型声明文件（`.d.ts`）

## 📚 相关文档

- [学习指南](./learning-guide.md) - 完整学习路径
- [开发指南](./development.md) - 详细开发说明
- [架构设计](./architecture.md) - 架构详解
- [技术选型](./tech-stack.md) - 技术栈说明

## 💡 提示

- 使用 `pnpm --filter` 可以针对特定包执行命令
- 使用 `pnpm --parallel` 可以并行执行命令
- 使用 `pnpm --recursive` 可以递归执行命令
- 查看帮助：`pnpm --help` 或 `pnpm <command> --help`

---

**快速参考** - 需要详细说明请查看相关文档
