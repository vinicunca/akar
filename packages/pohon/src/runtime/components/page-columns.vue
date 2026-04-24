<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-columns';

type PageColumns = ComponentConfig<typeof theme, AppConfig, 'pageColumns'>;

export interface PPageColumnsProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: { base?: any };
}

export interface PPageColumnsSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<PPageColumnsProps>();
defineSlots<PPageColumnsSlots>();

const appConfig = useAppConfig() as PageColumns['AppConfig'];
const pohonProp = useComponentPohon('pageColumns', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageColumns || {}) }));
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  >
    <slot />
  </APrimitive>
</template>
