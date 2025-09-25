<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/tr';

type ProseTr = ComponentConfig<typeof theme, AppConfig, 'tr', 'pohon.prose'>;

export interface ProseTrProps {
  class?: any;
}

export interface ProseTrSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseTrProps>();
defineSlots<ProseTrSlots>();

const appConfig = useAppConfig() as ProseTr['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.prose?.tr || {}),
  }),
);
</script>

<template>
  <tr :class="pohon({ class: props.class })">
    <slot />
  </tr>
</template>
