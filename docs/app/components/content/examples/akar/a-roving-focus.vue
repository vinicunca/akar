<script setup lang="ts">
import { ARovingFocusGroup, ARovingFocusItem } from 'akar';
</script>

<template>
  <div class="flex flex-col gap-4 justify-center">
    <p class="text-xs color-text-muted">
      Tab to focus
    </p>
    <ARovingFocusGroup
      orientation="horizontal"
      class="flex gap-2 items-center"
    >
      <ARovingFocusItem
        class="font-medium px-4 py-2 rounded-lg bg-background-muted transition-colors-280 focus:bg-background-accented hover:bg-background-accented"
        as="button"
      >
        Button 1
      </ARovingFocusItem>
      <ARovingFocusItem
        class="font-medium px-4 py-2 rounded-lg bg-background-muted transition-colors-280 focus:bg-background-accented hover:bg-background-accented"
        as="button"
      >
        Button 2
      </ARovingFocusItem>
      <ARovingFocusItem
        class="font-medium px-4 py-2 rounded-lg bg-background-muted transition-colors-280 focus:bg-background-accented hover:bg-background-accented"
        as="button"
      >
        Button 3
      </ARovingFocusItem>
    </ARovingFocusGroup>
  </div>
</template>
