<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ANumberFieldRootProps } from 'akar';
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { InputHTMLAttributes } from '../types/html';
import type { ModelModifiers } from '../types/input';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/input-number';

type InputNumber = ComponentConfig<typeof theme, AppConfig, 'inputNumber'>;
type InputNumberValue = number | null;

export interface PInputNumberProps<T extends InputNumberValue = InputNumberValue> extends Pick<ANumberFieldRootProps, 'modelValue' | 'defaultValue' | 'min' | 'max' | 'step' | 'stepSnapping' | 'disabled' | 'required' | 'id' | 'name' | 'formatOptions' | 'disableWheelChange' | 'invertWheelChange' | 'readonly'>, /** @vue-ignore */ Omit<InputHTMLAttributes, 'disabled' | 'min' | 'max' | 'readonly' | 'required' | 'step' | 'name' | 'placeholder' | 'type' | 'autofocus' | 'maxlength' | 'minlength' | 'pattern' | 'size'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /** The placeholder text when the input is empty. */
  placeholder?: string;
  color?: InputNumber['variants']['color'];
  variant?: InputNumber['variants']['variant'];
  size?: InputNumber['variants']['size'];
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  /**
   * The orientation of the input menu.
   * @defaultValue 'horizontal'
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Configure the increment button. The `color` and `size` are inherited.
   * @defaultValue { variant: 'link' }
   */
  increment?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed to increment the value.
   * @defaultValue appConfig.pohon.icons.plus
   * @IconifyIcon
   */
  incrementIcon?: PIconProps['name'];
  /** Disable the increment button. */
  incrementDisabled?: boolean;
  /**
   * Configure the decrement button. The `color` and `size` are inherited.
   * @defaultValue { variant: 'link' }
   */
  decrement?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed to decrement the value.
   * @defaultValue appConfig.pohon.icons.minus
   * @IconifyIcon
   */
  decrementIcon?: PIconProps['name'];
  /** Disable the decrement button. */
  decrementDisabled?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  modelModifiers?: Pick<ModelModifiers<T>, 'optional'>;
  class?: any;
  pohon?: InputNumber['slots'];
}

export interface PInputNumberEmits<T extends InputNumberValue = InputNumberValue> {
  'update:modelValue': [value: T];
  'blur': [event: FocusEvent];
  'change': [event: Event];
}

export interface PInputNumberSlots {
  increment: (props?: object) => any;
  decrement: (props?: object) => any;
}
</script>

<script setup lang="ts" generic="T extends InputNumberValue = InputNumberValue">
import { useAppConfig } from '#imports';
import { reactivePick, useVModel } from '@vueuse/core';
import {
  ANumberFieldDecrement,
  ANumberFieldIncrement,
  ANumberFieldInput,
  ANumberFieldRoot,
  useForwardPropsEmits,
} from 'akar';
import { computed, onMounted, toRef, useTemplateRef } from 'vue';
import { useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PButton from './button.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PInputNumberProps<T>>(),
  {
    orientation: 'horizontal',
    increment: true,
    decrement: true,
  },
);

const emits = defineEmits<PInputNumberEmits<T>>();

defineSlots<PInputNumberSlots>();

const modelValue = useVModel<PInputNumberProps<T>, 'modelValue', 'update:modelValue'>(
  props,
  'modelValue',
  emits,
  { defaultValue: props.defaultValue },
);

const { t } = useLocale();
const appConfig = useAppConfig() as InputNumber['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'as',
    'defaultValue',
    'min',
    'max',
    'step',
    'stepSnapping',
    'formatOptions',
    'disableWheelChange',
    'invertWheelChange',
    'readonly',
  ),
  emits,
);

const {
  emitFormBlur,
  emitFormFocus,
  emitFormChange,
  emitFormInput,
  id,
  color,
  size: formGroupSize,
  name,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PInputNumberProps<T>>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputNumberProps<T>>(props);

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.inputNumber || {}),
  })({
    color: color.value,
    variant: props.variant,
    size: inputSize.value,
    highlight: highlight.value,
    orientation: props.orientation,
    fieldGroup: orientation.value,
    increment: props.orientation === 'vertical' ? (!!props.increment || !!props.decrement) : !!props.increment,
    decrement: props.orientation === 'vertical' ? false : !!props.decrement,
  }),
);

const incrementIcon = computed(() =>
  props.incrementIcon
  || (props.orientation === 'horizontal'
    ? appConfig.pohon.icons.plus
    : appConfig.pohon.icons.chevronUp),
);
const decrementIcon = computed(() =>
  props.decrementIcon
  || (props.orientation === 'horizontal'
    ? appConfig.pohon.icons.minus
    : appConfig.pohon.icons.chevronDown),
);

const inputRef = useTemplateRef('inputRef');

function onUpdate(value: number | undefined) {
  if (props.modelModifiers?.optional) {
    value = value ?? undefined;
  }

  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);

  emitFormChange();
  emitFormInput();
}

function onBlur(event: FocusEvent) {
  emitFormBlur();
  emits('blur', event);
}

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.$el?.focus();
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});

defineExpose({
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement),
});
</script>

<template>
  <ANumberFieldRoot
    v-bind="rootProps"
    :id="id"
    :model-value="modelValue"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    :name="name"
    :disabled="disabled"
    data-pohon="input-number-root"
    @update:model-value="onUpdate"
  >
    <div
      v-if="Boolean(decrement)"
      :class="pohon.decrement({ class: props.pohon?.decrement })"
      data-pohon="input-number-decrement"
    >
      <ANumberFieldDecrement
        as-child
        :disabled="disabled || decrementDisabled"
      >
        <slot name="decrement">
          <PButton
            :icon="decrementIcon"
            :color="color"
            :size="inputSize"
            variant="link"
            :aria-label="t('inputNumber.decrement')"
            v-bind="typeof decrement === 'object' ? decrement : undefined"
          />
        </slot>
      </ANumberFieldDecrement>
    </div>

    <ANumberFieldInput
      v-bind="{ ...$attrs, ...ariaAttrs }"
      ref="inputRef"
      :placeholder="placeholder"
      :required="required"
      :class="pohon.base({ class: props.pohon?.base })"
      data-pohon="input-number-base"
      @blur="onBlur"
      @focus="emitFormFocus"
    />

    <div
      v-if="Boolean(increment)"
      :class="pohon.increment({ class: props.pohon?.increment })"
      data-pohon="input-number-increment"
    >
      <ANumberFieldIncrement
        as-child
        :disabled="disabled || incrementDisabled"
      >
        <slot name="increment">
          <PButton
            :icon="incrementIcon"
            :color="color"
            :size="inputSize"
            variant="link"
            :aria-label="t('inputNumber.increment')"
            v-bind="typeof increment === 'object' ? increment : undefined"
          />
        </slot>
      </ANumberFieldIncrement>
    </div>
  </ANumberFieldRoot>
</template>
