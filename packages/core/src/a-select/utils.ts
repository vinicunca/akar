import { isDeepEqual, isString, KEY_CODES } from '@vinicunca/perkakas';

export const OPEN_KEYS = [' ', KEY_CODES.ENTER, KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN];
export const SELECTION_KEYS = [' ', KEY_CODES.ENTER];
export const CONTENT_MARGIN = 10;

export function valueComparator<T>(
  { value, currentValue, comparator }:
  {
    comparator?: ((a: T, b: T) => boolean) | string;
    currentValue: T;
    value: Array<T> | T | undefined;
  },
) {
  if (value === undefined) {
    return false;
  } else if (Array.isArray(value)) {
    return value.some((val) => compare({ value: val, currentValue, comparator }));
  } else {
    return compare({ value, currentValue, comparator });
  }
}

export function compare<T>(
  { value, currentValue, comparator }:
  {
    comparator?: ((a: T, b: T) => boolean) | string;
    currentValue?: T;
    value?: T;
  },
) {
  if (value === undefined || currentValue === undefined) {
    return false;
  }

  if (isString(value)) {
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
