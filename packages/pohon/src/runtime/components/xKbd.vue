<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/kbd'
import type { KbdKey } from '../composables/useKbd'
import type { ComponentConfig } from '../types/uv'

type Kbd = ComponentConfig<typeof theme, AppConfig, 'kbd'>

export interface KbdProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'kbd'
   */
  as?: APrimitiveProps['as'];
  value?: KbdKey | string
  /**
   * @defaultValue 'neutral'
   */
  color?: Kbd['variants']['color']
  /**
   * @defaultValue 'outline'
   */
  variant?: Kbd['variants']['variant']
  /**
   * @defaultValue 'md'
   */
  size?: Kbd['variants']['size']
  class?: any
}

export interface KbdSlots {
  default(props?: object): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { APrimitive } from 'akar'
import { useAppConfig } from '#imports'
import { useKbd } from '../composables/useKbd'
import { uv } from '../utils/uv'

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd'
})
defineSlots<KbdSlots>()

const { getKbdKey } = useKbd()
const appConfig = useAppConfig() as Kbd['AppConfig']

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.kbd || {}) }))
</script>

<template>
  <APrimitive :as="as" :class="ui({ class: props.class, color: props.color, variant: props.variant, size: props.size })">
    <slot>
      {{ getKbdKey(value) }}
    </slot>
  </APrimitive>
</template>
