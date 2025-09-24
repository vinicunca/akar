<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { PinInputRootEmits, PinInputRootProps } from 'akar'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/pin-input'
import type { ComponentConfig } from '../types/uv'

type PinInput = ComponentConfig<typeof theme, AppConfig, 'pinInput'>

type PinInputType = 'text' | 'number'
type PinInputValue<Type extends PinInputType> = [Type] extends ['number'] ? number[] : string[]

export interface PinInputProps<T extends PinInputType = 'text'> extends Pick<PinInputRootProps<T>, 'defaultValue' | 'disabled' | 'id' | 'mask' | 'modelValue' | 'name' | 'otp' | 'placeholder' | 'required' | 'type'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * @defaultValue 'primary'
   */
  color?: PinInput['variants']['color']
  /**
   * @defaultValue 'outline'
   */
  variant?: PinInput['variants']['variant']
  /**
   * @defaultValue 'md'
   */
  size?: PinInput['variants']['size']
  /**
   * The number of input fields.
   * @defaultValue 5
   */
  length?: number | string
  autofocus?: boolean
  autofocusDelay?: number
  highlight?: boolean
  class?: any
  pohon?: PinInput['slots']
}

export type PinInputEmits<T extends PinInputType = 'text'> = PinInputRootEmits<T> & {
  change: [event: Event]
  blur: [event: Event]
}

</script>

<script setup lang="ts" generic="T extends PinInputType">
import type { ComponentPublicInstance } from 'vue'
import { ref, computed, onMounted } from 'vue'
import { PinInputInput, PinInputRoot, useForwardPropsEmits } from 'akar'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/use-form-field'
import { looseToNumber } from '../utils'
import { uv } from '../utils/uv'

const props = withDefaults(defineProps<PinInputProps<T>>(), {
  type: 'text' as never,
  length: 5,
  autofocusDelay: 0
})
const emits = defineEmits<PinInputEmits<T>>()

const appConfig = useAppConfig() as PinInput['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'disabled', 'id', 'mask', 'name', 'otp', 'required', 'type'), emits)

const { emitFormInput, emitFormFocus, emitFormChange, emitFormBlur, size, color, id, name, highlight, disabled, ariaAttrs } = useFormField<PinInputProps>(props)

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pinInput || {}) })({
  color: color.value,
  variant: props.variant,
  size: size.value,
  highlight: highlight.value
}))

const inputsRef = ref<ComponentPublicInstance[]>([])

const completed = ref(false)
function onComplete(value: string[] | number[]) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
}

function onBlur(event: FocusEvent) {
  if (!event.relatedTarget || completed.value) {
    emits('blur', event)
    emitFormBlur()
  }
}

function autoFocus() {
  if (props.autofocus) {
    inputsRef.value[0]?.$el?.focus()
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

defineExpose({
  inputsRef
})
</script>

<template>
  <PinInputRoot
    v-bind="{ ...rootProps, ...ariaAttrs }"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :model-value="(modelValue as PinInputValue<T>)"
    :default-value="(defaultValue as PinInputValue<T>[])"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    @update:model-value="emitFormInput()"
    @complete="onComplete"
  >
    <PinInputInput
      v-for="(ids, index) in looseToNumber(props.length)"
      :key="ids"
      :ref="el => (inputsRef[index] = el as ComponentPublicInstance)"
      :index="index"
      :class="pohon.base({ class: props.pohon?.base })"
      :disabled="disabled"
      @blur="onBlur"
      @focus="emitFormFocus"
    />
  </PinInputRoot>
</template>
