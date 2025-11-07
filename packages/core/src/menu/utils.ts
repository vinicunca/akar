import { KEY_CODES } from '@vinicunca/perkakas';
import { getActiveElement } from '../shared';

export type CheckedState = 'indeterminate' | boolean;
export type Direction = 'ltr' | 'rtl';

export const ITEM_NAME = 'AMenuItem';
export const ITEM_SELECT = 'menu.itemSelect';
export const SELECTION_KEYS = [KEY_CODES.ENTER, ' '];
export const FIRST_KEYS = [KEY_CODES.ARROW_DOWN, KEY_CODES.PAGE_UP, KEY_CODES.HOME];
export const LAST_KEYS = [KEY_CODES.ARROW_UP, KEY_CODES.PAGE_DOWN, KEY_CODES.END];
export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
export const SUB_OPEN_KEYS: Record<Direction, Array<string>> = {
  ltr: [...SELECTION_KEYS, KEY_CODES.ARROW_RIGHT],
  rtl: [...SELECTION_KEYS, KEY_CODES.ARROW_LEFT],
};
export const SUB_CLOSE_KEYS: Record<Direction, Array<string>> = {
  ltr: [KEY_CODES.ARROW_LEFT],
  rtl: [KEY_CODES.ARROW_RIGHT],
};

export function getOpenState(open: boolean) {
  return open ? 'open' : 'closed';
}

export function isIndeterminate(
  checked?: CheckedState,
): checked is 'indeterminate' {
  return checked === 'indeterminate';
}

export function getCheckedState(checked: CheckedState) {
  if (isIndeterminate(checked)) {
    return 'indeterminate';
  } else {
    return checked ? 'checked' : 'unchecked';
  }
}

export function focusFirst(candidates: Array<HTMLElement>) {
  const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
  for (const candidate of candidates) {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) {
      return;
    }
    candidate.focus();
    if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) {
      return;
    }
  }
}

export interface Point {
  x: number;
  y: number;
}
export type Polygon = Array<Point>;
export type Side = 'left' | 'right';
export interface GraceIntent {
  area: Polygon;
  side: Side;
}

// Determine if a point is inside of a polygon.
// Based on https://github.com/substack/point-in-polygon
export function isPointInPolygon(point: Point, polygon: Polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

export function isPointerInGraceArea(event: PointerEvent, area?: Polygon) {
  if (!area) {
    return false;
  }
  const cursorPos = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursorPos, area);
}

export function isMouseEvent(event: PointerEvent) {
  return event.pointerType === 'mouse';
}
