<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { UIMessage, FileUIPart } from 'ai'
import theme from '#build/pohon/chat-message'
import type { PAvatarProps, PButtonProps, PIconProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type ChatMessage = ComponentConfig<typeof theme, AppConfig, 'chatMessage'>

export interface ChatMessageProps extends UIMessage {
  /**
   * The element or component this component should render as.
   * @defaultValue 'article'
   */
  as?: any
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name']
  avatar?: PAvatarProps & { [key: string]: any }
  /**
   * @defaultValue 'naked'
   */
  variant?: ChatMessage['variants']['variant']
  /**
   * @defaultValue 'left'
   */
  side?: ChatMessage['variants']['side']
  /**
   * Display a list of actions under the message.
   * The `label` will be used in a tooltip.
   * `{ size: 'xs', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  actions?: (Omit<PButtonProps, 'onClick'> & { onClick?: (e: MouseEvent, message: UIMessage) => void })[]
  /**
   * Render the message in a compact style.
   * This is done automatically when used inside a `UChatPalette`{lang="ts-type"}.
   * @defaultValue false
   */
  compact?: boolean
  /**
   * @deprecated Use `parts` instead. (https://ai-sdk.dev/docs/migration-guides/migration-guide-5-0#content--parts-array)
   * Use to display the content of the message.
   */
  content?: string
  class?: any
  pohon?: ChatMessage['slots']
}

export interface ChatMessageSlots {
  leading?(props: { avatar: ChatMessageProps['avatar'], pohon: ChatMessage['pohon'] }): VNode[]
  files?(props: { parts: FileUIPart[] }): VNode[]
  content?(props: ChatMessageProps): VNode[]
  actions?(props: { actions: ChatMessageProps['actions'] }): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { omit } from '../utils'
import { tv } from '../utils/tv'
import PButton from './button.vue'
import PTooltip from './tooltip.vue'
import PAvatar from './avatar.vue'
import PIcon from './icon.vue'

const props = withDefaults(defineProps<ChatMessageProps>(), {
  as: 'article'
})
const slots = defineSlots<ChatMessageSlots>()

const appConfig = useAppConfig() as ChatMessage['AppConfig']
const pohonProp = useComponentPohon('chatMessage', props)

const fileParts = computed(() => props.parts?.filter((part): part is FileUIPart => part.type === 'file') ?? [])

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.chatMessage || {}) })({
  variant: props.variant,
  side: props.side,
  leading: !!props.icon || !!props.avatar || !!slots.leading,
  actions: !!props.actions || !!slots.actions,
  compact: props.compact
}))
</script>

<template>
  <Primitive :as="as" :data-role="role" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })">
    <div v-if="!!slots.files && fileParts.length" data-slot="files" :class="ui.files({ class: pohonProp?.files })">
      <slot name="files" :parts="fileParts" />
    </div>

    <div data-slot="container" :class="ui.container({ class: pohonProp?.container })">
      <div v-if="icon || avatar || !!slots.leading" data-slot="leading" :class="ui.leading({ class: pohonProp?.leading })">
        <slot name="leading" :avatar="avatar" : pohon="ui">
          <PIcon v-if="icon" :name="icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: pohonProp?.leadingIcon })" />
          <PAvatar v-else-if="avatar" :size="((pohonProp?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])" v-bind="avatar" data-slot="leadingAvatar" :class="ui.leadingAvatar({ class: pohonProp?.leadingAvatar })" />
        </slot>
      </div>

      <div v-if="content || parts.length || !!slots.content" data-slot="content" :class="ui.content({ class: pohonProp?.content })">
        <slot
          :id="id"
          name="content"
          :role="role"
          :content="content"
          :parts="parts"
        >
          <template v-if="content">
            {{ content }}
          </template>
          <template v-else>
            <template v-for="(part, index) in parts" :key="`${id}-${part.type}-${index}`">
              <template v-if="part.type === 'text'">
                {{ part.text }}
              </template>
            </template>
          </template>
        </slot>
      </div>

      <div v-if="actions || !!slots.actions" data-slot="actions" :class="ui.actions({ class: pohonProp?.actions })">
        <slot name="actions" :actions="actions">
          <PTooltip v-for="(action, index) in actions" :key="index" :text="action.label">
            <PButton
              size="sm"
              color="neutral"
              variant="ghost"
              v-bind="omit(action, ['onClick'])"
              :label="undefined"
              @click="typeof action.onClick === 'function' ? action.onClick($event, props) : undefined"
            />
          </PTooltip>
        </slot>
      </div>
    </div>
  </Primitive>
</template>
