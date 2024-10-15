/*
  * Adapted from https://github.com/melt-ui/melt-ui/blob/develop/src/lib/builders/calendar/create.ts
*/

import { type DateFields, type DateValue, isEqualMonth, isSameDay } from '@internationalized/date';
import { computed, ref, type Ref, watch } from 'vue';

import {
  createMonths,
  type DateFormatterOptions,
  type DateGrid,
  type DateMatcher,
  getDaysInMonth,
  isDateAfter,
  isDateBefore,
  toDate,
  useDateFormatter,
  type WeekDayFormat,
} from '~~/date';

export interface UseCalendarProps {
  calendarLabel: Ref<string | undefined>;
  disabled: Ref<boolean>;
  fixedWeeks: Ref<boolean>;
  isDateDisabled?: DateMatcher;
  isDateUnavailable?: DateMatcher;
  locale: Ref<string>;
  maxValue: Ref<DateValue | undefined>;
  minValue: Ref<DateValue | undefined>;
  nextPage: Ref<((placeholder: DateValue) => DateValue) | undefined>;
  numberOfMonths: Ref<number>;
  pagedNavigation: Ref<boolean>;
  placeholder: Ref<DateValue>;
  prevPage: Ref<((placeholder: DateValue) => DateValue) | undefined>;
  weekdayFormat: Ref<WeekDayFormat>;
  weekStartsOn: Ref<0 | 1 | 2 | 3 | 4 | 5 | 6>;
};

export interface UseCalendarStateProps {
  date: Ref<Array<DateValue> | DateValue | undefined>;
  isDateDisabled: DateMatcher;
  isDateUnavailable: DateMatcher;
}

export function useCalendarState(props: UseCalendarStateProps) {
  function isDateSelected(dateObj: DateValue) {
    if (Array.isArray(props.date.value)) {
      return props.date.value.some((date) => isSameDay(date, dateObj));
    }

    if (!props.date.value) {
      return false;
    }

    return isSameDay(props.date.value, dateObj);
  }

  const isInvalid = computed(() => {
    if (Array.isArray(props.date.value)) {
      if (!props.date.value.length) {
        return false;
      }

      for (const dateObj of props.date.value) {
        if (props.isDateDisabled?.(dateObj)) {
          return true;
        }

        if (props.isDateUnavailable?.(dateObj)) {
          return true;
        }
      }
    } else {
      if (!props.date.value) {
        return false;
      }

      if (props.isDateDisabled?.(props.date.value)) {
        return true;
      }

      if (props.isDateUnavailable?.(props.date.value)) {
        return true;
      }
    }

    return false;
  });

  return {
    isDateSelected,
    isInvalid,
  };
}

