<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface ASliderTrackProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { injectASliderRootContext } from './slider-root.vue';

withDefaults(defineProps<ASliderTrackProps>(), { as: 'span' });

const rootContext = injectASliderRootContext();

useForwardExpose();
</script>

<template>
  <APrimitive
    :as-child="asChild"
    :as="as"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :data-orientation="rootContext.orientation.value"
  >
    <slot />
  </APrimitive>
</template>
