<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';
import type {
  DateMatcher,
  DateRange,
  UseDateFormatter,
  WeekDayFormat,
} from '~~/date';
import type { Direction } from '~~/shared';

import { createContext } from '~~/shared';

type ARangeCalendarRootContext = {
  dir: Ref<Direction>;
  disabled: Ref<boolean>;
  endValue: Ref<DateValue | undefined>;
  fixedWeeks: Ref<boolean>;
  focusedValue: Ref<DateValue | undefined>;
  formatter: UseDateFormatter;
  fullCalendarLabel: Ref<string>;
  headingValue: Ref<string>;
  highlightedRange: Ref<{ end: DateValue; start: DateValue } | null>;
  initialFocus: Ref<boolean>;
  isDateDisabled: DateMatcher;
  isDateUnavailable?: DateMatcher;
  isHighlightedEnd: (date: DateValue) => boolean;
  isHighlightedStart: (date: DateValue) => boolean;
  isInvalid: Ref<boolean>;
  isNextButtonDisabled: (nextPageFunc?: (date: DateValue) => DateValue) => boolean;
  isOutsideVisibleView: (date: DateValue) => boolean;
  isPrevButtonDisabled: (prevPageFunc?: (date: DateValue) => DateValue) => boolean;
  isSelected: (date: DateValue) => boolean;
  isSelectionEnd: (date: DateValue) => boolean;
  isSelectionStart: (date: DateValue) => boolean;
  lastPressedDateValue: Ref<DateValue | undefined>;
  locale: Ref<string>;
  modelValue: Ref<DateRange>;
  nextPage: (nextPageFunc?: (date: DateValue) => DateValue) => void;
  numberOfMonths: Ref<number>;
  onPlaceholderChange: (date: DateValue) => void;
  pagedNavigation: Ref<boolean>;
  parentElement: Ref<HTMLElement | undefined>;
  placeholder: Ref<DateValue>;
  preventDeselect: Ref<boolean>;
  prevPage: (prevPageFunc?: (date: DateValue) => DateValue) => void;
  readonly: Ref<boolean>;
  startValue: Ref<DateValue | undefined>;
  weekdayFormat: Ref<WeekDayFormat>;
  weekStartsOn: Ref<0 | 1 | 2 | 3 | 4 | 5 | 6>;
};

export interface ARangeCalendarRootProps extends APrimitiveProps {
  /** When combined with `isDateUnavailable`, determines whether non-contiguous ranges, i.e. ranges containing unavailable dates, may be selected. */
  allowNonContiguousRanges?: boolean;
  /** The accessible label for the calendar */
  calendarLabel?: string;
  /** The default placeholder date */
  defaultPlaceholder?: DateValue;
  /** The default value for the calendar */
  defaultValue?: DateRange;
  /** The reading direction of the calendar when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** Whether or not the calendar is disabled */
  disabled?: boolean;
  /** Whether or not to always display 6 weeks in the calendar */
  fixedWeeks?: boolean;
  /** If true, the calendar will focus the selected day, today, or the first day of the month depending on what is visible when the calendar is mounted */
  initialFocus?: boolean;
  /** A function that returns whether or not a date is disabled */
  isDateDisabled?: DateMatcher;
  /** A function that returns whether or not a date is unavailable */
  isDateUnavailable?: DateMatcher;
  /** The locale to use for formatting dates */
  locale?: string;
  /** The maximum date that can be selected */
  maxValue?: DateValue;
  /** The minimum date that can be selected */
  minValue?: DateValue;
  /** The controlled checked state of the calendar. Can be bound as `v-model`. */
  modelValue?: DateRange;
  /** A function that returns the next page of the calendar. It receives the current placeholder as an argument inside the component. */
  nextPage?: (placeholder: DateValue) => DateValue;
  /** The number of months to display at once */
  numberOfMonths?: number;
  /** This property causes the previous and next buttons to navigate by the number of months displayed at once, rather than one month */
  pagedNavigation?: boolean;
  /** The placeholder date, which is used to determine what month to display when no date is selected. This updates as the user navigates the calendar and can be used to programmatically control the calendar view */
  placeholder?: DateValue;
  /** Whether or not to prevent the user from deselecting a date without selecting another date first */
  preventDeselect?: boolean;
  /** A function that returns the previous page of the calendar. It receives the current placeholder as an argument inside the component. */
  prevPage?: (placeholder: DateValue) => DateValue;
  /** Whether or not the calendar is readonly */
  readonly?: boolean;
  /** The format to use for the weekday strings provided via the weekdays slot prop */
  weekdayFormat?: WeekDayFormat;
  /** The day of the week to start the calendar on */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
  provideARangeCalendarRootContext,
] = createContext<ARangeCalendarRootContext>('ARangeCalendarRoot');
</script>

