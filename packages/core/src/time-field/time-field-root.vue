<script lang="ts">
import type { DateValue } from '@internationalized/date';

import type { Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { UseDateFormatter } from '~~/shared';
import type { DateStep, HourCycle, SegmentPart, SegmentValueObj, TimeValue } from '~~/shared/date';
import type { Direction, FormFieldProps } from '~~/shared/types';
import { getLocalTimeZone, isEqualDay, Time, toCalendarDateTime, today } from '@internationalized/date';
import { isNullish, KEY_CODES } from '@vinicunca/perkakas';
import { isDateBefore } from '~~/date';
import {
  createContext,
  useDateFormatter,
  useDirection,
  useLocale,
} from '~~/shared';
import {
  createContent,
  getDefaultTime,
  getTimeFieldSegmentElements,
  initializeTimeSegmentValues,
  isSegmentNavigationKey,
  normalizeDateStep,
  syncTimeSegmentValues,
} from '~~/shared/date';

type TimeFieldRootContext = {
  locale: Ref<string>;
  modelValue: Ref<DateValue | undefined>;
  placeholder: Ref<DateValue>;
  isInvalid: Ref<boolean>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  formatter: UseDateFormatter;
  hourCycle: HourCycle;
  step: Ref<DateStep>;
  segmentValues: Ref<SegmentValueObj>;
  segmentContents: Ref<Array<{ part: SegmentPart; value: string }>>;
  elements: Ref<Set<HTMLElement>>;
  focusNext: () => void;
  setFocusedElement: (el: HTMLElement) => void;
};

export interface ATimeFieldRootProps extends APrimitiveProps, FormFieldProps {
  /** The default value for the calendar */
  defaultValue?: TimeValue;
  /** The default placeholder date */
  defaultPlaceholder?: TimeValue;
  /** The placeholder date, which is used to determine what time to display when no time is selected. This updates as the user navigates the field */
  placeholder?: TimeValue;
  /** The controlled checked state of the field. Can be bound as `v-model`. */
  modelValue?: TimeValue | null;
  /** The hour cycle used for formatting times. Defaults to the local preference */
  hourCycle?: HourCycle;
  /** The stepping interval for the time fields. Defaults to `1`. */
  step?: DateStep;
  /** The granularity to use for formatting times. Defaults to minute if a Time is provided, otherwise defaults to minute. The field will render segments for each part of the date up to and including the specified granularity */
  granularity?: 'hour' | 'minute' | 'second';
  /** Whether or not to hide the time zone segment of the field */
  hideTimeZone?: boolean;
  /** The maximum date that can be selected */
  maxValue?: TimeValue;
  /** The minimum date that can be selected */
  minValue?: TimeValue;
  /** The locale to use for formatting dates */
  locale?: string;
  /** Whether or not the time field is disabled */
  disabled?: boolean;
  /** Whether or not the time field is readonly */
  readonly?: boolean;
  /** Id of the element */
  id?: string;
  /** The reading direction of the time field when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
}

export type ATimeFieldRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: TimeValue | undefined];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: TimeValue];
};

export const [injectATimeFieldRootContext, provideTimeFieldRootContext]
  = createContext<TimeFieldRootContext>('ATimeFieldRoot');

function convertValue(value: TimeValue, date: DateValue = today(getLocalTimeZone())) {
  if (value && 'day' in value) {
    return value;
  }

  return toCalendarDateTime(date, value);
}
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, nextTick, onMounted, ref, toRefs, watch } from 'vue';
import { APrimitive, usePrimitiveElement } from '~~/primitive';
import { AVisuallyHidden } from '~~/visually-hidden';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ATimeFieldRootProps>(), {
  defaultValue: undefined,
  disabled: false,
  readonly: false,
  placeholder: undefined,
  isDateUnavailable: undefined,
});
const emits = defineEmits<ATimeFieldRootEmits>();
defineSlots<{
  default?: (props: {
    /** The current time of the field */
    modelValue: TimeValue | undefined;
    /** The time field segment contents */
    segments: Array<{ part: SegmentPart; value: string }>;
    /** Value if the input is invalid */
    isInvalid: boolean;
  }) => any;
}>();

const { disabled, readonly, granularity, defaultValue, minValue, maxValue, dir: propDir, locale: propLocale } = toRefs(props);
const locale = useLocale(propLocale);
const dir = useDirection(propDir);

const formatter = useDateFormatter(locale.value);
const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
const segmentElements = ref<Set<HTMLElement>>(new Set());

const step = computed(() => normalizeDateStep(props));

const convertedMinValue = computed(() => minValue.value ? convertValue(minValue.value) : undefined);
const convertedMaxValue = computed(() => maxValue.value ? convertValue(maxValue.value) : undefined);

onMounted(() => {
  getTimeFieldSegmentElements(parentElement.value).forEach((item) => {
    segmentElements.value.add(item as HTMLElement);
  });
});

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: defaultValue.value,
  passive: (props.modelValue === undefined) as false,
}) as Ref<TimeValue>;

const convertedModelValue = computed({
  get() {
    if (isNullish(modelValue.value)) {
      return modelValue.value;
    }

    return convertValue(modelValue.value);
  },
  set(newValue) {
    if (newValue) {
      modelValue.value = modelValue.value && 'day' in modelValue.value ? newValue : new Time(newValue.hour, newValue.minute, newValue.second, modelValue.value?.millisecond);
    } else {
      modelValue.value = newValue;
    }

    return newValue;
  },
});

const defaultDate = getDefaultTime({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value,
});

const placeholder = useVModel(props, 'placeholder', emits, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
  passive: (props.placeholder === undefined) as false,
}) as Ref<TimeValue>;

