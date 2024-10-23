<script setup lang="ts">
import { AStepperDescription, AStepperIndicator, AStepperItem, AStepperRoot, AStepperSeparator, AStepperTitle, AStepperTrigger } from '..';

const steps = [{
  step: 1,
  title: 'Address',
  description: 'Add your address here',
  icon: 'i-radix-icons:home',
}, {
  step: 2,
  title: 'Shipping',
  description: 'Set your preferred shipping method',
  icon: 'i-radix-icons:archive',
}, {
  step: 3,
  title: 'Trade-in',
  description: 'Add any trade-in items you have',
  icon: 'i-radix-icons:update',
}, {
  step: 4,
  title: 'Payment',
  description: 'Add any payment information you have',
  icon: 'i-radix-icons:sketch-logo',
}, {
  step: 5,
  title: 'Checkout',
  description: 'Confirm your order',
  icon: 'i-radix-icons:check',
}];
</script>

<template>
  <Story
    title="AStepper/Default"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <AStepperRoot
        class="flex gap-2 p-1"
      >
        <AStepperItem
          v-for="item in steps"
          :key="item.step"
          class="group flex basis-1/5 cursor-pointer items-center gap-2 data-[disabled]:pointer-events-none"
          :step="item.step"
        >
          <AStepperTrigger class="flex flex-col items-center gap-2 rounded-md p-2 text-center focus:shadow-[0_0_0_2px] focus:shadow-green11 focus:outline-none">
            <AStepperIndicator
              class="h-10 w-10 inline-flex shrink-0 items-center justify-center rounded-full bg-mauve6 text-grass11 shadow-[0_0_0_2px] group-data-[state=active]:bg-mauve12 group-data-[state=completed]:bg-green9 group-data-[disabled]:text-gray-400 group-data-[state=active]:text-white group-data-[state=completed]:text-white group-data-[state=active]:shadow-mauve12 group-data-[state=completed]:shadow-green9"
            >
              <i
                class="h-6 w-6"
                :class="[item.icon]"
              />
            </AStepperIndicator>
            <div class="flex flex-col">
              <AStepperTitle class="text-md whitespace-nowrap font-medium">
                {{ item.title }}
              </AStepperTitle>
              <AStepperDescription class="hidden text-xs text-mauve8">
                {{ item.description }}
              </AStepperDescription>
            </div>
          </AStepperTrigger>
          <AStepperSeparator
            v-if="item.step !== steps[steps.length - 1].step"
            class="h-[1px] w-full bg-green5 group-data-[disabled]:bg-gray-300 group-data-[state=completed]:bg-green9"
          />
        </AStepperItem>
      </AStepperRoot>
    </Variant>
  </Story>
</template>
