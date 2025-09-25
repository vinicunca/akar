<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/uv'
import theme from '#build/ui/prose/table'

type ProseTable = ComponentConfig<typeof theme, AppConfig, 'table', 'ui.prose'>

export interface ProseTableProps {
  class?: any
  pohon?: ProseTable['slots']
}

export interface ProseTableSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseTableProps>()
defineSlots<ProseTableSlots>()

const appConfig = useAppConfig() as ProseTable['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.prose?.table || {}) })())
</script>

<template>
  <div :class="ui.root({ class: [props.pohon?.root, props.class] })">
    <table :class="ui.base({ class: props.pohon?.base })">
      <slot />
    </table>
  </div>
</template>
