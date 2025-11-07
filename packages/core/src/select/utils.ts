import type { AcceptableValue } from '../shared/types';
import { isDeepEqual, isFunction, isString, KEY_CODES } from '@vinicunca/perkakas';

export const OPEN_KEYS = [' ', KEY_CODES.ENTER, KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN];
export const SELECTION_KEYS = [' ', KEY_CODES.ENTER];
export const CONTENT_MARGIN = 10;

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

export function shouldShowPlaceholder(value?: AcceptableValue | Array<AcceptableValue>): boolean {
  return value === undefined
    || value === null
    || value === ''
    || (Array.isArray(value) && value.length === 0);
}
