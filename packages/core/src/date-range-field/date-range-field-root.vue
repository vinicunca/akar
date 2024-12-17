<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/primitive';
import type { Direction, FormFieldProps } from '~~/shared/types';
import { type DateValue, isEqualDay } from '@internationalized/date';
import { KEY_CODES } from '@vinicunca/perkakas';
import {
  areAllDaysBetweenValid,
  type DateMatcher,
  hasTime,
  isDateBefore,
  isDateBeforeOrSame,
} from '~~/date';
import { createContext, type UseDateFormatter, useDateFormatter, useDirection, useLocale } from '~~/shared';
import {
  createContent,
  type DateRange,
  getDefaultDate,
  getSegmentElements,
  type Granularity,
  type HourCycle,
  initializeSegmentValues,
  isSegmentNavigationKey,
  type SegmentPart,
  type SegmentValueObj,
  syncSegmentValues,
} from '~~/shared/date';

export type DateRangeType = 'end' | 'start';

type DateRangeFieldRootContext = {
  locale: Ref<string>;
  startValue: Ref<DateValue | undefined>;
  endValue: Ref<DateValue | undefined>;
  placeholder: Ref<DateValue>;
  isDateUnavailable?: DateMatcher;
  isInvalid: Ref<boolean>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  formatter: UseDateFormatter;
  hourCycle: HourCycle;
  segmentValues: Record<DateRangeType, Ref<SegmentValueObj>>;
  segmentContents: Ref<{ start: Array<{ part: SegmentPart; value: string }>; end: Array<{ part: SegmentPart; value: string }> }>;
  elements: Ref<Set<HTMLElement>>;
  focusNext: () => void;
  setFocusedElement: (el: HTMLElement) => void;
};

