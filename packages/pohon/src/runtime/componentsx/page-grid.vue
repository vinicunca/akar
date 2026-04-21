<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-grid';

type PageGrid = ComponentConfig<typeof theme, AppConfig, 'pageGrid'>;

export interface PageGridProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: { base?: any };
}

export interface PageGridSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<PageGridProps>();
defineSlots<PageGridSlots>();

const appConfig = useAppConfig() as PageGrid['AppConfig'];
const pohonProp = useComponentPohon('pageGrid', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageGrid || {}) }));
</script>

<template>
  <Primitive
    :as="as"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
