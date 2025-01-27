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
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :default-value="[0, 1000]"
        :step="500"
        :max="10000"
      >
        <ASliderTrack class="bg-blackA10 relative h-[3px] grow rounded-full">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="0 case">
      <ASliderRoot
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :min="-100"
        :max="100"
        :default-value="[0]"
      >
        <ASliderTrack class="bg-blackA10 relative h-[3px] grow rounded-full">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Multiple range">
      <ASliderRoot
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :default-value="[10, 20, 30, 80]"
        :min-steps-between-thumbs="10"
      >
        <ASliderTrack class="bg-blackA10 relative h-[3px] grow rounded-full">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Vertical">
      <ASliderRoot
        class="relative h-[100px] w-5 flex touch-none select-none items-center justify-center"
        orientation="vertical"
      >
        <ASliderTrack class="bg-blackA10 relative h-full w-[3px] rounded-full">
          <ASliderRange class="absolute w-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Out of bound value (negative)">
      <ASliderRoot
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :min="0"
        :max="100"
        :default-value="[-9000]"
      >
        <ASliderTrack class="bg-blackA10 relative h-[3px] grow rounded-full">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Out of bound value (positive)">
      <ASliderRoot
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :min="0"
        :max="100"
        :default-value="[9000]"
      >
        <ASliderTrack class="bg-blackA10 relative h-[3px] grow rounded-full">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Disabled">
      <ASliderRoot
        class="relative h-5 w-[200px] flex touch-none select-none items-center"
        :disabled="true"
      >
        <ASliderTrack class="bg-blackA10 relative h-[3px] grow rounded-full">
          <ASliderRange class="absolute h-full rounded-full bg-white" />
        </ASliderTrack>
        <ASliderThumb
          class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
        />
      </ASliderRoot>
    </Variant>
    <Variant title="Inside Form">
      <form @submit.prevent="alert('form submitted!')">
        <ASliderRoot
          :default-value="[0.12]"
          name="slider"
          class="relative h-5 w-[200px] flex touch-none select-none items-center"
          :min="0"
          :max="1"
          :step="0.01"
        >
          <ASliderTrack class="bg-blackA10 relative h-[3px] grow rounded-full">
            <ASliderRange class="absolute h-full rounded-full bg-white" />
          </ASliderTrack>
          <ASliderThumb
            class="shadow-blackA7 focus:shadow-blackA8 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:outline-none"
          />
        </ASliderRoot>
        <button>Submit</button>
      </form>
    </Variant>
  </Story>
</template>
