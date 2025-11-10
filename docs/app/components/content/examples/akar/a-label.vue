<script setup lang="ts">
import { ALabel } from 'akar';
</script>

<template>
  <div class="px-5 flex flex-wrap gap-4 items-center">
    <ALabel
      class="color-text font-medium block"
      for="firstName"
    >
      First name
    </ALabel>
    <input
      id="firstName"
      class="text-sm color-text-highlighted px-2.5 py-1.5 appearance-none border-0 rounded-md bg-background gap-1.5 w-full ring ring-ring-accented ring-inset transition-colors placeholder:color-text-dimmed focus:outline-none focus-visible:(ring-2 ring-primary ring-inset)"
      type="text"
      value="Nyoman Gabler"
    >
  </div>
</template>
