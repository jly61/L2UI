import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';

/**
 * 获取所有组件目录，用于按需加载配置
 */
function getComponentEntries() {
  const srcDir = resolve(__dirname, 'src');
  const entries: Record<string, string> = {
    index: resolve(__dirname, 'src/index.ts'),
  };

  try {
    const dirs = readdirSync(srcDir).filter((dir) => {
      const dirPath = resolve(srcDir, dir);
      return statSync(dirPath).isDirectory() && dir !== 'test';
    });

    dirs.forEach((dir) => {
      const indexPath = resolve(srcDir, dir, 'index.ts');
      try {
        // 检查 index.ts 是否存在
        statSync(indexPath);
        entries[dir] = indexPath;
      } catch {
        // 如果不存在 index.ts，跳过
      }
    });
  } catch (error) {
    console.warn('无法读取组件目录:', error);
  }

  return entries;
}

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: getComponentEntries(),
      name: 'L2UIComponents',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'esm.js' : 'js';
        if (entryName === 'index') {
          return `index.${ext}`;
        }
        // 按需加载：每个组件单独打包到 dist/[component]/index.[ext]
        return `${entryName}/index.${ext}`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components', '@l2ui/utils', '@l2ui/styles'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
        exports: 'named', // 使用命名导出
        // 确保 treeshaking 正常工作
        // 不使用 preserveModules，使用多入口点方式实现按需加载
      },
      // 启用 treeshaking
      treeshake: {
        moduleSideEffects: (id) => {
          // styled-components 可能有副作用
          if (id.includes('styled-components')) {
            return true;
          }
          // 其他模块假设没有副作用（除非在 package.json 中声明）
          return false;
        },
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        // 更激进的 treeshaking
        preset: 'smallest',
      },
    },
    sourcemap: true,
    minify: 'esbuild', // 生产环境使用 esbuild 压缩
    // 确保 treeshaking 正常工作
    target: 'es2020',
    // 优化构建
    cssCodeSplit: false, // 组件库通常不需要 CSS 代码分割
    // 减少 chunk 大小警告阈值（按需加载会产生更多 chunk）
    chunkSizeWarningLimit: 1000,
  },
});
