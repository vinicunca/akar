<script setup lang="ts">
const collapsed = defineModel<boolean>('collapsed');

function handleCollapsed() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div
    class="bg-accent color-foreground/60 hover:bg-accent-hover hover:color-foreground p-1 rounded-sm flex cursor-pointer items-center bottom-2 left-3 justify-center absolute z-10"
    @click.stop="handleCollapsed"
  >
    <i
      :class="{
        'i-lucide:chevrons-right': collapsed,
        'i-lucide:chevrons-left': !collapsed,
      }"
      class="size-4"
    />
  </div>
</template>
