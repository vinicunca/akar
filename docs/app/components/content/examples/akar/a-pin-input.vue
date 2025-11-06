<script setup lang="ts">
import { APinInputInput, APinInputRoot } from 'akar';
import { ref } from 'vue';

const value = ref<Array<string>>([]);
function handleComplete(e: Array<string>) {
  alert(e.join(''));
}
</script>

<template>
  <APinInputRoot
    v-model="value"
    placeholder="○"
    class="inline-flex gap-1.5 items-center relative"
    @complete="handleComplete"
  >
    <APinInputInput
      v-for="(id, index) in 5"
      :key="id"
      :index="index"
      class="text-sm color-text-highlighted text-center border-0 rounded-md bg-background size-8 ring ring-ring-accented ring-inset transition-colors-280 placeholder:color-text-dimmed focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
    />
  </APinInputRoot>
</template>
