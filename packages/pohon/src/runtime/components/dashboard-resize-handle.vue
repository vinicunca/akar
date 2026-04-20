<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/dashboard-resize-handle'
import type { ComponentConfig } from '../types/tv'

type DashboardResizeHandle = ComponentConfig<typeof theme, AppConfig, 'dashboardResizeHandle'>

export interface DashboardResizeHandleProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  pohon?: { base?: any }
}

export interface DashboardResizeHandleSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'
import { useComponentPohon } from '../composables/use-component-pohon'

const props = defineProps<DashboardResizeHandleProps>()
defineSlots<DashboardResizeHandleSlots>()

const appConfig = useAppConfig() as DashboardResizeHandle['AppConfig']
const pohonProp = useComponentPohon('dashboardResizeHandle', props)

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.dashboardResizeHandle || {}) }))
</script>

<template>
  <Primitive
    :as="as"
    role="separator"
    :class="ui({ class: [pohonProp?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
