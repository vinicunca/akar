<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/td';

type ProseTd = ComponentConfig<typeof theme, AppConfig, 'td', 'pohon.prose'>;

export interface ProseTdProps {
  class?: any;
  align?: 'left' | 'center' | 'right';
  pohon?: { base?: any };
}

export interface ProseTdSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseTdProps>();
defineSlots<ProseTdSlots>();

const appConfig = useAppConfig() as ProseTd['AppConfig'];
const pohonProp = useComponentPohon('prose.td', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.td || {}) }));
</script>

<template>
  <td :class="pohon({ class: [pohonProp?.base, props.class], align: props.align })">
    <slot />
  </td>
</template>
