<script setup lang="ts">
import type { PStepperItem } from 'pohon-ui';

const items: Array<PStepperItem> = [
  {
    title: 'Address',
    description: 'Add your address here',
    icon: 'i-lucide-house',
  },
  {
    title: 'Shipping',
    description: 'Set your preferred shipping method',
    icon: 'i-lucide-truck',
  },
  {
    title: 'Checkout',
    description: 'Confirm your order',
  },
];
</script>

<template>
  <PStepper
    ref="stepper"
    :items="items"
    class="w-full"
  >
    <template #content="{ item }">
      <CorePlaceholder class="aspect-video">
        This is the {{ item?.title }} step.
      </CorePlaceholder>
    </template>
  </PStepper>
</template>
