<script lang="ts">
import type { Ref, VNode } from 'vue';

import { type AcceptableValue, createContext, type Direction, type FormFieldProps } from '~~/shared';

export interface ASelectRootProps<T = AcceptableValue> extends FormFieldProps {
  /** Native html input `autocomplete` attribute. */
  autocomplete?: string;
  /** Use this to compare objects by a particular field, or pass your own comparison function for complete control over how objects are compared. */
  by?: ((a: T, b: T) => boolean) | string;
  /** The open state of the select when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The value of the select when initially rendered. Use when you do not need to control the state of the ASelect */
  defaultValue?: Array<T> | T;
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with ASelect */
  disabled?: boolean;
  /** The controlled value of the ASelect. Can be bind as `v-model`. */
  modelValue?: Array<T> | T;
  /** Whether multiple options can be selected or not. */
  multiple?: boolean;
  /** The controlled open state of the ASelect. Can be bind as `v-model:open`. */
  open?: boolean;
}

export type ASelectRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value changes. */
  'update:modelValue': [value: T];
  /** Event handler called when the open state of the context menu changes. */
  'update:open': [value: boolean];
};

export interface ASelectRootContext<T> {
  by?: ((a: T, b: T) => boolean) | string;
  contentId: string;
  dir: Ref<Direction>;
  disabled?: Ref<boolean>;
  isEmptyModelValue: Ref<boolean>;
  modelValue: Ref<Array<T> | T | undefined>;
  multiple: Ref<boolean>;
  onOpenChange: (open: boolean) => void;
  onTriggerChange: (node: HTMLElement | undefined) => void;
  onValueChange: (value: T) => void;
  onValueElementChange: (node: HTMLElement) => void;
  open: Ref<boolean>;
  required?: Ref<boolean>;
  triggerElement: Ref<HTMLElement | undefined>;
  triggerPointerDownPosRef: Ref<{ x: number; y: number } | null>;
  valueElement: Ref<HTMLElement | undefined>;
}

export const [
  injectASelectRootContext,
  provideASelectRootContext,
] = createContext<ASelectRootContext<AcceptableValue>>('ASelectRoot');

export interface ASelectNativeOptionsContext {
  onNativeOptionAdd: (option: VNode) => void;
  onNativeOptionRemove: (option: VNode) => void;
}

export const [
  injectASelectNativeOptionsContext,
  provideASelectNativeOptionsContext,
] = createContext<ASelectNativeOptionsContext>('ASelectRoot');
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { isNullish } from '@vinicunca/perkakas';
import { useVModel } from '@vueuse/core';
import { computed, ref, toRefs } from 'vue';

import { APopperRoot } from '~~/a-popper';
import { useCollection } from '~~/collection';
import { useDirection, useFormControl } from '~~/shared';

import BubbleASelect from './bubble-a-select.vue';
import { compare } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ASelectRootProps>(),
  {
    modelValue: undefined,
    open: undefined,
  },
);

const emits = defineEmits<ASelectRootEmits>();

defineSlots<{
  default: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();

const { required, disabled, multiple, dir: propDir } = toRefs(props);

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue ?? (multiple.value ? [] : undefined),
    passive: (props.modelValue === undefined) as false,
    deep: true,
  },
) as Ref<Array<T> | T | undefined>;

const open = useVModel(
  props,
  'open',
  emits,
  {
    defaultValue: props.defaultOpen,
    passive: (props.open === undefined) as false,
  },
) as Ref<boolean>;

const triggerElement = ref<HTMLElement>();
const valueElement = ref<HTMLElement>();
const triggerPointerDownPosRef = ref({
  x: 0,
  y: 0,
});

const isEmptyModelValue = computed(() => {
  if (multiple.value && Array.isArray(modelValue.value)) {
    return modelValue.value.length === 0;
  } else {
    return isNullish(modelValue.value);
  }
});

useCollection({ isProvider: true });

const dir = useDirection(propDir);

provideASelectRootContext({
  triggerElement,
  onTriggerChange: (node) => {
    triggerElement.value = node;
  },
  valueElement,
  onValueElementChange: (node) => {
    valueElement.value = node;
  },
  contentId: '',
  modelValue,
  onValueChange: (value: any) => {
    if (multiple.value && Array.isArray(modelValue.value)) {
      const index = modelValue.value.findIndex(
        (idx) => compare({
          value: idx,
          currentValue: value,
          comparator: props.by,
        }),
      );

      if (index === -1) {
        modelValue.value.push(value);
      } else {
        modelValue.value.splice(index, 1);
      }
    } else {
      modelValue.value = value;
    }
  },
  by: props.by,
  open,
  multiple,
  required,
  onOpenChange: (value) => {
    open.value = value;
  },
  dir,
  triggerPointerDownPosRef,
  disabled,
  isEmptyModelValue,
});

const isFormControl = useFormControl(triggerElement);
const nativeOptionsSet = ref<Set<VNode>>(new Set());

/**
 * The native `select` only associates the correct default value if the corresponding
 * `option` is rendered as a child **at the same time** as itself.
 * Because it might take a few renders for our items to gather the information to build
 * the native `option`(s), we generate a key on the `select` to make sure Vue re-builds it
 * each time the options change.
 */
const nativeSelectKey = computed(() => {
  return Array.from(nativeOptionsSet.value)
    .map((option) => option.props?.value)
    .join(';');
});

provideASelectNativeOptionsContext({
  onNativeOptionAdd: (option) => {
    nativeOptionsSet.value.add(option);
  },
  onNativeOptionRemove: (option) => {
    nativeOptionsSet.value.delete(option);
  },
});
</script>

<template>
  <APopperRoot>
    <slot
      :model-value="modelValue"
      :open="open"
    />

    <BubbleASelect
      v-if="isFormControl"
      :key="nativeSelectKey"
      aria-hidden="true"
      tabindex="-1"
      :multiple="multiple"
      :required="required"
      :name="name"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :value="modelValue"
      @change="modelValue = $event.target.value"
    >
      <option
        v-if="modelValue === undefined"
        value=""
      />
      <component
        v-bind="option.props"
        :is="option"
        v-for="option in Array.from(nativeOptionsSet)"
        :key="option.key ?? ''"
      />
    </BubbleASelect>
  </APopperRoot>
</template>
