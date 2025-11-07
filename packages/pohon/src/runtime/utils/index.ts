import type { GetItemKeys } from '../types/utils';
import { isEmptyish, isFunction, isNullish, isString } from '@vinicunca/perkakas';
import { isEqual } from 'ohash/utils';

export function getProp(
  { object, path, defaultValue }:
  {
    object: Record<string, any> | undefined;
    path: Array<string | number> | string;
    defaultValue?: any;
  },
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
  { object, path, value }:
  { object: Record<string, any>; path: Array<string | number> | string; value: any },
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

export function mergeClasses(appConfigClass?: string | Array<string>, propClass?: string) {
  if (!appConfigClass && !propClass) {
    return '';
  }

  return [
    ...(Array.isArray(appConfigClass) ? appConfigClass : [appConfigClass]),
    propClass,
  ].filter(Boolean);
}

export function transformPohon(pohon: any, pohonProp?: any) {
  return Object.entries(pohon)
    .reduce(
      (acc, [key, value]) => {
        acc[key] = isFunction(value) ? value({ class: pohonProp?.[key] }) : value;
        return acc;
      },
      pohonProp || {},
    );
}

export function isArrayOfArray<A>(item: Array<A> | Array<Array<A>>): item is Array<Array<A>> {
  return Array.isArray(item[0]);
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
    return getProp({ object: value!, path: comparator }) === getProp({ object: currentValue!, path: comparator });
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
    };
  },
): string | undefined {
  const { valueKey, labelKey } = options;

  const foundItem = items.find((item) => {
    const itemValue = (typeof item === 'object' && item !== null && valueKey)
      ? getProp({ object: item, path: valueKey as string })
      : item;
    return compare({ value: itemValue, currentValue: value });
  });

  if (isEmptyish(value) && foundItem) {
    return labelKey ? getProp({ object: foundItem as Record<string, any>, path: labelKey as string }) : undefined;
  }

  if (isEmptyish(value)) {
    return undefined;
  }

  const source = foundItem ?? value;

  if (isNullish(source)) {
    return undefined;
  }

  if (typeof source === 'object') {
    return labelKey ? getProp({ object: source as Record<string, any>, path: labelKey as string }) : undefined;
  }

  return String(source);
}

export function looseToNumber(val: any): any {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
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
