import type { DateSegmentPart, EditableDateTimeSegmentPart } from './types.date';

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

export const DATE_TIME_EDITABLE_SEGMENT_PARTS = [
  ...DATE_SEGMENT_PARTS,
  ...TIME_SEGMENT_PARTS,
] as const;

export const NON_EDITABLE_DATE_TIME_SEGMENT_PARTS = ['literal', 'timeZoneName'] as const;

export function isDateSegmentPart(part: unknown): part is DateSegmentPart {
  return DATE_SEGMENT_PARTS.includes(part as DateSegmentPart);
}

export function isEditableSegmentPart(part: string): part is EditableDateTimeSegmentPart {
  return DATE_TIME_EDITABLE_SEGMENT_PARTS.includes(part as EditableDateTimeSegmentPart);
}
