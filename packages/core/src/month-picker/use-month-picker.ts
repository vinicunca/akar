import type { DateValue } from '@internationalized/date';
import type { Ref } from 'vue';
import type { DateGrid, DateMatcher } from '../date';
import type { DateFormatterOptions } from '../shared/use-date-formatter';
import { endOfMonth } from '@internationalized/date';
import { computed, ref, watch } from 'vue';
import { createMonthGrid, isDateAfter, isDateBefore, isSameYearMonth, toDate } from '../date';
import { useDateFormatter } from '../shared';

export interface UseMonthPickerProps {
  locale: Ref<string>;
  placeholder: Ref<DateValue>;
  minValue: Ref<DateValue | undefined>;
  maxValue: Ref<DateValue | undefined>;
  disabled: Ref<boolean>;
  isMonthDisabled?: DateMatcher | Ref<DateMatcher | undefined>;
  isMonthUnavailable?: DateMatcher | Ref<DateMatcher | undefined>;
  calendarLabel: Ref<string | undefined>;
  nextPage: Ref<((placeholder: DateValue) => DateValue) | undefined>;
  prevPage: Ref<((placeholder: DateValue) => DateValue) | undefined>;
}

export interface UseMonthPickerStateProps {
  isMonthDisabled: DateMatcher;
  isMonthUnavailable: DateMatcher;
  date: Ref<DateValue | Array<DateValue> | undefined>;
}

export function useMonthPickerState(props: UseMonthPickerStateProps) {
  function isMonthSelected(dateObj: DateValue) {
    if (Array.isArray(props.date.value)) {
      return props.date.value.some((d) => isSameYearMonth(d, dateObj));
    } else if (!props.date.value) {
      return false;
    } else {
      return isSameYearMonth(props.date.value, dateObj);
    }
  }

  const isInvalid = computed(() => {
    if (Array.isArray(props.date.value)) {
      if (!props.date.value.length) {
        return false;
      }
      for (const dateObj of props.date.value) {
        if (props.isMonthDisabled?.(dateObj)) {
          return true;
        }
        if (props.isMonthUnavailable?.(dateObj)) {
          return true;
        }
      }
    } else {
      if (!props.date.value) {
        return false;
      }
      if (props.isMonthDisabled?.(props.date.value)) {
        return true;
      }
      if (props.isMonthUnavailable?.(props.date.value)) {
        return true;
      }
    }
    return false;
  });

  return { isMonthSelected, isInvalid };
}

export function useMonthPicker(props: UseMonthPickerProps) {
  const formatter = useDateFormatter(props.locale.value);

  const resolveMatcher = (matcher?: DateMatcher | Ref<DateMatcher | undefined>) =>
    typeof matcher === 'function' ? matcher : matcher?.value;

  const headingFormatOptions = computed(() => {
    const options: DateFormatterOptions = {
      calendar: props.placeholder.value.calendar.identifier,
    };

    if (props.placeholder.value.calendar.identifier === 'gregory' && props.placeholder.value.era === 'BC') {
      options.era = 'short';
    }

    return options;
  });

  const grid = ref<DateGrid<DateValue>>(createMonthGrid({ dateObj: props.placeholder.value })) as Ref<DateGrid<DateValue>>;

  function isMonthDisabled(dateObj: DateValue) {
    if (resolveMatcher(props.isMonthDisabled)?.(dateObj) || props.disabled.value) {
      return true;
    }
    if (props.maxValue.value && isDateAfter(dateObj.set({ day: 1 }), props.maxValue.value)) {
      return true;
    }
    if (props.minValue.value && isDateBefore(endOfMonth(dateObj), props.minValue.value)) {
      return true;
    }
    return false;
  }

  function isMonthUnavailable(date: DateValue) {
    return Boolean(resolveMatcher(props.isMonthUnavailable)?.(date));
  }

  function isNextButtonDisabled(nextPageFunc?: (date: DateValue) => DateValue) {
    if (!props.maxValue.value) {
      return false;
    }
    if (props.disabled.value) {
      return true;
    }

    const currentDate = grid.value.value;
    if (nextPageFunc || props.nextPage.value) {
      const nextDate = (nextPageFunc || props.nextPage.value)!(currentDate);
      return isDateAfter(nextDate.set({ month: 1, day: 1 }), props.maxValue.value);
    }

    const nextYear = currentDate.add({ years: 1 }).set({ month: 1, day: 1 });
    return isDateAfter(nextYear, props.maxValue.value);
  };

  function isPrevButtonDisabled(prevPageFunc?: (date: DateValue) => DateValue) {
    if (!props.minValue.value) {
      return false;
    }
    if (props.disabled.value) {
      return true;
    }

    const currentDate = grid.value.value;
    if (prevPageFunc || props.prevPage.value) {
      const prevDate = (prevPageFunc || props.prevPage.value)!(currentDate);
      return isDateBefore(endOfMonth(prevDate.set({ month: 12 })), props.minValue.value);
    }

    const prevYear = currentDate.subtract({ years: 1 }).set({ month: 12, day: 31 });
    return isDateBefore(prevYear, props.minValue.value);
  };

  function nextPage(nextPageFunc?: (date: DateValue) => DateValue) {
    const currentDate = grid.value.value;

    if (nextPageFunc || props.nextPage.value) {
      const newDate = (nextPageFunc || props.nextPage.value)!(currentDate);
      grid.value = createMonthGrid({ dateObj: newDate });
      props.placeholder.value = newDate.set({
        month: props.placeholder.value.month,
        day: props.placeholder.value.day,
      });
      return;
    }

    const newDate = currentDate.add({ years: 1 });
    grid.value = createMonthGrid({ dateObj: newDate });
    props.placeholder.value = newDate.set({
      month: props.placeholder.value.month,
      day: props.placeholder.value.day,
    });
  };

  function prevPage(prevPageFunc?: (date: DateValue) => DateValue) {
    const currentDate = grid.value.value;

    if (prevPageFunc || props.prevPage.value) {
      const newDate = (prevPageFunc || props.prevPage.value)!(currentDate);
      grid.value = createMonthGrid({ dateObj: newDate });
      props.placeholder.value = newDate.set({
        month: props.placeholder.value.month,
        day: props.placeholder.value.day,
      });
      return;
    }

    const newDate = currentDate.subtract({ years: 1 });
    grid.value = createMonthGrid({ dateObj: newDate });
    props.placeholder.value = newDate.set({
      month: props.placeholder.value.month,
      day: props.placeholder.value.day,
    });
  };

  watch(props.placeholder, (value) => {
    if (value.year === grid.value.value.year) {
      return;
    }
    grid.value = createMonthGrid({ dateObj: value });
  });

  watch(props.locale, () => {
    formatter.setLocale(props.locale.value);
    grid.value = createMonthGrid({ dateObj: props.placeholder.value });
  });

  const headingValue = computed(() => {
    if (props.locale.value !== formatter.getLocale()) {
      formatter.setLocale(props.locale.value);
    }

    return formatter.fullYear({
      date: toDate(grid.value.value),
      options: headingFormatOptions.value,
    });
  });

  const fullCalendarLabel = computed(() => `${props.calendarLabel.value ?? 'Month Picker'}, ${headingValue.value}`);

  return {
    isMonthDisabled,
    isMonthUnavailable,
    isNextButtonDisabled,
    isPrevButtonDisabled,
    grid,
    formatter,
    nextPage,
    prevPage,
    headingValue,
    fullCalendarLabel,
  };
}
