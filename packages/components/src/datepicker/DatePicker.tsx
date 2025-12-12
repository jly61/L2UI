import React, { forwardRef, useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  StyledDatePicker,
  StyledDatePickerInput,
  StyledDatePickerIcon,
  StyledCalendar,
  StyledCalendarHeader,
  StyledCalendarNavButton,
  StyledCalendarTitle,
  StyledCalendarWeekdays,
  StyledCalendarWeekday,
  StyledCalendarDays,
  StyledCalendarDay,
} from './DatePicker.styles';
import type { DatePickerProps, DateFormat } from './DatePicker.types';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

/**
 * 格式化日期
 */
const formatDate = (date: Date | null, format: DateFormat): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'YYYY/MM/DD':
      return `${year}/${month}/${day}`;
    case 'DD-MM-YYYY':
      return `${day}-${month}-${year}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
};

/**
 * 解析日期字符串
 */
const parseDate = (dateString: string, format: DateFormat): Date | null => {
  if (!dateString) return null;
  try {
    let year: number, month: number, day: number;
    const parts = dateString.split(/[-\/]/);
    
    switch (format) {
      case 'YYYY-MM-DD':
      case 'YYYY/MM/DD':
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        day = parseInt(parts[2], 10);
        break;
      case 'DD-MM-YYYY':
      case 'DD/MM/YYYY':
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        year = parseInt(parts[2], 10);
        break;
      default:
        return null;
    }
    
    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) return null;
    return date;
  } catch {
    return null;
  }
};

/**
 * 获取月份的第一天和最后一天
 */
const getMonthBounds = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  return { firstDay, lastDay };
};

/**
 * 获取日历网格的日期数组
 */
const getCalendarDays = (date: Date): Date[] => {
  const { firstDay, lastDay } = getMonthBounds(date);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // 从周日开始

  const days: Date[] = [];
  const current = new Date(startDate);
  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // 到周六结束

  while (current <= endDate) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
};

/**
 * 日期选择器组件
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      size = 'medium',
      placeholder = '请选择日期',
      disabled = false,
      block = false,
      value,
      defaultValue,
      format = 'YYYY-MM-DD',
      onChange,
      datePickerRef,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [innerValue, setInnerValue] = useState<Date | null>(() => {
      if (defaultValue) {
        return typeof defaultValue === 'string' ? parseDate(defaultValue, format) : defaultValue;
      }
      return null;
    });
    const [calendarDate, setCalendarDate] = useState<Date>(() => {
      const initialDate = value
        ? typeof value === 'string'
          ? parseDate(value, format)
          : value
        : defaultValue
        ? typeof defaultValue === 'string'
          ? parseDate(defaultValue, format)
          : defaultValue
        : new Date();
      return initialDate || new Date();
    });
    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0, width: 0 });
    const [calendarReady, setCalendarReady] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const isControlled = useMemo(() => value !== undefined, [value]);
    const currentDate = isControlled
      ? value
        ? typeof value === 'string'
          ? parseDate(value, format)
          : value
        : null
      : innerValue;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 计算日历位置
    const updateCalendarPosition = () => {
      const inputElement = inputRef.current;
      if (inputElement) {
        const rect = inputElement.getBoundingClientRect();
        setCalendarPosition({
          top: rect.bottom,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    useEffect(() => {
      if (open) {
        // 使用 requestAnimationFrame 确保 DOM 更新后再计算位置
        requestAnimationFrame(() => {
          updateCalendarPosition();
          // 位置计算完成后再显示
          setCalendarReady(true);
        });
        window.addEventListener('scroll', updateCalendarPosition, true);
        window.addEventListener('resize', updateCalendarPosition);

        return () => {
          setCalendarReady(false);
          window.removeEventListener('scroll', updateCalendarPosition, true);
          window.removeEventListener('resize', updateCalendarPosition);
        };
      } else {
        setCalendarReady(false);
      }
    }, [open]);

    // 同步日历显示日期
    useEffect(() => {
      if (currentDate) {
        setCalendarDate(new Date(currentDate));
      }
    }, [currentDate]);

    // 点击外部关闭
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          inputRef.current &&
          !inputRef.current.contains(event.target as Node) &&
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node)
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const parsedDate = parseDate(inputValue, format);
      
      if (parsedDate) {
        if (!isControlled) {
          setInnerValue(parsedDate);
        }
        setCalendarDate(new Date(parsedDate));
        onChange?.(parsedDate, formatDate(parsedDate, format));
      } else if (inputValue === '') {
        if (!isControlled) {
          setInnerValue(null);
        }
        onChange?.(null, '');
      }
    };

    const handleInputFocus = () => {
      if (!disabled) {
        // 先计算位置，再打开
        updateCalendarPosition();
        setOpen(true);
      }
    };

    const handleInputClick = () => {
      if (!disabled) {
        // 先计算位置，再打开
        updateCalendarPosition();
        setOpen(true);
      }
    };

    const handleDayClick = (date: Date) => {
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      if (!isControlled) {
        setInnerValue(selectedDate);
      }
      onChange?.(selectedDate, formatDate(selectedDate, format));
      setOpen(false);
    };

    const handlePrevMonth = () => {
      const newDate = new Date(calendarDate);
      newDate.setMonth(newDate.getMonth() - 1);
      setCalendarDate(newDate);
    };

    const handleNextMonth = () => {
      const newDate = new Date(calendarDate);
      newDate.setMonth(newDate.getMonth() + 1);
      setCalendarDate(newDate);
    };

    const handlePrevYear = () => {
      const newDate = new Date(calendarDate);
      newDate.setFullYear(newDate.getFullYear() - 1);
      setCalendarDate(newDate);
    };

    const handleNextYear = () => {
      const newDate = new Date(calendarDate);
      newDate.setFullYear(newDate.getFullYear() + 1);
      setCalendarDate(newDate);
    };

    const calendarDays = getCalendarDays(calendarDate);
    const currentMonth = calendarDate.getMonth();
    const currentYear = calendarDate.getFullYear();

    // 合并 ref：同时支持外部 ref 和内部 inputRef
    const setInputRef = (element: HTMLInputElement | null) => {
      inputRef.current = element;
      if (typeof datePickerRef === 'function') {
        datePickerRef(element);
      } else if (datePickerRef) {
        (datePickerRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
    };

    return (
      <StyledDatePicker
        $size={size}
        $block={block}
        $disabled={disabled}
        $open={open}
        className={className}
        style={style}
      >
        <StyledDatePickerInput
          ref={setInputRef}
          type="text"
          $size={size}
          $block={block}
          $disabled={disabled}
          $open={open}
          placeholder={placeholder}
          value={currentDate ? formatDate(currentDate, format) : ''}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onClick={handleInputClick}
          disabled={disabled}
          readOnly
          {...rest}
        />
        <StyledDatePickerIcon>📅</StyledDatePickerIcon>
        {open &&
          createPortal(
            <StyledCalendar
              ref={calendarRef}
              $open={open}
              $top={calendarPosition.top}
              $left={calendarPosition.left}
              $width={calendarPosition.width}
              $ready={calendarReady}
            >
              <StyledCalendarHeader>
                <StyledCalendarNavButton onClick={handlePrevYear} type="button">
                  ««
                </StyledCalendarNavButton>
                <StyledCalendarNavButton onClick={handlePrevMonth} type="button">
                  ‹
                </StyledCalendarNavButton>
                <StyledCalendarTitle>
                  {currentYear}年 {MONTHS[currentMonth]}
                </StyledCalendarTitle>
                <StyledCalendarNavButton onClick={handleNextMonth} type="button">
                  ›
                </StyledCalendarNavButton>
                <StyledCalendarNavButton onClick={handleNextYear} type="button">
                  »»
                </StyledCalendarNavButton>
              </StyledCalendarHeader>
              <StyledCalendarWeekdays>
                {WEEKDAYS.map((day) => (
                  <StyledCalendarWeekday key={day}>{day}</StyledCalendarWeekday>
                ))}
              </StyledCalendarWeekdays>
              <StyledCalendarDays>
                {calendarDays.map((day, index) => {
                  const dayDate = new Date(day);
                  dayDate.setHours(0, 0, 0, 0);
                  const isToday = dayDate.getTime() === today.getTime();
                  const selectedDate = currentDate ? new Date(currentDate) : null;
                  selectedDate?.setHours(0, 0, 0, 0);
                  const isSelected = selectedDate && dayDate.getTime() === selectedDate.getTime();
                  const isOtherMonth = day.getMonth() !== currentMonth;

                  return (
                    <StyledCalendarDay
                      key={index}
                      $isToday={isToday}
                      $isSelected={!!isSelected}
                      $isOtherMonth={isOtherMonth}
                      $disabled={disabled}
                      onClick={() => handleDayClick(day)}
                      type="button"
                    >
                      {day.getDate()}
                    </StyledCalendarDay>
                  );
                })}
              </StyledCalendarDays>
            </StyledCalendar>,
            document.body
          )}
      </StyledDatePicker>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;

