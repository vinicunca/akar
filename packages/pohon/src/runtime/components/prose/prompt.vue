<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/prose/prompt'
import type { IconProps } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ProsePrompt = ComponentConfig<typeof theme, AppConfig, 'prompt', 'ui.prose'>

export interface ProsePromptProps {
  description?: string
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name']
  /**
   * @defaultValue ['copy']
   */
  actions?: ('copy' | 'cursor' | 'windsurf')[]
  class?: any
  pohon?: ProsePrompt['slots']
}

export interface ProsePromptSlots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../../composables/use-component-pohon'
import { useLocale } from '../../composables/useLocale'
import { getSlotChildrenText } from '../../utils'
import { tv } from '../../utils/tv'
import PIcon from '../icon.vue'
import PButton from '../button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ProsePromptProps>(), {
  actions: () => ['copy']
})
const slots = defineSlots<ProsePromptSlots>()

const { t } = useLocale()
const { copy, copied } = useClipboard()
const appConfig = useAppConfig() as ProsePrompt['AppConfig']
const pohonProp = useComponentPohon('prose.prompt', props)

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.prose?.prompt || {}) })())

function getPromptText() {
  const children = slots.default?.()
  return children ? getSlotChildrenText(children).trim() : ''
}

function copyPrompt() {
  copy(getPromptText())
}

function openInCursor() {
  const url = new URL('cursor://anysphere.cursor-deeplink/prompt')
  url.searchParams.set('text', getPromptText())

  window.open(url.toString(), '_self')
}

function openInWindsurf() {
  const url = new URL('windsurf://cascade/newChat')
  url.searchParams.set('prompt', getPromptText())

  window.open(url.toString(), '_self')
}
</script>

<template>
  <div :class="ui.root({ class: [pohonProp?.root, props.class] })" v-bind="$attrs">
    <PIcon v-if="icon" :name="icon" :class="ui.icon({ class: pohonProp?.icon })" />

    <div :class="ui.content({ class: pohonProp?.content })">
      <p v-if="description" :class="ui.description({ class: pohonProp?.description })">
        {{ description }}
      </p>
    </div>

    <div :class="ui.actions({ class: pohonProp?.actions })">
      <PButton
        v-if="actions.includes('copy')"
        :icon="copied ? appConfig.pohon.icons.copyCheck : appConfig.pohon.icons.copy"
        size="sm"
        :label="t('prose.prompt.copy')"
        @click="copyPrompt"
      />

      <PButton
        v-if="actions.includes('cursor')"
        icon="i-simple-icons-cursor"
        color="neutral"
        variant="outline"
        size="sm"
        :label="t('prose.prompt.openIn', { name: 'Cursor' })"
        @click="openInCursor"
      />

      <PButton
        v-if="actions.includes('windsurf')"
        icon="i-simple-icons-windsurf"
        color="neutral"
        variant="outline"
        size="sm"
        :label="t('prose.prompt.openIn', { name: 'Windsurf' })"
        @click="openInWindsurf"
      />
    </div>
  </div>
</template>
