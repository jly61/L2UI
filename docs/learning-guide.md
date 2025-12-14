# L2UI 项目学习指南

本指南将帮助你从零开始，逐步深入掌握 L2UI 组件库项目的各个方面。

## 📚 学习路径概览

```
阶段一：项目基础理解 (1-2天)
  ├── 项目结构
  ├── 技术栈
  └── 开发环境

阶段二：核心概念掌握 (3-5天)
  ├── Monorepo 架构
  ├── 组件开发流程
  └── 构建系统

阶段三：实践开发 (1-2周)
  ├── 开发新组件
  ├── 编写测试
  └── 完善文档

阶段四：深入理解 (持续)
  ├── 性能优化
  ├── 架构设计
  └── 最佳实践
```

---

## 🎯 阶段一：项目基础理解

### 第一步：了解项目结构

**目标**：理解项目的整体组织方式

**行动**：

1. 阅读 [项目结构文档](./project-structure.md)
2. 浏览项目目录，理解 Monorepo 的组织方式：

   ```bash
   # 查看整体结构
   tree -L 3 -I 'node_modules|dist'

   # 重点关注这些目录：
   # - packages/     # 所有包的源码
   # - apps/         # 应用（如文档站点）
   # - docs/         # 项目文档
   ```

**关键理解点**：

- 为什么使用 Monorepo？
- 各个包的职责是什么？
- 包之间的依赖关系如何？

### 第二步：理解技术栈

**目标**：掌握项目使用的核心技术

**行动**：

1. 阅读 [技术选型文档](./tech-stack.md)
2. 了解每个技术的作用：
   - **Vite**: 构建工具，为什么选择它？
   - **TypeScript**: 类型安全
   - **styled-components**: CSS-in-JS 方案
   - **Vitest**: 测试框架
   - **Storybook**: 组件文档

**实践**：

```bash
# 查看各包的配置文件
cat packages/components/vite.config.ts
cat packages/components/tsconfig.json
cat packages/components/vitest.config.ts
```

### 第三步：搭建开发环境

**目标**：能够运行和开发项目

**行动**：

1. 按照 [快速开始指南](../QUICKSTART.md) 安装依赖
2. 启动开发环境：

   ```bash
   # 启动 Storybook（查看组件）
   pnpm --filter @l2ui/docs dev

   # 开发模式构建组件
   pnpm --filter @l2ui/components dev
   ```

**验证**：

- ✅ Storybook 能正常启动
- ✅ 能看到 Button 组件
- ✅ 能修改代码并看到变化

---

## 🔧 阶段二：核心概念掌握

### 第一步：理解 Monorepo 架构

**目标**：理解 Monorepo 的工作原理

**学习内容**：

1. **pnpm workspaces**
   - 查看 `pnpm-workspace.yaml`
   - 理解 workspace 协议（`workspace:*`）
   - 了解依赖提升和隔离

2. **包之间的依赖关系**
   ```
   l2ui (主入口)
     ├── @l2ui/components
     │     ├── @l2ui/utils
     │     └── @l2ui/styles
     ├── @l2ui/utils
     └── @l2ui/styles
   ```

**实践**：

```bash
# 查看依赖关系
pnpm list --depth=2

# 查看某个包的依赖
pnpm --filter @l2ui/components list
```

### 第二步：掌握组件开发流程

**目标**：理解如何开发一个完整的组件

**学习路径**：以 Button 组件为例

1. **查看组件结构**

   ```bash
   cd packages/components/src/button
   ls -la
   ```

   理解每个文件的作用：
   - `Button.tsx` - 组件实现
   - `Button.styles.ts` - 样式定义
   - `Button.types.ts` - 类型定义
   - `Button.test.tsx` - 单元测试
   - `Button.stories.tsx` - Storybook 文档
   - `README.md` - 组件文档

2. **阅读代码**
   - 从 `Button.types.ts` 开始，理解组件的 API 设计
   - 看 `Button.tsx`，理解组件逻辑
   - 看 `Button.styles.ts`，理解样式系统
   - 看 `Button.test.tsx`，理解测试方法

