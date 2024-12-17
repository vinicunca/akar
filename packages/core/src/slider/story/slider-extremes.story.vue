<script setup lang="ts">
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from '..'

function alert(message: string) {
  alert(message)
}
</script>

<template>
  <Story
    title="Slider/Extremes"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Extreme">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :default-value="[0, 1000]"
        :step="500"
        :max="10000"
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

    <Variant title="0 case">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :min="-100"
        :max="100"
        :default-value="[0]"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Multiple range">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :default-value="[10, 20, 30, 80]"
        :min-steps-between-thumbs="10"
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

    <Variant title="Vertical">
      <ASliderRoot
        class="relative flex justify-center items-center select-none touch-none w-5 h-[100px]"
        orientation="vertical"
      >
        <ASliderTrack class="bg-blackA10 relative rounded-full w-[3px] h-full">
          <ASliderRange class="absolute bg-white rounded-full w-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Out of bound value (negative)">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :min="0"
        :max="100"
        :default-value="[-9000]"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Out of bound value (positive)">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :min="0"
        :max="100"
        :default-value="[9000]"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>

    <Variant title="Disabled">
      <ASliderRoot
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :disabled="true"
      >
        <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
          <ASliderRange class="absolute bg-white rounded-full h-full" />
        </ASliderTrack>
        <ASliderThumb
          class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        />
      </ASliderRoot>
    </Variant>
    <Variant title="Inside Form">
      <form @submit.prevent="alert('form submitted!')">
        <ASliderRoot
          :default-value="[0.12]"
          name="slider"
          class="relative flex items-center select-none touch-none w-[200px] h-5"
          :min="0"
          :max="1"
          :step="0.01"
        >
          <ASliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
            <ASliderRange class="absolute bg-white rounded-full h-full" />
          </ASliderTrack>
          <ASliderThumb
            class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
          />
        </ASliderRoot>
        <button>Submit</button>
      </form>
    </Variant>
  </Story>
</template>
