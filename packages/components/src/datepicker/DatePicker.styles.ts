import styled, { css } from 'styled-components';
import type { DatePickerSize } from './DatePicker.types';

interface StyledDatePickerProps {
  $size: DatePickerSize;
  $block: boolean;
  $disabled: boolean;
  $open: boolean;
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

export const StyledDatePicker = styled.div<StyledDatePickerProps>`
  position: relative;
  display: inline-block;
  width: ${(props) => (props.$block ? '100%' : 'auto')};
  min-width: 200px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`;

export const StyledDatePickerInput = styled.input<StyledDatePickerProps>`
  box-sizing: border-box;
  width: 100%;
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
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'text')};
  ${(props) => sizeStyles[props.$size]}

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
  }

  &:focus:not(:disabled) {
    border-color: ${(props) => props.theme.colors?.primary || '#1890ff'};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors?.hover || 'rgba(24, 144, 255, 0.2)'};
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

export const StyledDatePickerIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${(props) => props.theme.colors?.textSecondary || '#888'};
  font-size: 14px;
  cursor: pointer;
`;

export const StyledCalendar = styled.div<{
  $open: boolean;
  $top: number;
  $left: number;
  $width: number;
  $ready: boolean;
}>`
  position: fixed;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  width: ${(props) => Math.max(props.$width, 280)}px;
  margin-top: 4px;
  background-color: ${(props) => props.theme.colors?.background || '#fff'};
  border: 1px solid ${(props) => props.theme.colors?.border || '#d9d9d9'};
  border-radius: ${(props) => props.theme.borderRadius?.default || '4px'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  padding: 16px;
  opacity: ${(props) => (props.$ready ? 1 : 0)};
  visibility: ${(props) => (props.$open && props.$ready ? 'visible' : 'hidden')};
  transition: opacity 0.15s ease;
`;

export const StyledCalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const StyledCalendarNavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  color: ${(props) => props.theme.colors?.text || '#000'};
  font-size: 16px;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors?.primary || '#1890ff'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledCalendarTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors?.text || '#000'};
  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${(props) => props.theme.colors?.primary || '#1890ff'};
  }
`;

export const StyledCalendarWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
`;

export const StyledCalendarWeekday = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${(props) => props.theme.colors?.textSecondary || '#888'};
  font-weight: 500;
  padding: 4px 0;
`;

export const StyledCalendarDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

export const StyledCalendarDay = styled.button<{
  $isToday: boolean;
  $isSelected: boolean;
  $isOtherMonth: boolean;
  $disabled: boolean;
}>`
  aspect-ratio: 1;
  border: none;
  background: ${(props) => {
    if (props.$isSelected) {
      return props.theme.colors?.primary || '#1890ff';
    }
    if (props.$isToday) {
      return props.theme.colors?.hover || 'rgba(0, 0, 0, 0.06)';
    }
    return 'transparent';
  }};
  color: ${(props) => {
    if (props.$isSelected) {
      return '#fff';
    }
    if (props.$isOtherMonth) {
      return props.theme.colors?.textSecondary || '#ccc';
    }
    return props.theme.colors?.text || '#000';
  }};
  border-radius: ${(props) => props.theme.borderRadius?.default || '4px'};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  transition: all 0.2s ease;
  position: relative;

  ${(props) =>
    props.$isToday &&
    !props.$isSelected &&
    css`
      border: 1px solid ${props.theme.colors?.primary || '#1890ff'};
    `}

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.$isSelected
        ? props.theme.colors?.primary || '#1890ff'
        : props.theme.colors?.hover || 'rgba(0, 0, 0, 0.06)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
