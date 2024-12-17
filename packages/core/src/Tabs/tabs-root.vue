<script lang="ts">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { DataOrientation, Direction, StringOrNumber } from '../shared/types';
import { useVModel } from '@vueuse/core';
import { createContext, useDirection, useForwardExpose, useId } from '~~/shared';

export interface TabsRootContext {
  modelValue: Ref<StringOrNumber | undefined>;
  changeModelValue: (value: StringOrNumber) => void;
  orientation: Ref<DataOrientation>;
  dir: Ref<Direction>;
  unmountOnHide: Ref<boolean>;
  activationMode: 'automatic' | 'manual';
  baseId: string;
  tabsList: Ref<HTMLElement | undefined>;
}

export interface ATabsRootProps<T extends StringOrNumber = StringOrNumber> extends APrimitiveProps {
  /**
   * The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs
   */
  defaultValue?: T;
  /**
   * The orientation the tabs are laid out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: DataOrientation;
  /**
   * The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /**
   * Whether a tab is activated automatically (on focus) or manually (on click).
   * @defaultValue automatic
   */
  activationMode?: 'automatic' | 'manual';
  /** The controlled value of the tab to activate. Can be bind as `v-model`. */
  modelValue?: T;
  /**
   * When `true`, the element will be unmounted on closed state.
   *
   * @defaultValue `true`
   */
  unmountOnHide?: boolean;
}
export type ATabsRootEmits<T extends StringOrNumber = StringOrNumber> = {
  /** Event handler called when the value changes */
  'update:modelValue': [payload: T];
};

export const [injectATabsRootContext, provideTabsRootContext]
  = createContext<TabsRootContext>('ATabsRoot');
</script>

<script setup lang="ts" generic="T extends StringOrNumber = StringOrNumber">
import { ref, toRefs } from 'vue';
import { APrimitive } from '~~/primitive';

const props = withDefaults(defineProps<ATabsRootProps<T>>(), {
  orientation: 'horizontal',
  activationMode: 'automatic',
  unmountOnHide: true,
});
const emits = defineEmits<ATabsRootEmits<T>>();

defineSlots<{
  default: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const { orientation, unmountOnHide, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
useForwardExpose();

const modelValue = useVModel<ATabsRootProps<T>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false,
});

const tabsList = ref<HTMLElement>();

provideTabsRootContext({
  modelValue,
  changeModelValue: (value: StringOrNumber) => {
    modelValue.value = value as T;
  },
  orientation,
  dir,
  unmountOnHide,
  activationMode: props.activationMode,
  baseId: useId(undefined, 'akar-tabs'),
  tabsList,
});
</script>

<template>
  <APrimitive
    :dir="dir"
    :data-orientation="orientation"
    :as-child="asChild"
    :as="as"
  >
    <slot :model-value="modelValue" />
  </APrimitive>
</template>
