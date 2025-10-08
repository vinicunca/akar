<script setup lang="ts">
import { ref } from 'vue';
import { ARadioGroupIndicator, ARadioGroupItem, ARadioGroupRoot } from '..';

defineProps<{
  disabled?: boolean;
}>();
const radioStateSingle = ref('default');
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
        class="shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white h-[25px] w-[25px] cursor-default shadow-[0_2px_10px] data-[disabled]:bg-red-500 focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="default"
      >
        <ARadioGroupIndicator
          class="after:bg-violet11 flex h-full w-full items-center justify-center relative after:rounded-[50%] after:h-[11px] after:w-[11px] after:block after:content-['']"
        />
      </ARadioGroupItem>
      <label
        class="text-[15px] text-white leading-none pl-[15px]"
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
        class="shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white h-[25px] w-[25px] cursor-default shadow-[0_2px_10px] data-[disabled]:bg-red-500 focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="comfortable"
      >
        <ARadioGroupIndicator
          class="after:bg-violet11 flex h-full w-full items-center justify-center relative after:rounded-[50%] after:h-[11px] after:w-[11px] after:block after:content-['']"
        />
      </ARadioGroupItem>
      <label
        class="text-[15px] text-white leading-none pl-[15px]"
        for="r2"
      >
        Comfortable
      </label>
    </div>
    <div class="flex items-center">
      <ARadioGroupItem
        id="r3"
        aria-label="Compact"
        class="shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white h-[25px] w-[25px] cursor-default shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="compact"
      >
        <ARadioGroupIndicator
          class="after:bg-violet11 flex h-full w-full items-center justify-center relative after:rounded-[50%] after:h-[11px] after:w-[11px] after:block after:content-['']"
        />
      </ARadioGroupItem>
      <label
        class="text-[15px] text-white leading-none pl-[15px]"
        for="r3"
      >
        Compact
      </label>
    </div>
  </ARadioGroupRoot>
</template>
