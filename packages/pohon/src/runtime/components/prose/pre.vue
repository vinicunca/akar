<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
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
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { useClipboard } from '@vueuse/core';
import { computed } from 'vue';
import { useLocale } from '../../composables/use-locale';
import { uv } from '../../utils/uv';
import PButton from '../button.vue';
import PCodeIcon from './code-icon.vue';

const props = defineProps<ProsePreProps>();
defineSlots<ProsePreSlots>();

const { t } = useLocale();
const { copy, copied } = useClipboard();
const appConfig = useAppConfig() as ProsePre['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.pre || {}) })());
</script>

<template>
  <div :class="pohon.root({ class: [props.pohon?.root], filename: !!filename })">
    <div
      v-if="filename && !hideHeader"
      :class="pohon.header({ class: props.pohon?.header })"
    >
      <PCodeIcon
        :icon="icon"
        :filename="filename"
        :class="pohon.icon({ class: props.pohon?.icon })"
      />

      <span :class="pohon.filename({ class: props.pohon?.filename })">{{ filename }}</span>
    </div>

    <PButton
      :icon="copied ? appConfig.pohon.icons.copyCheck : appConfig.pohon.icons.copy"
      color="neutral"
      variant="outline"
      size="sm"
      :aria-label="t('prose.pre.copy')"
      :class="pohon.copy({ class: props.pohon?.copy })"
      tabindex="-1"
      @click="copy(props.code || '')"
    />

    <pre
      :class="pohon.base({ class: [props.pohon?.base, props.class] })"
      v-bind="$attrs"
    ><slot /></pre>
  </div>
</template>

<style lang="postcss">
.shiki span.line {
  display: block;
}

.shiki span.line.highlight {
  margin: 0 -16px;
  padding: 0 16px;

  @apply bg-background-accented/50;
}
</style>
