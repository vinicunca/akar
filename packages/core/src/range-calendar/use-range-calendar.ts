/*
  * Adapted from https://github.com/melt-ui/melt-ui/blob/develop/src/lib/builders/range-calendar/create.ts
*/

import type { DateValue } from '@internationalized/date';
import type { Ref } from 'vue';
import type { DateMatcher } from '../date';
import { isSameDay } from '@internationalized/date';
import { computed } from 'vue';
import { areAllDaysBetweenValid, getDaysBetween, isDateBefore, isDateBetween } from '../date';

export interface UseRangeCalendarProps {
  start: Ref<DateValue | undefined>;
  end: Ref<DateValue | undefined>;
  isDateDisabled: DateMatcher;
  isDateUnavailable: DateMatcher;
  isDateHighlightable?: DateMatcher;
  focusedValue: Ref<DateValue | undefined>;
  allowNonContiguousRanges: Ref<boolean>;
  fixedDate: Ref<'start' | 'end' | undefined>;
  maximumDays?: Ref<number | undefined>;
}

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

  const isSelectionStart = (date: DateValue) => {
    if (!props.start.value) {
      return false;
    }
    return isSameDay(props.start.value, date);
  };

  const isSelectionEnd = (date: DateValue) => {
    if (!props.end.value) {
      return false;
    }
    return isSameDay(props.end.value, date);
  };

  const isSelected = (date: DateValue) => {
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

  // Check if a date exceeds maximum days limit from the start dateAdd commentMore actions
  const rangeIsDateDisabled = (date: DateValue) => {
    if (props.isDateDisabled(date)) {
      return true;
    }

    if (props.maximumDays?.value) {
      if (props.start.value && props.end.value) {
        if (props.fixedDate.value) {
          const diff = getDaysBetween(props.start.value, props.end.value).length;

          if (diff <= props.maximumDays.value) {
            const daysLeft = props.maximumDays.value - diff - 1;
            const startLimit = props.start.value.subtract({ days: daysLeft });
            const endLimit = props.start.value.add({ days: daysLeft });

            return !isDateBetween({
              date,
              start: startLimit,
              end: endLimit,
            });
          }
        }

        return false;
      }

      if (props.start.value) {
        const maxDate = props.start.value.add({ days: props.maximumDays.value });
        const minDate = props.start.value.subtract({ days: props.maximumDays.value });

        return !isDateBetween({
          date,
          start: minDate,
          end: maxDate,
        });
      }
    }

    return false;
  };

  function isDateHighlightable(date: DateValue) {
    return Boolean(props.isDateHighlightable?.(date));
  }

  const highlightedRange = computed(() => {
    if (props.start.value && props.end.value && !props.fixedDate.value) {
      return null;
    }
    if (!props.start.value || !props.focusedValue.value) {
      return null;
    }

    const isStartBeforeFocused = isDateBefore(props.start.value, props.focusedValue.value);
    const start = isStartBeforeFocused ? props.start.value : props.focusedValue.value;
    const end = isStartBeforeFocused ? props.focusedValue.value : props.start.value;

    if (isSameDay(start, end)) {
      return {
        start,
        end,
      };
    }

    // If maximum days is set and the range exceeds it, limit the highlightAdd commentMore actions
    // We only apply this when we're in the middle of a selection (no end date yet)
    if (
      props.maximumDays?.value
      && !props.end.value
    ) {
      // Determine the direction of selection and limit to maximum days
      const cappedEnd = isStartBeforeFocused
        ? start.add({ days: props.maximumDays.value })
        : start.subtract({ days: props.maximumDays.value });

      return {
        start,
        end: cappedEnd,
      };
    }

    const isValid = props.allowNonContiguousRanges.value || areAllDaysBetweenValid({
      start,
      end,
      isUnavailable: props.allowNonContiguousRanges.value ? () => false : props.isDateUnavailable,
      isDisabled: rangeIsDateDisabled,
      isHighlightable: props.isDateHighlightable,
    });

    if (isValid) {
      return {
        start,
        end,
      };
    }

    return null;
  });

  const isHighlightedStart = (date: DateValue) => {
    if (!highlightedRange.value || !highlightedRange.value.start) {
      return false;
    }

    return isSameDay(highlightedRange.value.start, date);
  };

  const isHighlightedEnd = (date: DateValue) => {
    if (!highlightedRange.value || !highlightedRange.value.end) {
      return false;
    }

    return isSameDay(highlightedRange.value.end, date);
  };

  return {
    isInvalid,
    isSelected,
    isDateHighlightable,
    highlightedRange,
    isSelectionStart,
    isSelectionEnd,
    isHighlightedStart,
    isHighlightedEnd,
    isDateDisabled: rangeIsDateDisabled,
  };
}
