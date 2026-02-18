<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/code';

type ProseCode = ComponentConfig<typeof theme, AppConfig, 'code', 'pohon.prose'>;

export interface ProseCodeProps {
  lang?: string;
  /**
   * @defaultValue 'neutral'
   */
  color?: ProseCode['variants']['color'];
  class?: any;
  pohon?: { base?: any };
}

export interface ProseCodeSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseCodeProps>();
defineSlots<ProseCodeSlots>();

const appConfig = useAppConfig() as ProseCode['AppConfig'];
const pohonProp = useComponentPohon('prose.code', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.code || {}) }));
</script>

<template>
  <code :class="pohon({ class: [pohonProp?.base, props.class] })">
    <slot />
  </code>
</template>
