import { InputHTMLAttributes } from 'react';

/**
 * 日期选择器尺寸
 */
export type DatePickerSize = 'small' | 'medium' | 'large';

/**
 * 日期格式
 */
export type DateFormat = 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'DD-MM-YYYY' | 'DD/MM/YYYY';

/**
 * 日期选择器属性
 */
export interface DatePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'value' | 'onChange' | 'defaultValue'
> {
  /**
   * 尺寸
   * @default 'medium'
   */
  size?: DatePickerSize;
  /**
   * 占位提示
   * @default '请选择日期'
   */
  placeholder?: string;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否块级，撑满容器宽度
   * @default false
   */
  block?: boolean;
  /**
   * 受控值（Date 对象或字符串）
   */
  value?: Date | string | null;
  /**
   * 非受控初始值（Date 对象或字符串）
   */
  defaultValue?: Date | string | null;
  /**
   * 日期格式
   * @default 'YYYY-MM-DD'
   */
  format?: DateFormat;
  /**
   * 值变化回调
   */
  onChange?: (date: Date | null, dateString: string) => void;
  /**
   * 外部 ref 透传
   */
  datePickerRef?: React.Ref<HTMLInputElement>;
}
