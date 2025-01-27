/*
  * Implementation ported from https://github.com/melt-ui/melt-ui/blob/develop/src/lib/internal/helpers/date/formatter.ts
*/

import type { DateValue, ZonedDateTime } from '@internationalized/date';
import {
  DateFormatter,

  getLocalTimeZone,
  today,

} from '@internationalized/date';
import { ref } from 'vue';

import { hasTime, isZonedDateTime, toDate } from '~~/date';

export interface DateFormatterOptions extends Intl.DateTimeFormatOptions {
  calendar?: string;
}

export interface UseDateFormatter {
  custom: (params: { date: Date; options: DateFormatterOptions }) => string;
  dayOfWeek: (params: { date: Date; length?: DateFormatterOptions['weekday'] }) => string;
  dayPeriod: (date: Date) => string;
  fullMonth: (params: { date: Date; options?: DateFormatterOptions }) => string;
  fullMonthAndYear: (params: { date: Date; options?: DateFormatterOptions }) => string;
  fullYear: (params: { date: Date; options?: DateFormatterOptions }) => string;
  getLocale: () => string;
  getMonths: () => Array<{ label: string; value: number }>;
  part: (params: { dateObj: DateValue; type: Intl.DateTimeFormatPartTypes; options?: DateFormatterOptions }) => string;
  selectedDate: (params: { date: DateValue; includeTime?: boolean }) => string;
  setLocale: (locale: string) => void;
  toParts: (params: { date: DateValue; options?: DateFormatterOptions }) => Array<Intl.DateTimeFormatPart>;
}

/**
 * Creates a wrapper around the `DateFormatter`, which is
 * an improved version of the {@link Intl.DateTimeFormat} API,
 * that is used internally by the various date builders to
 * easily format dates in a consistent way.
 *
 * @see [DateFormatter](https://react-spectrum.adobe.com/internationalized/date/DateFormatter.html)
 */
export function useDateFormatter(initialLocale: string): UseDateFormatter {
  const locale = ref(initialLocale);

  function getLocale() {
    return locale.value;
  }

  function setLocale(newLocale: string) {
    locale.value = newLocale;
  }

  function custom({ date, options }: { date: Date; options: DateFormatterOptions }) {
    return new DateFormatter(locale.value, options).format(date);
  }

  function selectedDate({ date, includeTime = true }: { date: DateValue; includeTime?: boolean }) {
    if (hasTime(date) && includeTime) {
      return custom({
        date: toDate(date),
        options: {
          dateStyle: 'long',
          timeStyle: 'long',
        },
      });
    } else {
      return custom({
        date: toDate(date),
        options: {
          dateStyle: 'long',
        },
      });
    }
  }

  function fullMonthAndYear({ date, options = {} }: { date: Date; options?: DateFormatterOptions }) {
    return new DateFormatter(
      locale.value,
      { month: 'long', year: 'numeric', ...options },
    ).format(date);
  }

  function fullMonth({ date, options = {} }: { date: Date; options?: DateFormatterOptions }) {
    return new DateFormatter(
      locale.value,
      { month: 'long', ...options },
    ).format(date);
  }

  function getMonths() {
    const defaultDate = today(getLocalTimeZone());
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return months.map((item) => ({
      label: fullMonth({
        date: toDate(defaultDate.set({ month: item })),
      }),
      value: item,
    }));
  }

  function fullYear({ date, options = {} }: { date: Date; options?: DateFormatterOptions }) {
    return new DateFormatter(
      locale.value,
      { year: 'numeric', ...options },
    ).format(date);
  }

  function toParts({ date, options }: { date: DateValue; options?: DateFormatterOptions }) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale.value, {
        ...options,
        timeZone: (date as ZonedDateTime).timeZone,
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale.value, options)
        .formatToParts(toDate(date));
    }
  }

  function dayOfWeek({ date, length = 'narrow' }: { date: Date; length?: DateFormatterOptions['weekday'] }) {
    return new DateFormatter(
      locale.value,
      { weekday: length },
    ).format(date);
  }

  function dayPeriod(date: Date) {
    const parts = new DateFormatter(locale.value, {
      hour: 'numeric',
      minute: 'numeric',
    }).formatToParts(date);

    const value = parts.find((p) => p.type === 'dayPeriod')?.value;

    if (value === 'PM') {
      return 'PM';
    }

    return 'AM';
  }

  const defaultPartOptions: DateFormatterOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  function part(
    { dateObj, options = {}, type }:
    { dateObj: DateValue; options?: DateFormatterOptions; type: Intl.DateTimeFormatPartTypes },
  ) {
    const opts = { ...defaultPartOptions, ...options };
    const parts = toParts({ date: dateObj, options: opts });
    const part = parts.find((part) => part.type === type);

    return part ? part.value : '';
  }

  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek,
    getMonths,
  };
}
