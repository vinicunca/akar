<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/hr';

type ProseHr = ComponentConfig<typeof theme, AppConfig, 'hr', 'pohon.prose'>;

export interface ProseHrProps {
  class?: any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseHrProps>();

const appConfig = useAppConfig() as ProseHr['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.hr || {}) }));
</script>

<template>
  <hr :class="pohon({ class: props.class })">
</template>
