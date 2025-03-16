import type { ADrawerDirection, AnyFunction } from './drawer.types';

interface Style {
  [key: string]: string;
}

const cache = new WeakMap();

export function setCache(
  { el, styles, ignoreCache = false }:
  { el?: Element | HTMLElement | null; styles?: Style; ignoreCache?: boolean },
) {
  if (!el || !(el instanceof HTMLElement) || !styles) {
    return;
  }

  const originalStyles: Style = {};

  Object.entries(styles).forEach(([key, value]: [string, string]) => {
    if (key.startsWith('--')) {
      el.style.setProperty(key, value);
      return;
    }

    originalStyles[key] = (el.style as any)[key];
    (el.style as any)[key] = value;
  });

  if (ignoreCache) {
    return;
  }

  cache.set(el, originalStyles);
}

export function isVertical(direction: ADrawerDirection) {
  switch (direction) {
    case 'top':
    case 'bottom':
      return true;
    case 'left':
    case 'right':
      return false;
    default:
      return direction satisfies never;
  }
}

export function getTranslate(
  { element, direction }:
  { element: HTMLElement; direction: ADrawerDirection },
): number | null {
  const style = window.getComputedStyle(element);
  const transform
    // @ts-expect-error some custom style only exist in certain browser
    = style.transform || style.webkitTransform || style.mozTransform;
  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
    return Number.parseFloat(mat[1].split(', ')[isVertical(direction) ? 13 : 12]);
  }
  // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
  mat = transform.match(/^matrix\((.+)\)$/);

  if (!mat) {
    return null;
  }

  const index = isVertical(direction) ? 5 : 4;
  return Number.parseFloat(mat[1].split(', ')[index]);
}

export function resetElement(el: Element | HTMLElement | null, prop?: string) {
  if (!el || !(el instanceof HTMLElement)) {
    return;
  }
  const originalStyles = cache.get(el);

  if (!originalStyles) {
    return;
  }

  if (prop) {
    (el.style as any)[prop] = originalStyles[prop];
  } else {
    Object.entries(originalStyles).forEach(([key, value]) => {
      (el.style as any)[key] = value;
    });
  }
}

export function dampenValue(v: number) {
  return 8 * (Math.log(v + 1) - 2);
}

export function assignStyle(
  { element, style }:
  { element: HTMLElement | null | undefined; style: Partial<CSSStyleDeclaration> },
) {
  if (!element) {
    return () => {};
  }

  const prevStyle = element.style.cssText;
  Object.assign(element.style, style);

  return () => {
    element.style.cssText = prevStyle;
  };
}

/**
 * Receives functions as arguments and returns a new function that calls all.
 */
export function chain<T>(...fns: Array<T>) {
  return (...args: T extends AnyFunction ? Parameters<T> : never) => {
    for (const fn of fns) {
      if (typeof fn === 'function') {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-ignore
        fn(...args);
      }
    }
  };
}
