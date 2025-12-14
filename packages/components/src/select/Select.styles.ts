import styled, { css } from 'styled-components';
import type { SelectSize } from './Select.types';

interface StyledSelectProps {
  $size: SelectSize;
  $block: boolean;
  $disabled: boolean;
  $open: boolean;
}

interface StyledOptionProps {
  $selected: boolean;
  $disabled: boolean;
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

export const StyledSelect = styled.div<StyledSelectProps>`
  position: relative;
  display: inline-block;
  width: ${(props) => (props.$block ? '100%' : 'auto')};
  min-width: 120px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`;

export const StyledSelectTrigger = styled.div<StyledSelectProps>`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.colors?.text || '#000'};
  background-color: ${(props) => props.theme.colors?.background || '#fff'};
  border: 1px solid
    ${(props) =>
      props.$open
        ? props.theme.colors?.primary || '#1890ff'
        : props.theme.colors?.border || '#d9d9d9'};
  border-radius: ${(props) => props.theme.borderRadius?.default || '4px'};
  outline: none;
  transition: all 0.2s ease;
  ${(props) => sizeStyles[props.$size]}

  &:hover:not(:disabled) {
    border-color: ${(props) =>
      props.$open
        ? props.theme.colors?.primary || '#1890ff'
        : props.theme.colors?.primary || '#1890ff'};
  }

  ${(props) =>
    props.$open &&
    css`
      border-color: ${props.theme.colors?.primary || '#1890ff'};
      box-shadow: 0 0 0 2px ${props.theme.colors?.hover || 'rgba(24, 144, 255, 0.2)'};
    `}

  ${(props) =>
    props.$disabled &&
    css`
      background-color: ${props.theme.colors?.hover || '#f5f5f5'};
      cursor: not-allowed;
      opacity: 0.65;
    `}
`;

export const StyledSelectValue = styled.span<{ $placeholder: boolean }>`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) =>
    props.$placeholder
      ? props.theme.colors?.textSecondary || '#888'
      : props.theme.colors?.text || '#000'};
`;

export const StyledSelectIcon = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.$open ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: ${(props) => props.theme.colors?.textSecondary || '#888'};
  font-size: 12px;
`;

export const StyledSelectDropdown = styled.div<{
  $open: boolean;
  $top: number;
  $left: number;
  $width: number;
}>`
  position: fixed;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  width: ${(props) => props.$width}px;
  margin-top: 4px;
  background-color: ${(props) => props.theme.colors?.background || '#fff'};
  border: 1px solid ${(props) => props.theme.colors?.border || '#d9d9d9'};
  border-radius: ${(props) => props.theme.borderRadius?.default || '4px'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  max-height: 256px;
  overflow-y: auto;
  display: ${(props) => (props.$open ? 'block' : 'none')};
`;

export const StyledOption = styled.div<StyledOptionProps>`
  padding: 8px 12px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => props.theme.colors?.text || '#000'};
  background-color: ${(props) =>
    props.$selected ? props.theme.colors?.hover || 'rgba(0, 0, 0, 0.06)' : 'transparent'};
  transition: background-color 0.2s ease;
  font-size: 14px;

  &:hover:not([data-disabled='true']) {
    background-color: ${(props) => props.theme.colors?.hover || 'rgba(0, 0, 0, 0.06)'};
  }

  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;
