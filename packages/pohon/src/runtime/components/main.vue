<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/main';

type Main = ComponentConfig<typeof theme, AppConfig, 'main'>;

export interface PMainProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'main'
   */
  as?: any;
  class?: any;
}

export interface PMainSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PMainProps>(),
  {
    as: 'main',
  },
);

defineSlots<PMainSlots>();

const appConfig = useAppConfig() as Main['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.main || {}),
  }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon({ class: props.class })"
  >
    <slot />
  </APrimitive>
</template>
