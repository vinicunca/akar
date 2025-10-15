<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { InputHTMLAttributes } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps } from '../types';
import type { ModelModifiers } from '../types/input';
import type { AcceptableValue } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/input';

type Input = ComponentConfig<typeof theme, AppConfig, 'input'>;

export type PInputValue = AcceptableValue;
export interface PInputProps<T extends PInputValue = PInputValue> extends UseComponentIconsProps {
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
  modelValue?: T;
  defaultValue?: T;
  modelModifiers?: ModelModifiers;
  class?: any;
  pohon?: Input['slots'];
}

export interface PInputEmits<T extends PInputValue = PInputValue> {
  'update:modelValue': [value: T];
  'blur': [event: FocusEvent];
  'change': [event: Event];
}

export interface PInputSlots {
  leading: (props?: object) => any;
  default: (props?: object) => any;
  trailing: (props?: object) => any;
}
</script>

<script setup lang="ts" generic="T extends PInputValue">
import { useAppConfig } from '#imports';
import { isNumber } from '@vinicunca/perkakas';
import { useVModel } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed, onMounted, ref } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { looseToNumber } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PInputProps<T>>(),
  {
    type: 'text',
    autocomplete: 'off',
    autofocusDelay: 0,
  },
);
const emits = defineEmits<PInputEmits<T>>();
const slots = defineSlots<PInputSlots>();

const modelValue = useVModel<
  PInputProps<T>,
  'modelValue',
  'update:modelValue'
>(
  props,
  'modelValue',
  emits,
  { defaultValue: props.defaultValue },
);

const appConfig = useAppConfig() as Input['AppConfig'];

const {
  emitFormBlur,
  emitFormInput,
  emitFormChange,
  size: formGroupSize,
  color,
  id,
  name,
  highlight,
  disabled,
  emitFormFocus,
  ariaAttrs,
} = useFormField<PInputProps<T>>(props, { deferInputValidation: true });
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputProps<T>>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.input || {}),
  })({
    type: props.type as Input['variants']['type'],
    color: color.value,
    variant: props.variant,
    size: inputSize?.value,
    loading: props.loading,
    highlight: highlight.value,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
    fieldGroup: orientation.value,
  }),
);

const inputRef = ref<HTMLInputElement | null>(null);

// Custom function to handle the v-model properties
function updateInput(value: string | null | undefined) {
  if (props.modelModifiers?.trim) {
    value = value?.trim() ?? null;
  }

  if (props.modelModifiers?.number || isNumber(props.type)) {
    value = looseToNumber(value);
  }

  if (props.modelModifiers?.nullable) {
    value ||= null;
  }

  if (props.modelModifiers?.optional) {
    value ||= undefined;
  }

  modelValue.value = value as T;
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
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <span
      v-if="isLeading || !!avatar || !!slots.leading"
      :class="pohon.leading({ class: props.pohon?.leading })"
    >
      <slot name="leading">
        <PIcon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          :class="pohon.leadingIcon({ class: props.pohon?.leadingIcon })"
        />
        <PAvatar
          v-else-if="!!avatar"
          :size="((props.pohon?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="avatar"
          :class="pohon.leadingAvatar({ class: props.pohon?.leadingAvatar })"
        />
      </slot>
    </span>

    <input
      :id="id"
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      :class="pohon.base({ class: props.pohon?.base })"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    >

    <slot />

    <span
      v-if="isTrailing || !!slots.trailing"
      :class="pohon.trailing({ class: props.pohon?.trailing })"
    >
      <slot name="trailing">
        <PIcon
          v-if="trailingIconName"
          :name="trailingIconName"
          :class="pohon.trailingIcon({ class: props.pohon?.trailingIcon })"
        />
      </slot>
    </span>
  </APrimitive>
</template>
