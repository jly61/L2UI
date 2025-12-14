# 开发指南

本文档提供 L2UI 组件库的本地开发、构建、测试等详细指南。

## 环境要求

### 必需环境

- **Node.js**: >= 16.0.0
- **pnpm**: >= 8.0.0

### 推荐工具

- **VS Code**: 推荐的代码编辑器
- **Git**: 版本控制
- **Chrome/Edge**: 开发调试浏览器

### 检查环境

```bash
# 检查 Node.js 版本
node -v

# 检查 pnpm 版本
pnpm -v

# 如果未安装 pnpm
npm install -g pnpm
```

## 项目初始化

### 1. 克隆项目

```bash
git clone https://github.com/your-org/l2ui.git
cd l2ui
```

### 2. 安装依赖

```bash
# 安装所有依赖（包括所有包的依赖）
pnpm install
```

### 3. 验证安装

```bash
# 运行类型检查
pnpm type-check

# 运行测试
pnpm test

# 如果都通过，说明环境配置成功
```

## 开发模式

### 启动开发服务器

#### 启动所有包的开发模式

```bash
pnpm dev
```

这会启动所有包的开发模式，包括：

- 组件包的开发模式（监听文件变化）
- 文档站点的开发服务器

#### 启动特定包的开发模式

```bash
# 启动组件包开发
pnpm --filter @l2ui/components dev

# 启动文档站点
pnpm --filter @l2ui/docs dev

# 启动主入口包开发
pnpm --filter l2ui dev
```

### 文档站点开发

文档站点基于 Storybook，提供交互式组件文档。

```bash
# 启动 Storybook
pnpm --filter @l2ui/docs dev

# 默认地址: http://localhost:6006
```

在 Storybook 中：

- 查看所有组件
- 测试组件交互
- 查看组件 API
- 测试不同主题
- **示例来源**：Story 统一放在 `packages/components/src/**/*.stories.tsx`，文档站仅提供装饰器、主题等全局配置，避免在 `apps/docs` 重复编写示例。

### 热模块替换 (HMR)

开发模式下支持 HMR：

- 修改组件代码自动刷新
- 修改样式实时更新
- 保持组件状态（如可能）

## 创建新组件

### 1. 创建组件目录

在 `packages/components/src/` 下创建组件目录：

```bash
mkdir packages/components/src/button
cd packages/components/src/button
```

### 2. 创建组件文件

按照组件结构创建文件：

```bash
# 组件主文件
touch Button.tsx

# 样式文件
touch Button.styles.ts

# 类型文件
touch Button.types.ts

# 测试文件
touch Button.test.tsx

# Storybook 文档
touch Button.stories.tsx

# 组件文档
touch README.md
```

### 3. 实现组件

#### Button.tsx

```tsx
import React from 'react';
import { StyledButton } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'default',
  size = 'medium',
  ...props
}) => {
  return (
    <StyledButton type={type} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
```

#### Button.types.ts

```tsx
import { ButtonHTMLAttributes } from 'react';

export type ButtonType = 'default' | 'primary' | 'dashed' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  size?: ButtonSize;
  loading?: boolean;
  block?: boolean;
}
```

#### Button.styles.ts

```tsx
import styled, { css } from 'styled-components';
import type { ButtonType, ButtonSize } from './Button.types';

export const StyledButton = styled.button<{
  type: ButtonType;
  size: ButtonSize;
}>`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) => {
    // 根据 type 设置样式
    switch (props.type) {
      case 'primary':
        return css`
          background-color: ${props.theme.colors.primary};
          border-color: ${props.theme.colors.primary};
          color: white;
        `;
      // ... 其他类型
    }
  }}

  ${(props) => {
    // 根据 size 设置样式
    switch (props.size) {
      case 'small':
        return css`
          padding: 4px 8px;
          font-size: 12px;
        `;
      case 'large':
        return css`
          padding: 12px 24px;
          font-size: 16px;
        `;
      default:
        return css`
          padding: 8px 16px;
          font-size: 14px;
        `;
    }
  }}
`;
```

### 4. 编写测试

#### Button.test.tsx

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('应该正确渲染', () => {
    render(<Button>点击我</Button>);
    expect(screen.getByText('点击我')).toBeInTheDocument();
  });

  it('应该响应点击事件', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>点击我</Button>);

    await userEvent.click(screen.getByText('点击我'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 5. 编写 Storybook 文档

#### Button.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '默认按钮',
  },
};

export const Primary: Story = {
  args: {
    type: 'primary',
    children: '主要按钮',
  },
};
```

### 6. 导出组件

在 `packages/components/src/index.ts` 中导出：

```tsx
export { Button, type ButtonProps } from './button';
```

在 `packages/l2ui/src/components/index.ts` 中重新导出：

```tsx
export { Button, type ButtonProps } from '@l2ui/components';
```

## 主题与设计体系

- 默认主题：`@l2ui/styles` 提供的 `defaultTheme`，组件与文档站统一使用。
- Token 维护：颜色、间距、排版、圆角、断点等集中定义于 `packages/styles/src/theme`，修改需保持向后兼容。
- 多主题计划：如需新增暗色/品牌主题，在 `styles` 包新增配置，并在 Storybook 提供主题切换示例。

## 质量与 CI 校验

- 本地建议：`pnpm lint && pnpm type-check && pnpm test` 覆盖基础质量。
- 文档校验：`pnpm --filter @l2ui/docs build`（Storybook build）确保 stories 可编译、无缺失。
- 覆盖率：新增组件补充交互测试，关键路径保持可验证的测试覆盖率；可按模块设定覆盖率目标。

## 构建

### 构建所有包

```bash
pnpm build
```

这会构建所有需要构建的包。

### 构建特定包

```bash
# 构建组件包
pnpm --filter @l2ui/components build

