# 架构设计文档

## 概述

L2UI 采用 Monorepo 架构，使用 pnpm workspaces 进行包管理。整个项目分为多个独立的包，每个包都有明确的职责和边界。

## 架构原则

### 1. 模块化设计
- 每个组件都是独立的模块
- 组件之间低耦合，高内聚
- 支持按需加载

### 2. 类型安全
- 全面使用 TypeScript
- 严格的类型检查
- 完整的类型定义导出

### 3. 性能优化
- Tree-shaking 支持
- 按需加载
- 代码分割
- 懒加载支持

### 4. 可维护性
- 清晰的代码结构
- 完善的文档
- 统一的代码规范
- 完整的测试覆盖

## Monorepo 架构

### 包结构

```
L2UI/
├── packages/
│   ├── components/      # 组件源码包
│   ├── utils/           # 工具函数包
│   ├── styles/          # 样式主题包
│   └── l2ui/            # 主入口包（聚合包）
├── apps/
│   └── docs/            # 文档应用
└── scripts/             # 共享脚本
```

### 包职责划分

#### @l2ui/components
**职责**: 所有 UI 组件的实现

**特点**:
- 每个组件独立目录
- 包含组件代码、样式、测试、文档
- 不依赖其他业务逻辑包
- 可以独立构建和测试

**依赖关系**:
- 依赖 `@l2ui/utils`（工具函数）
- 依赖 `@l2ui/styles`（主题样式）
- 不依赖 `l2ui`（主入口包）

#### @l2ui/utils
**职责**: 通用工具函数

**特点**:
- 纯函数，无副作用
- 不依赖 React
- 可以独立使用
- 完整的类型定义

**包含内容**:
- 类型判断函数
- 格式化函数
- 数据处理函数
- DOM 操作工具
- 事件处理工具

#### @l2ui/styles
**职责**: 样式和主题系统

**特点**:
- 主题配置
- 全局样式
- CSS 变量定义
- 主题切换支持

**包含内容**:
- 主题配置（颜色、字体、间距等）
- 全局样式重置
- 动画定义
- 响应式断点

#### l2ui（主入口包）
**职责**: 统一导出所有组件和工具

**特点**:
- 聚合所有组件
- 提供统一的 API
- 处理样式注入
- 配置全局设置

**功能**:
- 导出所有组件
- 导出工具函数
- 提供 ConfigProvider（全局配置）
- 提供主题切换功能

#### @l2ui/docs
**职责**: 组件文档和示例

**特点**:
- 基于 Storybook
- 交互式文档
- 代码示例
- 设计规范

## 组件设计模式

### 1. 组件结构

每个组件遵循统一的目录结构：

```
components/
└── button/
    ├── index.tsx           # 组件主文件
    ├── Button.tsx          # 组件实现
    ├── Button.styles.ts    # 样式定义
    ├── Button.types.ts     # 类型定义
    ├── Button.test.tsx     # 单元测试
    ├── Button.stories.tsx  # Storybook 文档
    └── README.md           # 组件文档
```

### 2. 组件 API 设计原则

#### 受控/非受控模式
组件同时支持受控和非受控两种模式：

```tsx
// 受控模式
const [value, setValue] = useState('');
<Input value={value} onChange={setValue} />

// 非受控模式
<Input defaultValue="初始值" />
```

#### 组合优于配置
优先使用组合模式，而非大量配置项：

```tsx
// 好的设计
<Modal>
  <Modal.Header>标题</Modal.Header>
  <Modal.Body>内容</Modal.Body>
  <Modal.Footer>底部</Modal.Footer>
</Modal>

// 避免过度配置
<Modal header="标题" body="内容" footer="底部" />
```

#### 一致的命名
- Props 命名遵循 React 约定
- 事件处理使用 `on` 前缀
- 布尔值使用 `is` 或 `has` 前缀

### 3. 样式系统

#### styled-components 使用规范

```tsx
// 基础样式组件
const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.primary};
`;

