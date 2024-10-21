<script setup lang="ts">
import { ref } from 'vue';

import { useForwardPropsEmits } from '~~/shared';

import type { ASliderRootEmits, ASliderRootProps } from '..';

import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from '..';

const props = defineProps<ASliderRootProps>();
const emits = defineEmits<ASliderRootEmits>();

const sliderValue = ref([50]);

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ASliderRoot
    v-bind="forwarded"
    v-model="sliderValue"
    name="slider"
    class="relative h-5 w-[200px] flex touch-none select-none items-center"
  >
    <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
      <ASliderRange class="absolute h-full rounded-full bg-white" />
    </ASliderTrack>
    <ASliderThumb
      class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
    />
  </ASliderRoot>
</template>
