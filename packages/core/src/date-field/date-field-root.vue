<script lang="ts">
import type { DateValue } from '@internationalized/date';

import type { Ref } from 'vue';
import type { DateMatcher } from '~~/date';
import type { APrimitiveProps } from '~~/primitive';
import type { UseDateFormatter } from '~~/shared';
import type { Granularity, HourCycle, SegmentPart, SegmentValueObj } from '~~/shared/date';
import type { Direction, FormFieldProps } from '~~/shared/types';
import { isNullish, KEY_CODES } from '@vinicunca/perkakas';
import { hasTime, isDateBefore } from '~~/date';
import { createContext, useDateFormatter, useDirection, useLocale } from '~~/shared';
import { getDefaultDate } from '~~/shared/date';
import { createContent, getSegmentElements, initializeSegmentValues, isSegmentNavigationKey, syncSegmentValues } from '~~/shared/date';

type DateFieldRootContext = {
  locale: Ref<string>;
  modelValue: Ref<DateValue | undefined>;
  placeholder: Ref<DateValue>;
  isDateUnavailable?: DateMatcher;
  isInvalid: Ref<boolean>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  formatter: UseDateFormatter;
  hourCycle: HourCycle;
  segmentValues: Ref<SegmentValueObj>;
  segmentContents: Ref<Array<{ part: SegmentPart; value: string }>>;
  elements: Ref<Set<HTMLElement>>;
  focusNext: () => void;
  setFocusedElement: (el: HTMLElement) => void;
};

export interface ADateFieldRootProps extends APrimitiveProps, FormFieldProps {
  /** The default value for the calendar */
  defaultValue?: DateValue;
  /** The default placeholder date */
  defaultPlaceholder?: DateValue;
  /** The placeholder date, which is used to determine what month to display when no date is selected. This updates as the user navigates the calendar and can be used to programmatically control the calendar view */
  placeholder?: DateValue;
  /** The controlled checked state of the calendar. Can be bound as `v-model`. */
  modelValue?: DateValue | null;
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

export type ADateFieldRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateValue | undefined];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
};

export const [
  injectADateFieldRootContext,
  provideDateFieldRootContext,
] = createContext<DateFieldRootContext>('ADateFieldRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, nextTick, onMounted, ref, toRefs, watch } from 'vue';
import { APrimitive, usePrimitiveElement } from '~~/primitive';
import { AVisuallyHidden } from '~~/visually-hidden';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ADateFieldRootProps>(), {
  defaultValue: undefined,
  disabled: false,
  readonly: false,
  placeholder: undefined,
  isDateUnavailable: undefined,
});
const emits = defineEmits<ADateFieldRootEmits>();
defineSlots<{
  default?: (props: {
    /** The current date of the field */
    modelValue: DateValue | undefined;
    /** The date field segment contents */
    segments: Array<{ part: SegmentPart; value: string }>;
    /** Value if the input is invalid */
    isInvalid: boolean;
  }) => any;
}>();

const { disabled, readonly, isDateUnavailable: propsIsDateUnavailable, granularity, defaultValue, dir: propDir, locale: propLocale } = toRefs(props);
const locale = useLocale(propLocale);
const dir = useDirection(propDir);

const formatter = useDateFormatter(locale.value);
const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
const segmentElements = ref<Set<HTMLElement>>(new Set());

onMounted(() => {
  getSegmentElements(parentElement.value).forEach((item) => {
    segmentElements.value.add(item as HTMLElement);
  });
});

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: defaultValue.value,
  passive: (props.modelValue === undefined) as false,
}) as Ref<DateValue>;

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  granularity: granularity.value,
  defaultValue: modelValue.value,
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

const isInvalid = computed(() => {
  if (!modelValue.value) {
    return false;
  }

  if (propsIsDateUnavailable.value?.(modelValue.value)) {
    return true;
  }

  if (props.minValue && isDateBefore(modelValue.value, props.minValue)) {
    return true;
  }

  return Boolean(
    props.maxValue
    && isDateBefore(props.maxValue, modelValue.value),
  );
});

const initialSegments = initializeSegmentValues(inferredGranularity.value);

const segmentValues = ref<SegmentValueObj>(modelValue.value ? { ...syncSegmentValues({ value: modelValue.value, formatter }) } : { ...initialSegments });

const allSegmentContent = computed(() => createContent({
  granularity: inferredGranularity.value,
  dateRef: placeholder.value,
  formatter,
  hideTimeZone: props.hideTimeZone,
  hourCycle: props.hourCycle,
  segmentValues: segmentValues.value,
  locale,
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
      getSegmentElements(parentElement.value).forEach((item) => {
        segmentElements.value.add(item as HTMLElement);
      });
    });
  }
});

watch(
  modelValue,
  (modelValue_) => {
    if (
      !isNullish(modelValue_)
      && placeholder.value.compare(modelValue_) !== 0
    ) {
      placeholder.value = modelValue_.copy();
    }
  },
);

watch(
  [modelValue, locale],
  ([modelValue_]) => {
    if (!isNullish(modelValue_)) {
      segmentValues.value = { ...syncSegmentValues({ value: modelValue_, formatter }) };
    } else if (
      // If segment has null value, means that user modified it, there fore do not reset the segmentValues
      Object.values(segmentValues.value).every((value) => value !== null)
      && isNullish(modelValue_)
    ) {
      segmentValues.value = { ...initialSegments };
    }
  },
);

const currentFocusedElement = ref<HTMLElement | null>(null);

const currentSegmentIndex = computed(() =>
  Array.from(segmentElements.value).findIndex((el) =>
    el.getAttribute('data-akar-date-field-segment')
    === currentFocusedElement.value?.getAttribute('data-akar-date-field-segment')));

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

provideDateFieldRootContext({
  isDateUnavailable: propsIsDateUnavailable.value,
  locale,
  modelValue,
  placeholder,
  disabled,
  formatter,
  hourCycle: props.hourCycle,
  readonly,
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
