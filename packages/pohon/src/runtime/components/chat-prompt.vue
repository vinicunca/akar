<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PTextareaProps, PTextareaSlots } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/chat-prompt';

type ChatPrompt = ComponentConfig<typeof theme, AppConfig, 'chatPrompt'>;

export interface PChatPromptProps extends Pick<PTextareaProps, 'rows' | 'autofocus' | 'autofocusDelay' | 'autoresize' | 'autoresizeDelay' | 'maxrows' | 'icon' | 'avatar' | 'loading' | 'loadingIcon' | 'disabled'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'form'
   */
  as?: any;
  /**
   * The placeholder text for the textarea.
   * @defaultValue t('chatPrompt.placeholder')
   */
  placeholder?: string;
  /**
   * @defaultValue 'outline'
   */
  variant?: ChatPrompt['variants']['variant'];
  error?: Error;
  class?: any;
  pohon?: ChatPrompt['slots'] & PTextareaProps['pohon'];
}

export interface PChatPromptEmits {
  submit: [event: Event];
  close: [event: Event];
}

export interface PChatPromptSlots extends PTextareaSlots {
  header?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { APrimitive, useForwardProps } from 'akar';
import { computed, toRef, useTemplateRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useIMEGuard } from '../composables/use-ime-guard';
import { useLocale } from '../composables/use-locale';
import { omit, transformPohon } from '../utils';
import { uv } from '../utils/uv';
import PTextarea from './textarea.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PChatPromptProps>(), {
  as: 'form',
  autofocus: true,
  autoresize: true,
  rows: 1,
});
const emits = defineEmits<PChatPromptEmits>();
const slots = defineSlots<PChatPromptSlots>();

const model = defineModel<string>({ default: '' });

const { t } = useLocale();
const appConfig = useAppConfig() as ChatPrompt['AppConfig'];
const pohonProp = useComponentPohon('chatPrompt', props);

const textareaProps = useForwardProps(reactivePick(props, 'rows', 'autofocus', 'autofocusDelay', 'autoresize', 'autoresizeDelay', 'maxrows', 'icon', 'avatar', 'loading', 'loadingIcon'));

const getProxySlots = () => omit(slots, ['header', 'footer']);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.chatPrompt || {}) })({
  variant: props.variant,
}));

const textareaRef = useTemplateRef('textareaRef');

function submit(event: Event) {
  if (model.value.trim() === '') {
    return;
  }

  emits('submit', event);
}

function blur(event: Event) {
  textareaRef.value?.textareaRef?.blur();

  emits('close', event);
}

const { onKeydown: onEnter, onCompositionEnd } = useIMEGuard((event) => {
  submit(event);
});

defineExpose({
  textareaRef: toRef(() => textareaRef.value?.textareaRef),
});
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    @submit.prevent="submit"
  >
    <div
      v-if="!!slots.header"
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
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
      :pohon="transformPohon(omit(pohon, ['root', 'body', 'header', 'footer']), pohonProp)"
      data-slot="body"
      :class="pohon.body({ class: pohonProp?.body })"
      @keydown.enter.exact="onEnter"
      @compositionend="onCompositionEnd"
      @keydown.esc="blur"
    >
      <template
        v-for="(_, name) in getProxySlots()"
        #[name]="slotData"
      >
        <slot
          :name="name"
          v-bind="slotData"
        />
      </template>
    </PTextarea>

    <div
      v-if="!!slots.footer"
      data-slot="footer"
      :class="pohon.footer({ class: pohonProp?.footer })"
    >
      <slot name="footer" />
    </div>
  </APrimitive>
</template>
