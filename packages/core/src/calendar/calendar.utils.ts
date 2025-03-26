export const SELECTOR
   = '[data-akar-calendar-cell-trigger]:not([data-outside-view]):not([data-outside-visible-view])';

export function getSelectableCells(calendar: HTMLElement): Array<HTMLElement> {
  return Array.from(calendar.querySelectorAll(SELECTOR)) ?? [];
}
