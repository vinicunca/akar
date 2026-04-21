<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ACollapsibleRootProps } from 'akar';
import type { VNode } from 'vue';
import type { PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import type { PChatShimmerProps } from './chat-shimmer.vue';
import theme from '#build/pohon/chat-reasoning';

type ChatReasoning = ComponentConfig<typeof theme, AppConfig, 'chatReasoning'>;

export interface PChatReasoningProps extends Pick<ACollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  /**
   * The reasoning text content to display.
   */
  text?: string;
  /**
   * Whether the reasoning content is currently streaming.
   * @defaultValue false
   */
  streaming?: boolean;
  /**
   * The duration in seconds that the AI spent reasoning.
   * If not provided, it will be calculated automatically based on streaming time.
   */
  duration?: number;
  /**
   * The icon displayed next to the trigger.
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
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
   * The delay in milliseconds before auto-closing when streaming ends.
   * Set to `0` to disable auto-close.
   * @defaultValue 500
   */
  autoCloseDelay?: number;
  /**
   * Customize the [`ChatShimmer`](https://pohon.nuxt.com/docs/components/chat-shimmer) component when streaming.
   */
  shimmer?: Partial<Omit<PChatShimmerProps, 'text'>>;
  class?: any;
  pohon?: ChatReasoning['slots'];
}

export interface PChatReasoningEmits {
  'update:open': [value: boolean];
}

export interface PChatReasoningSlots {
  default?: (props: { open: boolean }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from 'akar';
import { computed, nextTick, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { useScrollShadow } from '../composables/use-scroll-shadow';
import { uv } from '../utils/uv';
import PChatShimmer from './chat-shimmer.vue';
import PIcon from './icon.vue';

const props = withDefaults(defineProps<PChatReasoningProps>(), {
  open: undefined,
  streaming: false,
  chevron: 'trailing',
  unmountOnHide: false,
  autoCloseDelay: 500,
});
const emits = defineEmits<PChatReasoningEmits>();
defineSlots<PChatReasoningSlots>();

const { t, code } = useLocale();
const appConfig = useAppConfig() as ChatReasoning['AppConfig'];
const pohonProp = useComponentPohon('chatReasoning', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.chatReasoning || {}) })({
  chevron: props.chevron,
}));

const isControlled = computed(() => props.open !== undefined);
const internalOpen = ref(props.defaultOpen ?? props.streaming);
const startTime = ref<number | null>(props.streaming ? Date.now() : null);
const internalDuration = ref<number | undefined>(undefined);
const autoCloseTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

watch(() => props.streaming, (streaming, wasStreaming) => {
  if (streaming) {
    if (autoCloseTimeout.value) {
      clearTimeout(autoCloseTimeout.value);
      autoCloseTimeout.value = null;
    }
    if (!wasStreaming) {
      setOpen(true);
      startTime.value = Date.now();
    }
  } else if (wasStreaming) {
    if (startTime.value !== null) {
      internalDuration.value = Math.ceil((Date.now() - startTime.value) / 1000);
      startTime.value = null;
    }
    if (props.autoCloseDelay > 0) {
      autoCloseTimeout.value = setTimeout(() => {
        setOpen(false);
      }, props.autoCloseDelay);
    }
  }
}, { immediate: true });

const actualDuration = computed(() => props.duration ?? internalDuration.value);

const thinkingText = computed(() => {
  if (props.streaming || actualDuration.value === 0) {
    return t('chatReasoning.thinking');
  }
  if (actualDuration.value === undefined) {
    return t('chatReasoning.thought');
  }

  const d = actualDuration.value;
  const unit = d < 60 ? 'second' : 'minute';
  const value = d < 60 ? d : Math.floor(d / 60);
  const duration = new Intl.NumberFormat(code.value, { style: 'unit', unit, unitDisplay: 'long' }).format(value);

  return t('chatReasoning.thoughtFor', { duration });
});

const resolvedOpen = computed(() => isControlled.value ? props.open : internalOpen.value);

function setOpen(value: boolean) {
  if (autoCloseTimeout.value) {
    clearTimeout(autoCloseTimeout.value);
    autoCloseTimeout.value = null;
  }
  internalOpen.value = value;
  emits('update:open', value);
}

onUnmounted(() => {
  if (autoCloseTimeout.value) {
    clearTimeout(autoCloseTimeout.value);
  }
});

const hasContent = computed(() => !!props.text || props.streaming);

const chevronIconName = computed(() => props.chevronIcon || appConfig.pohon.icons?.chevronDown);

const bodyRef = useTemplateRef('bodyRef');
const { style: scrollShadowStyle } = useScrollShadow(bodyRef);

watch(() => props.text, () => {
  if (!props.streaming || !bodyRef.value) {
    return;
  }

  const el = bodyRef.value;
  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

  if (distanceFromBottom < 50) {
    nextTick(() => {
      el.scrollTop = el.scrollHeight;
    });
  }
});
</script>

<template>
  <ACollapsibleRoot
    v-if="hasContent"
    v-slot="{ open: isOpen }"
    :open="resolvedOpen"
    :disabled="disabled"
    :unmount-on-hide="unmountOnHide"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    @update:open="setOpen"
  >
    <ACollapsibleTrigger
      as-child
      :disabled="!hasContent"
    >
      <button
        type="button"
        data-slot="trigger"
        :class="pohon.trigger({ class: pohonProp?.trigger })"
      >
        <span
          v-if="icon || (hasContent && chevron === 'leading')"
          data-slot="leading"
          :class="pohon.leading({ class: pohonProp?.leading })"
        >
          <PIcon
            v-if="icon"
            :name="icon"
            data-slot="leadingIcon"
            :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon, alone: !(hasContent && chevron === 'leading') })"
          />
          <PIcon
            v-if="hasContent && chevron === 'leading'"
            :name="chevronIconName"
            data-slot="chevronIcon"
            :class="pohon.chevronIcon({ class: pohonProp?.chevronIcon, alone: !icon })"
          />
        </span>

        <PChatShimmer
          v-if="streaming"
          :text="thinkingText"
          v-bind="props.shimmer"
          data-slot="label"
          :class="pohon.label({ class: pohonProp?.label })"
        />
        <span
          v-else
          data-slot="label"
          :class="pohon.label({ class: pohonProp?.label })"
        >{{ thinkingText }}</span>

        <PIcon
          v-if="hasContent && chevron === 'trailing'"
          :name="chevronIconName"
          data-slot="trailingIcon"
          :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
        />
      </button>
    </ACollapsibleTrigger>

    <ACollapsibleContent
      data-slot="content"
      :class="pohon.content({ class: pohonProp?.content })"
    >
      <div
        ref="bodyRef"
        data-slot="body"
        :class="pohon.body({ class: pohonProp?.body })"
        :style="scrollShadowStyle"
      >
        <slot :open="isOpen">
          {{ text }}
        </slot>
      </div>
    </ACollapsibleContent>
  </ACollapsibleRoot>
</template>
