import { ButtonHTMLAttributes } from 'react';

export type ButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * 按钮类型
   * @default 'default'
   */
  type?: ButtonType;
  /**
   * 按钮尺寸
   * @default 'medium'
   */
  size?: ButtonSize;
  /**
   * 加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * 块级按钮
   * @default false
   */
  block?: boolean;
  /**
   * 危险按钮
   * @default false
   */
  danger?: boolean;
  /**
   * 幽灵按钮
   * @default false
   */
  ghost?: boolean;
}

