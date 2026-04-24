<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PIconProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/pre';

type ProsePre = ComponentConfig<typeof theme, AppConfig, 'pre', 'pohon.prose'>;

export interface ProsePreProps {
  icon?: PIconProps['name'];
  code?: string;
  language?: string;
  filename?: string;
  highlights?: Array<number>;
  hideHeader?: boolean;
  meta?: string;
  class?: any;
  pohon?: ProsePre['slots'];
}

export interface ProsePreSlots {
  default: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { computed, useTemplateRef } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { useLocale } from '../../composables/use-locale';
import { uv } from '../../utils/uv';
import PButton from '../button.vue';
import PCodeIcon from './code-icon.vue';

const props = defineProps<ProsePreProps>();
defineSlots<ProsePreSlots>();

const { t } = useLocale();
const { copy, copied } = useClipboard();
const appConfig = useAppConfig() as ProsePre['AppConfig'];
const pohonProp = useComponentPohon('prose.pre', props);

const baseRef = useTemplateRef('baseRef');

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.pre || {}) })());

function copyCode() {
  const code = props.code ?? baseRef.value?.textContent ?? '';

  copy(code);
}
</script>

<template>
  <div :class="pohon.root({ class: [pohonProp?.root], filename: !!filename })">
    <div
      v-if="filename && !hideHeader"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <PCodeIcon
        :icon="icon"
        :filename="filename"
        :class="pohon.icon({ class: pohonProp?.icon })"
      />

      <span :class="pohon.filename({ class: pohonProp?.filename })">{{ filename }}</span>
    </div>

    <PButton
      :icon="copied ? appConfig.pohon.icons.copyCheck : appConfig.pohon.icons.copy"
      color="neutral"
      variant="outline"
      size="sm"
      :aria-label="t('prose.pre.copy')"
      :class="pohon.copy({ class: pohonProp?.copy })"
      tabindex="-1"
      @click="copyCode"
    />

    <pre
      ref="baseRef"
      :class="pohon.base({ class: [pohonProp?.base, props.class] })"
      v-bind="$attrs"
    ><slot /></pre>
  </div>
</template>
