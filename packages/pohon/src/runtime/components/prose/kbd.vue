<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/kbd';

type ProseKbd = ComponentConfig<typeof theme, AppConfig, 'kbd', 'pohon.prose'>;

export interface ProseKbdProps {
  value: string;
  class?: any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';
import PKbd from '../kbd.vue';

const props = defineProps<ProseKbdProps>();

const appConfig = useAppConfig() as ProseKbd['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.kbd || {}) }));
</script>

<template>
  <PKbd
    :value="value"
    :class="pohon({ class: props.class })"
  />
</template>
