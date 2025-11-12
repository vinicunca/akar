<script setup lang="ts">
import { AStepperDescription, AStepperIndicator, AStepperItem, AStepperRoot, AStepperSeparator, AStepperTitle, AStepperTrigger } from 'akar';

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
</template>
