<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ChatStatus } from 'ai';
import type { ButtonSlots, PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/chat-prompt-submit';

type ChatPromptSubmit = ComponentConfig<typeof theme, AppConfig, 'chatPromptSubmit'>;

export interface ChatPromptSubmitProps extends Omit<PButtonProps, PLinkPropsKeys | 'icon' | 'color' | 'variant'> {
  status?: ChatStatus;
  /**
   * The icon displayed in the button when the status is `ready`.
   * @defaultValue appConfig.pohon.icons.arrowUp
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * The color of the button when the status is `ready`.
   * @defaultValue 'primary'
   */
  color?: PButtonProps['color'];
  /**
   * The variant of the button when the status is `ready`.
   * @defaultValue 'solid'
   */
  variant?: PButtonProps['variant'];
  /**
   * The icon displayed in the button when the status is `streaming`.
   * @defaultValue appConfig.pohon.icons.stop
   * @IconifyIcon
   */
  streamingIcon?: PIconProps['name'];
  /**
   * The color of the button when the status is `streaming`.
   * @defaultValue 'neutral'
   */
  streamingColor?: PButtonProps['color'];
  /**
   * The variant of the button when the status is `streaming`.
   * @defaultValue 'subtle'
   */
  streamingVariant?: PButtonProps['variant'];
  /**
   * The icon displayed in the button when the status is `submitted`.
   * @defaultValue appConfig.pohon.icons.stop
   * @IconifyIcon
   */
  submittedIcon?: PIconProps['name'];
  /**
   * The color of the button when the status is `submitted`.
   * @defaultValue 'neutral'
   */
  submittedColor?: PButtonProps['color'];
  /**
   * The variant of the button when the status is `submitted`.
   * @defaultValue 'subtle'
   */
  submittedVariant?: PButtonProps['variant'];
  /**
   * The icon displayed in the button when the status is `error`.
   * @defaultValue appConfig.pohon.icons.reload
   * @IconifyIcon
   */
  errorIcon?: PIconProps['name'];
  /**
   * The color of the button when the status is `error`.
   * @defaultValue 'error'
   */
  errorColor?: PButtonProps['color'];
  /**
   * The variant of the button when the status is `error`.
   * @defaultValue 'soft'
   */
  errorVariant?: PButtonProps['variant'];
  pohon?: ChatPromptSubmit['slots'] & PButtonProps['pohon'];
  class?: any;
}

export interface ChatPromptSubmitEmits {
  stop: [event: MouseEvent];
  reload: [event: MouseEvent];
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { transformPohon } from '../utils';
import { uv } from '../utils/uv';
import PButton from './button.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ChatPromptSubmitProps>(), {
  status: 'ready',
  streamingColor: 'neutral',
  streamingVariant: 'subtle',
  submittedColor: 'neutral',
  submittedVariant: 'subtle',
  errorColor: 'error',
  errorVariant: 'soft',
});
const emits = defineEmits<ChatPromptSubmitEmits>();
const slots = defineSlots<ButtonSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as ChatPromptSubmit['AppConfig'];
const pohonProp = useComponentPohon('chatPromptSubmit', props);

const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'color', 'variant', 'status', 'disabled', 'streamingIcon', 'streamingColor', 'streamingVariant', 'submittedIcon', 'submittedColor', 'submittedVariant', 'errorIcon', 'errorColor', 'errorVariant', 'class', 'pohon'));

const disabled = computed(() => props.status === 'ready' ? props.disabled : false);

const statusButtonProps = computed(() => ({
  ready: {
    icon: props.icon || appConfig.pohon.icons.arrowUp,
    color: props.color,
    variant: props.variant,
    type: 'submit' as const,
  },
  submitted: {
    icon: props.submittedIcon || appConfig.pohon.icons.stop,
    color: props.submittedColor,
    variant: props.submittedVariant,
    onClick(e) {
      emits('stop', e);
    },
  },
  streaming: {
    icon: props.streamingIcon || appConfig.pohon.icons.stop,
    color: props.streamingColor,
    variant: props.streamingVariant,
    onClick(e) {
      emits('stop', e);
    },
  },
  error: {
    icon: props.errorIcon || appConfig.pohon.icons.reload,
    color: props.errorColor,
    variant: props.errorVariant,
    onClick(e) {
      emits('reload', e);
    },
  },
} satisfies { [key: string]: PButtonProps })[props.status]);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.chatPromptSubmit || {}) })());
</script>

<template>
  <PButton
    v-bind="{
      ...buttonProps,
      ...statusButtonProps,
      disabled,
      'aria-label': t('chatPromptSubmit.label'),
      ...$attrs,
    }"
    :class="pohon.base({ class: [pohonProp?.base, props.class] })"
    :pohon="transformPohon(ui, pohonProp)"
  >
    <template
      v-for="(_, name) in slots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>
  </PButton>
</template>
