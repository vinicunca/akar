<script lang="ts">
import type { ComputedRef, Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';
import type {
  AcceptableValue,
  DataOrientation,
  Direction,
  FormFieldProps,
  SingleOrMultipleProps,
  SingleOrMultipleType,
} from '~~/shared';

import { createContext } from '~~/shared';

export interface AToggleGroupRootProps<ValidValue = AcceptableValue | Array<AcceptableValue>, ExplicitType = SingleOrMultipleType>
  extends APrimitiveProps, FormFieldProps, SingleOrMultipleProps<ValidValue, ExplicitType> {
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with the toggle group and all its items. */
  disabled?: boolean;
  /** When `loop` and `rovingFocus` is `true`, keyboard navigation will loop from last item to first, and vice versa. */
  loop?: boolean;
  /** The orientation of the component, which determines how focus moves: `horizontal` for left/right arrows and `vertical` for up/down arrows. */
  orientation?: DataOrientation;
  /** When `false`, navigating through the items using arrow keys will be disabled. */
  rovingFocus?: boolean;
}
export type AToggleGroupRootEmits = {
  /** Event handler called when the value changes. */
  'update:modelValue': [payload: AcceptableValue | Array<AcceptableValue>];
};

interface AToggleGroupRootContext {
  changeModelValue: (value: AcceptableValue) => void;
  dir?: Ref<Direction>;
  disabled?: Ref<boolean>;
  isSingle: ComputedRef<boolean>;
  loop: Ref<boolean>;
  modelValue: Ref<AcceptableValue | Array<AcceptableValue> | undefined>;
  orientation?: DataOrientation;
  rovingFocus: Ref<boolean>;
}

export const [
  injectAToggleGroupRootContext,
  provideAToggleGroupRootContext,
] = createContext<AToggleGroupRootContext>('AToggleGroupRoot');
</script>

<script setup lang="ts">
import { toRefs } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { ARovingFocusGroup } from '~~/a-roving-focus';
import { AVisuallyHiddenInput } from '~~/a-visually-hidden';
import { useDirection, useFormControl, useForwardExpose, useSingleOrMultipleValue } from '~~/shared';

const props = withDefaults(
  defineProps<AToggleGroupRootProps>(),
  {
    loop: true,
    rovingFocus: true,
    disabled: false,
  },
);

const emits = defineEmits<AToggleGroupRootEmits>();

defineSlots<{
  default: (props: {
    /** Current toggle values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const { loop, rovingFocus, disabled, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
const { forwardRef, currentElement } = useForwardExpose();

const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emits);
const isFormControl = useFormControl(currentElement);

provideAToggleGroupRootContext({
  isSingle,
  modelValue,
  changeModelValue,
  dir,
  orientation: props.orientation,
  loop,
  rovingFocus,
  disabled,
});
</script>

<template>
  <component
    :is="rovingFocus ? ARovingFocusGroup : APrimitive"
    as-child
    :orientation="rovingFocus ? orientation : undefined"
    :dir="dir"
    :loop="rovingFocus ? loop : undefined"
  >
    <APrimitive
      :ref="forwardRef"
      role="group"
      :as-child="asChild"
      :as="as"
    >
      <slot :model-value="modelValue" />

      <AVisuallyHiddenInput
        v-if="isFormControl && name"
        :name="name"
        :required="required"
        :value="modelValue"
      />
    </APrimitive>
  </component>
</template>
