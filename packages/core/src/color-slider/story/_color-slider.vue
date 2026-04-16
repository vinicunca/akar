<script setup lang="ts">
import { ref } from 'vue';
import {
  AColorSliderRoot,
  AColorSliderThumb,
  AColorSliderTrack,
} from '..';

const props = defineProps<{
  defaultValue?: string;
  channel?: 'hue' | 'saturation' | 'lightness' | 'brightness' | 'red' | 'green' | 'blue' | 'alpha';
  colorSpace?: 'rgb' | 'hsl' | 'hsb';
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  inverted?: boolean;
  step?: number;
}>();

const color = ref(props.defaultValue ?? '#ff0000');
</script>

<template>
  <div class="flex flex-col gap-3">
    <AColorSliderRoot
      v-model="color"
      :channel="channel ?? 'hue'"
      :color-space="colorSpace ?? 'hsl'"
      :orientation="orientation ?? 'horizontal'"
      :disabled="disabled"
      :inverted="inverted"
      :step="step"
      class="flex select-none items-center relative touch-none"
      :class="orientation === 'vertical' ? 'h-[200px] w-5' : 'w-[200px] h-5'"
    >
      <AColorSliderTrack
        class="rounded-full flex-1 relative"
        :class="orientation === 'vertical' ? 'w-3' : 'h-3'"
      >
        <div class="rounded-full inset-0 absolute" />
      </AColorSliderTrack>
      <AColorSliderThumb
        class="border-2 border-gray-400 rounded-full bg-white h-5 w-5 block cursor-pointer shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110"
        :class="disabled ? 'opacity-50 !cursor-not-allowed hover:!scale-100' : ''"
      />
    </AColorSliderRoot>

    <div class="text-xs text-gray-500 flex gap-2 items-center">
      <div
        class="border border-gray-200 rounded shrink-0 h-5 w-5"
        :style="{ background: color }"
      />
      <span class="font-mono">{{ color }}</span>
    </div>
  </div>
</template>
