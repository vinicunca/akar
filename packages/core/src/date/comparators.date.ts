import type { DateMatcher } from './types.date';
import {
  CalendarDateTime,
  type DateValue,
  getDayOfWeek,
  getLocalTimeZone,
  parseDate,
  parseDateTime,
  parseZonedDateTime,
  toCalendar,
  ZonedDateTime,
} from '@internationalized/date';

/**
 * Given a date string and a reference `DateValue` object, parse the
 * string to the same type as the reference object.
 *
 * Useful for parsing strings from data attributes, which are always
 * strings, to the same type being used by the date component.
 */
export function parseStringToDateValue(dateStr: string, referenceVal: DateValue): DateValue {
  let dateValue: DateValue;
  if (isZonedDateTime(referenceVal)) {
    dateValue = parseZonedDateTime(dateStr);
  } else if (isCalendarDateTime(referenceVal)) {
    dateValue = parseDateTime(dateStr);
  } else {
    dateValue = parseDate(dateStr);
  }

  return dateValue.calendar !== referenceVal.calendar
    ? toCalendar(dateValue, referenceVal.calendar)
    : dateValue;
}

/**
 * Given a `DateValue` object, convert it to a native `Date` object.
 * If a timezone is provided, the date will be converted to that timezone.
 * If no timezone is provided, the date will be converted to the local timezone.
 */
export function toDate(dateValue: DateValue, tz: string = getLocalTimeZone()) {
  if (isZonedDateTime(dateValue)) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}

export function isCalendarDateTime(dateValue: DateValue): dateValue is CalendarDateTime {
  return dateValue instanceof CalendarDateTime;
}

export function isZonedDateTime(dateValue: DateValue): dateValue is ZonedDateTime {
  return dateValue instanceof ZonedDateTime;
}

export function hasTime(dateValue: DateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
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

/**
 * Determine if a date is before the reference date.
 * @param dateToCompare - is this date before the `referenceDate`
 * @param referenceDate - is the `dateToCompare` before this date
 *
 * @see {@link isBeforeOrSame} for inclusive
 */
export function isDateBefore(dateToCompare: DateValue, referenceDate: DateValue) {
  return dateToCompare.compare(referenceDate) < 0;
}

/**
 * Determine if a date is after the reference date.
 * @param dateToCompare - is this date after the `referenceDate`
 * @param referenceDate - is the `dateToCompare` after this date
 *
 * @see {@link isAfterOrSame} for inclusive
 */
export function isDateAfter(dateToCompare: DateValue, referenceDate: DateValue) {
  return dateToCompare.compare(referenceDate) > 0;
}

/**
 * Determine if a date is before or the same as the reference date.
 *
 * @param dateToCompare - the date to compare
 * @param referenceDate - the reference date to make the comparison against
 *
 * @see {@link isBefore} for non-inclusive
 */
export function isDateBeforeOrSame(dateToCompare: DateValue, referenceDate: DateValue) {
  return dateToCompare.compare(referenceDate) <= 0;
}

/**
 * Determine if a date is after or the same as the reference date.
 *
 * @param dateToCompare - is this date after or the same as the `referenceDate`
 * @param referenceDate - is the `dateToCompare` after or the same as this date
 *
 * @see {@link isAfter} for non-inclusive
 */
export function isDateAfterOrSame(dateToCompare: DateValue, referenceDate: DateValue) {
  return dateToCompare.compare(referenceDate) >= 0;
}

/**
 * Determine if a date is inclusively between a start and end reference date.
 *
 * @param params
 * @param params.date - is this date inclusively between the `start` and `end` dates
 * @param params.start - the start reference date to make the comparison against
 * @param params.end - the end reference date to make the comparison against
 *
 * @see {@link isDateBetween} for non-inclusive
 */
export function isDateBetweenInclusive(
  { date, start, end }:
  {
    date: DateValue;
    end: DateValue;
    start: DateValue;
  },
) {
  return isDateAfterOrSame(date, start) && isDateBeforeOrSame(date, end);
}

/**
 * Determine if a date is between a start and end reference date.
 *
 * @param params
 * @param params.date - is this date between the `start` and `end` dates
 * @param params.start - the start reference date to make the comparison against
 * @param params.end - the end reference date to make the comparison against
 *
 * @see {@link isDateBetweenInclusive} for inclusive
 */
export function isDateBetween(
  { date, start, end }:
  {
    date: DateValue;
    end: DateValue;
    start: DateValue;
  },
) {
  return isDateAfter(date, start) && isDateBefore(date, end);
}

interface DayOfWeekParams<T> {
  date: T;
  firstDayOfWeek: number;
  locale: string;
};

export function getLastFirstDayOfWeek<T extends DateValue = DateValue>(
  { date, firstDayOfWeek, locale }:
  DayOfWeekParams<T>,
): T {
  const day = getDayOfWeek(date, locale);

  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek }) as T;
  }

  if (firstDayOfWeek === day) {
    return date as T;
  }

  return date.subtract({ days: day - firstDayOfWeek }) as T;
}

export function getNextLastDayOfWeek<T extends DateValue = DateValue>(
  { date, firstDayOfWeek, locale }:
  DayOfWeekParams<T>,
): T {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  if (day === lastDayOfWeek) {
    return date as T;
  }

  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek }) as T;
  }

  return date.add({ days: lastDayOfWeek - day }) as T;
}

export function areAllDaysBetweenValid(
  { start, end, isUnavailable, isDisabled }:
  {
    end: DateValue;
    isDisabled?: DateMatcher;
    isUnavailable?: DateMatcher;
    start: DateValue;
  },
) {
  if (isUnavailable === undefined && isDisabled === undefined) {
    return true;
  }

  let dCurrent = start.add({ days: 1 });
  if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
    return false;
  }

  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    dCurrent = dCurrent.add({ days: 1 });
    if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
      return false;
    }
  }
  return true;
}
