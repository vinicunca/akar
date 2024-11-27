<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';
import type { DataOrientation, Direction, StringOrNumber } from '~~/shared';

import { createContext } from '~~/shared';

export interface ATabsRootContext {
  activationMode: 'automatic' | 'manual';
  baseId: string;
  changeModelValue: (value: StringOrNumber) => void;
  dir: Ref<Direction>;
  modelValue: Ref<StringOrNumber | undefined>;
  orientation: Ref<DataOrientation>;
  tabsList: Ref<HTMLElement | undefined>;
  unmountOnHide: Ref<boolean>;
}

export type ATabsRootEmits<T extends StringOrNumber = StringOrNumber> = {
  /** Event handler called when the value changes */
  'update:modelValue': [payload: T];
};

export interface ATabsRootProps<T extends StringOrNumber = StringOrNumber> extends APrimitiveProps {
  /**
   * Whether a tab is activated automatically (on focus) or manually (on click).
   * @defaultValue automatic
   */
  activationMode?: 'automatic' | 'manual';
  /**
   * The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs
   */
  defaultValue?: T;
  /**
   * The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** The controlled value of the tab to activate. Can be bind as `v-model`. */
  modelValue?: T;
  /**
   * The orientation the tabs are laid out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: DataOrientation;
  /**
   * When `true`, the element will be unmounted on closed state.
   *
   * @defaultValue `true`
   */
  unmountOnHide?: boolean;
}

export const [
  injectATabsRootContext,
  provideATabsRootContext,
] = createContext<ATabsRootContext>('ATabsRoot');
</script>

<script setup lang="ts" generic="T extends StringOrNumber = StringOrNumber">
import { useVModel } from '@vueuse/core';
import { ref, toRefs } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useDirection, useForwardExpose, useId } from '~~/shared';

const props = withDefaults(
  defineProps<ATabsRootProps<T>>(),
  {
    orientation: 'horizontal',
    activationMode: 'automatic',
    unmountOnHide: true,
  },
);

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

const modelValue = useVModel<ATabsRootProps<T>, 'modelValue', 'update:modelValue'>(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue,
    passive: (props.modelValue === undefined) as false,
  },
);

const tabsList = ref<HTMLElement>();

provideATabsRootContext({
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
