<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/dashboard-group'
import type { UseResizableProps } from '../composables/use-resizable'
import type { ComponentConfig } from '../types/tv'

type DashboardGroup = ComponentConfig<typeof theme, AppConfig, 'dashboardGroup'>

export interface DashboardGroupProps extends Pick<UseResizableProps, 'storage' | 'storageKey' | 'persistent' | 'unit'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  pohon?: { base?: any }
}

export interface DashboardGroupSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useNuxtApp, useAppConfig } from '#imports'
import { provideDashboardContext } from '../utils/dashboard'
import { tv } from '../utils/tv'
import { useComponentPohon } from '../composables/use-component-pohon'

const props = withDefaults(defineProps<DashboardGroupProps>(), {
  storage: 'cookie',
  storageKey: 'dashboard',
  persistent: true,
  unit: '%'
})
defineSlots<DashboardGroupSlots>()

const nuxtApp = useNuxtApp()
const appConfig = useAppConfig() as DashboardGroup['AppConfig']
const pohonProp = useComponentPohon('dashboardGroup', props)

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.dashboardGroup || {}) }))

const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)

provideDashboardContext({
  storage: props.storage,
  storageKey: props.storageKey,
  persistent: props.persistent,
  unit: props.unit,
  sidebarOpen,
  toggleSidebar: () => {
    nuxtApp.hooks.callHook('dashboard:sidebar:toggle')
  },
  sidebarCollapsed,
  collapseSidebar: (collapsed: boolean) => {
    nuxtApp.hooks.callHook('dashboard:sidebar:collapse', collapsed)
  },
  toggleSearch: () => {
    nuxtApp.hooks.callHook('dashboard:search:toggle')
  }
})
</script>

<template>
  <Primitive :as="as" :class="ui({ class: [pohonProp?.base, props.class] })">
    <slot />
  </Primitive>
</template>
