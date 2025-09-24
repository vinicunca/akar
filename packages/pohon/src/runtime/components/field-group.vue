<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/field-group'
import type { ComponentConfig } from '../types/uv'

type FieldGroup = ComponentConfig<typeof theme, AppConfig, 'fieldGroup'>

export interface FieldGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * @defaultValue 'md'
   */
  size?: FieldGroup['variants']['size']
  /**
   * The orientation the buttons are laid out.
   * @defaultValue 'horizontal'
   */
  orientation?: FieldGroup['variants']['orientation']
  class?: any
  pohon?: FieldGroup['slots']
}

export interface FieldGroupSlots {
  default(props?: object): any
}
</script>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { APrimitive } from 'akar'
import { useAppConfig } from '#imports'
import { fieldGroupInjectionKey } from '../composables/useFieldGroup'
import { uv } from '../utils/uv'

const props = withDefaults(defineProps<FieldGroupProps>(), {
  orientation: 'horizontal'
})
defineSlots<FieldGroupSlots>()

const appConfig = useAppConfig() as FieldGroup['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.fieldGroup || {}) }))

provide(fieldGroupInjectionKey, computed(() => ({
  orientation: props.orientation,
  size: props.size
})))
</script>

<template>
  <APrimitive :as="as" :class="ui({ orientation, class: props.class })">
    <slot />
  </APrimitive>
</template>