export function useCalendar(props: UseCalendarProps) {
  const formatter = useDateFormatter(props.locale.value);

  const headingFormatOptions = computed(() => {
    const options: DateFormatterOptions = {
      calendar: props.placeholder.value.calendar.identifier,
    };

    if (
      props.placeholder.value.calendar.identifier === 'gregory'
      && props.placeholder.value.era === 'BC'
    ) {
      options.era = 'short';
    }

    return options;
  });

  const grid = ref<Array<DateGrid<DateValue>>>(
    createMonths({
      dateObj: props.placeholder.value,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value,
    }),
  ) as Ref<Array<DateGrid<DateValue>>>;

  const visibleView = computed(() => {
    return grid.value.map((month) => month.value);
  });

  function isOutsideVisibleView(date: DateValue) {
    return !visibleView.value.some((month) => isEqualMonth(date, month));
  }

  function isNextButtonDisabled(
    nextPageFunc?: (date: DateValue) => DateValue,
  ): boolean {
    if (!props.maxValue.value || !grid.value.length) {
      return false;
    }
    if (props.disabled.value) {
      return true;
    }

    const lastPeriodInView = grid.value[grid.value.length - 1].value;

    if (!nextPageFunc && !props.nextPage.value) {
      const firstPeriodOfNextPage = lastPeriodInView.add({ months: 1 }).set({ day: 1 });

      return isDateAfter(firstPeriodOfNextPage, props.maxValue.value);
    }

    const firstPeriodOfNextPage = handleNextDisabled({
      lastPeriodInView,
      nextPageFunc: nextPageFunc || props.nextPage.value!,
    });

    return isDateAfter(firstPeriodOfNextPage, props.maxValue.value);
  };

  function isPrevButtonDisabled(
    prevPageFunc?: (date: DateValue) => DateValue,
  ): boolean {
    if (!props.minValue.value || !grid.value.length) {
      return false;
    }

    if (props.disabled.value) {
      return true;
    }

    const firstPeriodInView = grid.value[0].value;

    if (!prevPageFunc && !props.prevPage.value) {
      const lastPeriodOfPrevPage = firstPeriodInView.subtract({ months: 1 }).set({ day: 35 });
      return isDateBefore(lastPeriodOfPrevPage, props.minValue.value);
    }

    const lastPeriodOfPrevPage = handlePrevDisabled({
      firstPeriodInView,
      prevPageFunc: prevPageFunc || props.prevPage.value!,
    });

    return isDateBefore(lastPeriodOfPrevPage, props.minValue.value);
  };

  function isDateDisabled(dateObj: DateValue) {
    if (props.isDateDisabled?.(dateObj) || props.disabled.value) {
      return true;
    }

    if (props.maxValue.value
      && isDateAfter(dateObj, props.maxValue.value)) {
      return true;
    }

    return Boolean(
      props.minValue.value
      && isDateBefore(dateObj, props.minValue.value),
    );
  }

  function isDateUnavailable(date: DateValue) {
    return Boolean(props.isDateUnavailable?.(date));
  }

  const weekdays = computed(() => {
    if (!grid.value.length) {
      return [];
    }

    return grid.value[0].rows[0].map((date) => {
      return formatter.dayOfWeek({
        date: toDate(date),
        length: props.weekdayFormat.value,
      });
    });
  });

  function nextPage(
    nextPageFunc?: (date: DateValue) => DateValue,
  ) {
    const firstDate = grid.value[0].value;

    if (!nextPageFunc && !props.nextPage.value) {
      const newDate = firstDate.add({
        months: props.pagedNavigation.value
          ? props.numberOfMonths.value
          : 1,
      });

      const newGrid = createMonths({
        dateObj: newDate,
        weekStartsOn: props.weekStartsOn.value,
        locale: props.locale.value,
        fixedWeeks: props.fixedWeeks.value,
        numberOfMonths: props.numberOfMonths.value,
      });

      grid.value = newGrid;

      props.placeholder.value = newGrid[0].value.set({ day: 1 });

      return;
    }

    const newDate = handleNextPage({
      date: firstDate,
      nextPageFunc: nextPageFunc || props.nextPage.value!,
    });

    const newGrid = createMonths({
      dateObj: newDate,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value,
    });

    grid.value = newGrid;

    const duration: DateFields = {};

    // Do not adjust the placeholder if the nextPageFunc is defined (overwrite)
    if (!nextPageFunc) {
      const diff = newGrid[0].value.compare(firstDate);
      if (diff >= getDaysInMonth(firstDate)) {
        duration.day = 1;
      }

      if (diff >= 365) {
        duration.month = 1;
      }
    }

    props.placeholder.value = newGrid[0].value.set({ ...duration });
  };

  function prevPage(
    prevPageFunc?: (date: DateValue) => DateValue,
  ) {
    const firstDate = grid.value[0].value;

    if (!prevPageFunc && !props.prevPage.value) {
      const newDate = firstDate.subtract({
        months: props.pagedNavigation.value
          ? props.numberOfMonths.value
          : 1,
      });

      const newGrid = createMonths({
        dateObj: newDate,
        weekStartsOn: props.weekStartsOn.value,
        locale: props.locale.value,
        fixedWeeks: props.fixedWeeks.value,
        numberOfMonths: props.numberOfMonths.value,
      });

      grid.value = newGrid;

      props.placeholder.value = newGrid[0].value.set({ day: 1 });
      return;
    }

    const newDate = handlePrevPage({
      date: firstDate,
      prevPageFunc: prevPageFunc || props.prevPage.value!,
    });

    const newGrid = createMonths({
      dateObj: newDate,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value,
    });

    grid.value = newGrid;

    const duration: DateFields = {};

    // Do not adjust the placeholder if the prevPageFunc is defined (overwrite)
    if (!prevPageFunc) {
      const diff = firstDate.compare(newGrid[0].value);
      if (diff >= getDaysInMonth(firstDate)) {
        duration.day = 1;
      }

      if (diff >= 365) {
        duration.month = 1;
      }
    }

    props.placeholder.value = newGrid[0].value.set({ ...duration });
  };

  watch(
    props.placeholder,
    (value) => {
      if (visibleView.value.some((month) => isEqualMonth(month, value))) {
        return;
      }

      grid.value = createMonths({
        dateObj: value,
        weekStartsOn: props.weekStartsOn.value,
        locale: props.locale.value,
        fixedWeeks: props.fixedWeeks.value,
        numberOfMonths: props.numberOfMonths.value,
      });
    },
  );

  watch(
    [props.locale, props.weekStartsOn, props.fixedWeeks, props.numberOfMonths],
    () => {
      grid.value = createMonths({
        dateObj: props.placeholder.value,
        weekStartsOn: props.weekStartsOn.value,
        locale: props.locale.value,
        fixedWeeks: props.fixedWeeks.value,
        numberOfMonths: props.numberOfMonths.value,
      });
    },
  );

  const headingValue = computed(() => {
    if (!grid.value.length) {
      return '';
    }

    if (props.locale.value !== formatter.getLocale()) {
      formatter.setLocale(props.locale.value);
    }

    if (grid.value.length === 1) {
      const month = grid.value[0].value;
      return `${formatter.fullMonthAndYear({
        date: toDate(month),
        options: headingFormatOptions.value,
      })}`;
    }

    const startMonth = toDate(grid.value[0].value);
    const endMonth = toDate(grid.value[grid.value.length - 1].value);

    const startMonthName = formatter.fullMonth({
      date: startMonth,
      options: headingFormatOptions.value,
    });
    const endMonthName = formatter.fullMonth({
      date: endMonth,
      options: headingFormatOptions.value,
    });
    const startMonthYear = formatter.fullYear({
      date: startMonth,
      options: headingFormatOptions.value,
    });
    const endMonthYear = formatter.fullYear({
      date: endMonth,
      options: headingFormatOptions.value,
    });

    return startMonthYear === endMonthYear
      ? `${startMonthName} - ${endMonthName} ${endMonthYear}`
      : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
  });

  const fullCalendarLabel = computed(() =>
    `${props.calendarLabel.value ?? 'Event Date'}, ${headingValue.value}`,
  );

  return {
    isDateDisabled,
    isDateUnavailable,
    isNextButtonDisabled,
    isPrevButtonDisabled,
    grid,
    weekdays,
    visibleView,
    isOutsideVisibleView,
    formatter,
    nextPage,
    prevPage,
    headingValue,
    fullCalendarLabel,
  };
}

