import styled, { css } from 'styled-components';
import type { InputSize } from './Input.types';

interface StyledInputProps {
  $size: InputSize;
  $block: boolean;
}

const sizeStyles = {
  small: css`
    height: 28px;
    font-size: 12px;
    padding: 4px 10px;
  `,
  medium: css`
    height: 32px;
    font-size: 14px;
    padding: 6px 12px;
  `,
  large: css`
    height: 40px;
    font-size: 16px;
    padding: 8px 14px;
  `,
};

export const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;
  width: ${(props) => (props.$block ? '100%' : 'auto')};
  color: ${(props) => props.theme.colors?.text || '#000'};
  background-color: ${(props) => props.theme.colors?.background || '#fff'};
  border: 1px solid ${(props) => props.theme.colors?.border || '#d9d9d9'};
  border-radius: ${(props) => props.theme.borderRadius?.default || '4px'};
  outline: none;
  transition: all 0.2s ease;
  ${(props) => sizeStyles[props.$size]}

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
  }

  &:focus:not(:disabled) {
    border-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
    box-shadow: 0 0 0 2px
      ${(props) => props.theme.colors?.hover || 'rgba(24, 144, 255, 0.2)'};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors?.hover || '#f5f5f5'};
    cursor: not-allowed;
    opacity: 0.65;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors?.textSecondary || '#888'};
  }
`;

