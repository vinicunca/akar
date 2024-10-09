import { isStrictEqual } from '@vinicunca/perkakas';

/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */
export function wrapArray<T>(
  { array, startIndex }:
  { array: Array<T>; startIndex: number },
) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}

/**
 * The function `findValuesBetween` takes an array and two values, then returns a subarray containing
 * elements between the first occurrence of the start value and the first occurrence of the end value
 * in the array.
 * @param options
 * @param options.array - The `array` parameter is an array of values of type `T`.
 * @param options.start - The `start` parameter is the value that marks the beginning of the range you want
 * to find in the array.
 * @param options.end - The `end` parameter in the `findValuesBetween` function represents the end value
 * that you want to find in the array. This function will return a subarray of values that are between
 * the `start` and `end` values in the original array.
 * @returns The `findValuesBetween` function returns an array of values from the input array that are
 * between the `start` and `end` values (inclusive). If either the `start` or `end` values are not
 * found in the input array, an empty array is returned.
 */
export function findValuesBetween<T>(
  { array, start, end }:
  {
    array: Array<T>;
    end: T;
    start: T;
  },
) {
  const startIndex = array.findIndex((i) => isStrictEqual(i, start));
  const endIndex = array.findIndex((i) => isStrictEqual(i, end));

  if (startIndex === -1 || endIndex === -1) {
    return [];
  }

  const [minIndex, maxIndex] = [startIndex, endIndex].sort((a, b) => a - b);

  return array.slice(minIndex, maxIndex + 1);
}
