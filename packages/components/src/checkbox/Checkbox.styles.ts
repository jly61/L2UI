import styled, { css } from 'styled-components';
import type { CheckboxSize } from './Checkbox.types';

interface StyledCheckboxProps {
  $size: CheckboxSize;
  $disabled: boolean;
  $indeterminate: boolean;
}

const sizeStyles = {
  small: css`
    width: 14px;
    height: 14px;
  `,
  medium: css`
    width: 16px;
    height: 16px;
  `,
  large: css`
    width: 18px;
    height: 18px;
  `,
};

const sizeLabelStyles = {
  small: css`
    font-size: 12px;
    margin-left: 6px;
  `,
  medium: css`
    font-size: 14px;
    margin-left: 8px;
  `,
  large: css`
    font-size: 16px;
    margin-left: 10px;
  `,
};

export const StyledCheckboxWrapper = styled.label<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.65;
    `}
`;

export const StyledCheckboxInput = styled.input<StyledCheckboxProps>`
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  padding: 0;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  border: 1px solid ${(props) => props.theme.colors?.border || '#d9d9d9'};
  border-radius: ${(props) => props.theme.borderRadius?.sm || '2px'};
  background-color: ${(props) => props.theme.colors?.background || '#fff'};
  transition: all 0.2s ease;
  ${(props) => sizeStyles[props.$size]}

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
    box-shadow: 0 0 0 2px
      ${(props) => props.theme.colors?.hover || 'rgba(24, 144, 255, 0.2)'};
  }

  &:checked {
    background-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
    border-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: ${(props) => (props.$size === 'small' ? '4px' : props.$size === 'large' ? '6px' : '5px')};
    height: ${(props) => (props.$size === 'small' ? '8px' : props.$size === 'large' ? '10px' : '9px')};
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
  }

  ${(props) =>
    props.$indeterminate &&
    css`
      background-color: ${props.theme.colors?.primary || '#1890ff'};
      border-color: ${props.theme.colors?.primary || '#1890ff'};

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${props.$size === 'small' ? '6px' : props.$size === 'large' ? '10px' : '8px'};
        height: 2px;
        background-color: #fff;
        border: none;
      }
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const StyledCheckboxLabel = styled.span<{ $size: CheckboxSize; $disabled: boolean }>`
  color: ${(props) => (props.$disabled ? props.theme.colors?.textSecondary || '#888' : props.theme.colors?.text || '#000')};
  ${(props) => sizeLabelStyles[props.$size]}
`;

