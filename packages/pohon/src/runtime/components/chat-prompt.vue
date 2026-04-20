<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/chat-prompt'
import type { PTextareaProps, PTextareaSlots } from '../types'
import type { ComponentConfig } from '../types/tv'

type ChatPrompt = ComponentConfig<typeof theme, AppConfig, 'chatPrompt'>

export interface ChatPromptProps extends Pick<PTextareaProps, 'rows' | 'autofocus' | 'autofocusDelay' | 'autoresize' | 'autoresizeDelay' | 'maxrows' | 'icon' | 'avatar' | 'loading' | 'loadingIcon' | 'disabled'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'form'
   */
  as?: any
  /**
   * The placeholder text for the textarea.
   * @defaultValue t('chatPrompt.placeholder')
   */
  placeholder?: string
  /**
   * @defaultValue 'outline'
   */
  variant?: ChatPrompt['variants']['variant']
  error?: Error
  class?: any
  pohon?: ChatPrompt['slots'] & PTextareaProps['pohon']
}

export interface ChatPromptEmits {
  submit: [event: Event]
  close: [event: Event]
}

export interface ChatPromptSlots extends PTextareaSlots {
  header?(props?: {}): VNode[]
  footer?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed, toRef, useTemplateRef } from 'vue'
import { Primitive, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { useIMEGuard } from '../composables/use-ime-guard'
import { useLocale } from '../composables/use-locale'
import { omit, transformPohon } from '../utils'
import { tv } from '../utils/tv'
import PTextarea from './textarea.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChatPromptProps>(), {
  as: 'form',
  autofocus: true,
  autoresize: true,
  rows: 1
})
const emits = defineEmits<ChatPromptEmits>()
const slots = defineSlots<ChatPromptSlots>()

const model = defineModel<string>({ default: '' })

const { t } = useLocale()
const appConfig = useAppConfig() as ChatPrompt['AppConfig']
const pohonProp = useComponentPohon('chatPrompt', props)

const textareaProps = useForwardProps(reactivePick(props, 'rows', 'autofocus', 'autofocusDelay', 'autoresize', 'autoresizeDelay', 'maxrows', 'icon', 'avatar', 'loading', 'loadingIcon'))

const getProxySlots = () => omit(slots, ['header', 'footer'])

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.chatPrompt || {}) })({
  variant: props.variant
}))

const textareaRef = useTemplateRef('textareaRef')

function submit(e: Event) {
  if (model.value.trim() === '') {
    return
  }

  emits('submit', e)
}

function blur(e: Event) {
  textareaRef.value?.textareaRef?.blur()

  emits('close', e)
}

const { onKeydown: onEnter, onCompositionEnd } = useIMEGuard((event) => {
  submit(event)
})

defineExpose({
  textareaRef: toRef(() => textareaRef.value?.textareaRef)
})
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })" @submit.prevent="submit">
    <div v-if="!!slots.header" data-slot="header" :class="ui.header({ class: pohonProp?.header })">
      <slot name="header" />
    </div>

    <PTextarea
      ref="textareaRef"
      v-model="model"
      :placeholder="placeholder || t('chatPrompt.placeholder')"
      :disabled="Boolean(error) || disabled"
      variant="none"
      fixed
      v-bind="{ ...textareaProps, ...$attrs }"
      : pohon="transformPohon(omit(ui, ['root', 'body', 'header', 'footer']), pohonProp)"
      data-slot="body"
      :class="ui.body({ class: pohonProp?.body })"
      @keydown.enter.exact="onEnter"
      @compositionend="onCompositionEnd"
      @keydown.esc="blur"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </PTextarea>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: pohonProp?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
