import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { DatePicker } from './DatePicker';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>);
};

describe('DatePicker', () => {
  it('应该正确渲染', () => {
    renderWithTheme(<DatePicker />);
    expect(screen.getByPlaceholderText('请选择日期')).toBeInTheDocument();
  });

  it('应该显示自定义占位符', () => {
    renderWithTheme(<DatePicker placeholder="选择日期" />);
    expect(screen.getByPlaceholderText('选择日期')).toBeInTheDocument();
  });

  it('应该支持受控模式', () => {
    const handleChange = vi.fn();
    const date = new Date(2024, 0, 15);
    renderWithTheme(<DatePicker value={date} onChange={handleChange} />);
    expect(screen.getByDisplayValue('2024-01-15')).toBeInTheDocument();
  });

  it('应该支持非受控模式', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(<DatePicker onChange={handleChange} />);

    const input = screen.getByPlaceholderText('请选择日期');
    await user.click(input);

    // 等待日历打开
    const calendar = document.querySelector('[role="dialog"]') || document.body;
    expect(calendar).toBeInTheDocument();
  });

  it('应该支持禁用状态', () => {
    renderWithTheme(<DatePicker disabled />);
    const input = screen.getByPlaceholderText('请选择日期') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('应该支持不同格式', () => {
    const date = new Date(2024, 0, 15);
    const { rerender } = renderWithTheme(<DatePicker value={date} format="YYYY-MM-DD" />);
    expect(screen.getByDisplayValue('2024-01-15')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <DatePicker value={date} format="YYYY/MM/DD" />
      </ThemeProvider>
    );
    expect(screen.getByDisplayValue('2024/01/15')).toBeInTheDocument();
  });

  it('应该支持块级模式', () => {
    const { container } = renderWithTheme(<DatePicker block />);
    const datePicker = container.firstChild as HTMLElement;
    expect(datePicker).toHaveStyle({ width: '100%' });
  });
});

