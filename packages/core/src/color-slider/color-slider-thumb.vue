<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AColorSliderThumbProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { getChannelName } from '../shared/color';
import { ASliderThumb } from '../slider';
import { injectAColorSliderRootContext } from './color-slider-root.vue';

const props = withDefaults(
  defineProps<AColorSliderThumbProps>(),
  {
    as: 'span',
  },
);

defineSlots<{
  default?: (props: {
    /** The display name of the current channel */
    channelName: string;
    /** The current numeric value of the channel */
    channelValue: number;
  }) => any;
}>();

const rootContext = injectAColorSliderRootContext();

const ariaLabel = computed(() => {
  return getChannelName(rootContext.channel.value);
});

const ariaValueText = computed(() => {
  const value = rootContext.channelValue.value;
  const channel = rootContext.channel.value;
  if (channel === 'alpha') {
    return `${Math.round(value)}%`;
  }
  return String(Math.round(value));
});
</script>

<template>
  <ASliderThumb
    :as="props.as"
    :as-child="asChild"
    :aria-label="ariaLabel"
    :aria-valuetext="ariaValueText"
  >
    <slot
      :channel-name="ariaLabel"
      :channel-value="rootContext.channelValue.value"
    />
  </ASliderThumb>
</template>
