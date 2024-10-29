import type { DateSegmentPart, DateTimeSegmentPart, EditableDateTimeSegmentPart, TimeSegmentPart } from './types.date';

export const DATE_SEGMENT_PARTS = [
  'day',
  'month',
  'year',
] as const;

export const TIME_SEGMENT_PARTS = [
  'hour',
  'minute',
  'second',
  'dayPeriod',
] as const;

export const NON_EDITABLE_DATE_TIME_SEGMENT_PARTS = ['literal', 'timeZoneName'] as const;

export const EDITABLE_DATE_TIME_SEGMENT_PARTS = [
  ...DATE_SEGMENT_PARTS,
  ...TIME_SEGMENT_PARTS,
] as const;

export const EDITABLE_TIME_SEGMENT_PARTS = [...TIME_SEGMENT_PARTS] as const;

export const ALL_DATE_TIME_SEGMENT_PARTS = [
  ...EDITABLE_DATE_TIME_SEGMENT_PARTS,
  ...NON_EDITABLE_DATE_TIME_SEGMENT_PARTS,
] as const;

export const ALL_EXCEPT_LITERAL_PARTS = ALL_DATE_TIME_SEGMENT_PARTS.filter((part) => part !== 'literal');

export function isDateSegmentPart(part: unknown): part is DateSegmentPart {
  return DATE_SEGMENT_PARTS.includes(part as DateSegmentPart);
}
export function isTimeSegmentPart(part: unknown): part is TimeSegmentPart {
  return TIME_SEGMENT_PARTS.includes(part as TimeSegmentPart);
}

export function isEditableSegmentPart(part: string): part is EditableDateTimeSegmentPart {
  return EDITABLE_DATE_TIME_SEGMENT_PARTS.includes(part as EditableDateTimeSegmentPart);
}

export function isAnySegmentPart(part: unknown): part is DateTimeSegmentPart {
  return ALL_DATE_TIME_SEGMENT_PARTS.includes(part as EditableDateTimeSegmentPart);
}
