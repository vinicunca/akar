<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps } from '../types';
import type { InputHTMLAttributes } from '../types/html';
import type { ApplyModifiers, ModelModifiers } from '../types/input';
import type { AcceptableValue } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/input';

type Input = ComponentConfig<typeof theme, AppConfig, 'input'>;

export type InputValue = AcceptableValue;

export interface PInputProps<T extends InputValue = InputValue, Mod extends ModelModifiers = ModelModifiers> extends UseComponentIconsProps, /** @vue-ignore */ Omit<InputHTMLAttributes, 'name' | 'type' | 'placeholder' | 'required' | 'autocomplete' | 'autofocus' | 'disabled'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  id?: string;
  name?: string;
  type?: InputHTMLAttributes['type'];
  /** The placeholder text when the input is empty. */
  placeholder?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: Input['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: Input['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Input['variants']['size'];
  required?: boolean;
  autocomplete?: InputHTMLAttributes['autocomplete'];
  autofocus?: boolean;
  autofocusDelay?: number;
  disabled?: boolean;
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  /** Keep the mobile text size on all breakpoints. */
  fixed?: boolean;
  modelValue?: ApplyModifiers<T, Mod>;
  defaultValue?: ApplyModifiers<T, Mod>;
  modelModifiers?: Mod;
  class?: any;
  pohon?: Input['slots'];
}

export interface PInputEmits<T extends InputValue = InputValue, Mod extends ModelModifiers = ModelModifiers> {
  'update:modelValue': [value: ApplyModifiers<T, Mod>];
  'blur': [event: FocusEvent];
  'change': [event: Event];
}

export interface PInputSlots {
  leading?: (props: { pohon: Input['pohon'] }) => Array<VNode>;
  default?: (props: { pohon: Input['pohon'] }) => Array<VNode>;
  trailing?: (props: { pohon: Input['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends InputValue, Mod extends ModelModifiers">
import { useAppConfig } from '#imports';
import { useVModel } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed, onMounted, useTemplateRef } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { looseToNumber } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PInputProps<T, Mod>>(), {
  type: 'text',
  autocomplete: 'off',
  autofocusDelay: 0,
});
const emits = defineEmits<PInputEmits<T, Mod>>();
const slots = defineSlots<PInputSlots>();

const modelValue = useVModel<PInputProps<T, Mod>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, { defaultValue: props.defaultValue });

const appConfig = useAppConfig() as Input['AppConfig'];
const pohonProp = useComponentPohon('input', props);

const { emitFormBlur, emitFormInput, emitFormChange, size: formFieldSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField<PInputProps<T>>(props, { deferInputValidation: true });
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputProps<T>>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);

const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.input || {}) })({
  type: props.type as Input['variants']['type'],
  color: color.value,
  variant: props.variant,
  size: inputSize?.value,
  loading: props.loading,
  highlight: highlight.value,
  fixed: props.fixed,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value,
}));

const inputRef = useTemplateRef('inputRef');

// Custom function to handle the v-model properties
function updateInput(value: string | null | undefined) {
  if (props.modelModifiers?.trim && (typeof value === 'string' || value === null || value === undefined)) {
    value = value?.trim() ?? null;
  }

  if (props.modelModifiers?.number || props.type === 'number') {
    value = looseToNumber(value);
  }

  if (props.modelModifiers?.nullable) {
    value ||= null;
  }

  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
    value ||= undefined;
  }

  modelValue.value = value as ApplyModifiers<T, Mod>;
  emitFormInput();
}

function onInput(event: Event) {
  if (!props.modelModifiers?.lazy) {
    updateInput((event.target as HTMLInputElement).value);
  }
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;

  if (props.modelModifiers?.lazy) {
    updateInput(value);
  }

  // Update trimmed input so that it has same behavior as native input https://github.com/vuejs/core/blob/5ea8a8a4fab4e19a71e123e4d27d051f5e927172/packages/runtime-dom/src/directives/vModel.ts#L63
  if (props.modelModifiers?.trim) {
    (event.target as HTMLInputElement).value = value.trim();
  }

  emitFormChange();
  emits('change', event);
}

function onBlur(event: FocusEvent) {
  emitFormBlur();
  emits('blur', event);
}

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.focus();
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});

defineExpose({
  inputRef,
});
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <input
      :id="id"
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      data-slot="base"
      :class="pohon.base({ class: pohonProp?.base })"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    >

    <slot :pohon="pohon" />

    <span
      v-if="isLeading || !!avatar || !!slots.leading"
      data-slot="leading"
      :class="pohon.leading({ class: pohonProp?.leading })"
    >
      <slot
        name="leading"
        :pohon="pohon"
      >
        <PIcon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          data-slot="leadingIcon"
          :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
        />
        <PAvatar
          v-else-if="!!avatar"
          :size="((pohonProp?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="avatar"
          data-slot="leadingAvatar"
          :class="pohon.leadingAvatar({ class: pohonProp?.leadingAvatar })"
        />
      </slot>
    </span>

    <span
      v-if="isTrailing || !!slots.trailing"
      data-slot="trailing"
      :class="pohon.trailing({ class: pohonProp?.trailing })"
    >
      <slot
        name="trailing"
        :pohon="pohon"
      >
        <PIcon
          v-if="trailingIconName"
          :name="trailingIconName"
          data-slot="trailingIcon"
          :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
        />
      </slot>
    </span>
  </APrimitive>
</template>
