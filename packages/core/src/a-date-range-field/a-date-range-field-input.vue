<script lang="ts">
import { computed, ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';
import type { DateTimeSegmentPart } from '~~/date';

import { useDateField } from '~~/a-date-field/use-date-field';

import type { ADateRangeType } from './a-date-range-field-root.vue';

export interface ADateRangeFieldInputProps extends APrimitiveProps {
  /** The part of the date to render */
  part: DateTimeSegmentPart;
  /** The type of field to render (start or end) */
  type: ADateRangeType;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

import { injectADateRangeFieldRootContext } from './a-date-range-field-root.vue';

const props = defineProps<ADateRangeFieldInputProps>();

const rootContext = injectADateRangeFieldRootContext();

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
    :as="as"
    :as-child="asChild"
    v-bind="attributes"
    :contenteditable="disabled || readonly ? false : part !== 'literal'"
    :data-akar-date-field-segment="part"
    :aria-disabled="disabled ? true : undefined"
    :aria-readonly="readonly ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-akar-date-range-field-segment-type="type"
    :data-invalid="isInvalid ? '' : undefined"
    :aria-invalid="isInvalid ? true : undefined"
    v-on="part !== 'literal' ? {
      mousedown: handleSegmentClick,
      keydown: handleSegmentKeydown,
      focusout: () => { hasLeftFocus = true },
      focusin: (event: FocusEvent) => {
        rootContext.setFocusedElement(event.target as HTMLElement)
      },
    } : {}"
  >
    <slot />
  </APrimitive>
</template>
