# 贡献指南

感谢您对 L2UI 的关注！我们欢迎所有形式的贡献。

## 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议，请：

1. 搜索现有 Issue，确保问题未被报告
2. 创建新 Issue，提供：
   - 清晰的问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境信息（浏览器、Node.js 版本等）
   - 相关代码或截图

### 提交代码

#### 1. Fork 项目

1. Fork 本仓库
2. 克隆您的 Fork：

```bash
git clone https://github.com/your-username/l2ui.git
cd l2ui
```

#### 2. 创建分支

```bash
# 从 main 分支创建新分支
git checkout -b feat/your-feature-name

# 或修复 bug
git checkout -b fix/your-bug-fix
```

分支命名规范：

- `feat/`: 新功能
- `fix/`: Bug 修复
- `docs/`: 文档更新
- `style/`: 代码格式
- `refactor/`: 重构
- `test/`: 测试相关
- `chore/`: 构建/工具相关

#### 3. 开发

- 遵循代码规范
- 编写测试
- 更新文档
- 确保所有测试通过

#### 4. 提交代码

使用约定式提交（Conventional Commits）：

```bash
git commit -m "feat(button): 添加 loading 状态支持"
```

提交信息格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**: 提交类型（feat, fix, docs, style, refactor, test, chore）
- **scope**: 影响范围（组件名、包名等）
- **subject**: 简短描述
- **body**: 详细描述（可选）
- **footer**: 相关 Issue（可选）

#### 5. 推送代码

```bash
git push origin feat/your-feature-name
```

#### 6. 创建 Pull Request

1. 在 GitHub 上创建 Pull Request
2. 填写 PR 描述：
   - 说明变更内容
   - 关联相关 Issue
   - 添加截图（如 UI 变更）
3. 等待代码审查

## 开发规范

### 代码风格

- 遵循 ESLint 规则
- 使用 Prettier 格式化
- 使用 TypeScript 严格模式
- 遵循 React Hooks 规则

### 组件开发

#### 组件结构

每个组件应包含：

1. **组件实现** (`ComponentName.tsx`)
   - 清晰的组件逻辑
   - 完整的类型定义
   - 适当的注释

2. **样式定义** (`ComponentName.styles.ts`)
   - 使用 styled-components
   - 支持主题
   - 响应式设计

3. **类型定义** (`ComponentName.types.ts`)
   - 完整的 Props 类型
   - 导出所有相关类型

4. **单元测试** (`ComponentName.test.tsx`)
   - 覆盖主要功能
   - 覆盖边界情况
   - 测试用户交互

5. **Storybook 文档** (`ComponentName.stories.tsx`)
   - 多种使用场景
   - 交互式示例
   - 清晰的文档
   - **放置位置**：统一存放在 `packages/components/src/**/*/*.stories.tsx`，docs 站直接复用，避免在 `apps/docs` 重复编写

6. **README** (`README.md`)
   - 组件说明
   - API 文档
   - 使用示例

#### 组件设计原则

1. **单一职责**: 每个组件只做一件事
2. **可组合性**: 支持组合使用
3. **受控/非受控**: 同时支持两种模式
4. **无障碍**: 遵循 WCAG 标准
5. **性能**: 避免不必要的重渲染
6. **类型安全**: 完整的 TypeScript 支持

#### 示例：Button 组件

```tsx
// Button.tsx
import React from 'react';
import { StyledButton } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'default',
  size = 'medium',
  loading = false,
  disabled,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    onClick?.(e);
  };

  return (
    <StyledButton
      type={type}
      size={size}
      loading={loading}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && <LoadingIcon />}
      {children}
    </StyledButton>
  );
};

export default Button;
```

### 测试规范

#### 测试覆盖

- 组件渲染
- 用户交互
- Props 变化
- 边界情况
- 错误处理

#### 测试示例

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

  it('loading 状态下应该禁用', () => {
    render(<Button loading>加载中</Button>);
    expect(screen.getByText('加载中')).toBeDisabled();
  });
});
```

### 文档规范

#### README 结构

```markdown
# ComponentName

组件描述

## 基本用法

代码示例

## API

### Props

| 属性  | 说明 | 类型 | 默认值       |
| ----- | ---- | ---- | ------------ |
| prop1 | 描述 | type | defaultValue |

## 示例

更多示例
```

#### Storybook 文档

- 提供多种使用场景
- 展示不同 Props 组合
- 包含交互式示例
- 添加使用说明

## 代码审查流程

### PR 检查清单

提交 PR 前，请确保：

- [ ] 代码遵循项目规范
- [ ] 所有测试通过
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] 提交信息符合规范
- [ ] 没有控制台错误或警告
- [ ] 代码已格式化
- [ ] 类型检查通过

### 审查要点

审查者会关注：

1. **代码质量**
   - 代码清晰易懂
   - 遵循最佳实践
   - 没有明显的性能问题

2. **功能完整性**
   - 功能按预期工作
   - 边界情况处理
   - 错误处理

3. **测试覆盖**
   - 测试充分
   - 测试用例合理

4. **文档完整性**
   - README 完整
   - Storybook 示例丰富
   - API 文档清晰

5. **一致性**
   - 与现有代码风格一致
   - 遵循项目约定

## 开发环境设置

### 1. 安装依赖

```bash
pnpm install
```

### 2. 运行开发服务器

```bash
# 启动文档站点
pnpm --filter @l2ui/docs dev
```

### 3. 运行测试

```bash
pnpm test
```

### 4. 代码检查

```bash
pnpm lint
pnpm type-check
```

详细设置请查看 [开发指南](./development.md)

## 添加新组件

### 步骤

1. 在 `packages/components/src/` 创建组件目录
2. 实现组件（参考现有组件）
3. 编写测试
4. 编写 Storybook 文档
5. 更新导出文件
6. 提交 PR

详细步骤请查看 [开发指南 - 创建新组件](./development.md#创建新组件)

## 问题讨论

### 讨论渠道

- **GitHub Issues**: 功能建议、Bug 报告
- **GitHub Discussions**: 一般性讨论
- **Pull Requests**: 代码相关讨论

### 提问指南

提问时请提供：

1. 清晰的问题描述
2. 复现步骤
3. 预期行为
4. 实际行为
5. 环境信息
6. 相关代码

## 行为准则

### 我们的承诺

为了营造开放和友好的环境，我们承诺：

- 尊重所有贡献者
- 接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不可接受的行为

- 使用性化的语言或图像
- 人身攻击、侮辱性/贬损性评论
- 公开或私下骚扰
- 未经明确许可发布他人私人信息
- 其他不道德或不专业的行为

## 许可证

通过贡献，您同意您的贡献将在与项目相同的许可证下发布。

## 致谢

感谢所有为 L2UI 做出贡献的开发者！

---

如有任何问题，请随时提出 Issue 或联系维护者。
