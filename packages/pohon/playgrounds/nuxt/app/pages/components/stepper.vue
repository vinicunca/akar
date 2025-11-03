<script setup lang="ts">
import theme from '#build/pohon/stepper';
import { ref, useTemplateRef } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const orientations = Object.keys(theme.variants.orientation);

const color = ref(theme.defaultVariants.color);
const size = ref(theme.defaultVariants.size);
const orientation = ref('horizontal' as keyof typeof theme.variants.orientation);

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
    slot: 'payment' as const,
    title: 'Payment',
    description: 'Select your payment method',
    icon: 'i-lucide-credit-card',
  },
  {
    slot: 'checkout' as const,
    title: 'Checkout',
    description: 'Confirm your order',
  },
];

const stepper = useTemplateRef('stepper');
</script>

<template>
  <BaseNavbar>
    <PSelect
      v-model="color"
      :items="colors"
      placeholder="Color"
    />
    <PSelect
      v-model="size"
      :items="sizes"
      placeholder="Size"
    />
    <PSelect
      v-model="orientation"
      :items="orientations"
      placeholder="Orientation"
    />
  </BaseNavbar>

  <div class="flex flex-col gap-10 min-h-0">
    <PStepper
      ref="stepper"
      :items="items"
      :color="color"
      :orientation="orientation"
      :size="size"
    >
      <template #address="{ item }">
        <BasePlaceholder class="size-full min-h-60 min-w-60">
          {{ item.title }}
        </BasePlaceholder>
      </template>

      <template #shipping="{ item }">
        <BasePlaceholder class="size-full min-h-60 min-w-60">
          {{ item.title }}
        </BasePlaceholder>
      </template>

      <template #payment="{ item }">
        <BasePlaceholder class="size-full min-h-60 min-w-60">
          {{ item.title }}
        </BasePlaceholder>
      </template>

      <template #checkout="{ item }">
        <BasePlaceholder class="size-full min-h-60 min-w-60">
          {{ item.title }}
        </BasePlaceholder>
      </template>
    </PStepper>

    <div class="flex gap-2 justify-between">
      <PButton
        leading-icon="i-lucide-arrow-left"
        :disabled="!stepper?.hasPrev"
        @click="stepper?.prev()"
      >
        Prev
      </PButton>

      <PButton
        trailing-icon="i-lucide-arrow-right"
        :disabled="!stepper?.hasNext"
        @click="stepper?.next()"
      >
        Next
      </PButton>
    </div>
  </div>
</template>
