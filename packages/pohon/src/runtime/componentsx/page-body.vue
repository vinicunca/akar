<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-body';

type PageBody = ComponentConfig<typeof theme, AppConfig, 'pageBody'>;

export interface PageBodyProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: { base?: any };
}

export interface PageBodySlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<PageBodyProps>();
defineSlots<PageBodySlots>();

const appConfig = useAppConfig() as PageBody['AppConfig'];
const pohonProp = useComponentPohon('pageBody', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageBody || {}) }));
</script>

<template>
  <Primitive
    :as="as"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
