<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/page-columns'
import type { ComponentConfig } from '../types/tv'

type PageColumns = ComponentConfig<typeof theme, AppConfig, 'pageColumns'>

export interface PageColumnsProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  pohon?: { base?: any }
}

export interface PageColumnsSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'
import { useComponentPohon } from '../composables/use-component-pohon'

const props = defineProps<PageColumnsProps>()
defineSlots<PageColumnsSlots>()

const appConfig = useAppConfig() as PageColumns['AppConfig']
const pohonProp = useComponentPohon('pageColumns', props)

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.pageColumns || {}) }))
</script>

<template>
  <Primitive :as="as" :class="ui({ class: [pohonProp?.base, props.class] })">
    <slot />
  </Primitive>
</template>
