<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/th';

type ProseTh = ComponentConfig<typeof theme, AppConfig, 'th', 'pohon.prose'>;

export interface ProseThProps {
  align?: 'left' | 'center' | 'right';
  class?: any;
  pohon?: { base?: any };
}

export interface ProseThSlots {
  default: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseThProps>();
defineSlots<ProseThSlots>();

const appConfig = useAppConfig() as ProseTh['AppConfig'];
const pohonProp = useComponentPohon('prose.th', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.th || {}) }));
</script>

<template>
  <th :class="pohon({ align: props.align, class: [pohonProp?.base, props.class] })">
    <slot />
  </th>
</template>
