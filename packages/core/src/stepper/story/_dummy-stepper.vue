<script setup lang="ts">
import type { AStepperRootEmits, AStepperRootProps } from '..';
import { Icon } from '@iconify/vue';
import { useForwardPropsEmits } from '~~/shared';
import { AStepperDescription, AStepperIndicator, AStepperItem, AStepperRoot, AStepperSeparator, AStepperTitle, AStepperTrigger } from '..';

const props = defineProps<AStepperRootProps>();
const emits = defineEmits<AStepperRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

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
  <AStepperRoot
    v-bind="forwarded"
    class="flex gap-2 data-[orientation=vertical]:flex-col"
  >
    <AStepperItem
      v-for="item in steps"
      :key="item.step"
      class="group flex basis-1/5 cursor-pointer items-center gap-2 p-1 data-[disabled]:pointer-events-none data-[orientation=vertical]:flex-col"
      :step="item.step"
    >
      <AStepperTrigger class="flex flex-col items-center gap-2 rounded-md p-1 text-center focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
        <AStepperIndicator
          class="text-grass11 group-data-[state=active]:shadow-mauve12 group-data-[state=active]:bg-mauve12 h-10 w-10 inline-flex shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_2px] group-data-[state=completed]:bg-green9 group-data-[disabled]:text-gray-400 group-data-[state=active]:text-white group-data-[state=completed]:text-white group-data-[state=completed]:shadow-green9"
        >
          <Icon
            :icon="item.icon"
            class="h-6 w-6"
          />
        </AStepperIndicator>
        <div class="flex flex-col">
          <AStepperTitle class="text-md text-black font-medium">
            {{ item.title }}
          </AStepperTitle>
          <AStepperDescription class="text-sm text-black">
            {{ item.description }}
          </AStepperDescription>
        </div>
      </AStepperTrigger>
      <AStepperSeparator
        v-if="item.step !== steps[steps.length - 1].step"
        class="h-px w-full bg-green5 group-data-[orientation=vertical]:h-[100px] group-data-[orientation=vertical]:w-px group-data-[disabled]:bg-gray-300 group-data-[state=completed]:bg-green9"
      />
    </AStepperItem>
  </AStepperRoot>
</template>
