<script setup lang="ts">
import type { ColorChannel, ColorSpace } from '../../shared/color';
import { ref } from 'vue';
import {
  AColorAreaArea,
  AColorAreaRoot,
  AColorAreaThumb,
} from '..';

const props = defineProps<{
  defaultValue?: string;
  colorSpace?: ColorSpace;
  xChannel?: ColorChannel;
  yChannel?: ColorChannel;
  disabled?: boolean;
}>();

const color = ref(props.defaultValue ?? '#ff0000');
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="text-sm">
      Current: {{ color }}
    </div>

    <AColorAreaRoot
      v-slot="{ style }"
      v-model="color"
      :color-space="colorSpace"
      :x-channel="xChannel"
      :y-channel="yChannel"
      :disabled="disabled"
      class="relative"
    >
      <AColorAreaArea
        class="rounded-lg h-[200px] w-[200px] relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
        :style="style"
      >
        <AColorAreaThumb class="border-2 border-gray-400 rounded-full bg-white h-4 w-4 block cursor-pointer shadow" />
      </AColorAreaArea>
    </AColorAreaRoot>
  </div>
</template>
