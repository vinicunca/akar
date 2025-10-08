<script setup lang="ts">
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from '..';

function alert(message: string) {
  alert(message);
}
</script>

<template>
  <Story
    title="Slider/Extremes"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Extreme">
      <ASliderRoot
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :default-value="[0, 1000]"
        :step="500"
        :max="10000"
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

    <Variant title="0 case">
      <ASliderRoot
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :min="-100"
        :max="100"
        :default-value="[0]"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Multiple range">
      <ASliderRoot
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :default-value="[10, 20, 30, 80]"
        :min-steps-between-thumbs="10"
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

    <Variant title="Vertical">
      <ASliderRoot
        class="flex h-[100px] w-5 select-none items-center justify-center relative touch-none"
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

    <Variant title="Out of bound value (negative)">
      <ASliderRoot
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :min="0"
        :max="100"
        :default-value="[-9000]"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Out of bound value (positive)">
      <ASliderRoot
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :min="0"
        :max="100"
        :default-value="[9000]"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Disabled">
      <ASliderRoot
        class="flex h-5 w-[200px] select-none items-center relative touch-none"
        :disabled="true"
      >
        <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
          <ASliderRange class="rounded-full bg-white h-full absolute" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
        />
      </ASliderRoot>
    </Variant>
    <Variant title="Inside Form">
      <form @submit.prevent="alert('form submitted!')">
        <ASliderRoot
          :default-value="[0.12]"
          name="slider"
          class="flex h-5 w-[200px] select-none items-center relative touch-none"
          :min="0"
          :max="1"
          :step="0.01"
        >
          <ASliderTrack class="bg-blackA10 rounded-full grow h-[3px] relative">
            <ASliderRange class="rounded-full bg-white h-full absolute" />
          </ASliderTrack>
          <ASliderThumb
            class="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 rounded-[10px] bg-white h-5 w-5 block shadow-[0_2px_10px] focus:outline-none focus:shadow-[0_0_0_5px]"
          />
        </ASliderRoot>
        <button>Submit</button>
      </form>
    </Variant>
  </Story>
</template>
