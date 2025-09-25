<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/ui/prose/pre'
import type { IconProps } from '../../types'
import type { ComponentConfig } from '../../types/uv'

type ProsePre = ComponentConfig<typeof theme, AppConfig, 'pre', 'ui.prose'>

export interface ProsePreProps {
  icon?: IconProps['name']
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  hideHeader?: boolean
  meta?: string
  class?: any
  pohon?: ProsePre['slots']
}

export interface ProsePreSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../../composables/useLocale'
import { tv } from '../../utils/tv'
import UCodeIcon from './CodeIcon.vue'
import UButton from '../button.vue'

const props = defineProps<ProsePreProps>()
defineSlots<ProsePreSlots>()

const { t } = useLocale()
const { copy, copied } = useClipboard()
const appConfig = useAppConfig() as ProsePre['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.prose?.pre || {}) })())
</script>

<template>
  <div :class="ui.root({ class: [props.pohon?.root], filename: !!filename })">
    <div v-if="filename && !hideHeader" :class="ui.header({ class: props.pohon?.header })">
      <UCodeIcon :icon="icon" :filename="filename" :class="ui.icon({ class: props.pohon?.icon })" />

      <span :class="ui.filename({ class: props.pohon?.filename })">{{ filename }}</span>
    </div>

    <UButton
      :icon="copied ? appConfig.ui.icons.copyCheck : appConfig.ui.icons.copy"
      color="neutral"
      variant="outline"
      size="sm"
      :aria-label="t('prose.pre.copy')"
      :class="ui.copy({ class: props.pohon?.copy })"
      tabindex="-1"
      @click="copy(props.code || '')"
    />

    <pre :class="ui.base({ class: [props.pohon?.base, props.class] })" v-bind="$attrs"><slot /></pre>
  </div>
</template>

<style>
.shiki span.line {
  display: block;
}

.shiki span.line.highlight {
  margin: 0 -16px;
  padding: 0 16px;

  @apply bg-(--ui-bg-accented)/50;
}
</style>
