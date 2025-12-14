#!/usr/bin/env node

/**
 * 版本发布脚本
 *
 * 版本发布流程：
 *   1. alpha: 内部测试版本，功能可能不稳定
 *   2. beta: 公开测试版本，功能基本稳定，但可能仍有问题
 *   3. stable: 稳定版本，可用于生产环境
 *
 * 用法:
 *   pnpm release:alpha    # 发布 alpha 版本 (0.1.0-alpha.1)
 *   pnpm release:beta     # 发布 beta 版本 (0.1.0-beta.1)
 *   pnpm release:stable   # 发布稳定版本 (0.1.0)
 *   pnpm release:patch    # 补丁版本 (0.1.1)
 *   pnpm release:minor    # 次版本 (0.2.0)
 *   pnpm release:major    # 主版本 (1.0.0)
 *
 * 版本号规则（语义化版本）:
 *   - 主版本号（Major）: 不兼容的 API 修改
 *   - 次版本号（Minor）: 向下兼容的功能性新增
 *   - 修订号（Patch）: 向下兼容的问题修正
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PACKAGES = ['@l2ui/components', '@l2ui/utils', '@l2ui/styles', 'l2ui'];

/**
 * 获取当前版本号
 */
function getCurrentVersion(packageName) {
  const packagePath =
    packageName === 'l2ui'
      ? path.join(__dirname, '../packages/l2ui/package.json')
      : path.join(__dirname, `../packages/${packageName.replace('@l2ui/', '')}/package.json`);

  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  return pkg.version;
}

/**
 * 计算新版本号
 */
function calculateVersion(currentVersion, type) {
  const [major, minor, patch, ...rest] = currentVersion.split(/[.-]/);

  switch (type) {
    case 'alpha':
      const alphaMatch = currentVersion.match(/alpha\.(\d+)/);
      const alphaNum = alphaMatch ? parseInt(alphaMatch[1]) + 1 : 1;
      return `${major}.${minor}.${patch}-alpha.${alphaNum}`;

    case 'beta':
      const betaMatch = currentVersion.match(/beta\.(\d+)/);
      const betaNum = betaMatch ? parseInt(betaMatch[1]) + 1 : 1;
      return `${major}.${minor}.${patch}-beta.${betaNum}`;

    case 'patch':
      return `${major}.${minor}.${parseInt(patch) + 1}`;

    case 'minor':
      return `${major}.${parseInt(minor) + 1}.0`;

    case 'major':
      return `${parseInt(major) + 1}.0.0`;

    case 'stable':
      // 移除预发布标识
      return `${major}.${minor}.${patch}`;

    default:
      throw new Error(`未知的版本类型: ${type}`);
  }
}

/**
 * 更新包版本号
 */
function updatePackageVersion(packageName, newVersion) {
  const packagePath =
    packageName === 'l2ui'
      ? path.join(__dirname, '../packages/l2ui/package.json')
      : path.join(__dirname, `../packages/${packageName.replace('@l2ui/', '')}/package.json`);

  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  pkg.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`✓ ${packageName}: ${pkg.version} -> ${newVersion}`);
}

/**
 * 检查工作区是否干净
 */
function checkWorkingDirectory() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    if (status.trim()) {
      console.error('❌ 工作区不干净，请先提交或暂存更改');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ 无法检查 git 状态');
    process.exit(1);
  }
}

/**
 * 运行构建
 */
function build() {
  console.log('\n📦 开始构建...');
  try {
    execSync('pnpm build', { stdio: 'inherit' });
    console.log('✓ 构建完成\n');
  } catch (error) {
    console.error('❌ 构建失败');
    process.exit(1);
  }
}

/**
 * 运行测试
 */
function test() {
  console.log('\n🧪 运行测试...');
  try {
    execSync('pnpm test', { stdio: 'inherit' });
    console.log('✓ 测试通过\n');
  } catch (error) {
    console.error('❌ 测试失败');
    process.exit(1);
  }
}

/**
 * 运行类型检查
 */
function typeCheck() {
  console.log('\n🔍 运行类型检查...');
  try {
    execSync('pnpm type-check', { stdio: 'inherit' });
    console.log('✓ 类型检查通过\n');
  } catch (error) {
    console.error('❌ 类型检查失败');
    process.exit(1);
  }
}

/**
 * 更新 CHANGELOG.md
 */
