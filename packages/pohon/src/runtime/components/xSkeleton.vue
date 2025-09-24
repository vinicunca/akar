<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/skeleton'
import type { ComponentConfig } from '../types/uv'

type Skeleton = ComponentConfig<typeof theme, AppConfig, 'skeleton'>

export interface SkeletonProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  class?: any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { APrimitive } from 'akar'
import { useAppConfig } from '#imports'
import { uv } from '../utils/uv'

const props = defineProps<SkeletonProps>()

const appConfig = useAppConfig() as Skeleton['AppConfig']

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.skeleton || {}) }))
</script>

<template>
  <APrimitive
    :as="as"
    aria-busy="true"
    aria-label="loading"
    aria-live="polite"
    role="alert"
    :class="ui({ class: props.class })"
  >
    <slot />
  </APrimitive>
</template>