3. **理解设计模式**
   - 受控/非受控模式
   - Props 设计原则
   - 样式变体处理

**实践**：

- 尝试修改 Button 组件，添加一个新属性
- 观察 Storybook 中的变化
- 运行测试，确保功能正常

### 第三步：理解构建系统

**目标**：理解代码如何被构建和打包

**学习内容**：

1. **Vite 配置**

   ```bash
   # 查看构建配置
   cat packages/components/vite.config.ts
   ```

   理解：
   - 库模式构建（`build.lib`）
   - 外部化依赖（`external`）
   - 多格式输出（ESM、CJS）

2. **TypeScript 配置**

   ```bash
   # 查看 TS 配置
   cat packages/components/tsconfig.json
   ```

   理解：
   - 继承关系
   - 路径别名
   - 类型声明生成

3. **构建流程**

   ```bash
   # 构建组件包
   pnpm --filter @l2ui/components build

   # 查看输出
   ls -la packages/components/dist/
   ```

**实践**：

- 修改构建配置，观察输出变化
- 理解为什么需要 ESM 和 CJS 两种格式

---

## 💻 阶段三：实践开发

### 第一步：开发一个新组件

**目标**：从零开始开发一个完整的组件

**建议组件**：Input（输入框）

**步骤**：

1. **规划组件 API**

   ```typescript
   // Input.types.ts
   interface InputProps {
     value?: string;
     defaultValue?: string;
     placeholder?: string;
     disabled?: boolean;
     size?: 'small' | 'medium' | 'large';
     // ...
   }
   ```

2. **创建文件结构**

   ```bash
   cd packages/components/src
   mkdir input
   cd input
   touch Input.tsx Input.styles.ts Input.types.ts Input.test.tsx Input.stories.tsx README.md
   ```

3. **实现组件**
   - 先写类型定义
   - 再写样式
   - 然后实现组件逻辑
   - 最后写测试和文档

4. **导出组件**

   ```typescript
   // packages/components/src/index.ts
   export { Input, type InputProps } from './input';
   ```

5. **在 Storybook 中查看**
   - 创建 `apps/docs/src/Input.stories.tsx`
   - 启动 Storybook 查看效果

**参考**：完全参考 Button 组件的实现方式

### 第二步：编写测试

**目标**：为组件编写完整的测试

**学习内容**：

1. **测试工具**
   - Vitest - 测试框架
   - React Testing Library - React 组件测试
   - @testing-library/user-event - 用户交互模拟

2. **测试类型**
   - 渲染测试
   - 交互测试
   - 边界情况测试

3. **查看示例**
   ```bash
   cat packages/components/src/button/Button.test.tsx
   ```

**实践**：

- 为 Input 组件编写测试
- 确保测试覆盖率 > 80%

### 第三步：完善文档

**目标**：编写清晰的组件文档

**文档内容**：

1. **README.md** - 组件使用文档
   - 基本用法
   - API 说明
   - 示例代码

2. **Storybook Stories** - 交互式文档
   - 多种使用场景
   - 可交互的示例

**参考**：

```bash
cat packages/components/src/button/README.md
cat packages/components/src/button/Button.stories.tsx
```

---

## 🚀 阶段四：深入理解

### 第一步：理解架构设计

**目标**：深入理解项目的架构决策

**学习内容**：

1. 阅读 [架构设计文档](./architecture.md)
2. 理解：
   - 为什么这样组织代码？
   - 设计模式的选择
   - 性能优化策略

**思考问题**：

- 为什么使用 styled-components 而不是 CSS Modules？
- 为什么选择 Monorepo 而不是单包？
- 如何实现按需加载？

### 第二步：性能优化

**目标**：理解性能优化方法

**学习内容**：

1. **Tree-shaking**
   - 如何确保支持？
   - 检查构建产物大小

2. **代码分割**
   - 懒加载实现
   - 动态导入

3. **运行时优化**
   - React.memo 的使用
   - useMemo/useCallback 的使用

**实践**：

