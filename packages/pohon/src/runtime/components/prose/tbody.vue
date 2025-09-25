<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/tbody';

type ProseTbody = ComponentConfig<typeof theme, AppConfig, 'tbody', 'pohon.prose'>;

export interface ProseTbodyProps {
  class?: any;
}

export interface ProseTbodySlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseTbodyProps>();
defineSlots<ProseTbodySlots>();

const appConfig = useAppConfig() as ProseTbody['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.tbody || {}) }));
</script>

<template>
  <tbody :class="pohon({ class: props.class })">
    <slot />
  </tbody>
</template>
