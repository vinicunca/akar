<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/icon';

type ProseIcon = ComponentConfig<typeof theme, AppConfig, 'icon', 'pohon.prose'>;

export interface ProseIconProps {
  name: string;
  class?: any;
  pohon?: { base?: any };
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';

const props = defineProps<ProseIconProps>();

const appConfig = useAppConfig() as ProseIcon['AppConfig'];
const pohonProp = useComponentPohon('prose.icon', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.icon || {}) }));
</script>

<template>
  <PIcon
    :name="name"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  />
</template>
