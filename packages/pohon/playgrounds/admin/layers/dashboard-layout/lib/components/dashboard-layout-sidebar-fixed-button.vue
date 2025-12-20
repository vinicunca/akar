<script setup lang="ts">
const expandOnHover = defineModel<boolean>('expandOnHover');

function toggleFixed() {
  expandOnHover.value = !expandOnHover.value;
}
</script>

<template>
  <div
    class="flex-center bg-accent color-foreground/60 hover:bg-accent-hover hover:color-foreground p-[5px] rounded-sm cursor-pointer transition-all-300 bottom-2 right-3 absolute z-10"
    @click="toggleFixed"
  >
    <i
      :class="{
        'i-lucide:pin': expandOnHover,
        'i-lucide:pin-off': !expandOnHover,
      }"
      class="size-3.5"
    />
  </div>
</template>
