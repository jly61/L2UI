import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'L2UIStyles',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'js'}`,
    },
    rollupOptions: {
      external: ['styled-components'],
      output: {
        globals: {
          'styled-components': 'styled',
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
});

