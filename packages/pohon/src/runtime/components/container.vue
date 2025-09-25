<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { APrimitiveProps } from 'akar';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/container';

type Container = ComponentConfig<typeof theme, AppConfig, 'container'>;

export interface PContainerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  class?: any;
}

export interface ContainerSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { uv } from '../utils/uv';

const props = defineProps<PContainerProps>();
defineSlots<ContainerSlots>();

const appConfig = useAppConfig() as Container['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.container || {}),
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
