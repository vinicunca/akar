<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-body';

type PageBody = ComponentConfig<typeof theme, AppConfig, 'pageBody'>;

export interface PPageBodyProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: { base?: any };
}

export interface PPageBodySlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<PPageBodyProps>();
defineSlots<PPageBodySlots>();

const appConfig = useAppConfig() as PageBody['AppConfig'];
const pohonProp = useComponentPohon('pageBody', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageBody || {}) }));
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  >
    <slot />
  </APrimitive>
</template>
