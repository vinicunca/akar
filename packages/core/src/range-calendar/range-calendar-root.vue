<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { Ref } from 'vue';
import type { DateGrid, DateMatcher, WeekDayFormat } from '~~/date';
import type { APrimitiveProps } from '~~/primitive';
import type { UseDateFormatter } from '~~/shared';
import type { DateRange } from '~~/shared/date';
import type { Direction } from '~~/shared/types';
import { isEqualDay } from '@internationalized/date';
import { isNullish, KEY_CODES } from '@vinicunca/perkakas';
import { useCalendar } from '~~/calendar/use-calendar';
import { isDateBefore } from '~~/date';
import { createContext, useDirection, useLocale } from '~~/shared';
import { getDefaultDate, handleCalendarInitialFocus } from '~~/shared/date';
import { useRangeCalendarState } from './use-range-calendar';

type RangeCalendarRootContext = {
  modelValue: Ref<DateRange>;
  startValue: Ref<DateValue | undefined>;
  endValue: Ref<DateValue | undefined>;
  locale: Ref<string>;
  placeholder: Ref<DateValue>;
  pagedNavigation: Ref<boolean>;
  preventDeselect: Ref<boolean>;
  grid: Ref<Array<DateGrid<DateValue>>>;
  weekDays: Ref<Array<string>>;
  weekStartsOn: Ref<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  weekdayFormat: Ref<WeekDayFormat>;
  fixedWeeks: Ref<boolean>;
  numberOfMonths: Ref<number>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  initialFocus: Ref<boolean>;
  onPlaceholderChange: (date: DateValue) => void;
  fullCalendarLabel: Ref<string>;
  parentElement: Ref<HTMLElement | undefined>;
  headingValue: Ref<string>;
  isInvalid: Ref<boolean>;
  isDateDisabled: DateMatcher;
  isDateUnavailable?: DateMatcher;
  isDateHighlightable?: DateMatcher;
  isOutsideVisibleView: (date: DateValue) => boolean;
  allowNonContiguousRanges: Ref<boolean>;
  highlightedRange: Ref<null | { start: DateValue; end: DateValue }>;
  focusedValue: Ref<DateValue | undefined>;
  lastPressedDateValue: Ref<DateValue | undefined>;
  isSelected: (date: DateValue) => boolean;
  isSelectionEnd: (date: DateValue) => boolean;
  isSelectionStart: (date: DateValue) => boolean;
  isHighlightedStart: (date: DateValue) => boolean;
  isHighlightedEnd: (date: DateValue) => boolean;
  prevPage: (prevPageFunc?: (date: DateValue) => DateValue) => void;
  nextPage: (nextPageFunc?: (date: DateValue) => DateValue) => void;
  isNextButtonDisabled: (
    nextPageFunc?: (date: DateValue) => DateValue
  ) => boolean;
  isPrevButtonDisabled: (
    prevPageFunc?: (date: DateValue) => DateValue
  ) => boolean;
  formatter: UseDateFormatter;
  dir: Ref<Direction>;
  disableDaysOutsideCurrentView: Ref<boolean>;
  fixedDate: Ref<'start' | 'end' | undefined>;
  maximumDays: Ref<number | undefined>;
};

export interface ARangeCalendarRootProps extends APrimitiveProps {
  /** The default placeholder date */
  defaultPlaceholder?: DateValue;
  /** The default value for the calendar */
  defaultValue?: DateRange;
  /** The controlled checked state of the calendar. Can be bound as `v-model`. */
  modelValue?: DateRange | null;
  /** The placeholder date, which is used to determine what month to display when no date is selected. This updates as the user navigates the calendar and can be used to programmatically control the calendar view */
  placeholder?: DateValue;
  /** When combined with `isDateUnavailable`, determines whether non-contiguous ranges, i.e. ranges containing unavailable dates, may be selected. */
  allowNonContiguousRanges?: boolean;
  /** This property causes the previous and next buttons to navigate by the number of months displayed at once, rather than one month */
  pagedNavigation?: boolean;
  /** Whether or not to prevent the user from deselecting a date without selecting another date first */
  preventDeselect?: boolean;
  /** The maximum number of days that can be selected in a range */
  maximumDays?: number;
  /** The day of the week to start the calendar on */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** The format to use for the weekday strings provided via the weekdays slot prop */
  weekdayFormat?: WeekDayFormat;
  /** The accessible label for the calendar */
  calendarLabel?: string;
  /** Whether or not to always display 6 weeks in the calendar */
  fixedWeeks?: boolean;
  /** The maximum date that can be selected */
  maxValue?: DateValue;
  /** The minimum date that can be selected */
  minValue?: DateValue;
  /** The locale to use for formatting dates */
  locale?: string;
  /** The number of months to display at once */
  numberOfMonths?: number;
  /** Whether or not the calendar is disabled */
  disabled?: boolean;
  /** Whether or not the calendar is readonly */
  readonly?: boolean;
  /** If true, the calendar will focus the selected day, today, or the first day of the month depending on what is visible when the calendar is mounted */
  initialFocus?: boolean;
  /** A function that returns whether or not a date is disabled */
  isDateDisabled?: DateMatcher;
  /** A function that returns whether or not a date is unavailable */
  isDateUnavailable?: DateMatcher;
  /** A function that returns whether or not a date is hightable */
  isDateHighlightable?: DateMatcher;
  /** The reading direction of the calendar when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** A function that returns the next page of the calendar. It receives the current placeholder as an argument inside the component. */
  nextPage?: (placeholder: DateValue) => DateValue;
  /** A function that returns the previous page of the calendar. It receives the current placeholder as an argument inside the component. */
  prevPage?: (placeholder: DateValue) => DateValue;
  /** Whether or not to disable days outside the current view. */
  disableDaysOutsideCurrentView?: boolean;
  /** Which part of the range should be fixed */
  fixedDate?: 'start' | 'end';
}

