<script setup lang="ts">
import type { ColorChannel, ColorSpace } from '../../shared/color';
import { ref } from 'vue';
import {
  AColorFieldInput,
  AColorFieldRoot,
} from '..';

const props = defineProps<{
  defaultValue?: string;
  colorSpace?: ColorSpace;
  channel?: ColorChannel;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  disableWheelChange?: boolean;
  step?: number;
}>();

const color = ref(props.defaultValue ?? '#ff0000');
</script>

<template>
  <div class="flex flex-col gap-2">
    <AColorFieldRoot
      v-model="color"
      :color-space="colorSpace ?? 'hsl'"
      :channel="channel"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :disable-wheel-change="disableWheelChange"
      :step="step"
      class="inline-flex flex-col gap-1"
    >
      <AColorFieldInput
        class="text-sm px-3 py-2 border border-gray-300 rounded-md bg-zinc-800 focus:outline-none focus:border-blue-500 read-only:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500"
        :class="channel ? 'w-24' : 'w-36'"
      />
    </AColorFieldRoot>

    <div class="text-xs text-gray-500 flex gap-2 items-center">
      <div
        class="border border-gray-200 rounded h-5 w-5"
        :style="{ background: color }"
      />
      <span>{{ color }}</span>
    </div>
  </div>
</template>
