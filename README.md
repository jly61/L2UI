# L2UI

一个现代化的 React 组件库，基于 Monorepo 架构，使用 Vite、TypeScript、styled-components 等现代技术栈构建。

## 📦 项目简介

L2UI 是一个高质量的 React UI 组件库，旨在提供：
- 🎨 精美的设计和良好的用户体验
- ⚡ 优秀的性能和按需加载
- 🔧 完整的 TypeScript 支持
- 📱 响应式设计，支持移动端
- ♿ 无障碍访问支持
- 🌍 国际化支持

## 🚀 快速开始

### 安装

```bash
# 使用 npm
npm install l2ui

# 使用 yarn
yarn add l2ui

# 使用 pnpm
pnpm add l2ui
```

### 使用示例

```tsx
import React from 'react';
import { Button, Input } from 'l2ui';

function App() {
  return (
    <div>
      <Button type="primary">点击我</Button>
      <Input placeholder="请输入内容" />
    </div>
  );
}
```

## 📚 文档

- [学习指南](./docs/learning-guide.md) ⭐ **新手必读** - 从零开始掌握项目
- [快速参考](./docs/quick-reference.md) - 常用命令和配置速查
- [架构设计](./docs/architecture.md) - 项目架构和设计理念
- [开发指南](./docs/development.md) - 本地开发和构建指南
- [技术选型](./docs/tech-stack.md) - 技术栈说明
- [项目结构](./docs/project-structure.md) - 目录结构说明
- [贡献指南](./docs/contributing.md) - 如何参与贡献

## 🏗️ 项目结构

本项目采用 Monorepo 架构，使用 pnpm workspaces 管理：

```
L2UI/
├── packages/
│   ├── components/      # 组件源码包
│   ├── utils/           # 工具函数包
│   ├── styles/          # 样式主题包
│   └── l2ui/            # 主入口包
├── apps/
│   └── docs/            # 文档站点
├── scripts/             # 构建脚本
└── docs/                # 项目文档
```

详细结构说明请查看 [项目结构文档](./docs/project-structure.md)

## 🛠️ 技术栈

- **构建工具**: Vite
- **语言**: TypeScript
- **样式方案**: styled-components
- **测试**: Vitest + React Testing Library
- **文档**: Storybook
- **包管理**: pnpm workspaces
- **代码规范**: ESLint + Prettier

详细技术选型说明请查看 [技术选型文档](./docs/tech-stack.md)

## 📦 包说明

### @l2ui/components
组件源码包，包含所有 UI 组件的实现。

### @l2ui/utils
工具函数包，提供通用的工具方法。

### @l2ui/styles
样式主题包，包含主题配置和全局样式。

### l2ui
主入口包，导出所有组件和工具，供用户使用。

### @l2ui/docs
文档站点应用，基于 Storybook 构建的组件文档。

## 🎯 开发

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动所有包的开发模式
pnpm dev

# 启动特定包的开发模式
pnpm --filter @l2ui/components dev

# 启动文档站点
pnpm --filter @l2ui/docs dev
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

# 测试覆盖率
pnpm test:coverage
```

### 代码检查

```bash
# ESLint 检查
pnpm lint

# 代码格式化
pnpm format

# 类型检查
pnpm type-check
```

详细开发指南请查看 [开发指南文档](./docs/development.md)

## 📝 组件列表

### 基础组件
- Button - 按钮
- Icon - 图标
- Typography - 排版

### 布局组件
- Layout - 布局
- Grid - 栅格
- Space - 间距
- Divider - 分割线

### 表单组件
- Input - 输入框
- TextArea - 文本域
- Select - 选择器
- Checkbox - 复选框
- Radio - 单选框
- Switch - 开关
- DatePicker - 日期选择器
- Form - 表单

### 数据展示
- Table - 表格
- List - 列表
- Card - 卡片
- Tag - 标签
- Badge - 徽标
- Tooltip - 文字提示
- Popover - 气泡卡片

### 反馈组件
- Message - 全局提示
- Notification - 通知提醒
- Modal - 对话框
- Drawer - 抽屉
- Loading - 加载中
- Progress - 进度条
- Alert - 警告提示

### 导航组件
- Menu - 导航菜单
- Tabs - 标签页
- Breadcrumb - 面包屑
- Pagination - 分页
- Steps - 步骤条

## 🤝 贡献

我们欢迎所有形式的贡献！请查看 [贡献指南](./docs/contributing.md) 了解如何参与。

## 📄 许可证

MIT License

## 🔗 相关链接

- [GitHub](https://github.com/your-org/l2ui)
- [文档站点](https://l2ui.dev)
- [问题反馈](https://github.com/your-org/l2ui/issues)

## 📞 联系我们

如有任何问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 加入讨论群

---

Made with ❤️ by L2UI Team

