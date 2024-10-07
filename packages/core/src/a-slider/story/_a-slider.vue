<script setup lang="ts">
import { ref } from 'vue';

import { useForwardPropsEmits } from '~~/shared';

import type { SliderRootEmits, SliderRootProps } from '..';

import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '..';

const props = defineProps<SliderRootProps>();
const emits = defineEmits<SliderRootEmits>();

const sliderValue = ref([50]);

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SliderRoot
    v-bind="forwarded"
    v-model="sliderValue"
    name="slider"
    class="relative h-5 w-[200px] flex touch-none select-none items-center"
  >
    <SliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
      <SliderRange class="absolute h-full rounded-full bg-white" />
    </SliderTrack>
    <SliderThumb
      class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
    />
  </SliderRoot>
</template>
