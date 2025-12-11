import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { Input } from './Input';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

describe('Input', () => {
  it('应该正确渲染占位符', () => {
    renderWithTheme(<Input placeholder="请输入内容" />);
    expect(screen.getByPlaceholderText('请输入内容')).toBeInTheDocument();
  });

  it('非受控模式下应该更新值', async () => {
    renderWithTheme(<Input placeholder="输入" />);
    const input = screen.getByPlaceholderText('输入');
    await userEvent.type(input, 'abc');
    expect((input as HTMLInputElement).value).toBe('abc');
  });

  it('受控模式下值由外部驱动', async () => {
    const { rerender } = renderWithTheme(<Input value="123" onChange={() => {}} />);
    const input = screen.getByDisplayValue('123');
    await userEvent.type(input, '4'); // 输入不会改变受控值
    expect((input as HTMLInputElement).value).toBe('123');

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <Input value="1234" onChange={() => {}} />
      </ThemeProvider>
    );
    expect(screen.getByDisplayValue('1234')).toBeInTheDocument();
  });

  it('禁用状态不可输入', async () => {
    renderWithTheme(<Input disabled placeholder="禁用" />);
    const input = screen.getByPlaceholderText('禁用');
    expect(input).toBeDisabled();
  });
});

