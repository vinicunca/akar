<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/uv'
import theme from '#build/ui/prose/code-preview'

type ProseCodePreview = ComponentConfig<typeof theme, AppConfig, 'codePreview', 'ui.prose'>

export interface ProseCodePreviewProps {
  class?: any
  pohon?: ProseCodePreview['slots']
}

export interface ProseCodePreviewSlots {
  default(props?: {}): any
  code(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseCodePreviewProps>()
const slots = defineSlots<ProseCodePreviewSlots>()

const appConfig = useAppConfig() as ProseCodePreview['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.prose?.codePreview || {}) })({ code: !!slots.code }))
</script>

<template>
  <div :class="ui.root({ class: [props.pohon?.root, props.class] })">
    <div :class="ui.preview({ class: [props.pohon?.preview] })">
      <slot />
    </div>

    <div v-if="!!slots.code" :class="ui.code({ class: [props.pohon?.code] })">
      <slot name="code" />
    </div>
  </div>
</template>
