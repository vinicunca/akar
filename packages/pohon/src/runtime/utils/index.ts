import type { GetItemKeys } from '../types/utils';
import { isEmptyish, isFunction, isNullish, isString } from '@vinicunca/perkakas';
import { isEqual } from 'ohash/utils';
import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo';

export function getProp(
  object: Record<string, any> | undefined,
  path: Array<string | number> | string,
  defaultValue?: any,
): any {
  if (isString(path)) {
    path = path.split('.').map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }

  let result: any = object;

  for (const key of path) {
    if (isNullish(result)) {
      return defaultValue;
    }

    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
}

export function setProp(
  object: Record<string, any>,
  path: Array<string | number> | string,
  value: any,
): void {
  if (isString(path)) {
    path = path.split('.').map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }

  path.reduce(
    (acc, key, i) => {
      if (acc[key] === undefined) {
        acc[key] = {};
      }
      if (i === path.length - 1) {
        acc[key] = value;
      }
      return acc[key];
    },
    object,
  );
}

export function looseToNumber(val: any): any {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
}

export function compare<T>(
  { value, currentValue, comparator }:
  { value?: T; currentValue?: T; comparator?: string | ((a: T, b: T) => boolean) } = {},
) {
  if (value === undefined || currentValue === undefined) {
    return false;
  }

  if (isString(value)) {
    return value === currentValue;
  }

  if (isFunction(comparator)) {
    return comparator(value, currentValue);
  }

  if (isString(comparator)) {
    return getProp(value!, comparator) === getProp(currentValue!, comparator);
  }

  return isEqual(value, currentValue);
}

export function getDisplayValue<T extends Array<any>, V>(
  { items, value, options = {} }: {
    items: T;
    value: V | undefined | null;
    options?: {
      valueKey?: GetItemKeys<T>;
      labelKey?: GetItemKeys<T>;
      by?: string | ((a: any, b: any) => boolean);
    };
  },
): string | undefined {
  const { valueKey, labelKey, by } = options;

  const foundItem = items.find((item) => {
    const itemValue = (typeof item === 'object' && item !== null && valueKey)
      ? getProp(item, valueKey as string)
      : item;
    return compare({ value: itemValue, currentValue: value, comparator: by });
  });

  if (isEmptyish(value) && foundItem) {
    return labelKey ? getProp(foundItem as Record<string, any>, labelKey as string) : undefined;
  }

  if (isEmptyish(value)) {
    return undefined;
  }

  const source = foundItem ?? value;

  if (isNullish(source)) {
    return undefined;
  }

  if (typeof source === 'object') {
    return labelKey ? getProp(source as Record<string, any>, labelKey as string) : undefined;
  }

  return String(source);
}

export function isArrayOfArray<
  A extends Array<any> | Array<Array<any>>,
>(item: A): item is A extends Array<infer T>
  ? T extends Array<any>
    ? Array<T>
    : never
  : never {
  return Array.isArray(item[0]);
}

export function mergeClasses(appConfigClass?: string | Array<string>, propClass?: string) {
  if (!appConfigClass && !propClass) {
    return '';
  }

  return [
    ...(Array.isArray(appConfigClass) ? appConfigClass : [appConfigClass]),
    propClass,
  ].filter(Boolean);
}

export function getSlotChildrenText(children: any) {
  return children.map((node: any) => {
    if (!node.children || isString(node.children)) {
      return node.children || '';
    } else if (Array.isArray(node.children)) {
      return getSlotChildrenText(node.children);
    } else if (node.children.default) {
      return getSlotChildrenText(node.children.default());
    }

    return undefined;
  }).join('');
}

export function transformPohon(pohon: any, pohonProp?: any) {
  return Object.entries(pohon)
    .reduce(
      (acc, [key, value]) => {
        acc[key] = typeof value === 'function' ? value({ class: pohonProp?.[key] }) : value;
        return acc;
      },
      { ...(pohonProp || {}) },
    );
}

export function resolveBaseURL(path?: string, baseURL?: string): string | undefined {
  if (path?.startsWith('/') && !path.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(baseURL || '/'));
    if (_base !== '/' && !path.startsWith(_base)) {
      return joinURL(_base, path);
    }
  }
  return path;
}
