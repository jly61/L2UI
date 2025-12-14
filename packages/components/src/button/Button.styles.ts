import styled, { css } from 'styled-components';
import type { ButtonType, ButtonSize } from './Button.types';

interface StyledButtonProps {
  $type: ButtonType;
  $size: ButtonSize;
  $block: boolean;
  $loading: boolean;
  $danger: boolean;
  $ghost: boolean;
}

const sizeStyles = {
  small: css`
    padding: 4px 12px;
    font-size: 12px;
    height: 24px;
  `,
  medium: css`
    padding: 6px 16px;
    font-size: 14px;
    height: 32px;
  `,
  large: css`
    padding: 8px 24px;
    font-size: 16px;
    height: 40px;
  `,
};

const typeStyles = {
  default: css<StyledButtonProps>`
    background-color: ${(props) => props.theme.colors?.background || '#fff'};
    border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'};
    color: ${(props) => props.theme.colors?.text || '#000'};

    &:hover:not(:disabled) {
      border-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
      color: ${(props) => props.theme.colors?.primary || '#1890ff'};
    }

    &:active:not(:disabled) {
      border-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
      color: ${(props) => props.theme.colors?.primary || '#1890ff'};
    }
  `,
  primary: css<StyledButtonProps>`
    background-color: ${(props) =>
      props.$danger
        ? props.theme.colors?.error || '#ff4d4f'
        : props.theme.colors?.primary || '#1890ff'};
    border-color: ${(props) =>
      props.$danger
        ? props.theme.colors?.error || '#ff4d4f'
        : props.theme.colors?.primary || '#1890ff'};
    color: #fff;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }

    &:active:not(:disabled) {
      opacity: 0.8;
    }
  `,
  dashed: css<StyledButtonProps>`
    background-color: transparent;
    border-style: dashed;
    border-color: ${(props) => props.theme.colors?.border || '#d9d9d9'};
    color: ${(props) => props.theme.colors?.text || '#000'};

    &:hover:not(:disabled) {
      border-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
      color: ${(props) => props.theme.colors?.primary || '#1890ff'};
    }
  `,
  link: css<StyledButtonProps>`
    background-color: transparent;
    border: none;
    color: ${(props) =>
      props.$danger
        ? props.theme.colors?.error || '#ff4d4f'
        : props.theme.colors?.primary || '#1890ff'};

    &:hover:not(:disabled) {
      opacity: 0.8;
      text-decoration: underline;
    }
  `,
  text: css<StyledButtonProps>`
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.colors?.text || '#000'};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors?.hover || 'rgba(0, 0, 0, 0.06)'};
    }
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: ${(props) => (props.$block ? 'block' : 'inline-block')};
  width: ${(props) => (props.$block ? '100%' : 'auto')};
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  border: 1px solid;
  border-radius: ${(props) => props.theme.borderRadius?.default || '4px'};
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  text-decoration: none;
  outline: none;

  ${(props) => sizeStyles[props.$size]}
  ${(props) => typeStyles[props.$type]}

  ${(props) =>
    props.$ghost &&
    css`
      background-color: transparent !important;
      border-color: ${props.$danger
        ? props.theme.colors?.error || '#ff4d4f'
        : props.theme.colors?.primary || '#1890ff'};
      color: ${props.$danger
        ? props.theme.colors?.error || '#ff4d4f'
        : props.theme.colors?.primary || '#1890ff'};
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) =>
    props.$loading &&
    css`
      pointer-events: none;
      opacity: 0.8;
    `}
`;
