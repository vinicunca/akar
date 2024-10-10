import { KEY_CODES } from '@vinicunca/perkakas';

export function isSegmentNavigationKey(key: string) {
  return key === KEY_CODES.ARROW_RIGHT || key === KEY_CODES.ARROW_LEFT;
}

export function getDateSegmentElements(parentElement: HTMLElement): Array<Element> {
  return Array
    .from(parentElement.querySelectorAll('[data-akar-date-field-segment]'))
    .filter((item) => item.getAttribute('data-akar-date-field-segment') !== 'literal');
}