const convertedPlaceholder = computed({
  get() {
    return convertValue(placeholder.value);
  },
  set(newValue) {
    if (newValue) {
      placeholder.value = 'day' in placeholder.value ? newValue.copy() : new Time(newValue.hour, newValue.minute, newValue.second, placeholder.value?.millisecond);
    }
    return newValue;
  },
});

const inferredGranularity = computed(() => {
  if (granularity.value) {
    return granularity.value;
  }

  return 'minute';
});

const isInvalid = computed(() => {
  if (!modelValue.value) {
    return false;
  }

  if (convertedMinValue.value && isDateBefore(convertedModelValue.value, convertedMinValue.value)) {
    return true;
  }

  // eslint-disable-next-line sonar/prefer-single-boolean-return
  if (convertedMaxValue.value && isDateBefore(convertedMaxValue.value, convertedModelValue.value)) {
    return true;
  }

  return false;
});

const initialSegments = initializeTimeSegmentValues(inferredGranularity.value);

const segmentValues = ref<SegmentValueObj>(modelValue.value ? { ...syncTimeSegmentValues({ value: convertedModelValue.value, formatter }) } : { ...initialSegments });

const allSegmentContent = computed(() => createContent({
  granularity: inferredGranularity.value,
  dateRef: convertedPlaceholder.value,
  formatter,
  hideTimeZone: props.hideTimeZone,
  hourCycle: props.hourCycle,
  segmentValues: segmentValues.value,
  locale,
  isTimeValue: true,
}));

const segmentContents = computed(() => allSegmentContent.value.arr);

const editableSegmentContents = computed(() => segmentContents.value.filter(({ part }) => part !== 'literal'));

watch(locale, (value) => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
    // Locale changed, so we need to clear the segment elements and re-get them (different order)
    // Get the focusable elements again on the next tick
    nextTick(() => {
      segmentElements.value.clear();
      getTimeFieldSegmentElements(parentElement.value).forEach((item) => {
        segmentElements.value.add(item as HTMLElement);
      });
    });
  }
});

watch(
  convertedModelValue,
  (modelValue_) => {
    if (
      !isNullish(modelValue_)
      && (!isEqualDay(convertedPlaceholder.value, modelValue_) || convertedPlaceholder.value.compare(modelValue_) !== 0)
    ) {
      placeholder.value = modelValue_.copy();
    }
  },
);

watch([convertedModelValue, locale], ([modelValue_]) => {
  if (!isNullish(modelValue_)) {
    segmentValues.value = { ...syncTimeSegmentValues({ value: modelValue_, formatter }) };
  } else if (Object.values(segmentValues.value).every((value) => value !== null) && isNullish(modelValue_)) {
    // If segment has null value, means that user modified it, thus do not reset the segmentValues
    segmentValues.value = { ...initialSegments };
  }
});

const currentFocusedElement = ref<HTMLElement | null>(null);

const currentSegmentIndex = computed(() =>
  Array.from(segmentElements.value).findIndex((el) =>
    el.getAttribute('data-akar-time-field-segment') === currentFocusedElement.value?.getAttribute('data-akar-time-field-segment'),
  ),
);

const nextFocusableSegment = computed(() => {
  const sign = dir.value === 'rtl' ? -1 : 1;
  const nextCondition = sign < 0 ? currentSegmentIndex.value < 0 : currentSegmentIndex.value > segmentElements.value.size - 1;
  if (nextCondition) {
    return null;
  }
  const segmentToFocus = Array.from(segmentElements.value)[currentSegmentIndex.value + sign];
  return segmentToFocus;
});

const prevFocusableSegment = computed(() => {
  const sign = dir.value === 'rtl' ? -1 : 1;
  const prevCondition = sign > 0 ? currentSegmentIndex.value < 0 : currentSegmentIndex.value > segmentElements.value.size - 1;
  if (prevCondition) {
    return null;
  }

  const segmentToFocus = Array.from(segmentElements.value)[currentSegmentIndex.value - sign];
  return segmentToFocus;
});

function handleKeydown(event: KeyboardEvent) {
  if (!isSegmentNavigationKey(event.key)) {
    return;
  }
  if (event.key === KEY_CODES.ARROW_LEFT) {
    prevFocusableSegment.value?.focus();
  }
  if (event.key === KEY_CODES.ARROW_RIGHT) {
    nextFocusableSegment.value?.focus();
  }
}

function setFocusedElement(el: HTMLElement) {
  currentFocusedElement.value = el;
}

provideTimeFieldRootContext({
  locale,
  modelValue: convertedModelValue,
  placeholder: convertedPlaceholder,
  disabled,
  formatter,
  hourCycle: props.hourCycle,
  readonly,
  step,
  segmentValues,
  isInvalid,
  segmentContents: editableSegmentContents,
  elements: segmentElements,
  setFocusedElement,
  focusNext() {
    nextFocusableSegment.value?.focus();
  },
});

defineExpose({
  /** Helper to set the focused element inside the DateField */
  setFocusedElement,
});
</script>

<template>
  <APrimitive
    v-bind="$attrs"
    ref="primitiveElement"
    role="group"
    :aria-disabled="disabled ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :dir="dir"
    @keydown.left.right="handleKeydown"
  >
    <slot
      :model-value="modelValue"
      :segments="segmentContents"
      :is-invalid="isInvalid"
    />

    <AVisuallyHidden
      :id="id"
      as="input"
      feature="focusable"
      tabindex="-1"
      :value="modelValue ? modelValue.toString() : ''"
      :name="name"
      :disabled="disabled"
      :required="required"
      @focus="Array.from(segmentElements)?.[0]?.focus()"
    />
  </APrimitive>
</template>
