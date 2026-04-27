<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/td';

type ProseTd = ComponentConfig<typeof theme, AppConfig, 'td', 'pohon.prose'>;

export interface ProseTdProps {
  align?: 'left' | 'center' | 'right';
  class?: any;
  pohon?: { base?: any };
}

export interface ProseTdSlots {
  default: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseTdProps>();
defineSlots<ProseTdSlots>();

const appConfig = useAppConfig() as ProseTd['AppConfig'];
const pohonProp = useComponentPohon('prose.td', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.td || {}) }));
</script>

<template>
  <td :class="pohon({ align: props.align, class: [pohonProp?.base, props.class] })">
    <slot />
  </td>
</template>
