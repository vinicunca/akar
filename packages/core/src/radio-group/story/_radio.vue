<script setup lang="ts">
import Radio from '../radio.vue';
</script>

<template>
  <div class="flex items-center">
    <Radio
      id="r1"
      aria-label="Default"
      class="h-[25px] w-[25px] cursor-default rounded-full bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none data-[disabled]:bg-red-500 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="true"
      name="test"
    />
    <label
      class="pl-[15px] text-[15px] text-white leading-none"
      for="r1"
    >
      Default
    </label>
  </div>
</template>
