# 版本发布指南

本文档详细说明 L2UI 组件库的版本发布流程和规范。

## 目录

- [版本类型](#版本类型)
- [版本号规则](#版本号规则)
- [发布流程](#发布流程)
- [发布前检查清单](#发布前检查清单)
- [常见问题](#常见问题)

## 版本类型

### Alpha 版本（内部测试）

- **格式**: `0.1.0-alpha.1`
- **用途**: 内部测试版本，功能可能不稳定
- **发布标签**: `alpha`
- **使用场景**:
  - 新功能开发完成，需要内部测试
  - API 可能频繁变更
  - 不建议在生产环境使用

**发布命令**:

```bash
pnpm release:alpha
```

### Beta 版本（公开测试）

- **格式**: `0.1.0-beta.1`
- **用途**: 公开测试版本，功能基本稳定，但可能仍有问题
- **发布标签**: `beta`
- **使用场景**:
  - 功能基本稳定，需要社区反馈
  - API 基本确定，但可能有小幅调整
  - 可以用于测试环境

**发布命令**:

```bash
pnpm release:beta
```

### Stable 版本（稳定版本）

- **格式**: `0.1.0`
- **用途**: 稳定版本，可用于生产环境
- **发布标签**: `latest`
- **使用场景**:
  - 功能稳定，经过充分测试
  - API 稳定，不会频繁变更
  - 可以用于生产环境

**发布命令**:

```bash
pnpm release:stable
```

## 版本号规则

遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。

### 主版本号（Major）

- **变更**: 不兼容的 API 修改
- **示例**: `1.0.0` → `2.0.0`
- **影响**: 可能需要修改代码才能升级
- **发布命令**: `pnpm release:major`

**触发场景**:

- 删除或重命名 API
- 修改 API 的行为（不向后兼容）
- 移除已废弃的功能

### 次版本号（Minor）

- **变更**: 向下兼容的功能性新增
- **示例**: `1.0.0` → `1.1.0`
- **影响**: 可以直接升级，新功能可选使用
- **发布命令**: `pnpm release:minor`

**触发场景**:

- 新增组件
- 新增 API（不破坏现有功能）
- 新增功能特性

### 修订号（Patch）

- **变更**: 向下兼容的问题修正
- **示例**: `1.0.0` → `1.0.1`
- **影响**: 可以直接升级，修复问题
- **发布命令**: `pnpm release:patch`

**触发场景**:

- Bug 修复
- 性能优化
- 文档更新
- 样式微调

## 发布流程

### 1. 发布前准备

#### 检查清单

- [ ] 所有测试通过
- [ ] 类型检查通过
- [ ] 代码已格式化
- [ ] 文档已更新
- [ ] CHANGELOG.md 已更新（未发布部分）
- [ ] 工作区干净（无未提交更改）

#### 运行检查命令

```bash
# 运行测试
pnpm test

# 类型检查
pnpm type-check

# 代码格式化检查
pnpm format:check

# 构建检查
pnpm build
```

### 2. 执行发布

#### Alpha/Beta 发布

```bash
# 发布 alpha 版本
pnpm release:alpha

# 或发布 beta 版本
pnpm release:beta
```

#### Stable 发布

```bash
# 发布稳定版本
pnpm release:stable
```

#### 正式版本发布

```bash
# 补丁版本
pnpm release:patch

# 次版本
pnpm release:minor

# 主版本
pnpm release:major
```

### 3. 发布脚本执行流程

发布脚本会自动执行以下步骤：

1. **检查工作区**: 确保没有未提交的更改
2. **运行测试**: 执行所有包的测试
3. **类型检查**: 执行 TypeScript 类型检查
4. **构建**: 构建所有包
5. **计算版本号**: 根据类型计算新版本号
6. **更新版本号**: 更新所有包的 `package.json`
7. **更新 CHANGELOG**: 自动在 CHANGELOG.md 中添加新版本条目
8. **创建 Git 提交**: 提交版本变更
9. **创建 Git 标签**: 创建版本标签
10. **发布到 npm**: 发布所有包到 npm

### 4. 发布后操作

#### 推送代码和标签

```bash
# 推送代码
git push

# 推送标签
git push --tags
```

#### 完善 CHANGELOG

检查并完善 `CHANGELOG.md` 中新版本的内容：

```markdown
## [0.2.0] - 2024-01-15

### 新增

- **Select**: 新增多选模式支持
  - 支持 `multiple` 属性
  - 支持自定义选项渲染

### 变更

- **Button**: 优化 loading 状态的视觉效果

### 修复

- **DatePicker**: 修复日期范围选择时的边界问题
```

#### 创建 GitHub Release

1. 访问 GitHub Releases 页面
2. 点击 "Draft a new release"
3. 选择刚创建的标签
4. 填写 Release 标题（如: `v0.2.0`）
5. 从 `CHANGELOG.md` 复制对应版本的内容到描述中
6. 发布 Release

## 发布前检查清单

### 代码质量

- [ ] 所有测试通过（`pnpm test`）
- [ ] 测试覆盖率达标（建议 ≥80%）
- [ ] 类型检查通过（`pnpm type-check`）
- [ ] 代码已格式化（`pnpm format:check`）
- [ ] ESLint 检查通过（`pnpm lint`）

### 构建和打包

- [ ] 构建成功（`pnpm build`）
- [ ] 构建产物正确（检查 `dist` 目录）
- [ ] 按需加载配置正确（检查 `package.json` exports）
- [ ] TypeScript 声明文件生成正确

### 文档

- [ ] README.md 已更新
- [ ] 组件文档已更新
- [ ] CHANGELOG.md 已更新（未发布部分）
- [ ] API 文档完整

### 版本管理

- [ ] 版本号符合语义化版本规范
- [ ] 所有包的版本号一致
- [ ] 工作区干净（无未提交更改）

## 常见问题

### Q: 发布失败怎么办？

**A**: 检查以下事项：

1. 确保 npm 已登录（`npm whoami`）
2. 确保有发布权限
3. 检查网络连接
4. 查看错误信息，根据提示修复

### Q: 如何回滚版本？

**A**:

1. 如果还未推送到远程：

   ```bash
   git reset --hard HEAD~1
   git tag -d v0.2.0
   ```

2. 如果已推送到远程：
   - 不建议删除已发布的版本
   - 可以发布新的修复版本

### Q: 如何发布热修复版本？

**A**:

1. 从主分支创建热修复分支
2. 修复问题
3. 运行 `pnpm release:patch`
4. 合并回主分支

### Q: Alpha/Beta 版本如何升级到 Stable？

**A**:

运行 `pnpm release:stable`，脚本会自动：

- 移除预发布标识（如 `-alpha.1`）
- 更新版本号为稳定版本
- 使用 `latest` 标签发布

### Q: 如何跳过某些检查步骤？

**A**:

不建议跳过检查步骤。如果确实需要，可以：

1. 修改 `scripts/release.js`
2. 注释掉相应的检查函数调用
3. 但请确保手动完成这些检查

## 相关文档

- [CHANGELOG.md](../CHANGELOG.md) - 变更日志
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)
