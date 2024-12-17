<script setup lang="ts">
import { ref } from 'vue'
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from '..'

const controlledLtr = ref([44])
const controlledLtrMulti = ref([10, 30])
const controlledRtl = ref([44])
const controlledRtlMulti = ref([10, 30])
</script>

<template>
  <Story
    title="Slider/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Uncontrolled (LTR)">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :default-value="[20]"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>
    <Variant title="Uncontrolled (Multiple) ">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :default-value="[10, 30]"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Uncontrolled (RTL) ">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :default-value="[20]"
        dir="rtl"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>
    <Variant title="Uncontrolled (Multiple RTL) ">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :default-value="[10, 30]"
        dir="rtl"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Uncontrolled (Multiples)">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :default-value="[10, 15, 20, 80]"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled">
      <ASliderRoot
        v-model="controlledLtr"
        class="relative flex items-center select-none touch-none w-[200px] h-5"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled (Multiple)">
      <ASliderRoot
        v-model="controlledLtrMulti"
        class="relative flex items-center select-none touch-none w-[200px] h-5"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled (RTL)">
      <ASliderRoot
        v-model="controlledRtl"
        dir="rtl"
        class="relative flex items-center select-none touch-none w-[200px] h-5"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled (Multiple RTL)">
      <ASliderRoot
        v-model="controlledRtlMulti"
        class="relative flex items-center select-none touch-none w-[200px] h-5"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>
  </Story>
</template>
