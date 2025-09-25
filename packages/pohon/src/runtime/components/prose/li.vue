<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/li';

type ProseLi = ComponentConfig<typeof theme, AppConfig, 'li', 'pohon.prose'>;

export interface ProseLiProps {
  class?: any;
}

export interface ProseLiSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseLiProps>();
defineSlots<ProseLiSlots>();

const appConfig = useAppConfig() as ProseLi['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.li || {}) }));
</script>

<template>
  <li :class="pohon({ class: props.class })">
    <slot />
  </li>
</template>
