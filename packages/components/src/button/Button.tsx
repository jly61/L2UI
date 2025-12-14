import React from 'react';
import { StyledButton } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'default',
  size = 'medium',
  loading = false,
  block = false,
  danger = false,
  ghost = false,
  disabled,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      return;
    }
    onClick?.(e);
  };

  return (
    <StyledButton
      $type={type}
      $size={size}
      $loading={loading}
      $block={block}
      $danger={danger}
      $ghost={ghost}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && <span style={{ marginRight: children ? '8px' : 0 }}>⏳</span>}
      {children}
    </StyledButton>
  );
};

Button.displayName = 'Button';

export default Button;
