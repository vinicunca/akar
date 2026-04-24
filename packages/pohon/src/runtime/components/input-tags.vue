<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AcceptableInputValue, ATagsInputRootEmits, ATagsInputRootProps } from 'akar';
import type { VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PIconProps } from '../types';
import type { InputHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/input-tags';

type InputTags = ComponentConfig<typeof theme, AppConfig, 'inputTags'>;

export type PInputTagItem = AcceptableInputValue;

export interface PInputTagsProps<T extends PInputTagItem = PInputTagItem> extends Pick<ATagsInputRootProps<T>, 'modelValue' | 'defaultValue' | 'addOnPaste' | 'addOnTab' | 'addOnBlur' | 'duplicate' | 'disabled' | 'delimiter' | 'max' | 'id' | 'convertValue' | 'displayValue' | 'name' | 'required'>, UseComponentIconsProps, /** @vue-ignore */ Omit<InputHTMLAttributes, 'disabled' | 'max' | 'required' | 'name' | 'placeholder' | 'type' | 'autofocus' | 'maxlength' | 'minlength' | 'pattern' | 'size' | 'min' | 'step'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /** The placeholder text when the input is empty. */
  placeholder?: string;
  /** The maximum number of character allowed. */
  maxLength?: number;
  /**
   * @defaultValue 'primary'
   */
  color?: InputTags['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: InputTags['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: InputTags['variants']['size'];
  autofocus?: boolean;
  autofocusDelay?: number;
  /**
   * The icon displayed to delete a tag.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  deleteIcon?: PIconProps['name'];
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  /** Keep the mobile text size on all breakpoints. */
  fixed?: boolean;
  class?: any;
  pohon?: InputTags['slots'];
}

export interface PInputTagsEmits<T extends PInputTagItem> extends ATagsInputRootEmits<T> {
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}

type SlotProps<T extends PInputTagItem> = (props: { item: T; index: number; pohon: InputTags['pohon'] }) => Array<VNode>;

export interface PInputTagsSlots<T extends PInputTagItem = PInputTagItem> {
  'leading'?: (props: { pohon: InputTags['pohon'] }) => Array<VNode>;
  'default'?: (props: { pohon: InputTags['pohon'] }) => Array<VNode>;
  'trailing'?: (props: { pohon: InputTags['pohon'] }) => Array<VNode>;
  'item-text'?: SlotProps<T>;
  'item-delete'?: SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends PInputTagItem">
import { reactivePick } from '@vueuse/core';
import {
  ATagsInputInput,
  ATagsInputItem,
  ATagsInputItemDelete,
  ATagsInputItemText,
  ATagsInputRoot,
  useForwardPropsEmits,
} from 'akar';
import { computed, onMounted, toRaw, toRef, useTemplateRef } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentIcons } from '../composables/use-component-icons';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PInputTagsProps<T>>(),
  {
    type: 'text',
    autofocusDelay: 0,
  },
);
const emits = defineEmits<PInputTagsEmits<T>>();
const slots = defineSlots<PInputTagsSlots<T>>();

const appConfig = useAppConfig() as InputTags['AppConfig'];
const pohonProp = useComponentPohon('inputTags', props);

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'as',
    'addOnPaste',
    'addOnTab',
    'addOnBlur',
    'duplicate',
    'delimiter',
    'max',
    'convertValue',
    'displayValue',
    'required',
  ),
  emits,
);

const {
  emitFormBlur,
  emitFormFocus,
  emitFormChange,
  emitFormInput,
  size: formFieldSize,
  color,
  id,
  name,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PInputTagsProps>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputTagsProps>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);

const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.inputTags || {}) })({
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

function onUpdate(value: Array<T>) {
  if (toRaw(props.modelValue) === value) {
    return;
  }
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);
  emitFormChange();
  emitFormInput();
}

function onBlur(event: FocusEvent) {
  emits('blur', event);
  emitFormBlur();
}

function onFocus(event: FocusEvent) {
  emits('focus', event);
  emitFormFocus();
}

defineExpose({
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement),
});
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <ATagsInputRoot
    :id="id"
    v-slot="{ modelValue: tags }"
    :model-value="modelValue"
    :default-value="defaultValue"
    data-slot="root"
    :class="pohon.root({ class: [pohon.base({ class: pohonProp?.base }), pohonProp?.root, props.class] })"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    @update:model-value="onUpdate"
  >
    <ATagsInputItem
      v-for="(item, index) in tags"
      :key="index"
      :value="item"
      data-slot="item"
      :class="pohon.item({ class: [pohonProp?.item] })"
    >
      <ATagsInputItemText
        data-slot="itemText"
        :class="pohon.itemText({ class: [pohonProp?.itemText] })"
      >
        <slot
          v-if="!!slots['item-text']"
          name="item-text"
          :item="(item as T)"
          :index="index"
          :pohon="pohon"
        />
      </ATagsInputItemText>

      <ATagsInputItemDelete
        data-slot="itemDelete"
        :class="pohon.itemDelete({ class: [pohonProp?.itemDelete] })"
        :disabled="disabled"
      >
        <slot
          name="item-delete"
          :item="(item as T)"
          :index="index"
          :pohon="pohon"
        >
          <PIcon
            :name="deleteIcon || appConfig.pohon.icons.close"
            data-slot="itemDeleteIcon"
            :class="pohon.itemDeleteIcon({ class: [pohonProp?.itemDeleteIcon] })"
          />
        </slot>
      </ATagsInputItemDelete>
    </ATagsInputItem>

    <ATagsInputInput
      ref="inputRef"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      :placeholder="placeholder"
      :max-length="maxLength"
      data-slot="input"
      :class="pohon.input({ class: pohonProp?.input })"
      @blur="onBlur"
      @focus="onFocus"
    />

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
  </ATagsInputRoot>
</template>
