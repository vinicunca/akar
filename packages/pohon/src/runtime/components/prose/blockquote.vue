<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/blockquote';

type ProseBlockquote = ComponentConfig<typeof theme, AppConfig, 'blockquote', 'pohon.prose'>;

export interface ProseBlockquoteProps {
  class?: any;
}

export interface ProseBlockquoteSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseBlockquoteProps>();
defineSlots<ProseBlockquoteSlots>();

const appConfig = useAppConfig() as ProseBlockquote['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.blockquote || {}) }));
</script>

<template>
  <blockquote :class="pohon({ class: props.class })">
    <slot />
  </blockquote>
</template>
