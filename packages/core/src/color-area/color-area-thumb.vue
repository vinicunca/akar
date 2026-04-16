<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AColorAreaThumbProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { APrimitive, usePrimitiveElement } from '../primitive';
import { getChannelName } from '../shared/color';
import { injectAColorAreaRootContext } from './color-area-root.vue';
import { convertValueToPercentage } from './utils';

const props = withDefaults(defineProps<AColorAreaThumbProps>(), {
  as: 'span',
});

const rootContext = injectAColorAreaRootContext();
const { primitiveElement, currentElement } = usePrimitiveElement();

onMounted(() => {
  rootContext.thumbRef.value = currentElement.value;
});

const xPercent = computed(() =>
  convertValueToPercentage(
    rootContext.xValue.value,
    rootContext.xRange.value.min,
    rootContext.xRange.value.max,
  ),
);

const yPercent = computed(() =>
  convertValueToPercentage(
    rootContext.yValue.value,
    rootContext.yRange.value.min,
    rootContext.yRange.value.max,
  ),
);

const ariaLabel = computed(() => {
  return `${getChannelName(rootContext.xChannel.value)}, ${getChannelName(rootContext.yChannel.value)}`;
});

const ariaValueText = computed(() => {
  return `${getChannelName(rootContext.xChannel.value)} ${Math.round(rootContext.xValue.value)}, ${getChannelName(rootContext.yChannel.value)} ${Math.round(rootContext.yValue.value)}`;
});
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    role="slider"
    :tabindex="rootContext.disabled.value ? undefined : 0"
    :aria-label="ariaLabel"
    aria-roledescription="Color thumb"
    :aria-valuemin="rootContext.xRange.value.min"
    :aria-valuemax="rootContext.xRange.value.max"
    :aria-valuenow="rootContext.xValue.value"
    :aria-valuetext="ariaValueText"
    aria-orientation="horizontal"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :as-child="asChild"
    :as="props.as"
    :style="{
      position: 'absolute',
      left: `${xPercent}%`,
      top: `${100 - yPercent}%`,
      transform: 'translate(-50%, -50%)',
      touchAction: 'none',
    }"
  >
    <slot />
  </APrimitive>
</template>
