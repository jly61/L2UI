import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getElement, addClass, removeClass, toggleClass, hasClass } from './index';

describe('dom', () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement('div');
    testElement.id = 'test-element';
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    document.body.removeChild(testElement);
  });

  describe('getElement', () => {
    it('应该通过选择器获取元素', () => {
      const element = getElement('#test-element');
      expect(element).toBe(testElement);
    });

    it('应该直接返回 HTMLElement', () => {
      const element = getElement(testElement);
      expect(element).toBe(testElement);
    });
  });

  describe('addClass', () => {
    it('应该添加类名', () => {
      addClass(testElement, 'test-class');
      expect(testElement.classList.contains('test-class')).toBe(true);
    });
  });

  describe('removeClass', () => {
    it('应该移除类名', () => {
      testElement.classList.add('test-class');
      removeClass(testElement, 'test-class');
      expect(testElement.classList.contains('test-class')).toBe(false);
    });
  });

  describe('toggleClass', () => {
    it('应该切换类名', () => {
      toggleClass(testElement, 'test-class');
      expect(testElement.classList.contains('test-class')).toBe(true);

      toggleClass(testElement, 'test-class');
      expect(testElement.classList.contains('test-class')).toBe(false);
    });
  });

  describe('hasClass', () => {
    it('应该检查类名是否存在', () => {
      testElement.classList.add('test-class');
      expect(hasClass(testElement, 'test-class')).toBe(true);
      expect(hasClass(testElement, 'other-class')).toBe(false);
    });
  });
});
