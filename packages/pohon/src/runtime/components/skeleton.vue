<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/skeleton';

type Skeleton = ComponentConfig<typeof theme, AppConfig, 'skeleton'>;

export interface PSkeletonProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: { base?: any };
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<PSkeletonProps>();

const appConfig = useAppConfig() as Skeleton['AppConfig'];
const pohonProp = useComponentPohon('skeleton', props);

const pohon = computed(() =>
  uv({ extend: uv(theme), ...(appConfig.pohon?.skeleton || {}) }),
);
</script>

<template>
  <APrimitive
    :as="as"
    aria-busy="true"
    aria-label="loading"
    aria-live="polite"
    role="alert"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  >
    <slot />
  </APrimitive>
</template>
