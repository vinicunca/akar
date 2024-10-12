<script lang="ts">
import type { Ref } from 'vue';

import { type DateValue, isEqualDay, isSameDay } from '@internationalized/date';

import type { ACalendarRootProps } from '~~/a-calendar';
import type { ADateFieldRoot, ADateFieldRootProps } from '~~/a-date-field';
import type { APopoverRootProps } from '~~/a-popover';

import { type DateMatcher, type DateTimeGranularity, getDefaultDate, type HourCycle, type WeekDayFormat } from '~~/date';
import { createContext, type Direction } from '~~/shared';

type ADatePickerRootContext = {
  dateFieldRef: Ref<InstanceType<typeof ADateFieldRoot> | undefined>;
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
  modelValue: Ref<DateValue | undefined>;
  name: Ref<string | undefined>;
  numberOfMonths: Ref<number>;
  onDateChange: (date: DateValue | undefined) => void;
  onPlaceholderChange: (date: DateValue) => void;
  open: Ref<boolean>;
  pagedNavigation: Ref<boolean>;
  placeholder: Ref<DateValue>;
  preventDeselect: Ref<boolean>;
  readonly: Ref<boolean>;
  required: Ref<boolean>;
  weekdayFormat: Ref<WeekDayFormat>;
  weekStartsOn: Ref<0 | 1 | 2 | 3 | 4 | 5 | 6>;
};

export type ADatePickerRootProps = ADateFieldRootProps
  & APopoverRootProps
  & Pick<ACalendarRootProps, 'fixedWeeks' | 'isDateDisabled' | 'numberOfMonths' | 'pagedNavigation' | 'preventDeselect' | 'weekdayFormat' | 'weekStartsOn'>;

export type ADatePickerRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateValue | undefined];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
};

export const [
  injectADatePickerRootContext,
  provideADatePickerRootContext,
] = createContext<ADatePickerRootContext>('ADatePickerRoot');
</script>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { computed, ref, toRefs } from 'vue';

import { APopoverRoot, type APopoverRootEmits } from '~~/a-popover';
import { useDirection } from '~~/shared';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ADatePickerRootProps>(),
  {
    defaultOpen: false,
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
    locale: 'en',
  },
);

const emits = defineEmits<ADatePickerRootEmits & APopoverRootEmits>();
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
  defaultValue,
  dir: propDir,
} = toRefs(props);

const dir = useDirection(propDir);

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: defaultValue.value,
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<DateValue | undefined>;

const defaultDate = computed(() =>
  getDefaultDate({
    defaultPlaceholder: props.placeholder,
    granularity: props.granularity,
    defaultValue: modelValue.value,
  }),
);

const placeholder = useVModel(
  props,
  'placeholder',
  emits,
  {
    defaultValue: props.defaultPlaceholder ?? defaultDate.value.copy(),
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

const dateFieldRef = ref<InstanceType<typeof ADateFieldRoot> | undefined>();

provideADatePickerRootContext({
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
  onDateChange(date: DateValue | undefined) {
    if (!date || !modelValue.value) {
      modelValue.value = date;
    } else if (!preventDeselect.value && isSameDay(modelValue.value as DateValue, date)) {
      modelValue.value = undefined;
    } else {
      modelValue.value = date.copy();
    }
  },
  onPlaceholderChange(date: DateValue) {
    if (!isEqualDay(date, placeholder.value)) {
      placeholder.value = date.copy();
    }
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
