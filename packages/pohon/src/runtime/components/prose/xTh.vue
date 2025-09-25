<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/uv'
import theme from '#build/ui/prose/th'

type ProseTh = ComponentConfig<typeof theme, AppConfig, 'th', 'ui.prose'>

export interface ProseThProps {
  class?: any
}

export interface ProseThSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseThProps>()
defineSlots<ProseThSlots>()

const appConfig = useAppConfig() as ProseTh['AppConfig']

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.prose?.th || {}) }))
</script>

<template>
  <th :class="ui({ class: props.class })">
    <slot />
  </th>
</template>
