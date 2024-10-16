import { PRECISION } from './constants';

export function fuzzyCompareNumbers(
  { actual, expected, fractionDigits = PRECISION }:
  {
    actual: number;
    expected: number;
    fractionDigits?: number;
  },
): number {
  actual = Number.parseFloat(actual.toFixed(fractionDigits));
  expected = Number.parseFloat(expected.toFixed(fractionDigits));

  const delta = actual - expected;
  if (delta === 0) {
    return 0;
  } else {
    return delta > 0 ? 1 : -1;
  }
}

export function fuzzyNumbersEqual(
  { actual, expected, fractionDigits }:
  { actual: number; expected: number; fractionDigits?: number },
): boolean {
  return fuzzyCompareNumbers({ actual, expected, fractionDigits }) === 0;
}
