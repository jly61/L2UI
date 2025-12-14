import React, { forwardRef, useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  StyledSelect,
  StyledSelectTrigger,
  StyledSelectValue,
  StyledSelectIcon,
  StyledSelectDropdown,
  StyledOption,
} from './Select.styles';
import type { SelectProps, SelectOption } from './Select.types';

/**
 * 选择器组件，支持单选、受控/非受控模式。
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options = [],
      size = 'medium',
      placeholder = '请选择',
      disabled = false,
      block = false,
      value,
      defaultValue,
      onChange,
      selectRef,
      className,
      style,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [innerValue, setInnerValue] = useState<string | number | undefined>(defaultValue);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const selectRefInternal = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isControlled = useMemo(() => value !== undefined, [value]);
    const currentValue = isControlled ? value : innerValue;

    // 查找当前选中的选项
    const selectedOption = useMemo(() => {
      return options.find((opt) => opt.value === currentValue);
    }, [options, currentValue]);

    // 计算下拉框位置
    const updateDropdownPosition = () => {
      if (selectRefInternal.current) {
        const rect = selectRefInternal.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    useEffect(() => {
      if (open) {
        updateDropdownPosition();
        // 监听滚动和窗口大小变化
        window.addEventListener('scroll', updateDropdownPosition, true);
        window.addEventListener('resize', updateDropdownPosition);

        return () => {
          window.removeEventListener('scroll', updateDropdownPosition, true);
          window.removeEventListener('resize', updateDropdownPosition);
        };
      }
    }, [open]);

    // 点击外部关闭下拉框
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRefInternal.current &&
          !selectRefInternal.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      if (open) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [open]);

    // 处理选择
    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;

      if (!isControlled) {
        setInnerValue(option.value);
      }
      onChange?.(option.value, option);
      setOpen(false);
    };

    // 切换下拉框
    const handleToggle = () => {
      if (disabled) return;
      setOpen((prev) => !prev);
    };

    // 键盘导航
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setOpen((prev) => !prev);
          break;
        case 'Escape':
          setOpen(false);
          break;
        default:
          break;
      }
    };

    const mergedRef = selectRef ?? ref;

    return (
      <StyledSelect
        ref={mergedRef as any}
        $size={size}
        $block={block}
        $disabled={disabled}
        $open={open}
        className={className}
        style={style}
      >
        <StyledSelectTrigger
          ref={selectRefInternal}
          $size={size}
          $block={block}
          $disabled={disabled}
          $open={open}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          tabIndex={disabled ? -1 : 0}
        >
          <StyledSelectValue $placeholder={!selectedOption}>
            {selectedOption ? selectedOption.label : placeholder}
          </StyledSelectValue>
          <StyledSelectIcon $open={open}>▼</StyledSelectIcon>
        </StyledSelectTrigger>
        {open &&
          createPortal(
            <StyledSelectDropdown
              ref={dropdownRef}
              $open={open}
              $top={dropdownPosition.top}
              $left={dropdownPosition.left}
              $width={dropdownPosition.width}
              role="listbox"
            >
              {options.map((option) => (
                <StyledOption
                  key={option.value}
                  $selected={option.value === currentValue}
                  $disabled={!!option.disabled}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={option.value === currentValue}
                  data-disabled={option.disabled}
                >
                  {option.label}
                </StyledOption>
              ))}
            </StyledSelectDropdown>,
            document.body
          )}
      </StyledSelect>
    );
  }
);

Select.displayName = 'Select';

export default Select;
