<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { CollapsibleRootProps } from 'akar';
import type { VNode } from 'vue';
import type { PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import type { ChatShimmerProps } from './ChatShimmer.vue';
import theme from '#build/pohon/chat-tool';

type ChatTool = ComponentConfig<typeof theme, AppConfig, 'chatTool'>;

export interface ChatToolProps extends Pick<CollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  /**
   * The text content to display.
   */
  text?: string;
  /**
   * The suffix text displayed after the main text.
   */
  suffix?: string;
  /**
   * The icon displayed next to the trigger.
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * Whether the tool is in a loading state.
   * @defaultValue false
   */
  loading?: boolean;
  /**
   * The icon displayed when loading.
   * @defaultValue appConfig.pohon.icons.loading
   * @IconifyIcon
   */
  loadingIcon?: PIconProps['name'];
  /**
   * Whether the tool content is currently streaming.
   * @defaultValue false
   */
  streaming?: boolean;
  /**
   * The visual variant of the tool display.
   * @defaultValue 'inline'
   */
  variant?: ChatTool['variants']['variant'];
  /**
   * The position of the chevron icon.
   * @defaultValue 'trailing'
   */
  chevron?: 'leading' | 'trailing';
  /**
   * The icon displayed as the chevron.
   * @defaultValue appConfig.pohon.icons.chevronDown
   * @IconifyIcon
   */
  chevronIcon?: PIconProps['name'];
  /**
   * Customize the [`ChatShimmer`](https://pohon.nuxt.com/docs/components/chat-shimmer) component when streaming.
   */
  shimmer?: Partial<Omit<ChatShimmerProps, 'text'>>;
  class?: any;
  pohon?: ChatTool['slots'];
}

export interface ChatToolEmits {
  'update:open': [value: boolean];
}

export interface ChatToolSlots {
  default?: (props: { open: boolean }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'akar';
import { computed, ref } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import UChatShimmer from './ChatShimmer.vue';
import PIcon from './icon.vue';

const props = withDefaults(defineProps<ChatToolProps>(), {
  open: undefined,
  loading: false,
  streaming: false,
  variant: 'inline',
  chevron: 'trailing',
  unmountOnHide: false,
});
const emits = defineEmits<ChatToolEmits>();
const slots = defineSlots<ChatToolSlots>();

const appConfig = useAppConfig() as ChatTool['AppConfig'];
const pohonProp = useComponentPohon('chatTool', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.chatTool || {}) })({
  variant: props.variant,
  chevron: props.chevron,
  loading: props.loading,
}));

const isControlled = computed(() => props.open !== undefined);
const internalOpen = ref(props.defaultOpen ?? false);
const resolvedOpen = computed(() => isControlled.value ? props.open : internalOpen.value);

function setOpen(value: boolean) {
  internalOpen.value = value;
  emits('update:open', value);
}

const hasContent = computed(() => !!slots.default);

const resolvedLoadingIcon = computed(() => props.loadingIcon || appConfig.pohon.icons?.loading);
const resolvedIcon = computed(() => props.loading ? resolvedLoadingIcon.value : props.icon);
const chevronIconName = computed(() => props.chevronIcon || appConfig.pohon.icons?.chevronDown);
</script>

<template>
  <CollapsibleRoot
    v-slot="{ open: isOpen }"
    :open="resolvedOpen"
    :disabled="disabled"
    :unmount-on-hide="unmountOnHide"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    @update:open="setOpen"
  >
    <CollapsibleTrigger
      as-child
      :disabled="!hasContent"
    >
      <button
        type="button"
        data-slot="trigger"
        :class="pohon.trigger({ class: pohonProp?.trigger })"
      >
        <span
          v-if="resolvedIcon || (hasContent && chevron === 'leading')"
          data-slot="leading"
          :class="pohon.leading({ class: pohonProp?.leading })"
        >
          <PIcon
            v-if="resolvedIcon"
            :name="resolvedIcon"
            data-slot="leadingIcon"
            :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon, alone: !(hasContent && chevron === 'leading') })"
          />
          <PIcon
            v-if="hasContent && chevron === 'leading'"
            :name="chevronIconName"
            data-slot="chevronIcon"
            :class="pohon.chevronIcon({ class: pohonProp?.chevronIcon, alone: !resolvedIcon })"
          />
        </span>

        <span
          data-slot="label"
          :class="pohon.label({ class: pohonProp?.label })"
        >
          <UChatShimmer
            v-if="streaming && text"
            :text="text"
            v-bind="props.shimmer"
          />
          <template v-else>{{ text }}</template>
          <span
            v-if="suffix"
            data-slot="suffix"
            :class="pohon.suffix({ class: pohonProp?.suffix })"
          >{{ suffix }}</span>
        </span>

        <PIcon
          v-if="hasContent && chevron === 'trailing'"
          :name="chevronIconName"
          data-slot="trailingIcon"
          :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
        />
      </button>
    </CollapsibleTrigger>

    <CollapsibleContent
      data-slot="content"
      :class="pohon.content({ class: pohonProp?.content })"
    >
      <div
        data-slot="body"
        :class="pohon.body({ class: pohonProp?.body })"
      >
        <slot :open="isOpen" />
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