export type ARangeCalendarRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateRange];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
  /** Event handler called whenever the start value changes */
  'update:startValue': [date: DateValue | undefined];
};

export const [
  injectARangeCalendarRootContext,
  provideRangeCalendarRootContext,
] = createContext<RangeCalendarRootContext>('range-calendar-root');
</script>

<script setup lang="ts">
import { useEventListener, useVModel } from '@vueuse/core';
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import { APrimitive, usePrimitiveElement } from '~~/primitive';

const props = withDefaults(
  defineProps<ARangeCalendarRootProps>(),
  {
    defaultValue: () => ({ start: undefined, end: undefined }),
    as: 'div',
    pagedNavigation: false,
    preventDeselect: false,
    weekStartsOn: 0,
    weekdayFormat: 'narrow',
    fixedWeeks: false,
    numberOfMonths: 1,
    disabled: false,
    readonly: false,
    initialFocus: false,
    placeholder: undefined,
    isDateDisabled: undefined,
    isDateUnavailable: undefined,
    isDateHighlightable: undefined,
    allowNonContiguousRanges: false,
    maximumDays: undefined,
    disableDaysOutsideCurrentView: false,
  },
);
const emits = defineEmits<ARangeCalendarRootEmits>();

defineSlots<{
  default?: (props: {
    /** The current date of the placeholder */
    date: DateValue;
    /** The grid of dates */
    grid: Array<DateGrid<DateValue>>;
    /** The days of the week */
    weekDays: Array<string>;
    /** The start of the week */
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /** The calendar locale */
    locale: string;
    /** Whether or not to always display 6 weeks in the calendar */
    fixedWeeks: boolean;
    /** The current date range */
    modelValue: DateRange;
  }) => any;
}>();

const {
  disabled,
  readonly,
  initialFocus,
  pagedNavigation,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  numberOfMonths,
  preventDeselect,
  isDateUnavailable: propsIsDateUnavailable,
  isDateDisabled: propsIsDateDisabled,
  isDateHighlightable: propsIsDateHighlightable,
  calendarLabel,
  maxValue,
  minValue,
  dir: propDir,
  locale: propLocale,
  nextPage: propsNextPage,
  prevPage: propsPrevPage,
  allowNonContiguousRanges,
  disableDaysOutsideCurrentView,
  fixedDate,
  maximumDays,
} = toRefs(props);

const {
  primitiveElement,
  currentElement: parentElement,
} = usePrimitiveElement();
const dir = useDirection(propDir);
const locale = useLocale(propLocale);

const lastPressedDateValue = ref() as Ref<DateValue | undefined>;
const focusedValue = ref() as Ref<DateValue | undefined>;
const isEditing = ref(false);

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue ?? { start: undefined, end: undefined },
  passive: (props.modelValue === undefined) as false,
}) as Ref<DateRange>;

const currentModelValue = computed(() =>
  isNullish(modelValue.value)
    ? { start: undefined, end: undefined }
    : modelValue.value,
);

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value.start,
  locale: props.locale,
});

const startValue = ref(currentModelValue.value.start) as Ref<DateValue | undefined>;
const endValue = ref(currentModelValue.value.end) as Ref<DateValue | undefined>;

const placeholder = useVModel(props, 'placeholder', emits, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
  passive: (props.placeholder === undefined) as false,
}) as Ref<DateValue>;

function onPlaceholderChange(value: DateValue) {
  placeholder.value = value.copy();
}

