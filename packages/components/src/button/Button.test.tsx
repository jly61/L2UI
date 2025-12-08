import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { Button } from './Button';

const defaultTheme = {
  colors: {
    primary: '#1890ff',
    error: '#ff4d4f',
    text: '#000',
    border: '#d9d9d9',
    background: '#fff',
    hover: 'rgba(0, 0, 0, 0.06)',
  },
  borderRadius: {
    default: '4px',
  },
};

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
};

describe('Button', () => {
  it('应该正确渲染', () => {
    renderWithTheme(<Button>点击我</Button>);
    expect(screen.getByText('点击我')).toBeInTheDocument();
  });

  it('应该响应点击事件', async () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>点击我</Button>);

    await userEvent.click(screen.getByText('点击我'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('loading 状态下应该禁用', () => {
    renderWithTheme(<Button loading>加载中</Button>);
    const button = screen.getByText('加载中');
    expect(button).toBeDisabled();
  });

  it('disabled 状态下应该禁用', () => {
    renderWithTheme(<Button disabled>禁用按钮</Button>);
    const button = screen.getByText('禁用按钮');
    expect(button).toBeDisabled();
  });

  it('应该支持不同的 type', () => {
    const { rerender } = renderWithTheme(<Button type="primary">主要按钮</Button>);
    expect(screen.getByText('主要按钮')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <Button type="dashed">虚线按钮</Button>
      </ThemeProvider>
    );
    expect(screen.getByText('虚线按钮')).toBeInTheDocument();
  });

  it('应该支持不同的 size', () => {
    renderWithTheme(<Button size="large">大按钮</Button>);
    expect(screen.getByText('大按钮')).toBeInTheDocument();
  });

  it('block 模式下应该占满宽度', () => {
    renderWithTheme(<Button block>块级按钮</Button>);
    const button = screen.getByText('块级按钮');
    expect(button).toHaveStyle({ display: 'block', width: '100%' });
  });
});

