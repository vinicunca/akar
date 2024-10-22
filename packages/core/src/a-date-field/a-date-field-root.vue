<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { Ref } from 'vue';

import { KEY_CODES } from '@vinicunca/perkakas';
import { useVModel } from '@vueuse/core';

import type { APrimitiveProps } from '~~/a-primitive';
import type { DateMatcher, DateTimeGranularity, DateTimeSegmentValueObj, HourCycle, UseDateFormatter } from '~~/date';

import { createContext, type Direction, type FormFieldProps, useDirection, useLocale } from '~~/shared';

type ADateFieldRootContext = {
  disabled: Ref<boolean>;
  elements: Ref<Set<HTMLElement>>;
  focusNext: () => void;
  formatter: UseDateFormatter;
  hourCycle: HourCycle;
  isDateUnavailable?: DateMatcher;
  isInvalid: Ref<boolean>;
  locale: Ref<string>;
  modelValue: Ref<DateValue | undefined>;
  placeholder: Ref<DateValue>;
  readonly: Ref<boolean>;
  segmentContents: Ref<Array<{ part: DateTimeSegmentPart; value: string }>>;
  segmentValues: Ref<DateTimeSegmentValueObj>;
  setFocusedElement: (el: HTMLElement) => void;
};

export interface ADateFieldRootProps extends APrimitiveProps, FormFieldProps {
  /** The default placeholder date */
  defaultPlaceholder?: DateValue;
  /** The default value for the calendar */
  defaultValue?: DateValue;
  /** The reading direction of the date field when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** Whether or not the date field is disabled */
  disabled?: boolean;
  /** The granularity to use for formatting times. Defaults to day if a CalendarDate is provided, otherwise defaults to minute. The field will render segments for each part of the date up to and including the specified granularity */
  granularity?: DateTimeGranularity;
  /** Whether or not to hide the time zone segment of the field */
  hideTimeZone?: boolean;
  /** The hour cycle used for formatting times. Defaults to the local preference */
  hourCycle?: HourCycle;
  /** Id of the element */
  id?: string;
  /** A function that returns whether or not a date is unavailable */
  isDateUnavailable?: DateMatcher;
  /** The locale to use for formatting dates */
  locale?: string;
  /** The maximum date that can be selected */
  maxValue?: DateValue;
  /** The minimum date that can be selected */
  minValue?: DateValue;
  /** The controlled checked state of the calendar. Can be bound as `v-model`. */
  modelValue?: DateValue | undefined;
  /** The placeholder date, which is used to determine what month to display when no date is selected. This updates as the user navigates the calendar and can be used to programmatically control the calendar view */
  placeholder?: DateValue;
  /** Whether or not the date field is readonly */
  readonly?: boolean;
}

export type ADateFieldRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateValue | undefined];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
};

export const [
  injectADateFieldRootContext,
  provideADateFieldRootContext,
] = createContext<ADateFieldRootContext>('ADateFieldRoot');
</script>

<script lang="ts" setup>
import { isEqualDay } from '@internationalized/date';
import { computed, nextTick, onMounted, ref, toRefs, watch } from 'vue';

import { APrimitive, usePrimitiveElement } from '~~/a-primitive';
import { AVisuallyHidden } from '~~/a-visually-hidden';
import { type DateTimeSegmentPart, getDefaultDate, hasTime, isDateBefore, useDateFormatter } from '~~/date';

import { createDateContent, getDateSegmentElements, initializeSegmentValues, isSegmentNavigationKey, syncSegmentValues } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ADateFieldRootProps>(),
  {
    disabled: false,
    readonly: false,
  },
);

const emits = defineEmits<ADateFieldRootEmits>();

defineSlots<{
  default: (props: {
    /** Value if the input is invalid */
    isInvalid: boolean;
    /** The current date of the field */
    modelValue: DateValue | undefined;
    /** The date field segment contents */
    segments: Array<{ part: DateTimeSegmentPart; value: string }>;
  }) => any;
}>();

const {
  isDateUnavailable: propsIsDateUnavailable,
  defaultValue,
  dir: propDir,
  granularity,
  locale: propLocale,
  disabled,
  readonly,
} = toRefs(props);

