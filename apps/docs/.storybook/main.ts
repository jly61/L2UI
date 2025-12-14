import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const rootPath = path.resolve(__dirname, '../../..');
const config: StorybookConfig = {
  stories: [
    path.resolve(rootPath, 'apps/docs/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'),
    path.resolve(rootPath, 'apps/docs/src/**/*.mdx'),
    path.resolve(rootPath, 'packages/components/src/**/*.stories.@(ts|tsx)'),
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@l2ui/components': path.resolve(rootPath, 'packages/components/src'),
          '@l2ui/utils': path.resolve(rootPath, 'packages/utils/src'),
          '@l2ui/styles': path.resolve(rootPath, 'packages/styles/src'),
        },
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'styled-components'],
      },
      server: {
        fs: {
          allow: [rootPath],
        },
      },
    });
  },
};

export default config;