```bash
# 分析构建产物
pnpm --filter @l2ui/components build
ls -lh packages/components/dist/
```

### 第三步：主题系统

**目标**：理解主题系统的工作原理

**学习内容**：

1. 查看主题定义

   ```bash
   cat packages/styles/src/theme/index.ts
   ```

2. 理解主题使用
   - 在 styled-components 中使用
   - 主题切换机制
   - 自定义主题

3. **实践**：
   - 修改主题颜色
   - 创建自定义主题
   - 在 Storybook 中切换主题

---

## 📖 推荐学习顺序

### 第1天：项目概览

- [ ] 阅读所有文档（README、架构、技术选型）
- [ ] 浏览项目结构
- [ ] 启动开发环境

### 第2天：理解 Button 组件

- [ ] 仔细阅读 Button 组件的所有文件
- [ ] 理解每个文件的作用
- [ ] 在 Storybook 中测试各种属性

### 第3-4天：开发 Input 组件

- [ ] 规划组件 API
- [ ] 实现组件
- [ ] 编写测试
- [ ] 完善文档

### 第5天：理解构建系统

- [ ] 研究 Vite 配置
- [ ] 理解构建流程
- [ ] 查看构建产物

### 第6-7天：深入架构

- [ ] 阅读架构文档
- [ ] 理解设计决策
- [ ] 思考优化方案

---

## 🎓 关键概念速查

### Monorepo

- **定义**：多个相关项目放在一个仓库中
- **优势**：代码共享、统一管理、原子提交
- **工具**：pnpm workspaces

### 组件设计原则

- **单一职责**：每个组件只做一件事
- **可组合性**：支持组合使用
- **受控/非受控**：同时支持两种模式
- **类型安全**：完整的 TypeScript 支持

### 样式系统

- **styled-components**：CSS-in-JS 方案
- **主题系统**：统一的主题配置
- **变体处理**：通过 props 控制样式变体

### 测试策略

- **单元测试**：组件逻辑
- **集成测试**：组件交互
- **快照测试**：UI 一致性

---

## 🔍 深入学习建议

### 1. 阅读源码

- 从 Button 组件开始，理解每个细节
- 研究 styled-components 的使用模式
- 学习 TypeScript 类型设计

### 2. 实践项目

- 开发 3-5 个不同的组件
- 每个组件都要完整（代码、测试、文档）
- 尝试不同的设计模式

### 3. 性能分析

- 使用 React DevTools Profiler
- 分析构建产物大小
- 优化组件性能

### 4. 参考优秀项目

- Ant Design
- Material-UI
- Chakra UI

---

## ❓ 常见问题

### Q: 如何添加新组件？

A: 参考 [开发指南 - 创建新组件](./development.md#创建新组件)

### Q: 如何修改主题？

A: 查看 `packages/styles/src/theme/index.ts`，修改后重新构建

### Q: 测试失败怎么办？

A: 检查测试文件，确保使用 `vi.fn()` 而不是 `jest.fn()`

### Q: Storybook 无法加载组件？

A: 检查路径别名配置，确保 `apps/docs/.storybook/main.ts` 中的路径正确

---

## 📝 学习检查清单

### 基础理解

- [ ] 能解释项目结构
- [ ] 理解 Monorepo 概念
- [ ] 知道各包的职责
- [ ] 能启动开发环境

### 组件开发

- [ ] 理解组件文件结构
- [ ] 能开发新组件
- [ ] 能编写测试
- [ ] 能完善文档

### 构建系统

- [ ] 理解 Vite 配置
- [ ] 知道如何构建
- [ ] 理解输出格式

### 深入理解

- [ ] 理解架构设计
- [ ] 知道性能优化方法
- [ ] 理解主题系统
- [ ] 能解决常见问题

---

## 🎯 下一步行动

1. **立即开始**：按照阶段一开始学习
2. **实践为主**：多写代码，少看理论
3. **遇到问题**：查看文档或提交 Issue
4. **持续改进**：不断优化代码和文档

---

**祝你学习愉快！** 🚀

如有问题，请查看相关文档或提交 Issue。
