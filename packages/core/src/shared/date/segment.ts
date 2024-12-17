import { KEY_CODES } from '@vinicunca/perkakas';

export function isSegmentNavigationKey(key: string) {
  return key === KEY_CODES.ARROW_RIGHT || key === KEY_CODES.ARROW_LEFT;
}

export function isNumberString(value: string) {
  // eslint-disable-next-line sonar/prefer-single-boolean-return
  if (Number.isNaN(Number.parseInt(value))) {
    return false;
  }

  return true;
}

export function isAcceptableSegmentKey(key: string) {
  const acceptableSegmentKeys = [
    KEY_CODES.ENTER,
    KEY_CODES.ARROW_UP,
    KEY_CODES.ARROW_DOWN,
    KEY_CODES.ARROW_LEFT,
    KEY_CODES.ARROW_RIGHT,
    KEY_CODES.BACKSPACE,
    KEY_CODES.SPACE,
    'a',
    'A',
    'p',
    'P',
  ];

  if (acceptableSegmentKeys.includes(key)) {
    return true;
  }

  return isNumberString(key);
}

export function getSegmentElements(parentElement: HTMLElement): Array<Element> {
  return Array.from(
    parentElement.querySelectorAll('[data-akar-date-field-segment]'),
  ).filter(
    (item) => item.getAttribute('data-akar-date-field-segment') !== 'literal',
  );
}

export function getTimeFieldSegmentElements(parentElement: HTMLElement): Array<Element> {
  return Array.from(
    parentElement.querySelectorAll('[data-akar-time-field-segment]'),
  ).filter(
    (item) => item.getAttribute('data-akar-time-field-segment') !== 'literal',
  );
}
