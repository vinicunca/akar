<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/thead';

type ProseThead = ComponentConfig<typeof theme, AppConfig, 'thead', 'pohon.prose'>;

export interface ProseTheadProps {
  class?: any;
}

export interface ProseTheadSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseTheadProps>();
defineSlots<ProseTheadSlots>();

const appConfig = useAppConfig() as ProseThead['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.thead || {}) }));
</script>

<template>
  <thead :class="pohon({ class: props.class })">
    <slot />
  </thead>
</template>
