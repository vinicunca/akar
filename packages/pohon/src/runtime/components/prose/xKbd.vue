<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/ui/prose/kbd'
import type { ComponentConfig } from '../../types/uv'

type ProseKbd = ComponentConfig<typeof theme, AppConfig, 'kbd', 'ui.prose'>

export interface ProseKbdProps {
  value: string
  class?: any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'
import PKbd from '../Kbd.vue'

const props = defineProps<ProseKbdProps>()

const appConfig = useAppConfig() as ProseKbd['AppConfig']

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.prose?.kbd || {}) }))
</script>

<template>
  <PKbd :value="value" :class="ui({ class: props.class })" />
</template>
