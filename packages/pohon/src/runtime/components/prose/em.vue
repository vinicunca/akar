<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/em';

type ProseEm = ComponentConfig<typeof theme, AppConfig, 'em', 'pohon.prose'>;

export interface ProseEmProps {
  class?: string;
  pohon?: { base?: any };
}

export interface ProseEmSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseEmProps>();
defineSlots<ProseEmSlots>();

const appConfig = useAppConfig() as ProseEm['AppConfig'];
const pohonProp = useComponentPohon('prose.em', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.em || {}) }));
</script>

<template>
  <em :class="pohon({ class: [pohonProp?.base, props.class] })"><slot /></em>
</template>
