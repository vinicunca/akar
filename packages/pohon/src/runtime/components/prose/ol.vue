<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/ol';

type ProseOl = ComponentConfig<typeof theme, AppConfig, 'ol', 'pohon.prose'>;

export interface ProseOlProps {
  class?: any;
  pohon?: { base?: any };
}

export interface ProseOlSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseOlProps>();
defineSlots<ProseOlSlots>();

const appConfig = useAppConfig() as ProseOl['AppConfig'];
const pohonProp = useComponentPohon('prose.ol', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.ol || {}) }));
</script>

<template>
  <ol :class="pohon({ class: [pohonProp?.base, props.class] })">
    <slot />
  </ol>
</template>
