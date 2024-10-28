import { isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';

export type Orientation = 'horizontal' | 'vertical';
export type Direction = 'ltr' | 'rtl';

export const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus';
export const EVENT_OPTIONS = { bubbles: false, cancelable: true };

type FocusIntent = 'first' | 'last' | 'next' | 'prev';

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

export function getDirectionAwareKey(
  { dir, key }:
  {
    dir?: Direction;
    key: string;
  },
) {
  if (dir !== 'rtl') {
    return key;
  }

  if (key === KEY_CODES.ARROW_LEFT) {
    return KEY_CODES.ARROW_RIGHT;
  } else if (key === KEY_CODES.ARROW_RIGHT) {
    return KEY_CODES.ARROW_LEFT;
  } else {
    return key;
  }
}

export function getFocusIntent(
  { dir, event, orientation }:
  {
    dir?: Direction;
    event: KeyboardEvent;
    orientation?: Orientation;
  },
) {
  const key = getDirectionAwareKey({
    key: event.key,
    dir,
  });

  if (
    orientation === 'vertical'
    && isIncludedIn(key, [KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT])
  ) {
    return undefined;
  }

  if (
    orientation === 'horizontal'
    && isIncludedIn(key, [KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_UP])
  ) {
    return undefined;
  }

  return MAP_KEY_TO_FOCUS_INTENT[key];
}

export function focusFirst(
  { candidates, preventScroll = false, rootNode }:
  { candidates: Array<HTMLElement>; preventScroll?: boolean; rootNode?: Document | ShadowRoot },
) {
  const PREVIOUSLY_FOCUSED_ELEMENT = rootNode?.activeElement ?? document.activeElement;

  for (const candidate of candidates) {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) {
      return;
    }

    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) {
      return;
    }
  }
}
