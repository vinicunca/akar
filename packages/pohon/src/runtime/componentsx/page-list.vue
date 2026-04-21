<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-list';

type PageList = ComponentConfig<typeof theme, AppConfig, 'pageList'>;

export interface PPageListProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  divide?: boolean;
  class?: any;
  pohon?: { base?: any };
}

export interface PPageListSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = withDefaults(defineProps<PPageListProps>(), {
  divide: false,
});
defineSlots<PPageListSlots>();

const appConfig = useAppConfig() as PageList['AppConfig'];
const pohonProp = useComponentPohon('pageList', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageList || {}) }));
</script>

<template>
  <APrimitive
    :as="as"
    role="list"
    :class="pohon({ class: [pohonProp?.base, props.class], divide: props.divide })"
  >
    <slot />
  </APrimitive>
</template>