export interface ADateRangeFieldRootProps extends APrimitiveProps, FormFieldProps {
  /** The default value for the calendar */
  defaultValue?: DateRange;
  /** The default placeholder date */
  defaultPlaceholder?: DateValue;
  /** The placeholder date, which is used to determine what month to display when no date is selected. This updates as the user navigates the calendar and can be used to programmatically control the calendar view */
  placeholder?: DateValue;
  /** The controlled checked state of the calendar. Can be bound as `v-model`. */
  modelValue?: DateRange;
  /** The hour cycle used for formatting times. Defaults to the local preference */
  hourCycle?: HourCycle;
  /** The granularity to use for formatting times. Defaults to day if a CalendarDate is provided, otherwise defaults to minute. The field will render segments for each part of the date up to and including the specified granularity */
  granularity?: Granularity;
  /** Whether or not to hide the time zone segment of the field */
  hideTimeZone?: boolean;
  /** The maximum date that can be selected */
  maxValue?: DateValue;
  /** The minimum date that can be selected */
  minValue?: DateValue;
  /** The locale to use for formatting dates */
  locale?: string;
  /** Whether or not the date field is disabled */
  disabled?: boolean;
  /** Whether or not the date field is readonly */
  readonly?: boolean;
  /** A function that returns whether or not a date is unavailable */
  isDateUnavailable?: DateMatcher;
  /** Id of the element */
  id?: string;
  /** The reading direction of the date field when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
}

export type ADateRangeFieldRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [DateRange];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
};

export const [injectADateRangeFieldRootContext, provideDateRangeFieldRootContext]
  = createContext<DateRangeFieldRootContext>('ADateRangeFieldRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, nextTick, onMounted, ref, toRefs, watch } from 'vue';
import { APrimitive, usePrimitiveElement } from '~~/primitive';
import { AVisuallyHidden } from '~~/visually-hidden';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ADateRangeFieldRootProps>(), {
  defaultValue: undefined,
  disabled: false,
  readonly: false,
  placeholder: undefined,
  isDateUnavailable: undefined,
});
const emits = defineEmits<ADateRangeFieldRootEmits>();
const { disabled, readonly, isDateUnavailable: propsIsDateUnavailable, dir: propDir, locale: propLocale } = toRefs(props);
const locale = useLocale(propLocale);
const dir = useDirection(propDir);

const formatter = useDateFormatter(locale.value);
const { primitiveElement, currentElement: parentElement }
  = usePrimitiveElement();
const segmentElements = ref<Set<HTMLElement>>(new Set());

onMounted(() => {
  getSegmentElements(parentElement.value).forEach((item) => {
    segmentElements.value.add(item as HTMLElement);
  });
});

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue ?? { start: undefined, end: undefined },
  passive: (props.modelValue === undefined) as false,
}) as Ref<DateRange>;

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  granularity: props.granularity,
  defaultValue: modelValue.value.start,
  locale: props.locale,
});

const placeholder = useVModel(props, 'placeholder', emits, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
  passive: (props.placeholder === undefined) as false,
}) as Ref<DateValue>;

const inferredGranularity = computed(() => {
  if (props.granularity) {
    return !hasTime(placeholder.value) ? 'day' : props.granularity;
  }

  return hasTime(placeholder.value) ? 'minute' : 'day';
});

const isStartInvalid = computed(() => {
  if (!modelValue.value.start) {
    return false;
  }

  if (propsIsDateUnavailable.value?.(modelValue.value.start)) {
    return true;
  }

  if (props.minValue && isDateBefore(modelValue.value.start, props.minValue)) {
    return true;
  }

  return Boolean(
    props.maxValue
    && isDateBefore(props.maxValue, modelValue.value.start),
  );
});

const isEndInvalid = computed(() => {
  if (!modelValue.value.end) {
    return false;
  }

  if (propsIsDateUnavailable.value?.(modelValue.value.end)) {
    return true;
  }

  if (props.minValue && isDateBefore(modelValue.value.end, props.minValue)) {
    return true;
  }

  return Boolean(
    props.maxValue
    && isDateBefore(props.maxValue, modelValue.value.end),
  );
});

const isInvalid = computed(() => {
  if (isStartInvalid.value || isEndInvalid.value) {
    return true;
  }

  if (!modelValue.value.start || !modelValue.value.end) {
    return false;
  }

  if (!isDateBeforeOrSame(modelValue.value.start, modelValue.value.end)) {
    return true;
  }

  if (propsIsDateUnavailable.value !== undefined) {
    const allValid = areAllDaysBetweenValid({
      start: modelValue.value.start,
      end: modelValue.value.end,
      isUnavailable: propsIsDateUnavailable.value,
    });

    if (!allValid) {
      return true;
    }
  }
  return false;
});

const initialSegments = initializeSegmentValues(inferredGranularity.value);

const startSegmentValues = ref<SegmentValueObj>(modelValue.value.start ? { ...syncSegmentValues({ value: modelValue.value.start, formatter }) } : { ...initialSegments });
const endSegmentValues = ref<SegmentValueObj>(modelValue.value.end ? { ...syncSegmentValues({ value: modelValue.value.end, formatter }) } : { ...initialSegments });

const startSegmentContent = computed(() => createContent({
  granularity: inferredGranularity.value,
  dateRef: placeholder.value,
  formatter,
  hideTimeZone: props.hideTimeZone,
  hourCycle: props.hourCycle,
  segmentValues: startSegmentValues.value,
  locale,
}));

const endSegmentContent = computed(() => createContent({
  granularity: inferredGranularity.value,
  dateRef: placeholder.value,
  formatter,
  hideTimeZone: props.hideTimeZone,
  hourCycle: props.hourCycle,
  segmentValues: endSegmentValues.value,
  locale,
}));

const segmentContents = computed(() => ({
  start: startSegmentContent.value.arr,
  end: endSegmentContent.value.arr,
}));

const editableSegmentContents = computed(() => ({ start: segmentContents.value.start.filter(({ part }) => part !== 'literal'), end: segmentContents.value.end.filter(({ part }) => part !== 'literal') }));

const startValue = ref(modelValue.value.start?.copy()) as Ref<DateValue | undefined>;
const endValue = ref(modelValue.value.end?.copy()) as Ref<DateValue | undefined>;

watch([startValue, endValue], ([_startValue, _endValue]) => {
  modelValue.value = { start: _startValue?.copy(), end: _endValue?.copy() };
});

watch(modelValue, (_modelValue) => {
  if (_modelValue.start && _modelValue.end) {
    if (!startValue.value || _modelValue.start.compare(startValue.value) !== 0) {
      startValue.value = _modelValue.start.copy();
    }
    if (!endValue.value || _modelValue.end.compare(endValue.value) !== 0) {
      endValue.value = _modelValue.end.copy();
    }
  }
});

watch([startValue, locale], ([_startValue]) => {
  if (_startValue !== undefined) {
    startSegmentValues.value = { ...syncSegmentValues({ value: _startValue, formatter }) };
  } else if (Object.values(startSegmentValues.value).every((value) => value === null) || _startValue === undefined) {
    startSegmentValues.value = { ...initialSegments };
  }
});

watch(locale, (value) => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
    // Locale changed, so we need to clear the segment elements and re-get them (different order)
    // Get the focusable elements again on the next tick
    nextTick(() => {
      segmentElements.value.clear();
      getSegmentElements(parentElement.value).forEach((item) => {
        segmentElements.value.add(item as HTMLElement);
      });
    });
  }
});

watch(modelValue, (_modelValue) => {
  if (_modelValue.start !== undefined && (!isEqualDay(placeholder.value, _modelValue.start) || placeholder.value.compare(_modelValue.start) !== 0)) {
    placeholder.value = _modelValue.start.copy();
  }
});

watch([endValue, locale], ([_endValue]) => {
  if (_endValue !== undefined) {
    endSegmentValues.value = { ...syncSegmentValues({ value: _endValue, formatter }) };
  } else if (Object.values(endSegmentValues.value).every((value) => value === null) || _endValue === undefined) {
    endSegmentValues.value = { ...initialSegments };
  }
});

const currentFocusedElement = ref<HTMLElement | null>(null);

const currentSegmentIndex = computed(() => Array.from(segmentElements.value).findIndex((el) =>
  el.getAttribute('data-akar-date-field-segment') === currentFocusedElement.value?.getAttribute('data-akar-date-field-segment')
  && el.getAttribute('data-akar-date-range-field-segment-type') === currentFocusedElement.value?.getAttribute('data-akar-date-range-field-segment-type')));

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

provideDateRangeFieldRootContext({
  isDateUnavailable: propsIsDateUnavailable.value,
  locale,
  startValue,
  endValue,
  placeholder,
  disabled,
  formatter,
  hourCycle: props.hourCycle,
  readonly,
  segmentValues: { start: startSegmentValues, end: endSegmentValues },
  isInvalid,
  segmentContents: editableSegmentContents,
  elements: segmentElements,
  setFocusedElement,
  focusNext() {
    nextFocusableSegment.value?.focus();
  },
});

defineExpose({
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
    />

    <AVisuallyHidden
      :id="id"
      as="input"
      feature="focusable"
      tabindex="-1"
      :value="`${modelValue.start?.toString()} - ${modelValue.end?.toString()}`"
      :name="name"
      :disabled="disabled"
      :required="required"
      @focus="Array.from(segmentElements)?.[0]?.focus()"
    />
  </APrimitive>
</template>
