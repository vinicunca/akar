<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/main';

type Main = ComponentConfig<typeof theme, AppConfig, 'main'>;

export interface MainProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'main'
   */
  as?: any;
  class?: any;
  pohon?: { base?: any };
}

export interface MainSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = withDefaults(defineProps<MainProps>(), {
  as: 'main',
});
defineSlots<MainSlots>();

const appConfig = useAppConfig() as Main['AppConfig'];
const pohonProp = useComponentPohon('main', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.main || {}) }));
</script>

<template>
  <Primitive
    :as="as"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
