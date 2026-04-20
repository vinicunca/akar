<script lang="ts">
import type { CollapsibleRootProps } from 'reka-ui'
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/chat-tool'
import type { PIconProps } from '../types'
import type { ChatShimmerProps } from './chat-shimmer.vue'
import type { ComponentConfig } from '../types/tv'

type ChatTool = ComponentConfig<typeof theme, AppConfig, 'chatTool'>

export interface ChatToolProps extends Pick<CollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  /**
   * The text content to display.
   */
  text?: string
  /**
   * The suffix text displayed after the main text.
   */
  suffix?: string
  /**
   * The icon displayed next to the trigger.
   * @IconifyIcon
   */
  icon?: PIconProps['name']
  /**
   * Whether the tool is in a loading state.
   * @defaultValue false
   */
  loading?: boolean
  /**
   * The icon displayed when loading.
   * @defaultValue appConfig.pohon.icons.loading
   * @IconifyIcon
   */
  loadingIcon?: PIconProps['name']
  /**
   * Whether the tool content is currently streaming.
   * @defaultValue false
   */
  streaming?: boolean
  /**
   * The visual variant of the tool display.
   * @defaultValue 'inline'
   */
  variant?: ChatTool['variants']['variant']
  /**
   * The position of the chevron icon.
   * @defaultValue 'trailing'
   */
  chevron?: 'leading' | 'trailing'
  /**
   * The icon displayed as the chevron.
   * @defaultValue appConfig.pohon.icons.chevronDown
   * @IconifyIcon
   */
  chevronIcon?: PIconProps['name']
  /**
   * Customize the [`ChatShimmer`](https://ui.nuxt.com/docs/components/chat-shimmer) component when streaming.
   */
  shimmer?: Partial<Omit<ChatShimmerProps, 'text'>>
  class?: any
  pohon?: ChatTool['slots']
}

export interface ChatToolEmits {
  'update:open': [value: boolean]
}

export interface ChatToolSlots {
  default?(props: { open: boolean }): VNode[]
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { tv } from '../utils/tv'
import PIcon from './icon.vue'
import PChatShimmer from './chat-shimmer.vue'

const props = withDefaults(defineProps<ChatToolProps>(), {
  open: undefined,
  loading: false,
  streaming: false,
  variant: 'inline',
  chevron: 'trailing',
  unmountOnHide: false
})
const emits = defineEmits<ChatToolEmits>()
const slots = defineSlots<ChatToolSlots>()

const appConfig = useAppConfig() as ChatTool['AppConfig']
const pohonProp = useComponentPohon('chatTool', props)

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.chatTool || {}) })({
  variant: props.variant,
  chevron: props.chevron,
  loading: props.loading
}))

const isControlled = computed(() => props.open !== undefined)
const internalOpen = ref(props.defaultOpen ?? false)
const resolvedOpen = computed(() => isControlled.value ? props.open : internalOpen.value)

function setOpen(value: boolean) {
  internalOpen.value = value
  emits('update:open', value)
}

const hasContent = computed(() => !!slots.default)

const resolvedLoadingIcon = computed(() => props.loadingIcon || appConfig.pohon.icons?.loading)
const resolvedIcon = computed(() => props.loading ? resolvedLoadingIcon.value : props.icon)
const chevronIconName = computed(() => props.chevronIcon || appConfig.pohon.icons?.chevronDown)
</script>

<template>
  <CollapsibleRoot
    v-slot="{ open: isOpen }"
    :open="resolvedOpen"
    :disabled="disabled"
    :unmount-on-hide="unmountOnHide"
    data-slot="root"
    :class="ui.root({ class: [pohonProp?.root, props.class] })"
    @update:open="setOpen"
  >
    <CollapsibleTrigger as-child :disabled="!hasContent">
      <button
        type="button"
        data-slot="trigger"
        :class="ui.trigger({ class: pohonProp?.trigger })"
      >
        <span v-if="resolvedIcon || (hasContent && chevron === 'leading')" data-slot="leading" :class="ui.leading({ class: pohonProp?.leading })">
          <PIcon
            v-if="resolvedIcon"
            :name="resolvedIcon"
            data-slot="leadingIcon"
            :class="ui.leadingIcon({ class: pohonProp?.leadingIcon, alone: !(hasContent && chevron === 'leading') })"
          />
          <PIcon
            v-if="hasContent && chevron === 'leading'"
            :name="chevronIconName"
            data-slot="chevronIcon"
            :class="ui.chevronIcon({ class: pohonProp?.chevronIcon, alone: !resolvedIcon })"
          />
        </span>

        <span data-slot="label" :class="ui.label({ class: pohonProp?.label })">
          <PChatShimmer v-if="streaming && text" :text="text" v-bind="props.shimmer" />
          <template v-else>{{ text }}</template>
          <span v-if="suffix" data-slot="suffix" :class="ui.suffix({ class: pohonProp?.suffix })">{{ suffix }}</span>
        </span>

        <PIcon
          v-if="hasContent && chevron === 'trailing'"
          :name="chevronIconName"
          data-slot="trailingIcon"
          :class="ui.trailingIcon({ class: pohonProp?.trailingIcon })"
        />
      </button>
    </CollapsibleTrigger>

    <CollapsibleContent data-slot="content" :class="ui.content({ class: pohonProp?.content })">
      <div data-slot="body" :class="ui.body({ class: pohonProp?.body })">
        <slot :open="isOpen" />
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
