<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/p';

type ProseP = ComponentConfig<typeof theme, AppConfig, 'p', 'pohon.prose'>;

export interface ProsePProps {
  class?: any;
}

export interface ProsePSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProsePProps>();
defineSlots<ProsePSlots>();

const appConfig = useAppConfig() as ProseP['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.p || {}) }));
</script>

<template>
  <p :class="pohon({ class: props.class })">
    <slot />
  </p>
</template>
