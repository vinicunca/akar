<script lang="ts">
import type { Ref } from 'vue';

import { type DateValue, getLocalTimeZone, isEqualDay, Time, toCalendarDateTime, today } from '@internationalized/date';
import { KEY_CODES } from '@vinicunca/perkakas';

import type { APrimitiveProps } from '~~/a-primitive';
import type {
  DateTimeSegmentPart,
  DateTimeSegmentValueObj,
  HourCycle,
  TimeValue,
  UseDateFormatter,
} from '~~/date';
import type { Direction, FormFieldProps } from '~~/shared/types';

import { createContext } from '~~/shared';

type ATimeFieldRootContext = {
  disabled: Ref<boolean>;
  elements: Ref<Set<HTMLElement>>;
  focusNext: () => void;
  formatter: UseDateFormatter;
  hourCycle: HourCycle;
  isInvalid: Ref<boolean>;
  locale: Ref<string>;
  modelValue: Ref<DateValue | undefined>;
  placeholder: Ref<DateValue>;
  readonly: Ref<boolean>;
  segmentContents: Ref<Array<{ part: DateTimeSegmentPart; value: string }>>;
  segmentValues: Ref<DateTimeSegmentValueObj>;
  setFocusedElement: (el: HTMLElement) => void;
};

export interface ATimeFieldRootProps extends APrimitiveProps, FormFieldProps {
  /** The default placeholder date */
  defaultPlaceholder?: TimeValue;
  /** The default value for the calendar */
  defaultValue?: TimeValue;
  /** The reading direction of the time field when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** Whether or not the time field is disabled */
  disabled?: boolean;
  /** The granularity to use for formatting times. Defaults to minute if a Time is provided, otherwise defaults to minute. The field will render segments for each part of the date up to and including the specified granularity */
  granularity?: 'hour' | 'minute' | 'second';
  /** Whether or not to hide the time zone segment of the field */
  hideTimeZone?: boolean;
  /** The hour cycle used for formatting times. Defaults to the local preference */
  hourCycle?: HourCycle;
  /** Id of the element */
  id?: string;
  /** The locale to use for formatting dates */
  locale?: string;
  /** The maximum date that can be selected */
  maxValue?: TimeValue;
  /** The minimum date that can be selected */
  minValue?: TimeValue;
  /** The controlled checked state of the field. Can be bound as `v-model`. */
  modelValue?: TimeValue | undefined;
  /** The placeholder date, which is used to determine what time to display when no time is selected. This updates as the user navigates the field */
  placeholder?: TimeValue;
  /** Whether or not the time field is readonly */
  readonly?: boolean;
}

export type ATimeFieldRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: TimeValue | undefined];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: TimeValue];
};

export const [
  injectATimeFieldRootContext,
  provideATimeFieldRootContext,
] = createContext<ATimeFieldRootContext>('TimeFieldRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, nextTick, onMounted, ref, toRefs, watch } from 'vue';

import { APrimitive, usePrimitiveElement } from '~~/a-primitive';
import { AVisuallyHidden } from '~~/a-visually-hidden';
import { createDateContent, getDefaultTime, getTimeFieldSegmentElements, initializeTimeSegmentValues, isDateBefore, isSegmentNavigationKey, syncTimeSegmentValues, useDateFormatter } from '~~/date';
import { useDirection, useLocale } from '~~/shared';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ATimeFieldRootProps>(),
  {
    defaultValue: undefined,
    disabled: false,
    readonly: false,
    placeholder: undefined,
    isDateUnavailable: undefined,
  },
);

const emits = defineEmits<ATimeFieldRootEmits>();

defineSlots<{
  default: (props: {
    /** Value if the input is invalid */
    isInvalid: boolean;
    /** The current time of the field */
    modelValue: TimeValue | undefined;
    /** The time field segment contents */
    segments: Array<{ part: DateTimeSegmentPart; value: string }>;
  }) => any;
}>();

function convertValue(value: TimeValue, date: DateValue = today(getLocalTimeZone())) {
  if (value && 'day' in value) {
    return value;
  }

  return toCalendarDateTime(date, value);
}

const { disabled, readonly, granularity, defaultValue, minValue, maxValue, dir: propDir, locale: propLocale } = toRefs(props);
const locale = useLocale(propLocale);
const dir = useDirection(propDir);

const formatter = useDateFormatter(locale.value);
const { primitiveElement, currentElement: parentElement }
  = usePrimitiveElement();
const segmentElements = ref<Set<HTMLElement>>(new Set());

const convertedMinValue = computed(() => minValue.value ? convertValue(minValue.value) : undefined);
const convertedMaxValue = computed(() => maxValue.value ? convertValue(maxValue.value) : undefined);

onMounted(() => {
  getTimeFieldSegmentElements(parentElement.value)
    .forEach((item) => {
      segmentElements.value.add(item as HTMLElement);
    });
});

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: defaultValue.value,
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<TimeValue>;

const convertedModelValue = computed({
  get() {
    return convertValue(modelValue.value);
  },
  set(newValue) {
    if (newValue) {
      modelValue.value = modelValue.value && 'day' in modelValue.value
        ? newValue
        : new Time(newValue.hour, newValue.minute, newValue.second, modelValue.value?.millisecond);
    }

    return newValue;
  },
});

const defaultDate = getDefaultTime({
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
) as Ref<TimeValue>;

const convertedPlaceholder = computed({
  get() {
    return convertValue(placeholder.value);
  },
  set(newValue) {
    if (newValue) {
      placeholder.value = 'day' in placeholder.value
        ? newValue.copy()
        : new Time(newValue.hour, newValue.minute, newValue.second, placeholder.value?.millisecond);
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

const initialSegments = initializeTimeSegmentValues();

const segmentValues = ref<DateTimeSegmentValueObj>(
  modelValue.value
    ? {
        ...syncTimeSegmentValues({
          value: convertedModelValue.value,
          formatter,
        }),
      }
    : { ...initialSegments },
);

const allSegmentContent = computed(() => createDateContent({
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

watch(
  locale,
  (value) => {
    if (formatter.getLocale() !== value) {
      formatter.setLocale(value);
      // Locale changed, so we need to clear the segment elements and re-get them (different order)
      // Get the focusable elements again on the next tick
      nextTick(() => {
        segmentElements.value.clear();
        getTimeFieldSegmentElements(parentElement.value)
          .forEach((item) => {
            segmentElements.value.add(item as HTMLElement);
          });
      });
    }
  },
);

watch(
  convertedModelValue,
  (_modelValue) => {
    if (
      _modelValue !== undefined
      && (
        !isEqualDay(convertedPlaceholder.value, _modelValue)
        || convertedPlaceholder.value.compare(_modelValue) !== 0
      )
    ) {
      placeholder.value = _modelValue.copy();
    }
  },
);

watch(
  [convertedModelValue, locale],
  ([_modelValue]) => {
    if (_modelValue !== undefined) {
      segmentValues.value = { ...syncTimeSegmentValues({ value: _modelValue, formatter }) };
    } else if (Object.values(segmentValues.value).every((value) => value === null)) {
      segmentValues.value = { ...initialSegments };
    }
  },
);

const currentFocusedElement = ref<HTMLElement | null>(null);

const currentSegmentIndex = computed(() =>
  Array.from(segmentElements.value).findIndex((el) =>
    el.getAttribute('data-akar-time-field-segment')
    === currentFocusedElement.value?.getAttribute('data-akar-time-field-segment')));

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

provideATimeFieldRootContext({
  locale,
  modelValue: convertedModelValue,
  placeholder: convertedPlaceholder,
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
