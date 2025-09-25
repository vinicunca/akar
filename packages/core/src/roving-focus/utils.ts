import { isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';
import { getActiveElement } from '~~/shared';

export type Orientation = 'horizontal' | 'vertical';
export type Direction = 'ltr' | 'rtl';

export const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus';
export const EVENT_OPTIONS = { bubbles: false, cancelable: true };

export const MAP_KEY_TO_FOCUS_INTENT: Record<string, FocusIntent> = {
  [KEY_CODES.ARROW_LEFT]: 'prev',
  [KEY_CODES.ARROW_UP]: 'prev',
  [KEY_CODES.ARROW_RIGHT]: 'next',
  [KEY_CODES.ARROW_DOWN]: 'next',
  [KEY_CODES.PAGE_UP]: 'first',
  [KEY_CODES.HOME]: 'first',
  [KEY_CODES.PAGE_DOWN]: 'last',
  [KEY_CODES.END]: 'last',
};

export function getDirectionAwareKey(key: string, dir?: Direction) {
  if (dir !== 'rtl') {
    return key;
  }

  if (key === KEY_CODES.ARROW_LEFT) {
    return KEY_CODES.ARROW_RIGHT;
  }

  if (key === KEY_CODES.ARROW_RIGHT) {
    return KEY_CODES.ARROW_LEFT;
  }

  return key;
}

type FocusIntent = 'first' | 'last' | 'prev' | 'next';

export function getFocusIntent(
  event: KeyboardEvent,
  orientation?: Orientation,
  dir?: Direction,
) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === 'vertical' && isIncludedIn(key, [KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT])) {
    return undefined;
  }
  if (orientation === 'horizontal' && isIncludedIn(key, [KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN])) {
    return undefined;
  }
  return MAP_KEY_TO_FOCUS_INTENT[key];
}

// TODO: refactor to use object params
export function focusFirst(candidates: Array<HTMLElement>, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
  for (const candidate of candidates) {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) {
      return;
    }

    candidate.focus({ preventScroll });

    if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) {
      return;
    }
  }
}

/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */
export function wrapArray<T>(array: Array<T>, startIndex: number) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
