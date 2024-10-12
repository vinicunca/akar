<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';
import type { DateGrid, DateMatcher, UseDateFormatter, WeekDayFormat } from '~~/date';

import { createContext, type Direction } from '~~/shared';

type ACalendarRootContext = {
  dir: Ref<Direction>;
  disabled: Ref<boolean>;
  fixedWeeks: Ref<boolean>;
  formatter: UseDateFormatter;
  fullCalendarLabel: Ref<string>;
  headingValue: Ref<string>;
  initialFocus: Ref<boolean>;
  isDateDisabled: DateMatcher;
  isDateSelected: DateMatcher;
  isDateUnavailable?: DateMatcher;
  isInvalid: Ref<boolean>;
  isNextButtonDisabled: (nextPageFunc?: (date: DateValue) => DateValue) => boolean;
  isOutsideVisibleView: (date: DateValue) => boolean;
  isPrevButtonDisabled: (prevPageFunc?: (date: DateValue) => DateValue) => boolean;
  locale: Ref<string>;
  modelValue: Ref<Array<DateValue> | DateValue | undefined>;
  multiple: Ref<boolean>;
  nextPage: (nextPageFunc?: (date: DateValue) => DateValue) => void;
  numberOfMonths: Ref<number>;
  onDateChange: (date: DateValue) => void;
  onPlaceholderChange: (date: DateValue) => void;
  pagedNavigation: Ref<boolean>;
  parentElement: Ref<HTMLElement | undefined>;
  placeholder: Ref<DateValue>;
  preventDeselect: Ref<boolean>;
  prevPage: (prevPageFunc?: (date: DateValue) => DateValue) => void;
  readonly: Ref<boolean>;
  weekdayFormat: Ref<WeekDayFormat>;
  weekStartsOn: Ref<0 | 1 | 2 | 3 | 4 | 5 | 6>;
};

interface BaseACalendarRootProps extends APrimitiveProps {
  /** The accessible label for the calendar */
  calendarLabel?: string;
  /** The default placeholder date */
  defaultPlaceholder?: DateValue;
  /** The default value for the calendar */
  defaultValue?: DateValue;
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

export interface MultipleACalendarRootProps extends BaseACalendarRootProps {
  /** The controlled checked state of the calendar. Can be bound as `v-model`. */
  modelValue?: Array<DateValue> | undefined;
  /** Whether or not multiple dates can be selected */
  multiple: true;
}

export interface SingleACalendarRootProps extends BaseACalendarRootProps {
  /** The controlled checked state of the calendar. Can be bound as `v-model`. */
  modelValue?: DateValue | undefined;
  /** Whether or not multiple dates can be selected */
  multiple?: false;
}

export type ACalendarRootProps = MultipleACalendarRootProps | SingleACalendarRootProps;

export type ACalendarRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateValue | undefined];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
};

export const [
  injectACalendarRootContext,
  provideACalendarRootContext,
] = createContext<ACalendarRootContext>('ACalendarRoot');
</script>

<script lang="ts" setup>
import { isEqualDay, isSameDay } from '@internationalized/date';
import { useVModel } from '@vueuse/core';
import { onMounted, toRefs, watch } from 'vue';

import { APrimitive, usePrimitiveElement } from '~~/a-primitive';
import { getDefaultDate, handleCalendarInitialFocus } from '~~/date';
import { useDirection, useLocale } from '~~/shared';

import { useCalendar, useCalendarState } from './use-calendar';

const props = withDefaults(
  defineProps<ACalendarRootProps>(),
  {
    as: 'div',
    pagedNavigation: false,
    preventDeselect: false,
    weekStartsOn: 0,
    weekdayFormat: 'narrow',
    fixedWeeks: false,
    multiple: false,
    numberOfMonths: 1,
    disabled: false,
    readonly: false,
    initialFocus: false,
  },
);

const emits = defineEmits<ACalendarRootEmits>();

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
  multiple,
  minValue,
  maxValue,
  numberOfMonths,
  preventDeselect,
  isDateDisabled: propsIsDateDisabled,
  isDateUnavailable: propsIsDateUnavailable,
  calendarLabel,
  defaultValue,
  nextPage: propsNextPage,
  prevPage: propsPrevPage,
  dir: propDir,
  locale: propLocale,
} = toRefs(props);

const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
const locale = useLocale(propLocale);
const dir = useDirection(propDir);

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: defaultValue.value,
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<Array<DateValue> | DateValue | undefined>;

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value,
});

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
  weekdays,
  isOutsideVisibleView,
  nextPage,
  prevPage,
  formatter,
  grid,
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
  isDateSelected,
} = useCalendarState({
  date: modelValue,
  isDateDisabled,
  isDateUnavailable,
});

watch(
  modelValue,
  (_modelValue) => {
    if (Array.isArray(_modelValue) && _modelValue.length) {
      const lastValue = _modelValue[_modelValue.length - 1];

      if (lastValue && !isEqualDay(placeholder.value, lastValue)) {
        onPlaceholderChange(lastValue);
      }
    } else if (
      !Array.isArray(_modelValue)
      && _modelValue
      && !isEqualDay(placeholder.value, _modelValue)
    ) {
      onPlaceholderChange(_modelValue);
    }
  },
);

function onDateChange(value: DateValue) {
  if (!multiple.value) {
    if (!modelValue.value) {
      modelValue.value = value.copy();
      return;
    }

    if (!preventDeselect.value && isEqualDay(modelValue.value as DateValue, value)) {
      placeholder.value = value.copy();
      modelValue.value = undefined;
    } else {
      modelValue.value = value.copy();
    }
  } else if (Array.isArray(modelValue.value)) {
    if (!modelValue.value) {
      modelValue.value = [value.copy()];

      return;
    }

    const index = modelValue.value.findIndex((date) => isSameDay(date, value));
    if (index === -1) {
      modelValue.value = [...modelValue.value, value];
    } else if (!preventDeselect.value) {
      const next = modelValue.value.filter((date) => !isSameDay(date, value));

      if (!next.length) {
        placeholder.value = value.copy();
        modelValue.value = undefined;
        return;
      }

      modelValue.value = next.map((date) => date.copy());
    }
  }
}

onMounted(() => {
  if (initialFocus.value) {
    handleCalendarInitialFocus(parentElement.value);
  }
});

provideACalendarRootContext({
  isDateUnavailable,
  dir,
  isDateDisabled,
  locale,
  formatter,
  modelValue,
  placeholder,
  disabled,
  initialFocus,
  pagedNavigation,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  multiple,
  numberOfMonths,
  readonly,
  preventDeselect,
  fullCalendarLabel,
  headingValue,
  isInvalid,
  isDateSelected,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  isOutsideVisibleView,
  nextPage,
  prevPage,
  parentElement,
  onPlaceholderChange,
  onDateChange,
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
    <slot
      :date="placeholder"
      :grid="grid"
      :week-days="weekdays"
      :week-starts-on="weekStartsOn"
      :locale="locale"
      :fixed-weeks="fixedWeeks"
    />
    <div
      style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; white-space: nowrap; width: 1px;"
    >
      <div
        role="heading"
        aria-level="2"
      >
        {{ fullCalendarLabel }}
      </div>
    </div>
  </APrimitive>
</template>
