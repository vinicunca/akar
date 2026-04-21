<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/badge';

type ProseBadge = ComponentConfig<typeof theme, AppConfig, 'badge', 'pohon.prose'>;

export interface ProseBadgeProps {
  class?: any;
  pohon?: { base?: any };
}

export interface ProseBadgeSlots {
  default: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';
import UBadge from '../Badge.vue';

const props = defineProps<ProseBadgeProps>();
defineSlots<ProseBadgeSlots>();

const appConfig = useAppConfig() as ProseBadge['AppConfig'];
const pohonProp = useComponentPohon('prose.badge', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.badge || {}) }));
</script>

<template>
  <UBadge
    color="primary"
    variant="subtle"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  >
    <slot mdc-unwrap="p" />
  </UBadge>
</template>
