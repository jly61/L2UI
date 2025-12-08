/**
 * 获取元素
 */
export function getElement(selector: string | HTMLElement): HTMLElement | null {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }
  return selector;
}

/**
 * 添加类名
 */
export function addClass(element: HTMLElement, className: string): void {
  element.classList.add(className);
}

/**
 * 移除类名
 */
export function removeClass(element: HTMLElement, className: string): void {
  element.classList.remove(className);
}

/**
 * 切换类名
 */
export function toggleClass(element: HTMLElement, className: string): void {
  element.classList.toggle(className);
}

/**
 * 检查是否包含类名
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

