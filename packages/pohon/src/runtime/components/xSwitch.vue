<script lang="ts">
import type { SwitchRootProps } from 'akar'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/switch'
import type { IconProps } from '../types'
import type { ComponentConfig } from '../types/uv'

type Switch = ComponentConfig<typeof theme, AppConfig, 'switch'>

export interface SwitchProps extends Pick<SwitchRootProps, 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * @defaultValue 'primary'
   */
  color?: Switch['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: Switch['variants']['size']
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean
  /**
   * The icon when the `loading` prop is `true`.
   * @defaultValue appConfig.pohon.icons.loading
   * @IconifyIcon
   */
  loadingIcon?: IconProps['name']
  /**
   * Display an icon when the switch is checked.
   * @IconifyIcon
   */
  checkedIcon?: IconProps['name']
  /**
   * Display an icon when the switch is unchecked.
   * @IconifyIcon
   */
  uncheckedIcon?: IconProps['name']
  label?: string
  description?: string
  class?: any
  pohon?: Switch['slots']
}

export type SwitchEmits = {
  change: [event: Event]
}

export interface SwitchSlots {
  label(props: { label?: string }): any
  description(props: { description?: string }): any
}
</script>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { APrimitive, SwitchRoot, SwitchThumb, useForwardProps, Label } from 'akar'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/use-form-field'
import { uv } from '../utils/uv'
import PIcon from './icon.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<SwitchProps>()
const slots = defineSlots<SwitchSlots>()
const emits = defineEmits<SwitchEmits>()

const modelValue = defineModel<boolean>({ default: undefined })

const appConfig = useAppConfig() as Switch['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))

const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField<SwitchProps>(props)
const id = _id.value ?? useId()

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.switch || {}) })({
  size: size.value,
  color: color.value,
  required: props.required,
  loading: props.loading,
  disabled: disabled.value || props.loading
}))

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<template>
  <APrimitive :as="as" :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <div :class="pohon.container({ class: props.pohon?.container })">
      <SwitchRoot
        :id="id"
        v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
        v-model="modelValue"
        :name="name"
        :disabled="disabled || loading"
        :class="pohon.base({ class: props.pohon?.base })"
        @update:model-value="onUpdate"
      >
        <SwitchThumb :class="pohon.thumb({ class: props.pohon?.thumb })">
          <PIcon v-if="loading" :name="loadingIcon || appConfig.pohon.icons.loading" :class="pohon.icon({ class: props.pohon?.icon, checked: true, unchecked: true })" />
          <template v-else>
            <PIcon v-if="checkedIcon" :name="checkedIcon" :class="pohon.icon({ class: props.pohon?.icon, checked: true })" />
            <PIcon v-if="uncheckedIcon" :name="uncheckedIcon" :class="pohon.icon({ class: props.pohon?.icon, unchecked: true })" />
          </template>
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <div v-if="(label || !!slots.label) || (description || !!slots.description)" :class="pohon.wrapper({ class: props.pohon?.wrapper })">
      <Label v-if="label || !!slots.label" :for="id" :class="pohon.label({ class: props.pohon?.label })">
        <slot name="label" :label="label">
          {{ label }}
        </slot>
      </Label>
      <p v-if="description || !!slots.description" :class="pohon.description({ class: props.pohon?.description })">
        <slot name="description" :description="description">
          {{ description }}
        </slot>
      </p>
    </div>
  </APrimitive>
</template>
