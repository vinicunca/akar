<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { Ref } from 'vue';

import type { ADateRangeFieldRoot, ADateRangeFieldRootProps } from '~~/a-date-range-field';
import type { APopoverRootProps } from '~~/a-popover';
import type { ARangeCalendarRootProps } from '~~/a-range-calendar';
import type { DateMatcher, DateRange, DateTimeGranularity, HourCycle, WeekDayFormat } from '~~/date';

import { createContext, type Direction } from '~~/shared';

type ADateRangePickerRootContext = {
  dateFieldRef: Ref<InstanceType<typeof ADateRangeFieldRoot> | undefined>;
  defaultOpen: Ref<boolean>;
  dir: Ref<Direction>;
  disabled: Ref<boolean>;
  fixedWeeks: Ref<boolean>;
  granularity: Ref<DateTimeGranularity | undefined>;
  hideTimeZone: Ref<boolean>;
  hourCycle: Ref<HourCycle | undefined>;
  id: Ref<string | undefined>;
  isDateDisabled?: DateMatcher;
  isDateUnavailable?: DateMatcher;
  locale: Ref<string>;
  maxValue: Ref<DateValue | undefined>;
  minValue: Ref<DateValue | undefined>;
  modal: Ref<boolean>;
  modelValue: Ref<{ end: DateValue | undefined; start: DateValue | undefined }>;
  name: Ref<string | undefined>;
  numberOfMonths: Ref<number>;
  onDateChange: (date: DateRange) => void;
  onPlaceholderChange: (date: DateValue) => void;
  onStartValueChange: (date: DateValue | undefined) => void;
  open: Ref<boolean>;
  pagedNavigation: Ref<boolean>;
  placeholder: Ref<DateValue>;
  preventDeselect: Ref<boolean>;
  readonly: Ref<boolean>;
  required: Ref<boolean>;
  weekdayFormat: Ref<WeekDayFormat>;
  weekStartsOn: Ref<0 | 1 | 2 | 3 | 4 | 5 | 6>;
};

export type ADateRangePickerRootProps = ADateRangeFieldRootProps
  & APopoverRootProps
  & Pick<ARangeCalendarRootProps, 'fixedWeeks' | 'isDateDisabled' | 'numberOfMonths' | 'pagedNavigation' | 'preventDeselect' | 'weekdayFormat' | 'weekStartsOn'>;

export type ADateRangePickerRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateRange];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
  /** Event handler called whenever the start value changes */
  'update:startValue': [date: DateValue | undefined];
};

export const [
  injectADateRangePickerRootContext,
  provideADateRangePickerRootContext,
] = createContext<ADateRangePickerRootContext>('ADateRangePickerRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ref, toRefs } from 'vue';

import { APopoverRoot, type APopoverRootEmits } from '~~/a-popover';
import { getDefaultDate } from '~~/date';
import { useDirection } from '~~/shared';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ADateRangePickerRootProps>(),
  {
    defaultValue: () => ({ start: undefined, end: undefined }),
    defaultOpen: false,
    open: undefined,
    modal: false,
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
    locale: 'en',
    isDateDisabled: undefined,
    isDateUnavailable: undefined,
  },
);

const emits = defineEmits<ADateRangePickerRootEmits & APopoverRootEmits>();

const {
  locale,
  disabled,
  readonly,
  pagedNavigation,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  numberOfMonths,
  preventDeselect,
  isDateDisabled: propsIsDateDisabled,
  isDateUnavailable: propsIsDateUnavailable,
  defaultOpen,
  modal,
  id,
  name,
  required,
  minValue,
  maxValue,
  granularity,
  hideTimeZone,
  hourCycle,
  dir: propsDir,
} = toRefs(props);

const dir = useDirection(propsDir);

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
  granularity: props.granularity,
  defaultValue: modelValue.value.start,
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

const open = useVModel(
  props,
  'open',
  emits,
  {
    defaultValue: defaultOpen.value,
    passive: (props.open === undefined) as false,
  },
) as Ref<boolean>;

const dateFieldRef = ref<InstanceType<typeof ADateRangeFieldRoot> | undefined>();

provideADateRangePickerRootContext({
  isDateUnavailable: propsIsDateUnavailable.value,
  isDateDisabled: propsIsDateDisabled.value,
  locale,
  disabled,
  pagedNavigation,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  numberOfMonths,
  readonly,
  preventDeselect,
  modelValue,
  placeholder,
  defaultOpen,
  modal,
  open,
  id,
  name,
  required,
  minValue,
  maxValue,
  granularity,
  hideTimeZone,
  hourCycle,
  dateFieldRef,
  dir,
  onStartValueChange(date: DateValue | undefined) {
    emits('update:startValue', date);
  },
  onDateChange(date: DateRange) {
    modelValue.value = { start: date.start?.copy(), end: date.end?.copy() };
  },
  onPlaceholderChange(date: DateValue) {
    placeholder.value = date.copy();
  },
});
</script>

<template>
  <APopoverRoot
    v-model:open="open"
    :default-open="defaultOpen"
    :modal="modal"
  >
    <slot />
  </APopoverRoot>
</template>
