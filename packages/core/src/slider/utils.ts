import type { ComputedRef } from 'vue';
import { clamp, KEY_CODES } from '@vinicunca/perkakas';
import { createContext } from '~~/shared';

export interface SliderOrientationPrivateProps {
  min: number;
  max: number;
  inverted: boolean;
}

export interface SliderOrientationPrivateEmits {
  slideEnd: [];
  slideStart: [value: number];
  slideMove: [value: number];
  homeKeyDown: [event: KeyboardEvent];
  endKeyDown: [event: KeyboardEvent];
  stepKeyDown: [event: KeyboardEvent, direction: number];
}

export function getNextSortedValues(prevValues: Array<number> = [], nextValue: number, atIndex: number) {
  const nextValues = [...prevValues];
  nextValues[atIndex] = nextValue;
  return nextValues.sort((a, b) => a - b);
}

export function convertValueToPercentage(value: number, min: number, max: number) {
  const maxSteps = max - min;
  const percentPerStep = 100 / maxSteps;
  const percentage = percentPerStep * (value - min);
  return clamp(percentage, {
    min: 0,
    max: 100,
  });
}

/**
 * Returns a label for each thumb when there are two or more thumbs
 */
export function getLabel(index: number, totalValues: number) {
  if (totalValues > 2) {
    return `Value ${index + 1} of ${totalValues}`;
  } else if (totalValues === 2) {
    return ['Minimum', 'Maximum'][index];
  } else {
    return undefined;
  }
}

/**
 * Given a `values` array and a `nextValue`, determine which value in
 * the array is closest to `nextValue` and return its index.
 *
 * @example
 * // returns 1
 * getClosestValueIndex([10, 30], 25);
 */
export function getClosestValueIndex(values: Array<number>, nextValue: number) {
  if (values.length === 1) {
    return 0;
  }
  const distances = values.map((value) => Math.abs(value - nextValue));
  const closestDistance = Math.min(...distances);
  return distances.indexOf(closestDistance);
}

/**
 * Offsets the thumb centre point while sliding to ensure it remains
 * within the bounds of the slider when reaching the edges
 */
export function getThumbInBoundsOffset(width: number, left: number, direction: number) {
  const halfWidth = width / 2;
  const halfPercent = 50;
  const offset = linearScale([0, halfPercent], [0, halfWidth]);
  return (halfWidth - offset(left) * direction) * direction;
}

/**
 * Gets an array of steps between each value.
 *
 * @example
 * // returns [1, 9]
 * getStepsBetweenValues([10, 11, 20]);
 */
export function getStepsBetweenValues(values: Array<number>) {
  return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}

/**
 * Verifies the minimum steps between all values is greater than or equal
 * to the expected minimum steps.
 *
 * @example
 * // returns false
 * hasMinStepsBetweenValues([1,2,3], 2);
 *
 * @example
 * // returns true
 * hasMinStepsBetweenValues([1,2,3], 1);
 */
export function hasMinStepsBetweenValues(values: Array<number>, minStepsBetweenValues: number) {
  if (minStepsBetweenValues > 0) {
    const stepsBetweenValues = getStepsBetweenValues(values);
    const actualMinStepsBetweenValues = Math.min(...stepsBetweenValues);
    return actualMinStepsBetweenValues >= minStepsBetweenValues;
  }
  return true;
}

// https://github.com/tmcw-up-for-adoption/simple-linear-scale/blob/master/index.js
export function linearScale(input: readonly [number, number], output: readonly [number, number]) {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1]) {
      return output[0];
    }
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}

export function getDecimalCount(value: number) {
  return (String(value).split('.')[1] || '').length;
}

export function roundValue(value: number, decimalCount: number) {
  const rounder = 10 ** decimalCount;
  return Math.round(value * rounder) / rounder;
}

export type Direction = 'ltr' | 'rtl';

export const PAGE_KEYS = [
  KEY_CODES.PAGE_UP,
  KEY_CODES.PAGE_DOWN,
];

export const ARROW_KEYS = [
  KEY_CODES.ARROW_UP,
  KEY_CODES.ARROW_DOWN,
  KEY_CODES.ARROW_LEFT,
  KEY_CODES.ARROW_RIGHT,
];

type SlideDirection = 'from-bottom' | 'from-left' | 'from-right' | 'from-top';
export const BACK_KEYS: Record<SlideDirection, Array<string>> = {
  'from-left': [KEY_CODES.HOME, KEY_CODES.PAGE_DOWN, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_LEFT],
  'from-right': [KEY_CODES.HOME, KEY_CODES.PAGE_DOWN, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_RIGHT],
  'from-bottom': [KEY_CODES.HOME, KEY_CODES.PAGE_DOWN, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_LEFT],
  'from-top': [KEY_CODES.HOME, KEY_CODES.PAGE_UP, KEY_CODES.ARROW_UP, KEY_CODES.ARROW_LEFT],
};

type Side = 'bottom' | 'left' | 'right' | 'top';
interface SliderOrientation {
  startEdge: ComputedRef<Side>;
  endEdge: ComputedRef<Side>;
  direction: ComputedRef<1 | -1>;
  size: 'height' | 'width';
}

export const [injectSliderOrientationContext, provideSliderOrientationContext]
  = createContext<SliderOrientation>(['SliderVertical', 'SliderHorizontal']);
