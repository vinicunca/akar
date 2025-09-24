<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/container'
import type { ComponentConfig } from '../types/uv'

type Container = ComponentConfig<typeof theme, AppConfig, 'container'>

export interface ContainerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  class?: any
}

export interface ContainerSlots {
  default(props?: object): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { APrimitive } from 'akar'
import { useAppConfig } from '#imports'
import { uv } from '../utils/uv'

const props = defineProps<ContainerProps>()
defineSlots<ContainerSlots>()

const appConfig = useAppConfig() as Container['AppConfig']

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.container || {}) }))
</script>

<template>
  <APrimitive :as="as" :class="ui({ class: props.class })">
    <slot />
  </APrimitive>
</template>
