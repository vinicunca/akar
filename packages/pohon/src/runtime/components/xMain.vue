<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/main'
import type { ComponentConfig } from '../types/uv'

type Main = ComponentConfig<typeof theme, AppConfig, 'main'>

export interface MainProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'main'
   */
  as?: APrimitiveProps['as'];
  class?: any
}

export interface MainSlots {
  default(props?: object): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { APrimitive } from 'akar'
import { useAppConfig } from '#imports'
import { uv } from '../utils/uv'

const props = withDefaults(defineProps<MainProps>(), {
  as: 'main'
})
defineSlots<MainSlots>()

const appConfig = useAppConfig() as Main['AppConfig']

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.main || {}) }))
</script>

<template>
  <APrimitive :as="as" :class="ui({ class: props.class })">
    <slot />
  </APrimitive>
</template>