// 变体样式
const Button = styled(StyledButton)<{ variant: 'primary' | 'secondary' }>`
  ${props => props.variant === 'primary' && css`
    background-color: ${props.theme.colors.primary};
  `}
`;
```

#### 主题系统

```tsx
// 主题配置
const theme = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    // ...
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    // ...
  },
  // ...
};

// 使用主题
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

## 数据流设计

### 1. 组件状态管理

- **本地状态**: 使用 `useState`、`useReducer`
- **表单状态**: 使用 `Form` 组件的内置状态管理
- **全局状态**: 使用 Context API（如主题、语言等）

### 2. 事件处理

- 所有事件处理函数使用 `on` 前缀
- 事件对象类型明确
- 支持事件冒泡控制

### 3. 数据传递

- Props 传递：父子组件通信
- Context：跨层级组件通信
- 回调函数：子组件向父组件通信

## 构建系统

### 1. 构建目标

- **ES Module**: 现代浏览器和构建工具
- **CommonJS**: Node.js 环境
- **UMD**: 浏览器直接使用（可选）

### 2. 构建配置

#### Vite 配置要点

```typescript
// 外部化依赖
external: ['react', 'react-dom']

// 多入口构建
build: {
  lib: {
    entry: 'src/index.ts',
    formats: ['es', 'cjs']
  }
}

// CSS 处理
css: {
  modules: false, // styled-components 不需要
  extract: true
}
```

### 3. 输出结构

```
dist/
├── index.js           # CommonJS 入口
├── index.esm.js       # ES Module 入口
├── index.d.ts         # TypeScript 类型定义
└── style.css          # 样式文件（如果有）
```

## 测试策略

### 1. 测试层级

- **单元测试**: 组件逻辑、工具函数
- **集成测试**: 组件交互、表单提交
- **快照测试**: UI 一致性
- **E2E 测试**: 完整用户流程（可选）

### 2. 测试工具

- **Vitest**: 测试框架
- **React Testing Library**: React 组件测试
- **@testing-library/user-event**: 用户交互模拟

### 3. 测试覆盖目标

- 工具函数: 100% 覆盖率
- 组件核心逻辑: > 80% 覆盖率
- 边界情况: 重点覆盖

## 性能优化

### 1. 代码层面

- **React.memo**: 避免不必要的重渲染
- **useMemo/useCallback**: 缓存计算结果和函数
- **懒加载**: 大型组件使用 `React.lazy`
- **代码分割**: 路由级别的代码分割

### 2. 构建层面

- **Tree-shaking**: 移除未使用代码
- **压缩**: 代码和样式压缩
- **Source Map**: 生产环境可选

### 3. 运行时优化

- **虚拟滚动**: 长列表优化
- **防抖节流**: 事件处理优化
- **按需渲染**: 条件渲染优化

## 无障碍支持

### 1. ARIA 属性

- 正确使用 ARIA 标签
- 语义化 HTML
- 键盘导航支持

### 2. 键盘操作

- Tab 键导航
- Enter/Space 键激活
- Esc 键关闭
- 方向键导航（如菜单）

### 3. 屏幕阅读器

- 提供有意义的文本
- 状态变化通知
- 错误提示清晰

## 国际化支持

### 1. 文本提取

- 所有用户可见文本提取到语言包
- 使用 i18n 库管理翻译

### 2. 语言切换

- 通过 ConfigProvider 配置语言
- 支持动态切换
- 日期、数字格式化

## 版本管理

### 1. 语义化版本

- **主版本号**: 不兼容的 API 修改
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

### 2. 变更日志

- 维护 CHANGELOG.md
- 记录所有变更
- 标注破坏性变更

## 发布流程

### 1. 版本发布步骤

1. 更新版本号
2. 更新 CHANGELOG
3. 运行测试
4. 构建所有包
5. 发布到 npm
6. 创建 Git Tag

### 2. 自动化

- CI/CD 自动化测试
- 自动化版本发布（可选）
- 自动化文档部署

## 未来规划

### 短期目标

- 完成核心组件开发
- 完善文档和示例
- 提升测试覆盖率

### 中期目标

- 性能优化
- 无障碍完善
- 国际化支持

### 长期目标

- 设计系统完善
- 主题定制工具
- 可视化配置平台

