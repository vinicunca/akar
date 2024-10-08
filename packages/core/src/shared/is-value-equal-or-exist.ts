import { isDeepEqual, isNullish } from '@vinicunca/perkakas';

type Params<T> = Array<T> | T | undefined;

/**
 * The function `isValueEqualOrExist` checks if a value is equal to or exists in another value or
 * array.
 * @param base - It represents the base value that you want to compare with the `current` value.
 * @param current - The `current` parameter represents the current value that you want to compare with the `base` value or values.
 * @returns The `isValueEqualOrExist` function returns a boolean value. It checks if the `base` value
 * is equal to the `current` value or if the `current` value exists within the `base` value. The
 * function handles cases where `base` can be a single value, an array of values, or undefined.
 */
export function isValueEqualOrExist<T>(base: Params<T>, current: Params<T>) {
  if (isNullish(base)) {
    return false;
  }
  if (Array.isArray(base)) {
    // @ts-expect-error Typed array is not supported yet
    return base.some((val) => isDeepEqual(val, current));
  } else {
    // @ts-expect-error Typed array is not supported yet
    return isDeepEqual(base, current);
  }
}
