import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, GlobalStyles } from '@l2ui/styles';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles theme={defaultTheme} />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;

