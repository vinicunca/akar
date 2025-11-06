<script setup lang="ts">
import { ASwitchRoot, ASwitchThumb } from 'akar';
import { ref } from 'vue';

const switchState = ref(false);
</script>

<template>
  <div class="flex items-start relative">
    <div class="flex h-5 items-center">
      <ASwitchRoot
        id="airplane-mode"
        v-model="switchState"
        class="border-2 border-transparent rounded-full inline-flex shrink-0 w-9 transition-colors-280 items-center focus-visible:(outline-2 outline-primary outline-offset-2) data-[state=checked]:bg-primary data-[state=unchecked]:bg-background-accented"
      >
        <ASwitchThumb
          class="group rounded-full bg-background flex size-4 pointer-events-none ring-0 shadow-lg transition-transform-280 items-center justify-center data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 data-[state=checked]:rtl:-translate-x-4 data-[state=unchecked]:rtl:-translate-x-0"
        />
      </ASwitchRoot>
    </div>

    <div class="text-sm ms-2">
      <label
        class="color-text font-medium block"
        for="airplane-mode"
      >
        Airplane mode
      </label>
    </div>
  </div>
</template>
