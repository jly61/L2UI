# npm 发布配置指南

本文档说明如何配置 npm 认证以发布 L2UI 组件库到 npm。

## 问题说明

如果发布时遇到以下错误：

```
npm error 403 403 Forbidden - PUT https://registry.npmjs.org/@l2ui%2fcomponents
npm error 403 Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

这表示需要配置 npm 认证，特别是如果启用了双因素认证（2FA）。

## 解决方案

### 方案 1: 使用 npm login（推荐用于个人账户）

1. **登录 npm**

```bash
npm login
```

按提示输入：

- Username（npm 用户名）
- Password（npm 密码）
- Email（npm 邮箱）
- OTP（如果启用了 2FA，输入一次性密码）

2. **验证登录**

```bash
npm whoami
```

应该显示你的 npm 用户名。

### 方案 2: 使用访问令牌（推荐用于 CI/CD 或启用 2FA 的情况）

#### 步骤 1: 创建访问令牌

1. 访问 npm 设置页面：https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. 点击 "Generate New Token"
3. 选择令牌类型：
   - **Automation**: 用于 CI/CD，永久有效
   - **Publish**: 用于发布包，可以设置过期时间
4. **重要**: 如果启用了 2FA，确保勾选 "bypass 2fa" 选项
5. 点击 "Generate Token"
6. **复制令牌**（只显示一次，请妥善保存）

#### 步骤 2: 配置访问令牌

**方式 A: 使用 npm config（推荐）**

```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN
```

**方式 B: 使用 .npmrc 文件**

在项目根目录或用户主目录创建/编辑 `.npmrc` 文件：

```
//registry.npmjs.org/:_authToken=YOUR_TOKEN
```

**方式 C: 使用环境变量**

```bash
export NPM_TOKEN=YOUR_TOKEN
```

然后在 `.npmrc` 中引用：

```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

#### 步骤 3: 验证配置

```bash
npm whoami
```

应该显示你的 npm 用户名。

### 方案 3: 使用 .npmrc 文件（项目级别）

在项目根目录创建 `.npmrc` 文件：

```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

然后在环境变量中设置 `NPM_TOKEN`。

**注意**: 不要将包含真实令牌的 `.npmrc` 文件提交到 Git！

## 检查清单

发布前请确认：

- [ ] npm 已登录或已配置访问令牌
- [ ] 运行 `npm whoami` 能显示用户名
- [ ] 如果启用了 2FA，访问令牌已启用 "bypass 2fa" 权限
- [ ] 有发布 `@l2ui` scope 包的权限
- [ ] `.npmrc` 文件已添加到 `.gitignore`（如果包含令牌）

## 常见问题

### Q: 为什么需要 "bypass 2fa" 权限？

**A**: npm 要求发布包时必须通过 2FA 验证。如果使用访问令牌，令牌必须具有 "bypass 2fa" 权限才能发布包。

### Q: 如何检查是否有发布权限？

**A**:

1. 检查是否是包的拥有者：

```bash
npm owner ls @l2ui/components
```

2. 如果是组织，检查组织成员权限：
   - 访问 https://www.npmjs.com/org/YOUR_ORG/settings/members
   - 确保你的账户有 "Developer" 或 "Owner" 权限

### Q: 如何撤销访问令牌？

**A**:

1. 访问 https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. 找到要撤销的令牌
3. 点击 "Revoke"

### Q: 如何在 CI/CD 中使用？

**A**:

1. 在 CI/CD 平台（如 GitHub Actions）中设置 `NPM_TOKEN` 为 Secret
2. 在 CI/CD 配置中使用：

```yaml
# GitHub Actions 示例
- name: Setup npm
  run: |
    echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > .npmrc
```

### Q: 发布失败，提示 "403 Forbidden"？

**A**: 检查以下几点：

1. 令牌是否有效（未过期）
2. 令牌是否有 "bypass 2fa" 权限
3. 是否有发布该包的权限
4. 包名是否正确（scope 包需要 `--access public`）

## 安全建议

1. **不要提交令牌到 Git**
   - 将包含令牌的 `.npmrc` 添加到 `.gitignore`
   - 使用环境变量或 CI/CD Secrets

2. **使用最小权限原则**
   - 只授予必要的权限
   - 定期轮换访问令牌

3. **使用 Automation 令牌用于 CI/CD**
   - Automation 令牌专为 CI/CD 设计
   - 可以设置更严格的权限

4. **定期检查令牌**
   - 定期审查活跃的访问令牌
   - 撤销不再使用的令牌

## 相关文档

- [npm 登录文档](https://docs.npmjs.com/cli/v8/commands/npm-login)
- [npm 访问令牌文档](https://docs.npmjs.com/about-access-tokens)
- [npm 2FA 文档](https://docs.npmjs.com/configuring-two-factor-authentication)
- [版本发布指南](./release-guide.md)
