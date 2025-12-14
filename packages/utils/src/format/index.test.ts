import { describe, it, expect } from 'vitest';
import { formatFileSize, formatNumber, formatPercent } from './index';

describe('format', () => {
  describe('formatFileSize', () => {
    it('应该正确格式化文件大小', () => {
      expect(formatFileSize(0)).toBe('0 B');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
    });
  });

  describe('formatNumber', () => {
    it('应该正确格式化数字（千分位）', () => {
      expect(formatNumber(1234)).toBe('1,234');
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber('1234')).toBe('1,234');
    });
  });

  describe('formatPercent', () => {
    it('应该正确格式化百分比', () => {
      expect(formatPercent(0.5)).toBe('50.00%');
      expect(formatPercent(0.123)).toBe('12.30%');
      expect(formatPercent(0.123, 1)).toBe('12.3%');
    });
  });
});