<script setup lang="ts">
import { isEqualDay } from '@internationalized/date';
import { useVModel } from '@vueuse/core';
import { onMounted, ref, toRefs, watch } from 'vue';

import { useCalendar } from '~~/a-calendar/use-calendar';
import { APrimitive, usePrimitiveElement } from '~~/a-primitive';
import { type DateGrid, getDefaultDate, handleCalendarInitialFocus, isDateBefore } from '~~/date';
import { useDirection, useLocale } from '~~/shared';

import { useRangeCalendarState } from './use-range-calendar';

// import { type Grid, isBefore, type Matcher, type WeekDayFormat } from '@/date';
// import { getDefaultDate, handleCalendarInitialFocus } from '~~/shared/date';
// import { type DateValue, isEqualDay } from '@internationalized/date';

// import { useARangeCalendarState } from './useARangeCalendar';

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
    allowNonContiguousRanges: false,
  },
);
const emits = defineEmits<ARangeCalendarRootEmits>();

defineSlots<{
  default: (props: {
    /** The current date of the placeholder */
    date: DateValue;
    /** Whether or not to always display 6 weeks in the calendar */
    fixedWeeks: boolean;
    /** The grid of dates */
    grid: Array<DateGrid<DateValue>>;
    /** The calendar locale */
    locale: string;
    /** The days of the week */
    weekDays: Array<string>;
    /** The start of the week */
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
  calendarLabel,
  maxValue,
  minValue,
  dir: propDir,
  locale: propLocale,
  nextPage: propsNextPage,
  prevPage: propsPrevPage,
  allowNonContiguousRanges,
} = toRefs(props);

const { primitiveElement, currentElement: parentElement }
  = usePrimitiveElement();
const dir = useDirection(propDir);
const locale = useLocale(propLocale);

const lastPressedDateValue = ref() as Ref<DateValue | undefined>;
const focusedValue = ref() as Ref<DateValue | undefined>;

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue ?? { start: undefined, end: undefined },
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<DateRange>;

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value.start,
});

const startValue = ref(modelValue.value.start) as Ref<DateValue | undefined>;
const endValue = ref(modelValue.value.end) as Ref<DateValue | undefined>;

const placeholder = useVModel(
  props,
  'placeholder',
  emits,
  {
    defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
    passive: (props.placeholder === undefined) as false,
  },
) as Ref<DateValue>;

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
  highlightedRange,
  isSelectionStart,
  isSelectionEnd,
  isHighlightedStart,
  isHighlightedEnd,
} = useRangeCalendarState({
  start: startValue,
  end: endValue,
  isDateDisabled,
  isDateUnavailable,
  focusedValue,
  allowNonContiguousRanges,
});

watch(
  modelValue,
  (modelValue_) => {
    if (modelValue_.start
      && (
        !startValue.value || !isEqualDay(startValue.value, modelValue_.start)
      )
    ) {
      startValue.value = modelValue_.start.copy();
    }

    if (modelValue_.end
      && (
        !endValue.value || !isEqualDay(endValue.value, modelValue_.end)
      )
    ) {
      endValue.value = modelValue_.end.copy();
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
    const value = modelValue.value;

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

    if (_startValue && _endValue) {
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
    } else if (value.start && value.end) {
      modelValue.value = {
        start: undefined,
        end: undefined,
      };
    }
  },
);

provideARangeCalendarRootContext({
  isDateUnavailable,
  startValue,
  endValue,
  formatter,
  modelValue,
  placeholder,
  disabled,
  initialFocus,
  pagedNavigation,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  numberOfMonths,
  readonly,
  preventDeselect,
  fullCalendarLabel,
  headingValue,
  isInvalid,
  isDateDisabled,
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
    <div style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; white-space: nowrap; width: 1px;">
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
    />
  </APrimitive>
</template>
