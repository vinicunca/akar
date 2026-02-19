<script setup lang="ts">
import theme from '#build/pohon/stepper';
import { AStepperDescription, AStepperIndicator, AStepperItem, AStepperRoot, AStepperSeparator, AStepperTitle, AStepperTrigger } from 'akar';
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
    icon: 'i-lucide:house',
  },
  {
    slot: 'shipping' as const,
    title: 'Shipping',
    description: 'Set your preferred shipping method',
    icon: 'i-lucide:truck',
  },
  {
    slot: 'payment' as const,
    title: 'Payment',
    description: 'Select your payment method',
    icon: 'i-lucide:credit-card',
  },
  {
    slot: 'checkout' as const,
    title: 'Checkout',
    description: 'Confirm your order',
  },
];

const stepper = useTemplateRef('stepper');

const steps = [{
  step: 1,
  title: 'Address',
  description: 'Add your address here',
  icon: 'i-lucide:house',
}, {
  step: 2,
  title: 'Shipping',
  description: 'Set your preferred shipping method',
  icon: 'i-lucide:truck',
}, {
  step: 3,
  title: 'Payment',
  description: 'Select your payment method',
  icon: 'i-lucide:credit-card',
}];
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
    <AStepperRoot
      :default-value="2"
      class="flex flex-col gap-4"
    >
      <div class="flex">
        <AStepperItem
          v-for="item in steps"
          :key="item.step"
          class="group text-center w-full relative"
          :step="item.step"
        >
          <div class="flex justify-center relative">
            <AStepperTrigger class="text-base color-text-muted font-medium font-semibold text-center align-middle rounded-full bg-background-elevated flex size-10 items-center justify-center group-data-[state=active]:color-text-inverted group-data-[state=completed]:color-text-inverted focus-visible:(outline-2 outline-primary outline-offset-2) group-data-[state=active]:bg-primary group-data-[state=completed]:bg-primary">
              <AStepperIndicator class="flex size-full items-center justify-center">
                <i
                  :class="item.icon"
                  class="size-5"
                />
              </AStepperIndicator>
            </AStepperTrigger>
            <AStepperSeparator
              v-if="item.step !== steps[steps.length - 1].step"
              class="rounded-full bg-background-accented h-0.5 end-[calc(-50%+28px)] start-[calc(50%+28px)] top-[calc(50%-2px)] absolute group-data-[state=completed]:bg-primary group-data-[disabled]:opacity-75"
            />
          </div>
          <div class="mt-2.5">
            <AStepperTitle class="text-sm color-text font-medium">
              {{ item.title }}
            </AStepperTitle>
            <AStepperDescription class="text-sm color-text-muted text-wrap">
              {{ item.description }}
            </AStepperDescription>
          </div>
        </AStepperItem>
      </div>
    </AStepperRoot>
  </div>

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
        leading-icon="i-lucide:arrow-left"
        :disabled="!stepper?.hasPrev"
        @click="stepper?.prev()"
      >
        Prev
      </PButton>

      <PButton
        trailing-icon="i-lucide:arrow-right"
        :disabled="!stepper?.hasNext"
        @click="stepper?.next()"
      >
        Next
      </PButton>
    </div>
  </div>
</template>
