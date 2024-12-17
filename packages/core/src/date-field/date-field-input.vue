<script lang="ts">
import type { SegmentPart } from '~~/shared/date';
import { computed, ref } from 'vue';
import { APrimitive, type APrimitiveProps } from '~~/primitive';
import { useDateField } from '~~/shared/date/use-date-field';
import { injectADateFieldRootContext } from './date-field-root.vue';

export interface ADateFieldInputProps extends APrimitiveProps {
  /** The part of the date to render */
  part: SegmentPart;
}
</script>

<script setup lang="ts">
const props = defineProps<ADateFieldInputProps>();

const rootContext = injectADateFieldRootContext();

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
  segmentValues: rootContext.segmentValues,
  formatter: rootContext.formatter,
  part: props.part,
  disabled: rootContext.disabled,
  readonly: rootContext.readonly,
  focusNext: rootContext.focusNext,
  modelValue: rootContext.modelValue,
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
