/*
  * Adapted from https://github.com/melt-ui/melt-ui/blob/develop/src/lib/builders/range-calendar/create.ts
*/

import { type DateValue, isSameDay } from '@internationalized/date';
import { computed, type Ref } from 'vue';

import { areAllDaysBetweenValid, type DateMatcher, isDateBefore, isDateBetween } from '~~/date';

export interface UseRangeCalendarProps {
  end: Ref<DateValue | undefined>;
  focusedValue: Ref<DateValue | undefined>;
  isDateDisabled: DateMatcher;
  isDateUnavailable: DateMatcher;
  start: Ref<DateValue | undefined>;
};

export function useRangeCalendarState(props: UseRangeCalendarProps) {
  const isStartInvalid = computed(() => {
    if (!props.start.value) {
      return false;
    }

    return props.isDateDisabled(props.start.value);
  });

  const isEndInvalid = computed(() => {
    if (!props.end.value) {
      return false;
    }

    return props.isDateDisabled(props.end.value);
  });

  const isInvalid = computed(
    () => {
      if (isStartInvalid.value || isEndInvalid.value) {
        return false;
      }

      return Boolean(
        props.start.value
        && props.end.value
        && isDateBefore(props.end.value, props.start.value),
      );
    },
  );

  function isSelectionStart(date: DateValue) {
    if (!props.start.value) {
      return false;
    }

    return isSameDay(props.start.value, date);
  };

  function isSelectionEnd(date: DateValue) {
    if (!props.end.value) {
      return false;
    }
    return isSameDay(props.end.value, date);
  };

  function isSelected(date: DateValue) {
    if (props.start.value && isSameDay(props.start.value, date)) {
      return true;
    }

    if (props.end.value && isSameDay(props.end.value, date)) {
      return true;
    }

    if (props.end.value && props.start.value) {
      return isDateBetween({
        date,
        start: props.start.value,
        end: props.end.value,
      });
    }

    return false;
  };

  const highlightedRange = computed(() => {
    if (props.start.value && props.end.value) {
      return null;
    }
    if (!props.start.value || !props.focusedValue.value) {
      return null;
    }

    const isStartBeforeFocused = isDateBefore(props.start.value, props.focusedValue.value);
    const start = isStartBeforeFocused ? props.start.value : props.focusedValue.value;
    const end = isStartBeforeFocused ? props.focusedValue.value : props.start.value;

    if (isSameDay(start.add({ days: 1 }), end)) {
      return {
        start,
        end,
      };
    }

    const isValid = areAllDaysBetweenValid({
      start,
      end,
      isDisabled: props.isDateDisabled,
      isUnavailable: props.isDateUnavailable,
    });

    if (isValid) {
      return {
        start,
        end,
      };
    }

    return null;
  });

  function isHighlightedStart(date: DateValue) {
    if (!highlightedRange.value || !highlightedRange.value.start) {
      return false;
    }

    return isSameDay(highlightedRange.value.start, date);
  };

  function isHighlightedEnd(date: DateValue) {
    if (!highlightedRange.value || !highlightedRange.value.end) {
      return false;
    }

    return isSameDay(highlightedRange.value.end, date);
  };

  return {
    isInvalid,
    isSelected,
    highlightedRange,
    isSelectionStart,
    isSelectionEnd,
    isHighlightedStart,
    isHighlightedEnd,
  };
}
