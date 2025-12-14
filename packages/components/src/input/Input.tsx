import { forwardRef, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { StyledInput } from './Input.styles';
import type { InputProps } from './Input.types';

/**
 * 基础输入框，支持受控/非受控、尺寸和块级模式。
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder = '请输入',
      disabled = false,
      size = 'medium',
      block = false,
      value,
      defaultValue,
      onChange,
      inputRef,
      ...rest
    },
    ref
  ) => {
    const isControlled = useMemo(() => value !== undefined, [value]);
    const [innerValue, setInnerValue] = useState<string>(defaultValue ?? '');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInnerValue(e.target.value);
      }
      onChange?.(e);
    };

    const mergedRef = inputRef ?? ref;

    return (
      <StyledInput
        ref={mergedRef as any}
        $size={size}
        $block={block}
        placeholder={placeholder}
        disabled={disabled}
        value={isControlled ? value : innerValue}
        onChange={handleChange}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
