import { isDeepEqual, isFunction, isString } from '@vinicunca/perkakas';

export function queryCheckedElement(parentEl: HTMLElement | null) {
  return parentEl?.querySelector('[data-state=checked]') as HTMLElement | null;
}

export function valueComparator<T>(value: T | Array<T> | undefined, currentValue: T, comparator?: string | ((a: T, b: T) => boolean)) {
  if (value === undefined) {
    return false;
  } else if (Array.isArray(value)) {
    return value.some((val) => compare(val, currentValue, comparator));
  } else {
    return compare(value, currentValue, comparator);
  }
}

export function compare<T>(value?: T, currentValue?: T, comparator?: string | ((a: T, b: T) => boolean)) {
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
    return value?.[comparator as keyof T] === currentValue?.[comparator as keyof T];
  }

  return isDeepEqual(value, currentValue);
}
