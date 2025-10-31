<script setup lang="ts">
import type { PStepperItem } from 'pohon-ui';

const items = [
  {
    slot: 'address' as const,
    title: 'Address',
    description: 'Add your address here',
    icon: 'i-lucide-house',
  },
  {
    slot: 'shipping' as const,
    title: 'Shipping',
    description: 'Set your preferred shipping method',
    icon: 'i-lucide-truck',
  },
  {
    slot: 'checkout' as const,
    title: 'Checkout',
    description: 'Confirm your order',
  },
] satisfies Array<PStepperItem>;
</script>

<template>
  <PStepper
    :items="items"
    class="w-full"
  >
    <template #address>
      <CorePlaceholder class="aspect-video">
        Address
      </CorePlaceholder>
    </template>

    <template #shipping>
      <CorePlaceholder class="aspect-video">
        Shipping
      </CorePlaceholder>
    </template>

    <template #checkout>
      <CorePlaceholder class="aspect-video">
        Checkout
      </CorePlaceholder>
    </template>
  </PStepper>
</template>
