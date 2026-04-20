<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/chat-shimmer'
import type { ComponentConfig } from '../types/tv'

type ChatShimmer = ComponentConfig<typeof theme, AppConfig, 'chatShimmer'>

export interface ChatShimmerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any
  /**
   * The text to display with the shimmer effect.
   */
  text: string
  /**
   * The duration of the shimmer animation in seconds.
   * @defaultValue 2
   */
  duration?: number
  /**
   * The spread multiplier for the shimmer highlight. The actual spread is computed as `text.length * spread` in pixels.
   * @defaultValue 2
   */
  spread?: number
  class?: any
  pohon?: ChatShimmer['slots']
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<ChatShimmerProps>(), {
  as: 'span',
  duration: 2,
  spread: 2
})

const appConfig = useAppConfig() as ChatShimmer['AppConfig']
const pohonProp = useComponentPohon('chatShimmer', props)

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.chatShimmer || {}) }))

const spread = computed(() => props.text.length * props.spread)
</script>

<template>
  <Primitive
    :as="as"
    :style="{
      '--spread': `${spread}px`,
      '--duration': `${duration}s`
    }"
    data-slot="base"
    :class="ui({ class: [pohonProp?.base, props.class] })"
  >
    {{ text }}
  </Primitive>
</template>
