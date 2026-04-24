<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PIconProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/prompt';

type ProsePrompt = ComponentConfig<typeof theme, AppConfig, 'prompt', 'pohon.prose'>;

export interface ProsePromptProps {
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * @defaultValue ['copy']
   */
  actions?: Array<'copy' | 'cursor' | 'windsurf'>;
  class?: any;
  pohon?: ProsePrompt['slots'];
}

export interface ProsePromptSlots {
  default: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { useLocale } from '../../composables/use-locale';
import { getSlotChildrenText } from '../../utils';
import { uv } from '../../utils/uv';
import PButton from '../button.vue';
import PIcon from '../icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ProsePromptProps>(), {
  actions: () => ['copy'],
});
const slots = defineSlots<ProsePromptSlots>();

const { t } = useLocale();
const { copy, copied } = useClipboard();
const appConfig = useAppConfig() as ProsePrompt['AppConfig'];
const pohonProp = useComponentPohon('prose.prompt', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.prompt || {}) })());

function getPromptText() {
  const children = slots.default?.();
  return children ? getSlotChildrenText(children).trim() : '';
}

function copyPrompt() {
  copy(getPromptText());
}

function openInCursor() {
  const url = new URL('cursor://anysphere.cursor-deeplink/prompt');
  url.searchParams.set('text', getPromptText());

  window.open(url.toString(), '_self');
}

function openInWindsurf() {
  const url = new URL('windsurf://cascade/newChat');
  url.searchParams.set('prompt', getPromptText());

  window.open(url.toString(), '_self');
}
</script>

<template>
  <div
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    v-bind="$attrs"
  >
    <PIcon
      v-if="icon"
      :name="icon"
      :class="pohon.icon({ class: pohonProp?.icon })"
    />

    <div :class="pohon.content({ class: pohonProp?.content })">
      <p
        v-if="description"
        :class="pohon.description({ class: pohonProp?.description })"
      >
        {{ description }}
      </p>
    </div>

    <div :class="pohon.actions({ class: pohonProp?.actions })">
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