const locale = useLocale(propLocale);
const dir = useDirection(propDir);

const formatter = useDateFormatter(locale.value);
const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
const segmentElements = ref<Set<HTMLElement>>(new Set());

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: defaultValue.value,
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<DateValue>;

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  granularity: granularity.value,
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

const inferredGranularity = computed(() => {
  if (props.granularity) {
    return !hasTime(placeholder.value)
      ? 'day'
      : props.granularity;
  }

  return hasTime(placeholder.value)
    ? 'minute'
    : 'day';
});

const isInvalid = computed(() => {
  if (!modelValue.value) {
    return false;
  }

  if (propsIsDateUnavailable.value?.(modelValue.value)) {
    return true;
  }

  if (
    props.minValue
    && isDateBefore(modelValue.value, props.minValue)
  ) {
    return true;
  }

  return Boolean(
    props.maxValue
    && isDateBefore(props.maxValue, modelValue.value),
  );
});

const initialSegments = initializeSegmentValues(inferredGranularity.value);

const segmentValues = ref<DateTimeSegmentValueObj>(modelValue.value
  ? { ...syncSegmentValues({ value: modelValue.value, formatter }) }
  : { ...initialSegments });

const allSegmentContent = computed(() => createDateContent({
  granularity: inferredGranularity.value,
  dateRef: placeholder.value,
  formatter,
  hideTimeZone: props.hideTimeZone,
  hourCycle: props.hourCycle,
  segmentValues: segmentValues.value,
  locale,
}));

const segmentContents = computed(() => allSegmentContent.value.arr);

const editableSegmentContents = computed(() =>
  segmentContents.value.filter(({ part }) => part !== 'literal'),
);

const currentFocusedElement = ref<HTMLElement | null>(null);

const currentSegmentIndex = computed(() => {
  return Array
    .from(segmentElements.value)
    .findIndex((el) => {
      return el.getAttribute('data-akar-date-field-segment')
        === currentFocusedElement.value?.getAttribute('data-akar-date-field-segment');
    });
});

const prevFocusableSegment = computed(() => {
  const sign = dir.value === 'rtl' ? -1 : 1;
  const prevCondition = sign > 0
    ? currentSegmentIndex.value < 0
    : currentSegmentIndex.value > segmentElements.value.size - 1;

  if (prevCondition) {
    return null;
  }

  return Array.from(segmentElements.value)[currentSegmentIndex.value - sign];
});

const nextFocusableSegment = computed(() => {
  const sign = dir.value === 'rtl' ? -1 : 1;
  const nextCondition = sign < 0
    ? currentSegmentIndex.value < 0
    : currentSegmentIndex.value > segmentElements.value.size - 1;

  if (nextCondition) {
    return null;
  }

  return Array.from(segmentElements.value)[currentSegmentIndex.value + sign];
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

watch(
  locale,
  (value) => {
    if (formatter.getLocale() !== value) {
      formatter.setLocale(value);
      /**
       * Locale changed, so we need to clear the segment elements and
       * re-get them in a different order.
       * We also need to get the focusable elements again on the next tick
       */
      nextTick(() => {
        segmentElements.value.clear();
        addSegmentElements();
      });
    }
  },
);

watch(
  modelValue,
  (modelValue_) => {
    if (
      modelValue_ !== undefined
      && (
        !isEqualDay(placeholder.value, modelValue_)
        || placeholder.value.compare(modelValue_) !== 0
      )
    ) {
      placeholder.value = modelValue_.copy();
    }
  },
);

watch(
  [modelValue, locale],
  ([modelValue_]) => {
    if (modelValue_ !== undefined) {
      segmentValues.value = { ...syncSegmentValues({ value: modelValue_, formatter }) };
    } else if (Object.values(segmentValues.value).every((value) => value === null)) {
      segmentValues.value = { ...initialSegments };
    }
  },
);

function addSegmentElements() {
  getDateSegmentElements(parentElement.value).forEach((item) => {
    segmentElements.value.add(item as HTMLElement);
  });
}

onMounted(() => {
  addSegmentElements();
});

provideADateFieldRootContext({
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
