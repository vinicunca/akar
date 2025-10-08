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
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :default-value="[20]"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>
    <Variant title="Uncontrolled (Multiple) ">
      <ASliderRoot
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :default-value="[10, 30]"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Uncontrolled (RTL) ">
      <ASliderRoot
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :default-value="[20]"
        dir="rtl"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>
    <Variant title="Uncontrolled (Multiple RTL) ">
      <ASliderRoot
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :default-value="[10, 30]"
        dir="rtl"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Uncontrolled (Multiples)">
      <ASliderRoot
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :default-value="[10, 15, 20, 80]"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled">
      <ASliderRoot
        v-model="controlledLtr"
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled (Multiple)">
      <ASliderRoot
        v-model="controlledLtrMulti"
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled (RTL)">
      <ASliderRoot
        v-model="controlledRtl"
        dir="rtl"
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Controlled (Multiple RTL)">
      <ASliderRoot
        v-model="controlledRtlMulti"
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Overflow">
      <ASliderRoot
        :default-value="[50]"
        thumb-alignment="overflow"
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Overflow (RTL)">
      <ASliderRoot
        :default-value="[50]"
        thumb-alignment="overflow"
        dir="rtl"
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Vertical Overflow">
      <ASliderRoot
        class="flex h-[100px] w-5 select-none items-center justify-center relative touch-none"
        :default-value="[50]"
        thumb-alignment="overflow"
        orientation="vertical"
      >
        <ASliderTrack class="bg-blackA10 rounded-full h-full w-[3px] relative">
          <ASliderRange class="rounded-full bg-white w-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Vertical Overflow (Inverted)">
      <ASliderRoot
        class="flex h-[100px] w-5 select-none items-center justify-center relative touch-none"
        :default-value="[50]"
        thumb-alignment="overflow"
        orientation="vertical"
        :inverted="true"
      >
        <ASliderTrack class="bg-blackA10 rounded-full h-full w-[3px] relative">
          <ASliderRange class="rounded-full bg-white w-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>
  </Story>
</template>
