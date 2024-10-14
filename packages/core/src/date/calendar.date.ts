import { type DateValue, endOfMonth, startOfMonth } from '@internationalized/date';
import { chunk } from '@vinicunca/perkakas';

import type { DateGrid } from './types.date';

import { getDaysInMonth, getLastFirstDayOfWeek, getNextLastDayOfWeek } from './comparators.date';

export type WeekDayFormat = 'long' | 'narrow' | 'short';

export interface CreateMonthProps {
  /**
   * The date object representing the month's date (usually the first day of the month).
   */
  dateObj: DateValue;

  /**
   * Whether to always render 6 weeks in the calendar, even if the month doesn't
   * span 6 weeks.
   */
  fixedWeeks: boolean;

  /**
   * The locale to use when creating the calendar month.
   */
  locale: string;

  /**
   * The day of the week to start the calendar on (0 for Sunday, 1 for Monday, etc.).
   */
  weekStartsOn: number;
};

export function createMonth(props: CreateMonthProps): DateGrid<DateValue> {
  const {
    dateObj,
    weekStartsOn,
    fixedWeeks,
    locale,
  } = props;

  const daysInMonth = getDaysInMonth(dateObj);

  const datesArray = Array.from(
    { length: daysInMonth },
    (_, idx) => dateObj.set({ day: idx + 1 }),
  );

  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);

  const lastSunday = getLastFirstDayOfWeek({
    date: firstDayOfMonth,
    firstDayOfWeek: weekStartsOn,
    locale,
  });

  const nextSaturday = getNextLastDayOfWeek({
    date: lastDayOfMonth,
    firstDayOfWeek: weekStartsOn,
    locale,
  });

  const lastMonthDays = getDaysBetween(
    lastSunday.subtract({ days: 1 }),
    firstDayOfMonth,
  );

  const nextMonthDays = getDaysBetween(
    lastDayOfMonth,
    nextSaturday.add({ days: 1 }),
  );

  const totalDays = lastMonthDays.length
    + datesArray.length
    + nextMonthDays.length;

  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;

    let startFrom = nextMonthDays[nextMonthDays.length - 1];

    if (!startFrom) {
      startFrom = endOfMonth(dateObj);
    }

    const extraDaysArray = Array.from({ length: extraDays }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });

    nextMonthDays.push(...extraDaysArray);
  }

  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);

  const weeks = chunk(allDays, 7);

  return {
    value: dateObj,
    cells: allDays,
    rows: weeks,
  };
};

/**
 * Retrieves an array of date values representing the days between
 * the provided start and end dates.
 */
export function getDaysBetween(start: DateValue, end: DateValue) {
  const days: Array<DateValue> = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;

  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }

  return days;
}

type SetMonthProps = {
  currentMonths?: Array<DateGrid<DateValue>>;
  numberOfMonths: number | undefined;
} & CreateMonthProps;

export function createMonths(props: SetMonthProps) {
  const { numberOfMonths, dateObj, ...monthProps } = props;

  const months: Array<DateGrid<DateValue>> = [];

  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(
      createMonth({
        ...monthProps,
        dateObj,
      }),
    );
    return months;
  }

  months.push(
    createMonth({
      ...monthProps,
      dateObj,
    }),
  );

  // Create all the months, starting with the current month
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(
      createMonth({
        ...monthProps,
        dateObj: nextMonth,
      }),
    );
  }

  return months;
}