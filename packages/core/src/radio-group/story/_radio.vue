<script setup lang="ts">
import Radio from '../radio.vue';
</script>

<template>
  <div class="flex items-center">
    <Radio
      id="r1"
      aria-label="Default"
      class="shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white h-[25px] w-[25px] cursor-default shadow-[0_2px_10px] data-[disabled]:bg-red-500 focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="true"
      name="test"
    />
    <label
      class="text-[15px] text-white leading-none pl-[15px]"
      for="r1"
    >
      Default
    </label>
  </div>
</template>
