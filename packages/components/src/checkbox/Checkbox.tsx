import React, { forwardRef, useRef, useEffect } from 'react';
import { StyledCheckboxWrapper, StyledCheckboxInput, StyledCheckboxLabel } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

/**
 * 复选框组件，支持受控/非受控、不确定状态。
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'medium',
      checked,
      defaultChecked = false,
      disabled = false,
      indeterminate = false,
      onChange,
      children,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const mergedRef = ref || inputRef;

    // 设置不确定状态
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange?.(e.target.checked, e);
    };

    return (
      <StyledCheckboxWrapper $disabled={disabled} className={className} style={style}>
        <StyledCheckboxInput
          ref={mergedRef as any}
          type="checkbox"
          $size={size}
          $disabled={disabled}
          $indeterminate={indeterminate}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          {...rest}
        />
        {children && (
          <StyledCheckboxLabel $size={size} $disabled={disabled}>
            {children}
          </StyledCheckboxLabel>
        )}
      </StyledCheckboxWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
