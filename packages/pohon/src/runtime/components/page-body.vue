<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/page-body'
import type { ComponentConfig } from '../types/tv'

type PageBody = ComponentConfig<typeof theme, AppConfig, 'pageBody'>

export interface PageBodyProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  pohon?: { base?: any }
}

export interface PageBodySlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'
import { useComponentPohon } from '../composables/use-component-pohon'

const props = defineProps<PageBodyProps>()
defineSlots<PageBodySlots>()

const appConfig = useAppConfig() as PageBody['AppConfig']
const pohonProp = useComponentPohon('pageBody', props)

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.pageBody || {}) }))
</script>

<template>
  <Primitive :as="as" :class="ui({ class: [pohonProp?.base, props.class] })">
    <slot />
  </Primitive>
</template>
