<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { TagsInputRootProps, TagsInputRootEmits, AcceptableInputValue } from 'akar'
import theme from '#build/pohon/input-tags'
import type { UseComponentIconsProps } from '../composables/use-component-icons'
import type { AvatarProps, IconProps } from '../types'
import type { ComponentConfig } from '../types/uv'

type InputTags = ComponentConfig<typeof theme, AppConfig, 'inputTags'>

export type InputTagItem = AcceptableInputValue

export interface InputTagsProps<T extends InputTagItem = InputTagItem> extends Pick<TagsInputRootProps<T>, 'modelValue' | 'defaultValue' | 'addOnPaste' | 'addOnTab' | 'addOnBlur' | 'duplicate' | 'disabled' | 'delimiter' | 'max' | 'id' | 'convertValue' | 'displayValue' | 'name' | 'required'>, UseComponentIconsProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /** The placeholder text when the input is empty. */
  placeholder?: string
  /** The maximum number of character allowed. */
  maxLength?: number
  /**
   * @defaultValue 'primary'
   */
  color?: InputTags['variants']['color']
  /**
   * @defaultValue 'outline'
   */
  variant?: InputTags['variants']['variant']
  /**
   * @defaultValue 'md'
   */
  size?: InputTags['variants']['size']
  autofocus?: boolean
  autofocusDelay?: number
  /**
   * The icon displayed to delete a tag.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  deleteIcon?: IconProps['name']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  class?: any
  pohon?: InputTags['slots']
}

export interface InputTagsEmits<T extends InputTagItem> extends TagsInputRootEmits<T> {
  change: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}

type SlotProps<T extends InputTagItem> = (props: { item: T, index: number }) => any

export interface InputTagsSlots<T extends InputTagItem = InputTagItem> {
  'leading'(props?: object): any
  'default'(props?: object): any
  'trailing'(props?: object): any
  'item-text': SlotProps<T>
  'item-delete': SlotProps<T>
}
</script>

<script setup lang="ts" generic="T extends InputTagItem">
import { computed, ref, onMounted, toRaw } from 'vue'
import { TagsInputRoot, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput, useForwardPropsEmits } from 'akar'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useComponentIcons } from '../composables/use-component-icons'
import { useFormField } from '../composables/use-form-field'
import { uv } from '../utils/uv'
import PIcon from './icon.vue'
import PAvatar from './avatar.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputTagsProps<T>>(), {
  type: 'text',
  autofocusDelay: 0
})
const emits = defineEmits<InputTagsEmits<T>>()
const slots = defineSlots<InputTagsSlots<T>>()

const appConfig = useAppConfig() as InputTags['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'addOnPaste', 'addOnTab', 'addOnBlur', 'duplicate', 'delimiter', 'max', 'convertValue', 'displayValue', 'required'), emits)

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField<InputTagsProps>(props)
const { orientation, size: fieldGroupSize } = useFieldGroup<InputTagsProps>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value)

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.inputTags || {}) })({
  color: color.value,
  variant: props.variant,
  size: inputSize?.value,
  loading: props.loading,
  highlight: highlight.value,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value
}))

const inputRef = ref<InstanceType<typeof TagsInputInput> | null>(null)

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.$el?.focus()
  }
}

function onUpdate(value: T[]) {
  if (toRaw(props.modelValue) === value) {
    return
  }
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
  emitFormInput()
}

function onBlur(event: FocusEvent) {
  emits('blur', event)
  emitFormBlur()
}

function onFocus(event: FocusEvent) {
  emits('focus', event)
  emitFormFocus()
}

defineExpose({
  inputRef
})
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <TagsInputRoot
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
    <TagsInputItem
      v-for="(item, index) in tags"
      :key="index"
      :value="item"
      :class="pohon.item({ class: [props.pohon?.item] })"
    >
      <TagsInputItemText :class="pohon.itemText({ class: [props.pohon?.itemText] })">
        <slot v-if="!!slots['item-text']" name="item-text" :item="(item as T)" :index="index" />
      </TagsInputItemText>

      <TagsInputItemDelete
        :class="pohon.itemDelete({ class: [props.pohon?.itemDelete] })"
        :disabled="disabled"
      >
        <slot name="item-delete" :item="(item as T)" :index="index">
          <PIcon :name="deleteIcon || appConfig.pohon.icons.close" :class="pohon.itemDeleteIcon({ class: [props.pohon?.itemDeleteIcon] })" />
        </slot>
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      ref="inputRef"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      :placeholder="placeholder"
      :max-length="maxLength"
      :class="pohon.input({ class: props.pohon?.input })"
      @blur="onBlur"
      @focus="onFocus"
    />

    <slot />

    <span v-if="isLeading || !!avatar || !!slots.leading" :class="pohon.leading({ class: props.pohon?.leading })">
      <slot name="leading">
        <PIcon v-if="isLeading && leadingIconName" :name="leadingIconName" :class="pohon.leadingIcon({ class: props.pohon?.leadingIcon })" />
        <PAvatar v-else-if="!!avatar" :size="((props.pohon?.leadingAvatarSize || pohon.leadingAvatarSize()) as AvatarProps['size'])" v-bind="avatar" :class="pohon.leadingAvatar({ class: props.pohon?.leadingAvatar })" />
      </slot>
    </span>

    <span v-if="isTrailing || !!slots.trailing" :class="pohon.trailing({ class: props.pohon?.trailing })">
      <slot name="trailing">
        <PIcon v-if="trailingIconName" :name="trailingIconName" :class="pohon.trailingIcon({ class: props.pohon?.trailingIcon })" />
      </slot>
    </span>
  </TagsInputRoot>
</template>
