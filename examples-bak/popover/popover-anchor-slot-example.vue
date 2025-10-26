<script lang="ts" setup>
const open = ref(false)
</script>

<template>
  <UPopover
    v-model:open="open"
    :dismissible="false"
    :pohon="{ content: 'w-(--akar-popper-anchor-width) p-4' }"
  >
    <template #anchor>
      <PInput placeholder="Focus to open" @focus="open = true" @blur="open = false" />
    </template>

    <template #content>
      <CorePlaceholder class="w-full aspect-square" />
    </template>
  </UPopover>
</template>
