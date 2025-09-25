<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/badge';

type ProseBadge = ComponentConfig<typeof theme, AppConfig, 'badge', 'pohon.prose'>;

export interface ProseBadgeProps {
  class?: any;
}

export interface ProseBadgeSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';
import PBadge from '../badge.vue';

const props = defineProps<ProseBadgeProps>();
defineSlots<ProseBadgeSlots>();

const appConfig = useAppConfig() as ProseBadge['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.badge || {}) }));
</script>

<template>
  <PBadge
    color="primary"
    variant="subtle"
    :class="pohon({ class: props.class })"
  >
    <slot mdc-unwrap="p" />
  </PBadge>
</template>