function handleNextDisabled(
  { lastPeriodInView, nextPageFunc }:
  { lastPeriodInView: DateValue; nextPageFunc: (date: DateValue) => DateValue },
): DateValue {
  const firstPeriodOfNextPage = nextPageFunc(lastPeriodInView);
  const diff = firstPeriodOfNextPage.compare(lastPeriodInView);
  const duration: DateFields = {};
  if (diff >= 7) {
    duration.day = 1;
  }

  if (diff >= getDaysInMonth(lastPeriodInView)) {
    duration.month = 1;
  }

  return firstPeriodOfNextPage.set({ ...duration });
}

function handlePrevDisabled(
  { firstPeriodInView, prevPageFunc }:
  { firstPeriodInView: DateValue; prevPageFunc: (date: DateValue) => DateValue },
): DateValue {
  const lastPeriodOfPrevPage = prevPageFunc(firstPeriodInView);
  const diff = firstPeriodInView.compare(lastPeriodOfPrevPage);
  const duration: DateFields = {};
  if (diff >= 7) {
    duration.day = 35;
  }
  if (diff >= getDaysInMonth(firstPeriodInView)) {
    duration.month = 13;
  }
  return lastPeriodOfPrevPage.set({ ...duration });
}

function handleNextPage(
  { date, nextPageFunc }:
  { date: DateValue; nextPageFunc: (date: DateValue) => DateValue },
): DateValue {
  return nextPageFunc(date);
}

function handlePrevPage(
  { date, prevPageFunc }:
  { date: DateValue; prevPageFunc: (date: DateValue) => DateValue },
): DateValue {
  return prevPageFunc(date);
}
