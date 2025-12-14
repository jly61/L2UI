# 项目结构说明

本文档详细说明 L2UI 项目的目录结构和各文件/目录的职责。

## 整体结构

```
L2UI/
├── packages/                 # 所有包的源码
│   ├── components/          # 组件源码包
│   ├── utils/              # 工具函数包
│   ├── styles/             # 样式主题包
│   └── l2ui/               # 主入口包
├── apps/                    # 应用目录
│   └── docs/               # 文档站点应用
├── scripts/                 # 共享脚本
├── docs/                    # 项目文档
├── .github/                 # GitHub 配置
│   └── workflows/          # CI/CD 工作流
├── .husky/                  # Git hooks
├── .vscode/                 # VS Code 配置
├── node_modules/            # 依赖（pnpm 管理）
├── pnpm-workspace.yaml      # pnpm workspace 配置
├── pnpm-lock.yaml          # 锁文件
├── package.json            # 根 package.json
├── tsconfig.json           # TypeScript 根配置
├── .eslintrc.js            # ESLint 配置
├── .prettierrc             # Prettier 配置
├── .gitignore              # Git 忽略文件
└── README.md               # 项目说明
```

## 根目录文件说明

### 配置文件

#### `package.json`

根 package.json，主要配置：

- 工作空间配置
- 共享脚本命令
- 开发依赖
- 项目元信息

#### `pnpm-workspace.yaml`

pnpm workspace 配置，定义工作空间包含的包：

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

#### `tsconfig.json`

TypeScript 根配置，包含：

- 基础编译选项
- 路径别名配置
- 各包的配置继承

#### `.eslintrc.js`

ESLint 配置，包含：

- 基础规则
- TypeScript 规则
- React 规则
- 可访问性规则

#### `.prettierrc`

Prettier 配置，定义代码格式化规则。

#### `.gitignore`

Git 忽略文件配置。

### 目录说明

#### `packages/`

所有包的源码目录，每个子目录都是一个独立的 npm 包。

#### `apps/`

应用目录，包含文档站点等应用。

#### `scripts/`

共享脚本，如构建脚本、发布脚本等。

#### `docs/`

项目文档，包括架构设计、开发指南等。

## packages/ 目录结构

### packages/components/

组件源码包，包含所有 UI 组件。

```
packages/components/
├── src/
│   ├── button/              # Button 组件
│   │   ├── index.tsx        # 导出文件
│   │   ├── Button.tsx       # 组件实现
│   │   ├── Button.styles.ts # 样式定义
│   │   ├── Button.types.ts  # 类型定义
│   │   ├── Button.test.tsx  # 单元测试
│   │   └── README.md        # 组件文档
│   ├── input/               # Input 组件
│   ├── select/              # Select 组件
│   └── index.ts             # 统一导出
├── __tests__/               # 集成测试
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

#### 组件目录结构

每个组件遵循统一的结构：

```
component-name/
├── index.tsx                # 组件导出（可选，也可在 src/index.ts 统一导出）
├── ComponentName.tsx        # 组件主文件
├── ComponentName.styles.ts # styled-components 样式
├── ComponentName.types.ts  # TypeScript 类型定义
├── ComponentName.test.tsx  # 单元测试
├── ComponentName.stories.tsx # Storybook 文档
└── README.md               # 组件使用文档
```

#### 文件说明

**ComponentName.tsx**

- 组件的主要实现
- 包含组件逻辑
- 导出组件

**ComponentName.styles.ts**

- styled-components 样式定义
- 样式变体
- 主题使用

**ComponentName.types.ts**

- Props 类型定义
- 组件相关类型
- 导出类型

**ComponentName.test.tsx**

- 单元测试
- 使用 React Testing Library
- 覆盖主要功能

**ComponentName.stories.tsx**

- Storybook 文档
- 组件示例
- 交互式演示

**README.md**

- 组件使用说明
- API 文档
- 示例代码

### packages/utils/

工具函数包。

```
packages/utils/
├── src/
│   ├── array/               # 数组工具
│   │   ├── index.ts
│   │   └── ...
│   ├── object/              # 对象工具
│   ├── string/              # 字符串工具
│   ├── dom/                 # DOM 工具
│   ├── format/              # 格式化工具
│   ├── validate/            # 验证工具
│   └── index.ts             # 统一导出
├── __tests__/               # 测试文件
├── package.json
├── tsconfig.json
└── README.md
```

#### 工具函数组织原则

- 按功能分类到不同目录
- 每个工具函数独立文件或相关函数同一文件
- 完整的类型定义
- 单元测试覆盖

### packages/styles/

样式主题包。

```
packages/styles/
├── src/
│   ├── theme/               # 主题配置
│   │   ├── colors.ts        # 颜色定义
│   │   ├── typography.ts    # 字体定义
│   │   ├── spacing.ts       # 间距定义
│   │   ├── breakpoints.ts   # 断点定义
│   │   └── index.ts         # 主题导出
│   ├── global/              # 全局样式
│   │   ├── reset.css        # 样式重置
│   │   └── base.css         # 基础样式
│   ├── mixins/              # 样式混入
│   └── index.ts             # 统一导出
├── package.json
└── README.md
```

#### 主题系统

- 颜色系统（主色、功能色、中性色）
- 字体系统（字号、字重、行高）
- 间距系统（统一的间距值）
- 断点系统（响应式断点）
- 动画系统（过渡、动画）

### packages/l2ui/

主入口包，聚合所有组件和工具。

```
packages/l2ui/
├── src/
│   ├── components/          # 重新导出所有组件
│   │   └── index.ts
│   ├── utils/               # 重新导出工具函数
│   │   └── index.ts
│   ├── styles/              # 重新导出样式
│   │   └── index.ts
│   ├── providers/           # Context Providers
│   │   ├── ThemeProvider.tsx
│   │   ├── ConfigProvider.tsx
│   │   └── index.ts
│   └── index.ts             # 主入口文件
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

