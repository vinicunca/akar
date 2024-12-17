<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { AStepperDescription, AStepperIndicator, AStepperItem, AStepperRoot, AStepperSeparator, AStepperTitle, AStepperTrigger } from '..'

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
}]
</script>

<template>
  <Story
    title="Stepper/Default"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <AStepperRoot
        class="flex gap-2 p-1"
      >
        <AStepperItem
          v-for="item in steps"
          :key="item.step"
          class="flex items-center gap-2 basis-1/5 cursor-pointer group data-[disabled]:pointer-events-none"
          :step="item.step"
        >
          <AStepperTrigger class="p-2 flex flex-col items-center text-center gap-2 focus:shadow-[0_0_0_2px] focus:shadow-green11 focus:outline-none rounded-md">
            <AStepperIndicator
              class="inline-flex items-center group-data-[disabled]:text-gray-400 group-data-[state=active]:bg-mauve12 group-data-[state=active]:text-white justify-center rounded-full text-grass11 w-10 h-10 shrink-0 bg-mauve6 group-data-[state=active]:shadow-mauve12 group-data-[state=completed]:bg-green9 group-data-[state=completed]:text-white group-data-[state=completed]:shadow-green9 shadow-[0_0_0_2px] "
            >
              <Icon
                :icon="item.icon"
                class="w-6 h-6"
              />
            </AStepperIndicator>
            <div class="flex flex-col">
              <AStepperTitle class="text-md font-medium whitespace-nowrap ">
                {{ item.title }}
              </AStepperTitle>
              <AStepperDescription class="hidden text-xs text-mauve8">
                {{ item.description }}
              </AStepperDescription>
            </div>
          </AStepperTrigger>
          <AStepperSeparator
            v-if="item.step !== steps[steps.length - 1].step"
            class="w-full h-[1px]  group-data-[disabled]:bg-gray-300 group-data-[state=completed]:bg-green9 bg-green5"
          />
        </AStepperItem>
      </AStepperRoot>
    </Variant>
  </Story>
</template>
