# 版本发布检查清单

本文档提供了版本发布前的完整检查清单，确保发布质量。

## 发布前检查

### 代码质量

- [ ] **测试通过**

  ```bash
  pnpm test
  ```

  - 所有单元测试通过
  - 测试覆盖率 ≥ 80%

- [ ] **类型检查通过**

  ```bash
  pnpm type-check
  ```

  - 无 TypeScript 错误
  - 无类型警告

- [ ] **代码检查通过**

  ```bash
  pnpm lint
  ```

  - ESLint 检查通过
  - 无代码风格问题

- [ ] **构建成功**

  ```bash
  pnpm build
  ```

  - 所有包构建成功
  - 生成正确的类型定义文件
  - 生成 source map

### 文档

- [ ] **更新 CHANGELOG.md**
  - 记录所有新增功能
  - 记录所有变更
  - 记录所有修复
  - 记录所有移除的功能

- [ ] **更新 README.md**（如需要）
  - 更新版本号
  - 更新使用示例
  - 更新安装说明

- [ ] **更新组件文档**
  - Storybook 文档完整
  - API 文档准确
  - 使用示例正确

### 版本管理

- [ ] **确定版本类型**
  - `alpha`: 内部测试版本
  - `beta`: 公开测试版本
  - `stable`: 稳定版本
  - `patch`: 补丁版本（修复问题）
  - `minor`: 次版本（新功能）
  - `major`: 主版本（破坏性变更）

- [ ] **更新版本号**
  - 所有包的版本号一致
  - 版本号符合语义化版本规范

- [ ] **Git 状态**
  - 所有更改已提交
  - 工作区干净
  - 无未跟踪的文件

### 发布流程

- [ ] **运行发布脚本**

  ```bash
  # Alpha 版本
  pnpm release:alpha

  # Beta 版本
  pnpm release:beta

  # 稳定版本
  pnpm release:stable

  # 补丁版本
  pnpm release:patch

  # 次版本
  pnpm release:minor

  # 主版本
  pnpm release:major
  ```

- [ ] **验证发布**
  - 检查 npm 上的包版本
  - 验证包可以正常安装
  - 验证包可以正常使用

- [ ] **创建 GitHub Release**
  - 创建 Release 标签
  - 填写 Release 说明
  - 附上 CHANGELOG 内容

- [ ] **推送代码和标签**
  ```bash
  git push
  git push --tags
  ```

## 发布后检查

- [ ] **验证安装**

  ```bash
  npm install @l2ui/components@latest
  # 或
  pnpm add @l2ui/components@latest
  ```

- [ ] **验证使用**
  - 在新项目中测试安装的包
  - 验证所有组件正常工作
  - 验证类型定义正确

- [ ] **通知团队**
  - 发送发布通知
  - 说明主要变更
  - 提供升级指南（如有破坏性变更）

## 回滚计划

如果发布后发现问题：

1. **立即回滚**
   - 从 npm 撤销发布（如果可能）
   - 通知用户问题

2. **修复问题**
   - 创建修复分支
   - 修复问题
   - 运行完整测试

3. **重新发布**
   - 发布补丁版本
   - 更新 CHANGELOG
   - 通知用户修复

## 版本发布流程示例

### Alpha 版本发布

```bash
# 1. 确保工作区干净
git status

# 2. 运行测试和检查
pnpm test
pnpm type-check
pnpm lint

# 3. 构建
pnpm build

# 4. 发布 alpha 版本
pnpm release:alpha

# 5. 推送代码和标签
git push && git push --tags
```

### Beta 版本发布

```bash
# 1-3 步骤同上

# 4. 发布 beta 版本
pnpm release:beta

# 5. 推送代码和标签
git push && git push --tags
```

### 稳定版本发布

```bash
# 1-3 步骤同上

# 4. 发布稳定版本
pnpm release:stable

# 5. 推送代码和标签
git push && git push --tags

# 6. 创建 GitHub Release
# 在 GitHub 上创建 Release，附上 CHANGELOG 内容
```

## 注意事项

1. **版本号一致性**: 确保所有包的版本号保持一致
2. **依赖关系**: 确保包之间的依赖关系正确
3. **向后兼容**: 稳定版本应保持向后兼容
4. **文档同步**: 确保文档与代码同步更新
5. **测试覆盖**: 确保新功能有完整的测试覆盖

## 常见问题

### Q: 发布失败怎么办？

A: 检查错误信息，修复问题后重新发布。如果是网络问题，可以重试。

### Q: 如何撤销发布？

A: npm 不允许完全撤销已发布的版本，但可以发布一个新版本修复问题。

### Q: 版本号冲突怎么办？

A: 检查是否有其他人在发布，协调版本号使用。

### Q: 如何发布预发布版本？

A: 使用 `pnpm release:alpha` 或 `pnpm release:beta` 发布预发布版本。

---

**最后更新**: 2024-01-XX
