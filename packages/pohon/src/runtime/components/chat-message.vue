<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { FileUIPart, UIMessage } from 'ai';
import type { VNode } from 'vue';
import type { PAvatarProps, PButtonProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/chat-message';

type ChatMessage = ComponentConfig<typeof theme, AppConfig, 'chatMessage'>;

export interface PChatMessageProps extends UIMessage {
  /**
   * The element or component this component should render as.
   * @defaultValue 'article'
   */
  as?: any;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: PAvatarProps & { [key: string]: any };
  /**
   * @defaultValue 'naked'
   */
  variant?: ChatMessage['variants']['variant'];
  /**
   * @defaultValue 'left'
   */
  side?: ChatMessage['variants']['side'];
  /**
   * Display a list of actions under the message.
   * The `label` will be used in a tooltip.
   * `{ size: 'xs', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  actions?: Array<Omit<PButtonProps, 'onClick'> & { onClick?: (event: MouseEvent, message: UIMessage) => void }>;
  /**
   * Render the message in a compact style.
   * This is done automatically when used inside a `UChatPalette`{lang="ts-type"}.
   * @defaultValue false
   */
  compact?: boolean;
  /**
   * @deprecated Use `parts` instead. (https://ai-sdk.dev/docs/migration-guides/migration-guide-5-0#content--parts-array)
   * Use to display the content of the message.
   */
  content?: string;
  class?: any;
  pohon?: ChatMessage['slots'];
}

export interface PChatMessageSlots {
  leading?: (props: { avatar: PChatMessageProps['avatar']; pohon: ChatMessage['pohon'] }) => Array<VNode>;
  files?: (props: { parts: Array<FileUIPart> }) => Array<VNode>;
  content?: (props: PChatMessageProps) => Array<VNode>;
  actions?: (props: { actions: PChatMessageProps['actions'] }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { isFunction } from '@vinicunca/perkakas';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { omit } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import PIcon from './icon.vue';
import PTooltip from './tooltip.vue';

const props = withDefaults(defineProps<PChatMessageProps>(), {
  as: 'article',
});
const slots = defineSlots<PChatMessageSlots>();

const appConfig = useAppConfig() as ChatMessage['AppConfig'];
const pohonProp = useComponentPohon('chatMessage', props);

const fileParts = computed(() => props.parts?.filter((part): part is FileUIPart => part.type === 'file') ?? []);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.chatMessage || {}) })({
  variant: props.variant,
  side: props.side,
  leading: !!props.icon || !!props.avatar || !!slots.leading,
  actions: !!props.actions || !!slots.actions,
  compact: props.compact,
}));
</script>

<template>
  <APrimitive
    :as="as"
    :data-role="role"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      v-if="!!slots.files && fileParts.length"
      data-slot="files"
      :class="pohon.files({ class: pohonProp?.files })"
    >
      <slot
        name="files"
        :parts="fileParts"
      />
    </div>

    <div
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <div
        v-if="icon || avatar || !!slots.leading"
        data-slot="leading"
        :class="pohon.leading({ class: pohonProp?.leading })"
      >
        <slot
          name="leading"
          :avatar="avatar"
          :pohon="pohon"
        >
          <PIcon
            v-if="icon"
            :name="icon"
            data-slot="leadingIcon"
            :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
          />
          <PAvatar
            v-else-if="avatar"
            :size="((pohonProp?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])"
            v-bind="avatar"
            data-slot="leadingAvatar"
            :class="pohon.leadingAvatar({ class: pohonProp?.leadingAvatar })"
          />
        </slot>
      </div>

      <div
        v-if="content || parts.length || !!slots.content"
        data-slot="content"
        :class="pohon.content({ class: pohonProp?.content })"
      >
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
            <template
              v-for="(part, index) in parts"
              :key="`${id}-${part.type}-${index}`"
            >
              <template v-if="part.type === 'text'">
                {{ part.text }}
              </template>
            </template>
          </template>
        </slot>
      </div>

      <div
        v-if="actions || !!slots.actions"
        data-slot="actions"
        :class="pohon.actions({ class: pohonProp?.actions })"
      >
        <slot
          name="actions"
          :actions="actions"
        >
          <PTooltip
            v-for="(action, index) in actions"
            :key="index"
            :text="action.label"
          >
            <PButton
              size="sm"
              color="neutral"
              variant="ghost"
              v-bind="omit(action, ['onClick'])"
              :label="undefined"
              @click="isFunction(action.onClick) ? action.onClick($event, props) : undefined"
            />
          </PTooltip>
        </slot>
      </div>
    </div>
  </APrimitive>
</template>
