<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AColorSliderTrackProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { getSliderBackgroundStyle } from '../shared/color';
import { ASliderTrack } from '../slider';
import { injectAColorSliderRootContext } from './color-slider-root.vue';

const props = withDefaults(
  defineProps<AColorSliderTrackProps>(),
  {
    as: 'span',
  },
);

const rootContext = injectAColorSliderRootContext();

const backgroundStyle = computed(() => {
  return getSliderBackgroundStyle(
    rootContext.color.value,
    rootContext.channel.value,
    rootContext.colorSpace.value,
  );
});
</script>

<template>
  <ASliderTrack
    :as="props.as"
    :as-child="asChild"
    :style="backgroundStyle"
  >
    <slot />
  </ASliderTrack>
</template>
