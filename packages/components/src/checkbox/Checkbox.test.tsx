import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { Checkbox } from './Checkbox';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>);
};

describe('Checkbox', () => {
  it('应该正确渲染', () => {
    renderWithTheme(<Checkbox>复选框</Checkbox>);
    expect(screen.getByText('复选框')).toBeInTheDocument();
  });

  it('应该支持无标签', () => {
    const { container } = renderWithTheme(<Checkbox />);
    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeInTheDocument();
  });

  it('应该支持受控模式', () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <Checkbox checked={true} onChange={handleChange}>
        受控复选框
      </Checkbox>
    );
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('应该支持非受控模式', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(
      <Checkbox defaultChecked={false} onChange={handleChange}>
        非受控复选框
      </Checkbox>
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('应该支持禁用状态', () => {
    renderWithTheme(<Checkbox disabled>禁用复选框</Checkbox>);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it('应该支持不确定状态', () => {
    const { container } = renderWithTheme(<Checkbox indeterminate>不确定复选框</Checkbox>);
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('应该支持不同尺寸', () => {
    const { container: smallContainer } = renderWithTheme(<Checkbox size="small">小号</Checkbox>);
    const { container: largeContainer } = renderWithTheme(<Checkbox size="large">大号</Checkbox>);

    const smallInput = smallContainer.querySelector('input');
    const largeInput = largeContainer.querySelector('input');
    expect(smallInput).toBeInTheDocument();
    expect(largeInput).toBeInTheDocument();
  });

  it('禁用时不应该响应点击', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(
      <Checkbox disabled onChange={handleChange}>
        禁用复选框
      </Checkbox>
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