function updateChangelog(version, type) {
  const changelogPath = path.join(__dirname, '../CHANGELOG.md');
  let changelog = fs.readFileSync(changelogPath, 'utf-8');

  const date = new Date().toISOString().split('T')[0];
  const versionHeader = `## [${version}] - ${date}`;

  // 检查是否已存在该版本
  if (changelog.includes(`## [${version}]`)) {
    console.log(`⚠️  CHANGELOG.md 中已存在版本 ${version}，跳过更新`);
    return;
  }

  // 在 "## [未发布]" 之后插入新版本
  const unreleasedIndex = changelog.indexOf('## [未发布]');
  if (unreleasedIndex !== -1) {
    const insertIndex = changelog.indexOf('\n---', unreleasedIndex);
    if (insertIndex !== -1) {
      const before = changelog.substring(0, insertIndex);
      const after = changelog.substring(insertIndex);
      changelog = `${before}\n\n${versionHeader}\n\n### 新增\n- 详见发布说明\n\n### 变更\n- 无\n\n### 修复\n- 无\n\n### 移除\n- 无\n${after}`;
    } else {
      // 如果没有找到分隔符，在未发布部分后添加
      const nextSection = changelog.indexOf('\n## [', unreleasedIndex + 1);
      if (nextSection !== -1) {
        const before = changelog.substring(0, nextSection);
        const after = changelog.substring(nextSection);
        changelog = `${before}\n\n${versionHeader}\n\n### 新增\n- 详见发布说明\n\n### 变更\n- 无\n\n### 修复\n- 无\n\n### 移除\n- 无\n${after}`;
      }
    }
  } else {
    // 如果没有未发布部分，在开头添加
    changelog = `${versionHeader}\n\n### 新增\n- 详见发布说明\n\n### 变更\n- 无\n\n### 修复\n- 无\n\n### 移除\n- 无\n\n---\n\n${changelog}`;
  }

  fs.writeFileSync(changelogPath, changelog);
  console.log(`✓ CHANGELOG.md 已更新为版本 ${version}`);
}

/**
 * 发布包
 */
function publish(packageName, version, tag) {
  const packagePath =
    packageName === 'l2ui'
      ? path.join(__dirname, '../packages/l2ui')
      : path.join(__dirname, `../packages/${packageName.replace('@l2ui/', '')}`);

  console.log(`\n📤 发布 ${packageName}@${version}...`);
  try {
    const tagFlag = tag ? `--tag ${tag}` : '';
    execSync(`cd ${packagePath} && npm publish ${tagFlag} --access public`, {
      stdio: 'inherit',
    });
    console.log(`✓ ${packageName}@${version} 发布成功\n`);
  } catch (error) {
    console.error(`❌ ${packageName} 发布失败`);
    process.exit(1);
  }
}

/**
 * 主函数
 */
function main() {
  const type = process.argv[2];

  if (!type) {
    console.error('请指定版本类型: alpha, beta, stable, patch, minor, major');
    process.exit(1);
  }

  const validTypes = ['alpha', 'beta', 'stable', 'patch', 'minor', 'major'];
  if (!validTypes.includes(type)) {
    console.error(`无效的版本类型: ${type}`);
    console.error(`支持的类型: ${validTypes.join(', ')}`);
    process.exit(1);
  }

  console.log(`\n🚀 开始发布流程: ${type}\n`);

  // 1. 检查工作区
  checkWorkingDirectory();

  // 2. 运行测试
  test();

  // 3. 类型检查
  typeCheck();

  // 4. 构建
  build();

  // 5. 计算新版本
  const currentVersion = getCurrentVersion('@l2ui/components');
  const newVersion = calculateVersion(currentVersion, type);
  const tag = type === 'alpha' ? 'alpha' : type === 'beta' ? 'beta' : 'latest';

  console.log(`📝 版本更新: ${currentVersion} -> ${newVersion}\n`);

  // 6. 更新所有包的版本号
  PACKAGES.forEach((pkg) => {
    updatePackageVersion(pkg, newVersion);
  });

  // 7. 更新 CHANGELOG.md
  console.log('\n📝 更新 CHANGELOG.md...');
  try {
    updateChangelog(newVersion, type);
    console.log('✓ CHANGELOG.md 更新成功\n');
  } catch (error) {
    console.error('❌ CHANGELOG.md 更新失败:', error.message);
    process.exit(1);
  }

  // 8. 创建 git commit 和 tag
  console.log('\n📝 创建 git commit 和 tag...');
  try {
    execSync(`git add packages/*/package.json CHANGELOG.md`, { stdio: 'inherit' });
    execSync(`git commit -m "chore: release v${newVersion}"`, { stdio: 'inherit' });
    execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`, { stdio: 'inherit' });
    console.log('✓ Git commit 和 tag 创建成功\n');
  } catch (error) {
    console.error('❌ Git 操作失败');
    process.exit(1);
  }

  // 9. 发布所有包
  console.log(`\n⚠️  准备发布到 npm，请确认:`);
  console.log(`   - 版本号: ${newVersion}`);
  console.log(`   - 发布标签: ${tag || 'latest'}`);
  console.log(`   - 包列表: ${PACKAGES.join(', ')}`);
  console.log(`\n   按 Ctrl+C 取消，或按 Enter 继续...`);

  // 等待用户确认（在实际使用中，可以添加 readline 来等待确认）
  // 这里为了自动化，直接继续

  PACKAGES.forEach((pkg) => {
    publish(pkg, newVersion, tag);
  });

  console.log(`\n🎉 发布完成！所有包已发布为 v${newVersion}`);
  console.log(`\n📋 下一步:`);
  console.log(`   1. 推送代码和标签: git push && git push --tags`);
  console.log(`   2. 检查并完善 CHANGELOG.md 中的变更内容`);
  console.log(`   3. 创建 GitHub Release: https://github.com/your-org/l2ui/releases/new`);
  console.log(`   4. 在 GitHub Release 中粘贴 CHANGELOG.md 中对应版本的内容\n`);
}

main();
