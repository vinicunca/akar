<script setup lang="ts">
import type { ASliderRootEmits, ASliderRootProps } from '..';
import { ref } from 'vue';
import { useForwardPropsEmits } from '../../shared';
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from '..';

const props = withDefaults(
  defineProps<ASliderRootProps>(),
  {
    inverted: false,
  },
);
const emits = defineEmits<ASliderRootEmits>();

const sliderValue = ref([50]);

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ASliderRoot
    v-bind="forwarded"
    v-model="sliderValue"
    name="slider"
    class="flex h-5 w-[200px] select-none items-center relative touch-none"
  >
    <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
      <ASliderRange class="rounded-full bg-white h-full absolute" />
    </ASliderTrack>
    <ASliderThumb
      class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
    />
  </ASliderRoot>
</template>
