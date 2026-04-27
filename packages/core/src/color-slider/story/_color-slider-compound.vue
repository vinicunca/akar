<script setup lang="ts">
import type { Color } from '../../shared/color';
import { computed, ref } from 'vue';
import {
  AColorSliderRoot,
  AColorSliderThumb,
  AColorSliderTrack,
} from '..';
import { AColorSwatch } from '../../color-swatch';
import { colorToString, normalizeColor } from '../../shared/color';

const props = defineProps<{
  defaultValue?: string;
  colorSpace?: 'rgb' | 'hsl' | 'hsb';
  channels: Array<'hue' | 'saturation' | 'lightness' | 'brightness' | 'red' | 'green' | 'blue' | 'alpha'>;
}>();

// Use a Color object as single source of truth to avoid hex round-trip drift.
const colorObj = ref<Color>(normalizeColor(props.defaultValue ?? '#7f007f'));
const hexColor = computed(() => colorToString(colorObj.value, 'hex'));

function handleColorUpdate(newColor: Color) {
  colorObj.value = newColor;
}

const channelLabels: Record<string, string> = {
  hue: 'H',
  saturation: 'S',
  lightness: 'L',
  brightness: 'B',
  red: 'R',
  green: 'G',
  blue: 'B',
  alpha: 'A',
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-center">
      <AColorSwatch
        :color="hexColor"
        class="border-2 border-gray-200 rounded-lg h-12 w-12"
        style="background-color: var(--akar-color-swatch-color)"
      />
      <div class="flex flex-col gap-0.5">
        <span class="text-sm text-gray-700 font-medium">Selected Color</span>
        <code class="text-xs text-gray-500">{{ hexColor }}</code>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div
        v-for="channel in channels"
        :key="channel"
        class="flex gap-3 items-center"
      >
        <span class="text-xs text-gray-500 font-medium shrink-0 w-3">{{ channelLabels[channel] }}</span>
        <AColorSliderRoot
          :model-value="colorObj"
          :channel="channel"
          :color-space="colorSpace ?? 'hsl'"
          class="flex h-5 w-[220px] select-none items-center relative touch-none"
          @update:color="handleColorUpdate"
        >
          <AColorSliderTrack
            class="rounded-full flex-1 h-3 relative"
          >
            <div class="rounded-full inset-0 absolute" />
          </AColorSliderTrack>
          <AColorSliderThumb class="border-2 border-gray-400 rounded-full bg-white h-5 w-5 block cursor-pointer shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110" />
        </AColorSliderRoot>
      </div>
    </div>
  </div>
</template>
