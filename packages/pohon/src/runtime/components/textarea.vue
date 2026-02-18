<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps } from '../types';
import type { TextareaHTMLAttributes } from '../types/html';
import type { ModelModifiers } from '../types/input';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/textarea';

type Textarea = ComponentConfig<typeof theme, AppConfig, 'textarea'>;

type TextareaValue = string | number | null;

export interface PTextareaProps<T extends TextareaValue = TextareaValue> extends UseComponentIconsProps, /** @vue-ignore */ Omit<TextareaHTMLAttributes, 'name' | 'placeholder' | 'required' | 'autofocus' | 'disabled' | 'rows'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  id?: string;
  name?: string;
  /** The placeholder text when the textarea is empty. */
  placeholder?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: Textarea['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: Textarea['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Textarea['variants']['size'];
  required?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  autoresize?: boolean;
  autoresizeDelay?: number;
  disabled?: boolean;
  rows?: number;
  maxrows?: number;
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  modelValue?: T;
  defaultValue?: T;
  modelModifiers?: ModelModifiers<T>;
  class?: any;
  pohon?: Textarea['slots'];
}

export interface PTextareaEmits<T extends TextareaValue = TextareaValue> {
  'update:modelValue': [value: T];
  'blur': [event: FocusEvent];
  'change': [event: Event];
}

export interface PTextareaSlots {
  leading: (props: { pohon: Textarea['pohon'] }) => any;
  default: (props: { pohon: Textarea['pohon'] }) => any;
  trailing: (props: { pohon: Textarea['pohon'] }) => any;
}
</script>

<script setup lang="ts" generic="T extends TextareaValue">
import { useAppConfig } from '#imports';
import { useVModel } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed, nextTick, onMounted, useTemplateRef, watch } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFormField } from '../composables/use-form-field';
import { looseToNumber } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PTextareaProps<T>>(),
  {
    rows: 3,
    maxrows: 0,
    autofocusDelay: 0,
    autoresizeDelay: 0,
  },
);
const emits = defineEmits<PTextareaEmits<T>>();
const slots = defineSlots<PTextareaSlots>();
const modelValue = useVModel<
  PTextareaProps<T>,
  'modelValue',
  'update:modelValue'
>(
  props,
  'modelValue',
  emits,
  { defaultValue: props.defaultValue },
);

const appConfig = useAppConfig() as Textarea['AppConfig'];
const pohonProp = useComponentPohon('textarea', props);

const {
  emitFormFocus,
  emitFormBlur,
  emitFormInput,
  emitFormChange,
  size,
  color,
  id,
  name,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PTextareaProps<T>>(props, { deferInputValidation: true });
const {
  isLeading,
  isTrailing,
  leadingIconName,
  trailingIconName,
} = useComponentIcons(props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.textarea || {}),
  })({
    color: color.value,
    variant: props.variant,
    size: size?.value,
    loading: props.loading,
    highlight: highlight.value,
    autoresize: props.autoresize,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
  }),
);

const textareaRef = useTemplateRef('textareaRef');

// Custom function to handle the v-model properties
function updateInput(value: string | null | undefined) {
  if (props.modelModifiers?.trim) {
    value = value?.trim() ?? null;
  }

  if (props.modelModifiers?.number) {
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
  autoResize();

  if (!props.modelModifiers?.lazy) {
    updateInput((event.target as HTMLInputElement).value);
  }
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;

  if (props.modelModifiers?.lazy) {
    updateInput(value);
  }

  // Update trimmed textarea so that it has same behavior as native textarea https://github.com/vuejs/core/blob/5ea8a8a4fab4e19a71e123e4d27d051f5e927172/packages/runtime-dom/src/directives/vModel.ts#L63
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
    textareaRef.value?.focus();
  }
}

function autoResize() {
  if (props.autoresize && textareaRef.value) {
    textareaRef.value.rows = props.rows;
    const overflow = textareaRef.value.style.overflow;
    textareaRef.value.style.overflow = 'hidden';

    const styles = window.getComputedStyle(textareaRef.value);
    const paddingTop = Number.parseInt(styles.paddingTop);
    const paddingBottom = Number.parseInt(styles.paddingBottom);
    const padding = paddingTop + paddingBottom;
    const lineHeight = Number.parseInt(styles.lineHeight);
    const { scrollHeight } = textareaRef.value;
    const newRows = (scrollHeight - padding) / lineHeight;

    if (newRows > props.rows) {
      textareaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
    }

    textareaRef.value.style.overflow = overflow;
  }
}

watch(modelValue, () => {
  nextTick(autoResize);
});

onMounted(() => {
  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);

  setTimeout(() => {
    autoResize();
  }, props.autoresizeDelay);
});

defineExpose({
  textareaRef,
});
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <textarea
      :id="id"
      ref="textareaRef"
      :value="modelValue"
      :name="name"
      :rows="rows"
      :placeholder="placeholder"
      :class="pohon.base({ class: pohonProp?.base })"
      :disabled="disabled"
      :required="required"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    />

    <slot :pohon="pohon" />

    <span
      v-if="isLeading || !!avatar || !!slots.leading"
      :class="pohon.leading({ class: pohonProp?.leading })"
    >
      <slot
        name="leading"
        :pohon="pohon"
      >
        <PIcon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
        />
        <PAvatar
          v-else-if="!!avatar"
          :size="((pohonProp?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="avatar"
          :class="pohon.leadingAvatar({ class: pohonProp?.leadingAvatar })"
        />
      </slot>
    </span>

    <span
      v-if="isTrailing || !!slots.trailing"
      :class="pohon.trailing({ class: pohonProp?.trailing })"
    >
      <slot
        name="trailing"
        :pohon="pohon"
      >
        <PIcon
          v-if="trailingIconName"
          :name="trailingIconName"
          :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
        />
      </slot>
    </span>
  </APrimitive>
</template>
