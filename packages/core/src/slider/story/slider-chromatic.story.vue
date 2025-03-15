<script setup lang="ts">
import { ref } from 'vue';
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from '..';

const controlledLtr = ref([44]);
const controlledLtrMulti = ref([10, 30]);
const controlledRtl = ref([44]);
const controlledRtlMulti = ref([10, 30]);
</script>

<template>
  <Story
    title="Slider/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Uncontrolled (LTR)">
      <ASliderRoot
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :default-value="[20]"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>
    <Variant title="Uncontrolled (Multiple) ">
      <ASliderRoot
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :default-value="[10, 30]"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Uncontrolled (RTL) ">
      <ASliderRoot
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :default-value="[20]"
        dir="rtl"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>
    <Variant title="Uncontrolled (Multiple RTL) ">
      <ASliderRoot
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :default-value="[10, 30]"
        dir="rtl"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Uncontrolled (Multiples)">
      <ASliderRoot
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :default-value="[10, 15, 20, 80]"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled">
      <ASliderRoot
        v-model="controlledLtr"
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled (Multiple)">
      <ASliderRoot
        v-model="controlledLtrMulti"
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled (RTL)">
      <ASliderRoot
        v-model="controlledRtl"
        dir="rtl"
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled (Multiple RTL)">
      <ASliderRoot
        v-model="controlledRtlMulti"
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Overflow">
      <ASliderRoot
        :default-value="[50]"
        thumb-alignment="overflow"
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Overflow (RTL)">
      <ASliderRoot
        :default-value="[50]"
        thumb-alignment="overflow"
        dir="rtl"
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
      >
        <ASliderTrack class="relative h-[3px] grow rounded-full bg-blackA10">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Vertical Overflow">
      <ASliderRoot
        class="relative h-[100px] w-5 flex touch-none select-none items-center justify-center"
        :default-value="[50]"
        thumb-alignment="overflow"
        orientation="vertical"
      >
        <ASliderTrack class="relative h-full w-[3px] rounded-full bg-blackA10">
          <ASliderRange class="absolute w-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Vertical Overflow (Inverted)">
      <ASliderRoot
        class="relative h-[100px] w-5 flex touch-none select-none items-center justify-center"
        :default-value="[50]"
        thumb-alignment="overflow"
        orientation="vertical"
        :inverted="true"
      >
        <ASliderTrack class="relative h-full w-[3px] rounded-full bg-blackA10">
          <ASliderRange class="absolute w-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
        />
      </ASliderRoot>
    </Variant>
  </Story>
</template>
