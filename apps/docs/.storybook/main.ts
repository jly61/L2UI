import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)', '../src/**/*.mdx'],
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
    const rootPath = path.resolve(__dirname, '../../../');
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
          allow: ['..'],
        },
      },
    });
  },
};

export default config;

