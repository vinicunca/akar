<script setup lang="ts">
import { CorePlaceholder, PButton, PCollapsible } from '#components';
</script>

<template>
  <PCollapsible class="p-4 rounded-md bg-background flex flex-col gap-2 w-48">
    <PButton
      class="group"
      label="Open"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide:chevron-down"
      :pohon="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform-280',
      }"
      block
    />

    <template #content>
      <CorePlaceholder class="h-48" />
    </template>
  </PCollapsible>
</template>
