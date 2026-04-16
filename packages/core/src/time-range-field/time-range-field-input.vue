<script lang="ts">
import type { DateRangeType } from '../date-range-field/date-range-field-root.vue';
import type { APrimitiveProps } from '../primitive';
import type { SegmentPart } from '../shared/date';

export interface ATimeRangeFieldInputProps extends APrimitiveProps {
  /** The part of the date to render */
  part: SegmentPart;
  /** The type of field to render (start or end) */
  type: DateRangeType;
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { APrimitive } from '../primitive';
import { useDateField } from '../shared/date/use-date-field';
import { injectATimeRangeFieldRootContext } from './time-range-field-root.vue';

const props = defineProps<ATimeRangeFieldInputProps>();

const rootContext = injectATimeRangeFieldRootContext();

const hasLeftFocus = ref(true);
const lastKeyZero = ref(false);

const {
  handleSegmentClick,
  handleSegmentKeydown,
  attributes,
} = useDateField({
  hasLeftFocus,
  lastKeyZero,
  placeholder: rootContext.placeholder,
  hourCycle: rootContext.hourCycle,
  step: rootContext.step,
  segmentValues: rootContext.segmentValues[props.type],
  formatter: rootContext.formatter,
  part: props.part,
  disabled: rootContext.disabled,
  readonly: rootContext.readonly,
  focusNext: rootContext.focusNext,
  modelValue: props.type === 'start' ? rootContext.startValue : rootContext.endValue,
});

const disabled = computed(() => rootContext.disabled.value);
const readonly = computed(() => rootContext.readonly.value);
const isInvalid = computed(() => rootContext.isInvalid.value);
</script>

<template>
  <APrimitive
    :as="props.as"
    :as-child="asChild"
    v-bind="attributes"
    :contenteditable="disabled || readonly ? false : part !== 'literal'"
    :data-akar-time-field-segment="part"
    :data-akar-time-range-field-segment-type="type"
    :aria-disabled="disabled ? true : undefined"
    :aria-readonly="readonly ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :aria-invalid="isInvalid ? true : undefined"
    v-on="part !== 'literal' ? {
      mousedown: handleSegmentClick,
      keydown: handleSegmentKeydown,
      focusout: () => { hasLeftFocus = true },
      focusin: (e: FocusEvent) => {
        rootContext.setFocusedElement(e.target as HTMLElement)
      },
    } : {}"
  >
    <slot />
  </APrimitive>
</template>
