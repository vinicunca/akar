<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/uv'
import theme from '#build/ui/prose/em'

type ProseEm = ComponentConfig<typeof theme, AppConfig, 'em', 'ui.prose'>

export interface ProseEmProps {
  class?: string
}

export interface ProseEmSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseEmProps>()
defineSlots<ProseEmSlots>()

const appConfig = useAppConfig() as ProseEm['AppConfig']

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.prose?.em || {}) }))
</script>

<template>
  <em :class="ui({ class: props.class })"><slot /></em>
</template>
