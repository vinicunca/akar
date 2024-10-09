import { isDeepEqual } from '@vinicunca/perkakas';

export function queryCheckedElement(parentEl: HTMLElement | null) {
  return parentEl?.querySelector('[data-state=checked]') as HTMLElement | null;
}

export function valueComparator<T>(
  { comparator, currentValue, value }:
  {
    comparator?: ((a: T, b: T) => boolean) | string;
    currentValue: T;
    value: Array<T> | T | undefined;
  },
) {
  if (value === undefined) {
    return false;
  } else if (Array.isArray(value)) {
    return value.some((val) => compare({ comparator, currentValue, value: val }));
  } else {
    return compare({ comparator, currentValue, value });
  }
}

export function compare<T>(
  { comparator, currentValue, value }:
  {
    comparator?: ((a: T, b: T) => boolean) | string;
    currentValue?: T;
    value?: T;
  },
) {
  if (value === undefined || currentValue === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    return value === currentValue;
  }

  if (typeof comparator === 'function') {
    return comparator(value, currentValue);
  }

  if (typeof comparator === 'string') {
    return value?.[comparator as keyof T] === currentValue?.[comparator as keyof T];
  }

  return isDeepEqual(value, currentValue);
}
