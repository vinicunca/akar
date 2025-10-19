<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AcceptableInputValue, ATagsInputRootEmits, ATagsInputRootProps } from 'akar';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/input-tags';

type InputTags = ComponentConfig<typeof theme, AppConfig, 'inputTags'>;

export type PInputTagItem = AcceptableInputValue;

export interface PInputTagsProps<T extends PInputTagItem = PInputTagItem> extends Pick<ATagsInputRootProps<T>, 'modelValue' | 'defaultValue' | 'addOnPaste' | 'addOnTab' | 'addOnBlur' | 'duplicate' | 'disabled' | 'delimiter' | 'max' | 'id' | 'convertValue' | 'displayValue' | 'name' | 'required'>, UseComponentIconsProps {
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
  class?: any;
  pohon?: InputTags['slots'];
}

export interface PInputTagsEmits<T extends PInputTagItem> extends ATagsInputRootEmits<T> {
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}

type SlotProps<T extends PInputTagItem> = (props: { item: T; index: number; pohon: InputTags['pohon'] }) => any;

export interface PInputTagsSlots<T extends PInputTagItem = PInputTagItem> {
  'leading': (props: { pohon: InputTags['pohon'] }) => any;
  'default': (props: { pohon: InputTags['pohon'] }) => any;
  'trailing': (props: { pohon: InputTags['pohon'] }) => any;
  'item-text': SlotProps<T>;
  'item-delete': SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends PInputTagItem">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import {
  ATagsInputInput,
  ATagsInputItem,
  ATagsInputItemDelete,
  ATagsInputItemText,
  ATagsInputRoot,
  useForwardPropsEmits,
} from 'akar';
import { computed, onMounted, ref, toRaw } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
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
  size: formGroupSize,
  color,
  id,
  name,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PInputTagsProps>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputTagsProps>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.inputTags || {}),
  })({
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

const inputRef = ref<InstanceType<typeof ATagsInputInput> | null>(null);

onMounted(() => {
  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.$el?.focus();
  }
}

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
  inputRef,
});
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <ATagsInputRoot
    :id="id"
    v-slot="{ modelValue: tags }"
    :model-value="modelValue"
    :default-value="defaultValue"
    :class="pohon.root({ class: [pohon.base({ class: props.pohon?.base }), props.pohon?.root, props.class] })"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    @update:model-value="onUpdate"
  >
    <ATagsInputItem
      v-for="(item, index) in tags"
      :key="index"
      :value="item"
      :class="pohon.item({ class: [props.pohon?.item] })"
    >
      <ATagsInputItemText :class="pohon.itemText({ class: [props.pohon?.itemText] })">
        <slot
          v-if="!!slots['item-text']"
          name="item-text"
          :item="(item as T)"
          :index="index"
          :pohon="pohon"
        />
      </ATagsInputItemText>

      <ATagsInputItemDelete
        :class="pohon.itemDelete({ class: [props.pohon?.itemDelete] })"
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
            :class="pohon.itemDeleteIcon({ class: [props.pohon?.itemDeleteIcon] })"
          />
        </slot>
      </ATagsInputItemDelete>
    </ATagsInputItem>

    <ATagsInputInput
      ref="inputRef"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      :placeholder="placeholder"
      :max-length="maxLength"
      :class="pohon.input({ class: props.pohon?.input })"
      @blur="onBlur"
      @focus="onFocus"
    />

    <slot :pohon="pohon" />

    <span
      v-if="isLeading || !!avatar || !!slots.leading"
      :class="pohon.leading({ class: props.pohon?.leading })"
    >
      <slot
        name="leading"
        :pohon="pohon"
      >
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

    <span
      v-if="isTrailing || !!slots.trailing"
      :class="pohon.trailing({ class: props.pohon?.trailing })"
    >
      <slot
        name="trailing"
        :pohon="pohon"
      >
        <PIcon
          v-if="trailingIconName"
          :name="trailingIconName"
          :class="pohon.trailingIcon({ class: props.pohon?.trailingIcon })"
        />
      </slot>
    </span>
  </ATagsInputRoot>
</template>
