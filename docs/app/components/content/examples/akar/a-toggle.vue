<script setup lang="ts">
import { AToggle } from 'akar';
import { ref } from 'vue';

const toggleState = ref(false);
</script>

<template>
  <AToggle
    v-model="toggleState"
    aria-label="Toggle italic"
    class="color-text rounded-lg bg-background bg-white flex size-9 ring ring-ring-accented ring-inset shadow-sm transition-colors-280 items-center justify-center data-[state=on]:bg-background-accented hover:bg-background-elevated focus-within:(ring-2 ring-ring-inverted)"
  >
    <i
      class="i-lucide:italic size-6"
    />
  </AToggle>
</template>
