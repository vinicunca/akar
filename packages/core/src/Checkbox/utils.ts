import { isValueEqualOrExist } from '@/shared';
import { isEqual } from '@/shared/compare';

export type CheckedState = boolean | 'indeterminate';

export function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate';
}

/**
 * Membership toggle shared by `useCheckbox` (group mode) and
 * `useCheckboxGroup().toggleValue`: removes `value` when an equal item (ohash
 * `isEqual`) already exists, appends it otherwise. Always returns a new array.
 */
export function toggleArrayValue<T>(array: Array<T> | undefined, value: T): Array<T> {
  const next = [
    ...(array || []),
  ];
  if (isValueEqualOrExist(next, value)) {
    const index = next.findIndex((i) => isEqual(i, value));
    next.splice(index, 1);
  } else {
    next.push(value);
  }
  return next;
}
