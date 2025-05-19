<script lang="ts">
import type { Ref } from 'vue';
import type { AcceptableValue, Direction, FormFieldProps } from '~~/shared/types';
import { isNullish } from '@vinicunca/perkakas';
import { useCollection } from '~~/collection';
import { createContext, useDirection, useFormControl } from '~~/shared';
import { compare } from './utils';

export interface ASelectRootProps<T = AcceptableValue> extends FormFieldProps {
  /** The controlled open state of the Select. Can be bind as `v-model:open`. */
  open?: boolean;
  /** The open state of the select when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The value of the select when initially rendered. Use when you do not need to control the state of the Select */
  defaultValue?: Array<T> | T;
  /** The controlled value of the Select. Can be bind as `v-model`. */
  modelValue?: Array<T> | T;
  /** Use this to compare objects by a particular field, or pass your own comparison function for complete control over how objects are compared. */
  by?: ((a: T, b: T) => boolean) | string;
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** Whether multiple options can be selected or not. */
  multiple?: boolean;
  /** Native html input `autocomplete` attribute. */
  autocomplete?: string;
  /** When `true`, prevents the user from interacting with Select */
  disabled?: boolean;
}

export type ASelectRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value changes. */
  'update:modelValue': [value: T];
  /** Event handler called when the open state of the context menu changes. */
  'update:open': [value: boolean];
};

export interface SelectRootContext<T> {
  triggerElement: Ref<HTMLElement | undefined>;
  onTriggerChange: (node: HTMLElement | undefined) => void;
  valueElement: Ref<HTMLElement | undefined>;
  onValueElementChange: (node: HTMLElement) => void;
  contentId: string;
  modelValue: Ref<Array<T> | T | undefined>;
  onValueChange: (value: T) => void;
  open: Ref<boolean>;
  multiple: Ref<boolean>;
  required?: Ref<boolean>;
  by?: ((a: T, b: T) => boolean) | string;
  onOpenChange: (open: boolean) => void;
  dir: Ref<Direction>;
  triggerPointerDownPosRef: Ref<null | { x: number; y: number }>;
  isEmptyModelValue: Ref<boolean>;
  disabled?: Ref<boolean>;

  optionsSet: Ref<Set<SelectOption>>;
  onOptionAdd: (option: SelectOption) => void;
  onOptionRemove: (option: SelectOption) => void;
}

export const [injectASelectRootContext, provideSelectRootContext]
  = createContext<SelectRootContext<AcceptableValue>>('ASelectRoot');

interface SelectOption {
  value: any;
  disabled?: boolean;
  textContent: string;
}
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { useVModel } from '@vueuse/core';
import { computed, ref, toRefs } from 'vue';
import { APopperRoot } from '~~/popper';
import BubbleSelect from './bubble-select.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ASelectRootProps<T>>(), {
  modelValue: undefined,
  open: undefined,
});
const emits = defineEmits<ASelectRootEmits<T>>();

defineSlots<{
  default: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();

const { required, disabled, multiple, dir: propDir } = toRefs(props);

const modelValue = useVModel(props, 'modelValue', emits, {
  // @ts-expect-error Missing infer for AcceptableValue
  defaultValue: props.defaultValue ?? (multiple.value ? [] : undefined),
  passive: (props.modelValue === undefined) as false,
  deep: true,
}) as Ref<Array<T> | T | undefined>;

const open = useVModel(props, 'open', emits, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>;

const triggerElement = ref<HTMLElement>();
const valueElement = ref<HTMLElement>();
const triggerPointerDownPosRef = ref({
  x: 0,
  y: 0,
});

const isEmptyModelValue = computed(() => {
  if (multiple.value && Array.isArray(modelValue.value)) {
    return modelValue.value?.length === 0;
  } else {
    return isNullish(modelValue.value);
  }
});

useCollection({ isProvider: true });
const dir = useDirection(propDir);

const isFormControl = useFormControl(triggerElement);
const optionsSet = ref<Set<SelectOption>>(new Set());

// The native `select` only associates the correct default value if the corresponding
// `option` is rendered as a child **at the same time** as itself.
// Because it might take a few renders for our items to gather the information to build
// the native `option`(s), we generate a key on the `select` to make sure Vue re-builds it
// each time the options change.
const nativeSelectKey = computed(() => {
  return Array.from(optionsSet.value)
    .map((option) => option.value)
    .join(';');
});

function handleValueChange(value: T) {
  if (multiple.value && Array.isArray(modelValue.value)) {
    const index = modelValue.value.findIndex((i) => compare(i, value, props.by));

    if (index === -1) {
      modelValue.value.push(value);
    } else {
      modelValue.value.splice(index, 1);
    }
  } else {
    modelValue.value = value;
  }
}

provideSelectRootContext({
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
  // @ts-expect-error Missing infer for AcceptableValue
  onValueChange: handleValueChange,
  // @ts-expect-error Missing infer for AcceptableValue
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

  optionsSet,
  onOptionAdd: (option) => optionsSet.value.add(option),
  onOptionRemove: (option) => optionsSet.value.delete(option),
});
</script>

<template>
  <APopperRoot>
    <slot
      :model-value="modelValue"
      :open="open"
    />

    <BubbleSelect
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
      @change="handleValueChange($event.target.value)"
    >
      <option
        v-if="modelValue === undefined"
        value=""
      />
      <option
        v-for="option in Array.from(optionsSet)"
        :key="option.value ?? ''"
        v-bind="option"
      />
    </BubbleSelect>
  </APopperRoot>
</template>