#### 主入口包职责

- 统一导出所有组件
- 提供全局配置（ConfigProvider）
- 提供主题切换（ThemeProvider）
- 处理样式注入
- 版本信息

## apps/ 目录结构

### apps/docs/

文档站点应用，基于 Storybook。

```
apps/docs/
├── .storybook/              # Storybook 配置
│   ├── main.js              # 主配置
│   ├── preview.js           # 预览配置
│   └── manager.js           # 管理器配置
├── src/
│   ├── stories/             # Storybook stories
│   │   ├── Introduction.stories.mdx
│   │   ├── GettingStarted.stories.mdx
│   │   └── ...
│   └── assets/              # 静态资源
├── package.json
└── README.md
```

#### Storybook 配置

- 支持 TypeScript
- 支持 styled-components
- 主题切换
- 响应式预览
- 可访问性检查（插件）

## scripts/ 目录结构

共享脚本目录。

```
scripts/
├── build.js                 # 构建脚本
├── release.js               # 发布脚本
├── changelog.js             # 变更日志生成
└── utils/                   # 脚本工具函数
```

## docs/ 目录结构

项目文档目录。

```
docs/
├── architecture.md          # 架构设计
├── development.md           # 开发指南
├── tech-stack.md            # 技术选型
├── project-structure.md     # 项目结构（本文档）
├── contributing.md          # 贡献指南
└── api/                     # API 文档（如需要）
```

## .github/ 目录结构

GitHub 相关配置。

```
.github/
├── workflows/               # GitHub Actions
│   ├── ci.yml               # CI 工作流
│   ├── release.yml          # 发布工作流
│   └── ...
├── ISSUE_TEMPLATE/          # Issue 模板
└── PULL_REQUEST_TEMPLATE.md # PR 模板
```

## 命名规范

### 文件命名

- **组件文件**: PascalCase，如 `Button.tsx`
- **工具文件**: camelCase，如 `formatDate.ts`
- **类型文件**: PascalCase + `.types.ts`，如 `Button.types.ts`
- **样式文件**: PascalCase + `.styles.ts`，如 `Button.styles.ts`
- **测试文件**: 组件名 + `.test.tsx`，如 `Button.test.tsx`
- **Story 文件**: 组件名 + `.stories.tsx`，如 `Button.stories.tsx`

### 目录命名

- **组件目录**: kebab-case，如 `date-picker/`
- **工具目录**: kebab-case，如 `date-utils/`
- **包目录**: kebab-case，如 `components/`

### 导出规范

- **默认导出**: 组件使用默认导出
- **命名导出**: 类型、工具函数使用命名导出
- **统一导出**: 在 `index.ts` 中统一导出

## 依赖关系

### 包之间的依赖

```
l2ui (主入口包)
  ├── @l2ui/components
  │     ├── @l2ui/utils
  │     └── @l2ui/styles
  ├── @l2ui/utils
  └── @l2ui/styles

apps/docs
  ├── l2ui
  └── @l2ui/components (直接使用，用于文档)
```

### 依赖规则

1. **components** 可以依赖 `utils` 和 `styles`
2. **l2ui** 可以依赖所有包
3. **utils** 不依赖其他业务包
4. **styles** 不依赖其他业务包
5. **docs** 可以依赖所有包

## 构建输出

### 各包的构建输出

#### @l2ui/components

```
dist/
├── index.js           # CommonJS
├── index.esm.js       # ES Module
├── index.d.ts         # TypeScript 类型
└── style.css          # 样式（如果有）
```

#### @l2ui/utils

```
dist/
├── index.js
├── index.esm.js
└── index.d.ts
```

#### l2ui (主入口包)

```
dist/
├── index.js
├── index.esm.js
├── index.d.ts
└── style.css
```

## 开发工作流

### 添加新组件

1. 在 `packages/components/src/` 创建组件目录
2. 实现组件文件（.tsx, .styles.ts, .types.ts）
3. 编写测试文件
4. 编写 Storybook 文档
5. 在 `packages/components/src/index.ts` 导出
6. 在 `packages/l2ui/src/components/index.ts` 重新导出

### 添加新工具函数

1. 在 `packages/utils/src/` 相应目录添加函数
2. 编写测试
3. 在相应目录的 `index.ts` 导出
4. 在 `packages/utils/src/index.ts` 导出

### 修改主题

1. 在 `packages/styles/src/theme/` 修改主题配置
2. 更新类型定义
3. 更新文档

## 总结

项目结构遵循以下原则：

1. **清晰的组织**: 每个包职责明确
2. **统一的规范**: 命名和结构统一
3. **易于扩展**: 添加新组件/工具简单
4. **便于维护**: 结构清晰，易于理解
5. **Monorepo 优势**: 代码共享，统一管理

如有结构相关问题，请参考本文档或提交 Issue 讨论。