const {
  fullCalendarLabel,
  headingValue,
  isDateDisabled,
  isDateUnavailable,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  grid,
  weekdays,
  isOutsideVisibleView,
  nextPage,
  prevPage,
  formatter,
} = useCalendar({
  locale,
  placeholder,
  weekStartsOn,
  fixedWeeks,
  numberOfMonths,
  minValue,
  maxValue,
  disabled,
  weekdayFormat,
  pagedNavigation,
  isDateDisabled: propsIsDateDisabled.value,
  isDateUnavailable: propsIsDateUnavailable.value,
  calendarLabel,
  nextPage: propsNextPage,
  prevPage: propsPrevPage,
});

const {
  isInvalid,
  isSelected,
  isDateHighlightable,
  highlightedRange,
  isSelectionStart,
  isSelectionEnd,
  isHighlightedStart,
  isHighlightedEnd,
  isDateDisabled: rangeIsDateDisabled,
} = useRangeCalendarState({
  start: startValue,
  end: endValue,
  isDateDisabled,
  isDateUnavailable,
  isDateHighlightable: propsIsDateHighlightable.value,
  focusedValue,
  allowNonContiguousRanges,
  fixedDate,
  maximumDays,
});

watch(
  modelValue,
  (modelValue_, prevValue_) => {
    if (
      (!prevValue_?.start && modelValue_?.start)
      || !modelValue_
      || !modelValue_.start
      || (startValue.value && !isEqualDay(modelValue_.start, startValue.value))
    ) {
      startValue.value = modelValue_?.start?.copy?.();
    }

    if (
      (!prevValue_?.end && modelValue_.end)
      || !modelValue_
      || !modelValue_.end
      || (endValue.value && !isEqualDay(modelValue_.end, endValue.value))
    ) {
      endValue.value = modelValue_?.end?.copy?.();
    }
  },
);

watch(
  startValue,
  (_startValue) => {
    if (_startValue && !isEqualDay(_startValue, placeholder.value)) {
      onPlaceholderChange(_startValue);
    }

    emits('update:startValue', _startValue);
  },
);

watch(
  [startValue, endValue],
  ([_startValue, _endValue]) => {
    const value = currentModelValue.value;

    if (
      value
      && value.start
      && value.end
      && _startValue
      && _endValue
      && isEqualDay(value.start, _startValue)
      && isEqualDay(value.end, _endValue)
    ) {
      return;
    }

    isEditing.value = true;

    if (_startValue && _endValue) {
      isEditing.value = false;

      if (
        value.start
        && value.end
        && isEqualDay(value.start, _startValue)
        && isEqualDay(value.end, _endValue)
      ) {
        return;
      }

      if (isDateBefore(_endValue, _startValue)) {
        modelValue.value = {
          start: _endValue.copy(),
          end: _startValue.copy(),
        };
      } else {
        modelValue.value = {
          start: _startValue.copy(),
          end: _endValue.copy(),
        };
      }
    }
  },
);

useEventListener(
  'keydown',
  (ev) => {
    if (ev.key === KEY_CODES.ESC && isEditing.value) {
      // Abort start and end selection
      startValue.value = modelValue.value.start?.copy();
      endValue.value = modelValue.value.end?.copy();
    }
  },
);

provideRangeCalendarRootContext({
  isDateUnavailable,
  isDateHighlightable,
  startValue,
  endValue,
  formatter,
  modelValue,
  placeholder,
  disabled,
  initialFocus,
  pagedNavigation,
  grid,
  weekDays: weekdays,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  numberOfMonths,
  readonly,
  preventDeselect,
  fullCalendarLabel,
  headingValue,
  isInvalid,
  isDateDisabled: rangeIsDateDisabled,
  allowNonContiguousRanges,
  highlightedRange,
  focusedValue,
  lastPressedDateValue,
  isSelected,
  isSelectionEnd,
  isSelectionStart,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  isOutsideVisibleView,
  nextPage,
  prevPage,
  parentElement,
  onPlaceholderChange,
  locale,
  dir,
  isHighlightedStart,
  isHighlightedEnd,
  disableDaysOutsideCurrentView,
  fixedDate,
  maximumDays,
});

onMounted(() => {
  if (initialFocus.value) {
    handleCalendarInitialFocus(parentElement.value);
  }
});
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    :as="as"
    :as-child="asChild"
    role="application"
    :aria-label="fullCalendarLabel"
    :data-readonly="readonly ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :dir="dir"
  >
    <div
      style="
        border: 0px;
        clip: rect(0px, 0px, 0px, 0px);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0px;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      "
    >
      <div
        role="heading"
        aria-level="2"
      >
        {{ fullCalendarLabel }}
      </div>
    </div>

    <slot
      :date="placeholder"
      :grid="grid"
      :week-days="weekdays"
      :week-starts-on="weekStartsOn"
      :locale="locale"
      :fixed-weeks="fixedWeeks"
      :model-value="modelValue"
    />
  </APrimitive>
</template>
