<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/uv'
import theme from '#build/ui/prose/h4'

type ProseH4 = ComponentConfig<typeof theme, AppConfig, 'h4', 'ui.prose'>

export interface ProseH4Props {
  id?: string
  class?: any
  pohon?: ProseH4['slots']
}

export interface ProseH4Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useRuntimeConfig, useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseH4Props>()
defineSlots<ProseH4Slots>()

const appConfig = useAppConfig() as ProseH4['AppConfig']
const { headings } = useRuntimeConfig().public?.mdc || {}

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.prose?.h4 || {}) })())

const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings.anchorLinks.h4)
</script>

<template>
  <h4 :id="id" :class="ui.base({ class: props.class })">
    <a v-if="id && generate" :href="`#${id}`" :class="ui.link({ class: props.pohon?.link })">
      <slot />
    </a>
    <slot v-else />
  </h4>
</template>
