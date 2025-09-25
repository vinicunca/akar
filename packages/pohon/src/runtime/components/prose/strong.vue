<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/strong';

type ProseStrong = ComponentConfig<typeof theme, AppConfig, 'strong', 'pohon.prose'>;

export interface ProseStrongProps {
  class?: any;
}

export interface ProseStrongSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseStrongProps>();
defineSlots<ProseStrongSlots>();

const appConfig = useAppConfig() as ProseStrong['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.strong || {}) }));
</script>

<template>
  <strong :class="pohon({ class: props.class })">
    <slot />
  </strong>
</template>
