<script lang="ts">
import type { ComputedRef, Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { AcceptableValue, DataOrientation, Direction, FormFieldProps, SingleOrMultipleProps, SingleOrMultipleType } from '../shared/types';
import { createContext, useDirection, useFormControl, useForwardExpose } from '~~/shared';
import AVisuallyHiddenInput from '~~/visually-hidden/visually-hidden-input.vue';

export interface AToggleGroupRootProps<ValidValue = AcceptableValue | Array<AcceptableValue>, ExplicitType = SingleOrMultipleType>
  extends APrimitiveProps, FormFieldProps, SingleOrMultipleProps<ValidValue, ExplicitType> {
  /** When `false`, navigating through the items using arrow keys will be disabled. */
  rovingFocus?: boolean;
  /** When `true`, prevents the user from interacting with the toggle group and all its items. */
  disabled?: boolean;
  /** The orientation of the component, which determines how focus moves: `horizontal` for left/right arrows and `vertical` for up/down arrows. */
  orientation?: DataOrientation;
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** When `loop` and `rovingFocus` is `true`, keyboard navigation will loop from last item to first, and vice versa. */
  loop?: boolean;
}
export type AToggleGroupRootEmits = {
  /** Event handler called when the value changes. */
  'update:modelValue': [payload: AcceptableValue | Array<AcceptableValue>];
};

interface ToggleGroupRootContext {
  isSingle: ComputedRef<boolean>;
  modelValue: Ref<AcceptableValue | Array<AcceptableValue> | undefined>;
  changeModelValue: (value: AcceptableValue) => void;
  dir?: Ref<Direction>;
  orientation?: DataOrientation;
  loop: Ref<boolean>;
  rovingFocus: Ref<boolean>;
  disabled?: Ref<boolean>;
}

export const [injectAToggleGroupRootContext, provideToggleGroupRootContext]
  = createContext<ToggleGroupRootContext>('AToggleGroupRoot');
</script>

<script setup lang="ts">
import { toRefs } from 'vue';
import { APrimitive } from '~~/primitive';
import { ARovingFocusGroup } from '~~/roving-focus';
import { useSingleOrMultipleValue } from '~~/shared/use-single-or-multiple-value';

const props = withDefaults(defineProps<AToggleGroupRootProps>(), {
  loop: true,
  rovingFocus: true,
  disabled: false,
});
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

provideToggleGroupRootContext({
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
