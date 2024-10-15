<script setup lang="ts">
import { ref } from 'vue'
import { ARadioGroupIndicator, ARadioGroupItem, ARadioGroupRoot } from '..'

defineProps<{
  disabled?: boolean
}>()
const radioStateSingle = ref('default')
</script>

<template>
  <ARadioGroupRoot
    v-model="radioStateSingle"
    :loop="false"
    :disabled="disabled"
    class="flex flex-col gap-2.5"
    aria-label="View density"
    orientation="vertical"
  >
    <div class="flex items-center">
      <ARadioGroupItem
        id="r1"
        aria-label="Default"
        class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default data-[disabled]:bg-red-500"
        value="default"
      >
        <ARadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11"
        />
      </ARadioGroupItem>
      <label
        class="text-white text-[15px] leading-none pl-[15px]"
        for="r1"
      >
        Default
      </label>
    </div>
    <div class="flex items-center">
      <ARadioGroupItem
        id="r2"
        aria-label="Comfortable"
        disabled
        class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default data-[disabled]:bg-red-500"
        value="comfortable"
      >
        <ARadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11"
        />
      </ARadioGroupItem>
      <label
        class="text-white text-[15px] leading-none pl-[15px]"
        for="r2"
      >
        Comfortable
      </label>
    </div>
    <div class="flex items-center">
      <ARadioGroupItem
        id="r3"
        aria-label="Compact"
        class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
        value="compact"
      >
        <ARadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11"
        />
      </ARadioGroupItem>
      <label
        class="text-white text-[15px] leading-none pl-[15px]"
        for="r3"
      >
        Compact
      </label>
    </div>
  </ARadioGroupRoot>
</template>
