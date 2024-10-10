/*
  * Implementation ported from https://github.com/melt-ui/melt-ui/blob/develop/src/lib/internal/helpers/date/types.ts
*/

import type { DateValue } from '@internationalized/date';

import type {
  DATE_SEGMENT_PARTS,
  DATE_TIME_EDITABLE_SEGMENT_PARTS,
  NON_EDITABLE_DATE_TIME_SEGMENT_PARTS,
  TIME_SEGMENT_PARTS,
} from './parts.date';

export type DateMatcher = (date: DateValue) => boolean;

export type DateSegmentPart = (typeof DATE_SEGMENT_PARTS)[number];
export type TimeSegmentPart = (typeof TIME_SEGMENT_PARTS)[number];
export type EditableDateTimeSegmentPart = (typeof DATE_TIME_EDITABLE_SEGMENT_PARTS)[number];
export type NonEditableDateTimeSegmentPart = (typeof NON_EDITABLE_DATE_TIME_SEGMENT_PARTS)[number];
export type DateTimeSegmentPart = EditableDateTimeSegmentPart | NonEditableDateTimeSegmentPart;

export type DayPeriod = 'AM' | 'PM' | null;
export type DateSegmentObj = {
  [K in DateSegmentPart]: null | number;
};
export type TimeSegmentObj = {
  [K in TimeSegmentPart]: K extends 'dayPeriod' ? DayPeriod : null | number;
};
export type DateAndTimeSegmentObj = DateSegmentObj & TimeSegmentObj;
export type DateTimeSegmentValueObj = DateAndTimeSegmentObj | DateSegmentObj;
export type DateTimeSegmentContentObj = Record<EditableDateTimeSegmentPart, string>;

export type HourCycle = 12 | 24 | undefined;

export interface DateRange {
  end: DateValue | undefined;
  start: DateValue | undefined;
};

export type DateSegmentExceptLiteral = Exclude<DateSegmentPart, 'literal'>;
