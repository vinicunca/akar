<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/th';

type ProseTh = ComponentConfig<typeof theme, AppConfig, 'th', 'pohon.prose'>;

export interface ProseThProps {
  class?: any;
  align?: 'left' | 'center' | 'right';
  pohon?: { base?: any };
}

export interface ProseThSlots {
  default: (props?: object) => any;
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
  <th :class="pohon({ class: [pohonProp?.base, props.class], align: props.align })">
    <slot />
  </th>
</template>
