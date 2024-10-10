/**
 Implementation ported from https://github.com/melt-ui/melt-ui/blob/develop/src/lib/internal/helpers/date/utils.ts
 */

import {
  CalendarDate,
  CalendarDateTime,
  type DateValue,
  getLocalTimeZone,
  ZonedDateTime,
} from '@internationalized/date';

export type DateTimeGranularity = 'day' | 'hour' | 'minute' | 'second';

/**
 * Determine if a date is before the reference date.
 * @param params
 * @param params.dateToCompare - is this date before the `referenceDate`
 * @param params.referenceDate - is the `dateToCompare` before this date
 *
 * @see {@link isDateBeforeOrSame} for inclusive
 */
export function isDateBefore(
  { dateToCompare, referenceDate }:
  { dateToCompare: DateValue; referenceDate: DateValue },
) {
  return dateToCompare.compare(referenceDate) < 0;
}

export function isZonedDateTime(dateValue: DateValue): dateValue is ZonedDateTime {
  return dateValue instanceof ZonedDateTime;
}

/**
 * Given a `DateValue` object, convert it to a native `Date` object.
 * If a timezone is provided, the date will be converted to that timezone.
 * If no timezone is provided, the date will be converted to the local timezone.
 */
export function toDate(
  dateValue: DateValue,
  tz: string = getLocalTimeZone(),
) {
  if (isZonedDateTime(dateValue)) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}

export function hasTime(dateValue: DateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}

export function isCalendarDateTime(dateValue: DateValue): dateValue is CalendarDateTime {
  return dateValue instanceof CalendarDateTime;
}

/**
 * Given a date, return the number of days in the month.
 */
export function getDaysInMonth(date: Date | DateValue) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    /**
     * By using zero as the day, we get the
     * last day of the previous month, which
     * is the month we originally passed in.
     */
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}

interface GetDefaultDateProps {
  defaultPlaceholder?: DateValue | undefined;
  defaultValue?: Array<DateValue> | DateValue | undefined;
  granularity?: DateTimeGranularity;
}

/**
 * A helper function used throughout the various date builders
 * to generate a default `DateValue` using the `defaultValue`,
 * `defaultPlaceholder`, and `granularity` props.
 *
 * It's important to match the `DateValue` type being used
 * elsewhere in the builder, so they behave according to the
 * behavior the user expects based on the props they've provided.
 */
export function getDefaultDate(props: GetDefaultDateProps): DateValue {
  const { defaultValue, defaultPlaceholder, granularity = 'day' } = props;

  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue.at(-1)!.copy();
  }

  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue.copy();
  }

  if (defaultPlaceholder) {
    return defaultPlaceholder.copy();
  }

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const calendarDateTimeGranularities = ['hour', 'minute', 'second'];

  if (calendarDateTimeGranularities.includes(granularity ?? 'day')) {
    return new CalendarDateTime(year, month, day, 0, 0, 0);
  }

  return new CalendarDate(year, month, day);
}
