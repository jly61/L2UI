# 变更日志

本文档记录了 L2UI 组件库的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## 变更类型说明

- **新增**: 新功能、新组件、新 API
- **变更**: 现有功能的修改、API 的变更（向后兼容）
- **修复**: Bug 修复、问题解决
- **移除**: 已废弃功能的移除、API 的删除
- **废弃**: 即将移除的功能或 API（会在未来版本中移除）

## 版本发布流程

### 版本类型

1. **alpha** (内部测试版本)
   - 格式: `0.1.0-alpha.1`
   - 用途: 内部测试，功能可能不稳定
   - 发布标签: `alpha`

2. **beta** (公开测试版本)
   - 格式: `0.1.0-beta.1`
   - 用途: 公开测试，功能基本稳定，但可能仍有问题
   - 发布标签: `beta`

3. **stable** (稳定版本)
   - 格式: `0.1.0`
   - 用途: 生产环境可用
   - 发布标签: `latest`

### 版本号规则（语义化版本）

- **主版本号（Major）**: 不兼容的 API 修改
  - 示例: `1.0.0` → `2.0.0`
  - 使用: `pnpm release:major`

- **次版本号（Minor）**: 向下兼容的功能性新增
  - 示例: `1.0.0` → `1.1.0`
  - 使用: `pnpm release:minor`

- **修订号（Patch）**: 向下兼容的问题修正
  - 示例: `1.0.0` → `1.0.1`
  - 使用: `pnpm release:patch`

### 发布命令

```bash
# 预发布版本
pnpm release:alpha    # 发布 alpha 版本
pnpm release:beta     # 发布 beta 版本
pnpm release:stable   # 发布稳定版本（移除预发布标识）

# 正式版本
pnpm release:patch    # 补丁版本
pnpm release:minor    # 次版本
pnpm release:major    # 主版本
```

### 发布流程

1. 确保工作区干净（无未提交更改）
2. 运行测试和类型检查
3. 构建所有包
4. 自动更新版本号
5. 自动更新 CHANGELOG.md
6. 创建 git commit 和 tag
7. 发布到 npm
8. 推送代码和标签到远程仓库
9. 创建 GitHub Release

## 编写变更日志指南

### 格式要求

```markdown
## [版本号] - YYYY-MM-DD

### 新增

- 新功能描述
- 新组件: **ComponentName** - 组件说明
  - 功能点 1
  - 功能点 2

### 变更

- 变更内容描述
- **ComponentName**: 变更说明

### 修复

- 修复的问题描述
- **ComponentName**: 修复说明

### 移除

- 移除的功能描述

### 废弃

- 废弃的功能，将在 X.X.X 版本中移除
```

### 编写建议

1. **清晰简洁**: 使用简洁明了的语言描述变更
2. **分类明确**: 将变更归类到正确的类型中
3. **关联组件**: 如果变更涉及特定组件，使用 **粗体** 标注组件名
4. **用户视角**: 从用户角度描述变更的影响
5. **链接引用**: 对于重要变更，可以链接到相关 issue 或 PR

### 示例

```markdown
## [0.2.0] - 2024-01-15

### 新增

- **Select**: 新增多选模式支持
  - 支持 `multiple` 属性
  - 支持自定义选项渲染
- **Form**: 新增表单验证功能
  - 支持自定义验证规则
  - 支持异步验证

### 变更

- **Button**: 优化 loading 状态的视觉效果
- **Input**: 改进焦点状态的样式

### 修复

- **DatePicker**: 修复日期范围选择时的边界问题
- **Form**: 修复表单重置时验证状态未清除的问题

### 废弃

- **Button**: `icon` 属性将在 0.3.0 版本中移除，请使用 `icon` 插槽替代
```

## [未发布]

### 新增

- 新增组件功能

### 变更

- 变更的功能

### 修复

- 修复的问题

### 移除

- 移除的功能

## [0.1.0-alpha.1] - 2025-12-14

### 新增

- 详见发布说明

### 变更

- 无

### 修复

- 无

### 移除

- 无

## [0.1.0-alpha.2] - 2025-12-14

### 新增

- 详见发布说明

### 变更

- 无

### 修复

- 无

### 移除

- 无

## [0.1.0-alpha.3] - 2025-12-14

### 新增

- 详见发布说明

### 变更

- 无

### 修复

- 无

### 移除

- 无

## [0.1.0-alpha.4] - 2025-12-14

### 新增

- 详见发布说明

### 变更

- 无

### 修复

- 无

### 移除

- 无

---

## [0.1.0] - 2024-01-XX

### 新增

#### 组件

- **Button**: 按钮组件，支持多种类型、尺寸和状态
  - 支持 `primary`、`default`、`dashed`、`text`、`link` 类型
  - 支持 `small`、`medium`、`large` 尺寸
  - 支持 `loading`、`disabled` 状态
  - 支持图标和图标位置配置

- **Input**: 输入框组件
  - 支持受控和非受控模式
  - 支持 `small`、`medium`、`large` 尺寸
  - 支持 `disabled`、`readOnly` 状态
  - 支持前缀和后缀插槽

- **Select**: 选择器组件
  - 支持单选和多选模式
  - 支持搜索功能
  - 支持自定义选项渲染
  - 支持禁用选项

- **Checkbox**: 复选框组件
  - 支持单个和组模式
  - 支持 `small`、`medium`、`large` 尺寸
  - 支持 `disabled`、`indeterminate` 状态

- **DatePicker**: 日期选择器组件
  - 支持日期、月份、年份选择
  - 支持日期范围选择
  - 支持自定义日期格式
  - 支持禁用日期

- **Form**: 表单组件
  - 支持表单验证
  - 支持多种布局（horizontal、vertical、inline）
  - 支持表单实例方法（submit、reset、validate）
  - 支持自定义验证规则

#### 样式系统

- **主题系统**: 完整的主题配置系统
  - 亮色主题（defaultTheme）
  - 暗色主题（darkTheme）
  - 主题切换支持

- **全局样式**:
  - CSS Reset 样式
  - CSS 变量支持
  - 主题 Token 文档

#### 工具函数

- **类型判断**: `isString`、`isNumber`、`isObject` 等
- **格式化函数**: `formatDate`、`formatNumber` 等
- **DOM 工具**: `getElement`、`addClass`、`removeClass` 等

#### 文档

- Storybook 配置和组件文档
- 开发指南和贡献指南
- 架构设计文档

### 变更

- 无

### 修复

- 无

### 移除

- 无

---

---

## 链接

- [GitHub Releases](https://github.com/your-org/l2ui/releases)
- [文档站点](https://l2ui.dev)
- [问题反馈](https://github.com/your-org/l2ui/issues)
