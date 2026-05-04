import { clamp, KEY_CODES } from '@vinicunca/perkakas';

export const PAGE_KEYS = [KEY_CODES.PAGE_UP, KEY_CODES.PAGE_DOWN];
export const ARROW_KEYS = [KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT];

export type SlideDirection = 'from-left' | 'from-right' | 'from-bottom' | 'from-top';

export const BACK_KEYS: Record<SlideDirection, Array<string>> = {
  'from-left': [KEY_CODES.HOME, KEY_CODES.PAGE_DOWN, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_LEFT],
  'from-right': [KEY_CODES.HOME, KEY_CODES.PAGE_DOWN, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_RIGHT],
  'from-bottom': [KEY_CODES.HOME, KEY_CODES.PAGE_DOWN, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_LEFT],
  'from-top': [KEY_CODES.HOME, KEY_CODES.PAGE_UP, KEY_CODES.ARROW_UP, KEY_CODES.ARROW_LEFT],
};

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

export function convertValueToPercentage(value: number, min: number, max: number) {
  if (max === min) {
    return 0;
  }
  const maxSteps = max - min;
  const percentPerStep = 100 / maxSteps;
  const percentage = percentPerStep * (value - min);
  return clamp(percentage, { min: 0, max: 100 });
}

export function getThumbPosition(percentage: number, orientation: 'horizontal' | 'vertical'): string {
  if (orientation === 'horizontal') {
    return `calc(${percentage}% - var(--akar-slider-thumb-size, 16px) / 2)`;
  }
  return `calc(${100 - percentage}% - var(--akar-slider-thumb-size, 16px) / 2)`;
}
