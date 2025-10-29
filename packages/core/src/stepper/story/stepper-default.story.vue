<script setup lang="ts">
import { Icon } from '@iconify/vue';

import { AStepperDescription, AStepperIndicator, AStepperItem, AStepperRoot, AStepperSeparator, AStepperTitle, AStepperTrigger } from '..';

const steps = [{
  step: 1,
  title: 'Address',
  description: 'Add your address here',
  icon: 'radix-icons:home',
}, {
  step: 2,
  title: 'Shipping',
  description: 'Set your preferred shipping method',
  icon: 'radix-icons:archive',
}, {
  step: 3,
  title: 'Trade-in',
  description: 'Add any trade-in items you have',
  icon: 'radix-icons:update',
}, {
  step: 4,
  title: 'Payment',
  description: 'Add any payment information you have',
  icon: 'radix-icons:sketch-logo',
}, {
  step: 5,
  title: 'Checkout',
  description: 'Confirm your order',
  icon: 'radix-icons:check',
}];
</script>

<template>
  <Story
    title="Stepper/Default"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <AStepperRoot
        class="p-1 flex gap-2"
      >
        <AStepperItem
          v-for="item in steps"
          :key="item.step"
          class="group flex basis-1/5 gap-2 cursor-pointer items-center data-[disabled]:pointer-events-none"
          :step="item.step"
        >
          <AStepperTrigger class="focus:shadow-green11 p-2 text-center rounded-md flex flex-col gap-2 items-center focus:outline-none focus:shadow-[0_0_0_2px]">
            <AStepperIndicator
              class="bg-mauve6 text-grass11 group-data-[state=active]:bg-mauve12 group-data-[state=completed]:bg-green9 group-data-[state=active]:shadow-mauve12 group-data-[state=completed]:shadow-green9 rounded-full inline-flex shrink-0 h-10 w-10 shadow-[0_0_0_2px] items-center justify-center group-data-[disabled]:text-gray-400 group-data-[state=active]:text-white group-data-[state=completed]:text-white"
            >
              <Icon
                :icon="item.icon"
                class="h-6 w-6"
              />
            </AStepperIndicator>
            <div class="flex flex-col">
              <AStepperTitle class="text-base font-medium whitespace-nowrap">
                {{ item.title }}
              </AStepperTitle>
              <AStepperDescription class="text-mauve8 text-xs hidden">
                {{ item.description }}
              </AStepperDescription>
            </div>
          </AStepperTrigger>
          <AStepperSeparator
            v-if="item.step !== steps[steps.length - 1].step"
            class="bg-green5 group-data-[state=completed]:bg-green9 h-[1px] w-full group-data-[disabled]:bg-gray-300"
          />
        </AStepperItem>
      </AStepperRoot>
    </Variant>
  </Story>
</template>
