<script lang="ts">
import type { ComputedRef, Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';
import type { AcceptableValue, DataOrientation, Direction, SingleOrMultipleProps, SingleOrMultipleType } from '~~/shared/types';

import { createContext } from '~~/shared';

export interface AAccordionRootProps<ValidValue = Array<string> | string, ExplicitType = SingleOrMultipleType>
  extends APrimitiveProps, SingleOrMultipleProps<ValidValue, ExplicitType> {
  /**
   * When type is "single", allows closing content when clicking trigger for an open item.
   * When type is "multiple", this prop has no effect.
   *
   * @defaultValue false
   */
  collapsible?: boolean;

  /**
   * The reading direction of the accordion when applicable. If omitted, assumes LTR (left-to-right) reading mode.
   *
   * @defaultValue "ltr"
   */
  dir?: Direction;

  /**
   * When `true`, prevents the user from interacting with the accordion and all its items
   *
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * The orientation of the accordion.
   *
   * @defaultValue "vertical"
   */
  orientation?: DataOrientation;

  /**
   * When `true`, the element will be unmounted on closed state.
   *
   * @defaultValue `true`
   */
  unmountOnHide?: boolean;
}

export type AAccordionRootEmits<T extends SingleOrMultipleType = SingleOrMultipleType> = {
  /**
   * Event handler called when the expanded state of an item changes
   */
  'update:modelValue': [value: (T extends 'single' ? string : Array<string>) | undefined];
};

export type AAccordionRootContext<P extends AAccordionRootProps> = {
  changeModelValue: (value: string) => void;
  collapsible: boolean;
  direction: Ref<P['dir']>;
  disabled: Ref<P['disabled']>;
  isSingle: ComputedRef<boolean>;
  modelValue: Ref<AcceptableValue | Array<AcceptableValue> | undefined>;
  orientation: P['orientation'];
  parentElement: Ref<HTMLElement | undefined>;
  unmountOnHide: Ref<boolean>;
};

export const [
  injectAAccordionRootContext,
  provideAAccordionRootContext,
] = createContext<AAccordionRootContext<AAccordionRootProps>>('AAccordionRoot');
</script>

<script setup lang="ts" generic="ValidValue extends (AcceptableValue | AcceptableValue[]), ExplicitType extends SingleOrMultipleType">
import { toRefs } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useDirection, useForwardExpose, useSingleOrMultipleValue } from '~~/shared';

const props = withDefaults(
  defineProps<AAccordionRootProps<ValidValue, ExplicitType>>(),
  {
    disabled: false,
    orientation: 'vertical',
    collapsible: false,
    unmountOnHide: true,
  },
);

const emits = defineEmits<AAccordionRootEmits<ExplicitType>>();

defineSlots<{
  default: (props: {
    /** Current active value */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const { dir, disabled, unmountOnHide } = toRefs(props);
const direction = useDirection(dir);

const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emits);

const { forwardRef, currentElement: parentElement } = useForwardExpose();

provideAAccordionRootContext({
  disabled,
  direction,
  orientation: props.orientation,
  parentElement,
  isSingle,
  collapsible: props.collapsible,
  modelValue,
  changeModelValue,
  unmountOnHide,
});
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    :as-child="asChild"
    :as="as"
  >
    <slot :model-value="modelValue" />
  </APrimitive>
</template>
