/*
  * Implementation ported from https://github.com/melt-ui/melt-ui/blob/develop/src/lib/internal/helpers/date/types.ts
*/

import type { DateValue } from '@internationalized/date';

import type {
  DATE_SEGMENT_PARTS,
  EDITABLE_DATE_TIME_SEGMENT_PARTS,
  NON_EDITABLE_DATE_TIME_SEGMENT_PARTS,
  TIME_SEGMENT_PARTS,
} from './parts.date';

export type DateMatcher = (date: DateValue) => boolean;

export type DateSegmentPart = (typeof DATE_SEGMENT_PARTS)[number];
export type TimeSegmentPart = (typeof TIME_SEGMENT_PARTS)[number];
export type EditableDateTimeSegmentPart = (typeof EDITABLE_DATE_TIME_SEGMENT_PARTS)[number];
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

export interface DateGrid<T> {
  /**
   * An array of all the dates in the current month, including dates from
   * the previous and next months that are used to fill out the calendar grid.
   * This array is useful for rendering the calendar grid in a customizable way,
   * as it provides all the dates that should be displayed in the grid in a flat
   * array.
   */
  cells: Array<T>;

  /**
   * An array of arrays representing the weeks in the calendar.
   * Each sub-array represents a week, and contains the dates for each
   * day in that week. This structure is useful for rendering the calendar
   * grid using a table, where each row represents a week and each cell
   * represents a day.
   */
  rows: Array<Array<T>>;

  /**
   * A `DateValue` used to represent the month. Since days
   * from the previous and next months may be included in the
   * calendar grid, we need a source of truth for the value
   * the grid is representing.
   */
  value: DateValue;
};