# 构建主入口包
pnpm --filter l2ui build

# 构建工具包
pnpm --filter @l2ui/utils build
```

### 构建输出

构建完成后，各包的输出在 `packages/[package-name]/dist/` 目录：

- `index.js`: CommonJS 格式
- `index.esm.js`: ES Module 格式
- `index.d.ts`: TypeScript 类型定义
- `style.css`: 样式文件（如果有）

## 测试

### 运行所有测试

```bash
pnpm test
```

### 运行特定包的测试

```bash
pnpm --filter @l2ui/components test
```

### 测试模式

#### Watch 模式

```bash
pnpm test:watch
```

文件变化时自动重新运行测试。

#### 覆盖率

```bash
pnpm test:coverage
```

生成测试覆盖率报告，查看 `coverage/` 目录。

### 测试文件组织

- 单元测试：与组件文件同目录，`.test.tsx`
- 集成测试：`__tests__/` 目录
- E2E 测试：`e2e/` 目录（如需要）

## 代码质量

### 代码检查

```bash
# ESLint 检查
pnpm lint

# 自动修复可修复的问题
pnpm lint:fix
```

### 代码格式化

```bash
# 格式化所有代码
pnpm format

# 检查格式（不修改）
pnpm format:check
```

### 类型检查

```bash
pnpm type-check
```

检查所有 TypeScript 类型错误。

### Git Hooks

项目配置了 Git Hooks：

- **pre-commit**: 运行 lint-staged（代码检查和格式化）
- **commit-msg**: 检查提交信息格式
- **pre-push**: 运行测试（可选）

提交代码时会自动运行相关检查。

## 调试

### VS Code 调试配置

项目包含 VS Code 调试配置（`.vscode/launch.json`），可以：

- 调试组件测试
- 调试 Storybook
- 调试构建脚本

### React DevTools

安装 React DevTools 浏览器扩展，用于：

- 查看组件树
- 检查组件 Props 和 State
- 性能分析

### 浏览器调试

- 使用浏览器开发者工具
- 查看 Source Map（开发模式）
- 网络请求分析

## 开发最佳实践

### 1. 组件开发

- ✅ 使用函数式组件和 Hooks
- ✅ 完整的 TypeScript 类型
- ✅ 支持受控和非受控模式
- ✅ 无障碍访问支持
- ✅ 响应式设计
- ✅ 完整的测试覆盖

### 2. 代码规范

- ✅ 遵循 ESLint 规则
- ✅ 使用 Prettier 格式化
- ✅ 有意义的变量和函数名
- ✅ 添加必要的注释
- ✅ 保持函数简洁

### 3. 提交规范

使用约定式提交（Conventional Commits）：

```
feat: 添加新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式（不影响功能）
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

示例：

```bash
git commit -m "feat(button): 添加 loading 状态支持"
git commit -m "fix(input): 修复受控模式下的值更新问题"
```

### 4. 测试

- ✅ 每个组件都有测试
- ✅ 覆盖主要功能
- ✅ 覆盖边界情况
- ✅ 测试用户交互

### 5. 文档

- ✅ 组件 README 完整
- ✅ Storybook 示例丰富
- ✅ API 文档清晰
- ✅ 使用示例明确

## 常见问题

### 依赖安装问题

如果遇到依赖安装问题：

```bash
# 清理 node_modules 和锁文件
rm -rf node_modules pnpm-lock.yaml
rm -rf packages/*/node_modules
rm -rf apps/*/node_modules

# 重新安装
pnpm install
```

### 构建失败

如果构建失败：

1. 检查 TypeScript 错误：`pnpm type-check`
2. 检查依赖是否完整：`pnpm install`
3. 清理构建缓存：删除 `dist/` 目录
4. 查看详细错误信息

### HMR 不工作

如果热更新不工作：

1. 检查文件是否正确保存
2. 重启开发服务器
3. 检查是否有语法错误
4. 清除浏览器缓存

### 类型错误

如果遇到类型错误：

1. 检查 `tsconfig.json` 配置
2. 确保所有类型正确导入
3. 使用 `any` 临时绕过（不推荐，尽快修复）

## 性能优化

### 开发时

- 使用 React DevTools Profiler 分析性能
- 注意不必要的重渲染
- 使用 `React.memo`、`useMemo`、`useCallback`

### 构建时

- 检查包体积
- 使用 `pnpm build --analyze` 分析（如配置）
- 确保 Tree-shaking 正常工作

## 下一步

- 查看 [架构设计文档](./architecture.md) 了解架构
- 查看 [贡献指南](./contributing.md) 了解如何贡献
- 查看 [技术选型文档](./tech-stack.md) 了解技术栈

如有开发相关问题，请提交 Issue 或查看相关文档。
