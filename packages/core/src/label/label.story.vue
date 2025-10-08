<script setup lang="ts">
import { ALabel } from '.';
</script>

<template>
  <Story
    title="ALabel/Demo"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <div class="px-5 flex flex-wrap gap-[15px] items-center">
        <ALabel
          class="text-[15px] text-white leading-[35px] font-medium"
          for="firstName"
        >
          First name
        </ALabel>
        <input
          id="firstName"
          class="text-[15px] text-white leading-none px-[10px] appearance-none outline-none rounded-[4px] bg-black/50 inline-flex h-[35px] w-[200px] shadow-[0_0_0_1px] shadow-black/40 items-center justify-center selection:color-white selection:bg-black/80 focus:shadow-[0_0_0_2px_black]"
          type="text"
          value="Pedro Duarte"
        >
      </div>
    </Variant>
  </Story>
</template>
