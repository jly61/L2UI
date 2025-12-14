import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { Select } from './Select';

const options = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' },
];

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>);
};

describe('Select', () => {
  it('应该正确渲染', () => {
    renderWithTheme(<Select options={options} />);
    expect(screen.getByText('请选择')).toBeInTheDocument();
  });

  it('应该显示占位符', () => {
    renderWithTheme(<Select options={options} placeholder="自定义占位符" />);
    expect(screen.getByText('自定义占位符')).toBeInTheDocument();
  });

  it('应该支持受控模式', () => {
    const handleChange = vi.fn();
    renderWithTheme(<Select options={options} value="1" onChange={handleChange} />);
    expect(screen.getByText('选项一')).toBeInTheDocument();
  });

  it('应该支持非受控模式', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(<Select options={options} onChange={handleChange} />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    const option = screen.getByText('选项二');
    await user.click(option);

    expect(handleChange).toHaveBeenCalledWith('2', options[1]);
    expect(screen.getByText('选项二')).toBeInTheDocument();
  });

  it('应该支持禁用状态', () => {
    renderWithTheme(<Select options={options} disabled />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('tabIndex', '-1');
  });

  it('应该支持键盘操作', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Select options={options} />);

    const trigger = screen.getByRole('combobox');
    trigger.focus();

    // 按 Enter 打开下拉框
    await user.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // 按 Escape 关闭下拉框
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('应该支持禁用选项', async () => {
    const user = userEvent.setup();
    const disabledOptions = [
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二', disabled: true },
    ];
    const handleChange = vi.fn();

    renderWithTheme(<Select options={disabledOptions} onChange={handleChange} />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    const disabledOption = screen.getByText('选项二');
    await user.click(disabledOption);

    // 禁用选项不应该触发 onChange
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('应该支持块级模式', () => {
    const { container } = renderWithTheme(<Select options={options} block />);
    const select = container.firstChild as HTMLElement;
    expect(select).toHaveStyle({ width: '100%' });
  });
});
