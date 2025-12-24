<script lang="ts">
import type { DateValue } from '@internationalized/date';

import type { Ref } from 'vue';
import type { ACalendarRootProps, ADateFieldRoot, ADateFieldRootProps, APopoverRootEmits, APopoverRootProps } from '..';
import type { DateMatcher, WeekDayFormat } from '../date';
import type { DateStep, Granularity, HourCycle } from '../shared/date';
import type { Direction } from '../shared/types';
import { createContext, useDirection } from '../shared';

type DatePickerRootContext = {
  id: Ref<string | undefined>;
  name: Ref<string | undefined>;
  minValue: Ref<DateValue | undefined>;
  maxValue: Ref<DateValue | undefined>;
  hourCycle: Ref<HourCycle | undefined>;
  granularity: Ref<Granularity | undefined>;
  hideTimeZone: Ref<boolean>;
  required: Ref<boolean>;
  locale: Ref<string>;
  dateFieldRef: Ref<InstanceType<typeof ADateFieldRoot> | undefined>;
  modelValue: Ref<DateValue | undefined>;
  placeholder: Ref<DateValue>;
  pagedNavigation: Ref<boolean>;
  preventDeselect: Ref<boolean>;
  weekStartsOn: Ref<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  weekdayFormat: Ref<WeekDayFormat>;
  fixedWeeks: Ref<boolean>;
  numberOfMonths: Ref<number>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  isDateDisabled?: DateMatcher;
  isDateUnavailable?: DateMatcher;
  defaultOpen: Ref<boolean>;
  open: Ref<boolean>;
  modal: Ref<boolean>;
  onDateChange: (date: DateValue | undefined) => void;
  onPlaceholderChange: (date: DateValue) => void;
  dir: Ref<Direction>;
  step: Ref<DateStep | undefined>;
  closeOnSelect: Ref<boolean>;
};

export type ADatePickerRootProps = Omit<ADateFieldRootProps, 'as' | 'asChild'> & APopoverRootProps & Pick<ACalendarRootProps, 'fixedWeeks' | 'isDateDisabled' | 'numberOfMonths' | 'pagedNavigation' | 'preventDeselect' | 'weekdayFormat' | 'weekStartsOn'> & {
  /** Whether or not to close the popover on date select */
  closeOnSelect?: boolean;
};

export type ADatePickerRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateValue | undefined];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
};

export const [
  injectADatePickerRootContext,
  provideDatePickerRootContext,
] = createContext<DatePickerRootContext>('ADatePickerRoot');
</script>

<script setup lang="ts">
import { isSameDay } from '@internationalized/date';
import { useVModel } from '@vueuse/core';
import { computed, ref, toRefs, watch } from 'vue';
import { APopoverRoot } from '..';
import { getDefaultDate } from '../shared/date';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ADatePickerRootProps>(),
  {
    defaultValue: undefined,
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
    placeholder: undefined,
    locale: 'en',
    isDateDisabled: undefined,
    isDateUnavailable: undefined,
    closeOnSelect: false,
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
  step,
  closeOnSelect,
} = toRefs(props);

const dir = useDirection(propDir);

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: defaultValue.value,
  passive: (props.modelValue === undefined) as false,
}) as Ref<DateValue | undefined>;

const defaultDate = computed(() => getDefaultDate({
  defaultPlaceholder: props.placeholder,
  granularity: props.granularity,
  defaultValue: modelValue.value,
  locale: props.locale,
}));

const placeholder = useVModel(props, 'placeholder', emits, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.value.copy(),
  passive: (props.placeholder === undefined) as false,
}) as Ref<DateValue>;

const open = useVModel(props, 'open', emits, {
  defaultValue: defaultOpen.value,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>;

const dateFieldRef = ref<InstanceType<typeof ADateFieldRoot> | undefined>();

watch(
  modelValue,
  (value) => {
    if (value && value.compare(placeholder.value) !== 0) {
      placeholder.value = value.copy();
    }

    if (closeOnSelect.value) {
      open.value = false;
    }
  },
);

provideDatePickerRootContext({
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
  step,
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
    placeholder.value = date.copy();
  },
  closeOnSelect,
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
