import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'L2UIStyles',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          'styled-components': 'styled',
        },
        exports: 'named',
      },
      treeshake: {
        moduleSideEffects: (id) => {
          // GlobalStyles 组件有副作用（注入全局样式）
          if (id.includes('GlobalStyles') || id.includes('reset')) {
            return true;
          }
          return false;
        },
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        preset: 'smallest',
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2020',
  },
});
